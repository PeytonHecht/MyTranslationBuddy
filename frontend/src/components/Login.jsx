import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { saveUserSession } from "../utils/auth.js";
import { GOOGLE_CLIENT_ID } from "../constants/cities.js";
import { API_BASE } from "../config.js";
import logo from "../assets/MTBLogo.png";

/* ── Keyframes (injected once) ────────────────────── */
if (!document.getElementById("auth-kf")) {
  const s = document.createElement("style"); s.id = "auth-kf";
  s.textContent = `
    @keyframes authMesh1{0%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,-40px) scale(1.15)}100%{transform:translate(0,0) scale(1)}}
    @keyframes authMesh2{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-50px,50px) scale(1.1)}100%{transform:translate(0,0) scale(1)}}
    @keyframes authMesh3{0%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,60px) scale(1.2)}100%{transform:translate(0,0) scale(1)}}
    @keyframes authMesh4{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,-30px) scale(1.12)}100%{transform:translate(0,0) scale(1)}}
    @keyframes authUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes authSpin{to{transform:rotate(360deg)}}
    @keyframes authGlow{0%,100%{box-shadow:0 12px 60px rgba(0,33,165,.12),0 0 40px rgba(250,70,22,.06),0 0 0 1px rgba(255,255,255,.5) inset}50%{box-shadow:0 16px 80px rgba(0,33,165,.18),0 0 60px rgba(250,70,22,.1),0 0 0 1px rgba(255,255,255,.6) inset}}
    @keyframes authFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes authMesh5{0%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,30px) scale(1.18)}100%{transform:translate(0,0) scale(1)}}
    @keyframes authMesh6{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-30px,-40px) scale(1.1)}100%{transform:translate(0,0) scale(1)}}
    .auth-input{border:1px solid rgba(255,255,255,.35)!important;background:rgba(255,255,255,.25)!important;backdrop-filter:blur(8px)!important;-webkit-backdrop-filter:blur(8px)!important;color:#111827!important;transition:all .25s!important}
    .auth-input::placeholder{color:#9CA3AF!important}
    .auth-input:focus{border-color:#FA4616!important;background:rgba(255,255,255,.4)!important;box-shadow:0 0 0 3px rgba(250,70,22,.1),0 4px 16px rgba(0,33,165,.06)!important;outline:none!important}
    .auth-btn{transition:all .2s!important}
    .auth-btn:hover:not(:disabled){transform:translateY(-2px)!important;box-shadow:0 12px 40px rgba(0,33,165,.35)!important}
    .auth-btn:active:not(:disabled){transform:translateY(0)!important}
    .auth-link{transition:all .15s!important}
    .auth-link:hover{color:#FA4616!important;opacity:1!important;border-bottom-color:rgba(250,70,22,.4)!important}
    .auth-eye:hover{background:rgba(0,33,165,.05)!important}
  `;
  document.head.appendChild(s);
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);
  const googleCallbackRef = useRef(null);

  googleCallbackRef.current = async (response) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/google`, { credential: response.credential });
      if (res.status === 200) { saveUserSession(res.data); navigate(res.data.needs_setup ? "/profile" : "/"); }
    } catch (err) { setErrorMsg(err.response?.data?.detail || "Google sign-in failed."); }
  };

  useEffect(() => {
    const initGoogle = () => {
      if (window.google && googleBtnRef.current) {
        window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: (r) => googleCallbackRef.current(r) });
        window.google.accounts.id.renderButton(googleBtnRef.current, { theme: "outline", size: "large", width: 380, text: "signin_with", shape: "pill" });
      }
    };
    if (window.google) { initGoogle(); return; }
    const sc = document.createElement("script");
    sc.src = "https://accounts.google.com/gsi/client"; sc.async = true; sc.defer = true; sc.onload = initGoogle;
    document.head.appendChild(sc);
    return () => { try { document.head.removeChild(sc); } catch {} };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) { setErrorMsg("Please fill in all fields."); return; }
    if (!email.toLowerCase().endsWith("@ufl.edu")) { setErrorMsg("Only @ufl.edu emails allowed."); return; }
    setIsSubmitting(true);
    try {
      const r = await axios.post(`${API_BASE}/api/login`, { email, password });
      if (r.status === 200) { saveUserSession(r.data); navigate("/"); }
    } catch (error) {
      const s = error.response?.status, d = error.response?.data?.detail || "";
      if (s === 404) setErrorMsg("No account found. Did you mean to register?");
      else if (s === 401) setErrorMsg("Incorrect password.");
      else if (s === 429) setErrorMsg("Too many attempts. Wait a moment.");
      else if (d) setErrorMsg(d);
      else setErrorMsg("Something went wrong.");
    } finally { setIsSubmitting(false); }
  };

  const kd = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <div style={S.page}>
      {/* ── Animated mesh background ── */}
      <div style={S.meshWrap}>
        <div style={{...S.blob,width:700,height:700,top:"-20%",left:"-14%",background:"radial-gradient(circle,rgba(0,33,165,.5),transparent 70%)",animation:"authMesh1 12s ease-in-out infinite"}}/>
        <div style={{...S.blob,width:600,height:600,bottom:"-14%",right:"-12%",background:"radial-gradient(circle,rgba(250,70,22,.4),transparent 70%)",animation:"authMesh2 14s ease-in-out infinite"}}/>
        <div style={{...S.blob,width:450,height:450,top:"22%",right:"12%",background:"radial-gradient(circle,rgba(0,48,135,.35),transparent 70%)",animation:"authMesh3 16s ease-in-out infinite"}}/>
        <div style={{...S.blob,width:380,height:380,top:"5%",right:"-8%",background:"radial-gradient(circle,rgba(250,70,22,.28),transparent 70%)",animation:"authMesh4 18s ease-in-out infinite"}}/>
        <div style={{...S.blob,width:350,height:350,bottom:"5%",left:"10%",background:"radial-gradient(circle,rgba(250,70,22,.22),transparent 70%)",animation:"authMesh5 15s ease-in-out infinite"}}/>
        <div style={{...S.blob,width:300,height:300,top:"55%",left:"-8%",background:"radial-gradient(circle,rgba(0,33,165,.3),transparent 70%)",animation:"authMesh6 20s ease-in-out infinite"}}/>
      </div>

      {/* ── Glass card ── */}
      <div style={S.cardWrap}>
        {/* Logo + wordmark */}
        <div style={S.logoRow}>
          <img src={logo} alt="MTB" style={S.logo} onClick={() => navigate("/")} />
        </div>

        {/* Card */}
        <div style={S.card}>
          <h1 style={S.title}>Sign in</h1>

          {errorMsg && <div style={S.error}>{errorMsg}</div>}

          <div style={S.form}>
            <div style={S.field}>
              <label style={S.label}>Email</label>
              <input className="auth-input" type="email" placeholder="gator@ufl.edu"
                value={email} onChange={e=>{setEmail(e.target.value);if(errorMsg)setErrorMsg("");}}
                onKeyDown={kd} style={S.input}/>
            </div>

            <div style={S.field}>
              <label style={S.label}>Password</label>
              <div style={S.passRow}>
                <input className="auth-input" type={showPassword?"text":"password"} placeholder="••••••••"
                  value={password} onChange={e=>{setPassword(e.target.value);if(errorMsg)setErrorMsg("");}}
                  onKeyDown={kd} style={S.passInput}/>
                <button className="auth-eye" onClick={()=>setShowPassword(!showPassword)} style={S.eyeBtn} type="button">
                  {showPassword ? <EyeOff size={15} color="#9CA3AF"/> : <Eye size={15} color="#9CA3AF"/>}
                </button>
              </div>
            </div>

            <button className="auth-btn" onClick={handleLogin} disabled={isSubmitting} style={{...S.primary,opacity:isSubmitting?.6:1}}>
              {isSubmitting ? (
                <span style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:15,height:15,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"authSpin .6s linear infinite"}}/>
                  Signing in…
                </span>
              ) : <>Sign In <ArrowRight size={15}/></>}
            </button>

            <div style={S.divider}><span style={S.divLine}/><span style={S.divText}>or</span><span style={S.divLine}/></div>

            <div ref={googleBtnRef} style={{display:"flex",justifyContent:"center"}}/>

            <p style={S.footer}>
              New here?{" "}
              <span className="auth-link" onClick={()=>navigate("/register")} style={S.link}>Create account →</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════ */
const S = {
  page:{
    minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
    fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
    background:"#F9FAFB",position:"relative",overflow:"hidden",
  },

  /* Mesh blobs */
  meshWrap:{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"},
  blob:{position:"absolute",borderRadius:"50%",filter:"blur(90px)",willChange:"transform"},

  /* Card container — BIGGER */
  cardWrap:{position:"relative",zIndex:2,width:"100%",maxWidth:560,padding:"1.5rem",animation:"authUp .5s ease both, authFloat 5s ease-in-out infinite .5s"},

  /* Logo */
  logoRow:{display:"flex",justifyContent:"center",marginBottom:"1.75rem"},
  logo:{height:64,objectFit:"contain",cursor:"pointer",filter:"drop-shadow(0 0 28px rgba(0,33,165,.25))"},

  /* Frosted glass card — super glassy floating look */
  card:{
    background:"rgba(255,255,255,.35)",
    backdropFilter:"blur(50px) saturate(1.6)",
    WebkitBackdropFilter:"blur(50px) saturate(1.6)",
    borderRadius:"1.75rem",
    border:"1px solid rgba(255,255,255,.45)",
    borderTop:"2.5px solid #FA4616",
    padding:"2.75rem 2.5rem 2.5rem",
    boxShadow:"0 12px 60px rgba(0,33,165,.12), 0 0 40px rgba(250,70,22,.06), 0 0 0 1px rgba(255,255,255,.5) inset",
    animation:"authGlow 6s ease-in-out infinite",
  },

  title:{fontSize:"1.75rem",fontWeight:700,color:"#111827",margin:"0 0 1.5rem",letterSpacing:"-0.02em",textAlign:"center"},

  error:{
    fontSize:"0.82rem",fontWeight:500,color:"#DC2626",
    background:"rgba(254,242,242,.8)",
    border:"1px solid #FECACA",
    borderRadius:"0.65rem",padding:"0.65rem 0.9rem",marginBottom:"0.85rem",
  },

  form:{display:"flex",flexDirection:"column",gap:"1.2rem"},
  field:{display:"flex",flexDirection:"column",gap:"0.4rem"},
  label:{fontSize:"0.74rem",fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.06em"},
  input:{
    padding:"0.9rem 1.1rem",borderRadius:"0.75rem",fontSize:"0.97rem",
    border:"1px solid rgba(255,255,255,.35)",background:"rgba(255,255,255,.25)",color:"#111827",outline:"none",
    backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",
  },
  passRow:{display:"flex",border:"1px solid rgba(255,255,255,.35)",borderRadius:"0.75rem",overflow:"hidden",background:"rgba(255,255,255,.25)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)"},
  passInput:{flex:1,padding:"0.9rem 1.1rem",border:"none",fontSize:"0.97rem",color:"#111827",outline:"none",background:"transparent"},
  eyeBtn:{padding:"0 0.9rem",border:"none",background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",borderRadius:0},

  primary:{
    display:"flex",alignItems:"center",justifyContent:"center",gap:6,
    padding:"0.95rem",border:"none",borderRadius:"0.75rem",
    background:"linear-gradient(135deg,#0021A5 0%,#003087 60%,#1a3fa0 100%)",color:"#fff",
    cursor:"pointer",fontSize:"1rem",fontWeight:700,
    boxShadow:"0 4px 20px rgba(0,33,165,.3)",
  },

  divider:{display:"flex",alignItems:"center",gap:"0.65rem",margin:"0.15rem 0"},
  divLine:{flex:1,height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)"},
  divText:{fontSize:"0.72rem",color:"#9CA3AF",fontWeight:500},

  footer:{fontSize:"0.88rem",color:"#6B7280",textAlign:"center",margin:0},
  link:{color:"#0021A5",fontWeight:600,cursor:"pointer",borderBottom:"1px solid rgba(0,33,165,.2)"},
};

export default Login;
