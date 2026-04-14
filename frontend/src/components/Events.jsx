import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  MapPin, Calendar, Search, Heart,
  ExternalLink, Clock, ChevronDown, Sparkles,
  Ticket, PartyPopper, X, Info, Globe, MessageCircle,
  Home, Compass, ClipboardList, User, Volume2, BookmarkCheck,
  Filter, ChevronRight, ChevronLeft, Lightbulb, Coffee, Music,
  Users, ChevronUp, Bookmark, SlidersHorizontal, TrendingUp, Zap, LogOut
} from "lucide-react";
import logo from "../assets/MyTranslationBuddyLogo.png";
import { handleLogout as sharedLogout, authHeaders } from "../utils/auth.js";
import { CITIES_BY_COUNTRY, COUNTRY_FLAGS, COUNTRY_NAMES } from "../constants/cities.js";
import { EventGridSkeleton, ErrorState } from "./ui/LoadingStates.jsx";

const BACKEND = "/api";

const COUNTRIES = [
  { code:"DE", label:COUNTRY_NAMES.DE, flag:COUNTRY_FLAGS.DE },
  { code:"AT", label:COUNTRY_NAMES.AT, flag:COUNTRY_FLAGS.AT },
  { code:"CH", label:COUNTRY_NAMES.CH, flag:COUNTRY_FLAGS.CH },
];
const CITIES_BY = CITIES_BY_COUNTRY;
const CATS = [
  { id:"", label:"All", icon:"✨" },
  { id:"KZFzniwnSyZfZ7v7nJ", label:"Music", icon:"🎵" },
  { id:"KZFzniwnSyZfZ7v7nE", label:"Sports", icon:"⚽" },
  { id:"KZFzniwnSyZfZ7v7na", label:"Arts", icon:"🎨" },
];
const DATE_PRESETS = [
  { label:"Any", icon:"📅", start:"", end:"" },
  { label:"Week", icon:"📆", days:7 },
  { label:"Month", icon:"🗓️", days:30 },
  { label:"3 mo", icon:"📈", days:90 },
];
const getSeasonLabel = () => {
  const m = new Date().getMonth();
  if (m>=2&&m<=4) return "🌸 Spring";
  if (m>=5&&m<=7) return "☀️ Summer";
  if (m>=8&&m<=10) return "🍂 Autumn";
  return "❄️ Winter";
};
const getSeasonEmoji = () => {
  const m = new Date().getMonth();
  if (m>=2&&m<=4) return "🌸";
  if (m>=5&&m<=7) return "☀️";
  if (m>=8&&m<=10) return "🍂";
  return "❄️";
};
const getSeasonPicks = () => {
  const m = new Date().getMonth();
  if (m>=2&&m<=4) return [{emoji:"🌸",label:"Spring festivals",kw:"festival",city:"Munich"},{emoji:"🍻",label:"Biergarten season",kw:"beer garden",city:"Berlin"},{emoji:"🎵",label:"Open-air concerts",kw:"open air",city:"Hamburg"}];
  if (m>=5&&m<=7) return [{emoji:"☀️",label:"Summer fests",kw:"summer",city:"Cologne"},{emoji:"🎶",label:"Music festivals",kw:"festival",city:"Berlin"},{emoji:"🍷",label:"Wine fests",kw:"wine festival",city:"Würzburg"}];
  if (m>=8&&m<=10) return [{emoji:"🍻",label:"Oktoberfest",kw:"oktoberfest",city:"Munich"},{emoji:"🍂",label:"Autumn markets",kw:"autumn market",city:"Heidelberg"},{emoji:"🎵",label:"Jazz nights",kw:"jazz",city:"Vienna"}];
  return [{emoji:"🎄",label:"Christmas markets",kw:"weihnachtsmarkt",city:"Nuremberg"},{emoji:"❄️",label:"Winter concerts",kw:"concert",city:"Vienna"},{emoji:"🏂",label:"Ski events",kw:"ski",city:"Innsbruck"}];
};

const EVENT_PHRASES = {
  DE:[
    {de:"Gibt es noch Karten?",en:"Are there still tickets available?",ctx:"Tickets",pron:"gipt ess nokh KAR-ten"},
    {de:"Ist dieser Platz noch frei?",en:"Is this seat still free?",ctx:"Seating",pron:"ist DEE-zer plahts nokh fry"},
    {de:"Wann fängt es an?",en:"What time does it start?",ctx:"Timing",pron:"vahn fengt ess AHN"},
    {de:"Gibt es Studentenrabatt?",en:"Is there a student discount?",ctx:"Discount",pron:"gipt ess shtoo-DEN-ten-rah-baht"},
    {de:"Wo ist die Garderobe?",en:"Where is the coat check?",ctx:"Venue",pron:"voh ist dee gar-deh-ROH-beh"},
    {de:"Ein Bier, bitte!",en:"A beer, please!",ctx:"Ordering",pron:"ayn beer BIT-teh"},
    {de:"Wo ist der Ausgang?",en:"Where is the exit?",ctx:"Navigation",pron:"voh ist dair OWS-gahng"},
    {de:"Das Konzert war super!",en:"The concert was awesome!",ctx:"Reactions",pron:"dahs kon-TSAIRT var ZOO-pair"},
  ],
  AT:[
    {de:"Grüß Gott! Gibt's noch Plätze?",en:"Hello! Are there still seats?",ctx:"Greeting",pron:"groos GOT gipts nokh PLEH-tseh"},
    {de:"A Melange, bitte",en:"A coffee with milk, please",ctx:"Café",pron:"ah meh-LAHN-zheh BIT-teh"},
    {de:"Wo geht's zum Heurigen?",en:"Where's the wine tavern?",ctx:"Nightlife",pron:"voh gayts tsoom HOY-ree-gen"},
    {de:"Zahlen, bitte — getrennt",en:"Check, please — separate",ctx:"Payment",pron:"TSAH-len BIT-teh geh-TRENNT"},
    {de:"Ist das Konzert ausverkauft?",en:"Is the concert sold out?",ctx:"Tickets",pron:"ist dahs kon-TSAIRT OWS-fair-kowft"},
    {de:"Das war leiwand!",en:"That was awesome! (Austrian)",ctx:"Slang",pron:"dahs var LY-vahnd"},
  ],
  CH:[
    {de:"Grüezi! Hät's no Billett?",en:"Hello! Are there still tickets?",ctx:"Greeting",pron:"GRUE-tsee hets noh bee-YET"},
    {de:"Chönnt ich es Billett ha?",en:"Could I have a ticket?",ctx:"Ordering",pron:"KHUNT ikh es bee-YET hah"},
    {de:"Wo isch de nöchscht Usgang?",en:"Where is the nearest exit?",ctx:"Navigation",pron:"voh ish deh NOKH-sht OOS-gahng"},
    {de:"Es Stange, bitte",en:"A tall beer, please (Swiss)",ctx:"Ordering",pron:"es SHTAHN-geh BIT-teh"},
    {de:"Wieviel choschtet de Iihtritt?",en:"How much is the entry?",ctx:"Cost",pron:"VEE-feel KHOSH-tet deh EEN-trit"},
    {de:"Das isch mega gsi!",en:"That was amazing! (Swiss)",ctx:"Slang",pron:"dahs ish MEH-gah gsee"},
  ],
};

const EVENT_TIPS = {
  DE:[
    {icon:"⏱️",title:"Punctuality is key",tip:"Events in Germany start on time. Arriving 10–15 minutes early is standard."},
    {icon:"💵",title:"Cash is still king",tip:"Many smaller venues and beer gardens only accept cash. Bring €20–50 in small bills."},
    {icon:"🍻",title:"Beer garden etiquette",tip:"You can bring your own food to traditional beer gardens — just buy drinks there. Return Maß glasses."},
    {icon:"📱",title:"Book ahead online",tip:"Use ticketmaster.de or eventim.de for advance booking. Student IDs get discounts."},
  ],
  AT:[
    {icon:"🎩",title:"Dress code matters",tip:"Austrian venues expect smart casual. Jeans are fine for concerts, not for the Staatsoper."},
    {icon:"📞",title:"Reserve ahead",tip:"Say 'Ich hätte gerne reserviert' on arrival. Austrians love reservations."},
    {icon:"💰",title:"Tipping norms",tip:"Round up or add 5–10%. Say 'Stimmt so' (keep the change) when paying."},
    {icon:"🎵",title:"Standing room opera",tip:"Vienna Staatsoper sells standing-room tickets for €3–4. Line up 80 min early!"},
  ],
  CH:[
    {icon:"💸",title:"Switzerland is expensive",tip:"Budget CHF 30–50 for a night out. Look for Studenten discounts."},
    {icon:"🚆",title:"SBB day passes",tip:"Check SBB Supersaver tickets (up to 70% off) for events in other cities."},
    {icon:"🤫",title:"Quiet hours",tip:"Swiss noise regulations are strict. Outdoor events end by 10–11 PM."},
    {icon:"♻️",title:"Deposit systems",tip:"At festivals, you pay a Depot for cups. Return them for CHF 2–5 back."},
  ],
};

const normName=(s)=>s.toLowerCase().replace(/[^a-z0-9]/g,"");
const dedup=(events)=>{const seen=new Set();return events.filter(e=>{const k=normName(e.name||"");if(!k||seen.has(k))return false;seen.add(k);return true;});};
const fmtDate=(d)=>{if(!d)return "TBD";try{return new Date(d+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",weekday:"short"});}catch{return d;}};
const fmtTime=(t)=>{if(!t)return "";try{const[h,m]=t.split(":");const hr=parseInt(h);return `${hr>12?hr-12:hr}:${m} ${hr>=12?"PM":"AM"}`;}catch{return t;}};
const slugToCity=(slug)=>{if(!slug)return "";return slug.replace(/-/g," ").replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());};
const findCountryForCity=(citySlug)=>{const n=slugToCity(citySlug).toLowerCase();for(const[code,arr]of Object.entries(CITIES_BY)){if(arr.some(c=>c.toLowerCase()===n||c.toLowerCase().includes(n)))return code;}return "DE";};
const loadSavedEvents=()=>{try{return JSON.parse(localStorage.getItem("savedEvents")||"[]");}catch{return[];}};
const persistSavedEvents=(arr,email)=>{
  localStorage.setItem("savedEvents",JSON.stringify(arr));
  if(email){
    axios.put("/api/user/profile",{email,saved_events:arr},authHeaders()).catch(()=>{});
  }
};

const Events = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (p) => location.pathname === p;
  const userEmail = localStorage.getItem("email")||"";
  const userCity = localStorage.getItem("study_abroad_city")||"";
  const myCitiesRaw = userEmail ? localStorage.getItem("myCities") : null;
  const myCities = myCitiesRaw ? JSON.parse(myCitiesRaw) : [];
  const initCountry = userCity ? findCountryForCity(userCity) : "DE";

  const urlParams = new URLSearchParams(location.search);
  const urlCity = urlParams.get("city") || "";
  const urlCountry = urlCity ? findCountryForCity(urlCity.toLowerCase().replace(/\s+/g,"-")) : "";

  const [countries,setCountries]=useState([urlCountry || initCountry]);
  const [city,setCity]=useState(urlCity);
  const [keyword,setKeyword]=useState("");
  const [segmentIds,setSegmentIds]=useState([]);
  const [datePreset,setDatePreset]=useState(0);
  const [sortOrder,setSortOrder]=useState("date,asc");
  const [events,setEvents]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [page,setPage]=useState(0);
  const [totalPages,setTotalPages]=useState(0);
  const [totalResults,setTotalResults]=useState(0);
  const [savedEvents,setSavedEvents]=useState(loadSavedEvents);
  const [myCitiesDrop,setMyCitiesDrop]=useState(false);
  const [sidePanel,setSidePanel]=useState("saved");
  const [saveLoginPrompt,setSaveLoginPrompt]=useState(false);
  const [bookmarkedPhrases,setBookmarkedPhrases]=useState(()=>{try{return JSON.parse(localStorage.getItem("eventPhraseBookmarks")||"[]");}catch{return[];}});
  const [speakingIdx,setSpeakingIdx]=useState(-1);
  const [cityDrop,setCityDrop]=useState(false);
  const searchRef = useRef(null);
  const myCitiesRef = useRef(null);
  const cityDropRef = useRef(null);

  // Close My Cities dropdown on click outside
  useEffect(()=>{
    if(!myCitiesDrop) return;
    const handler=(e)=>{if(myCitiesRef.current&&!myCitiesRef.current.contains(e.target))setMyCitiesDrop(false);};
    document.addEventListener("mousedown",handler);
    return ()=>document.removeEventListener("mousedown",handler);
  },[myCitiesDrop]);

  // Close City dropdown on click outside
  useEffect(()=>{
    if(!cityDrop) return;
    const handler=(e)=>{if(cityDropRef.current&&!cityDropRef.current.contains(e.target))setCityDrop(false);};
    document.addEventListener("mousedown",handler);
    return ()=>document.removeEventListener("mousedown",handler);
  },[cityDrop]);

  // Auto-cleanup expired events (events that have passed)
  useEffect(() => {
    if (!savedEvents.length) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const validEvents = savedEvents.filter(event => {
      if (!event.date) return true; // Keep events without dates
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today; // Keep only today's or future events
    });

    // If some events were removed, update state and persist
    if (validEvents.length !== savedEvents.length) {
      setSavedEvents(validEvents);
      persistSavedEvents(validEvents, userEmail);
    }
  }, [savedEvents.length]); // Runs when savedEvents changes

  const toggleCountry=(code)=>{
    setCountries([code]);
    setCity("");setPage(0);
  };
  const primaryCountry=countries[0]||"DE";

  const togglePhraseBookmark=(phrase)=>{
    setBookmarkedPhrases(prev=>{
      const exists=prev.some(p=>p.de===phrase.de);
      const next=exists?prev.filter(p=>p.de!==phrase.de):[...prev,phrase];
      localStorage.setItem("eventPhraseBookmarks",JSON.stringify(next));
      return next;
    });
  };
  const isPhraseBookmarked=(de)=>bookmarkedPhrases.some(p=>p.de===de);
  const speakPhrase=(text,idx)=>{
    if(!window.speechSynthesis)return;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang="de-DE";u.rate=0.85;
    setSpeakingIdx(idx);
    u.onend=()=>setSpeakingIdx(-1);
    u.onerror=()=>setSpeakingIdx(-1);
    window.speechSynthesis.speak(u);
  };

  useEffect(()=>{window.scrollTo(0,0);
    if(userEmail){
      axios.get("/api/user/profile",{params:{email:userEmail},...authHeaders()}).then(res=>{
        const serverSaved=res.data.saved_events||[];
        if(serverSaved.length>0){
          setSavedEvents(serverSaved);
          localStorage.setItem("savedEvents",JSON.stringify(serverSaved));
        }
      }).catch(()=>{});
    }
  },[]);
  useEffect(()=>{fetchEvents(0);},[countries.join(",")]);
  useEffect(()=>{if(city)fetchEvents(0);},[city]);

  const buildParams=(pg)=>{
    const p={countryCode:countries.join(","),size:20,page:pg};
    if(city)p.city=city;if(keyword)p.keyword=keyword;if(segmentIds.length===1)p.segmentId=segmentIds[0];else if(segmentIds.length>1)p.segmentId=segmentIds.join(",");
    if(sortOrder)p.sort=sortOrder;
    const preset=DATE_PRESETS[datePreset];
    if(preset&&preset.days){const now=new Date();p.startDateTime=now.toISOString().replace(/\.\d+Z/,"Z");const end=new Date(now.getTime()+preset.days*86400000);p.endDateTime=end.toISOString().replace(/\.\d+Z/,"Z");}
    return p;
  };
  const fetchEvents=async(pg)=>{
    setLoading(true);setError("");
    try{const res=await axios.get(`${BACKEND}/tm-events`,{params:buildParams(pg)});const raw=res.data?._embedded?.events||[];setEvents(dedup(raw));setPage(res.data?.page?.number||0);setTotalPages(Math.min(res.data?.page?.totalPages||0,10));setTotalResults(res.data?.page?.totalElements||raw.length);}
    catch{setError("Could not load events. Try a different search.");setEvents([]);}
    finally{setLoading(false);}
  };
  const handleSearch=(e)=>{e.preventDefault();fetchEvents(0);};
  const toggleSave=(event)=>{
    if(!userEmail){setSaveLoginPrompt(true);setTimeout(()=>setSaveLoginPrompt(false),4000);return;}
    setSavedEvents(prev=>{
      const exists=prev.some(e=>e.id===event.id);
      const next=exists?prev.filter(e=>e.id!==event.id):[...prev,{id:event.id,name:event.name,url:event.url,date:event.dates?.start?.localDate,time:event.dates?.start?.localTime,city:event._embedded?.venues?.[0]?.city?.name||"",venue:event._embedded?.venues?.[0]?.name||"",image:event.images?.[0]?.url||""}];
      persistSavedEvents(next,userEmail);return next;
    });
  };

  const handleLogout = () => sharedLogout(navigate);

  const isSaved=(id)=>savedEvents.some(e=>e.id===id);
  const seasonPicks=getSeasonPicks();
  const phrases=EVENT_PHRASES[primaryCountry]||EVENT_PHRASES.DE;
  const tips=EVENT_TIPS[primaryCountry]||EVENT_TIPS.DE;
  const countryObj=COUNTRIES.find(c=>c.code===primaryCountry)||COUNTRIES[0];
  const allCities=countries.flatMap(cc=>CITIES_BY[cc]||[]);

  const activeFilters = [];
  if(city) activeFilters.push(city);
  if(keyword) activeFilters.push('"'+keyword+'"');
  segmentIds.forEach(id=>{const cat=CATS.find(c=>c.id===id);if(cat)activeFilters.push(cat.label);});
  if(datePreset>0) activeFilters.push(DATE_PRESETS[datePreset].label);

  return (
    <div style={S.page}>
      {/* NAVBAR */}
      <header style={S.hdr}><div style={S.hdrIn}>
        <div style={S.hdrL} onClick={()=>navigate("/")}><img src={logo} alt="MTB" style={{height:72}}/><span style={S.brand}>MyTranslationBuddy</span></div>
        <nav style={S.nav}>
          <button
            onClick={() => navigate("/tips")}
            style={{...S.nb, ...(isActive("/tips") ? S.nbActive : {})}}
            onMouseEnter={e=>{if(!isActive("/tips")){e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}}
            onMouseLeave={e=>{if(!isActive("/tips")){e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}}
          >
            <Compass size={15} /> Explore
          </button>
          <button
            onClick={() => navigate("/reservations")}
            style={{...S.nb, ...(isActive("/reservations") ? S.nbActive : {})}}
            onMouseEnter={e=>{if(!isActive("/reservations")){e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}}
            onMouseLeave={e=>{if(!isActive("/reservations")){e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}}
          >
            <ClipboardList size={15} /> Study
          </button>
          <button
            onClick={() => navigate("/events")}
            style={{...S.nb, ...(isActive("/events") ? S.nbActive : {})}}
            onMouseEnter={e=>{if(!isActive("/events")){e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}}
            onMouseLeave={e=>{if(!isActive("/events")){e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}}
          >
            <Calendar size={15} /> Events
          </button>
          <button
            onClick={() => navigate("/")}
            style={{...S.nb, ...(isActive("/") ? S.nbActive : {})}}
            onMouseEnter={e=>{if(!isActive("/")){e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}}
            onMouseLeave={e=>{if(!isActive("/")){e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}}
          >
            <Home size={15} /> Home
          </button>
          {userEmail ? (
            <>
              <button onClick={() => navigate("/profile")} style={S.nbA}><User size={14}/> Profile</button>
              <button onClick={handleLogout} style={{...S.nb, color:"#DC2626", marginLeft:"0.25rem"}}
                onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#FEF2F2"; e.currentTarget.style.color="#DC2626";}}
                onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280";}}>
                <LogOut size={14}/> Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/login")} style={S.nbA}>Sign In</button>
          )}
        </nav>
      </div></header>

      {/* ── HERO COMMAND BAR ── */}
      <div style={S.commandBar} data-events-bar>
        {/* Decorative orbs — contained so they don't bleed */}
        <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
          <div style={{position:"absolute",top:"-40%",left:"-8%",width:220,height:220,borderRadius:"50%",background:"radial-gradient(circle,rgba(250,70,22,0.12) 0%,transparent 70%)"}}/>
          <div style={{position:"absolute",bottom:"-50%",right:"-5%",width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)"}}/>
        </div>

        <div style={S.commandInner}>
          {/* LEFT: Country toggle */}
          <div style={S.countryToggle}>
            {COUNTRIES.map(c=>(
              <button key={c.code} onClick={()=>toggleCountry(c.code)}
                style={{...S.countryBtn,...(countries.includes(c.code)?S.countryBtnOn:{})}}>
                <span style={{fontSize:"0.9rem"}}>{c.flag}</span>
                <span style={{fontSize:"0.68rem",fontWeight:countries.includes(c.code)?700:500,letterSpacing:"0.01em"}}>{c.label}</span>
              </button>
            ))}
          </div>

          {/* CENTER: Search + suggestions stacked */}
          <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:"0.3rem"}}>
            <form onSubmit={handleSearch} style={S.searchForm}>
              <Search size={14} color="rgba(255,255,255,0.5)" style={{flexShrink:0}}/>
              <input type="text" placeholder={`Search events in ${countryObj.label}...`} value={keyword} onChange={e=>setKeyword(e.target.value)} style={S.searchInput}/>
              {keyword && <button type="button" onClick={()=>{setKeyword("");setTimeout(()=>fetchEvents(0),50);}} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",flexShrink:0}}><X size={13} color="rgba(255,255,255,0.5)"/></button>}
              <button type="submit" style={S.searchGo}><Search size={12}/></button>
            </form>
            {/* Seasonal suggestions */}
            <div style={{display:"flex",alignItems:"center",gap:"0.3rem",flexWrap:"wrap",paddingLeft:"0.15rem"}}>
              <span style={{fontSize:"0.52rem",fontWeight:600,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"0.08em",marginRight:"0.1rem"}}>Trending</span>
              {seasonPicks.map((p,i)=>(
                <button key={i} type="button" onClick={()=>{setKeyword(p.kw);setCity(p.city);setTimeout(()=>fetchEvents(0),100);}}
                  style={S.suggestChip}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.14)";e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.color="rgba(255,255,255,0.55)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";}}>
                  {p.emoji} <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: City + My Cities side by side */}
          <div style={{display:"flex",alignItems:"center",gap:"0.4rem",flexShrink:0}}>
            <div ref={cityDropRef} style={{position:"relative"}}>
              <button onClick={()=>setCityDrop(!cityDrop)} style={S.cityBtn}>
                <MapPin size={11} color="rgba(255,255,255,0.5)"/>
                <span>{city||"All cities"}</span>
                <ChevronDown size={9} style={{opacity:0.5,transition:"transform 0.25s ease",transform:cityDrop?"rotate(180deg)":"rotate(0)"}}/>
              </button>
              {cityDrop&&(
                <div style={S.dropdown}>
                  <div style={{padding:"0.45rem 0.7rem",borderBottom:"1px solid #F3F4F6"}}><span style={{fontSize:"0.54rem",fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em"}}>{countryObj.flag} Cities in {countryObj.label}</span></div>
                  <div onClick={()=>{setCity("");setCityDrop(false);setTimeout(()=>fetchEvents(0),50);}} style={{...S.dropItem,...(!city?{background:"rgba(0,33,165,0.04)",fontWeight:700}:{})}}
                    onMouseEnter={e=>{if(city)e.currentTarget.style.background="rgba(0,33,165,0.04)";}}
                    onMouseLeave={e=>{if(city)e.currentTarget.style.background="transparent";}}>
                    <Globe size={12} color="#9CA3AF"/> <span style={{fontWeight:!city?700:500,color:!city?"#0021A5":"#374151"}}>All cities</span>
                  </div>
                  <div style={{maxHeight:240,overflowY:"auto"}}>
                    {allCities.map(c=>(
                      <div key={c} onClick={()=>{setCity(c);setCityDrop(false);setTimeout(()=>fetchEvents(0),50);}} style={{...S.dropItem,...(city===c?{background:"rgba(0,33,165,0.04)"}:{})}}
                        onMouseEnter={e=>{if(city!==c)e.currentTarget.style.background="rgba(0,33,165,0.04)";}}
                        onMouseLeave={e=>{if(city!==c)e.currentTarget.style.background="transparent";}}>
                        <MapPin size={10} color="#BFDBFE"/> <span style={{fontWeight:city===c?700:500,color:city===c?"#0021A5":"#374151"}}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {myCities.length>0&&(
              <div ref={myCitiesRef} style={{position:"relative"}}>
                <button onClick={()=>setMyCitiesDrop(!myCitiesDrop)} style={S.myCitiesBtn} title="Saved cities">
                  <Heart size={10} color="#fff" fill="rgba(255,255,255,0.55)"/>
                  <span>My Cities</span>
                  <ChevronDown size={9} style={{opacity:0.6,transition:"transform 0.25s ease",transform:myCitiesDrop?"rotate(180deg)":"rotate(0)"}}/>
                </button>
                {myCitiesDrop&&(
                  <div style={S.dropdown}>
                    <div style={{padding:"0.45rem 0.7rem",borderBottom:"1px solid #F3F4F6"}}><span style={{fontSize:"0.54rem",fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em"}}>My Saved Cities</span></div>
                    {myCities.map(slug=>{const name=slugToCity(slug);const cc=findCountryForCity(slug);const flag=COUNTRIES.find(c=>c.code===cc)?.flag||"🌍";return(
                      <div key={slug} onClick={()=>{setCountries([cc]);setCity(name);setMyCitiesDrop(false);setTimeout(()=>fetchEvents(0),100);}} style={S.dropItem}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(0,33,165,0.04)"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <span>{flag}</span> <span style={{fontWeight:600}}>{name}</span>
                      </div>
                    );})}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── SAVE LOGIN PROMPT TOAST ── */}
      {saveLoginPrompt && (
        <div style={{
          position:"fixed", top:90, left:"50%", transform:"translateX(-50%)", zIndex:10000,
          display:"flex", alignItems:"center", gap:"0.75rem",
          padding:"0.85rem 1.5rem", borderRadius:"0.85rem",
          background:"#fff",
          color:"#111827", boxShadow:"0 12px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)",
          animation:"evtToastIn 0.35s cubic-bezier(0.16,1,0.3,1)",
          fontSize:"0.88rem", fontWeight:600, letterSpacing:"-0.01em",
        }}>
          <Heart size={16} color="#EF4444" style={{flexShrink:0}}/>
          <span>Sign in to save events</span>
          <button onClick={()=>{setSaveLoginPrompt(false);navigate("/login");}} style={{
            marginLeft:"0.5rem", padding:"0.4rem 1rem", borderRadius:"0.5rem",
            border:"none", background:"linear-gradient(135deg,#FA4616,#FF6B35)",
            color:"#fff", cursor:"pointer", fontSize:"0.8rem", fontWeight:700, transition:"all 0.15s",
            boxShadow:"0 2px 8px rgba(250,70,22,0.25)",
          }}
          onMouseEnter={e=>{e.currentTarget.style.opacity="0.85";e.currentTarget.style.transform="translateY(-1px)";}}
          onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="none";}}>
            Sign In
          </button>
          <button onClick={()=>setSaveLoginPrompt(false)} style={{
            background:"none", border:"none", color:"#9CA3AF", cursor:"pointer",
            padding:"2px", display:"flex", alignItems:"center",
          }}
          onMouseEnter={e=>{e.currentTarget.style.color="#6B7280";}}
          onMouseLeave={e=>{e.currentTarget.style.color="#9CA3AF";}}
          ><X size={14}/></button>
        </div>
      )}

      {/* ── FILTER PILLS — floating over background, not boxed ── */}
      <div style={S.filterStrip}>
        <div style={S.filterInner}>
          {/* Categories as pills */}
          {CATS.map(cat=>{
            const active=(!cat.id&&segmentIds.length===0)||(cat.id&&segmentIds.includes(cat.id));
            return(
              <button key={cat.id} type="button" title={cat.label} onClick={()=>{if(!cat.id){setSegmentIds([]);}else{setSegmentIds(prev=>prev.includes(cat.id)?prev.filter(x=>x!==cat.id):[...prev,cat.id]);}setTimeout(()=>fetchEvents(0),50);}}
                style={{...S.filterPill,...(active?S.filterPillOn:{})}}
                onMouseEnter={e=>{if(!active){e.currentTarget.style.borderColor="rgba(0,33,165,0.35)";e.currentTarget.style.background="rgba(219,234,254,0.5)";e.currentTarget.style.color="#0021A5";}}}
                onMouseLeave={e=>{if(!active){e.currentTarget.style.borderColor="rgba(0,33,165,0.2)";e.currentTarget.style.background="rgba(219,234,254,0.3)";e.currentTarget.style.color="#3B5998";}}}>
                <span style={{fontSize:"0.72rem",lineHeight:1}}>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}

          <span style={S.filterDot}/>

          {/* Date pills */}
          {DATE_PRESETS.map((dp,i)=>{
            const active=datePreset===i;
            return(
              <button key={i} type="button" onClick={()=>{setDatePreset(i);setTimeout(()=>fetchEvents(0),50);}}
                style={{...S.filterPill,...(active?S.filterPillOn:{})}}
                onMouseEnter={e=>{if(!active){e.currentTarget.style.borderColor="rgba(0,33,165,0.35)";e.currentTarget.style.background="rgba(219,234,254,0.5)";e.currentTarget.style.color="#0021A5";}}}
                onMouseLeave={e=>{if(!active){e.currentTarget.style.borderColor="rgba(0,33,165,0.2)";e.currentTarget.style.background="rgba(219,234,254,0.3)";e.currentTarget.style.color="#3B5998";}}}>
                <span>{dp.label}</span>
              </button>
            );
          })}

          {/* Active filters + clear */}
          {activeFilters.length > 0 && (
            <div style={{display:"flex",alignItems:"center",gap:"0.3rem",marginLeft:"auto",flexShrink:0}}>
              {activeFilters.map((f,i) => <span key={i} style={S.activeTag}>{f}</span>)}
              <button onClick={()=>{setCity("");setKeyword("");setSegmentIds([]);setDatePreset(0);setTimeout(()=>fetchEvents(0),50);}} style={S.clearBtn}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(220,38,38,0.9)";e.currentTarget.style.transform="scale(1.03)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(220,38,38,0.75)";e.currentTarget.style.transform="scale(1)";}}>
                <X size={8}/> Clear
              </button>
            </div>
          )}
        </div>

        {/* Results count & Sort */}
        {!loading&&events.length>0&&(
          <div style={{maxWidth:1280,margin:"0 auto",padding:"0.15rem 2rem 0",display:"flex",alignItems:"center",gap:"0.4rem"}}>
            <span style={{fontSize:"0.62rem",fontWeight:500,color:"#9CA3AF",letterSpacing:"0.01em"}}>
              {totalResults>0?`${totalResults.toLocaleString()} events`:`${events.length} events`} in {countryObj.flag} {countryObj.label}{city?` · ${city}`:""}
            </span>
            {keyword&&<span style={{fontSize:"0.58rem",color:"#93C5FD",fontWeight:500}}>for "{keyword}"</span>}

            {/* SORTING DROPDOWN ADDITION */}
            <div style={S.sortWrap}>
              <SlidersHorizontal size={10} color="#0021A5"/>
              <select value={sortOrder} onChange={e=>{setSortOrder(e.target.value);setTimeout(()=>fetchEvents(0),50);}} style={S.sortSelect}>
                <option value="date,asc">Upcoming</option>
                <option value="relevance,desc">Popular</option>
                <option value="date,desc">By Date (Latest)</option>
              </select>
              <ChevronDown size={9} color="#0021A5" style={{marginLeft:"-0.3rem",pointerEvents:"none"}}/>
            </div>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT — 2-column layout ── */}
      <div style={S.layout}>
        <main style={S.mainCol}>
          {error&&<ErrorState message={error} onRetry={()=>fetchEvents(0)} retryLabel="Retry Search"/>}

          {loading&&(
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1rem"}}>
                <div style={{width:20,height:20,borderRadius:"50%",border:"2px solid #E5E7EB",borderTopColor:"#0021A5",animation:"spin 0.8s linear infinite"}}/>
                <p style={{color:"#6B7280",fontSize:"0.82rem",margin:0,fontWeight:500}}>Searching {countryObj.label}…</p>
              </div>
              <EventGridSkeleton count={6}/>
            </div>
          )}

          {!loading&&events.length>0&&(
            <div style={S.eventGrid}>
              {events.map((event,idx)=>{
                const img=event.images?.find(i=>i.width>500)?.url||event.images?.[0]?.url;
                const date=event.dates?.start?.localDate;
                const time=event.dates?.start?.localTime;
                const venue=event._embedded?.venues?.[0];
                const cityName=venue?.city?.name||"";
                const venueName=venue?.name||"";
                const saved=isSaved(event.id);
                const isToday=date===new Date().toISOString().split("T")[0];
                const dateObj=date?new Date(date+"T00:00:00"):null;
                const monthShort=dateObj?dateObj.toLocaleDateString("en-US",{month:"short"}).toUpperCase():"";
                const dayNum=dateObj?dateObj.getDate():"";
                const weekday=dateObj?dateObj.toLocaleDateString("en-US",{weekday:"short"}):"";
                return(
                  <div key={event.id} style={{...S.eventCard,animation:`fadeSlideUp 0.4s ${idx*0.045}s both`}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px) scale(1.01)";e.currentTarget.style.boxShadow="0 20px 50px rgba(0,33,165,0.14), 0 8px 20px rgba(0,0,0,0.06)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)";}}>
                    {/* Image — cinematic ratio */}
                    <div style={S.cardImg}>
                      {img ? (
                        <div style={{width:"100%",height:"100%",backgroundImage:'url('+img+')',backgroundSize:"cover",backgroundPosition:"center",transition:"transform 0.5s cubic-bezier(.4,0,.2,1)"}}
                          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
                      ) : (
                        <div style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#0021A5 0%,#1E40AF 40%,#3B82F6 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <PartyPopper size={28} color="rgba(255,255,255,0.35)"/>
                        </div>
                      )}
                      {/* Gradient overlay for text legibility */}
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(0,0,0,0.35) 0%,transparent 50%)",pointerEvents:"none"}}/>
                      {/* Date badge */}
                      <div style={{...S.dateBadge,...(isToday?{background:"#FA4616",color:"#fff",borderColor:"rgba(250,70,22,0.3)"}:{})}}>
                        {isToday ? <><Zap size={10}/> TODAY</> : <><span style={{fontSize:"0.55rem",opacity:0.7}}>{weekday}</span> <span style={{fontWeight:800}}>{monthShort} {dayNum}</span></>}
                      </div>
                      {/* Save button */}
                      <button onClick={e=>{e.stopPropagation();toggleSave(event);}} style={{...S.heartBtn,...(saved?{background:"#FEF2F2",borderColor:"#FECACA",boxShadow:"0 2px 12px rgba(239,68,68,0.18)"}:{})}}
                        onMouseEnter={e=>{if(!saved){e.currentTarget.style.background="rgba(255,255,255,0.95)";e.currentTarget.style.transform="scale(1.08)";e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,0.15)";}}}
                        onMouseLeave={e=>{if(!saved){e.currentTarget.style.background="rgba(255,255,255,0.85)";e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.1)";}}}>
                        <Heart size={14} fill={saved?"#EF4444":"none"} color={saved?"#EF4444":"#6B7280"} strokeWidth={saved?0:2}/>
                      </button>
                    </div>

                    {/* Content */}
                    <div style={S.cardBody}>
                      <h3 style={S.eventTitle}>{event.name}</h3>
                      <div style={S.eventMeta}>
                        {(cityName||venueName)&&<span style={S.metaItem}><MapPin size={10} strokeWidth={2.5}/>{cityName||venueName}</span>}
                        {time&&<span style={S.metaItem}><Clock size={10}/>{fmtTime(time)}</span>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:"0.5rem",borderTop:"1px solid #F3F4F6"}}>
                        {event.url&&<a href={event.url} target="_blank" rel="noopener noreferrer" style={S.ticketBtn}
                          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 4px 14px rgba(250,70,22,0.3)";}}
                          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 6px rgba(250,70,22,0.15)";}}>
                          <Ticket size={11}/> Get Tickets
                        </a>}
                        {venueName&&cityName&&<span style={{fontSize:"0.58rem",color:"#9CA3AF",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:110}}>{venueName}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading&&events.length===0&&!error&&(
            <div style={S.emptyState}>
              <div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 0.75rem"}}>
                <PartyPopper size={28} color="#3B82F6"/>
              </div>
              <h3 style={{fontSize:"1.05rem",fontWeight:700,color:"#1F2937",margin:"0 0 0.35rem"}}>No events found</h3>
              <p style={{fontSize:"0.82rem",color:"#9CA3AF",maxWidth:340,lineHeight:1.55,margin:"0 auto 1rem"}}>Try different filters, another city, or a broader date range to discover more.</p>
              <div style={{display:"flex",gap:"0.5rem",justifyContent:"center",flexWrap:"wrap"}}>
                {city&&<button onClick={()=>{setCity("");setTimeout(()=>fetchEvents(0),50);}} style={{display:"inline-flex",alignItems:"center",gap:"0.25rem",padding:"0.45rem 0.9rem",borderRadius:"0.5rem",border:"1px solid #BFDBFE",background:"#EFF6FF",color:"#0021A5",cursor:"pointer",fontSize:"0.78rem",fontWeight:600}}>Try all cities</button>}
                {keyword&&<button onClick={()=>{setKeyword("");setTimeout(()=>fetchEvents(0),50);}} style={{display:"inline-flex",alignItems:"center",gap:"0.25rem",padding:"0.45rem 0.9rem",borderRadius:"0.5rem",border:"1px solid #BFDBFE",background:"#EFF6FF",color:"#0021A5",cursor:"pointer",fontSize:"0.78rem",fontWeight:600}}>Clear search</button>}
                {datePreset>0&&<button onClick={()=>{setDatePreset(0);setTimeout(()=>fetchEvents(0),50);}} style={{display:"inline-flex",alignItems:"center",gap:"0.25rem",padding:"0.45rem 0.9rem",borderRadius:"0.5rem",border:"1px solid #BFDBFE",background:"#EFF6FF",color:"#0021A5",cursor:"pointer",fontSize:"0.78rem",fontWeight:600}}>Any date</button>}
                <button onClick={()=>{setCity("");setKeyword("");setSegmentIds([]);setDatePreset(0);setTimeout(()=>fetchEvents(0),50);}} style={{display:"inline-flex",alignItems:"center",gap:"0.25rem",padding:"0.45rem 0.9rem",borderRadius:"0.5rem",border:"1px solid #FECACA",background:"#FEF2F2",color:"#DC2626",cursor:"pointer",fontSize:"0.78rem",fontWeight:600}}><X size={12}/> Clear all filters</button>
              </div>
            </div>
          )}

          {totalPages>1&&(
            <div style={S.pagination}>
              <button disabled={page===0} onClick={()=>fetchEvents(page-1)} style={{...S.pageBtn,opacity:page===0?0.35:1}}>
                <ChevronLeft size={14}/> Previous
              </button>
              <div style={{display:"flex",alignItems:"center",gap:"0.35rem"}}>
                {Array.from({length:Math.min(totalPages,5)},(_, i)=>{
                  let pg=i;
                  if(totalPages>5){if(page<3)pg=i;else if(page>totalPages-4)pg=totalPages-5+i;else pg=page-2+i;}
                  return(
                    <button key={pg} onClick={()=>fetchEvents(pg)} style={{...S.pageDot,...(pg===page?S.pageDotActive:{})}}>
                      {pg+1}
                    </button>
                  );
                })}
              </div>
              <button disabled={page>=totalPages-1} onClick={()=>fetchEvents(page+1)} style={{...S.pageBtn,opacity:page>=totalPages-1?0.35:1}}>
                Next <ChevronRight size={14}/>
              </button>
            </div>
          )}
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside style={S.sidebar}>
          {/* Saved Events */}
          <div style={{...S.sideCard,...(sidePanel==="saved"?{borderColor:"rgba(250,70,22,0.15)"}:{})}}>
            <button onClick={()=>setSidePanel(p=>p==="saved"?"none":"saved")} style={S.sideHeader}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,0.01)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
                <div style={{width:28,height:28,borderRadius:"0.55rem",background:"linear-gradient(135deg,#FA4616,#FF6B35)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(250,70,22,0.2)"}}><Heart size={12} color="#fff"/></div>
                <div>
                  <span style={{fontSize:"0.78rem",fontWeight:700,color:"#111827",display:"block",lineHeight:1.2}}>Saved Events</span>
                  <span style={{fontSize:"0.52rem",color:"#9CA3AF",fontWeight:500}}>{savedEvents.length} saved</span>
                </div>
              </div>
              <ChevronDown size={13} color="#9CA3AF" style={{transition:"transform 0.25s ease",transform:sidePanel==="saved"?"rotate(180deg)":"rotate(0)"}}/>
            </button>
            {sidePanel==="saved"&&(
              <div style={S.sideBody}>
                {savedEvents.length>0 ? savedEvents.map(ev=>(
                  <div key={ev.id} style={S.savedItem}
                    onMouseEnter={e=>{e.currentTarget.style.background="#FFF7ED";e.currentTarget.style.borderColor="#FED7AA";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="#FFFBF9";e.currentTarget.style.borderColor="#FEF2F2";}}>
                    {ev.image&&<div style={{width:38,height:38,borderRadius:"0.45rem",backgroundImage:'url('+ev.image+')',backgroundSize:"cover",backgroundPosition:"center",flexShrink:0,boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}/>}
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{fontSize:"0.72rem",fontWeight:600,color:"#111827",margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ev.name}</p>
                      <p style={{fontSize:"0.56rem",color:"#9CA3AF",margin:"0.15rem 0 0"}}>{ev.date&&fmtDate(ev.date)}{ev.city?` · ${ev.city}`:""}</p>
                    </div>
                    <div style={{display:"flex",gap:"0.2rem",flexShrink:0}}>
                      {ev.url&&<a href={ev.url} target="_blank" rel="noopener noreferrer" style={S.sideIconBtn}
                        onMouseEnter={e=>{e.currentTarget.style.background="#EFF6FF";e.currentTarget.style.borderColor="#93C5FD";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.borderColor="#E5E7EB";}}><ExternalLink size={10}/></a>}
                      <button onClick={()=>{const next=savedEvents.filter(e=>e.id!==ev.id);setSavedEvents(next);persistSavedEvents(next,userEmail);}} style={{...S.sideIconBtn,borderColor:"#FECACA",color:"#EF4444"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="#FEF2F2";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#fff";}}><X size={10}/></button>
                    </div>
                  </div>
                )) : !userEmail ? (
                  <div style={{textAlign:"center",padding:"1.25rem 0.75rem"}}>
                    <Heart size={20} color="#D1D5DB" style={{marginBottom:8}}/>
                    <p style={{fontSize:"0.78rem",fontWeight:600,color:"#374151",margin:"0 0 0.3rem"}}>Sign in to save events</p>
                    <p style={{fontSize:"0.68rem",color:"#9CA3AF",margin:"0 0 0.75rem",lineHeight:1.4}}>Create a free account to bookmark events and access them anywhere.</p>
                    <button onClick={()=>navigate("/login")} style={{
                      display:"inline-flex",alignItems:"center",gap:"0.35rem",padding:"0.5rem 1.1rem",
                      borderRadius:"0.5rem",border:"none",
                      background:"linear-gradient(135deg,#0021A5,#003087)",color:"#fff",
                      cursor:"pointer",fontSize:"0.72rem",fontWeight:700,
                      boxShadow:"0 2px 8px rgba(0,33,165,0.25)",transition:"all 0.2s",
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 4px 12px rgba(0,33,165,0.35)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,33,165,0.25)";}}>
                      Sign In
                    </button>
                  </div>
                ) : (
                  <div style={{textAlign:"center",padding:"1rem 0.5rem"}}>
                    <Heart size={18} color="#D1D5DB" style={{marginBottom:6}}/>
                    <p style={{fontSize:"0.72rem",color:"#9CA3AF",margin:0,lineHeight:1.4}}>Tap the heart on any event card to save it here.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Event Etiquette */}
          <div style={{...S.sideCard,...(sidePanel==="tips"?{borderColor:"rgba(0,33,165,0.12)"}:{})}}>
            <button onClick={()=>setSidePanel(p=>p==="tips"?"none":"tips")} style={S.sideHeader}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,0.01)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
                <div style={{width:28,height:28,borderRadius:"0.55rem",background:"linear-gradient(135deg,#0021A5,#003087)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,33,165,0.18)"}}><Lightbulb size={12} color="#fff"/></div>
                <div>
                  <span style={{fontSize:"0.78rem",fontWeight:700,color:"#111827",display:"block",lineHeight:1.2}}>Event Etiquette</span>
                  <span style={{fontSize:"0.52rem",color:"#9CA3AF",fontWeight:500}}>{countryObj.flag} {countryObj.label} tips</span>
                </div>
              </div>
              <ChevronDown size={13} color="#9CA3AF" style={{transition:"transform 0.25s ease",transform:sidePanel==="tips"?"rotate(180deg)":"rotate(0)"}}/>
            </button>
            {sidePanel==="tips"&&(
              <div style={S.sideBody}>
                {tips.map((t,i)=>(
                  <div key={i} style={S.tipItem}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.35rem",marginBottom:"0.25rem"}}>
                      <span style={{fontSize:"0.9rem",lineHeight:1}}>{t.icon}</span>
                      <span style={{fontSize:"0.72rem",fontWeight:700,color:"#111827"}}>{t.title}</span>
                    </div>
                    <p style={{fontSize:"0.68rem",color:"#6B7280",margin:0,lineHeight:1.5,paddingLeft:"1.25rem"}}>{t.tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Event Phrases */}
          <div style={{...S.sideCard,...(sidePanel==="phrases"?{borderColor:"rgba(0,33,165,0.12)"}:{})}}>
            <button onClick={()=>setSidePanel(p=>p==="phrases"?"none":"phrases")} style={S.sideHeader}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,0.01)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
                <div style={{width:28,height:28,borderRadius:"0.55rem",background:"linear-gradient(135deg,#0021A5,#1E40AF)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,33,165,0.18)"}}><MessageCircle size={12} color="#fff"/></div>
                <div>
                  <span style={{fontSize:"0.78rem",fontWeight:700,color:"#111827",display:"block",lineHeight:1.2}}>Event Phrases</span>
                  <span style={{fontSize:"0.52rem",color:"#9CA3AF",fontWeight:500}}>{countryObj.flag} {phrases.length} essential phrases</span>
                </div>
              </div>
              <ChevronDown size={13} color="#9CA3AF" style={{transition:"transform 0.25s ease",transform:sidePanel==="phrases"?"rotate(180deg)":"rotate(0)"}}/>
            </button>
            {sidePanel==="phrases"&&(
              <div style={S.sideBody}>
                {phrases.map((p,i)=>(
                  <div key={i} style={S.phraseItem}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.25rem"}}>
                      <span style={{fontSize:"0.52rem",fontWeight:700,color:"#0021A5",background:"#EFF6FF",padding:"0.1rem 0.4rem",borderRadius:9999,letterSpacing:"0.02em"}}>{p.ctx}</span>
                      <div style={{display:"flex",gap:"0.2rem"}}>
                        <button onClick={()=>speakPhrase(p.de,i)} title="Listen"
                          style={{...S.phraseIconBtn,...(speakingIdx===i?{background:"#0021A5",color:"#fff",borderColor:"#0021A5",boxShadow:"0 0 0 3px rgba(0,33,165,0.15)"}:{})}}
                          onMouseEnter={e=>{if(speakingIdx!==i){e.currentTarget.style.background="#EFF6FF";e.currentTarget.style.borderColor="#93C5FD";}}}
                          onMouseLeave={e=>{if(speakingIdx!==i){e.currentTarget.style.background="#fff";e.currentTarget.style.borderColor="#BFDBFE";}}}>
                          <Volume2 size={10}/>
                        </button>
                        <button onClick={()=>togglePhraseBookmark(p)} title={isPhraseBookmarked(p.de)?"Unbookmark":"Bookmark"}
                          style={{...S.phraseIconBtn,...(isPhraseBookmarked(p.de)?{background:"#FFF7ED",color:"#FA4616",borderColor:"#FA4616",boxShadow:"0 0 0 3px rgba(250,70,22,0.1)"}:{})}}
                          onMouseEnter={e=>{if(!isPhraseBookmarked(p.de)){e.currentTarget.style.background="#FFF7ED";e.currentTarget.style.borderColor="#FED7AA";}}}
                          onMouseLeave={e=>{if(!isPhraseBookmarked(p.de)){e.currentTarget.style.background="#fff";e.currentTarget.style.borderColor="#BFDBFE";}}}>
                          <Bookmark size={10} fill={isPhraseBookmarked(p.de)?"#FA4616":"none"}/>
                        </button>
                      </div>
                    </div>
                    <p style={{fontSize:"0.8rem",fontWeight:700,color:"#111827",margin:"0 0 0.08rem",letterSpacing:"-0.01em"}}>{p.de}</p>
                    {p.pron&&<p style={{fontSize:"0.58rem",color:"#3B82F6",margin:"0 0 0.12rem",fontStyle:"italic",fontWeight:500}}>/{p.pron}/</p>}
                    <p style={{fontSize:"0.68rem",color:"#6B7280",margin:0,lineHeight:1.4}}>{p.en}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      <footer style={S.foot}>
        <p style={{margin:0}}>&copy; 2026 MyTranslationBuddy &mdash; Built by Gators, for Gators 🐊</p>
      </footer>
    </div>
  );
};

const S = {
  page:{minHeight:"100vh",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",color:"#111827",background:"#F8FAFC"},

  /* ── Navbar ── */
  hdr:{backgroundColor:"rgba(255,255,255,0.88)",backdropFilter:"blur(24px) saturate(180%)",WebkitBackdropFilter:"blur(24px) saturate(180%)",borderBottom:"1px solid rgba(229,231,235,0.45)",position:"sticky",top:0,zIndex:1000,boxShadow:"0 1px 3px rgba(0,0,0,0.03)"},
  hdrIn:{maxWidth:1280,margin:"0 auto",padding:"0.2rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center"},
  hdrL:{display:"flex",alignItems:"center",gap:"0.6rem",cursor:"pointer"},
  brand:{fontSize:"1.05rem",fontWeight:800,color:"#0021A5",letterSpacing:"-0.02em"},
  nav:{display:"flex",gap:"0.15rem",alignItems:"center",flexWrap:"wrap",background:"#F3F4F6",borderRadius:"0.65rem",padding:"0.2rem"},
  nb:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 0.85rem",border:"none",borderRadius:"0.5rem",backgroundColor:"transparent",color:"#6B7280",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,transition:"all 0.2s"},
  nbActive:{backgroundColor:"#fff",fontWeight:700,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",color:"#0021A5"},
  nbA:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 1.1rem",border:"none",borderRadius:"0.5rem",background:"linear-gradient(135deg,#FA4616,#FF6B35)",color:"#fff",cursor:"pointer",fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.02em",boxShadow:"0 2px 8px rgba(250,70,22,0.25)",marginLeft:"0.35rem"},

  /* ── Command bar — deeper, more dimensional ── */
  commandBar:{background:"linear-gradient(135deg,#001A6E 0%,#0021A5 40%,#003087 75%,#1E40AF 100%)",position:"sticky",top:57,zIndex:900,boxShadow:"0 6px 32px rgba(0,33,165,0.22), 0 1px 0 rgba(255,255,255,0.05) inset",borderBottom:"1px solid rgba(30,64,175,0.3)",overflow:"visible",isolation:"isolate"},

  commandInner:{maxWidth:1280,margin:"0 auto",padding:"0.7rem 2rem 0.6rem",display:"flex",alignItems:"flex-start",gap:"0.6rem",flexWrap:"nowrap",position:"relative",zIndex:1},

  /* Country toggle */
  countryToggle:{display:"flex",height:36,borderRadius:"0.6rem",overflow:"hidden",border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.04)",flexShrink:0,marginTop:0},
  countryBtn:{display:"flex",alignItems:"center",gap:"0.25rem",height:"100%",padding:"0 0.65rem",border:"none",borderRadius:0,background:"transparent",color:"rgba(255,255,255,0.4)",cursor:"pointer",transition:"all 0.2s cubic-bezier(.4,0,.2,1)",whiteSpace:"nowrap",fontSize:"0.68rem"},
  countryBtnOn:{background:"rgba(255,255,255,0.16)",color:"#fff",boxShadow:"0 0 0 1px rgba(255,255,255,0.08) inset"},

  /* Search form */
  searchForm:{display:"flex",alignItems:"center",gap:"0.45rem",width:"100%",height:36,padding:"0 0.7rem",borderRadius:"0.6rem",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",transition:"all 0.25s cubic-bezier(.4,0,.2,1)"},
  searchInput:{border:"none",outline:"none",flex:1,backgroundColor:"transparent",fontSize:"0.78rem",color:"#fff",minWidth:80,fontWeight:500,letterSpacing:"0.01em"},
  searchGo:{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,border:"none",borderRadius:"0.45rem",background:"rgba(255,255,255,0.14)",color:"#fff",cursor:"pointer",transition:"all 0.2s",flexShrink:0},

  /* City button — matches My Cities style */
  cityBtn:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.25rem",height:36,padding:"0 0.65rem",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"0.6rem",background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.85)",cursor:"pointer",transition:"all 0.2s",fontSize:"0.64rem",fontWeight:600,whiteSpace:"nowrap"},

  /* My Cities */
  myCitiesBtn:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.25rem",height:36,padding:"0 0.65rem",border:"1px solid rgba(250,70,22,0.25)",borderRadius:"0.6rem",background:"rgba(250,70,22,0.08)",color:"rgba(255,255,255,0.8)",cursor:"pointer",transition:"all 0.2s",fontSize:"0.64rem",fontWeight:600,whiteSpace:"nowrap"},
  dropdown:{position:"absolute",top:"calc(100% + 8px)",right:0,minWidth:210,backgroundColor:"#fff",border:"1px solid rgba(229,231,235,0.5)",borderRadius:"0.8rem",boxShadow:"0 16px 48px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06)",zIndex:9999,overflow:"hidden",animation:"fadeSlideUp 0.2s ease"},
  dropItem:{padding:"0.5rem 0.75rem",fontSize:"0.76rem",cursor:"pointer",borderBottom:"1px solid #F9FAFB",display:"flex",alignItems:"center",gap:"0.4rem",color:"#374151",transition:"all 0.15s",background:"transparent"},

  /* Seasonal suggestions */
  suggestChip:{display:"inline-flex",alignItems:"center",gap:"0.2rem",padding:"0.12rem 0.5rem",border:"1px solid rgba(255,255,255,0.08)",borderRadius:9999,background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.55)",cursor:"pointer",fontSize:"0.58rem",fontWeight:500,transition:"all 0.2s cubic-bezier(.4,0,.2,1)",letterSpacing:"0.01em"},

  /* ── Filter strip — floating pills, no boxed bar ── */
  filterStrip:{background:"transparent",position:"sticky",top:120,zIndex:800,paddingTop:"0.55rem",paddingBottom:"0.1rem"},
  filterInner:{maxWidth:1280,margin:"0 auto",padding:"0 2rem",display:"flex",alignItems:"center",gap:"0.4rem",flexWrap:"wrap"},

  /* Pill filter buttons */
  filterPill:{display:"inline-flex",alignItems:"center",gap:"0.22rem",padding:"0.32rem 0.7rem",border:"1.5px solid rgba(0,33,165,0.2)",borderRadius:9999,background:"rgba(219,234,254,0.3)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",color:"#3B5998",cursor:"pointer",fontSize:"0.68rem",fontWeight:550,transition:"all 0.22s cubic-bezier(.4,0,.2,1)",whiteSpace:"nowrap",letterSpacing:"0.01em",boxShadow:"0 1px 3px rgba(0,33,165,0.04)"},
  filterPillOn:{color:"#0021A5",fontWeight:700,border:"1.5px solid transparent",background:"linear-gradient(#edf3fe,#edf3fe) padding-box, linear-gradient(135deg,#FA4616,#FF6B35,#0021A5) border-box",boxShadow:"0 2px 10px rgba(250,70,22,0.12), 0 2px 8px rgba(0,33,165,0.08)"},
  filterDot:{width:3,height:3,borderRadius:"50%",background:"#D1D5DB",flexShrink:0},

  activeTag:{fontSize:"0.58rem",fontWeight:600,color:"#0021A5",background:"rgba(239,246,255,0.9)",padding:"0.14rem 0.5rem",borderRadius:9999,border:"1px solid #BFDBFE",letterSpacing:"0.01em"},
  clearBtn:{display:"flex",alignItems:"center",gap:"0.18rem",fontSize:"0.58rem",fontWeight:600,color:"#fff",background:"rgba(220,38,38,0.75)",border:"none",borderRadius:9999,padding:"0.2rem 0.55rem",cursor:"pointer",flexShrink:0,transition:"all 0.2s cubic-bezier(.4,0,.2,1)"},

  /* Sorting Adds */
  sortSelect:{background:"transparent",border:"none",color:"#0021A5",fontSize:"0.62rem",fontWeight:700,cursor:"pointer",outline:"none",appearance:"none",paddingRight:"0.5rem"},
  sortWrap:{display:"flex",alignItems:"center",gap:"0.25rem",marginLeft:"auto",background:"rgba(239,246,255,0.6)",padding:"0.15rem 0.5rem",borderRadius:9999,border:"1px solid rgba(191,219,254,0.5)"},

  /* ── Layout ── */
  layout:{maxWidth:1280,margin:"0 auto",padding:"1rem 2rem 2.5rem",display:"grid",gridTemplateColumns:"1fr 290px",gap:"1.5rem",alignItems:"start"},
  mainCol:{minWidth:0},
  sidebar:{display:"flex",flexDirection:"column",gap:"0.7rem",position:"sticky",top:152},

  /* ── Event Grid — premium cards ── */
  eventGrid:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1rem",marginBottom:"1.5rem"},
  eventCard:{backgroundColor:"#fff",borderRadius:"1rem",overflow:"hidden",border:"1px solid rgba(229,231,235,0.35)",transition:"all 0.35s cubic-bezier(.4,0,.2,1)",cursor:"default",boxShadow:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",display:"flex",flexDirection:"column"},
  cardImg:{position:"relative",width:"100%",height:155,overflow:"hidden",flexShrink:0},
  heartBtn:{position:"absolute",top:"0.55rem",right:"0.55rem",background:"rgba(255,255,255,0.85)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.6)",borderRadius:"0.55rem",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.3s cubic-bezier(.4,0,.2,1)",zIndex:2,boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},
  dateBadge:{position:"absolute",bottom:"0.55rem",left:"0.55rem",display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.22rem 0.55rem",borderRadius:9999,backgroundColor:"rgba(255,255,255,0.95)",backdropFilter:"blur(12px)",border:"1px solid rgba(229,231,235,0.3)",color:"#111827",fontSize:"0.58rem",fontWeight:700,boxShadow:"0 2px 10px rgba(0,0,0,0.08)",letterSpacing:"0.02em"},
  cardBody:{padding:"0.7rem 0.8rem",display:"flex",flexDirection:"column",flex:1,minHeight:0},
  eventTitle:{fontSize:"0.84rem",fontWeight:700,color:"#111827",margin:"0 0 0.3rem",lineHeight:1.35,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",letterSpacing:"-0.01em"},
  eventMeta:{display:"flex",alignItems:"center",gap:"0.6rem",flexWrap:"wrap"},
  metaItem:{display:"flex",alignItems:"center",gap:"0.18rem",fontSize:"0.62rem",color:"#9CA3AF",fontWeight:500},
  ticketBtn:{display:"inline-flex",alignItems:"center",gap:"0.25rem",padding:"0.35rem 0.7rem",border:"none",borderRadius:"0.45rem",background:"linear-gradient(135deg,#FA4616,#FF6B35)",color:"#fff",cursor:"pointer",fontSize:"0.65rem",fontWeight:700,textDecoration:"none",boxShadow:"0 2px 6px rgba(250,70,22,0.15)",transition:"all 0.25s cubic-bezier(.4,0,.2,1)",letterSpacing:"0.01em"},

  errorBox:{display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.85rem 1rem",backgroundColor:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"0.75rem",color:"#DC2626",fontSize:"0.82rem",marginBottom:"1rem"},
  loadWrap:{display:"flex",flexDirection:"column",alignItems:"center",padding:"4rem 1rem"},
  spinner:{width:36,height:36,border:"3px solid #E5E7EB",borderTopColor:"#0021A5",borderRadius:"50%",animation:"spin 0.8s linear infinite"},
  emptyState:{textAlign:"center",padding:"4rem 2rem",backgroundColor:"#fff",borderRadius:"1.25rem",border:"1px solid rgba(229,231,235,0.3)",background:"linear-gradient(180deg,#fff 0%,#FAFBFF 100%)",gridColumn:"1 / -1",boxShadow:"0 1px 3px rgba(0,0,0,0.03)"},
  pagination:{display:"flex",justifyContent:"center",alignItems:"center",gap:"0.5rem",marginBottom:"1rem",padding:"1rem 0",gridColumn:"1 / -1"},
  pageBtn:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 0.9rem",border:"1px solid rgba(229,231,235,0.4)",borderRadius:"0.55rem",backgroundColor:"#fff",color:"#374151",cursor:"pointer",fontSize:"0.72rem",fontWeight:600,transition:"all 0.2s cubic-bezier(.4,0,.2,1)",boxShadow:"0 1px 2px rgba(0,0,0,0.03)"},
  pageDot:{width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(229,231,235,0.4)",borderRadius:"0.4rem",backgroundColor:"#fff",color:"#6B7280",cursor:"pointer",fontSize:"0.7rem",fontWeight:600,transition:"all 0.15s"},
  pageDotActive:{background:"#0021A5",color:"#fff",borderColor:"#0021A5",boxShadow:"0 2px 8px rgba(0,33,165,0.2)"},

  /* ── Sidebar ── */
  sideCard:{backgroundColor:"#fff",borderRadius:"0.9rem",border:"1px solid rgba(229,231,235,0.35)",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.03)",transition:"all 0.25s cubic-bezier(.4,0,.2,1)"},
  sideHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"0.7rem 0.8rem",border:"none",background:"transparent",cursor:"pointer",transition:"all 0.15s",borderRadius:"0.9rem"},
  sideBody:{padding:"0 0.8rem 0.8rem",display:"flex",flexDirection:"column",gap:"0.45rem",maxHeight:380,overflowY:"auto"},

  savedItem:{display:"flex",alignItems:"center",gap:"0.45rem",padding:"0.45rem",borderRadius:"0.5rem",background:"#FFFBF9",border:"1px solid rgba(254,226,226,0.5)",transition:"all 0.2s cubic-bezier(.4,0,.2,1)"},
  sideIconBtn:{display:"flex",alignItems:"center",justifyContent:"center",width:24,height:24,borderRadius:"0.35rem",border:"1px solid rgba(229,231,235,0.4)",backgroundColor:"#fff",color:"#6B7280",cursor:"pointer",transition:"all 0.15s",textDecoration:"none"},

  tipItem:{padding:"0.55rem 0.6rem",borderRadius:"0.5rem",background:"linear-gradient(135deg,#F8FAFF,#EFF6FF)",border:"1px solid rgba(238,242,255,0.6)",transition:"all 0.15s"},
  phraseItem:{padding:"0.5rem 0.6rem",borderRadius:"0.5rem",background:"linear-gradient(135deg,#FAFBFF,#F0F4FF)",border:"1px solid rgba(219,234,254,0.5)",transition:"all 0.15s"},
  phraseIconBtn:{display:"flex",alignItems:"center",justifyContent:"center",width:24,height:24,borderRadius:"0.35rem",border:"1px solid rgba(191,219,254,0.5)",backgroundColor:"#fff",color:"#0021A5",cursor:"pointer",transition:"all 0.2s cubic-bezier(.4,0,.2,1)"},

  foot:{textAlign:"center",padding:"2rem 1.5rem",color:"#9CA3AF",fontSize:"0.72rem",fontWeight:500,borderTop:"1px solid rgba(229,231,235,0.5)",background:"linear-gradient(180deg,transparent,rgba(0,33,165,0.015))"},
};

if(typeof document!=="undefined"){
  const el=document.getElementById("mtb-events-anim")||document.createElement("style");
  el.id="mtb-events-anim";
  el.textContent=`
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes fadeSlideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes evtToastIn{from{opacity:0;transform:translateX(-50%) translateY(-12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
    [data-events-bar] input::placeholder{color:rgba(255,255,255,0.4)!important}
    [data-events-bar] input:focus{outline:none}
    [data-events-bar] form:focus-within{border-color:rgba(255,255,255,0.22)!important;background:rgba(255,255,255,0.1)!important;box-shadow:0 0 0 3px rgba(255,255,255,0.06)!important}
  `;
  if(!el.parentNode)document.head.appendChild(el);
}

export default Events;