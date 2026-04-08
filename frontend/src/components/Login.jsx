import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, ArrowRight, GraduationCap, Globe, Languages } from "lucide-react";
import logo from "../assets/MTBLogo.png";

const GOOGLE_CLIENT_ID = "142798767749-a6u0rv4pgjk0kqbi84uligsq77nt8cjr.apps.googleusercontent.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline", size: "large", width: 360,
          text: "signin_with", shape: "rectangular",
        });
      }
    };
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch {} };
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post("/api/auth/google", { credential: response.credential });
      if (res.status === 200) {
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("full_name", res.data.full_name || "");
        localStorage.setItem("study_abroad_city", res.data.study_abroad_city || "");
        if (res.data.saved_cities) localStorage.setItem("myCities", JSON.stringify(res.data.saved_cities));
        navigate("/");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.detail || "Google sign-in failed.");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) { setErrorMsg("Please fill in all fields."); return; }
    if (!email.toLowerCase().endsWith("@ufl.edu")) { setErrorMsg("Only @ufl.edu email addresses are allowed."); return; }
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("full_name", response.data.full_name || "");
        localStorage.setItem("study_abroad_city", response.data.study_abroad_city || "");
        if (response.data.saved_cities) localStorage.setItem("myCities", JSON.stringify(response.data.saved_cities));
        navigate("/");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.detail || "Invalid login credentials.");
    } finally { setIsSubmitting(false); }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <div style={S.page}>
      <div style={S.left}>
        <div style={S.leftIn}>
          <img src={logo} alt="MTB" style={S.logoImg} onClick={() => navigate("/")} />
          <h1 style={S.leftBrand}>MyTranslationBuddy</h1>
          <h2 style={S.leftT}>Welcome back 👋<br/><span style={S.leftHL}>Ready to explore?</span></h2>
          <p style={S.leftSub}>Pick up where you left off — explore cities, practice phrases, and get ready for your semester abroad.</p>
          <div style={S.features}>
            <div style={S.feat}><Globe size={18} color="rgba(255,255,255,0.9)"/> <span>23 cities across Germany, Austria & Switzerland</span></div>
            <div style={S.feat}><Languages size={18} color="rgba(255,255,255,0.9)"/> <span>295+ curated German phrases & dialect tips</span></div>
            <div style={S.feat}><GraduationCap size={18} color="rgba(255,255,255,0.9)"/> <span>Built by UF students, for UF students</span></div>
          </div>
        </div>
        <p style={S.leftFoot}>MyTranslationBuddy</p>
      </div>

      <div style={S.right}>
        <div style={S.formWrap}>
          <h1 style={S.title}>Sign In</h1>
          <p style={S.sub}>Use your UF email to continue</p>

          {errorMsg && <div style={S.error}>{errorMsg}</div>}

          <div style={S.form}>
            <div style={S.field}>
              <label style={S.label}>Email</label>
              <input type="email" placeholder="your.name@ufl.edu" value={email}
                onChange={e => { setEmail(e.target.value); if (errorMsg) setErrorMsg(""); }}
                onKeyDown={handleKeyDown} style={S.input} />
            </div>

            <div style={S.field}>
              <label style={S.label}>Password</label>
              <div style={S.passWrap}>
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (errorMsg) setErrorMsg(""); }}
                  onKeyDown={handleKeyDown} style={S.passInput} />
                <button onClick={() => setShowPassword(!showPassword)} style={S.eyeBtn} type="button">
                  {showPassword ? <EyeOff size={17} color="#9CA3AF"/> : <Eye size={17} color="#9CA3AF"/>}
                </button>
              </div>
            </div>

            <p style={S.hint}>Only @ufl.edu email addresses are accepted</p>

            <button onClick={handleLogin} disabled={isSubmitting} style={{...S.primary, opacity: isSubmitting ? 0.7 : 1}}>
              {isSubmitting ? "Signing in..." : "Sign In"} <ArrowRight size={16}/>
            </button>

            <div style={S.divider}>
              <span style={S.divLine}/><span style={S.divText}>or continue with</span><span style={S.divLine}/>
            </div>

            <div ref={googleBtnRef} style={S.googleBtn} />

            <p style={S.switchText}>
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")} style={S.switchLink}>Create Account</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const S = {
  page: { minHeight:"100vh", display:"flex", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif" },
  left: { width:"45%", minHeight:"100vh", background:"linear-gradient(135deg,#0021A5 0%,#003087 50%,#1a1a2e 100%)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"3rem", position:"relative" },
  leftIn: { maxWidth:400 },
  logoImg: { height:80, objectFit:"contain", cursor:"pointer", marginBottom:"1rem", filter:"drop-shadow(0 4px 12px rgba(255,255,255,0.15))" },
  leftBrand: { fontSize:"1.1rem", fontWeight:700, color:"rgba(255,255,255,0.7)", margin:"0 0 1.5rem 0", letterSpacing:"0.02em" },
  leftT: { fontSize:"2rem", fontWeight:800, color:"#fff", margin:"0 0 1rem 0", lineHeight:1.25 },
  leftHL: { background:"linear-gradient(90deg,#FA4616,#FFB347)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
  leftSub: { fontSize:"1rem", color:"rgba(255,255,255,0.8)", margin:"0 0 2rem 0", lineHeight:1.6 },
  features: { display:"flex", flexDirection:"column", gap:"0.85rem" },
  feat: { display:"flex", alignItems:"center", gap:"0.65rem", fontSize:"0.9rem", color:"rgba(255,255,255,0.85)", fontWeight:500 },
  leftFoot: { position:"absolute", bottom:"2rem", left:"3rem", fontSize:"0.75rem", color:"rgba(255,255,255,0.4)" },
  right: { flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", backgroundColor:"#F9FAFB" },
  formWrap: { width:"100%", maxWidth:420 },
  title: { fontSize:"1.75rem", fontWeight:800, color:"#111827", margin:"0 0 0.35rem 0" },
  sub: { fontSize:"0.92rem", color:"#6B7280", margin:"0 0 1.75rem 0" },
  error: { color:"#DC2626", fontSize:"0.85rem", backgroundColor:"#FEF2F2", padding:"0.75rem 1rem", borderRadius:"0.6rem", marginBottom:"1rem", border:"1px solid #FECACA" },
  form: { display:"flex", flexDirection:"column", gap:"1rem" },
  field: { display:"flex", flexDirection:"column", gap:"0.35rem" },
  label: { fontSize:"0.82rem", fontWeight:600, color:"#374151" },
  input: { padding:"0.75rem 1rem", border:"1px solid #D1D5DB", borderRadius:"0.6rem", fontSize:"0.92rem", outline:"none", backgroundColor:"#fff" },
  passWrap: { display:"flex", border:"1px solid #D1D5DB", borderRadius:"0.6rem", overflow:"hidden", backgroundColor:"#fff" },
  passInput: { flex:1, padding:"0.75rem 1rem", border:"none", fontSize:"0.92rem", outline:"none" },
  eyeBtn: { padding:"0 0.85rem", border:"none", backgroundColor:"transparent", cursor:"pointer", display:"flex", alignItems:"center" },
  hint: { fontSize:"0.75rem", color:"#9CA3AF", margin:0 },
  primary: { display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", padding:"0.85rem", border:"none", borderRadius:"0.6rem", background:"linear-gradient(135deg,#0021A5,#003087)", color:"#fff", cursor:"pointer", fontSize:"1rem", fontWeight:700, boxShadow:"0 4px 14px rgba(0,33,165,0.3)" },
  divider: { display:"flex", alignItems:"center", gap:"0.75rem", margin:"0.25rem 0" },
  divLine: { flex:1, height:"1px", backgroundColor:"#E5E7EB" },
  divText: { fontSize:"0.78rem", color:"#9CA3AF", fontWeight:500, whiteSpace:"nowrap" },
  googleBtn: { display:"flex", justifyContent:"center" },
  switchText: { fontSize:"0.88rem", color:"#6B7280", textAlign:"center", margin:"0.5rem 0 0 0" },
  switchLink: { color:"#0021A5", fontWeight:600, cursor:"pointer" },
};

export default Login;
