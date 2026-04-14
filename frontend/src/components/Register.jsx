import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check, User, MapPin } from "lucide-react";
import { authHeaders, saveUserSession } from "../utils/auth.js";
import { GOOGLE_CLIENT_ID, STUDY_CITIES } from "../constants/cities.js";
import logo from "../assets/MyTranslationBuddyLogo.png";

/* ── Shared keyframes (re-uses auth-kf from Login if present) ── */
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
/* Register-specific extras */
if (!document.getElementById("reg-kf2")) {
  const s2 = document.createElement("style"); s2.id = "reg-kf2";
  s2.textContent = `
    .reg-city2:hover{border-color:rgba(255,255,255,.5)!important;background:rgba(255,255,255,.35)!important}
    .reg-scroll2::-webkit-scrollbar{width:4px}
    .reg-scroll2::-webkit-scrollbar-thumb{background:rgba(255,255,255,.4);border-radius:99px}
    .reg-scroll2::-webkit-scrollbar-track{background:transparent}
  `;
  document.head.appendChild(s2);
}

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studyCity, setStudyCity] = useState("");
  const [major, setMajor] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);
  const googleCallbackRef = useRef(null);

  /* ── Google OAuth ─────────────────────────────────── */
  googleCallbackRef.current = async (response) => {
    try {
      const res = await axios.post("/api/auth/google", { credential: response.credential });
      if (res.status === 200) {
        saveUserSession(res.data);
        if (res.data.full_name) setFullName(res.data.full_name);
        setEmail(res.data.email);
        if (!res.data.needs_setup && !res.data.is_new_user) { navigate("/profile"); return; }
        setIsGoogleSignup(true); setStep(2); setErrorMsg("");
      }
    } catch (err) { setErrorMsg(err.response?.data?.detail || "Google sign-up failed."); }
  };

  useEffect(() => {
    const initGoogle = () => {
      if (window.google && googleBtnRef.current) {
        window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: (r) => googleCallbackRef.current(r) });
        window.google.accounts.id.renderButton(googleBtnRef.current, { theme: "outline", size: "large", width: 380, text: "signup_with", shape: "pill" });
      }
    };
    if (window.google) { initGoogle(); return; }
    const sc = document.createElement("script");
    sc.src = "https://accounts.google.com/gsi/client"; sc.async = true; sc.defer = true; sc.onload = initGoogle;
    document.head.appendChild(sc);
    return () => { try { document.head.removeChild(sc); } catch {} };
  }, []);

  /* ── Validation ───────────────────────────────────── */
  const validatePassword = (pw) => {
    const e = [];
    if (pw.length < 8 || pw.length > 24) e.push("8–24 characters");
    if (!/[A-Z]/.test(pw)) e.push("one uppercase");
    if (!/[a-z]/.test(pw)) e.push("one lowercase");
    if (!/[0-9]/.test(pw)) e.push("one number");
    return e.length ? "Password needs: " + e.join(", ") : "";
  };
  const pwChecks = {
    length: password.length >= 8 && password.length <= 24,
    upper: /[A-Z]/.test(password), lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password), match: password.length > 0 && password === confirmPassword,
  };

  /* ── Step handlers ────────────────────────────────── */
  const handleStep1 = () => {
    if (!email || !password || !confirmPassword || !fullName) { setErrorMsg("Please fill in all required fields."); return; }
    if (!email.toLowerCase().endsWith("@ufl.edu")) { setErrorMsg("Only @ufl.edu emails allowed."); return; }
    const pwErr = validatePassword(password);
    if (pwErr) { setErrorMsg(pwErr); return; }
    if (password !== confirmPassword) { setErrorMsg("Passwords do not match!"); return; }
    setErrorMsg(""); setStep(2);
  };

  const handleRegister = async () => {
    if (!studyCity) { setErrorMsg("Please select your study abroad city."); return; }
    setIsSubmitting(true); setErrorMsg("");
    try {
      if (isGoogleSignup) {
        const resp = await axios.put("/api/user/profile", { email, full_name: fullName, study_abroad_city: studyCity, major }, authHeaders ? authHeaders() : {});
        if (resp.status === 200) {
          saveUserSession({ email, full_name: fullName, study_abroad_city: studyCity });
          if (major) localStorage.setItem("major", major);
          navigate("/profile"); return;
        }
      }
      const response = await axios.post("/api/register", { email, password, full_name: fullName, study_abroad_city: studyCity, major });
      if (response.status === 200 || response.status === 201) {
        try { const lr = await axios.post("/api/login", { email, password }); if (lr.status === 200) { saveUserSession(lr.data); navigate("/profile"); return; } } catch {}
        navigate("/login");
      }
    } catch (error) {
      const s = error.response?.status, d = error.response?.data?.detail || "";
      if (s === 409 || d.toLowerCase().includes("already")) setErrorMsg("Account already exists. Try signing in.");
      else if (s === 429) setErrorMsg("Too many attempts. Wait a moment.");
      else if (d) setErrorMsg(d);
      else setErrorMsg("Could not connect. Please try again.");
    } finally { setIsSubmitting(false); }
  };

  const kd = (e) => { if (e.key === "Enter") { step === 1 ? handleStep1() : handleRegister(); } };
  const filteredCities = citySearch ? STUDY_CITIES.filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase())) : STUDY_CITIES;

  /* ── Step indicator (dark theme) ──────────────────── */
  const StepIndicator = () => (
    <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1.25rem"}}>
      {[{n:1,label:"Account",icon:<User size={12}/>},{n:2,label:"City",icon:<MapPin size={12}/>}].map((s,i) => (
        <React.Fragment key={s.n}>
          {i > 0 && <div style={{flex:1,height:2,borderRadius:1,background:step >= s.n ? "linear-gradient(90deg,#FA4616,#0021A5)" : "#E5E7EB",transition:"background 0.35s"}}/>}
          <div style={{display:"flex",alignItems:"center",gap:"0.3rem",cursor:s.n < step ? "pointer" : "default"}}
            onClick={() => { if (s.n < step && !isGoogleSignup) { setStep(s.n); setErrorMsg(""); } }}>
            <div style={{
              width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
              background:step > s.n ? "linear-gradient(135deg,#FA4616,#FF6B35)" : step === s.n ? "linear-gradient(135deg,#0021A5,#003087)" : "#F3F4F6",
              color:step >= s.n ? "#fff" : "#9CA3AF",fontSize:"10px",fontWeight:700,
              transition:"all 0.35s",boxShadow:step === s.n ? "0 0 16px rgba(0,33,165,.2)" : step > s.n ? "0 0 12px rgba(250,70,22,.15)" : "none",
            }}>
              {step > s.n ? <Check size={12} strokeWidth={3}/> : s.n}
            </div>
            <span style={{fontSize:"0.72rem",fontWeight:step === s.n ? 700 : 500,color:step === s.n ? "#111827" : step > s.n ? "#FA4616" : "#9CA3AF"}}>{s.label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  /* ── Password strength (dark) ─────────────────────── */
  const PwStrength = () => {
    if (!password) return null;
    return (
      <div style={{display:"flex",flexWrap:"wrap",gap:"0.25rem 0.6rem",marginTop:"0.1rem"}}>
        {[
          {ok:pwChecks.length,text:"8–24 chars"},{ok:pwChecks.upper,text:"Uppercase"},
          {ok:pwChecks.lower,text:"Lowercase"},{ok:pwChecks.number,text:"Number"},{ok:pwChecks.match,text:"Match"},
        ].map((c,i) => (
          <span key={i} style={{fontSize:"0.68rem",fontWeight:600,color:c.ok ? "#059669" : "#D1D5DB",display:"flex",alignItems:"center",gap:"0.2rem",transition:"color 0.25s"}}>
            {c.ok
              ? <span style={{width:14,height:14,borderRadius:"50%",background:"linear-gradient(135deg,#34D399,#10B981)",display:"inline-flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 8px rgba(52,211,153,.25)"}}><Check size={8} color="#fff" strokeWidth={3}/></span>
              : <span style={{width:14,height:14,borderRadius:"50%",border:"1.5px solid #D1D5DB",display:"inline-block"}}/>}
            {c.text}
          </span>
        ))}
      </div>
    );
  };

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

      {/* ── Card ── */}
      <div style={S.cardWrap}>
        <div style={S.logoRow}>
          <img src={logo} alt="MTB" style={S.logo} onClick={() => navigate("/")} />
        </div>

        <div style={S.card} key={step}>
          <StepIndicator/>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div style={{animation:"authUp .4s ease both"}}>
              <h1 style={S.title}>Create account</h1>

              {errorMsg && <div style={S.error}>{errorMsg}</div>}

              <div style={S.form}>
                <div style={S.field}>
                  <label style={S.label}>Full Name</label>
                  <input className="auth-input" type="text" placeholder="Your full name" value={fullName}
                    onChange={e=>{setFullName(e.target.value);if(errorMsg)setErrorMsg("");}} onKeyDown={kd} style={S.input}/>
                </div>

                <div style={S.field}>
                  <label style={S.label}>Email</label>
                  <input className="auth-input" type="email" placeholder="gator@ufl.edu" value={email}
                    onChange={e=>{setEmail(e.target.value);if(errorMsg)setErrorMsg("");}} onKeyDown={kd} style={S.input}/>
                </div>

                <div style={S.field}>
                  <label style={S.label}>Password</label>
                  <div style={S.passRow}>
                    <input className="auth-input" type={showPassword?"text":"password"} placeholder="Create a password" value={password}
                      onChange={e=>{setPassword(e.target.value);if(errorMsg)setErrorMsg("");}} onKeyDown={kd} style={S.passInput}/>
                    <button className="auth-eye" onClick={()=>setShowPassword(!showPassword)} style={S.eyeBtn} type="button">
                      {showPassword ? <EyeOff size={15} color="#9CA3AF"/> : <Eye size={15} color="#9CA3AF"/>}
                    </button>
                  </div>
                </div>

                <div style={S.field}>
                  <label style={S.label}>Confirm Password</label>
                  <div style={S.passRow}>
                    <input className="auth-input" type={showConfirm?"text":"password"} placeholder="Confirm password" value={confirmPassword}
                      onChange={e=>{setConfirmPassword(e.target.value);if(errorMsg)setErrorMsg("");}} onKeyDown={kd} style={S.passInput}/>
                    <button className="auth-eye" onClick={()=>setShowConfirm(!showConfirm)} style={S.eyeBtn} type="button">
                      {showConfirm ? <EyeOff size={15} color="#9CA3AF"/> : <Eye size={15} color="#9CA3AF"/>}
                    </button>
                  </div>
                </div>

                <PwStrength/>

                <button className="auth-btn" onClick={handleStep1} style={S.primary}>
                  Continue <ArrowRight size={15}/>
                </button>

                <div style={S.divider}><span style={S.divLine}/><span style={S.divText}>or</span><span style={S.divLine}/></div>
                <div ref={googleBtnRef} style={{display:"flex",justifyContent:"center"}}/>

                <p style={S.footer}>
                  Have an account?{" "}
                  <span className="auth-link" onClick={()=>navigate("/login")} style={S.link}>Sign In →</span>
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div style={{animation:"authUp .4s ease both"}}>
              <h1 style={S.title}>{isGoogleSignup ? "Complete your profile" : "Where are you studying?"}</h1>

              {errorMsg && <div style={S.error}>{errorMsg}</div>}

              <div style={S.form}>
                {isGoogleSignup && (
                  <div style={S.field}>
                    <label style={S.label}>Full Name</label>
                    <input className="auth-input" type="text" placeholder="Your full name" value={fullName}
                      onChange={e=>{setFullName(e.target.value);if(errorMsg)setErrorMsg("");}} onKeyDown={kd} style={S.input}/>
                  </div>
                )}

                <div style={S.field}>
                  <label style={S.label}>Study Abroad City</label>
                  <input className="auth-input" type="text" placeholder="🔍 Search cities…" value={citySearch}
                    onChange={e=>setCitySearch(e.target.value)} style={{...S.input,marginBottom:"0.35rem"}}/>
                  <div className="reg-scroll2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem",maxHeight:240,overflowY:"auto",paddingRight:"0.15rem"}}>
                    {filteredCities.map(c => {
                      const sel = studyCity === c.slug;
                      return (
                        <div key={c.slug} className="reg-city2"
                          onClick={()=>{setStudyCity(c.slug);if(errorMsg)setErrorMsg("");}}
                          style={{
                            display:"flex",alignItems:"center",gap:"0.45rem",padding:"0.65rem 0.8rem",
                            borderRadius:"0.7rem",cursor:"pointer",transition:"all .15s",
                            border:sel ? "1.5px solid #FA4616" : "1px solid rgba(255,255,255,.3)",
                            background:sel ? "rgba(250,70,22,.08)" : "rgba(255,255,255,.18)",
                            backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",
                            boxShadow:sel ? "0 0 0 2px rgba(250,70,22,.08)" : "none",
                          }}>
                          <span style={{fontSize:"1.05rem"}}>{c.country}</span>
                          <span style={{fontSize:"0.86rem",fontWeight:sel?700:500,color:sel?"#111827":"#6B7280",flex:1}}>{c.name}</span>
                          {sel && <Check size={13} color="#FA4616"/>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={S.field}>
                  <label style={S.label}>Major <span style={{fontSize:"0.65rem",color:"#9CA3AF",fontWeight:400,textTransform:"none"}}>(optional)</span></label>
                  <input className="auth-input" type="text" placeholder="e.g. Computer Science" value={major}
                    onChange={e=>setMajor(e.target.value)} onKeyDown={kd} style={S.input}/>
                </div>

                <div style={{display:"flex",gap:"0.6rem"}}>
                  {!isGoogleSignup && (
                    <button className="auth-btn" onClick={()=>{setStep(1);setErrorMsg("");}} style={S.secondary}>
                      <ArrowLeft size={14}/> Back
                    </button>
                  )}
                  <button className="auth-btn" onClick={handleRegister} disabled={isSubmitting}
                    style={{...S.primary,flex:1,opacity:isSubmitting?.6:1}}>
                    {isSubmitting ? (
                      <span style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{width:15,height:15,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"authSpin .6s linear infinite"}}/>
                        Creating…
                      </span>
                    ) : <>Create Account <ArrowRight size={15}/></>}
                  </button>
                </div>

                <p style={S.footer}>
                  Have an account?{" "}
                  <span className="auth-link" onClick={()=>navigate("/login")} style={S.link}>Sign In →</span>
                </p>
              </div>
            </div>
          )}
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
    padding:"2rem 1rem",
  },

  meshWrap:{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"},
  blob:{position:"absolute",borderRadius:"50%",filter:"blur(90px)",willChange:"transform"},

  cardWrap:{position:"relative",zIndex:2,width:"100%",maxWidth:580,animation:"authUp .5s ease both, authFloat 5s ease-in-out infinite .5s"},

  logoRow:{display:"flex",justifyContent:"center",marginBottom:"1.5rem"},
  logo:{height:60,objectFit:"contain",cursor:"pointer",filter:"drop-shadow(0 0 28px rgba(0,33,165,.25))"},

  card:{
    background:"rgba(255,255,255,.35)",
    backdropFilter:"blur(50px) saturate(1.6)",WebkitBackdropFilter:"blur(50px) saturate(1.6)",
    borderRadius:"1.75rem",border:"1px solid rgba(255,255,255,.45)",
    borderTop:"2.5px solid #FA4616",
    padding:"2.5rem 2.25rem 2.1rem",
    boxShadow:"0 12px 60px rgba(0,33,165,.12), 0 0 40px rgba(250,70,22,.06), 0 0 0 1px rgba(255,255,255,.5) inset",
    animation:"authGlow 6s ease-in-out infinite",
  },

  title:{fontSize:"1.6rem",fontWeight:700,color:"#111827",margin:"0 0 1.15rem",letterSpacing:"-0.02em",textAlign:"center"},

  error:{
    fontSize:"0.82rem",fontWeight:500,color:"#DC2626",
    background:"rgba(254,242,242,.8)",border:"1px solid #FECACA",
    borderRadius:"0.65rem",padding:"0.65rem 0.9rem",marginBottom:"0.55rem",
  },

  form:{display:"flex",flexDirection:"column",gap:"1.05rem"},
  field:{display:"flex",flexDirection:"column",gap:"0.35rem"},
  label:{fontSize:"0.72rem",fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.06em"},
  input:{
    padding:"0.9rem 1.05rem",borderRadius:"0.75rem",fontSize:"0.95rem",
    border:"1px solid rgba(255,255,255,.35)",background:"rgba(255,255,255,.25)",color:"#111827",outline:"none",
    backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",
  },
  passRow:{display:"flex",border:"1px solid rgba(255,255,255,.35)",borderRadius:"0.75rem",overflow:"hidden",background:"rgba(255,255,255,.25)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)"},
  passInput:{flex:1,padding:"0.9rem 1.05rem",border:"none",fontSize:"0.95rem",color:"#111827",outline:"none",background:"transparent"},
  eyeBtn:{padding:"0 0.85rem",border:"none",background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",borderRadius:0},

  primary:{
    display:"flex",alignItems:"center",justifyContent:"center",gap:6,
    padding:"0.9rem",border:"none",borderRadius:"0.75rem",
    background:"linear-gradient(135deg,#0021A5 0%,#003087 60%,#1a3fa0 100%)",color:"#fff",
    cursor:"pointer",fontSize:"0.95rem",fontWeight:700,
    boxShadow:"0 4px 20px rgba(0,33,165,.3)",
  },
  secondary:{
    display:"flex",alignItems:"center",justifyContent:"center",gap:4,
    padding:"0.8rem 1.1rem",borderRadius:"0.7rem",
    border:"1px solid rgba(255,255,255,.35)",background:"rgba(255,255,255,.2)",
    backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",
    color:"#6B7280",cursor:"pointer",fontSize:"0.88rem",fontWeight:600,
  },

  divider:{display:"flex",alignItems:"center",gap:"0.65rem"},
  divLine:{flex:1,height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)"},
  divText:{fontSize:"0.72rem",color:"#9CA3AF",fontWeight:500},

  footer:{fontSize:"0.86rem",color:"#6B7280",textAlign:"center",margin:0},
  link:{color:"#0021A5",fontWeight:600,cursor:"pointer",borderBottom:"1px solid rgba(0,33,165,.2)"},
};

export default Register;
