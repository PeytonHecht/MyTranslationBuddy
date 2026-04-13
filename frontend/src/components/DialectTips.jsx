import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import {
  MapPin, MessageCircle, BookOpen, ArrowLeft, Bookmark, BookmarkCheck,
  Globe, Search, ChevronDown, ChevronUp, Star, Volume2,
  Home, DollarSign, Map, BookOpenCheck, Users, Calendar, Info,
  Compass, ClipboardList, User, Sparkles, GraduationCap, Coffee,
  Heart, Zap, Languages, ExternalLink, X, LogOut
} from "lucide-react";
import logo from "../assets/MTBLogo.png";
import { handleLogout as sharedLogout, authHeaders } from "../utils/auth.js";

const BACKEND_URL = "/api";

/* ── City hero images ── */
const CITY_IMAGES = {
  berlin:      "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&q=80",
  munich:      "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=1200&q=80",
  hamburg:     "https://images.unsplash.com/photo-1422360902398-0a91ff2c1a1f?w=1200&q=80",
  stuttgart:   "https://images.unsplash.com/photo-1587196824241-2a289b7d1693?w=1200&q=80",
  leipzig:     "https://images.unsplash.com/photo-1722942846622-98cef6a2cd84?w=1200&q=80",
  mannheim:    "https://images.unsplash.com/photo-1750101496059-ec555dbfd1ae?w=1200&q=80",
  aachen:      "https://images.unsplash.com/photo-1686000066783-5e520d0495f4?w=1200&q=80",
  bonn:        "https://images.unsplash.com/photo-1604353631119-91e94dc9fb50?w=1200&q=80",
  wurzburg:    "https://images.unsplash.com/photo-1602128318292-8273afb70bb5?w=1200&q=80",
  cologne:     "https://images.unsplash.com/photo-1697570550188-cac3c7d109a0?w=1200&q=80",
  frankfurt:   "https://images.unsplash.com/photo-1549893072-4bc678117f45?w=1200&q=80",
  heidelberg:  "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=1200&q=80",
  osnabruck:   "https://images.unsplash.com/photo-1681131497194-7e208a0e2b3d?w=1200&q=80",
  detmold:     "https://images.unsplash.com/photo-1617706178918-6ca821e4d639?w=1200&q=80",
  lemgo:       "https://images.unsplash.com/photo-1687089454344-96a1acc71c2d?w=1200&q=80",
  jena:        "https://images.unsplash.com/photo-1602529655261-45163cf428bc?w=1200&q=80",
  dresden:     "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=1200&q=80",
  nuremberg:   "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=1200&q=80",
  dortmund:    "https://images.unsplash.com/photo-1718893141076-49d82fdb2e51?w=1200&q=80",
  ebs:         "https://images.unsplash.com/photo-1700833048815-0338b1f59898?w=1200&q=80",
  eltville:    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Eltville_Rhein_Panorama.jpg/960px-Eltville_Rhein_Panorama.jpg",
  vallendar:   "https://images.unsplash.com/photo-1722722793023-b3bef642c6bc?w=1200&q=80",
  vienna:      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&q=80",
  salzburg:    "https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=1200&q=80",
  graz:        "https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&q=80",
  innsbruck:   "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=1200&q=80",
  linz:        "https://images.unsplash.com/photo-1549893072-4bc678117f45?w=1200&q=80",
  zurich:      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=1200&q=80",
  bern:        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80",
  basel:       "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80",
  winterthur:  "https://images.unsplash.com/photo-1718232879769-d2942017c388?w=1200&q=80",
  lucerne:     "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&q=80",
  geneva:      "https://images.unsplash.com/photo-1573108037329-37aa135a142e?w=1200&q=80",
  lausanne:    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&q=80",
  rapperswil:  "https://images.unsplash.com/photo-1504714146340-959ca07e1f38?w=1200&q=80",
};
const FALLBACK_IMG = "https://images.unsplash.com/photo-1473951574080-01fe45ec8643?w=1200&q=80";

const COUNTRY_FLAG = { Germany: "\u{1F1E9}\u{1F1EA}", Austria: "\u{1F1E6}\u{1F1F9}", Switzerland: "\u{1F1E8}\u{1F1ED}", DE: "\u{1F1E9}\u{1F1EA}", AT: "\u{1F1E6}\u{1F1F9}", CH: "\u{1F1E8}\u{1F1ED}" };

/* ── Helpers: organize tips within a program into sections ─── */
const SECTION_ORDER = [
  "overview", "academics", "eligibility", "excursions",
  "housing", "costs", "fun", "city life", "transportation", "testimonial"
];
const SECTION_ICONS = {
  overview: Info, academics: BookOpenCheck, eligibility: Users,
  excursions: Map, housing: Home, costs: DollarSign,
  fun: Star, "city life": Globe, transportation: MapPin, testimonial: MessageCircle
};
const SECTION_LABELS = {
  overview: "Program Overview", academics: "Academics & Courses",
  eligibility: "Eligibility & Requirements", excursions: "Excursions & Site Visits",
  housing: "Housing", costs: "Costs & Financial Aid",
  fun: "Student Life & Fun", "city life": "City Life",
  transportation: "Transportation", testimonial: "Student Testimonials"
};

function categorizeTip(tip) {
  const cat = (tip.category || "").toLowerCase();
  const title = (tip.title || "").toLowerCase();
  if (title.includes("testimonial")) return "testimonial";
  if (cat.includes("academic") || title.includes("course") || title.includes("credit")) return "academics";
  if (cat.includes("housing") || title.includes("housing") || title.includes("residence") || title.includes("dormitor") || title.includes("wohnheim")) return "housing";
  if (cat.includes("excursion") || title.includes("excursion") || title.includes("site visit") || title.includes("field trip")) return "excursions";
  if (cat.includes("cost") || title.includes("cost") || title.includes("financial") || title.includes("scholarship") || title.includes("tuition") || title.includes("budget")) return "costs";
  if (cat === "fun" || cat === "student life" || title.includes("nightlife") || title.includes("social")) return "fun";
  if (cat === "city life" || title.includes("city life")) return "city life";
  if (cat === "transportation" || title.includes("transport") || title.includes("transit") || title.includes("getting around")) return "transportation";
  if (title.includes("eligib") || title.includes("requirement") || title.includes("prerequisite")) return "eligibility";
  if (title.includes("overview") || title.includes("program")) return "overview";
  return "overview";
}

function groupTipsBySection(tips) {
  const grouped = {};
  tips.forEach(t => {
    const sec = categorizeTip(t);
    if (!grouped[sec]) grouped[sec] = [];
    grouped[sec].push(t);
  });
  const sorted = [];
  SECTION_ORDER.forEach(s => { if (grouped[s]) sorted.push([s, grouped[s]]); });
  Object.keys(grouped).forEach(s => { if (!SECTION_ORDER.includes(s)) sorted.push([s, grouped[s]]); });
  return sorted;
}

/* tag colors */
const TAG_COLORS = [
  { bg: "#DBEAFE", text: "#1E40AF" },
  { bg: "#D1FAE5", text: "#065F46" },
  { bg: "#FEF3C7", text: "#92400E" },
  { bg: "#EDE9FE", text: "#5B21B6" },
  { bg: "#FCE7F3", text: "#9D174D" },
  { bg: "#FFF7ED", text: "#9A3412" },
  { bg: "#F0FDF4", text: "#166534" },
  { bg: "#EFF6FF", text: "#1E3A8A" },
];

/* ── Student-friendly tag enhancer ── */
const STUDENT_TAG_MAP = {
  // Nightlife & social
  "nightlife": "🎉 Nightlife",
  "reeperbahn": "🎉 Nightlife hub",
  "clubbing": "🎉 Club scene",
  "beer garden": "🍺 Beer gardens",
  "beer gardens": "🍺 Beer gardens",
  "oktoberfest": "🍺 Oktoberfest",
  "wine": "🍷 Wine culture",
  "riesling": "🍷 Wine region",
  // Affordability
  "affordable": "💰 Budget-friendly",
  "budget": "💰 Budget-friendly",
  "low cost": "💰 Cheap to live",
  "expensive": "💸 Pricey",
  // Nature & outdoors
  "alps": "🏔️ Near Alps",
  "alpine": "🏔️ Alpine scenery",
  "mountains": "🏔️ Mountains",
  "lake": "🌊 Lakeside",
  "river": "🌊 Riverside",
  "park": "🌳 Great parks",
  "forest": "🌲 Forest nearby",
  "hiking": "🥾 Hiking",
  // Culture & history
  "castle": "🏰 Castle town",
  "palace": "🏰 Palace",
  "medieval": "🏰 Medieval old town",
  "museum": "🎨 Museums",
  "art": "🎨 Art scene",
  "music": "🎵 Music scene",
  "opera": "🎵 Opera & concerts",
  "unesco": "🏛️ UNESCO site",
  "history": "📜 Historic",
  "beethoven": "🎵 Beethoven's city",
  "mozart": "🎵 Mozart's city",
  // Student life
  "university": "🎓 Uni town",
  "student": "🎓 Student-friendly",
  "campus": "🎓 Campus life",
  "startup": "💻 Startup scene",
  "tech": "💻 Tech hub",
  "engineering": "⚙️ Engineering hub",
  "business school": "📊 Business school",
  // Transport & location
  "train": "🚂 Great train links",
  "transit": "🚇 Great transit",
  "bike": "🚲 Bike-friendly",
  "border": "🗺️ Near borders",
  "close to": "🗺️ Day trip access",
  // Food
  "food": "🍽️ Food scene",
  "market": "🛍️ Markets",
  "coffee": "☕ Café culture",
  // Vibes
  "creative": "🎨 Creative & artsy",
  "cosmopolitan": "🌍 Cosmopolitan",
  "cozy": "🏡 Cozy & small",
  "quiet": "🏡 Peaceful",
  "charming": "✨ Charming",
  "modern": "🏙️ Modern city",
  "vibrant": "⚡ Vibrant",
  "diverse": "🌍 Diverse",
  "port": "⚓ Port city",
  "harbor": "⚓ Harbor city",
  "canal": "⚓ Waterfront",
  "spa": "♨️ Spa town",
  "chocolate": "🍫 Chocolate shops",
  "design": "🎨 Design school",
  "optics": "🔬 Science hub",
  "auto": "🚗 Auto industry",
  "finance": "🏦 Finance hub",
  "peace": "🕊️ City of Peace",
  "baroque": "🏛️ Baroque architecture",
};

function enhanceTag(tag) {
  const lower = tag.toLowerCase();
  // Check for direct matches first
  for (const [key, val] of Object.entries(STUDENT_TAG_MAP)) {
    if (lower.includes(key)) return val;
  }
  // If no match, clean up the tag
  if (lower.length > 30) return tag.split(",")[0].trim(); // just take first part
  return tag;
}

/* ── Main Component ──────────────────────────────────────── */
const DialectTips = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isActive = (path) => location.pathname === path;
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [cityInfo, setCityInfo] = useState(null);
  const [programTips, setProgramTips] = useState([]);
  const [culturalTips, setCulturalTips] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [phraseCategories, setPhraseCategories] = useState([]);
  const [selectedPhraseCategory, setSelectedPhraseCategory] = useState(new Set());
  const [phraseSearch, setPhraseSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(new Set());
  const [selectedPhraseTypes, setSelectedPhraseTypes] = useState(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [bookmarkMap, setBookmarkMap] = useState({});
  const [activeTab, setActiveTab] = useState("programs");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPrograms, setExpandedPrograms] = useState(new Set());
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [errorMsg, setErrorMsg] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [hoveredCity, setHoveredCity] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [countryFilter, setCountryFilter] = useState(new Set());
  const [cityDetailLoading, setCityDetailLoading] = useState(false);
  const [myCitySlugs, setMyCitySlugs] = useState(() => {
    if (!localStorage.getItem("email")) return [];
    try { return JSON.parse(localStorage.getItem("myCities") || "[]"); } catch { return []; }
  });

  const userEmail = localStorage.getItem("email") || "";
  const userName = localStorage.getItem("full_name") || "";

  const speakPhrase = (text, id) => {
    if (!window.speechSynthesis) return;
    if (speakingId === id) { window.speechSynthesis.cancel(); setSpeakingId(null); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.85;
    u.onend = () => setSpeakingId(null);
    u.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(u);
  };

  const handleLogout = () => sharedLogout(navigate);

  useEffect(() => { fetchCities(); fetchPhraseCategories(); if (userEmail) fetchBookmarks(); const p = searchParams.get("city"); if (p) setSelectedCity(p); }, []);
  useEffect(() => { window.scrollTo(0, 0); setTimeout(() => setHeroVisible(true), 100); }, []);

  // Sync user profile from server on mount (ensures myCities are fresh)
  useEffect(() => {
    if (!userEmail) return;
    axios.get(`${BACKEND_URL}/user/profile?email=${encodeURIComponent(userEmail)}`, authHeaders())
      .then(res => {
        const d = res.data;
        if (d.study_abroad_city) localStorage.setItem("study_abroad_city", d.study_abroad_city);
        if (d.full_name) localStorage.setItem("full_name", d.full_name);
        if (Array.isArray(d.saved_cities) && d.saved_cities.length > 0) {
          localStorage.setItem("myCities", JSON.stringify(d.saved_cities));
          setMyCitySlugs(d.saved_cities);
        }
      })
      .catch(() => {});
  }, [userEmail]);
  useEffect(() => {
    if (selectedCity) {
      setCityDetailLoading(true);
      setCityInfo(null);
      setProgramTips([]); setCulturalTips([]); setPhrases([]);
      Promise.all([
        fetchCityData(selectedCity),
        fetchTips(selectedCity),
        fetchPhrases(selectedCity),
      ]).finally(() => setCityDetailLoading(false));
      setSearchParams({ city: selectedCity });
      setExpandedPrograms(new Set());
      setExpandedSections(new Set());
      setActiveTab("programs");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedCity]);

  const fetchCities = async () => {
    setIsLoading(true);
    try { const res = await axios.get(`${BACKEND_URL}/cities/?limit=100`); const data = res.data.data || res.data; setCities(Array.isArray(data) ? data : []); }
    catch (err) { console.error("Failed to load cities:", err); setErrorMsg("Could not load cities."); }
    finally { setIsLoading(false); }
  };
  const fetchCityData = async (slug) => { try { const res = await axios.get(`${BACKEND_URL}/cities/${slug}`); setCityInfo(res.data); } catch { setCityInfo(null); } };
  const fetchTips = async (slug) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/cities/${slug}/tips`);
      const all = res.data.data || res.data || [];
      const tipsArr = Array.isArray(all) ? all : [];
      const programs = [], cultural = [];
      const seenContent = new Set(), seenTitleCat = new Set();
      tipsArr.forEach(t => {
        const nc = (t.content || "").trim().toLowerCase().replace(/\s+/g, " ");
        const ck = nc.slice(0, 150);
        if (seenContent.has(ck)) return;
        const tk = `${(t.title||"").trim().toLowerCase()}|${(t.category||"").trim().toLowerCase()}|${(t.program||"").trim().toLowerCase()}`;
        if (tk.length > 3 && seenTitleCat.has(tk)) return;
        seenContent.add(ck); seenTitleCat.add(tk);
        const cat = (t.category || "").toLowerCase();
        const title = (t.title || "").toLowerCase();
        if (cat === "city life" || title.includes("city life") || title.includes("city overview")) cultural.push(t);
        else if (t.program) programs.push(t);
        else cultural.push(t);
      });
      setProgramTips(programs); setCulturalTips(cultural);
    } catch { setProgramTips([]); setCulturalTips([]); }
  };
  const fetchPhrases = async (slug) => {
    try {
      const baseUrl = `${BACKEND_URL}/phrases/?city_slug=${slug}`;
      // Paginate: fetch in batches of 100 to get ALL phrases
      let allPhrases = [];
      let skip = 0;
      const batchSize = 100;
      let keepGoing = true;
      while (keepGoing) {
        const sep = baseUrl.includes("?") ? "&" : "?";
        const url = `${baseUrl}${sep}limit=${batchSize}&skip=${skip}`;
        const res = await axios.get(url);
        const data = res.data.phrases || res.data.data || res.data;
        const batch = Array.isArray(data) ? data : [];
        allPhrases = [...allPhrases, ...batch];
        if (batch.length < batchSize) keepGoing = false;
        else skip += batchSize;
      }
      /* City dialect pages should only show regional & slang — filter out standard */
      const nonStandard = allPhrases.filter(p => {
        const t = p.phrase_type || (
          (p.tags||[]).some(tag => tag.toLowerCase().includes("slang") || tag.toLowerCase().includes("local_feel")) ? "slang" :
          p.dialect_name ? "regional" : "standard"
        );
        return t !== "standard";
      });
      setPhrases(nonStandard);
    } catch { setPhrases([]); }
  };
  const fetchPhraseCategories = async () => { try { const res = await axios.get(`${BACKEND_URL}/phrases/categories`); setPhraseCategories(res.data.categories || []); } catch { setPhraseCategories([]); } };
  const fetchBookmarks = async () => {
    if (!userEmail) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/phrases/bookmarks`, { ...authHeaders(), params: { user_email: userEmail } });
      const bks = res.data.bookmarks || [];
      setBookmarkedIds(new Set(bks.map(b => b.phrase_id)));
      const map = {}; bks.forEach(b => { map[b.phrase_id] = b._id; }); setBookmarkMap(map);
    } catch (err) { console.error("Failed to fetch bookmarks:", err); }
  };
  const toggleBookmark = async (phraseId) => {
    if (!userEmail) { alert("Please log in to bookmark phrases."); return; }
    try {
      if (bookmarkedIds.has(phraseId)) {
        const bmId = bookmarkMap[phraseId] || phraseId;
        await axios.delete(`${BACKEND_URL}/phrases/bookmarks/${bmId}`, { ...authHeaders(), params: { user_email: userEmail } });
        setBookmarkedIds(prev => { const s = new Set(prev); s.delete(phraseId); return s; });
        setBookmarkMap(prev => { const m = {...prev}; delete m[phraseId]; return m; });
      } else {
        const res = await axios.post(`${BACKEND_URL}/phrases/bookmarks`, { phrase_id: phraseId, user_email: userEmail }, authHeaders());
        setBookmarkedIds(prev => new Set(prev).add(phraseId));
        setBookmarkMap(prev => ({ ...prev, [phraseId]: res.data.bookmark_id }));
      }
    } catch (err) { console.error("Bookmark error:", err?.response?.data || err.message); if (err?.response?.status === 400) fetchBookmarks(); }
  };
  const toggleProgram = (name) => { setExpandedPrograms(prev => { const s = new Set(prev); s.has(name) ? s.delete(name) : s.add(name); return s; }); };
  const toggleSection = (key) => { setExpandedSections(prev => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; }); };

  const filteredPhrases = phrases.filter(p => {
    if (selectedPhraseCategory.size > 0 && !selectedPhraseCategory.has(p.category)) return false;
    if (selectedDifficulty.size > 0 && !selectedDifficulty.has(String(p.difficulty_level))) return false;
    if (selectedPhraseTypes.size > 0) {
      const pType = p.phrase_type || (
        (p.tags||[]).some(t => t.toLowerCase().includes("slang") || t.toLowerCase().includes("local_feel")) ? "slang" :
        p.dialect_name ? "regional" : "standard"
      );
      if (!selectedPhraseTypes.has(pType)) return false;
    }
    if (phraseSearch) { const q = phraseSearch.toLowerCase(); return (p.german_phrase || "").toLowerCase().includes(q) || (p.english_translation || "").toLowerCase().includes(q); }
    return true;
  });

  const currentCityObj = cities.find(c => c.slug === selectedCity);

  /* Flat phrase list — no grouping needed */

  const groupedPrograms = programTips.reduce((acc, tip) => { const prog = tip.program || "Other"; if (!acc[prog]) acc[prog] = []; acc[prog].push(tip); return acc; }, {});
  const DifficultyStars = ({ level }) => (<span style={{ display: "inline-flex", gap: "2px" }}>{[1,2,3,4,5].map(i => (<Star key={i} size={12} fill={i <= level ? "#F59E0B" : "none"} color={i <= level ? "#F59E0B" : "#D1D5DB"} />))}</span>);
  const programCount = Object.keys(groupedPrograms).length;
  const friendlyLabel = (val) => (!val ? "" : val.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()));
  const enColor = (level) => {
    if (!level) return { bg: "#F3F4F6", text: "#6B7280" };
    const l = level.toLowerCase().replace(/[_\s]/g, "");
    if (l === "veryhigh") return { bg: "#D1FAE5", text: "#065F46" };
    if (l === "high") return { bg: "#DBEAFE", text: "#1E40AF" };
    if (l === "moderate") return { bg: "#FEF3C7", text: "#92400E" };
    return { bg: "#FEE2E2", text: "#991B1B" };
  };
  const costColor = (tier) => {
    if (!tier) return { bg: "#F3F4F6", text: "#6B7280" };
    const t = tier.toLowerCase().replace(/[_\s]/g, "");
    if (t === "low") return { bg: "#D1FAE5", text: "#065F46" };
    if (t === "moderate") return { bg: "#DBEAFE", text: "#1E40AF" };
    if (t === "high") return { bg: "#FEF3C7", text: "#92400E" };
    return { bg: "#FEE2E2", text: "#991B1B" };
  };
  const groupedCultural = culturalTips.reduce((acc, tip) => { const cat = tip.category || "General"; if (!acc[cat]) acc[cat] = []; acc[cat].push(tip); return acc; }, {});
  const CULTURAL_ORDER = ["food_drink","food & drink","etiquette","social","transportation","city life","fun","student life","safety","language","shopping"];
  const sortedCulturalGroups = Object.entries(groupedCultural).sort(([a],[b]) => {
    const ia = CULTURAL_ORDER.findIndex(c => a.toLowerCase().includes(c));
    const ib = CULTURAL_ORDER.findIndex(c => b.toLowerCase().includes(c));
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  const culturalCategoryLabel = (cat) => {
    const map = { "food_drink":"🍽️ Food & Drink","food & drink":"🍽️ Food & Drink","etiquette":"🤝 Etiquette & Social Norms","social":"👥 Social Life","transportation":"🚇 Getting Around","city life":"🏙️ City Life & Culture","fun":"🎉 Fun & Recreation","student life":"🎓 Student Life","safety":"🛡️ Safety & Health","language":"💬 Language Tips","shopping":"🛍️ Shopping","general":"📌 General Tips" };
    return map[cat.toLowerCase()] || cat.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  /* ── Filtered cities ── */
  const displayCities = cities.filter(c => {
    if (countryFilter.size > 0 && !countryFilter.has(c.country)) return false;
    if (citySearch) {
      const q = citySearch.toLowerCase();
      return c.name.toLowerCase().includes(q) || (c.country||"").toLowerCase().includes(q) || (c.region||"").toLowerCase().includes(q) || (c.dialect||"").toLowerCase().includes(q);
    }
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const countsByCountry = { Germany: 0, Austria: 0, Switzerland: 0 };
  cities.forEach(c => { if (countsByCountry[c.country] !== undefined) countsByCountry[c.country]++; });

  return (
    <div style={S.page}>
      {/* Header */}
      <header style={S.hdr}><div style={S.hdrIn}>
        <div style={S.hdrL} onClick={() => navigate("/")}>
          <img src={logo} alt="MTB" style={{ height: 72 }} />
          <span style={S.brand}>MyTranslationBuddy</span>
        </div>
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

      {/* ── Explore Header — integrated into page background ── */}
      {!selectedCity && (
        <div style={{maxWidth:1280,margin:"0 auto",padding:"1.1rem 2rem 0",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(10px)",
          transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"
        }}>
          {/* Single-row: search + country filters */}
          <div style={{display:"flex",gap:"0.65rem",alignItems:"center",flexWrap:"wrap",minHeight:44}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem",flex:"1 1 280px",padding:"0.6rem 1rem",borderRadius:"0.75rem",border:"1px solid #E5E7EB",backgroundColor:"rgba(255,255,255,0.85)",backdropFilter:"blur(6px)",transition:"border-color 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
              <Search size={16} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search by city, country, or region..."
                value={citySearch}
                onChange={e => setCitySearch(e.target.value)}
                style={{flex:1,border:"none",outline:"none",fontSize:"0.85rem",backgroundColor:"transparent",color:"#111827"}}
              />
              {citySearch && (
                <button onClick={() => setCitySearch("")} style={{background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",padding:0,display:"flex"}}>
                  <X size={14} />
                </button>
              )}
            </div>
            {[
              {flag:"🇩🇪",label:"Germany",value:"Germany",count:countsByCountry.Germany||0},
              {flag:"🇦🇹",label:"Austria",value:"Austria",count:countsByCountry.Austria||0},
              {flag:"🇨🇭",label:"Switzerland",value:"Switzerland",count:countsByCountry.Switzerland||0},
            ].map(c=>{
              const isOn = countryFilter.has(c.value);
              return (
              <button key={c.value} onClick={()=>setCountryFilter(prev=>{const s=new Set(prev);s.has(c.value)?s.delete(c.value):s.add(c.value);return s;})} style={{
                display:"flex",alignItems:"center",gap:"0.35rem",padding:"0.5rem 0.95rem",borderRadius:"0.65rem",
                background: isOn ? "#0021A5" : "rgba(255,255,255,0.85)",
                border: isOn ? "1.5px solid #0021A5" : "1.5px solid #E5E7EB",
                color: isOn ? "#fff" : "#374151",cursor:"pointer",fontSize:"0.8rem",fontWeight:600,transition:"all 0.2s",
                boxShadow: isOn ? "0 2px 8px rgba(0,33,165,0.2)" : "0 1px 2px rgba(0,0,0,0.04)",
                backdropFilter:"blur(6px)"
              }}>{c.flag} {c.label}</button>
            );})}
            {countryFilter.size > 0 && (
              <button onClick={()=>setCountryFilter(new Set())} style={{
                display:"flex",alignItems:"center",gap:"0.35rem",padding:"0.5rem 0.95rem",borderRadius:"0.65rem",
                background:"rgba(220,38,38,0.08)",
                border:"1.5px solid rgba(220,38,38,0.35)",
                color:"#DC2626",cursor:"pointer",fontSize:"0.8rem",fontWeight:600,
                transition:"opacity 0.2s, transform 0.2s",
                boxShadow:"0 1px 2px rgba(220,38,38,0.06)",
                backdropFilter:"blur(6px)",
                animation:"fadeIn 0.15s ease-out"
              }}>
                <X size={13}/> Clear
              </button>
            )}
          </div>
        </div>
      )}

      <main style={S.main}>
        {/* ── City Grid View ── */}
        {!selectedCity && (
          <div>
            {/* My Cities quick-access */}
            {(() => {
              const myCityObjects = cities.filter(c => myCitySlugs.includes(c.slug));
              if (myCityObjects.length === 0) return null;
              return (
                <div style={{marginBottom:"1.5rem",padding:"1rem 1.15rem",background:"linear-gradient(135deg,#EFF6FF,#F0F4FF)",borderRadius:"1rem",border:"1px solid #BFDBFE"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginBottom:"0.6rem"}}>
                    <Star size={14} color="#0021A5" fill="#0021A5"/>
                    <span style={{fontSize:"0.78rem",fontWeight:700,color:"#0021A5"}}>My Cities</span>
                    <span style={{fontSize:"0.65rem",fontWeight:500,color:"#6B7280"}}>— quick access to your saved destinations</span>
                  </div>
                  <div style={{display:"flex",gap:"0.45rem",flexWrap:"wrap"}}>
                    {myCityObjects.map(c => (
                      <button key={c.slug} onClick={() => { setSelectedCity(c.slug); setCitySearch(""); setCountryFilter(new Set()); }}
                        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 4px 12px rgba(0,33,165,0.15)";}}
                        onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.06)";}}
                        style={{display:"inline-flex",alignItems:"center",gap:"0.35rem",padding:"0.45rem 0.85rem",borderRadius:"0.6rem",border:"1px solid #BFDBFE",backgroundColor:"#fff",color:"#0021A5",cursor:"pointer",fontSize:"0.78rem",fontWeight:600,transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
                        {COUNTRY_FLAG[c.country] || "📍"} {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div style={S.toolbar}>
              <div style={S.toolbarLeft}>
                <h2 style={S.sectionTitle}>
                  <Compass size={20} color="#0021A5" />
                  {countryFilter.size === 1 ? `${COUNTRY_FLAG[[...countryFilter][0]]} ${[...countryFilter][0]}` : countryFilter.size > 1 ? `${[...countryFilter].map(c=>COUNTRY_FLAG[c]).join(" ")} ${countryFilter.size} Countries` : "All Destinations"}
                  <span style={{fontSize:"0.82rem",fontWeight:500,color:"#6B7280",marginLeft:"0.5rem"}}>({displayCities.length})</span>
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div style={{textAlign:"center",padding:"4rem"}}>
                <div style={S.spinner} />
                <p style={{color:"#6B7280",fontSize:"0.95rem",marginTop:"1rem"}}>Loading destinations...</p>
              </div>
            ) : displayCities.length === 0 ? (
              <div style={{textAlign:"center",padding:"4rem"}}>
                <MapPin size={48} color="#D1D5DB" />
                <p style={{color:"#6B7280",fontSize:"0.95rem",marginTop:"1rem"}}>No cities match your search.</p>
                <button onClick={() => { setCitySearch(""); setCountryFilter(new Set()); }} style={{display:"inline-flex",alignItems:"center",gap:"0.35rem",padding:"0.5rem 0.95rem",borderRadius:"0.65rem",background:"rgba(220,38,38,0.08)",border:"1.5px solid rgba(220,38,38,0.35)",color:"#DC2626",cursor:"pointer",fontSize:"0.8rem",fontWeight:600,transition:"all 0.2s",marginTop:"0.75rem"}}>
                  <X size={13}/> Clear filters
                </button>
              </div>
            ) : (
              <div style={S.cityGrid}>
                {displayCities.map(city => {
                  const img = CITY_IMAGES[city.slug] || FALLBACK_IMG;
                  const isHover = hoveredCity === city.slug;
                  const costTier = city.cost_of_living_tier;
                  const tagline = city.tagline || city.description || "";
                  const shortTagline = tagline.length > 55 ? tagline.slice(0,52) + "…" : tagline;
                  const engLevel = city.english_friendliness;
                  const pop = city.population;
                  const popLabel = pop ? (pop >= 1000000 ? `${(pop/1000000).toFixed(1)}M` : `${Math.round(pop/1000)}K`) : null;
                  return (
                    <div key={city.slug} onClick={() => { setSelectedCity(city.slug); setCitySearch(""); setCountryFilter(new Set()); }}
                      onMouseEnter={() => setHoveredCity(city.slug)} onMouseLeave={() => setHoveredCity(null)}
                      style={{
                        ...S.cityCard,
                        transform: isHover ? "translateY(-4px)" : "none",
                        boxShadow: isHover ? "0 12px 32px rgba(0,33,165,0.13)" : "0 1px 4px rgba(0,0,0,0.04)",
                      }}>
                      <div style={{...S.cityCardImg, backgroundImage: `url(${img})`}}>
                        <div style={S.cityCardGrad} />
                        <span style={S.cityCardFlag}>{COUNTRY_FLAG[city.country] || "\u{1F30D}"}</span>
                      </div>
                      <div style={S.cityCardBody}>
                        <h3 style={S.cityCardName}>{city.name}</h3>
                        <p style={S.cityCardMeta}>{city.region || city.country}{city.dialect ? ` · ${city.dialect}` : ""}</p>
                        {shortTagline && <p style={{fontSize:"0.72rem",color:"#6B7280",margin:"0.25rem 0 0",lineHeight:1.35,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{shortTagline}</p>}
                        {/* Compact info row — fits reliably */}
                        <div style={{display:"flex",gap:"0.3rem",marginTop:"0.45rem",flexWrap:"wrap"}}>
                          {costTier && (
                            <span style={{fontSize:"0.6rem",fontWeight:600,padding:"0.12rem 0.45rem",borderRadius:9999,backgroundColor:costColor(costTier).bg,color:costColor(costTier).text,whiteSpace:"nowrap"}}>
                              {costTier.toLowerCase() === "low" ? "💰 Budget" : costTier.toLowerCase() === "moderate" ? "💵 Moderate" : costTier.toLowerCase() === "high" ? "💸 Pricey" : friendlyLabel(costTier)}
                            </span>
                          )}
                          {engLevel && (
                            <span style={{fontSize:"0.6rem",fontWeight:600,padding:"0.12rem 0.45rem",borderRadius:9999,backgroundColor:enColor(engLevel).bg,color:enColor(engLevel).text,whiteSpace:"nowrap"}}>
                              🗣️ Eng: {friendlyLabel(engLevel).replace("Very ","").replace("High","Good").replace("Moderate","OK").replace("Low","Limited")}
                            </span>
                          )}
                          {popLabel && (
                            <span style={{fontSize:"0.6rem",fontWeight:600,padding:"0.12rem 0.45rem",borderRadius:9999,backgroundColor:"#F3F4F6",color:"#6B7280",whiteSpace:"nowrap"}}>
                              👥 {popLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Back button */}
        {selectedCity && (
          <button onClick={() => { setSelectedCity(""); setCityInfo(null); setProgramTips([]); setCulturalTips([]); setPhrases([]); setSearchParams({}); }} style={S.backBtn}
            onMouseEnter={e=>{e.currentTarget.style.color="#0021A5";e.currentTarget.style.gap="0.55rem";}}
            onMouseLeave={e=>{e.currentTarget.style.color="#6B7280";e.currentTarget.style.gap="0.3rem";}}>
            <ArrowLeft size={15} /> All cities
          </button>
        )}

        {/* Loading state for city detail */}
        {selectedCity && cityDetailLoading && (
          <div style={{textAlign:"center",padding:"5rem 2rem"}}>
            <div style={S.spinner} />
            <p style={{color:"#6B7280",fontSize:"0.95rem",marginTop:"1rem"}}>Loading city details...</p>
          </div>
        )}

        {/* City Hero Banner */}
        {selectedCity && !cityDetailLoading && cityInfo && (
          <div style={{...S.cityBanner, backgroundImage: `linear-gradient(135deg, rgba(0,33,165,0.82), rgba(250,70,22,0.55)), url(${CITY_IMAGES[selectedCity] || FALLBACK_IMG})`, backgroundSize:"cover", backgroundPosition:"center"}}>
            <div style={{position:"relative",zIndex:2,width:"100%"}}>
              <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>{COUNTRY_FLAG[cityInfo.country] || "\u{1F30D}"}</div>
              <h1 style={S.bannerTitle}>{cityInfo.name}</h1>
              <p style={S.bannerTagline}>{cityInfo.tagline || cityInfo.description}</p>
              <div style={S.bannerBadges}>
                {cityInfo.dialect && <span style={S.bannerBadge}><Languages size={12}/> {cityInfo.dialect}</span>}
                {cityInfo.country && <span style={S.bannerBadge}>{COUNTRY_FLAG[cityInfo.country]} {cityInfo.country}</span>}
                {cityInfo.english_friendliness && (
                  <span style={{...S.bannerBadge, backgroundColor: enColor(cityInfo.english_friendliness).bg, color: enColor(cityInfo.english_friendliness).text}}>
                    English: {friendlyLabel(cityInfo.english_friendliness)}
                  </span>
                )}
                {cityInfo.cost_of_living_tier && (
                  <span style={{...S.bannerBadge, backgroundColor: costColor(cityInfo.cost_of_living_tier).bg, color: costColor(cityInfo.cost_of_living_tier).text}}>
                    <DollarSign size={12}/> {friendlyLabel(cityInfo.cost_of_living_tier)}
                  </span>
                )}
                {cityInfo.population && (
                  <span style={S.bannerBadge}><Users size={12}/> {cityInfo.population >= 1000000 ? `${(cityInfo.population/1000000).toFixed(1)}M` : `${Math.round(cityInfo.population/1000)}K`}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Info Cards — between banner and tabs */}
        {selectedCity && !cityDetailLoading && cityInfo && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"0.75rem",marginBottom:"1.25rem"}}>
            {cityInfo.climate && (
              <div style={S.quickCard}>
                <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginBottom:"0.35rem"}}>
                  <div style={{width:28,height:28,borderRadius:"0.5rem",background:"#EEF2FF",display:"flex",alignItems:"center",justifyContent:"center"}}><Sparkles size={14} color="#4338CA"/></div>
                  <span style={{fontSize:"0.75rem",fontWeight:700,color:"#374151"}}>Climate</span>
                </div>
                <p style={{fontSize:"0.72rem",color:"#6B7280",margin:0,lineHeight:1.45}}>
                  ☀️ {cityInfo.climate.summers} · ❄️ {cityInfo.climate.winters}
                </p>
              </div>
            )}
            {cityInfo.international_airport && (
              <div style={S.quickCard}>
                <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginBottom:"0.35rem"}}>
                  <div style={{width:28,height:28,borderRadius:"0.5rem",background:"#FFF7ED",display:"flex",alignItems:"center",justifyContent:"center"}}><MapPin size={14} color="#C2410C"/></div>
                  <span style={{fontSize:"0.75rem",fontWeight:700,color:"#374151"}}>Airport</span>
                </div>
                <p style={{fontSize:"0.72rem",color:"#6B7280",margin:0,lineHeight:1.45}}>
                  {cityInfo.international_airport}{cityInfo.airport_distance_km ? ` · ${cityInfo.airport_distance_km}km` : ""}
                </p>
              </div>
            )}
            {cityInfo.industries && cityInfo.industries.length > 0 && (
              <div style={S.quickCard}>
                <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginBottom:"0.35rem"}}>
                  <div style={{width:28,height:28,borderRadius:"0.5rem",background:"#F0FDF4",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={14} color="#16A34A"/></div>
                  <span style={{fontSize:"0.75rem",fontWeight:700,color:"#374151"}}>Industries</span>
                </div>
                <p style={{fontSize:"0.72rem",color:"#6B7280",margin:0,lineHeight:1.45}}>
                  {cityInfo.industries.slice(0,3).join(", ")}
                </p>
              </div>
            )}
            {cityInfo.timezone && (
              <div style={S.quickCard}>
                <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginBottom:"0.35rem"}}>
                  <div style={{width:28,height:28,borderRadius:"0.5rem",background:"#FDF4FF",display:"flex",alignItems:"center",justifyContent:"center"}}><Globe size={14} color="#A855F7"/></div>
                  <span style={{fontSize:"0.75rem",fontWeight:700,color:"#374151"}}>Timezone</span>
                </div>
                <p style={{fontSize:"0.72rem",color:"#6B7280",margin:0,lineHeight:1.45}}>
                  {cityInfo.timezone.replace("Europe/","")} · {cityInfo.currency || "EUR"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        {selectedCity && !cityDetailLoading && (
          <div style={S.tabs}>
            <button onClick={() => setActiveTab("programs")} style={{...S.tab, ...(activeTab === "programs" ? S.tabActive : {})}}><BookOpen size={16} /> Programs{programCount > 0 ? ` (${programCount})` : ""}</button>
            <button onClick={() => setActiveTab("cultural")} style={{...S.tab, ...(activeTab === "cultural" ? S.tabActive : {})}}><Globe size={16} /> Cultural Tips{culturalTips.length > 0 ? ` (${culturalTips.length})` : ""}</button>
            <button onClick={() => setActiveTab("phrases")} style={{...S.tab, ...(activeTab === "phrases" ? S.tabActive : {})}}><MessageCircle size={16} /> Phrases{phrases.length > 0 ? ` (${phrases.length})` : ""}</button>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === "programs" && selectedCity && !cityDetailLoading && (
          <div style={S.card}>
            <h2 style={S.cardTitle}><BookOpen size={20} /> Study Programs in {currentCityObj?.name || cityInfo?.name}</h2>
            {programCount === 0 ? (
              <div style={{textAlign:"center",padding:"3rem 2rem"}}>
                <GraduationCap size={44} color="#D1D5DB"/>
                <p style={{fontSize:"1rem",fontWeight:600,color:"#374151",margin:"1rem 0 0.25rem"}}>No program info yet</p>
                <p style={{fontSize:"0.82rem",color:"#6B7280"}}>Program details for this city haven't been added yet.</p>
              </div>
            ) : (
              Object.entries(groupedPrograms).map(([progName, tips]) => {
                const isExpanded = expandedPrograms.has(progName);
                const sections = groupTipsBySection(tips);
                const overviewTip = tips.find(t => categorizeTip(t) === "overview");
                return (
                  <div key={progName} style={S.programCard}>
                    <div style={S.programHeader} onClick={() => toggleProgram(progName)}>
                      <div style={{flex:1}}>
                        <h3 style={S.programName}>{progName}</h3>
                        {overviewTip && !isExpanded && (<p style={S.programSummary}>{overviewTip.short_description || overviewTip.title}</p>)}
                        <div style={S.programMeta}>
                          <span style={S.programBadge}>{tips.length} detail{tips.length !== 1 ? "s" : ""}</span>
                          <span style={S.programBadge}>{sections.length} section{sections.length !== 1 ? "s" : ""}</span>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp size={20} color="#6B7280" /> : <ChevronDown size={20} color="#6B7280" />}
                    </div>
                    {isExpanded && (
                      <div style={S.programBody}>
                        {sections.map(([sectionName, sectionTips]) => {
                          const sectionKey = `${progName}::${sectionName}`;
                          const secExpanded = expandedSections.has(sectionKey);
                          const SIcon = SECTION_ICONS[sectionName] || Info;
                          const label = SECTION_LABELS[sectionName] || sectionName;
                          return (
                            <div key={sectionKey} style={S.sectionCard}>
                              <div style={S.sectionHeader} onClick={() => toggleSection(sectionKey)}>
                                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                                  <SIcon size={16} color="#0021A5" />
                                  <span style={S.secLabel}>{label}</span>
                                  <span style={S.sectionCount}>{sectionTips.length}</span>
                                </div>
                                {secExpanded ? <ChevronUp size={16} color="#9CA3AF" /> : <ChevronDown size={16} color="#9CA3AF" />}
                              </div>
                              {secExpanded && (
                                <div style={S.sectionContent}>
                                  {sectionTips.map((tip, idx) => (
                                    <div key={idx} style={S.tipItem}>
                                      <h4 style={S.tipItemTitle}>{tip.title}</h4>
                                      <p style={S.tipItemContent}>{tip.content}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Cultural Tips Tab */}
        {activeTab === "cultural" && selectedCity && !cityDetailLoading && (
          <div style={S.card}>
            <h2 style={S.cardTitle}><Globe size={20} /> Cultural Tips for {currentCityObj?.name || cityInfo?.name}</h2>
            {culturalTips.length === 0 ? (
              <div style={{textAlign:"center",padding:"3rem 2rem"}}>
                <Globe size={44} color="#D1D5DB"/>
                <p style={{fontSize:"1rem",fontWeight:600,color:"#374151",margin:"1rem 0 0.25rem"}}>No cultural tips yet</p>
                <p style={{fontSize:"0.82rem",color:"#6B7280"}}>Cultural tips for this city haven't been added yet.</p>
              </div>
            ) : (
              sortedCulturalGroups.map(([category, tips]) => (
                <div key={category} style={S.culturalGroup}>
                  <h3 style={S.culturalGroupTitle}>{culturalCategoryLabel(category)}</h3>
                  <div style={S.tipGrid}>
                    {tips.map((tip, idx) => {
                      const key = `cult-${category}-${idx}`;
                      const expanded = expandedSections.has(key);
                      return (
                        <div key={idx} style={S.tipCard}>
                          <div style={S.tipHeader} onClick={() => toggleSection(key)}>
                            <div>
                              <h4 style={S.tipTitle}>{tip.title}</h4>
                              {tip.short_description && <p style={S.tipShort}>{tip.short_description}</p>}
                            </div>
                            {expanded ? <ChevronUp size={18} color="#6B7280" /> : <ChevronDown size={18} color="#6B7280" />}
                          </div>
                          {expanded && <p style={S.tipContent}>{tip.content}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Phrases Tab — redesigned */}
        {activeTab === "phrases" && selectedCity && !cityDetailLoading && (
          <div style={{backgroundColor:"#fff",borderRadius:"1.25rem",border:"1px solid #E5E7EB",overflow:"visible",marginBottom:"1.5rem",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
            {/* Sticky filter bar */}
            <div style={{padding:"1.25rem 1.75rem",borderBottom:"1px solid #E5E7EB",background:"#FAFBFC",position:"sticky",top:62,zIndex:50,borderRadius:"1.25rem 1.25rem 0 0"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:"0.5rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                  <div style={{width:36,height:36,borderRadius:"0.6rem",background:"linear-gradient(135deg,#0021A5,#003087)",display:"flex",alignItems:"center",justifyContent:"center"}}><MessageCircle size={16} color="#fff"/></div>
                  <div>
                    <h2 style={{fontSize:"1.1rem",fontWeight:700,color:"#111827",margin:0}}>
                      {`Phrases for ${currentCityObj?.name || cityInfo?.name || selectedCity}`}
                    </h2>
                    <p style={{fontSize:"0.72rem",color:"#6B7280",margin:0}}>{filteredPhrases.length} of {phrases.length} phrases</p>
                  </div>
                </div>
              </div>
              {/* Filter controls */}
              <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.4rem",flex:"1 1 200px",padding:"0.5rem 0.85rem",borderRadius:"0.6rem",border:"1px solid #D1D5DB",backgroundColor:"#fff",transition:"border-color 0.2s"}}>
                  <Search size={14} color="#9CA3AF"/>
                  <input type="text" placeholder="Search German or English..." value={phraseSearch} onChange={e=>setPhraseSearch(e.target.value)} style={{border:"none",outline:"none",flex:1,backgroundColor:"transparent",fontSize:"0.82rem",color:"#111827"}}/>
                  {phraseSearch && <button onClick={()=>setPhraseSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",padding:0,display:"flex"}}><X size={13}/></button>}
                </div>
                {/* Type toggle pills — Regional & Local only (no Standard on city pages) */}
                <div style={{display:"flex",gap:"0.3rem",alignItems:"center"}}>
                  {[
                    {value:"regional",emoji:"🗺️",label:"Regional Dialect",bg:"#F5F3FF",activeBg:"#8B5CF6",border:"#C4B5FD"},
                    {value:"slang",emoji:"🗣️",label:"Local Slang",bg:"#FEF2F2",activeBg:"#EF4444",border:"#FCA5A5"},
                  ].map(t=>{
                    const isOn = selectedPhraseTypes.has(t.value);
                    return (
                      <button key={t.value} onClick={()=>setSelectedPhraseTypes(prev=>{const s=new Set(prev);s.has(t.value)?s.delete(t.value):s.add(t.value);return s;})}
                        style={{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.42rem 0.85rem",borderRadius:9999,
                          border:`1.5px solid ${isOn?t.activeBg:t.border}`,
                          background:isOn?t.activeBg:t.bg,
                          color:isOn?"#fff":t.activeBg,
                          cursor:"pointer",fontSize:"0.78rem",fontWeight:isOn?700:600,transition:"all 0.2s",
                          boxShadow:isOn?`0 2px 8px ${t.activeBg}33`:"none",
                          transform:isOn?"scale(1.03)":"none"}}>
                        {t.emoji} {t.label}
                      </button>
                    );
                  })}
                </div>
                {(phraseSearch || selectedPhraseCategory.size > 0 || selectedDifficulty.size > 0 || selectedPhraseTypes.size > 0) && (
                  <button onClick={()=>{setPhraseSearch("");setSelectedPhraseCategory(new Set());setSelectedDifficulty(new Set());setSelectedPhraseTypes(new Set());}} style={{display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.5rem 0.85rem",border:"1px solid #FCA5A5",borderRadius:"0.6rem",background:"#FEF2F2",color:"#DC2626",cursor:"pointer",fontSize:"0.78rem",fontWeight:600}}>
                    <X size={12}/> Clear
                  </button>
                )}
              </div>

              {/* Category multi-select pills */}
              {phraseCategories.length > 0 && (
                <div style={{marginTop:"0.75rem"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.35rem",marginBottom:"0.4rem"}}>
                    <span style={{fontSize:"0.68rem",fontWeight:600,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.04em"}}>Category</span>
                    {selectedPhraseCategory.size > 0 && (
                      <button onClick={()=>setSelectedPhraseCategory(new Set())} style={{display:"inline-flex",alignItems:"center",gap:"0.15rem",padding:"0.1rem 0.4rem",borderRadius:9999,border:"1px solid #FCA5A5",fontSize:"0.6rem",fontWeight:600,cursor:"pointer",backgroundColor:"#FEF2F2",color:"#DC2626",lineHeight:1.4}}>
                        <X size={9}/> Clear
                      </button>
                    )}
                  </div>
                  <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
                    {phraseCategories.map(cat=>{
                      const isOn = selectedPhraseCategory.has(cat.name);
                      return (
                        <button key={cat.name} onClick={()=>setSelectedPhraseCategory(prev=>{const s=new Set(prev);s.has(cat.name)?s.delete(cat.name):s.add(cat.name);return s;})}
                          style={{display:"inline-flex",alignItems:"center",gap:"0.25rem",padding:"0.32rem 0.7rem",borderRadius:9999,
                            border:isOn?"1.5px solid #0021A5":"1px solid #E5E7EB",
                            backgroundColor:isOn?"#EFF6FF":"#fff",
                            color:isOn?"#0021A5":"#4B5563",
                            cursor:"pointer",fontSize:"0.72rem",fontWeight:isOn?700:500,transition:"all 0.15s",
                            boxShadow:isOn?"0 1px 4px rgba(0,33,165,0.12)":"none",
                            textTransform:"capitalize"}}>
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Difficulty multi-select pills */}
              <div style={{marginTop:"0.6rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.35rem",marginBottom:"0.4rem"}}>
                  <span style={{fontSize:"0.68rem",fontWeight:600,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.04em"}}>Difficulty</span>
                  {selectedDifficulty.size > 0 && (
                    <button onClick={()=>setSelectedDifficulty(new Set())} style={{display:"inline-flex",alignItems:"center",gap:"0.15rem",padding:"0.1rem 0.4rem",borderRadius:9999,border:"1px solid #FCA5A5",fontSize:"0.6rem",fontWeight:600,cursor:"pointer",backgroundColor:"#FEF2F2",color:"#DC2626",lineHeight:1.4}}>
                      <X size={9}/> Clear
                    </button>
                  )}
                </div>
                <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
                  {[
                    {value:"1",label:"Beginner",color:"#059669",bg:"#D1FAE5",activeBg:"#059669"},
                    {value:"2",label:"Elementary",color:"#0D9488",bg:"#CCFBF1",activeBg:"#0D9488"},
                    {value:"3",label:"Intermediate",color:"#2563EB",bg:"#DBEAFE",activeBg:"#2563EB"},
                    {value:"4",label:"Advanced",color:"#7C3AED",bg:"#F3E8FF",activeBg:"#7C3AED"},
                    {value:"5",label:"Expert",color:"#DC2626",bg:"#FEE2E2",activeBg:"#DC2626"},
                  ].map(d=>{
                    const isOn = selectedDifficulty.has(d.value);
                    return (
                      <button key={d.value} onClick={()=>setSelectedDifficulty(prev=>{const s=new Set(prev);s.has(d.value)?s.delete(d.value):s.add(d.value);return s;})}
                        style={{display:"inline-flex",alignItems:"center",gap:"0.2rem",padding:"0.32rem 0.7rem",borderRadius:9999,
                          border:isOn?`1.5px solid ${d.activeBg}`:`1px solid ${d.bg}`,
                          backgroundColor:isOn?d.activeBg:d.bg,
                          color:isOn?"#fff":d.color,
                          cursor:"pointer",fontSize:"0.72rem",fontWeight:isOn?700:600,transition:"all 0.15s",
                          boxShadow:isOn?`0 1px 4px ${d.activeBg}33`:"none"}}>
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Phrase list — flat */}
            <div style={{padding:"1.25rem 1.75rem"}}>
              {filteredPhrases.length === 0 ? (
                <div style={{textAlign:"center",padding:"3rem 2rem"}}>
                  <Languages size={40} color="#D1D5DB"/>
                  <p style={{fontSize:"1rem",fontWeight:600,color:"#374151",margin:"1rem 0 0.25rem"}}>No phrases match your filters</p>
                  <p style={{fontSize:"0.82rem",color:"#6B7280"}}>Try adjusting the search or category filter.</p>
                </div>
              ) : (
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"0.85rem"}}>
                  {filteredPhrases.map(phrase => {
                    const isSlang = phrase.phrase_type === "slang" || (!phrase.phrase_type && (phrase.tags||[]).some(t => t.toLowerCase().includes("slang") || t.toLowerCase().includes("local_feel")));
                    const isDialect = phrase.phrase_type === "regional" || (!phrase.phrase_type && !isSlang && !!phrase.dialect_name);
                    const typeColor = isSlang ? {bg:"#FEE2E2",text:"#991B1B",label:"🗣️ Local Slang"} : isDialect ? {bg:"#F3E8FF",text:"#6B21A8",label:"🗺️ Regional Dialect"} : {bg:"#D1FAE5",text:"#065F46",label:"📖 Standard"};
                    const cardBorder = isSlang ? "rgba(239,68,68,0.2)" : isDialect ? "rgba(139,92,246,0.2)" : "#E5E7EB";
                    const accentStripe = isSlang ? "#EF4444" : isDialect ? "#8B5CF6" : "#0021A5";
                    return (
                      <div key={phrase._id} style={{position:"relative",backgroundColor:"#fff",borderRadius:"0.85rem",border:`1px solid ${cardBorder}`,overflow:"hidden",transition:"all 0.25s",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}
                        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.08)";}}
                        onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)";}}>
                        {/* Accent stripe */}
                        <div style={{height:3,background:accentStripe}}/>
                        <div style={{padding:"1rem 1.15rem"}}>
                          {/* Top row: type badge + actions */}
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.65rem"}}>
                            <div style={{display:"flex",gap:"0.35rem",flexWrap:"wrap",alignItems:"center"}}>
                              <span style={{fontSize:"0.62rem",fontWeight:700,backgroundColor:typeColor.bg,color:typeColor.text,padding:"0.15rem 0.55rem",borderRadius:9999}}>{typeColor.label}</span>
                              <span style={{fontSize:"0.62rem",fontWeight:600,backgroundColor:"#DBEAFE",color:"#1E3A8A",padding:"0.15rem 0.55rem",borderRadius:9999,textTransform:"capitalize"}}>{phrase.category}</span>
                              {phrase.difficulty_level && <span style={{display:"inline-flex",gap:1,alignItems:"center"}}>{[1,2,3,4,5].map(i=>(<Star key={i} size={9} fill={i<=phrase.difficulty_level?"#F59E0B":"none"} color={i<=phrase.difficulty_level?"#F59E0B":"#D1D5DB"}/>))}</span>}
                            </div>
                            <div style={{display:"flex",gap:"0.25rem",alignItems:"center",flexShrink:0}}>
                              <button onClick={()=>speakPhrase(phrase.german_phrase,phrase._id)} style={{width:30,height:30,borderRadius:"50%",border:"1px solid #E5E7EB",background:speakingId===phrase._id?"#DBEAFE":"#F9FAFB",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:speakingId===phrase._id?"#2563EB":"#6B7280",transition:"all 0.15s"}} title="Listen">
                                <Volume2 size={13}/>
                              </button>
                              <button onClick={()=>toggleBookmark(phrase._id)} style={{width:30,height:30,borderRadius:"50%",border:"1px solid #E5E7EB",background:bookmarkedIds.has(phrase._id)?"#EFF6FF":"#F9FAFB",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}} title={bookmarkedIds.has(phrase._id)?"Saved":"Save"}>
                                {bookmarkedIds.has(phrase._id)?<BookmarkCheck size={13} color="#2563EB" fill="#2563EB"/>:<Bookmark size={13} color="#9CA3AF"/>}
                              </button>
                            </div>
                          </div>
                          {/* German phrase */}
                          <p style={{fontSize:"1.05rem",fontWeight:700,color:"#0021A5",margin:"0 0 0.15rem",lineHeight:1.3}}>{phrase.german_phrase}</p>
                          {phrase.pronunciation && <p style={{fontSize:"0.72rem",color:"#6B7280",fontStyle:"italic",margin:"0 0 0.25rem"}}>[{phrase.pronunciation}]</p>}
                          <p style={{fontSize:"0.88rem",color:"#374151",margin:"0 0 0.5rem",lineHeight:1.4}}>{phrase.english_translation}</p>
                          {/* Dialect / register info */}
                          <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:phrase.usage_context||phrase.example_sentence?"0.5rem":"0"}}>
                            {phrase.dialect_name && <span style={{fontSize:"0.6rem",fontWeight:600,backgroundColor:"#F3E8FF",color:"#7C3AED",padding:"0.12rem 0.45rem",borderRadius:9999}}>🗺️ {phrase.dialect_name}</span>}
                            {phrase.register && <span style={{fontSize:"0.6rem",fontWeight:500,backgroundColor:"#FEF3C7",color:"#92400E",padding:"0.12rem 0.45rem",borderRadius:9999,textTransform:"capitalize"}}>{phrase.register}</span>}
                          </div>
                          {/* Context */}
                          {phrase.usage_context && <p style={{fontSize:"0.75rem",color:"#6B7280",margin:"0 0 0.3rem",lineHeight:1.45,display:"flex",alignItems:"flex-start",gap:"0.3rem"}}><Info size={11} color="#9CA3AF" style={{flexShrink:0,marginTop:2}}/>{phrase.usage_context}</p>}
                          {phrase.example_sentence && <p style={{fontSize:"0.75rem",color:"#4B5563",fontStyle:"italic",margin:"0 0 0.2rem",lineHeight:1.4,paddingLeft:"0.5rem",borderLeft:"2px solid #DBEAFE"}}>&ldquo;{phrase.example_sentence}&rdquo;</p>}
                          {phrase.cultural_note && <p style={{fontSize:"0.72rem",color:"#92400E",backgroundColor:"#FFFBEB",padding:"0.35rem 0.55rem",borderRadius:"0.4rem",margin:"0.4rem 0 0 0",lineHeight:1.4}}>💡 {phrase.cultural_note}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <footer style={S.foot}><p>&copy; 2026 MyTranslationBuddy &mdash; Built by Gators, for Gators</p></footer>
    </div>
  );
};

/* ══════════════════════════ STYLES ══════════════════════════ */
const S = {
  page:{minHeight:"100vh",backgroundColor:"#F8FAFC",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif"},
  hdr:{backgroundColor:"rgba(255,255,255,0.92)",borderBottom:"1px solid rgba(229,231,235,0.5)",position:"sticky",top:0,zIndex:1000,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},
  hdrIn:{maxWidth:1280,margin:"0 auto",padding:"0.2rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center"},
  hdrL:{display:"flex",alignItems:"center",gap:"0.6rem",cursor:"pointer"},
  brand:{fontSize:"1.05rem",fontWeight:800,color:"#0021A5",letterSpacing:"-0.01em"},
  nav:{display:"flex",gap:"0.15rem",alignItems:"center",flexWrap:"wrap",background:"#F3F4F6",borderRadius:"0.65rem",padding:"0.2rem"},
  nb:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 0.85rem",border:"none",borderRadius:"0.5rem",backgroundColor:"transparent",color:"#6B7280",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,transition:"all 0.2s"},
  nbActive:{backgroundColor:"#fff",fontWeight:700,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",color:"#0021A5"},
  nbA:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 1.1rem",border:"none",borderRadius:"0.5rem",background:"linear-gradient(135deg,#FA4616,#FF6B35)",color:"#fff",cursor:"pointer",fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.02em",boxShadow:"0 2px 8px rgba(250,70,22,0.25)",marginLeft:"0.35rem"},
  hero:{background:"linear-gradient(160deg,#1a0a00 0%,#C23A00 40%,#FA4616 70%,#FF6B35 100%)",padding:"5rem 2rem 4rem",textAlign:"center",position:"relative",overflow:"hidden"},
  heroTitle:{fontSize:"2.75rem",fontWeight:800,color:"#fff",margin:"0 0 0.75rem 0",letterSpacing:"-0.03em",lineHeight:1.15},
  heroHL:{background:"linear-gradient(90deg,#FA4616,#FFB347)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  heroSub:{fontSize:"1.05rem",color:"rgba(255,255,255,0.6)",margin:"0 auto 2.5rem",lineHeight:1.6,maxWidth:520},
  heroSearchWrap:{display:"flex",alignItems:"center",gap:"0.75rem",maxWidth:520,margin:"0 auto",padding:"0.85rem 1.25rem",borderRadius:"1rem",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",backdropFilter:"blur(16px)",transition:"all 0.3s"},
  heroSearchInput:{flex:1,border:"none",outline:"none",fontSize:"0.95rem",backgroundColor:"transparent",color:"#fff"},
  main:{maxWidth:1280,margin:"0 auto",padding:"1.5rem 2rem 3rem"},
  toolbar:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"},
  toolbarLeft:{display:"flex",alignItems:"center",gap:"0.5rem"},
  sectionTitle:{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"1.3rem",fontWeight:700,color:"#111827",margin:0},
  filterPills:{display:"flex",gap:"0.35rem",flexWrap:"wrap"},
  filterPill:{display:"flex",alignItems:"center",gap:"0.35rem",padding:"0.45rem 1rem",border:"1px solid #E5E7EB",borderRadius:"9999px",backgroundColor:"#fff",color:"#374151",cursor:"pointer",fontSize:"0.78rem",fontWeight:600,transition:"all 0.2s"},
  filterPillActive:{backgroundColor:"#0021A5",color:"#fff",borderColor:"#0021A5",boxShadow:"0 2px 8px rgba(0,33,165,0.2)"},
  cityGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:"1.25rem"},
  cityCard:{borderRadius:"1.25rem",overflow:"hidden",backgroundColor:"#fff",border:"1px solid #E5E7EB",cursor:"pointer",transition:"all 0.35s cubic-bezier(.4,0,.2,1)"},
  cityCardImg:{width:"100%",height:180,backgroundSize:"cover",backgroundPosition:"center",position:"relative"},
  cityCardGrad:{position:"absolute",bottom:0,left:0,right:0,height:"60%",background:"linear-gradient(to top, rgba(0,0,0,0.45), transparent)"},
  cityCardFlag:{position:"absolute",top:"0.6rem",right:"0.6rem",fontSize:"1.3rem",filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.4))"},
  cityCardCostBadge:{position:"absolute",bottom:"0.6rem",left:"0.6rem",display:"inline-flex",alignItems:"center",gap:"0.2rem",padding:"0.2rem 0.55rem",borderRadius:"9999px",fontSize:"0.65rem",fontWeight:700,backdropFilter:"blur(4px)"},
  cityCardBody:{padding:"0.75rem 0.9rem 0.85rem"},
  cityCardName:{fontSize:"1.05rem",fontWeight:700,color:"#111827",margin:0,lineHeight:1.2},
  cityCardMeta:{fontSize:"0.75rem",color:"#6B7280",margin:"0.15rem 0 0 0"},
  engBadge:{display:"inline-flex",alignItems:"center",gap:"0.2rem",padding:"0.15rem 0.5rem",borderRadius:"9999px",fontSize:"0.62rem",fontWeight:600,whiteSpace:"nowrap"},
  tagRow:{display:"flex",gap:"0.3rem",marginTop:"0.5rem",overflow:"hidden"},
  tag:{fontSize:"0.62rem",fontWeight:600,padding:"0.15rem 0.5rem",borderRadius:"9999px",whiteSpace:"nowrap"},
  spinner:{width:40,height:40,border:"4px solid #E5E7EB",borderTopColor:"#0021A5",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto"},
  browseAllBtn:{display:"flex",alignItems:"center",gap:"0.35rem",padding:"0.55rem 1.15rem",border:"2px solid #0021A5",borderRadius:"0.65rem",backgroundColor:"#EEF0FF",color:"#0021A5",cursor:"pointer",fontSize:"0.82rem",fontWeight:700,transition:"all 0.2s"},
  quickCard:{backgroundColor:"#fff",borderRadius:"0.85rem",border:"1px solid #E5E7EB",padding:"0.85rem 1rem",boxShadow:"0 1px 3px rgba(0,0,0,0.04)",transition:"all 0.2s"},
  backBtn:{display:"inline-flex",alignItems:"center",gap:"0.3rem",padding:"0.4rem 0",border:"none",borderRadius:0,background:"none",color:"#6B7280",cursor:"pointer",fontSize:"0.82rem",fontWeight:600,marginBottom:"1rem",transition:"all 0.2s ease"},
  cityBanner:{minHeight:240,borderRadius:"1.5rem",padding:"2.5rem 2.5rem 2rem",marginBottom:"1.5rem",color:"#fff",display:"flex",alignItems:"flex-end",position:"relative",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,33,165,0.25)"},
  bannerTitle:{fontSize:"2.5rem",fontWeight:800,margin:"0 0 0.5rem 0",textShadow:"0 2px 12px rgba(0,0,0,0.4)",lineHeight:1.1},
  bannerTagline:{fontSize:"1.08rem",opacity:0.95,margin:"0 0 1.25rem 0",lineHeight:1.6,textShadow:"0 1px 4px rgba(0,0,0,0.3)",maxWidth:650},
  bannerBadges:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},
  bannerBadge:{fontSize:"0.78rem",backgroundColor:"rgba(255,255,255,0.2)",color:"#fff",padding:"0.3rem 0.85rem",borderRadius:"9999px",fontWeight:500,backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.15)"},
  tabs:{display:"flex",gap:"0.25rem",marginBottom:"1.5rem",borderBottom:"2px solid #E5E7EB",paddingBottom:0},
  tab:{display:"flex",alignItems:"center",gap:"0.35rem",padding:"0.75rem 1.25rem",border:"none",background:"none",cursor:"pointer",fontSize:"0.9rem",fontWeight:600,color:"#6B7280",borderBottom:"3px solid transparent",marginBottom:"-2px",transition:"all 0.15s"},
  tabActive:{color:"#0021A5",borderBottomColor:"#0021A5"},
  card:{backgroundColor:"#fff",padding:"1.75rem",borderRadius:"1.25rem",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",marginBottom:"1.5rem",border:"1px solid #E5E7EB"},
  cardTitle:{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"1.25rem",fontWeight:700,color:"#111827",margin:"0 0 1.25rem 0"},
  programCard:{border:"1px solid #E5E7EB",borderRadius:"1rem",marginBottom:"1rem",overflow:"hidden",backgroundColor:"#FAFBFC"},
  programHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"1.25rem 1.5rem",cursor:"pointer",backgroundColor:"#fff",borderBottom:"1px solid #F3F4F6"},
  programName:{fontSize:"1.1rem",fontWeight:700,color:"#0021A5",margin:"0 0 0.35rem 0"},
  programSummary:{fontSize:"0.85rem",color:"#6B7280",margin:"0 0 0.5rem 0",lineHeight:1.4},
  programMeta:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},
  programBadge:{fontSize:"0.7rem",fontWeight:600,backgroundColor:"#EEF2FF",color:"#4338CA",padding:"0.2rem 0.6rem",borderRadius:"9999px"},
  programBody:{padding:"0.75rem 1rem"},
  sectionCard:{border:"1px solid #E5E7EB",borderRadius:"0.5rem",marginBottom:"0.5rem",backgroundColor:"#fff"},
  sectionHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.75rem 1rem",cursor:"pointer"},
  secLabel:{fontSize:"0.9rem",fontWeight:600,color:"#374151"},
  sectionCount:{fontSize:"0.7rem",fontWeight:500,color:"#9CA3AF",backgroundColor:"#F3F4F6",padding:"0.15rem 0.5rem",borderRadius:"9999px"},
  sectionContent:{padding:"0 1rem 1rem 1rem"},
  tipItem:{padding:"0.75rem 0",borderBottom:"1px solid #F3F4F6"},
  tipItemTitle:{fontSize:"0.9rem",fontWeight:600,color:"#111827",margin:"0 0 0.4rem 0"},
  tipItemContent:{fontSize:"0.85rem",color:"#4B5563",lineHeight:1.7,margin:"0 0 0.4rem 0",whiteSpace:"pre-line"},
  culturalGroup:{marginBottom:"1.5rem"},
  culturalGroupTitle:{fontSize:"1.05rem",fontWeight:700,color:"#0021A5",margin:"0 0 0.75rem 0",paddingBottom:"0.5rem",borderBottom:"1px solid #DBEAFE"},
  tipGrid:{display:"grid",gap:"0.75rem"},
  tipCard:{backgroundColor:"#F9FAFB",borderRadius:"0.75rem",border:"1px solid #E5E7EB",overflow:"hidden"},
  tipHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"1rem 1.25rem",cursor:"pointer"},
  tipTitle:{fontSize:"0.95rem",fontWeight:600,color:"#111827",margin:"0 0 0.25rem 0"},
  tipShort:{fontSize:"0.8rem",color:"#6B7280",margin:0,lineHeight:1.4},
  tipContent:{fontSize:"0.9rem",color:"#374151",lineHeight:1.7,padding:"0 1.25rem 1.25rem 1.25rem",margin:0,borderTop:"1px solid #E5E7EB",paddingTop:"1rem"},
  filterRow:{display:"flex",gap:"0.75rem",marginBottom:"1rem",flexWrap:"wrap",alignItems:"center"},
  searchBox:{display:"flex",alignItems:"center",gap:"0.5rem",flex:"1 1 200px",padding:"0.55rem 1rem",borderRadius:"0.65rem",border:"1px solid #D1D5DB",backgroundColor:"#F9FAFB"},
  filterInput:{border:"none",outline:"none",flex:1,backgroundColor:"transparent",fontSize:"0.88rem",color:"#111827"},
  select:{padding:"0.55rem 1rem",borderRadius:"0.65rem",border:"1px solid #D1D5DB",backgroundColor:"#F9FAFB",fontSize:"0.85rem",cursor:"pointer",fontWeight:500},
  phraseGrid:{display:"grid",gap:"1rem"},
  phraseCard:{backgroundColor:"#F9FAFB",padding:"1.25rem",borderRadius:"0.75rem",border:"1px solid #E5E7EB"},
  phraseTop:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.75rem"},
  germanText:{fontSize:"1.1rem",fontWeight:700,color:"#0021A5",margin:"0 0 0.15rem 0"},
  pronunciation:{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.8rem",color:"#6B7280",fontStyle:"italic",margin:"0 0 0.35rem 0"},
  englishText:{fontSize:"0.95rem",color:"#374151",margin:0},
  bookmarkBtn:{border:"none",background:"none",cursor:"pointer",padding:"0.25rem",borderRadius:"0.25rem"},
  phraseMeta:{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.5rem",flexWrap:"wrap"},
  phraseCatBadge:{fontSize:"0.7rem",fontWeight:600,backgroundColor:"#DBEAFE",color:"#1E3A8A",padding:"0.15rem 0.6rem",borderRadius:"9999px",textTransform:"capitalize"},
  registerBadge:{fontSize:"0.7rem",fontWeight:500,backgroundColor:"#FEF3C7",color:"#92400E",padding:"0.15rem 0.6rem",borderRadius:"9999px",textTransform:"capitalize"},
  usageContext:{fontSize:"0.82rem",color:"#6B7280",margin:"0.25rem 0",lineHeight:1.4},
  exampleSentence:{fontSize:"0.82rem",color:"#4B5563",fontStyle:"italic",margin:"0.25rem 0",lineHeight:1.4},
  empty:{textAlign:"center",color:"#6B7280",padding:"2rem",fontSize:"0.95rem"},
  foot:{textAlign:"center",padding:"2rem",color:"#9CA3AF",fontSize:"0.82rem",borderTop:"1px solid #E5E7EB",marginTop:"1rem"},
};

/* Inject keyframes */
if (typeof document !== "undefined") {
  const el = document.getElementById("mtb-explore-anim") || document.createElement("style");
  el.id = "mtb-explore-anim";
  el.textContent = "@keyframes heroFloat{0%{transform:translate(0,0) scale(1)}50%{transform:translate(15px,-20px) scale(1.08)}100%{transform:translate(0,0) scale(1)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes fadeIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}";
  if (!el.parentNode) document.head.appendChild(el);
}

export default DialectTips;
