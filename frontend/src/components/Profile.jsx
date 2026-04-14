import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/MyTranslationBuddyLogo.png";
import { handleLogout as sharedLogout, authHeaders } from "../utils/auth.js";
import {
  User, MapPin, LogOut, Trash2, Key, Save, Globe, Calendar,
  Bookmark, Clock, Compass, ClipboardList, Home, GraduationCap,
  ChevronRight, Shield, X, Check, Heart, Edit3, Settings,
  ExternalLink, Sparkles, Star, Volume2
} from "lucide-react";

const ALL_CITIES = [
  { name:"Berlin",          slug:"berlin",     country:"DE", emoji:"🏛️", tag:"Capital & culture" },
  { name:"Munich",          slug:"munich",     country:"DE", emoji:"🍺", tag:"Beer gardens & Alps" },
  { name:"Hamburg",         slug:"hamburg",    country:"DE", emoji:"⚓", tag:"Harbor & nightlife" },
  { name:"Stuttgart",       slug:"stuttgart",  country:"DE", emoji:"🚗", tag:"Auto & media hub" },
  { name:"Aachen",          slug:"aachen",     country:"DE", emoji:"🔬", tag:"Engineering & trips" },
  { name:"Bonn",            slug:"bonn",       country:"DE", emoji:"🎵", tag:"Beethoven & Rhine" },
  { name:"Detmold",         slug:"detmold",    country:"DE", emoji:"🌲", tag:"Design & forest" },
  { name:"Wiesbaden (EBS)", slug:"ebs",        country:"DE", emoji:"🍷", tag:"Spa city & wine" },
  { name:"Eltville",        slug:"eltville",   country:"DE", emoji:"🏰", tag:"Rhine wine village" },
  { name:"Jena",            slug:"jena",       country:"DE", emoji:"🔭", tag:"Science & optics" },
  { name:"Lemgo",           slug:"lemgo",      country:"DE", emoji:"🚲", tag:"Medieval & bikes" },
  { name:"Mannheim",        slug:"mannheim",   country:"DE", emoji:"🏯", tag:"Palace campus" },
  { name:"Osnabrück",       slug:"osnabruck",  country:"DE", emoji:"🕊️", tag:"City of peace" },
  { name:"Vallendar",       slug:"vallendar",  country:"DE", emoji:"📊", tag:"Top business school" },
  { name:"Würzburg",        slug:"wurzburg",   country:"DE", emoji:"🍷", tag:"Wine & baroque" },
  { name:"Leipzig",         slug:"leipzig",    country:"DE", emoji:"🎨", tag:"Art & nightlife" },
  { name:"Vienna",          slug:"vienna",     country:"AT", emoji:"🎼", tag:"Opera & coffeehouses" },
  { name:"Salzburg",        slug:"salzburg",   country:"AT", emoji:"🏔️", tag:"Alpine & Mozart" },
  { name:"Graz",            slug:"graz",       country:"AT", emoji:"🕰️", tag:"UNESCO old town" },
  { name:"Zurich",          slug:"zurich",     country:"CH", emoji:"🏦", tag:"Lake & innovation" },
  { name:"Bern",            slug:"bern",       country:"CH", emoji:"🐻", tag:"Swiss capital & Aare" },
  { name:"Rapperswil-Jona", slug:"rapperswil", country:"CH", emoji:"🌹", tag:"Rose town on lake" },
  { name:"Winterthur",      slug:"winterthur", country:"CH", emoji:"🔬", tag:"Museums & ZHAW" },
];
const FLAGS = { DE:"🇩🇪", AT:"🇦🇹", CH:"🇨🇭" };
const COUNTRY_NAME = { DE:"Germany", AT:"Austria", CH:"Switzerland" };

const Profile = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email") || "";
  const mounted = useRef(true);
  const manageCitiesRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [studyCity, setStudyCity] = useState("");
  const [major, setMajor] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [myCities, setMyCities] = useState([]);
  const [activeTab, setActiveTab] = useState("cities");
  const [cityFilter, setCityFilter] = useState("");
  const [cityToast, setCityToast] = useState("");
  const [ready, setReady] = useState(false);
  const scrollToManageCities = () => {
    setActiveTab("cities"); // First switch to cities tab
    setTimeout(() => {
      if (manageCitiesRef.current) {
        const element = manageCitiesRef.current;
        const headerOffset = 80; // Adjust this value based on your header height (in pixels)
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100); // Small delay to ensure tab is rendered
  };

  useEffect(() => {
    mounted.current = true;
    if (!userEmail) { navigate("/login"); return; }
    const load = async () => {
      await Promise.all([fetchProfile(), fetchBookmarks()]);
      if (mounted.current) setReady(true);
    };
    load();
    const safety = setTimeout(() => { if (mounted.current) setReady(true); }, 5000);
    return () => { mounted.current = false; clearTimeout(safety); };
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/user/profile", { params: { email: userEmail }, timeout: 8000, ...authHeaders() });
      if (!mounted.current) return;
      const data = res.data;
      setProfile(data);
      setFullName(data.full_name || "");
      setStudyCity(data.study_abroad_city || "");
      setMajor(data.major || "");
      if (Array.isArray(data.saved_cities) && data.saved_cities.length > 0) {
        setMyCities(data.saved_cities);
        localStorage.setItem("myCities", JSON.stringify(data.saved_cities));
      } else {
        const stored = localStorage.getItem("myCities");
        if (stored) { try { const p = JSON.parse(stored); if (Array.isArray(p) && p.length) { setMyCities(p); axios.put("/api/user/profile", { email: userEmail, saved_cities: p }, authHeaders()).catch(()=>{}); } } catch {} }
      }
      if (Array.isArray(data.saved_events) && data.saved_events.length > 0) {
        setSavedEvents(data.saved_events);
        localStorage.setItem("savedEvents", JSON.stringify(data.saved_events));
      } else {
        const stored = localStorage.getItem("savedEvents");
        if (stored) { try { const p = JSON.parse(stored); if (Array.isArray(p) && p.length) { setSavedEvents(p); axios.put("/api/user/profile", { email: userEmail, saved_events: p }, authHeaders()).catch(()=>{}); } } catch {} }
      }
    } catch {
      if (!mounted.current) return;
      setProfile({ email: userEmail, full_name: localStorage.getItem("full_name")||"", study_abroad_city: localStorage.getItem("study_abroad_city")||"", major:"", created_at:null, saved_cities:[], saved_events:[] });
      try { const s = localStorage.getItem("myCities"); if (s) setMyCities(JSON.parse(s)); } catch {}
      try { const s = localStorage.getItem("savedEvents"); if (s) setSavedEvents(JSON.parse(s)); } catch {}
    }
  };

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get("/api/phrases/bookmarks", { ...authHeaders(), params: { user_email: userEmail }, timeout: 6000 });
      if (!mounted.current) return;
      const bms = res.data.bookmarks || [];
      setBookmarks(bms);
      setBookmarkCount(bms.length);
    } catch {}
  };

  const persistCities = (next, wasAdded) => {
    setMyCities(next);
    localStorage.setItem("myCities", JSON.stringify(next));
    if (userEmail) axios.put("/api/user/profile", { email: userEmail, saved_cities: next }, authHeaders()).catch(()=>{});
    if (wasAdded) {
      setCityToast("New city added!");
      setTimeout(() => setCityToast(""), 2500);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/user/profile", { email: userEmail, full_name: fullName, study_abroad_city: studyCity, major }, authHeaders());
      setProfile(prev => ({ ...prev, full_name: fullName, study_abroad_city: studyCity, major }));
      localStorage.setItem("full_name", fullName);
      localStorage.setItem("study_abroad_city", studyCity);
      setStatusMsg("✓ Profile updated!");
      setEditing(false);
      setTimeout(() => setStatusMsg(""), 3000);
    } catch { setStatusMsg("Failed to update profile."); }
  };

  const handleLogout = async () => {
    try {
      await sharedLogout(navigate);
    } catch (err) {
      console.error("Logout failed:", err);
      // Still clear and navigate even if endpoint fails
      navigate("/");
    }
  };

  const handleDelete = async () => {
    try { await axios.post("/api/delete", { email: userEmail }, authHeaders()); localStorage.clear(); navigate("/"); }
    catch { setStatusMsg("Failed to delete account."); }
    setShowDeletePopup(false);
  };

  /* ---- loading guard ---- */
  if (!ready || !profile) {
    return (
      <div style={S.page}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",flexDirection:"column",gap:"1rem"}}>
          <div style={{width:44,height:44,borderRadius:"50%",border:"3px solid #FA4616",borderTopColor:"transparent",animation:"mtbSpin 0.8s linear infinite"}}/>
          <p style={{color:"#9CA3AF",fontSize:"0.9rem"}}>Loading your profile…</p>
        </div>
      </div>
    );
  }

  const initials = (profile.full_name || profile.email || "U").split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
  const memberDays = profile.created_at ? Math.max(1, Math.floor((Date.now() - new Date(profile.created_at).getTime()) / 86400000)) : null;
  const primaryCity = ALL_CITIES.find(c => c.name === profile.study_abroad_city || c.slug === (profile.study_abroad_city||"").toLowerCase());

  const TABS = [
    { id:"cities",   label:"My Cities",  icon:<MapPin size={14}/> },
    { id:"saved",    label:"Saved",       icon:<Bookmark size={14}/> },
    { id:"settings", label:"Settings",    icon:<Settings size={14}/> },
  ];

  /* city filter helper */
  const cityMatches = (city) => {
    if (!cityFilter) return true;
    const q = cityFilter.toLowerCase();
    return city.name.toLowerCase().includes(q) || city.tag.toLowerCase().includes(q) || city.slug.includes(q);
  };

  return (
  <div style={S.page}>
    {/* NAV */}
    <header style={S.hdr}>
      <div style={S.hdrIn}>
        <div style={S.hdrL} onClick={() => navigate("/")}>
          <img src={logo} alt="MTB" style={{height:72}}/>
          <span style={S.brand}>MyTranslationBuddy</span>
        </div>
        <nav style={S.nav}>
          <button 
            onClick={() => navigate("/tips")} 
            style={S.nb}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}
          >
            <Compass size={15}/> Explore
          </button>
          <button 
            onClick={() => navigate("/reservations")} 
            style={S.nb}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}
          >
            <ClipboardList size={15}/> Study
          </button>
          <button 
            onClick={() => navigate("/events")} 
            style={S.nb}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}
          >
            <Calendar size={15}/> Events
          </button>
          <button 
            onClick={() => navigate("/")} 
            style={S.nb}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}
          >
            <Home size={15}/> Home
          </button>
          <button style={{...S.nb,backgroundColor:"#fff",fontWeight:700,color:"#0021A5",boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
            <User size={15}/> Profile
          </button>
          <button 
            onClick={handleLogout} 
            style={{...S.nb,color:"#DC2626",marginLeft:"0.25rem"}} 
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#FEF2F2"; e.currentTarget.style.color="#DC2626";}} 
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280";}}
          >
            <LogOut size={14}/> Logout
          </button>
        </nav>
      </div>
    </header>

      <main style={S.main}>
        {/* -------- SETUP BANNER — for new Google OAuth users who need to finish setup -------- */}
        {(!profile.study_abroad_city && !profile.major && myCities.length === 0) && (
          <div style={{background:"linear-gradient(135deg,#FFF7ED,#FFFBEB)",border:"1.5px solid #FED7AA",borderRadius:"1rem",padding:"1.25rem 1.5rem",marginBottom:"1.25rem",display:"flex",alignItems:"center",gap:"1rem",boxShadow:"0 4px 16px rgba(250,70,22,0.08)"}}>
            <div style={{width:44,height:44,borderRadius:"0.75rem",background:"linear-gradient(135deg,#FA4616,#FF6B35)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Sparkles size={22} color="#fff"/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <h3 style={{fontSize:"1rem",fontWeight:700,color:"#92400E",margin:"0 0 0.2rem"}}>Welcome to MyTranslationBuddy! 🎉</h3>
              <p style={{fontSize:"0.82rem",color:"#78350F",margin:0,lineHeight:1.45}}>
                Let's finish setting up your profile — pick your study abroad city and save the cities you want to explore. This helps us personalize your experience.
              </p>
            </div>
            <button onClick={() => { setEditing(true); setActiveTab("cities"); }} style={{padding:"0.55rem 1.1rem",border:"none",borderRadius:"0.6rem",background:"linear-gradient(135deg,#FA4616,#FF6B35)",color:"#fff",cursor:"pointer",fontSize:"0.82rem",fontWeight:700,boxShadow:"0 3px 12px rgba(250,70,22,0.25)",whiteSpace:"nowrap",flexShrink:0}}>
              Get Started
            </button>
          </div>
        )}

        {/* -------- HERO BANNER -------- */}
        <div style={S.hero}>
          <div style={S.heroGrad}/>
          <div style={S.heroOrb}/>
          <div style={S.heroOrb2}/>
          <div style={S.heroContent}>
            <div style={S.avatar}><span style={S.avatarTxt}>{initials}</span></div>
            <div style={{flex:1,minWidth:180}}>
              <p style={S.heroLabel}>Study Abroad Profile</p>
              <h1 style={S.heroName}>{profile.full_name || "Gator"}</h1>
              <p style={S.heroEmail}>{profile.email}</p>
              <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",marginTop:"0.6rem"}}>
                {primaryCity && <span style={S.pill}>{primaryCity.emoji} {primaryCity.name}</span>}
                {profile.major && <span style={S.pill}><GraduationCap size={11}/> {profile.major}</span>}
                {memberDays && <span style={S.pill}><Clock size={11}/> {memberDays}d member</span>}
              </div>
            </div>
            <div style={S.statsBox}>
              <div style={S.stat} onClick={() => setActiveTab("saved")}>
                <span style={S.statNum}>{bookmarkCount}</span>
                <span style={S.statLbl}>Phrases</span>
              </div>
              <div style={S.statDiv}/>
              <div style={S.stat} onClick={scrollToManageCities}>
                <span style={S.statNum}>{myCities.length}</span>
                <span style={S.statLbl}>Cities</span>
              </div>
              <div style={S.statDiv}/>
              <div style={S.stat} onClick={() => setActiveTab("saved")}>
                <span style={S.statNum}>{savedEvents.length}</span>
                <span style={S.statLbl}>Events</span>
              </div>
            </div>
          </div>
        </div>

        {/* -------- TABS -------- */}
        <div style={S.tabBar}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{...S.tab,...(activeTab===t.id ? S.tabOn : {})}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ======== CITIES TAB ======== */}
        {activeTab === "cities" && (
          <div style={S.tabBody}>
            {/* Profile Details — inline at top of Cities tab */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"0.25rem"}}>
              <div style={S.card}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.85rem"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
                    <div style={{width:26,height:26,borderRadius:"0.45rem",background:"#F3F4F6",display:"flex",alignItems:"center",justifyContent:"center"}}><User size={12} color="#374151"/></div>
                    <h3 style={{fontSize:"0.82rem",fontWeight:700,color:"#111827",margin:0}}>Profile Details</h3>
                  </div>
                  {!editing && <button onClick={() => setEditing(true)} style={{display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.25rem 0.55rem",border:"1px solid #D1D5DB",borderRadius:"0.4rem",backgroundColor:"#fff",cursor:"pointer",fontSize:"0.65rem",fontWeight:600,color:"#6B7280",transition:"all 0.15s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#0021A5";e.currentTarget.style.color="#0021A5";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#D1D5DB";e.currentTarget.style.color="#6B7280";}}><Edit3 size={10}/> Edit</button>}
                </div>
                {statusMsg && <div style={S.statusBanner}>{statusMsg}</div>}
                {editing ? (
                  <div style={{display:"flex",flexDirection:"column",gap:"0.7rem"}}>
                    <div style={S.field}><label style={S.lbl}>Full Name</label><input value={fullName} onChange={e=>setFullName(e.target.value)} style={S.inp} placeholder="Your full name"/></div>
                    <div style={S.field}><label style={S.lbl}>Major / Program</label><input value={major} onChange={e=>setMajor(e.target.value)} style={S.inp} placeholder="e.g. Journalism, CS"/></div>
                    <div style={S.field}>
                      <label style={S.lbl}>Primary City</label>
                      <select value={studyCity} onChange={e=>setStudyCity(e.target.value)} style={{...S.inp,cursor:"pointer"}}>
                        <option value="">Select city</option>
                        {["DE","AT","CH"].map(cc => (
                          <optgroup key={cc} label={FLAGS[cc]+" "+COUNTRY_NAME[cc]}>
                            {ALL_CITIES.filter(c=>c.country===cc).map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div style={{display:"flex",gap:"0.5rem"}}>
                      <button onClick={handleSave} style={{...S.saveBtn,fontSize:"0.78rem",padding:"0.45rem 0.9rem"}}><Save size={12}/> Save</button>
                      <button onClick={() => setEditing(false)} style={{...S.cancelBtn,fontSize:"0.78rem",padding:"0.45rem 0.9rem"}}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
                    {[
                      { icon:<User size={12} color="#6B7280"/>,          lbl:"Name",    val:profile.full_name },
                      { icon:<GraduationCap size={12} color="#6B7280"/>, lbl:"Major",   val:profile.major },
                      { icon:<MapPin size={12} color="#6B7280"/>,        lbl:"City",    val:profile.study_abroad_city },
                      { icon:<Clock size={12} color="#6B7280"/>,         lbl:"Member",  val:memberDays ? `${memberDays} days` : null },
                    ].map((item,i) => (
                      <div key={i} style={{display:"flex",gap:"0.4rem",alignItems:"center"}}>
                        {item.icon}
                        <span style={{fontSize:"0.62rem",color:"#9CA3AF",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.03em",minWidth:40}}>{item.lbl}</span>
                        <span style={{fontSize:"0.78rem",color:item.val?"#111827":"#D1D5DB",fontWeight:600}}>{item.val || "Not set"}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* At-a-glance stats card */}
              <div style={S.card}>
                <div style={{display:"flex",alignItems:"center",gap:"0.45rem",marginBottom:"0.85rem"}}>
                  <div style={{width:26,height:26,borderRadius:"0.45rem",background:"#FFF7ED",display:"flex",alignItems:"center",justifyContent:"center"}}><Sparkles size={12} color="#FA4616"/></div>
                  <h3 style={{fontSize:"0.82rem",fontWeight:700,color:"#111827",margin:0}}>At a Glance</h3>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem"}}>
                  {[
                    {num:myCities.length, lbl:"Cities Saved", color:"#0021A5", bg:"#EFF6FF", icon:<MapPin size={14} color="#0021A5"/>, action:scrollToManageCities},
                    {num:bookmarkCount, lbl:"Phrases", color:"#7C3AED", bg:"#F5F3FF", icon:<Bookmark size={14} color="#7C3AED"/>, action:()=>setActiveTab("saved")},
                    {num:savedEvents.length, lbl:"Events", color:"#DC2626", bg:"#FEF2F2", icon:<Heart size={14} color="#DC2626"/>, action:()=>setActiveTab("saved")},
                    {num:(()=>{try{const c=JSON.parse(localStorage.getItem("vocabCards")||"[]");return c.filter(v=>v.mastery>=3).length;}catch{return 0;}})(), lbl:"Mastered", color:"#059669", bg:"#ECFDF5", icon:<GraduationCap size={14} color="#059669"/>, action:()=>{}},
                  ].map((s,i) => (
                    <div key={i} onClick={s.action} style={{display:"flex",alignItems:"center",gap:"0.6rem",padding:"0.65rem 0.75rem",borderRadius:"0.65rem",background:s.bg,cursor:"pointer",transition:"all 0.15s"}}
                      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                      <div style={{width:32,height:32,borderRadius:"0.5rem",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>{s.icon}</div>
                      <div>
                        <p style={{fontSize:"1.15rem",fontWeight:800,color:s.color,margin:0,lineHeight:1}}>{s.num}</p>
                        <p style={{fontSize:"0.58rem",color:"#6B7280",margin:0,fontWeight:600}}>{s.lbl}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div ref={manageCitiesRef} style={S.card}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",flexWrap:"wrap",gap:"0.5rem"}}>
                <div>
                  <h3 style={S.cardTitle}>Manage Cities</h3>
                  <p style={S.cardSub}>Pick the cities you're interested in — we'll personalize tips, phrases & events.</p>
                </div>
                <span style={S.badge}>{myCities.length} selected</span>
              </div>
              {["DE","AT","CH"].map(cc => {
                const filtered = ALL_CITIES.filter(c => c.country === cc && cityMatches(c));
                if (filtered.length === 0) return null;
                const selectedCount = ALL_CITIES.filter(c => c.country===cc && myCities.includes(c.slug)).length;
                return (
                  <div key={cc} style={{marginBottom:"1.25rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.45rem",marginBottom:"0.5rem"}}>
                      <span style={{fontSize:"1rem"}}>{FLAGS[cc]}</span>
                      <span style={{fontSize:"0.72rem",fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.04em"}}>{COUNTRY_NAME[cc]}</span>
                      <span style={{fontSize:"0.65rem",color:"#9CA3AF"}}>{selectedCount} saved</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:"0.4rem"}}>
                      {filtered.map(city => {
                        const on = myCities.includes(city.slug);
                        const primary = city.name === profile.study_abroad_city;
                        return (
                          <button key={city.slug} onClick={() => persistCities(on ? myCities.filter(s=>s!==city.slug) : [...myCities,city.slug], !on)}
                            onMouseEnter={e=>{if(!on)e.currentTarget.style.borderColor="#0021A5";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,33,165,0.1)";}}
                            onMouseLeave={e=>{if(!on)e.currentTarget.style.borderColor=on?"#0021A5":"#E5E7EB";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
                            style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.5rem 0.7rem",borderRadius:"0.6rem",
                              border: on ? "1.5px solid #0021A5" : "1px solid #E5E7EB",
                              backgroundColor: on ? "#EFF6FF" : "#FAFAFA",
                              cursor:"pointer",transition:"all 0.15s",textAlign:"left",width:"100%"}}>
                            <span style={{fontSize:"0.95rem",lineHeight:1}}>{city.emoji}</span>
                            <div style={{flex:1,minWidth:0,overflow:"hidden"}}>
                              <p style={{fontSize:"0.78rem",fontWeight: on ? 700 : 500,color: on ? "#0021A5" : "#374151",margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{city.name}</p>
                              <p style={{fontSize:"0.58rem",color:"#9CA3AF",margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{city.tag}</p>
                            </div>
                            {primary && <Star size={11} color="#FA4616" fill="#FA4616" style={{flexShrink:0}}/>}
                            {on && !primary && <Check size={11} color="#0021A5" style={{flexShrink:0}}/>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======== SAVED TAB ======== */}
        {activeTab === "saved" && (
          <div style={S.tabBody}>
            {/* Saved Events — featured first */}
            <div style={S.card}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  <div style={{width:28,height:28,borderRadius:"0.5rem",background:"#FFF0F0",border:"1px solid #FECACA",display:"flex",alignItems:"center",justifyContent:"center"}}><Heart size={13} color="#DC2626"/></div>
                  <h3 style={S.cardTitle}>Saved Events</h3>
                  <span style={S.countPill}>{savedEvents.length}</span>
                </div>
                {savedEvents.length > 0 && <button onClick={() => navigate("/events")} style={S.linkBtn}>Browse more <ExternalLink size={11}/></button>}
              </div>
              {savedEvents.length > 0 ? (
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"0.75rem"}}>
                  {savedEvents.slice(0,6).map((ev,i) => (
                    <div key={ev.id||i} style={{display:"flex",gap:"0.75rem",padding:"0.75rem",background:"#FFFBF9",borderRadius:"0.85rem",border:"1px solid #FED7AA",cursor:"pointer",transition:"all 0.2s"}}
                      onClick={() => navigate("/events")}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="#FA4616";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 3px 12px rgba(250,70,22,0.1)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="#FED7AA";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                      {ev.image ? (
                        <div style={{width:56,height:56,borderRadius:"0.6rem",backgroundImage:`url(${ev.image})`,backgroundSize:"cover",backgroundPosition:"center",flexShrink:0}}/>
                      ) : (
                        <div style={{width:56,height:56,borderRadius:"0.6rem",background:"linear-gradient(135deg,#FA4616,#FF6B35)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Calendar size={20} color="#fff"/></div>
                      )}
                      <div style={{flex:1,minWidth:0,overflow:"hidden"}}>
                        <p style={{fontSize:"0.82rem",fontWeight:700,color:"#111827",margin:"0 0 0.25rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ev.name||ev.title||"Event"}</p>
                        <div style={{display:"flex",gap:"0.5rem",fontSize:"0.68rem",color:"#6B7280",alignItems:"center",flexWrap:"wrap"}}>
                          {ev.date && <span style={{display:"flex",alignItems:"center",gap:"0.2rem",background:"#FEF2F2",padding:"0.12rem 0.4rem",borderRadius:9999,color:"#92400E",fontWeight:600}}><Calendar size={9}/> {new Date(ev.date+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>}
                          {ev.city && <span style={{display:"flex",alignItems:"center",gap:"0.2rem"}}><MapPin size={9}/> {ev.city}</span>}
                          {ev.venue && <span style={{fontSize:"0.62rem",color:"#9CA3AF"}}>{ev.venue}</span>}
                        </div>
                        {ev.url && <a href={ev.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{display:"inline-flex",alignItems:"center",gap:"0.2rem",fontSize:"0.62rem",color:"#FA4616",fontWeight:600,textDecoration:"none",marginTop:"0.3rem"}}><ExternalLink size={9}/> Tickets</a>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={S.empty}>
                  <Heart size={28} color="#D1D5DB" style={{marginBottom:"0.5rem"}}/>
                  <p style={{margin:"0 0 0.2rem",color:"#374151",fontWeight:600,fontSize:"0.85rem"}}>No saved events yet</p>
                  <p style={{margin:0,color:"#9CA3AF",fontSize:"0.75rem"}}>Heart events on the Events page to save them here</p>
                  <button onClick={() => navigate("/events")} style={{...S.emptyBtn,marginTop:"0.75rem"}}>Browse events</button>
                </div>
              )}
              {savedEvents.length > 6 && <p style={{textAlign:"center",fontSize:"0.72rem",color:"#6B7280",marginTop:"0.75rem"}}>+ {savedEvents.length - 6} more — <button onClick={() => navigate("/events")} style={{background:"none",border:"none",color:"#FA4616",fontWeight:600,cursor:"pointer",fontSize:"0.72rem"}}>view all</button></p>}
            </div>

            {/* Bookmarked Phrases */}
            <div style={S.card}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  <div style={{width:28,height:28,borderRadius:"0.5rem",background:"#EFF6FF",border:"1px solid #BFDBFE",display:"flex",alignItems:"center",justifyContent:"center"}}><Bookmark size={13} color="#0021A5"/></div>
                  <h3 style={S.cardTitle}>Bookmarked Phrases</h3>
                  <span style={S.countPill}>{bookmarkCount}</span>
                </div>
                {bookmarkCount > 0 && <button onClick={() => navigate("/reservations?tab=saved")} style={S.linkBtn}>Practice all <ChevronRight size={12}/></button>}
              </div>
              {bookmarks.length > 0 ? (
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"0.6rem"}}>
                  {bookmarks.slice(0,12).map((bm,i) => {
                    const phrase = bm.phrase || bm;
                    const german = phrase.german_phrase || bm.german_phrase || bm.phrase || "";
                    const english = phrase.english_translation || bm.english_translation || bm.translation || "";
                    const cat = phrase.category || bm.category || "";
                    return (
                      <div key={bm._id||i} style={S.phraseCard}
                        onClick={() => navigate("/reservations?tab=saved")}>
                        <p style={{fontSize:"0.92rem",fontWeight:700,color:"#1E1B4B",margin:"0 0 0.2rem",lineHeight:1.3}}>{german}</p>
                        <p style={{fontSize:"0.73rem",color:"#6B7280",margin:"0 0 0.35rem"}}>{english}</p>
                        {cat && <span style={{fontSize:"0.56rem",fontWeight:600,color:"#6366F1",background:"#EEF2FF",padding:"0.1rem 0.4rem",borderRadius:9999,textTransform:"capitalize"}}>{cat}</span>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={S.empty}>
                  <Bookmark size={28} color="#D1D5DB" style={{marginBottom:"0.5rem"}}/>
                  <p style={{margin:"0 0 0.2rem",color:"#374151",fontWeight:600,fontSize:"0.85rem"}}>No saved phrases yet</p>
                  <p style={{margin:0,color:"#9CA3AF",fontSize:"0.75rem"}}>Bookmark phrases while browsing to build your collection</p>
                  <button onClick={() => navigate("/reservations")} style={{...S.emptyBtn,marginTop:"0.75rem"}}>Browse phrase library</button>
                </div>
              )}
              {bookmarks.length > 12 && <p style={{textAlign:"center",fontSize:"0.75rem",color:"#6B7280",marginTop:"0.75rem"}}>+ {bookmarks.length - 12} more — <button onClick={() => navigate("/reservations?tab=saved")} style={{background:"none",border:"none",color:"#0021A5",fontWeight:600,cursor:"pointer",fontSize:"0.75rem"}}>view all</button></p>}
            </div>
          </div>
        )}

        {/* ======== SETTINGS TAB ======== */}
        {activeTab === "settings" && (
          <div style={S.tabBody}>
            <div style={S.card}>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1rem"}}>
                <div style={{width:28,height:28,borderRadius:"0.5rem",background:"#EFF6FF",border:"1px solid #BFDBFE",display:"flex",alignItems:"center",justifyContent:"center"}}><Shield size={13} color="#0021A5"/></div>
                <h3 style={S.cardTitle}>Account & Security</h3>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.4rem"}}>
                {[
                  { icon:<Key size={15} color="#0021A5"/>,   bg:"#EFF6FF", title:"Change Password",  sub:"Update your login credentials",    action:()=>navigate("/update-password"), danger:false },
                  { icon:<LogOut size={15} color="#EA580C"/>, bg:"#FFF7ED", title:"Log Out",           sub:"Sign out of your account",         action:handleLogout,                     danger:false },
                  { icon:<Trash2 size={15} color="#DC2626"/>, bg:"#FEF2F2", title:"Delete Account",   sub:"Permanently remove all your data", action:()=>setShowDeletePopup(true),      danger:true },
                ].map((item,i) => (
                  <button key={i} onClick={item.action} style={{...S.accRow,...(item.danger?{borderColor:"#FECACA"}:{})}}
                    onMouseEnter={e=>e.currentTarget.style.background=item.danger?"#FEF2F2":"#F9FAFB"}
                    onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                    <div style={{width:38,height:38,borderRadius:"0.55rem",background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{item.icon}</div>
                    <div style={{flex:1,textAlign:"left"}}>
                      <p style={{fontSize:"0.84rem",fontWeight:600,color:item.danger?"#DC2626":"#111827",margin:0}}>{item.title}</p>
                      <p style={{fontSize:"0.7rem",color:"#9CA3AF",margin:"0.05rem 0 0"}}>{item.sub}</p>
                    </div>
                    <ChevronRight size={14} color={item.danger?"#FECACA":"#D1D5DB"}/>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete popup */}
      {showDeletePopup && (
        <div style={S.overlay}>
          <div style={S.popup}>
            <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1rem"}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:"#FEF2F2",display:"flex",alignItems:"center",justifyContent:"center"}}><Trash2 size={20} color="#DC2626"/></div>
              <div>
                <h3 style={{margin:0,color:"#111827",fontSize:"1rem",fontWeight:700}}>Delete account?</h3>
                <p style={{margin:"0.1rem 0 0",fontSize:"0.75rem",color:"#9CA3AF"}}>This cannot be undone</p>
              </div>
            </div>
            <p style={{fontSize:"0.84rem",color:"#6B7280",margin:"0 0 1.25rem",lineHeight:1.55}}>All your saved phrases, cities, events and profile data will be permanently deleted.</p>
            <div style={{display:"flex",gap:"0.6rem",justifyContent:"flex-end"}}>
              <button onClick={() => setShowDeletePopup(false)} style={S.cancelBtn}>Cancel</button>
              <button onClick={handleDelete} style={S.delBtn}><Trash2 size={13}/> Delete Forever</button>
            </div>
          </div>
        </div>
      )}

      {/* City-added toast popup */}
      {cityToast && (
        <div style={{position:"fixed",top:24,left:"50%",transform:"translateX(-50%)",zIndex:3000,animation:"mtbToastIn 0.3s ease-out"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.7rem 1.25rem",background:"#059669",borderRadius:"0.75rem",boxShadow:"0 8px 30px rgba(5,150,105,0.3)",color:"#fff",fontSize:"0.85rem",fontWeight:700,whiteSpace:"nowrap"}}>
            <Check size={16} color="#fff"/> {cityToast}
          </div>
        </div>
      )}

      <footer style={{textAlign:"center",padding:"1.25rem",color:"#9CA3AF",fontSize:"0.75rem",borderTop:"1px solid #E5E7EB",marginTop:"1rem"}}>
        <p style={{margin:0}}>© 2026 MyTranslationBuddy — Built by Gators, for Gators 🐊</p>
      </footer>
    </div>
  );
};

/* ══════════════════════════════════
   STYLES
   ══════════════════════════════════ */
const S = {
  page:{minHeight:"100vh",backgroundColor:"#F5F7FA",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif"},
  /* header */
  hdr:{backgroundColor:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid rgba(229,231,235,0.5)",position:"sticky",top:0,zIndex:1000,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},
  hdrIn:{maxWidth:1280,margin:"0 auto",padding:"0.2rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center"},
  hdrL:{display:"flex",alignItems:"center",gap:"0.6rem",cursor:"pointer"},
  brand:{fontSize:"1.05rem",fontWeight:800,color:"#0021A5",letterSpacing:"-0.01em"},
  nav:{display:"flex",gap:"0.15rem",alignItems:"center",background:"#F3F4F6",borderRadius:"0.65rem",padding:"0.2rem"},
  nb:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 0.85rem",border:"none",borderRadius:"0.5rem",backgroundColor:"transparent",color:"#6B7280",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,transition:"all 0.2s"},
  main:{maxWidth:900,margin:"2rem auto",padding:"0 1.5rem 3rem"},

  /* hero */
  hero:{position:"relative",borderRadius:"1.5rem",padding:"2rem 2.25rem",marginBottom:"1.5rem",overflow:"hidden",minHeight:120},
  heroGrad:{position:"absolute",inset:0,background:"linear-gradient(135deg,#0021A5 0%,#003087 55%,#FA4616 100%)",borderRadius:"1.5rem"},
  heroOrb:{position:"absolute",top:"-35%",right:"-8%",width:300,height:300,borderRadius:"50%",background:"rgba(250,70,22,0.2)",pointerEvents:"none"},
  heroOrb2:{position:"absolute",bottom:"-40%",left:"10%",width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none"},
  heroContent:{position:"relative",zIndex:1,display:"flex",alignItems:"center",gap:"1.5rem",flexWrap:"wrap"},
  avatar:{width:76,height:76,borderRadius:"50%",background:"linear-gradient(135deg,#FA4616,#c73800)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 20px rgba(250,70,22,0.35)",flexShrink:0,border:"3px solid rgba(255,255,255,0.3)"},
  avatarTxt:{fontSize:"1.45rem",fontWeight:800,color:"#fff"},
  heroLabel:{fontSize:"0.68rem",fontWeight:600,color:"rgba(255,255,255,0.55)",margin:"0 0 0.15rem",letterSpacing:"0.06em",textTransform:"uppercase"},
  heroName:{fontSize:"1.6rem",fontWeight:800,color:"#fff",margin:"0 0 0.1rem",letterSpacing:"-0.02em"},
  heroEmail:{fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",margin:0},
  pill:{display:"inline-flex",alignItems:"center",gap:"0.25rem",fontSize:"0.68rem",fontWeight:600,color:"rgba(255,255,255,0.9)",backgroundColor:"rgba(255,255,255,0.13)",padding:"0.2rem 0.55rem",borderRadius:9999,border:"1px solid rgba(255,255,255,0.18)"},
  statsBox:{display:"flex",alignItems:"center",gap:"1rem",background:"rgba(255,255,255,0.1)",borderRadius:"0.85rem",padding:"0.85rem 1.25rem",border:"1px solid rgba(255,255,255,0.14)",flexShrink:0},
  stat:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.1rem",cursor:"pointer",minWidth:50},
  statNum:{fontSize:"1.45rem",fontWeight:800,color:"#fff",lineHeight:1},
  statLbl:{fontSize:"0.58rem",fontWeight:600,color:"rgba(255,255,255,0.55)",textTransform:"uppercase",letterSpacing:"0.04em",whiteSpace:"nowrap"},
  statDiv:{width:1,height:32,background:"rgba(255,255,255,0.15)"},

  /* tabs */
  tabBar:{display:"flex",gap:"0.25rem",background:"#fff",borderRadius:"0.8rem",padding:"0.25rem",marginBottom:"1.25rem",boxShadow:"0 1px 3px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"},
  tab:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.3rem",padding:"0.5rem",border:"none",borderRadius:"0.55rem",backgroundColor:"transparent",color:"#6B7280",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,transition:"all 0.2s"},
  tabOn:{backgroundColor:"#0021A5",color:"#fff",fontWeight:700,boxShadow:"0 2px 8px rgba(0,33,165,0.2)"},
  tabBody:{display:"flex",flexDirection:"column",gap:"1rem"},

  /* cards */
  card:{backgroundColor:"#fff",padding:"1.35rem",borderRadius:"1rem",border:"1px solid #E5E7EB",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},
  cardTitle:{fontSize:"0.92rem",fontWeight:700,color:"#111827",margin:0},
  cardSub:{fontSize:"0.74rem",color:"#9CA3AF",margin:"0.15rem 0 0"},
  badge:{fontSize:"0.68rem",fontWeight:600,color:"#0021A5",background:"#EFF6FF",padding:"0.25rem 0.65rem",borderRadius:9999,border:"1px solid #BFDBFE",flexShrink:0},
  countPill:{fontSize:"0.62rem",fontWeight:700,color:"#6B7280",background:"#F3F4F6",padding:"0.12rem 0.45rem",borderRadius:9999,border:"1px solid #E5E7EB"},
  linkBtn:{display:"flex",alignItems:"center",gap:"0.2rem",fontSize:"0.72rem",fontWeight:600,color:"#0021A5",background:"none",border:"none",cursor:"pointer",padding:"0.2rem 0"},

  /* phrase / event cards */
  phraseCard:{background:"linear-gradient(135deg,#F8FAFF,#EEF2FF)",borderRadius:"0.8rem",padding:"0.85rem 1rem",border:"1px solid #E0E7FF",cursor:"pointer",transition:"all 0.15s"},
  eventCard:{padding:"0.8rem",background:"#FFF9F9",borderRadius:"0.75rem",border:"1px solid #FECACA",cursor:"pointer",transition:"all 0.15s"},

  /* empty state */
  empty:{display:"flex",flexDirection:"column",alignItems:"center",padding:"1.75rem 1rem",textAlign:"center"},
  emptyBtn:{padding:"0.45rem 1.1rem",background:"#0021A5",color:"#fff",border:"none",borderRadius:"0.55rem",fontSize:"0.78rem",fontWeight:600,cursor:"pointer"},

  /* form */
  field:{display:"flex",flexDirection:"column",gap:"0.25rem"},
  lbl:{fontSize:"0.75rem",fontWeight:600,color:"#374151"},
  inp:{padding:"0.65rem 0.85rem",border:"1px solid #D1D5DB",borderRadius:"0.6rem",fontSize:"0.87rem",outline:"none",backgroundColor:"#F9FAFB",color:"#111827"},
  saveBtn:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.58rem 1.15rem",border:"none",borderRadius:"0.6rem",background:"linear-gradient(135deg,#FA4616,#c73800)",color:"#fff",cursor:"pointer",fontSize:"0.85rem",fontWeight:700,boxShadow:"0 2px 8px rgba(250,70,22,0.25)"},
  cancelBtn:{padding:"0.58rem 1.15rem",border:"1px solid #D1D5DB",borderRadius:"0.6rem",backgroundColor:"#fff",cursor:"pointer",fontSize:"0.85rem",fontWeight:500,color:"#374151"},
  editBtn:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.38rem 0.8rem",border:"1px solid #D1D5DB",borderRadius:"0.5rem",backgroundColor:"#fff",cursor:"pointer",fontSize:"0.75rem",fontWeight:600,color:"#374151"},
  delBtn:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.58rem 1.15rem",border:"none",borderRadius:"0.6rem",backgroundColor:"#DC2626",color:"#fff",cursor:"pointer",fontSize:"0.85rem",fontWeight:700},
  statusBanner:{fontSize:"0.82rem",color:"#059669",backgroundColor:"#ECFDF5",padding:"0.55rem 0.9rem",borderRadius:"0.55rem",marginBottom:"0.85rem",border:"1px solid #A7F3D0",fontWeight:600},

  /* account rows */
  accRow:{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.8rem 0.9rem",backgroundColor:"#fff",borderRadius:"0.7rem",border:"1px solid #E5E7EB",cursor:"pointer",transition:"all 0.15s",width:"100%",textAlign:"left"},

  /* overlay */
  overlay:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,backdropFilter:"blur(4px)"},
  popup:{backgroundColor:"#fff",padding:"1.75rem",borderRadius:"1.15rem",maxWidth:400,width:"90%",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"},
};

/* spinner + toast keyframes */
if(typeof document!=="undefined"){const el=document.getElementById("mtb-profile-anim")||document.createElement("style");el.id="mtb-profile-anim";el.textContent="@keyframes mtbSpin{to{transform:rotate(360deg)}}@keyframes mtbToastIn{from{opacity:0;transform:translateX(-50%) translateY(-12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}";if(!el.parentNode)document.head.appendChild(el);}

export default Profile;
