import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, ArrowRight, ArrowLeft, GraduationCap, Globe, Languages, MapPin, Check, User } from "lucide-react";
import { authHeaders } from "../utils/auth.js";
import logo from "../assets/MTBLogo.png";

const GOOGLE_CLIENT_ID = "142798767749-a6u0rv4pgjk0kqbi84uligsq77nt8cjr.apps.googleusercontent.com";

const STUDY_CITIES = [
  { slug:"berlin", name:"Berlin", country:"🇩🇪" },
  { slug:"munich", name:"Munich", country:"🇩🇪" },
  { slug:"hamburg", name:"Hamburg", country:"🇩🇪" },
  { slug:"stuttgart", name:"Stuttgart", country:"🇩🇪" },
  { slug:"aachen", name:"Aachen", country:"🇩🇪" },
  { slug:"bonn", name:"Bonn", country:"🇩🇪" },
  { slug:"detmold", name:"Detmold", country:"🇩🇪" },
  { slug:"ebs", name:"Wiesbaden (EBS)", country:"🇩🇪" },
  { slug:"eltville", name:"Eltville", country:"🇩🇪" },
  { slug:"jena", name:"Jena", country:"🇩🇪" },
  { slug:"lemgo", name:"Lemgo", country:"🇩🇪" },
  { slug:"mannheim", name:"Mannheim", country:"🇩🇪" },
  { slug:"osnabruck", name:"Osnabrück", country:"🇩🇪" },
  { slug:"vallendar", name:"Vallendar", country:"🇩🇪" },
  { slug:"wurzburg", name:"Würzburg", country:"🇩🇪" },
  { slug:"leipzig", name:"Leipzig", country:"🇩🇪" },
  { slug:"vienna", name:"Vienna", country:"🇦🇹" },
  { slug:"salzburg", name:"Salzburg", country:"🇦🇹" },
  { slug:"graz", name:"Graz", country:"🇦🇹" },
  { slug:"zurich", name:"Zurich", country:"🇨🇭" },
  { slug:"bern", name:"Bern", country:"🇨🇭" },
  { slug:"rapperswil", name:"Rapperswil-Jona", country:"🇨🇭" },
  { slug:"winterthur", name:"Winterthur", country:"🇨🇭" },
];

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
        // Store email + token from Google
        localStorage.setItem("email", res.data.email);
        if (res.data.token) localStorage.setItem("token", res.data.token);
        // Pre-fill full name from Google if available
        if (res.data.full_name) setFullName(res.data.full_name);
        // Set email in form and jump to step 2 (onboarding)
        setEmail(res.data.email);
        setIsGoogleSignup(true);
        setStep(2);
        setErrorMsg("");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.detail || "Google sign-up failed.");
    }
  };

  useEffect(() => {
    const initGoogle = () => {
      if (window.google && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (resp) => googleCallbackRef.current(resp),
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline", size: "large", width: 360,
          text: "signup_with", shape: "rectangular",
        });
      }
    };
    if (window.google) { initGoogle(); return; }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true; script.defer = true;
    script.onload = initGoogle;
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch {} };
  }, []);

  /* ── Validation ───────────────────────────────────── */
  const validatePassword = (pw) => {
    const errors = [];
    if (pw.length < 8 || pw.length > 24) errors.push("8\u201324 characters");
    if (!/[A-Z]/.test(pw)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(pw)) errors.push("one lowercase letter");
    if (!/[0-9]/.test(pw)) errors.push("one number");
    if (errors.length > 0) return "Password must contain: " + errors.join(", ");
    return "";
  };

  const pwChecks = {
    length: password.length >= 8 && password.length <= 24,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    match: password.length > 0 && password === confirmPassword,
  };

  /* ── Step handlers ────────────────────────────────── */
  const handleStep1 = () => {
    if (!email || !password || !confirmPassword || !fullName) { setErrorMsg("Please fill in all required fields."); return; }
    if (!email.toLowerCase().endsWith("@ufl.edu")) { setErrorMsg("Only @ufl.edu email addresses are allowed."); return; }
    const pwErr = validatePassword(password);
    if (pwErr) { setErrorMsg(pwErr); return; }
    if (password !== confirmPassword) { setErrorMsg("Passwords do not match!"); return; }
    setErrorMsg("");
    setStep(2);
  };

  const handleRegister = async () => {
    if (!studyCity) { setErrorMsg("Please select your study abroad city."); return; }
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      // For Google signups, just update the profile
      if (isGoogleSignup) {
        const resp = await axios.put("/api/user/profile", {
          email,
          full_name: fullName,
          study_abroad_city: studyCity,
          major,
        }, authHeaders ? authHeaders() : {});
        if (resp.status === 200) {
          localStorage.setItem("email", email);
          localStorage.setItem("full_name", fullName);
          localStorage.setItem("study_abroad_city", studyCity);
          if (major) localStorage.setItem("major", major);
          navigate("/profile");
          return;
        }
      }
      
      // For regular signups, register then login
      const response = await axios.post("/api/register", {
        email, password, full_name: fullName, study_abroad_city: studyCity, major,
      });
      if (response.status === 200 || response.status === 201) {
        try {
          const loginRes = await axios.post("/api/login", { email, password });
          if (loginRes.status === 200) {
            localStorage.setItem("email", loginRes.data.email);
            localStorage.setItem("full_name", loginRes.data.full_name || "");
            localStorage.setItem("study_abroad_city", loginRes.data.study_abroad_city || "");
            if (loginRes.data.token) localStorage.setItem("token", loginRes.data.token);
            if (loginRes.data.saved_cities) localStorage.setItem("myCities", JSON.stringify(loginRes.data.saved_cities));
            if (loginRes.data.vocab_cards) localStorage.setItem("vocabCards", JSON.stringify(loginRes.data.vocab_cards));
            if (loginRes.data.saved_events) localStorage.setItem("savedEvents", JSON.stringify(loginRes.data.saved_events));
            if (loginRes.data.study_stats) localStorage.setItem("studyStats", JSON.stringify(loginRes.data.study_stats));
            navigate("/profile");
            return;
          }
        } catch { /* fall through */ }
        navigate("/login");
      }
    } catch (error) {
      const status = error.response?.status;
      const detail = error.response?.data?.detail || "";
      if (status === 409 || detail.toLowerCase().includes("already")) {
        setErrorMsg("An account with this email already exists. Try signing in instead.");
      } else if (status === 429) {
        setErrorMsg("Too many attempts. Please wait a moment and try again.");
      } else if (detail) {
        setErrorMsg(detail);
      } else {
        setErrorMsg("Could not connect to the server. Please try again.");
      }
    } finally { setIsSubmitting(false); }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") { step === 1 ? handleStep1() : handleRegister(); } };

  const filteredCities = citySearch
    ? STUDY_CITIES.filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase()))
    : STUDY_CITIES;

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
          {/* Step indicator */}
          <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.75rem"}}>
            {[{n:1,label:"Account",icon:<User size={14}/>},{n:2,label:"Study Abroad",icon:<MapPin size={14}/>}].map((s,i) => (
              <React.Fragment key={s.n}>
                {i > 0 && <div style={{flex:1,height:2,borderRadius:1,background:step >= s.n ? "#0021A5" : "#E5E7EB",transition:"background 0.3s"}}/>}
                <div style={{display:"flex",alignItems:"center",gap:"0.4rem",cursor:s.n < step ? "pointer" : "default"}} onClick={() => { if (s.n < step) { setStep(s.n); setErrorMsg(""); } }}>
                  <div style={{
                    width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                    background:step > s.n ? "#0021A5" : step === s.n ? "linear-gradient(135deg,#0021A5,#003087)" : "#F3F4F6",
                    color:step >= s.n ? "#fff" : "#9CA3AF",fontSize:"12px",fontWeight:700,transition:"all 0.3s",
                    boxShadow:step === s.n ? "0 2px 8px rgba(0,33,165,0.25)" : "none",
                  }}>
                    {step > s.n ? <Check size={14}/> : s.n}
                  </div>
                  <span style={{fontSize:"0.8rem",fontWeight:step === s.n ? 700 : 500,color:step === s.n ? "#111827" : "#9CA3AF",transition:"all 0.3s"}}>{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* ── STEP 1: Account ── */}
          {step === 1 && (
            <>
              <h1 style={S.title}>Create your account</h1>
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
                  <span style={{fontSize:"0.72rem",color:"#9CA3AF",marginTop:"0.15rem"}}>Only @ufl.edu emails accepted</span>
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

                {/* Live password checklist */}
                {password.length > 0 && (
                  <div style={{display:"flex",flexWrap:"wrap",gap:"0.35rem 0.75rem"}}>
                    {[
                      {ok:pwChecks.length, text:"8–24 chars"},
                      {ok:pwChecks.upper, text:"Uppercase"},
                      {ok:pwChecks.lower, text:"Lowercase"},
                      {ok:pwChecks.number, text:"Number"},
                      {ok:pwChecks.match, text:"Match"},
                    ].map((c,i) => (
                      <span key={i} style={{fontSize:"0.72rem",fontWeight:600,color:c.ok ? "#059669" : "#9CA3AF",display:"flex",alignItems:"center",gap:"0.2rem"}}>
                        {c.ok ? <Check size={11} strokeWidth={3}/> : <span style={{width:11,height:11,borderRadius:"50%",border:"1.5px solid #D1D5DB",display:"inline-block"}}/>}
                        {c.text}
                      </span>
                    ))}
                  </div>
                )}

                <button onClick={handleStep1} style={S.primary}>Continue <ArrowRight size={16}/></button>

                <div style={S.divider}><span style={S.divLine}/><span style={S.divText}>or continue with</span><span style={S.divLine}/></div>
                <div ref={googleBtnRef} style={S.googleBtn} />
                <p style={S.switchText}>Already have an account?{" "}<span onClick={() => navigate("/login")} style={S.switchLink}>Sign In</span></p>
              </div>
            </>
          )}

          {/* ── STEP 2: Study Abroad ── */}
          {step === 2 && (
            <>
              <h1 style={S.title}>{isGoogleSignup ? "Complete your profile" : "Where are you studying?"}</h1>
              <p style={S.sub}>{isGoogleSignup ? `Welcome ${email}! Help us personalize your experience` : "Select your city so we can personalize your experience"}</p>
              {errorMsg && <div style={S.error}>{errorMsg}</div>}
              <div style={S.form}>
                <div style={S.field}>
                  <label style={S.label}>Full Name <span style={{color:"#DC2626"}}>*</span></label>
                  <input type="text" placeholder="Your full name" value={fullName}
                    onChange={e => { setFullName(e.target.value); if (errorMsg) setErrorMsg(""); }}
                    onKeyDown={handleKeyDown} style={S.input} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Study Abroad City <span style={{color:"#DC2626"}}>*</span></label>
                  <input type="text" placeholder="Search cities…" value={citySearch}
                    onChange={e => setCitySearch(e.target.value)} style={{...S.input, marginBottom:"0.5rem"}} />
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem",maxHeight:260,overflowY:"auto",paddingRight:"0.25rem"}}>
                    {filteredCities.map(c => {
                      const sel = studyCity === c.slug;
                      return (
                        <div key={c.slug} onClick={() => { setStudyCity(c.slug); if (errorMsg) setErrorMsg(""); }} style={{
                          display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.6rem 0.75rem",
                          borderRadius:"0.6rem",cursor:"pointer",transition:"all 0.15s",
                          border:sel ? "2px solid #0021A5" : "1.5px solid #E5E7EB",
                          background:sel ? "#EFF6FF" : "#fff",
                          boxShadow:sel ? "0 0 0 3px rgba(0,33,165,0.08)" : "none",
                        }}>
                          <span style={{fontSize:"1.05rem"}}>{c.country}</span>
                          <span style={{fontSize:"0.84rem",fontWeight:sel ? 700 : 500,color:sel ? "#0021A5" : "#374151"}}>{c.name}</span>
                          {sel && <Check size={14} color="#0021A5" style={{marginLeft:"auto"}}/>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={S.field}>
                  <label style={S.label}>Major <span style={{fontSize:"0.72rem",color:"#9CA3AF",fontWeight:400}}>(optional)</span></label>
                  <input type="text" placeholder="e.g. Computer Science" value={major}
                    onChange={e => setMajor(e.target.value)} onKeyDown={handleKeyDown} style={S.input} />
                </div>

                <div style={{display:"flex",gap:"0.75rem"}}>
                  <button onClick={() => { setStep(1); setErrorMsg(""); }} style={S.secondary}><ArrowLeft size={14}/> Back</button>
                  <button onClick={handleRegister} disabled={isSubmitting} style={{...S.primary,flex:1,opacity:isSubmitting ? 0.7 : 1}}>
                    {isSubmitting ? "Creating account…" : "Create Account"} {!isSubmitting && <ArrowRight size={16}/>}
                  </button>
                </div>

                <p style={S.switchText}>Already have an account?{" "}<span onClick={() => navigate("/login")} style={S.switchLink}>Sign In</span></p>
              </div>
            </>
          )}
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
  secondary:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.35rem",padding:"0.85rem 1.25rem",border:"1.5px solid #D1D5DB",borderRadius:"0.6rem",background:"#fff",color:"#374151",cursor:"pointer",fontSize:"0.92rem",fontWeight:600},
  divider:{display:"flex",alignItems:"center",gap:"0.75rem",margin:"0.25rem 0"},
  divLine:{flex:1,height:"1px",backgroundColor:"#E5E7EB"},
  divText:{fontSize:"0.78rem",color:"#9CA3AF",fontWeight:500,whiteSpace:"nowrap"},
  googleBtn:{display:"flex",justifyContent:"center"},
  switchText:{fontSize:"0.88rem",color:"#6B7280",textAlign:"center",margin:"0.5rem 0 0 0"},
  switchLink:{color:"#0021A5",fontWeight:600,cursor:"pointer"},
};

export default Register;
