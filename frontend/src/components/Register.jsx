import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, ArrowRight, GraduationCap, Globe, Languages, MapPin, BookOpen } from "lucide-react";
import logo from "../assets/MTBLogo.png";

const GOOGLE_CLIENT_ID = "142798767749-a6u0rv4pgjk0kqbi84uligsq77nt8cjr.apps.googleusercontent.com";

const Register = () => {
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
          text: "signup_with", shape: "rectangular",
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
      setErrorMsg(err.response?.data?.detail || "Google sign-up failed.");
    }
  };

  const validatePassword = (pw) => {
    const errors = [];
    if (pw.length < 8 || pw.length > 24) errors.push("8\u201324 characters");
    if (!/[A-Z]/.test(pw)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(pw)) errors.push("one lowercase letter");
    if (!/[0-9]/.test(pw)) errors.push("one number");
    if (errors.length > 0) return "Password must contain: " + errors.join(", ");
    return "";
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !fullName || !studyCity) { setErrorMsg("Please fill in all required fields."); return; }
    if (!email.toLowerCase().endsWith("@ufl.edu")) { setErrorMsg("Only @ufl.edu email addresses are allowed."); return; }
    const pwErr = validatePassword(password);
    if (pwErr) { setErrorMsg(pwErr); return; }
    if (password !== confirmPassword) { setErrorMsg("Passwords do not match!"); return; }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/register", {
        email, password, full_name: fullName, study_abroad_city: studyCity, major,
      });
      if (response.status === 200 || response.status === 201) navigate("/login");
    } catch (error) {
      setErrorMsg(error.response?.data?.detail || "Could not connect to the server. Is the backend running?");
    } finally { setIsSubmitting(false); }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleRegister(); };

  return (
    <div style={S.page}>
      {/* Left panel */}
      <div style={S.left}>
        <div style={S.leftIn}>
          <img src={logo} alt="MTB" style={S.logoImg} onClick={() => navigate("/")} />
          <h1 style={S.leftBrand}>MyTranslationBuddy</h1>
          <h2 style={S.leftT}>Ready to go<br/><span style={S.leftHL}>abroad?</span></h2>
          <p style={S.leftSub}>Learn local phrases, explore 23 cities, and get the most out of your semester in Germany, Austria & Switzerland.</p>
          <div style={S.features}>
            <div style={S.feat}><Globe size={18} color="rgba(255,255,255,0.9)"/> <span>Interactive map of 23 cities across 3 countries</span></div>
            <div style={S.feat}><Languages size={18} color="rgba(255,255,255,0.9)"/> <span>280+ phrases with dialect-specific tips</span></div>
            <div style={S.feat}><MapPin size={18} color="rgba(255,255,255,0.9)"/> <span>Local events, weather & cultural guides</span></div>
            <div style={S.feat}><GraduationCap size={18} color="rgba(255,255,255,0.9)"/> <span>Built by UF students, for UF students</span></div>
          </div>
        </div>
        <p style={S.leftFoot}>MyTranslationBuddy</p>
      </div>

      {/* Right panel */}
      <div style={S.right}>
        <div style={S.formWrap}>
          <h1 style={S.title}>Create Account</h1>
          <p style={S.sub}>Use your UF email to get started</p>

          {errorMsg && <div style={S.error}>{errorMsg}</div>}

          <div style={S.form}>
            <div style={S.field}>
              <label style={S.label}>Full Name <span style={{color:"#DC2626"}}>*</span></label>
              <input type="text" placeholder="Your full name" value={fullName}
                onChange={e => { setFullName(e.target.value); if (errorMsg) setErrorMsg(""); }}
                onKeyDown={handleKeyDown} style={S.input} />
            </div>

            <div style={S.field}>
              <label style={S.label}>Email <span style={{color:"#DC2626"}}>*</span></label>
              <input type="email" placeholder="your.name@ufl.edu" value={email}
                onChange={e => { setEmail(e.target.value); if (errorMsg) setErrorMsg(""); }}
                onKeyDown={handleKeyDown} style={S.input} />
            </div>

            <div style={S.row}>
              <div style={{...S.field, flex:1}}>
                <label style={S.label}>Major</label>
                <input type="text" placeholder="e.g. Computer Science" value={major}
                  onChange={e => setMajor(e.target.value)} style={S.input} />
              </div>
              <div style={{...S.field, flex:1}}>
                <label style={S.label}>Study City <span style={{color:"#DC2626"}}>*</span></label>
                <input type="text" placeholder="e.g. Berlin" value={studyCity}
                  onChange={e => setStudyCity(e.target.value)} style={S.input} />
              </div>
            </div>

            <div style={S.field}>
              <label style={S.label}>Password <span style={{color:"#DC2626"}}>*</span></label>
              <div style={S.passWrap}>
                <input type={showPassword ? "text" : "password"} placeholder="Create a password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (errorMsg) setErrorMsg(""); }}
                  onKeyDown={handleKeyDown} style={S.passInput} />
                <button onClick={() => setShowPassword(!showPassword)} style={S.eyeBtn} type="button">
                  {showPassword ? <EyeOff size={17} color="#9CA3AF"/> : <Eye size={17} color="#9CA3AF"/>}
                </button>
              </div>
            </div>

            <div style={S.field}>
              <label style={S.label}>Confirm Password <span style={{color:"#DC2626"}}>*</span></label>
              <div style={S.passWrap}>
                <input type={showConfirm ? "text" : "password"} placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); if (errorMsg) setErrorMsg(""); }}
                  onKeyDown={handleKeyDown} style={S.passInput} />
                <button onClick={() => setShowConfirm(!showConfirm)} style={S.eyeBtn} type="button">
                  {showConfirm ? <EyeOff size={17} color="#9CA3AF"/> : <Eye size={17} color="#9CA3AF"/>}
                </button>
              </div>
            </div>

            <p style={S.hint}>
              Only @ufl.edu emails accepted.
              <br />
              Password: at least 8 characters, 1 uppercase, 1 lowercase, 1 number.
            </p>
            
            <button onClick={handleRegister} disabled={isSubmitting} style={{...S.primary, opacity: isSubmitting ? 0.7 : 1}}>
              {isSubmitting ? "Creating account..." : "Create Account"} <ArrowRight size={16}/>
            </button>

            <div style={S.divider}>
              <span style={S.divLine}/><span style={S.divText}>or continue with</span><span style={S.divLine}/>
            </div>

            <div ref={googleBtnRef} style={S.googleBtn} />

            <p style={S.switchText}>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} style={S.switchLink}>Sign In</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const S = {
  page:{minHeight:"100vh",display:"flex",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif"},
  left:{width:"45%",minHeight:"100vh",background:"linear-gradient(135deg,#0021A5 0%,#003087 50%,#1a1a2e 100%)",display:"flex",flexDirection:"column",justifyContent:"center",padding:"3rem",position:"relative"},
  leftIn:{maxWidth:400},
  logoImg:{height:80,objectFit:"contain",cursor:"pointer",marginBottom:"1rem",filter:"drop-shadow(0 4px 12px rgba(255,255,255,0.15))"},
  leftBrand:{fontSize:"1.1rem",fontWeight:700,color:"rgba(255,255,255,0.7)",margin:"0 0 1.5rem 0",letterSpacing:"0.02em"},
  leftT:{fontSize:"2rem",fontWeight:800,color:"#fff",margin:"0 0 1rem 0",lineHeight:1.25},
  leftHL:{background:"linear-gradient(90deg,#FA4616,#FFB347)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  leftSub:{fontSize:"1rem",color:"rgba(255,255,255,0.8)",margin:"0 0 2rem 0",lineHeight:1.6},
  features:{display:"flex",flexDirection:"column",gap:"0.85rem"},
  feat:{display:"flex",alignItems:"center",gap:"0.65rem",fontSize:"0.9rem",color:"rgba(255,255,255,0.85)",fontWeight:500},
  leftFoot:{position:"absolute",bottom:"2rem",left:"3rem",fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"},
  right:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",backgroundColor:"#F9FAFB",overflowY:"auto"},
  formWrap:{width:"100%",maxWidth:460},
  title:{fontSize:"1.75rem",fontWeight:800,color:"#111827",margin:"0 0 0.35rem 0"},
  sub:{fontSize:"0.92rem",color:"#6B7280",margin:"0 0 1.5rem 0"},
  error:{color:"#DC2626",fontSize:"0.85rem",backgroundColor:"#FEF2F2",padding:"0.75rem 1rem",borderRadius:"0.6rem",marginBottom:"1rem",border:"1px solid #FECACA"},
  form:{display:"flex",flexDirection:"column",gap:"0.85rem"},
  field:{display:"flex",flexDirection:"column",gap:"0.3rem"},
  label:{fontSize:"0.82rem",fontWeight:600,color:"#374151"},
  input:{padding:"0.7rem 1rem",border:"1px solid #D1D5DB",borderRadius:"0.6rem",fontSize:"0.92rem",outline:"none",backgroundColor:"#fff"},
  row:{display:"flex",gap:"0.75rem"},
  passWrap:{display:"flex",border:"1px solid #D1D5DB",borderRadius:"0.6rem",overflow:"hidden",backgroundColor:"#fff"},
  passInput:{flex:1,padding:"0.7rem 1rem",border:"none",fontSize:"0.92rem",outline:"none"},
  eyeBtn:{padding:"0 0.85rem",border:"none",backgroundColor:"transparent",cursor:"pointer",display:"flex",alignItems:"center"},
  hint:{fontSize:"0.75rem",color:"#9CA3AF",margin:0},
  primary:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",padding:"0.85rem",border:"none",borderRadius:"0.6rem",background:"linear-gradient(135deg,#0021A5,#003087)",color:"#fff",cursor:"pointer",fontSize:"1rem",fontWeight:700,boxShadow:"0 4px 14px rgba(0,33,165,0.3)"},
  divider:{display:"flex",alignItems:"center",gap:"0.75rem",margin:"0.25rem 0"},
  divLine:{flex:1,height:"1px",backgroundColor:"#E5E7EB"},
  divText:{fontSize:"0.78rem",color:"#9CA3AF",fontWeight:500,whiteSpace:"nowrap"},
  googleBtn:{display:"flex",justifyContent:"center"},
  switchText:{fontSize:"0.88rem",color:"#6B7280",textAlign:"center",margin:"0.5rem 0 0 0"},
  switchLink:{color:"#0021A5",fontWeight:600,cursor:"pointer"},
};

export default Register;
