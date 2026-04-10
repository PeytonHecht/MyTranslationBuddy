import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Trash2, Calendar, MapPin, Compass, Bookmark, Home, CheckCircle, Target,
  TrendingUp, Plus, BookOpen, User, Lightbulb, Languages, Search,
  Volume2, Brain, Star, ChevronRight, X, Flame, RotateCcw, Zap, Award,
  ClipboardList, ArrowRight, Sparkles, Clock, Trophy, ChevronDown, ChevronUp, LogOut
} from "lucide-react";
import logo from "../assets/MTBLogo.png";

/* ═══════════════════════════════════════════════════════
   STUDY HUB — A smart, engaging language-learning space
   ═══════════════════════════════════════════════════════ */

const Reservations = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* ── Study Plan state ─────────────────────────────── */
  const [region, setRegion] = useState("");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const [showPlanForm, setShowPlanForm] = useState(false);

  /* ── Vocab / Flashcard state ──────────────────────── */
  const [vocabCards, setVocabCards] = useState([]);
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newTranslation, setNewTranslation] = useState("");
  const [newContext, setNewContext] = useState("");
  const [vocabError, setVocabError] = useState("");
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [showVocabForm, setShowVocabForm] = useState(false);
  const [flipAnim, setFlipAnim] = useState(false);

  /* ── Daily goal state ─────────────────────────────── */
  const [dailyGoal, setDailyGoal] = useState(5);
  const [todayProgress, setTodayProgress] = useState(0);

  /* ── Phrase Library state ─────────────────────────── */
  const [phrases, setPhrases] = useState([]);
  const [phrasesLoading, setPhrasesLoading] = useState(false);
  const [resourceCategory, setResourceCategory] = useState(new Set());
  const [resourceCities, setResourceCities] = useState([]);
  const [resourceType, setResourceType] = useState(new Set());
  const [resourceCountry, setResourceCountry] = useState(new Set());
  const [myCitiesOnly, setMyCitiesOnly] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [bookmarkMap, setBookmarkMap] = useState({});
  const [phraseSearch, setPhraseSearch] = useState("");

  /* ── Active tab ───────────────────────────────────── */
  const [activeTab, setActiveTab] = useState(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    return tab === "saved" ? "saved" : "home";
  });

  /* ── Saved Phrases state ──────────────────────────── */
  const [savedPhrases, setSavedPhrases] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [savedFilter, setSavedFilter] = useState("");
  const [savedTypeFilter, setSavedTypeFilter] = useState(new Set());
  const [savedCategoryFilter, setSavedCategoryFilter] = useState(new Set());

  /* ── UI state ─────────────────────────────────────── */
  const [phraseOfDay, setPhraseOfDay] = useState(null);
  const [podRevealed, setPodRevealed] = useState(false);
  const [podPronShown, setPodPronShown] = useState(false);
  const [showGoalEditor, setShowGoalEditor] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState("");

  /* ── Static data ──────────────────────────────────── */
  const cities = [
    "Select a City",
    "Hamburg","Berlin","Detmold","Osnabrück","Vallendar","Stuttgart",
    "Aachen","Lemgo","Munich","Jena","Bonn",
    "Wiesbaden (EBS)","Eltville","Mannheim",
    "Würzburg","Leipzig",
    "Vienna","Graz","Salzburg",
    "Zurich","Bern","Rapperswil-Jona","Winterthur"
  ];
  const citySlugMap = {
    "Hamburg":"hamburg","Berlin":"berlin","Detmold":"detmold","Osnabrück":"osnabruck",
    "Vallendar":"vallendar","Stuttgart":"stuttgart","Aachen":"aachen","Lemgo":"lemgo",
    "Munich":"munich","Jena":"jena","Bonn":"bonn",
    "Wiesbaden (EBS)":"ebs","Eltville":"eltville",
    "Mannheim":"mannheim","Würzburg":"wurzburg","Leipzig":"leipzig",
    "Vienna":"vienna","Graz":"graz","Salzburg":"salzburg",
    "Zurich":"zurich","Bern":"bern","Rapperswil-Jona":"rapperswil","Winterthur":"winterthur"
  };
  const cityCountryMap = {
    "Hamburg":"DE","Berlin":"DE","Detmold":"DE","Osnabrück":"DE",
    "Vallendar":"DE","Stuttgart":"DE","Aachen":"DE","Lemgo":"DE",
    "Munich":"DE","Jena":"DE","Bonn":"DE","Wiesbaden (EBS)":"DE",
    "Eltville":"DE","Mannheim":"DE","Würzburg":"DE","Leipzig":"DE",
    "Vienna":"AT","Graz":"AT","Salzburg":"AT",
    "Zurich":"CH","Bern":"CH","Rapperswil-Jona":"CH","Winterthur":"CH"
  };
  const countryFlags = { DE:"🇩🇪", AT:"🇦🇹", CH:"🇨🇭" };
  const countryColors = { DE:"#FFE5E5", AT:"#FFF0E5", CH:"#E5F0FF" };
  const CATEGORIES = ["academic","housing","dining","transportation","social","shopping","emergency","greetings","exclamations","health"];

  /* ── Load persisted data ──────────────────────────── */
  useEffect(() => {
    const stored = localStorage.getItem("reservations");
    if (stored) setReservations(JSON.parse(stored));
    const storedCards = localStorage.getItem("vocabCards");
    if (storedCards) setVocabCards(JSON.parse(storedCards));
    const storedGoal = localStorage.getItem("dailyGoal");
    if (storedGoal) setDailyGoal(parseInt(storedGoal));
    const storedProgress = localStorage.getItem("todayProgress");
    const storedDate = localStorage.getItem("progressDate");
    const today = new Date().toISOString().split("T")[0];
    if (storedProgress && storedDate === today) setTodayProgress(parseInt(storedProgress));
  }, []);

  useEffect(() => { localStorage.setItem("reservations", JSON.stringify(reservations)); }, [reservations]);
  useEffect(() => { localStorage.setItem("vocabCards", JSON.stringify(vocabCards)); }, [vocabCards]);
  useEffect(() => { localStorage.setItem("dailyGoal", dailyGoal.toString()); }, [dailyGoal]);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("todayProgress", todayProgress.toString());
    localStorage.setItem("progressDate", today);
  }, [todayProgress]);

  /* ── Phrases fetch ────────────────────────────────── */
  useEffect(() => {
    if (activeTab === "library") {
      setPhrasesLoading(true);
      let url = "/api/phrases/?limit=100";
      if (resourceCategory.size === 1) url += "&category=" + [...resourceCategory][0];
      if (resourceCities.length === 1) url += "&city_slug=" + resourceCities[0];
      if (resourceType.size === 1) url += "&phrase_type=" + [...resourceType][0];
      axios.get(url)
        .then(r => setPhrases(r.data.phrases || r.data.data || []))
        .catch(() => setPhrases([]))
        .finally(() => setPhrasesLoading(false));
    }
  }, [activeTab, resourceCategory, resourceCities, resourceType]);

  /* ── Phrase of the Day ────────────────────────────── */
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const cached = localStorage.getItem("phraseOfDay");
    const cachedDate = localStorage.getItem("phraseOfDayDate");
    if (cached && cachedDate === today) {
      setPhraseOfDay(JSON.parse(cached));
    } else {
      axios.get("/api/phrases/?limit=50")
        .then(r => {
          const all = r.data.phrases || r.data.data || [];
          if (all.length > 0) {
            const seed = today.split("-").reduce((a,b) => a + parseInt(b), 0);
            const pick = all[seed % all.length];
            setPhraseOfDay(pick);
            localStorage.setItem("phraseOfDay", JSON.stringify(pick));
            localStorage.setItem("phraseOfDayDate", today);
          }
        })
        .catch(() => {});
    }
  }, []);

  /* ── Derived values ───────────────────────────────── */
  const completedPlans = reservations.filter(r => r.completed).length;
  const totalCards = vocabCards.length;
  const masteredCards = vocabCards.filter(c => c.mastery >= 3).length;
  const newCards = vocabCards.filter(c => c.mastery === 0).length;
  const learningCards = vocabCards.filter(c => c.mastery >= 1 && c.mastery < 3).length;

  const streakDays = (() => {
    const history = JSON.parse(localStorage.getItem("studyHistory") || "[]");
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      if (history.includes(ds)) streak++;
      else if (i > 0) break;
    }
    return streak;
  })();

  const recordStudyDay = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    const history = JSON.parse(localStorage.getItem("studyHistory") || "[]");
    if (!history.includes(today)) {
      history.push(today);
      localStorage.setItem("studyHistory", JSON.stringify(history));
    }
  }, []);

  const handleLogout = async () => {
    try { 
      const userEmail = localStorage.getItem("email");
      if (userEmail) {
        await axios.post("/api/logout", { email: userEmail });
      }
    } catch(err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("email"); 
    localStorage.removeItem("full_name"); 
    localStorage.removeItem("study_abroad_city");
    navigate("/login");
  };

  const goalPercent = dailyGoal > 0 ? Math.min(100, Math.round((todayProgress / dailyGoal) * 100)) : 0;

  /* ── Smart recommendations ────────────────────────── */
  const recommendations = useMemo(() => {
    const recs = [];
    if (totalCards === 0) {
      recs.push({ key:"start", icon:<Languages size={18}/>, title:"Start your vocabulary", desc:"Browse the phrase library to add your first words", action:() => setActiveTab("library"), color:"#0021A5", bgColor:"#EFF6FF" });
    }
    if (newCards > 0 && totalCards >= 1) {
      recs.push({ key:"review", icon:<RotateCcw size={18}/>, title:`Review ${newCards} new card${newCards !== 1 ? "s" : ""}`, desc:"Flashcards help move words into long-term memory", action: startFlashcards, color:"#7C3AED", bgColor:"#F5F3FF" });
    }
    if (totalCards >= 2 && todayProgress < 3) {
      recs.push({ key:"quiz", icon:<Zap size={18}/>, title:"Take a quick quiz", desc:"Test yourself on your vocabulary", action: startQuiz, color:"#059669", bgColor:"#ECFDF5" });
    }
    if (totalCards >= 5 && masteredCards < totalCards) {
      const weakest = vocabCards.filter(c => c.mastery < 2).length;
      if (weakest > 0) recs.push({ key:"weak", icon:<Target size={18}/>, title:`${weakest} cards need attention`, desc:"Focus on words you haven't mastered yet", action: startFlashcards, color:"#DC2626", bgColor:"#FEF2F2" });
    }
    if (reservations.length > 0 && completedPlans < reservations.length) {
      recs.push({ key:"plans", icon:<ClipboardList size={18}/>, title:`${reservations.length - completedPlans} study plan${reservations.length - completedPlans !== 1 ? "s" : ""} in progress`, desc:"Keep working on your goals", action:() => setActiveTab("plans"), color:"#0021A5", bgColor:"#EFF6FF" });
    }
    if (recs.length === 0 && totalCards > 0) {
      recs.push({ key:"explore", icon:<Sparkles size={18}/>, title:"Explore more phrases", desc:"Add new words from the library to keep growing", action:() => setActiveTab("library"), color:"#92400E", bgColor:"#FFFBEB" });
    }
    return recs.slice(0, 3);
  }, [totalCards, newCards, masteredCards, todayProgress, reservations, completedPlans, vocabCards]);

  /* ── Celebration effect ───────────────────────────── */
  useEffect(() => {
    if (todayProgress > 0 && todayProgress === dailyGoal) {
      setCelebrationMsg("🎉 Daily goal reached! Amazing work!");
      const t = setTimeout(() => setCelebrationMsg(""), 4000);
      return () => clearTimeout(t);
    }
  }, [todayProgress, dailyGoal]);

  /* ── Study Plan handlers ──────────────────────────── */
  const handleAddReservation = () => {
    if (!region || region === "Select a City") { setError("Please select a city."); return; }
    if (!topic.trim()) { setError("Please enter a topic."); return; }
    setReservations([...reservations, { id: Date.now(), city: region, topic: topic.trim(), date, completed: false }]);
    setRegion(""); setTopic(""); setError(""); setShowPlanForm(false);
  };
  const handleDeleteReservation = (id) => setReservations(reservations.filter(r => r.id !== id));
  const handleToggleComplete = (id) => {
    setReservations(reservations.map(r => {
      if (r.id !== id) return r;
      if (!r.completed) { setTodayProgress(p => p + 1); recordStudyDay(); }
      return { ...r, completed: !r.completed };
    }));
  };

  /* ── Vocab handlers ───────────────────────────────── */
  const handleAddVocab = () => {
    if (!newWord.trim()) { setVocabError("Enter a German word or phrase."); return; }
    if (!newTranslation.trim()) { setVocabError("Enter the English translation."); return; }
    const card = {
      id: Date.now(), german: newWord.trim(), english: newTranslation.trim(),
      context: newContext.trim(), mastery: 0, lastReviewed: null,
      created: new Date().toISOString().split("T")[0]
    };
    setVocabCards([card, ...vocabCards]);
    setNewWord(""); setNewTranslation(""); setNewContext(""); setVocabError(""); setShowVocabForm(false);
    setTodayProgress(p => p + 1);
    recordStudyDay();
  };
  const handleDeleteVocab = (id) => setVocabCards(vocabCards.filter(c => c.id !== id));

  /* ── Flashcard handlers ───────────────────────────── */
  const handleFlashcardRate = (rating) => {
    setVocabCards(prev => prev.map((c, i) => {
      if (i !== currentCardIndex) return c;
      const newMastery = rating === 0 ? Math.max(0, c.mastery - 1) : Math.min(5, c.mastery + (rating >= 2 ? 1 : 0));
      return { ...c, mastery: newMastery, lastReviewed: new Date().toISOString().split("T")[0] };
    }));
    setShowAnswer(false);
    setFlipAnim(false);
    setTodayProgress(p => p + 1);
    recordStudyDay();
    if (currentCardIndex < vocabCards.length - 1) setCurrentCardIndex(i => i + 1);
    else { setFlashcardMode(false); setCurrentCardIndex(0); }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function startFlashcards() {
    if (vocabCards.length === 0) return;
    const shuffled = [...vocabCards].sort((a, b) => a.mastery - b.mastery + (Math.random() - 0.5));
    setVocabCards(shuffled);
    setCurrentCardIndex(0); setShowAnswer(false); setFlipAnim(false); setFlashcardMode(true); setActiveTab("practice");
  }

  /* ── Quiz handlers ────────────────────────────────── */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function startQuiz() {
    if (vocabCards.length < 2) return;
    const shuffled = [...vocabCards].sort(() => Math.random() - 0.5);
    setVocabCards(shuffled);
    setCurrentCardIndex(0); setQuizAnswer(""); setQuizResult(null);
    setQuizScore({ correct: 0, total: 0 }); setQuizMode(true); setActiveTab("practice");
  }

  const checkQuizAnswer = () => {
    const card = vocabCards[currentCardIndex];
    const correct = quizAnswer.trim().toLowerCase() === card.english.trim().toLowerCase();
    setQuizResult(correct ? "correct" : "wrong");
    setQuizScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
    setTodayProgress(p => p + 1);
    recordStudyDay();
    setVocabCards(prev => prev.map((c, i) => {
      if (i !== currentCardIndex) return c;
      return { ...c, mastery: correct ? Math.min(5, c.mastery + 1) : Math.max(0, c.mastery - 1), lastReviewed: new Date().toISOString().split("T")[0] };
    }));
  };

  const nextQuizQuestion = () => {
    if (currentCardIndex < Math.min(vocabCards.length - 1, 9)) {
      setCurrentCardIndex(i => i + 1); setQuizAnswer(""); setQuizResult(null);
    } else { setQuizMode(false); }
  };

  /* ── Phrase helpers ───────────────────────────────── */
  const addPhraseToVocab = (phrase) => {
    const exists = vocabCards.find(c => c.german === phrase.german_phrase);
    if (exists) return;
    const card = {
      id: Date.now(), german: phrase.german_phrase, english: phrase.english_translation,
      context: phrase.usage_context || "", mastery: 0, lastReviewed: null,
      created: new Date().toISOString().split("T")[0]
    };
    setVocabCards([card, ...vocabCards]);
    setTodayProgress(p => p + 1);
    recordStudyDay();
  };

  const speakPhrase = (phrase, id) => {
    if (speakingId === id) { window.speechSynthesis.cancel(); setSpeakingId(null); return; }
    const u = new SpeechSynthesisUtterance(phrase);
    u.lang = "de-DE"; u.rate = 0.85;
    u.onend = () => setSpeakingId(null);
    u.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(u);
  };

  /* ── Bookmark / saved helpers ─────────────────────── */
  const userEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    if (userEmail) {
      axios.get("/api/phrases/bookmarks", { params: { user_email: userEmail } })
        .then(res => {
          const bks = res.data.bookmarks || [];
          const ids = new Set();
          const map = {};
          bks.forEach(b => {
            const pid = b.phrase_id || (b.phrase && b.phrase._id);
            if (pid) { ids.add(pid); map[pid] = b._id; }
          });
          setBookmarkedIds(ids);
          setBookmarkMap(map);
        })
        .catch(() => {});
    }
  }, []);

  const toggleBookmark = async (phraseId) => {
    if (!userEmail) { navigate("/login"); return; }
    try {
      if (bookmarkedIds.has(phraseId)) {
        const bkId = bookmarkMap[phraseId] || phraseId;
        await axios.delete("/api/phrases/bookmarks/" + bkId, { params: { user_email: userEmail } });
        setBookmarkedIds(prev => { const n = new Set(prev); n.delete(phraseId); return n; });
        setBookmarkMap(prev => { const n = { ...prev }; delete n[phraseId]; return n; });
      } else {
        const res = await axios.post("/api/phrases/bookmarks", { phrase_id: phraseId, user_email: userEmail });
        const newId = res.data.bookmark_id || res.data._id || phraseId;
        setBookmarkedIds(prev => new Set([...prev, phraseId]));
        setBookmarkMap(prev => ({ ...prev, [phraseId]: newId }));
      }
    } catch (err) { console.error("Bookmark toggle failed:", err); }
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "saved") setActiveTab("saved");
  }, [searchParams]);

  const fetchSavedPhrases = useCallback(async () => {
    if (!userEmail) return;
    setSavedLoading(true);
    try {
      const res = await axios.get("/api/phrases/bookmarks", { params: { user_email: userEmail } });
      setSavedPhrases(res.data.bookmarks || []);
    } catch { setSavedPhrases([]); }
    finally { setSavedLoading(false); }
  }, [userEmail]);

  useEffect(() => {
    if (activeTab === "saved") fetchSavedPhrases();
  }, [activeTab, fetchSavedPhrases]);

  const removeSavedPhrase = async (bookmarkId, phraseId) => {
    try {
      await axios.delete("/api/phrases/bookmarks/" + bookmarkId, { params: { user_email: userEmail } });
      setSavedPhrases(prev => prev.filter(b => b._id !== bookmarkId));
      if (phraseId) {
        setBookmarkedIds(prev => { const n = new Set(prev); n.delete(phraseId); return n; });
        setBookmarkMap(prev => { const n = { ...prev }; delete n[phraseId]; return n; });
      }
    } catch (err) { console.error("Remove saved phrase failed:", err); }
  };

  const filteredSaved = savedPhrases.filter(b => {
    const p = b.phrase || {};
    if (savedTypeFilter.size > 0 && !savedTypeFilter.has(p.phrase_type || "standard")) return false;
    if (savedCategoryFilter.size > 0 && !savedCategoryFilter.has(p.category || "uncategorized")) return false;
    if (!savedFilter) return true;
    const q = savedFilter.toLowerCase();
    return (p.german_phrase || "").toLowerCase().includes(q) ||
           (p.english_translation || "").toLowerCase().includes(q) ||
           (p.category || "").toLowerCase().includes(q);
  });

  const savedCategories = [...new Set(savedPhrases.map(b => b.phrase?.category || "uncategorized"))].sort();

  const savedByCategory = filteredSaved.reduce((acc, b) => {
    const cat = b.phrase?.category || "uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(b);
    return acc;
  }, {});

  /* ── Mastery label helper ─────────────────────────── */
  const masteryLabel = (m) => m >= 4 ? "★ Mastered" : m >= 3 ? "Strong" : m >= 2 ? "Familiar" : m >= 1 ? "Learning" : "New";
  const masteryColor = (m) => m >= 3 ? "#059669" : m >= 2 ? "#3B82F6" : m >= 1 ? "#F59E0B" : "#9CA3AF";

  /* ── Time-based greeting ──────────────────────────── */
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Guten Morgen";
    if (h < 17) return "Guten Tag";
    return "Guten Abend";
  })();

  const userName = (localStorage.getItem("full_name") || localStorage.getItem("email") || "").split(" ")[0] || "";

  /* ════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════ */
return (
  <div style={S.page}>
    {/* ─── NAVBAR ─────────────────────────────────── */}
    <header style={S.header}>
      <div style={S.headerInner}>
        <div style={S.headerLeft} onClick={() => navigate("/")}>
          <img src={logo} alt="MTB" style={{ height: 72 }} />
          <span style={S.brand}>MyTranslationBuddy</span>
        </div>
        <nav style={S.headerRight}>
          <button 
            onClick={() => navigate("/tips")} 
            style={S.navBtn}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}
          >
            <Compass size={15}/> Explore
          </button>
          <button style={{...S.navBtn, backgroundColor:"#fff", fontWeight:700, color:"#0021A5", boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
            <ClipboardList size={15}/> Study
          </button>
          <button 
            onClick={() => navigate("/events")} 
            style={S.navBtn}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}
          >
            <Calendar size={15}/> Events
          </button>
          <button 
            onClick={() => navigate("/")} 
            style={S.navBtn}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#dfdfdf"; e.currentTarget.style.color="#0021A5"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280"; e.currentTarget.style.boxShadow="none";}}
          >
            <Home size={15}/> Home
          </button>
          {localStorage.getItem("email") ? (
            <>
              <button onClick={() => navigate("/profile")} style={S.profileBtn}><User size={15}/> Profile</button>
              <button onClick={handleLogout} style={{...S.navBtn, color:"#DC2626", marginLeft:"0.25rem"}} 
                onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#FEF2F2"; e.currentTarget.style.color="#DC2626";}} 
                onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280";}}>
                <LogOut size={14}/> Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/login")} style={S.profileBtn}>Sign In</button>
          )}
        </nav>
      </div>
    </header>

      {/* ─── CELEBRATION TOAST ──────────────────────── */}
      {celebrationMsg && (
        <div style={S.toast}>{celebrationMsg}</div>
      )}

      <div style={S.body}>

        {/* ─── SMART HEADER ─────────────────────────── */}
        <section style={S.smartHeader}>
          <div style={S.shTop}>
            <div style={{flex:1}}>
              <p style={S.shGreeting}>{greeting}{userName ? `, ${userName}` : ""} 👋</p>
              <h1 style={S.shTitle}>Study Hub</h1>
            </div>
            {streakDays > 0 && (
              <div style={S.streakBadge}>
                <Flame size={16} color="#FA4616"/>
                <div>
                  <div style={S.streakNum}>{streakDays}</div>
                  <div style={S.streakLabel}>day streak</div>
                </div>
              </div>
            )}
          </div>

          {/* Daily progress ring */}
          <div style={S.goalRow}>
            <div style={S.goalVisual}>
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="#E5E7EB" strokeWidth="4"/>
                <circle cx="22" cy="22" r="18" fill="none" stroke={goalPercent >= 100 ? "#059669" : "#0021A5"} strokeWidth="4"
                  strokeDasharray={`${(goalPercent / 100) * 113} 113`}
                  strokeLinecap="round" transform="rotate(-90 22 22)"
                  style={{transition:"stroke-dasharray 0.5s ease"}}/>
              </svg>
              <span style={S.goalCenter}>{todayProgress}</span>
            </div>
            <div style={{flex:1}}>
              <div style={S.goalText}>
                <span style={{fontWeight:600, color:"#111827"}}>
                  {goalPercent >= 100
                    ? "Goal reached! 🎉"
                    : todayProgress === 0
                      ? `Daily goal: ${dailyGoal} practice actions`
                      : `${todayProgress} of ${dailyGoal} done today`}
                </span>
                <button onClick={() => setShowGoalEditor(!showGoalEditor)} style={S.goalEditBtn}>
                  {showGoalEditor ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
                </button>
              </div>
              {todayProgress === 0 && !showGoalEditor && (
                <p style={{fontSize:"0.7rem", color:"#94A3B8", margin:"0.15rem 0 0", lineHeight:1.4}}>
                  Flashcard reviews, quiz answers, adding cards & completing plans all count
                </p>
              )}
              {showGoalEditor && (
                <div style={S.goalEditor}>
                  {[3,5,10,15,20].map(g => (
                    <button key={g} onClick={() => { setDailyGoal(g); setShowGoalEditor(false); }}
                      style={{...S.goalOption, ...(dailyGoal === g ? {backgroundColor:"#0021A5", color:"#fff"} : {})}}>
                      {g}/day
                    </button>
                  ))}
                </div>
              )}
              <div style={S.miniStatsRow}>
                {totalCards > 0 ? (
                  <>
                    <span style={S.miniStat}>{totalCards} card{totalCards !== 1 ? "s" : ""}</span>
                    <span style={S.miniDot}>·</span>
                    <span style={S.miniStat}>{masteredCards} mastered</span>
                  </>
                ) : (
                  <span style={S.miniStat}>No vocab cards yet</span>
                )}
                {reservations.length > 0 && (
                  <>
                    <span style={S.miniDot}>·</span>
                    <span style={S.miniStat}>{completedPlans}/{reservations.length} plan{reservations.length !== 1 ? "s" : ""} done</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── TAB BAR ──────────────────────────────── */}
        <div style={S.tabBar}>
          {[
            { id:"home",    icon:<Sparkles size={15}/>, label:"Home" },
            { id:"practice",icon:<RotateCcw size={15}/>,label:"Practice" },
            { id:"library", icon:<Languages size={15}/>,label:"Phrases" },
            { id:"plans",   icon:<Target size={15}/>,   label:"Plans" },
            { id:"saved",   icon:<Bookmark size={15}/>, label:`Saved${savedPhrases.length > 0 ? ` (${savedPhrases.length})` : ""}` },
          ].map(t => (
            <button key={t.id}
              onClick={() => { setActiveTab(t.id); setFlashcardMode(false); setQuizMode(false); }}
              style={activeTab === t.id ? S.tabActive : S.tab}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════
           TAB: HOME — smart, contextual dashboard
           ═══════════════════════════════════════════════ */}
        {activeTab === "home" && (
          <section style={S.section}>

            {/* ── Phrase of the Day — on Home tab ── */}
            {phraseOfDay && (
              <div style={S.podCard}>
                <div style={S.podHeader}>
                  <div style={S.podBadge}><Lightbulb size={13}/> Phrase of the Day</div>
                </div>
                <p style={S.podGerman}>{phraseOfDay.german_phrase}</p>

                <div style={{display:"flex", gap:"0.5rem", marginBottom:"0.85rem", flexWrap:"wrap"}}>
                  <button onClick={() => speakPhrase(phraseOfDay.german_phrase, "pod")}
                    style={{...S.podActionBtn, ...(speakingId === "pod" ? {backgroundColor:"#0021A5",color:"#fff",borderColor:"#0021A5"} : {})}}>
                    <Volume2 size={14}/> {speakingId === "pod" ? "Playing…" : "Listen"}
                  </button>
                  {phraseOfDay.pronunciation && (
                    <button onClick={() => setPodPronShown(prev => !prev)}
                      style={{...S.podActionBtn, ...(podPronShown ? {backgroundColor:"rgba(255,255,255,0.15)",borderColor:"rgba(255,255,255,0.4)"} : {})}}>
                      {podPronShown ? phraseOfDay.pronunciation : "🔊 Pronunciation"}
                    </button>
                  )}
                  {!vocabCards.some(c => c.german === phraseOfDay.german_phrase) ? (
                    <button onClick={() => addPhraseToVocab(phraseOfDay)} style={{...S.podActionBtn, backgroundColor:"rgba(250,70,22,0.15)", borderColor:"rgba(250,70,22,0.3)", color:"#FFB088"}}>
                      <Bookmark size={14}/> Save
                    </button>
                  ) : (
                    <span style={S.podInDeck}><CheckCircle size={13}/> In your deck</span>
                  )}
                </div>

                {!podRevealed ? (
                  <button onClick={() => setPodRevealed(true)} style={S.podRevealBtn}>
                    Tap to reveal translation
                  </button>
                ) : (
                  <div style={S.podRevealed}>
                    <p style={S.podEnglish}><ArrowRight size={13} style={{flexShrink:0}}/> {phraseOfDay.english_translation}</p>
                    {phraseOfDay.usage_context && <p style={S.podContext}><Lightbulb size={12}/> {phraseOfDay.usage_context}</p>}
                    {phraseOfDay.cultural_note && <p style={S.podCulture}>🌍 {phraseOfDay.cultural_note}</p>}
                    <div style={{display:"flex",gap:"0.35rem",flexWrap:"wrap",marginTop:"0.5rem"}}>
                      {phraseOfDay.register && <span style={{fontSize:"0.68rem",fontWeight:600,padding:"0.15rem 0.5rem",borderRadius:9999,backgroundColor:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.15)",textTransform:"capitalize"}}>{phraseOfDay.register}</span>}
                      {phraseOfDay.difficulty_level && <span style={{fontSize:"0.68rem",fontWeight:600,padding:"0.15rem 0.5rem",borderRadius:9999,backgroundColor:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.15)"}}>{"⭐".repeat(phraseOfDay.difficulty_level)} Lvl {phraseOfDay.difficulty_level}</span>}
                      {phraseOfDay.category && <span style={{fontSize:"0.68rem",fontWeight:600,padding:"0.15rem 0.5rem",borderRadius:9999,backgroundColor:"rgba(250,70,22,0.15)",color:"#FFB088",border:"1px solid rgba(250,70,22,0.25)",textTransform:"capitalize"}}>{phraseOfDay.category}</span>}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Smart Recommendations */}
            {recommendations.length > 0 && (
              <div style={{marginBottom:"1.5rem"}}>
                <h2 style={S.sectionLabel}>Suggested for you</h2>
                <div style={S.recList}>
                  {recommendations.map(rec => (
                    <button key={rec.key} onClick={rec.action} style={S.recCard}>
                      <div style={{...S.recIcon, backgroundColor: rec.bgColor, color: rec.color}}>
                        {rec.icon}
                      </div>
                      <div style={{flex:1, textAlign:"left"}}>
                        <div style={S.recTitle}>{rec.title}</div>
                        <div style={S.recDesc}>{rec.desc}</div>
                      </div>
                      <ChevronRight size={16} color="#9CA3AF"/>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions Row */}
            <div style={{marginBottom:"1.5rem"}}>
              <h2 style={S.sectionLabel}>Quick actions</h2>
              <div style={S.quickActions}>
                <button onClick={startFlashcards} disabled={totalCards === 0}
                  style={{...S.qaBtn, opacity: totalCards === 0 ? 0.45 : 1}}>
                  <RotateCcw size={18} color="#7C3AED"/> Flashcards
                </button>
                <button onClick={startQuiz} disabled={totalCards < 2}
                  style={{...S.qaBtn, opacity: totalCards < 2 ? 0.45 : 1}}>
                  <Zap size={18} color="#059669"/> Quiz
                </button>
                <button onClick={() => setActiveTab("library")} style={S.qaBtn}>
                  <Languages size={18} color="#0021A5"/> Browse
                </button>
                <button onClick={() => { setShowVocabForm(true); setActiveTab("practice"); }} style={S.qaBtn}>
                  <Plus size={18} color="#DC2626"/> Add Card
                </button>
              </div>
            </div>

            {/* Mastery Snapshot — only if cards exist */}
            {totalCards > 0 && (
              <div style={S.masterySnapshot}>
                <h2 style={S.sectionLabel}>Your vocabulary</h2>
                <div style={S.masteryBars}>
                  {[
                    { label:"Mastered", count: masteredCards, color:"#059669", bg:"#D1FAE5" },
                    { label:"Familiar", count: vocabCards.filter(c => c.mastery === 2).length, color:"#3B82F6", bg:"#DBEAFE" },
                    { label:"Learning", count: learningCards, color:"#F59E0B", bg:"#FEF3C7" },
                    { label:"New", count: newCards, color:"#EF4444", bg:"#FEE2E2" },
                  ].map(tier => (
                    <div key={tier.label} style={S.masteryBarRow}>
                      <span style={{...S.mbLabel, color: tier.color}}>{tier.label}</span>
                      <div style={S.mbTrack}>
                        <div style={{...S.mbFill, backgroundColor: tier.color, width: totalCards > 0 ? `${Math.max(2, (tier.count / totalCards) * 100)}%` : "2%"}}/>
                      </div>
                      <span style={S.mbCount}>{tier.count}</span>
                    </div>
                  ))}
                </div>
                {totalCards <= 10 && (
                  <p style={S.nudge}>
                    <Sparkles size={13}/> Tip: Add more words from the <button onClick={() => setActiveTab("library")} style={S.nudgeLink}>Phrase Library</button> to make flashcards and quizzes more effective.
                  </p>
                )}
              </div>
            )}

            {/* First-time empty state */}
            {totalCards === 0 && reservations.length === 0 && (
              <div style={S.welcomeCard}>
                <div style={S.welcomeIcon}>🎓</div>
                <h3 style={S.welcomeTitle}>Welcome to your Study Hub</h3>
                <p style={S.welcomeDesc}>
                  This is your personal space to learn German for study abroad. Start by browsing real phrases used in DACH countries, then practice with flashcards and quizzes.
                </p>
                <button onClick={() => setActiveTab("library")} style={S.welcomeBtn}>
                  <Languages size={16}/> Browse Phrase Library
                </button>
              </div>
            )}
          </section>
        )}

        {/* ═══════════════════════════════════════════════
           TAB: PRACTICE — flashcards, quiz, vocab deck
           ═══════════════════════════════════════════════ */}
        {activeTab === "practice" && !flashcardMode && !quizMode && (
          <section style={S.section}>

            <div style={S.sectionHeader}>
              <div>
                <h2 style={S.sectionTitle}>Practice</h2>
                <p style={S.sectionHint}>Review and strengthen your vocabulary through flashcards and quizzes.</p>
              </div>
              <div style={{display:"flex", gap:"0.5rem", flexWrap:"wrap"}}>
                <button onClick={startFlashcards} disabled={totalCards === 0}
                  style={{...S.primaryBtn, opacity: totalCards === 0 ? 0.5 : 1}}>
                  <RotateCcw size={14}/> Flashcards
                </button>
                <button onClick={startQuiz} disabled={totalCards < 2}
                  style={{...S.secondaryBtn, opacity: totalCards < 2 ? 0.5 : 1}}>
                  <Zap size={14}/> Quiz
                </button>
              </div>
            </div>

            {/* Add vocabulary form toggle */}
            <button onClick={() => setShowVocabForm(v => !v)}
              style={{...S.toggleFormBtn, marginBottom: showVocabForm ? "0" : "1rem"}}>
              <Plus size={15}/> {showVocabForm ? "Cancel" : "Add a new vocabulary card"}
            </button>

            {showVocabForm && (
              <div style={S.formCard}>
                {vocabError && <p style={S.errorText}>{vocabError}</p>}
                <div style={S.formRow}>
                  <input type="text" placeholder="German word or phrase" value={newWord} onChange={e => setNewWord(e.target.value)} style={S.input}/>
                  <input type="text" placeholder="English translation" value={newTranslation} onChange={e => setNewTranslation(e.target.value)} style={S.input}/>
                </div>
                <div style={S.formRow}>
                  <input type="text" placeholder="Context or example (optional)" value={newContext} onChange={e => setNewContext(e.target.value)} style={{...S.input, flex:"1 1 100%"}}
                    onKeyDown={e => { if (e.key === "Enter") handleAddVocab(); }}/>
                  <button onClick={handleAddVocab} style={S.primaryBtn}>Add Card</button>
                </div>
              </div>
            )}

            {/* Vocab deck */}
            {vocabCards.length > 0 ? (
              <>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem"}}>
                  <h3 style={S.cardHeading}>Your cards ({vocabCards.length})</h3>
                </div>
                <div style={S.vocabGrid}>
                  {vocabCards.map(card => (
                    <div key={card.id} style={S.vocabCard}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div style={{flex:1}}>
                          <p style={S.vocabDE}>{card.german}</p>
                          <p style={S.vocabEN}>{card.english}</p>
                        </div>
                        <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
                          <button onClick={() => speakPhrase(card.german, card.id)} style={S.iconBtn}><Volume2 size={13}/></button>
                          <button onClick={() => handleDeleteVocab(card.id)} style={{...S.iconBtn, borderColor:"#FCA5A5", color:"#EF4444"}}><Trash2 size={13}/></button>
                        </div>
                      </div>
                      {card.context && <p style={S.vocabCtx}>💡 {card.context}</p>}
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"0.5rem"}}>
                        <div style={{display:"flex", gap:"2px"}}>
                          {[1,2,3,4,5].map(i => (<Star key={i} size={11} fill={i <= card.mastery ? "#F59E0B" : "none"} color={i <= card.mastery ? "#F59E0B" : "#D1D5DB"}/>))}
                        </div>
                        <span style={{fontSize:"0.68rem", color: masteryColor(card.mastery), fontWeight:600}}>{masteryLabel(card.mastery)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={S.emptyState}>
                <Brain size={36} color="#D1D5DB"/>
                <p style={S.emptyTitle}>No vocabulary cards yet</p>
                <p style={S.emptyHint}>Add your own words above, or browse the Phrase Library to build your deck.</p>
                <button onClick={() => setActiveTab("library")} style={{...S.primaryBtn, marginTop:"0.5rem"}}>
                  <Languages size={15}/> Browse Phrases
                </button>
              </div>
            )}
          </section>
        )}

        {/* ─── FLASHCARD MODE ───────────────────────── */}
        {activeTab === "practice" && flashcardMode && vocabCards.length > 0 && (
          <section style={S.fcSection}>
            <div style={S.fcHeader}>
              <span style={S.fcProgress}>Card {currentCardIndex + 1} of {vocabCards.length}</span>
              <button onClick={() => { setFlashcardMode(false); setFlipAnim(false); }} style={S.exitBtn}><X size={14}/> Exit</button>
            </div>
            {/* Progress dots */}
            <div style={S.fcDots}>
              {vocabCards.slice(0, Math.min(vocabCards.length, 20)).map((_, i) => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: "50%",
                  backgroundColor: i < currentCardIndex ? "#059669" : i === currentCardIndex ? "#0021A5" : "#E5E7EB",
                  transition: "all 0.2s"
                }}/>
              ))}
              {vocabCards.length > 20 && <span style={{fontSize:"0.65rem", color:"#9CA3AF"}}>+{vocabCards.length - 20}</span>}
            </div>
            <div style={S.flashcard} onClick={() => { if (!showAnswer) { setFlipAnim(true); setTimeout(() => setShowAnswer(true), 150); } }}>
              {!showAnswer ? (
                <div style={{textAlign:"center", opacity: flipAnim ? 0 : 1, transform: flipAnim ? "rotateY(90deg)" : "rotateY(0)", transition:"all 0.15s ease-in"}}>
                  <p style={S.fcLabel}>GERMAN</p>
                  <p style={S.fcWord}>{vocabCards[currentCardIndex]?.german}</p>
                  <button onClick={(e) => { e.stopPropagation(); speakPhrase(vocabCards[currentCardIndex]?.german, "fc"); }}
                    style={{...S.iconBtn, margin:"0.75rem auto 0", padding:"0.4rem 0.8rem"}}><Volume2 size={15}/> Listen</button>
                  <p style={S.fcHint}>Tap card to reveal</p>
                </div>
              ) : (
                <div style={{textAlign:"center", animation:"fadeIn 0.2s ease-out"}}>
                  <p style={S.fcLabel}>ENGLISH</p>
                  <p style={S.fcAnswer}>{vocabCards[currentCardIndex]?.english}</p>
                  {vocabCards[currentCardIndex]?.context && <p style={S.fcCtx}>💡 {vocabCards[currentCardIndex].context}</p>}
                </div>
              )}
            </div>
            {showAnswer && (
              <div style={S.rateRow}>
                <p style={{fontSize:"0.78rem",color:"#6B7280",margin:"0 0 0.65rem",textAlign:"center"}}>How well did you know this?</p>
                <div style={{display:"flex",gap:"0.5rem",justifyContent:"center",flexWrap:"wrap"}}>
                  <button onClick={() => handleFlashcardRate(0)} style={{...S.rateBtn, borderColor:"#FCA5A5", color:"#EF4444", backgroundColor:"#FEF2F2"}}>Again</button>
                  <button onClick={() => handleFlashcardRate(1)} style={{...S.rateBtn, borderColor:"#FDE68A", color:"#92400E", backgroundColor:"#FFFBEB"}}>Hard</button>
                  <button onClick={() => handleFlashcardRate(2)} style={{...S.rateBtn, borderColor:"#93C5FD", color:"#1E40AF", backgroundColor:"#EFF6FF"}}>Good</button>
                  <button onClick={() => handleFlashcardRate(3)} style={{...S.rateBtn, borderColor:"#6EE7B7", color:"#065F46", backgroundColor:"#ECFDF5"}}>Easy!</button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ─── QUIZ MODE ────────────────────────────── */}
        {activeTab === "practice" && quizMode && vocabCards.length >= 2 && (
          <section style={S.fcSection}>
            <div style={S.fcHeader}>
              <span style={S.fcProgress}>Question {currentCardIndex + 1} of {Math.min(vocabCards.length, 10)}</span>
              <div style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
                <span style={{fontSize:"0.82rem",fontWeight:600,color:"#059669"}}>{quizScore.correct}/{quizScore.total}</span>
                <button onClick={() => setQuizMode(false)} style={S.exitBtn}><X size={14}/> Exit</button>
              </div>
            </div>
            {/* Score bar */}
            <div style={{height:4, backgroundColor:"#E5E7EB", borderRadius:2, marginBottom:"1.25rem", overflow:"hidden"}}>
              <div style={{height:"100%", borderRadius:2, backgroundColor:"#059669", transition:"width 0.3s",
                width: `${(currentCardIndex / Math.min(vocabCards.length, 10)) * 100}%`}}/>
            </div>
            <div style={S.quizCard}>
              <p style={S.fcLabel}>TRANSLATE TO ENGLISH</p>
              <p style={S.fcWord}>{vocabCards[currentCardIndex]?.german}</p>
              <button onClick={(e) => { e.stopPropagation(); speakPhrase(vocabCards[currentCardIndex]?.german, "qz"); }}
                style={{...S.iconBtn, margin:"0.5rem auto", padding:"0.4rem 0.8rem"}}><Volume2 size={15}/> Listen</button>
              <div style={{display:"flex",gap:"0.5rem",marginTop:"1rem"}}>
                <input type="text" placeholder="Type your answer…" value={quizAnswer} onChange={e => setQuizAnswer(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !quizResult) checkQuizAnswer(); }}
                  style={{...S.input, flex:1, textAlign:"center", fontSize:"1rem"}} disabled={!!quizResult}
                  autoFocus/>
                {!quizResult && <button onClick={checkQuizAnswer} style={S.primaryBtn}>Check</button>}
              </div>
              {quizResult && (
                <div style={{marginTop:"1.25rem",textAlign:"center"}}>
                  <div style={{
                    display:"inline-flex", alignItems:"center", gap:"0.5rem",
                    padding:"0.5rem 1.25rem", borderRadius:"2rem",
                    backgroundColor: quizResult === "correct" ? "#ECFDF5" : "#FEF2F2",
                    color: quizResult === "correct" ? "#059669" : "#DC2626",
                    fontSize:"0.95rem", fontWeight:700, marginBottom:"0.75rem"
                  }}>
                    {quizResult === "correct" ? <><CheckCircle size={16}/> Correct!</> : <><X size={16}/> Not quite</>}
                  </div>
                  {quizResult === "wrong" && <p style={{fontSize:"0.88rem",color:"#374151",margin:"0 0 0.75rem"}}>The answer was: <strong>{vocabCards[currentCardIndex]?.english}</strong></p>}
                  <button onClick={nextQuizQuestion} style={S.primaryBtn}>
                    {currentCardIndex < Math.min(vocabCards.length - 1, 9) ? "Next Question →" : "Finish Quiz 🎉"}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════
           TAB: STUDY PLANS
           ═══════════════════════════════════════════════ */}
        {activeTab === "plans" && (
          <section style={S.section}>
            <div style={S.sectionHeader}>
              <div>
                <h2 style={S.sectionTitle}>Study Plans</h2>
                <p style={S.sectionHint}>Set goals for topics you want to study in each city. Check them off as you complete them.</p>
              </div>
              <button onClick={() => setShowPlanForm(v => !v)} style={S.primaryBtn}>
                <Plus size={15}/> {showPlanForm ? "Cancel" : "New Plan"}
              </button>
            </div>

            {showPlanForm && (
              <div style={S.formCard}>
                {error && <p style={S.errorText}>{error}</p>}
                <div style={S.formRow}>
                  <select value={region} onChange={e => setRegion(e.target.value)} style={S.input}>
                    {cities.map((c, i) => (
                      <option key={i} value={c} style={c !== "Select a City" ? {backgroundColor: countryColors[cityCountryMap[c]] || "#fff"} : {}}>
                        {c === "Select a City" ? c : (countryFlags[cityCountryMap[c]] || "") + " " + c}
                      </option>
                    ))}
                  </select>
                  <input type="text" placeholder="Topic (e.g., Ordering food)" value={topic} onChange={e => setTopic(e.target.value)} style={S.input}
                    onKeyDown={e => { if (e.key === "Enter") handleAddReservation(); }}/>
                </div>
                <div style={S.formRow}>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{...S.input, maxWidth:180}}/>
                  <button onClick={handleAddReservation} style={S.primaryBtn}>Add Plan</button>
                </div>
              </div>
            )}

            {reservations.length > 0 ? (
              <div style={S.planList}>
                {reservations.map(item => (
                  <div key={item.id} style={{...S.planCard, ...(item.completed ? S.planDone : {})}}>
                    <button onClick={() => handleToggleComplete(item.id)} style={item.completed ? S.checkDone : S.checkBtn} title={item.completed ? "Mark incomplete" : "Mark complete"}>
                      <CheckCircle size={22}/>
                    </button>
                    <div style={{flex:1}}>
                      <div style={S.planCity}>
                        <span style={{...S.countryDot, backgroundColor: countryColors[cityCountryMap[item.city]] || "#E5E7EB"}}>{countryFlags[cityCountryMap[item.city]] || ""}</span>
                        <span style={item.completed ? S.textDone : {}}>{item.city}</span>
                      </div>
                      <div style={{...S.planTopic, ...(item.completed ? {textDecoration:"line-through",color:"#9CA3AF"} : {})}}>{item.topic}</div>
                      <div style={S.planDate}><Calendar size={12}/> {new Date(item.date).toLocaleDateString()}</div>
                    </div>
                    <button onClick={() => handleDeleteReservation(item.id)} style={S.deleteBtn} title="Remove"><Trash2 size={15}/></button>
                  </div>
                ))}
              </div>
            ) : !showPlanForm ? (
              <div style={S.emptyState}>
                <Target size={36} color="#D1D5DB"/>
                <p style={S.emptyTitle}>No study plans yet</p>
                <p style={S.emptyHint}>Create a plan to track what topics you want to study in each city.</p>
                <div style={{display:"flex",flexDirection:"column",gap:"0.35rem",marginTop:"0.75rem",width:"100%",maxWidth:320}}>
                  <p style={{fontSize:"0.72rem",fontWeight:700,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.06em",margin:0}}>💡 Ideas to get started</p>
                  {[
                    {city:"Munich",topic:"Ordering food at restaurants"},
                    {city:"Berlin",topic:"Public transit phrases"},
                    {city:"Vienna",topic:"University enrollment vocabulary"},
                  ].map((ex,i) => (
                    <button key={i} onClick={() => { setRegion(ex.city); setTopic(ex.topic); setShowPlanForm(true); }}
                      style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.55rem 0.85rem",backgroundColor:"#F8FAFC",borderRadius:"0.5rem",border:"1px solid #E2E8F0",cursor:"pointer",textAlign:"left",fontSize:"0.8rem",color:"#475569",fontWeight:500,transition:"all 0.15s",width:"100%"}}>
                      <MapPin size={13} color="#94A3B8"/>
                      <span><strong style={{color:"#0021A5"}}>{ex.city}</strong> — {ex.topic}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        )}

        {/* ═══════════════════════════════════════════════
           TAB: PHRASE LIBRARY
           ═══════════════════════════════════════════════ */}
        {activeTab === "library" && (
          <section style={S.section}>
            <h2 style={S.sectionTitle}>Phrase Library</h2>
            <p style={S.sectionHint}>Listen, bookmark, or add to your flashcard deck.</p>

            {/* Search bar */}
            <div style={{position:"relative",marginBottom:"0.85rem"}}>
              <Search size={16} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF"}}/>
              <input type="text" placeholder="Search German or English phrases…" value={phraseSearch} onChange={e=>setPhraseSearch(e.target.value)}
                style={{...S.input,paddingLeft:"2.25rem",width:"100%",boxSizing:"border-box"}}/>
              {phraseSearch && <button onClick={()=>setPhraseSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",padding:0,display:"flex"}}><X size={14}/></button>}
            </div>

            {/* Category multi-select pills */}
            <div style={{marginBottom:"0.85rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.35rem",marginBottom:"0.4rem"}}>
                <span style={{fontSize:"0.68rem",fontWeight:600,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.04em"}}>Category</span>
                {resourceCategory.size > 0 && (
                  <button onClick={()=>setResourceCategory(new Set())} style={{display:"inline-flex",alignItems:"center",gap:"0.15rem",padding:"0.1rem 0.4rem",borderRadius:9999,border:"1px solid #FCA5A5",fontSize:"0.6rem",fontWeight:600,cursor:"pointer",backgroundColor:"#FEF2F2",color:"#DC2626",lineHeight:1.4}}>
                    <X size={9}/> Clear
                  </button>
                )}
              </div>
              <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
                {CATEGORIES.map(c=>{
                  const isOn = resourceCategory.has(c);
                  return (
                    <button key={c} onClick={()=>setResourceCategory(prev=>{const s=new Set(prev);s.has(c)?s.delete(c):s.add(c);return s;})}
                      style={{display:"inline-flex",alignItems:"center",padding:"0.32rem 0.7rem",borderRadius:9999,
                        border:isOn?"1.5px solid #0021A5":"1px solid #E5E7EB",
                        backgroundColor:isOn?"#EFF6FF":"#fff",
                        color:isOn?"#0021A5":"#4B5563",
                        cursor:"pointer",fontSize:"0.72rem",fontWeight:isOn?700:500,transition:"all 0.15s",
                        boxShadow:isOn?"0 1px 4px rgba(0,33,165,0.12)":"none",
                        textTransform:"capitalize"}}>
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Type multi-select pills */}
            <div style={{marginBottom:"0.85rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.35rem",marginBottom:"0.4rem"}}>
                <span style={{fontSize:"0.68rem",fontWeight:600,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.04em"}}>Type</span>
                {resourceType.size > 0 && (
                  <button onClick={()=>setResourceType(new Set())} style={{display:"inline-flex",alignItems:"center",gap:"0.15rem",padding:"0.1rem 0.4rem",borderRadius:9999,border:"1px solid #FCA5A5",fontSize:"0.6rem",fontWeight:600,cursor:"pointer",backgroundColor:"#FEF2F2",color:"#DC2626",lineHeight:1.4}}>
                    <X size={9}/> Clear
                  </button>
                )}
              </div>
              <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
                {[
                  {value:"standard",label:"🇩🇪 Standard",bg:"#D1FAE5",color:"#065F46",activeBg:"#065F46"},
                  {value:"regional",label:"🗺️ Regional",bg:"#F3E8FF",color:"#6B21A8",activeBg:"#6B21A8"},
                  {value:"slang",label:"🗣️ Local Slang",bg:"#FEF3C7",color:"#92400E",activeBg:"#92400E"},
                ].map(t=>{
                  const isOn = resourceType.has(t.value);
                  return (
                    <button key={t.value} onClick={()=>setResourceType(prev=>{const s=new Set(prev);s.has(t.value)?s.delete(t.value):s.add(t.value);return s;})}
                      style={{display:"inline-flex",alignItems:"center",gap:"0.25rem",padding:"0.35rem 0.75rem",borderRadius:9999,
                        border:isOn?`1.5px solid ${t.activeBg}`:`1px solid ${t.bg}`,
                        backgroundColor:isOn?t.activeBg:t.bg,
                        color:isOn?"#fff":t.color,
                        cursor:"pointer",fontSize:"0.72rem",fontWeight:isOn?700:600,transition:"all 0.15s",
                        boxShadow:isOn?`0 1px 4px ${t.activeBg}33`:"none"}}>
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Country multi-select pills */}
            <div style={{marginBottom:"0.85rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.35rem",marginBottom:"0.4rem"}}>
                <span style={{fontSize:"0.68rem",fontWeight:600,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.04em"}}>Country</span>
                {resourceCountry.size > 0 && (
                  <button onClick={()=>setResourceCountry(new Set())} style={{display:"inline-flex",alignItems:"center",gap:"0.15rem",padding:"0.1rem 0.4rem",borderRadius:9999,border:"1px solid #FCA5A5",fontSize:"0.6rem",fontWeight:600,cursor:"pointer",backgroundColor:"#FEF2F2",color:"#DC2626",lineHeight:1.4}}>
                    <X size={9}/> Clear
                  </button>
                )}
              </div>
              <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
                {[
                  {value:"DE",flag:"🇩🇪",label:"Germany",activeBg:"#0021A5"},
                  {value:"AT",flag:"🇦🇹",label:"Austria",activeBg:"#DC2626"},
                  {value:"CH",flag:"🇨🇭",label:"Switzerland",activeBg:"#DC2626"},
                ].map(c=>{
                  const isOn = resourceCountry.has(c.value);
                  return (
                    <button key={c.value} onClick={()=>setResourceCountry(prev=>{const s=new Set(prev);s.has(c.value)?s.delete(c.value):s.add(c.value);return s;})}
                      style={{display:"inline-flex",alignItems:"center",gap:"0.3rem",padding:"0.4rem 0.85rem",borderRadius:9999,
                        border:isOn?`1.5px solid ${c.activeBg}`:"1.5px solid #E5E7EB",
                        backgroundColor:isOn?c.activeBg:"#fff",
                        color:isOn?"#fff":"#374151",
                        cursor:"pointer",fontSize:"0.75rem",fontWeight:600,transition:"all 0.15s",
                        boxShadow:isOn?`0 2px 6px ${c.activeBg}33`:"none"}}>
                      {c.flag} {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* My Cities toggle + city multi-select pills */}
            {(() => {
              const stored = localStorage.getItem("myCities");
              const userMyCities = stored ? JSON.parse(stored) : [];
              const cityNameFromSlug = (slug) => {
                const entry = Object.entries(citySlugMap).find(([, v]) => v === slug);
                return entry ? entry[0] : slug;
              };
              return (
                <div style={{marginBottom:"1rem"}}>
                  {/* My Cities toggle */}
                  {userMyCities.length > 0 && (
                    <div style={{marginBottom:"0.65rem"}}>
                      <button onClick={() => { setMyCitiesOnly(!myCitiesOnly); if (!myCitiesOnly) setResourceCities([]); }}
                        style={{display:"inline-flex",alignItems:"center",gap:"0.35rem",padding:"0.4rem 0.85rem",borderRadius:"2rem",border: myCitiesOnly ? "1.5px solid #0021A5" : "1px solid #CBD5E1",backgroundColor: myCitiesOnly ? "#EFF6FF" : "#fff",color: myCitiesOnly ? "#0021A5" : "#64748B",cursor:"pointer",fontSize:"0.78rem",fontWeight:600,transition:"all 0.15s"}}>
                        <MapPin size={13}/> My Cities {myCitiesOnly ? "✓" : ""}
                      </button>
                      {myCitiesOnly && (
                        <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginTop:"0.45rem"}}>
                          {userMyCities.map(slug => (
                            <span key={slug} style={{display:"inline-flex",alignItems:"center",gap:"0.25rem",fontSize:"0.68rem",fontWeight:600,color:"#0021A5",backgroundColor:"#EFF6FF",padding:"0.18rem 0.55rem",borderRadius:9999,border:"1px solid #BFDBFE"}}>
                              {countryFlags[cityCountryMap[cityNameFromSlug(slug)]] || "📍"} {cityNameFromSlug(slug)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* City multi-select pills */}
                  {!myCitiesOnly && (
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginBottom:"0.4rem"}}>
                        <span style={{fontSize:"0.72rem",fontWeight:600,color:"#94A3B8"}}>Filter by city:</span>
                        {resourceCities.length > 0 && (
                          <button onClick={() => setResourceCities([])} style={{display:"inline-flex",alignItems:"center",gap:"0.2rem",padding:"0.15rem 0.5rem",borderRadius:9999,border:"1px solid #FCA5A5",fontSize:"0.65rem",fontWeight:600,cursor:"pointer",backgroundColor:"#FEF2F2",color:"#DC2626"}}>
                            <X size={10}/> Clear
                          </button>
                        )}
                      </div>
                      <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
                        {["DE","AT","CH"].map(cc => {
                          const countryCities = cities.filter(c => c !== "Select a City" && cityCountryMap[c] === cc);
                          if (countryCities.length === 0) return null;
                          return countryCities.map(cityName => {
                            const slug = citySlugMap[cityName] || cityName.toLowerCase();
                            const isOn = resourceCities.includes(slug);
                            return (
                              <button key={slug} onClick={() => setResourceCities(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug])}
                                style={{display:"inline-flex",alignItems:"center",gap:"0.25rem",padding:"0.3rem 0.65rem",borderRadius:9999,
                                  border: isOn ? "1.5px solid #0021A5" : "1px solid #E2E8F0",
                                  backgroundColor: isOn ? "#EFF6FF" : "#fff",
                                  color: isOn ? "#0021A5" : "#64748B",
                                  cursor:"pointer",fontSize:"0.7rem",fontWeight: isOn ? 700 : 500,transition:"all 0.15s",
                                  boxShadow: isOn ? "0 1px 4px rgba(0,33,165,0.15)" : "none"}}>
                                {countryFlags[cc]} {cityName}
                              </button>
                            );
                          });
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Active filter summary */}
            {(resourceCategory.size > 0 || resourceType.size > 0 || resourceCountry.size > 0 || resourceCities.length > 0 || myCitiesOnly || phraseSearch) && (
              <div style={{display:"flex",alignItems:"center",gap:"0.35rem",flexWrap:"wrap",marginBottom:"1rem",padding:"0.55rem 0.85rem",backgroundColor:"#F8FAFC",borderRadius:"0.6rem",border:"1px solid #E2E8F0"}}>
                <span style={{fontSize:"0.72rem",fontWeight:600,color:"#64748B"}}>Active filters:</span>
                {phraseSearch && <span style={{fontSize:"0.65rem",fontWeight:600,color:"#0021A5",backgroundColor:"#EFF6FF",padding:"0.15rem 0.45rem",borderRadius:9999,border:"1px solid #BFDBFE"}}>🔍 "{phraseSearch}"</span>}
                {[...resourceCategory].map(c => <span key={c} style={{fontSize:"0.65rem",fontWeight:600,color:"#065F46",backgroundColor:"#D1FAE5",padding:"0.15rem 0.45rem",borderRadius:9999,textTransform:"capitalize"}}>📂 {c}</span>)}
                {[...resourceType].map(t => <span key={t} style={{fontSize:"0.65rem",fontWeight:600,color:"#6B21A8",backgroundColor:"#F3E8FF",padding:"0.15rem 0.45rem",borderRadius:9999}}>{t}</span>)}
                {[...resourceCountry].map(c => <span key={c} style={{fontSize:"0.65rem",fontWeight:600,color:"#1E40AF",backgroundColor:"#DBEAFE",padding:"0.15rem 0.45rem",borderRadius:9999}}>{countryFlags[c]} {c}</span>)}
                {resourceCities.length > 0 && <span style={{fontSize:"0.65rem",fontWeight:600,color:"#0021A5",backgroundColor:"#EFF6FF",padding:"0.15rem 0.45rem",borderRadius:9999,border:"1px solid #BFDBFE"}}>📍 {resourceCities.length} {resourceCities.length === 1 ? "city" : "cities"}</span>}
                {myCitiesOnly && <span style={{fontSize:"0.65rem",fontWeight:600,color:"#0021A5",backgroundColor:"#EFF6FF",padding:"0.15rem 0.45rem",borderRadius:9999}}>⭐ My Cities</span>}
                <button onClick={() => { setResourceCategory(new Set()); setResourceType(new Set()); setResourceCountry(new Set()); setResourceCities([]); setMyCitiesOnly(false); setPhraseSearch(""); }}
                  style={{display:"inline-flex",alignItems:"center",gap:"0.2rem",padding:"0.15rem 0.5rem",borderRadius:9999,border:"1px solid #FCA5A5",fontSize:"0.65rem",fontWeight:600,cursor:"pointer",backgroundColor:"#FEF2F2",color:"#DC2626",marginLeft:"auto"}}>
                  <X size={10}/> Clear all
                </button>
              </div>
            )}

            {phrasesLoading ? (
              <div style={S.emptyState}><p style={{color:"#6B7280"}}>Loading phrases…</p></div>
            ) : (() => {
              const SLUG_TO_COUNTRY = {
                berlin:"DE",munich:"DE",hamburg:"DE",stuttgart:"DE",aachen:"DE",bonn:"DE",detmold:"DE",ebs:"DE",eltville:"DE",jena:"DE",lemgo:"DE",mannheim:"DE",osnabruck:"DE",vallendar:"DE",wurzburg:"DE",leipzig:"DE",
                vienna:"AT",salzburg:"AT",graz:"AT",
                zurich:"CH",bern:"CH",rapperswil:"CH",winterthur:"CH"
              };
              let filtered = phrases;
              if (phraseSearch) {
                const q = phraseSearch.toLowerCase();
                filtered = filtered.filter(p =>
                  (p.german_phrase || "").toLowerCase().includes(q) ||
                  (p.english_translation || "").toLowerCase().includes(q) ||
                  (p.category || "").toLowerCase().includes(q)
                );
              }
              if (resourceType.size > 0) {
                filtered = filtered.filter(p => resourceType.has(p.phrase_type || "standard"));
              }
              if (resourceCountry.size > 0) {
                filtered = filtered.filter(p =>
                  p.city_slugs?.some(s => resourceCountry.has(SLUG_TO_COUNTRY[s]))
                );
              }
              if (resourceCategory.size > 0) {
                filtered = filtered.filter(p => resourceCategory.has(p.category));
              }
              if (resourceCities.length > 0) {
                filtered = filtered.filter(p =>
                  p.city_slugs?.some(s => resourceCities.includes(s))
                );
              }
              if (myCitiesOnly) {
                const stored = localStorage.getItem("myCities");
                const userMyCities = stored ? JSON.parse(stored) : [];
                if (userMyCities.length > 0) {
                  filtered = filtered.filter(p => p.city_slugs?.some(s => userMyCities.includes(s)));
                }
              }
              return filtered.length === 0 ? (
                <div style={S.emptyState}><Languages size={36} color="#D1D5DB"/><p style={S.emptyTitle}>No phrases found</p><p style={S.emptyHint}>Try a different filter combination.</p></div>
              ) : (
              <div style={S.phraseGrid}>
                {filtered.map((p, i) => {
                  const inDeck = vocabCards.some(c => c.german === p.german_phrase);
                  const pType = p.phrase_type || "standard";
                  const typeBadge = pType === "regional"
                    ? { label:"🗺️ Regional", bg:"#F3E8FF", color:"#6B21A8", border:"#DDD6FE" }
                    : pType === "slang"
                      ? { label:"🗣️ Local Slang", bg:"#FEF3C7", color:"#92400E", border:"#FDE68A" }
                      : { label:"🇩🇪 Standard", bg:"#D1FAE5", color:"#065F46", border:"#A7F3D0" };
                  return (
                    <div key={p._id || i} style={{...S.phraseCard, borderLeft: `3px solid ${typeBadge.border}`}}>
                      <div style={S.phraseTop}>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginBottom:"0.25rem"}}>
                            <span style={{fontSize:"0.62rem",fontWeight:700,backgroundColor:typeBadge.bg,color:typeBadge.color,padding:"0.12rem 0.45rem",borderRadius:9999}}>{typeBadge.label}</span>
                          </div>
                          <p style={S.phraseDE}>{p.german_phrase}</p>
                        </div>
                        <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
                          <button onClick={() => speakPhrase(p.german_phrase, p._id || i)}
                            style={{...S.iconBtn, ...(speakingId === (p._id || i) ? {backgroundColor:"#0021A5",color:"#fff"} : {})}}>
                            <Volume2 size={14}/>
                          </button>
                          <button onClick={() => toggleBookmark(p._id)}
                            style={{...S.iconBtn, border: bookmarkedIds.has(p._id) ? "1px solid #2563EB" : "1px solid #D1D5DB", backgroundColor: bookmarkedIds.has(p._id) ? "#EFF6FF" : "transparent"}}
                            title={bookmarkedIds.has(p._id) ? "Remove bookmark" : "Bookmark"}>
                            {bookmarkedIds.has(p._id) ? <Bookmark size={14} fill="#2563EB" color="#2563EB"/> : <Bookmark size={14} color="#9CA3AF"/>}
                          </button>
                        </div>
                      </div>
                      <p style={S.phraseEN}>{p.english_translation}</p>
                      {p.pronunciation && <p style={S.phrasePr}>{p.pronunciation}</p>}
                      {p.usage_context && <p style={S.phraseCtx}>💡 {p.usage_context}</p>}
                      {p.example_sentence && <p style={{fontSize:"0.78rem",color:"#4B5563",fontStyle:"italic",margin:"0 0 0.35rem",lineHeight:1.4}}>"{p.example_sentence}"</p>}
                      {p.cultural_note && <p style={{fontSize:"0.75rem",color:"#92400E",backgroundColor:"#FFFBEB",padding:"4px 8px",borderRadius:"6px",margin:"0 0 0.5rem",lineHeight:1.4}}>🌍 {p.cultural_note}</p>}
                      <div style={S.phraseTags}>
                        {p.category && <span style={S.phraseTag}>{p.category}</span>}
                        {p.register && <span style={S.phraseTag}>{p.register}</span>}
                        {p.difficulty_level && <span style={{...S.phraseTag,backgroundColor:"#DBEAFE",color:"#1E40AF"}}>Lvl {p.difficulty_level}</span>}
                        {p.dialect_name && <span style={{...S.phraseTag,backgroundColor:"#F3E8FF",color:"#6B21A8"}}>{p.dialect_name}</span>}
                      </div>
                      {p.city_slugs?.length > 0 && <p style={S.phraseCities}><MapPin size={11}/> {p.city_slugs.join(", ")}</p>}
                      <button onClick={() => addPhraseToVocab(p)} disabled={inDeck} style={{...S.addToDeck, opacity: inDeck ? 0.5 : 1}}>
                        {inDeck ? <><CheckCircle size={13}/> In your deck</> : <><Plus size={13}/> Add to Flashcards</>}
                      </button>
                    </div>
                  );
                })}
              </div>
              );
            })()}
          </section>
        )}

        {/* ═══════════════════════════════════════════════
           TAB: SAVED PHRASES
           ═══════════════════════════════════════════════ */}
        {activeTab === "saved" && (
          <section style={S.section}>
            <h2 style={S.sectionTitle}>Saved Phrases</h2>
            <p style={S.sectionHint}>Phrases you've bookmarked from the library and city guides.</p>

            {!userEmail ? (
              <div style={S.emptyState}>
                <p style={S.emptyTitle}>Please log in to see your saved phrases</p>
                <button onClick={() => navigate("/login")} style={{...S.primaryBtn,marginTop:"0.5rem"}}>Log In</button>
              </div>
            ) : savedLoading ? (
              <div style={S.emptyState}><p style={{color:"#6B7280"}}>Loading your saved phrases…</p></div>
            ) : savedPhrases.length === 0 ? (
              <div style={S.emptyState}>
                <Bookmark size={36} color="#D1D5DB"/>
                <p style={S.emptyTitle}>No saved phrases yet</p>
                <p style={S.emptyHint}>Browse the Phrase Library and tap the bookmark icon to save phrases here.</p>
                <button onClick={() => setActiveTab("library")} style={{...S.primaryBtn,marginTop:"0.5rem"}}><Languages size={15}/> Browse Phrases</button>
              </div>
            ) : (
              <>
                {/* Search */}
                <div style={{position:"relative",marginBottom:"0.75rem"}}>
                  <Search size={16} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF"}}/>
                  <input type="text" placeholder="Search saved phrases…" value={savedFilter}
                    onChange={e => setSavedFilter(e.target.value)}
                    style={{...S.input,paddingLeft:"2.25rem",width:"100%",boxSizing:"border-box"}}/>
                  {savedFilter && <button onClick={()=>setSavedFilter("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",padding:0,display:"flex"}}><X size={14}/></button>}
                </div>

                {/* Category multi-select pills */}
                {savedCategories.length > 0 && (
                  <div style={{marginBottom:"0.65rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.35rem",marginBottom:"0.35rem"}}>
                      <span style={{fontSize:"0.68rem",fontWeight:600,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.04em"}}>Category</span>
                      {savedCategoryFilter.size > 0 && (
                        <button onClick={()=>setSavedCategoryFilter(new Set())} style={{display:"inline-flex",alignItems:"center",gap:"0.15rem",padding:"0.1rem 0.4rem",borderRadius:9999,border:"1px solid #FCA5A5",fontSize:"0.6rem",fontWeight:600,cursor:"pointer",backgroundColor:"#FEF2F2",color:"#DC2626",lineHeight:1.4}}>
                          <X size={9}/> Clear
                        </button>
                      )}
                    </div>
                    <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
                      {savedCategories.map(c=>{
                        const isOn = savedCategoryFilter.has(c);
                        return (
                          <button key={c} onClick={()=>setSavedCategoryFilter(prev=>{const s=new Set(prev);s.has(c)?s.delete(c):s.add(c);return s;})}
                            style={{display:"inline-flex",alignItems:"center",padding:"0.3rem 0.65rem",borderRadius:9999,
                              border:isOn?"1.5px solid #0021A5":"1px solid #E5E7EB",
                              backgroundColor:isOn?"#EFF6FF":"#fff",
                              color:isOn?"#0021A5":"#4B5563",
                              cursor:"pointer",fontSize:"0.72rem",fontWeight:isOn?700:500,transition:"all 0.15s",
                              textTransform:"capitalize"}}>
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Type multi-select pills */}
                <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",alignItems:"center",marginBottom:"1rem"}}>
                  <span style={{fontSize:"0.68rem",fontWeight:600,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.04em",marginRight:"0.15rem"}}>Type</span>
                  {[
                    { val:"standard", label:"📖 Standard", bg:"#D1FAE5", color:"#065F46", activeBg:"#065F46" },
                    { val:"regional", label:"🗺️ Regional", bg:"#F3E8FF", color:"#6B21A8", activeBg:"#6B21A8" },
                    { val:"slang", label:"🗣️ Local Slang", bg:"#FEF3C7", color:"#92400E", activeBg:"#92400E" },
                  ].map(t => {
                    const active = savedTypeFilter.has(t.val);
                    return (
                      <button key={t.val} onClick={() => setSavedTypeFilter(prev=>{const s=new Set(prev);s.has(t.val)?s.delete(t.val):s.add(t.val);return s;})}
                        style={{display:"inline-flex",alignItems:"center",gap:"0.25rem",padding:"0.3rem 0.7rem",borderRadius:9999,fontSize:"0.72rem",fontWeight:active?700:600,cursor:"pointer",transition:"all 0.15s",
                          border:active?`1.5px solid ${t.activeBg}`:`1px solid ${t.bg}`,
                          backgroundColor:active?t.activeBg:t.bg, color:active?"#fff":t.color,
                          boxShadow:active?`0 1px 4px ${t.activeBg}33`:"none"}}>
                        {t.label}
                      </button>
                    );
                  })}
                  {(savedTypeFilter.size > 0 || savedCategoryFilter.size > 0 || savedFilter) && (
                    <button onClick={() => { setSavedTypeFilter(new Set()); setSavedCategoryFilter(new Set()); setSavedFilter(""); }}
                      style={{display:"inline-flex",alignItems:"center",gap:"0.2rem",padding:"0.3rem 0.6rem",borderRadius:9999,border:"1px solid #FCA5A5",fontSize:"0.7rem",fontWeight:600,cursor:"pointer",backgroundColor:"#FEF2F2",color:"#DC2626"}}>
                      <X size={11}/> Clear all
                    </button>
                  )}
                </div>

                <p style={{fontSize:"0.82rem",color:"#6B7280",marginBottom:"1rem"}}>{filteredSaved.length} phrase{filteredSaved.length !== 1 ? "s" : ""} saved</p>

                {Object.entries(savedByCategory).map(([category, bks]) => (
                  <div key={category} style={{marginBottom:"1.5rem"}}>
                    <h3 style={S.categoryHeading}>{category} ({bks.length})</h3>
                    <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
                      {bks.map(bookmark => {
                        const p = bookmark.phrase || {};
                        const pid = bookmark.phrase_id || (p && p._id);
                        return (
                          <div key={bookmark._id} style={S.phraseCard}>
                            <div style={S.phraseTop}>
                              <div style={{flex:1}}>
                                <p style={S.phraseDE}>{p.german_phrase}</p>
                                {p.pronunciation && <p style={S.phrasePr}>{p.pronunciation}</p>}
                                <p style={S.phraseEN}>{p.english_translation}</p>
                              </div>
                              <div style={{display:"flex",flexDirection:"column",gap:"0.4rem",alignItems:"center"}}>
                                <button onClick={() => speakPhrase(p.german_phrase, bookmark._id)}
                                  style={{...S.iconBtn, ...(speakingId===bookmark._id ? {backgroundColor:"#DBEAFE",color:"#2563EB"} : {})}}
                                  title={speakingId===bookmark._id?"Stop":"Listen"}>
                                  <Volume2 size={15}/>
                                </button>
                                <button onClick={() => removeSavedPhrase(bookmark._id, pid)} style={S.deleteBtn} title="Remove bookmark">
                                  <Trash2 size={15}/>
                                </button>
                              </div>
                            </div>
                            <div style={S.phraseTags}>
                              {p.register && <span style={S.phraseTag}>{p.register}</span>}
                              {p.difficulty_level && <span style={{...S.phraseTag, backgroundColor:"#DBEAFE", color:"#1E40AF"}}>Lvl {p.difficulty_level}</span>}
                              {p.phrase_type && p.phrase_type !== "standard" && <span style={{...S.phraseTag,backgroundColor:"#F3E8FF",color:"#6B21A8"}}>{p.phrase_type}</span>}
                            </div>
                            {p.city_slugs?.length > 0 && <p style={S.phraseCities}><MapPin size={11}/> {p.city_slugs.join(", ")}</p>}
                            {p.usage_context && <p style={S.phraseCtx}>💡 {p.usage_context}</p>}
                            {p.example_sentence && <p style={{fontSize:"0.78rem",color:"#4B5563",fontStyle:"italic",margin:"0.25rem 0",lineHeight:1.4}}>"{p.example_sentence}"</p>}
                            {p.cultural_note && <p style={{fontSize:"0.78rem",color:"#92400E",backgroundColor:"#FFFBEB",padding:"0.35rem 0.65rem",borderRadius:"0.4rem",margin:"0.25rem 0",lineHeight:1.4}}>🌍 {p.cultural_note}</p>}
                            <button onClick={() => addPhraseToVocab({german_phrase:p.german_phrase,english_translation:p.english_translation,usage_context:p.usage_context})}
                              disabled={vocabCards.some(c=>c.german===p.german_phrase)}
                              style={{...S.addToDeck,marginTop:"0.5rem",opacity:vocabCards.some(c=>c.german===p.german_phrase)?0.5:1}}>
                              {vocabCards.some(c=>c.german===p.german_phrase) ? <><CheckCircle size={13}/> In your deck</> : <><Plus size={13}/> Add to Flashcards</>}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   STYLES
   ══════════════════════════════════════════════════════ */
const S = {
  /* Page shell */
  page:{ minHeight:"100vh", backgroundColor:"#F8FAFC", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif" },

  /* Header / Nav — blue text, no gradients */
  header:{ backgroundColor:"rgba(255,255,255,0.92)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:"1px solid rgba(229,231,235,0.5)", position:"sticky", top:0, zIndex:1000, boxShadow:"0 1px 3px rgba(0,0,0,0.04)" },
  headerInner:{ maxWidth:1280, margin:"0 auto", padding:"0.2rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center" },
  headerLeft:{ display:"flex", alignItems:"center", gap:"0.6rem", cursor:"pointer" },
  brand:{ fontSize:"1.05rem", fontWeight:800, color:"#0021A5", letterSpacing:"-0.01em" },
  headerRight:{ display:"flex", gap:"0.15rem", alignItems:"center", flexWrap:"wrap", background:"#F3F4F6", borderRadius:"0.65rem", padding:"0.2rem" },
  navBtn:{ display:"flex", alignItems:"center", gap:"0.3rem", padding:"0.45rem 0.85rem", border:"none", borderRadius:"0.5rem", backgroundColor:"transparent", color:"#6B7280", cursor:"pointer", fontSize:"0.78rem", fontWeight:500, transition:"all 0.2s" },
  profileBtn:{ display:"flex", alignItems:"center", gap:"0.3rem", padding:"0.45rem 1.1rem", border:"none", borderRadius:"0.5rem", background:"linear-gradient(135deg,#FA4616,#FF6B35)", color:"#fff", cursor:"pointer", fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.02em", boxShadow:"0 2px 8px rgba(250,70,22,0.25)", marginLeft:"0.35rem" },

  /* Body */
  body:{ maxWidth:800, margin:"0 auto", padding:"1.5rem 1.5rem 3rem" },

  /* Toast */
  toast:{ position:"fixed", top:"80px", left:"50%", transform:"translateX(-50%)", padding:"0.65rem 1.5rem", borderRadius:"2rem", backgroundColor:"#059669", color:"#fff", fontSize:"0.88rem", fontWeight:600, zIndex:2000, boxShadow:"0 8px 30px rgba(5,150,105,0.3)", animation:"slideDown 0.3s ease-out" },

  /* Smart Header */
  smartHeader:{ background:"#fff", borderRadius:"1rem", padding:"1.5rem", marginBottom:"1.25rem", border:"1px solid #E2E8F0", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" },
  shTop:{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"1rem", marginBottom:"1rem" },
  shGreeting:{ fontSize:"0.82rem", color:"#64748B", margin:"0 0 0.15rem", fontWeight:500 },
  shTitle:{ fontSize:"1.5rem", fontWeight:800, color:"#0F172A", margin:0, letterSpacing:"-0.02em" },
  streakBadge:{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.5rem 0.85rem", borderRadius:"0.75rem", background:"#FFF7ED", border:"1px solid #FED7AA" },
  streakNum:{ fontSize:"1.1rem", fontWeight:800, color:"#EA580C", lineHeight:1 },
  streakLabel:{ fontSize:"0.62rem", color:"#9A3412", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.04em" },

  /* Goal ring row */
  goalRow:{ display:"flex", alignItems:"center", gap:"1rem" },
  goalVisual:{ position:"relative", width:44, height:44, flexShrink:0 },
  goalCenter:{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"0.78rem", fontWeight:700, color:"#0F172A" },
  goalText:{ display:"flex", alignItems:"center", gap:"0.35rem", fontSize:"0.85rem", marginBottom:"0.25rem" },
  goalEditBtn:{ border:"none", background:"none", cursor:"pointer", color:"#94A3B8", padding:"0.15rem", display:"flex", alignItems:"center" },
  goalEditor:{ display:"flex", gap:"0.35rem", marginTop:"0.35rem", flexWrap:"wrap" },
  goalOption:{ padding:"0.25rem 0.65rem", borderRadius:"2rem", border:"1px solid #E2E8F0", backgroundColor:"#F8FAFC", color:"#475569", cursor:"pointer", fontSize:"0.72rem", fontWeight:600, transition:"all 0.15s" },
  miniStatsRow:{ display:"flex", alignItems:"center", gap:"0.35rem", flexWrap:"wrap" },
  miniStat:{ fontSize:"0.75rem", color:"#94A3B8", fontWeight:500 },
  miniDot:{ color:"#CBD5E1", fontSize:"0.6rem" },

  /* Tab bar */
  tabBar:{ display:"flex", gap:"0.2rem", marginBottom:"1.5rem", borderBottom:"2px solid #E2E8F0", paddingBottom:0, overflowX:"auto" },
  tab:{ display:"flex", alignItems:"center", gap:"0.3rem", padding:"0.55rem 0.85rem", border:"none", borderBottom:"2px solid transparent", backgroundColor:"transparent", color:"#94A3B8", cursor:"pointer", fontSize:"0.8rem", fontWeight:500, marginBottom:"-2px", transition:"all 0.15s", whiteSpace:"nowrap" },
  tabActive:{ display:"flex", alignItems:"center", gap:"0.3rem", padding:"0.55rem 0.85rem", border:"none", borderBottom:"2px solid #0021A5", backgroundColor:"transparent", color:"#0021A5", cursor:"pointer", fontSize:"0.8rem", fontWeight:600, marginBottom:"-2px", whiteSpace:"nowrap" },

  /* Sections */
  section:{},
  sectionHeader:{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"1rem", marginBottom:"1rem", flexWrap:"wrap" },
  sectionTitle:{ fontSize:"1.15rem", fontWeight:700, color:"#0F172A", margin:"0 0 0.15rem" },
  sectionHint:{ fontSize:"0.82rem", color:"#64748B", margin:"0 0 1rem", lineHeight:1.5 },
  sectionLabel:{ fontSize:"0.72rem", fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 0.65rem" },

  /* ── Phrase of the Day ── */
  podCard:{ background:"linear-gradient(135deg, #0021A5 0%, #003087 60%, #001A6E 100%)", borderRadius:"1rem", padding:"1.5rem", marginBottom:"1.5rem", color:"#fff", position:"relative", overflow:"hidden" },
  podHeader:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" },
  podBadge:{ display:"inline-flex", alignItems:"center", gap:"0.35rem", padding:"0.3rem 0.75rem", borderRadius:"2rem", backgroundColor:"rgba(255,255,255,0.12)", fontSize:"0.72rem", fontWeight:600, color:"rgba(255,255,255,0.8)" },
  podGerman:{ fontSize:"1.5rem", fontWeight:800, color:"#fff", margin:"0 0 0.75rem", lineHeight:1.3, letterSpacing:"-0.01em" },
  podRevealBtn:{ display:"block", width:"100%", padding:"0.65rem", borderRadius:"0.6rem", border:"1px solid rgba(255,255,255,0.2)", backgroundColor:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.7)", cursor:"pointer", fontSize:"0.82rem", fontWeight:500, transition:"all 0.2s", textAlign:"center" },
  podRevealed:{ animation:"fadeIn 0.3s ease-out" },
  podEnglish:{ fontSize:"1.1rem", fontWeight:600, color:"rgba(255,255,255,0.9)", margin:"0 0 0.5rem" },
  podContext:{ fontSize:"0.82rem", color:"rgba(255,255,255,0.6)", margin:"0 0 0.3rem", lineHeight:1.4 },
  podCulture:{ fontSize:"0.78rem", color:"#FDE68A", margin:"0 0 0.3rem", lineHeight:1.4 },
  podAction:{ display:"inline-flex", alignItems:"center", gap:"0.35rem", padding:"0.45rem 1rem", borderRadius:"0.5rem", border:"1px solid rgba(255,255,255,0.25)", backgroundColor:"rgba(255,255,255,0.1)", color:"#fff", cursor:"pointer", fontSize:"0.82rem", fontWeight:600, transition:"all 0.2s" },
  podActionBtn:{ display:"inline-flex", alignItems:"center", gap:"0.3rem", padding:"0.4rem 0.85rem", borderRadius:"0.5rem", border:"1px solid rgba(255,255,255,0.2)", backgroundColor:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.8)", cursor:"pointer", fontSize:"0.78rem", fontWeight:600, transition:"all 0.15s" },
  podInDeck:{ display:"inline-flex", alignItems:"center", gap:"0.3rem", fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", fontWeight:500 },

  /* ── Recommendations ── */
  recList:{ display:"flex", flexDirection:"column", gap:"0.5rem" },
  recCard:{ display:"flex", alignItems:"center", gap:"0.85rem", width:"100%", padding:"0.85rem 1rem", backgroundColor:"#fff", borderRadius:"0.75rem", border:"1px solid #E2E8F0", cursor:"pointer", transition:"all 0.15s", textAlign:"left" },
  recIcon:{ width:40, height:40, borderRadius:"0.65rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  recTitle:{ fontSize:"0.88rem", fontWeight:600, color:"#0F172A", lineHeight:1.3 },
  recDesc:{ fontSize:"0.75rem", color:"#64748B", lineHeight:1.4, marginTop:"0.1rem" },

  /* ── Quick actions ── */
  quickActions:{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"0.5rem" },
  qaBtn:{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem", padding:"0.85rem 0.5rem", backgroundColor:"#fff", borderRadius:"0.75rem", border:"1px solid #E2E8F0", cursor:"pointer", fontSize:"0.78rem", fontWeight:600, color:"#334155", transition:"all 0.15s" },

  /* ── Mastery snapshot ── */
  masterySnapshot:{ background:"#fff", borderRadius:"0.85rem", padding:"1.15rem 1.25rem", border:"1px solid #E2E8F0", marginBottom:"1.5rem" },
  masteryBars:{ display:"flex", flexDirection:"column", gap:"0.5rem" },
  masteryBarRow:{ display:"flex", alignItems:"center", gap:"0.65rem" },
  mbLabel:{ fontSize:"0.72rem", fontWeight:600, width:"60px", textAlign:"right" },
  mbTrack:{ flex:1, height:8, backgroundColor:"#F1F5F9", borderRadius:4, overflow:"hidden" },
  mbFill:{ height:"100%", borderRadius:4, transition:"width 0.4s ease" },
  mbCount:{ fontSize:"0.78rem", fontWeight:700, color:"#334155", width:"24px" },
  nudge:{ display:"flex", alignItems:"center", gap:"0.35rem", fontSize:"0.78rem", color:"#64748B", marginTop:"0.85rem", padding:"0.65rem 0.85rem", backgroundColor:"#F8FAFC", borderRadius:"0.5rem", lineHeight:1.4, flexWrap:"wrap" },
  nudgeLink:{ border:"none", background:"none", color:"#0021A5", cursor:"pointer", fontSize:"0.78rem", fontWeight:600, padding:0, textDecoration:"underline" },

  /* ── Welcome (empty state for new users) ── */
  welcomeCard:{ textAlign:"center", padding:"3rem 2rem", backgroundColor:"#fff", borderRadius:"1rem", border:"1px solid #E2E8F0" },
  welcomeIcon:{ fontSize:"2.5rem", marginBottom:"0.75rem" },
  welcomeTitle:{ fontSize:"1.25rem", fontWeight:700, color:"#0F172A", margin:"0 0 0.5rem" },
  welcomeDesc:{ fontSize:"0.88rem", color:"#64748B", margin:"0 0 1.25rem", lineHeight:1.6, maxWidth:420, marginLeft:"auto", marginRight:"auto" },
  welcomeBtn:{ display:"inline-flex", alignItems:"center", gap:"0.4rem", padding:"0.7rem 1.5rem", borderRadius:"0.65rem", border:"none", background:"#0021A5", color:"#fff", cursor:"pointer", fontSize:"0.88rem", fontWeight:600, boxShadow:"0 4px 12px rgba(0,33,165,0.2)" },

  /* ── Toggle form button ── */
  toggleFormBtn:{ display:"flex", alignItems:"center", gap:"0.35rem", padding:"0.55rem 1rem", backgroundColor:"#F8FAFC", borderRadius:"0.5rem", border:"1px dashed #CBD5E1", cursor:"pointer", fontSize:"0.82rem", fontWeight:500, color:"#64748B", width:"100%", transition:"all 0.15s" },

  /* Form card */
  formCard:{ backgroundColor:"#fff", padding:"1.25rem", borderRadius:"0.75rem", border:"1px solid #E2E8F0", marginBottom:"1.25rem", marginTop:"0.5rem" },
  formRow:{ display:"flex", gap:"0.6rem", flexWrap:"wrap", alignItems:"center", marginBottom:"0.6rem" },
  input:{ flex:"1 1 200px", padding:"0.6rem 0.8rem", borderRadius:"0.5rem", border:"1px solid #CBD5E1", fontSize:"0.85rem", backgroundColor:"#F8FAFC", outline:"none", transition:"border-color 0.15s", color:"#0F172A" },

  /* Buttons */
  primaryBtn:{ display:"inline-flex", alignItems:"center", gap:"0.35rem", padding:"0.6rem 1.15rem", borderRadius:"0.5rem", border:"none", background:"#0021A5", color:"#fff", cursor:"pointer", fontSize:"0.85rem", fontWeight:600, whiteSpace:"nowrap", boxShadow:"0 2px 8px rgba(0,33,165,0.18)", transition:"all 0.15s" },
  secondaryBtn:{ display:"inline-flex", alignItems:"center", gap:"0.35rem", padding:"0.6rem 1.15rem", borderRadius:"0.5rem", border:"1px solid #CBD5E1", background:"#fff", color:"#334155", cursor:"pointer", fontSize:"0.85rem", fontWeight:600, whiteSpace:"nowrap", transition:"all 0.15s" },
  exitBtn:{ display:"inline-flex", alignItems:"center", gap:"0.25rem", padding:"0.35rem 0.75rem", borderRadius:"0.4rem", border:"1px solid #CBD5E1", backgroundColor:"#fff", cursor:"pointer", fontSize:"0.78rem", color:"#64748B", fontWeight:500 },
  iconBtn:{ display:"inline-flex", alignItems:"center", gap:"0.25rem", padding:"0.3rem 0.5rem", borderRadius:"0.4rem", border:"1px solid #E2E8F0", backgroundColor:"transparent", cursor:"pointer", fontSize:"0.72rem", color:"#64748B", transition:"all 0.15s" },

  /* Vocab grid */
  vocabGrid:{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"0.75rem" },
  vocabCard:{ backgroundColor:"#fff", padding:"1rem", borderRadius:"0.65rem", border:"1px solid #E2E8F0", transition:"all 0.15s" },
  vocabDE:{ fontSize:"0.95rem", fontWeight:700, color:"#0021A5", margin:"0 0 0.1rem", lineHeight:1.3 },
  vocabEN:{ fontSize:"0.82rem", color:"#475569", margin:"0 0 0.2rem", fontWeight:500 },
  vocabCtx:{ fontSize:"0.72rem", color:"#64748B", margin:"0.2rem 0 0", lineHeight:1.4 },

  /* Flashcard & quiz */
  fcSection:{ maxWidth:500, margin:"0 auto" },
  fcHeader:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem" },
  fcProgress:{ fontSize:"0.82rem", color:"#64748B", fontWeight:500 },
  fcDots:{ display:"flex", gap:"4px", justifyContent:"center", alignItems:"center", marginBottom:"1rem", flexWrap:"wrap" },
  flashcard:{ backgroundColor:"#fff", borderRadius:"1rem", border:"2px solid #E2E8F0", padding:"3rem 2rem", textAlign:"center", cursor:"pointer", minHeight:260, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 30px rgba(0,0,0,0.05)", transition:"all 0.2s", perspective:"1000px" },
  fcLabel:{ fontSize:"0.62rem", fontWeight:700, color:"#94A3B8", letterSpacing:"0.15em", textTransform:"uppercase", margin:"0 0 0.85rem" },
  fcWord:{ fontSize:"1.75rem", fontWeight:800, color:"#0021A5", margin:"0 0 0.5rem", lineHeight:1.3 },
  fcAnswer:{ fontSize:"1.5rem", fontWeight:700, color:"#0F172A", margin:"0 0 0.5rem", lineHeight:1.3 },
  fcCtx:{ fontSize:"0.82rem", color:"#64748B", margin:"0.5rem 0 0", fontStyle:"italic" },
  fcHint:{ fontSize:"0.75rem", color:"#CBD5E1", margin:"1.5rem 0 0" },
  rateRow:{ marginTop:"1rem", backgroundColor:"#fff", padding:"1rem", borderRadius:"0.75rem", border:"1px solid #E2E8F0" },
  rateBtn:{ padding:"0.55rem 1.15rem", borderRadius:"0.5rem", border:"1.5px solid", cursor:"pointer", fontSize:"0.82rem", fontWeight:600, transition:"all 0.15s" },
  quizCard:{ backgroundColor:"#fff", borderRadius:"1rem", border:"2px solid #E2E8F0", padding:"2.5rem 2rem", textAlign:"center", boxShadow:"0 8px 30px rgba(0,0,0,0.05)" },

  /* Study Plans */
  planList:{ display:"flex", flexDirection:"column", gap:"0.6rem" },
  planCard:{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.85rem 1rem", backgroundColor:"#fff", borderRadius:"0.65rem", border:"1px solid #E2E8F0", transition:"all 0.15s" },
  planDone:{ backgroundColor:"#F0FDF4", borderColor:"#BBF7D0" },
  planCity:{ fontSize:"0.92rem", fontWeight:600, color:"#0F172A", display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"0.1rem" },
  planTopic:{ fontSize:"0.82rem", color:"#0021A5", fontWeight:500, marginBottom:"0.15rem" },
  planDate:{ fontSize:"0.72rem", color:"#94A3B8", display:"flex", alignItems:"center", gap:"0.25rem" },
  countryDot:{ display:"inline-flex", fontSize:"0.8rem", width:22, height:22, borderRadius:"50%", alignItems:"center", justifyContent:"center" },
  textDone:{ textDecoration:"line-through", color:"#94A3B8" },
  checkBtn:{ border:"none", background:"none", cursor:"pointer", color:"#CBD5E1", padding:"0.1rem", display:"flex" },
  checkDone:{ border:"none", background:"none", cursor:"pointer", color:"#22C55E", padding:"0.1rem", display:"flex" },
  deleteBtn:{ padding:"0.3rem", borderRadius:"0.3rem", border:"1px solid #FCA5A5", backgroundColor:"transparent", color:"#EF4444", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" },

  /* Phrase Library */
  filterRow:{ display:"flex", gap:"0.6rem", marginBottom:"1.25rem", flexWrap:"wrap" },
  filterSelect:{ padding:"0.5rem 0.8rem", border:"1px solid #CBD5E1", borderRadius:"0.5rem", fontSize:"0.82rem", outline:"none", backgroundColor:"#fff", minWidth:150 },
  phraseGrid:{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"0.85rem" },
  phraseCard:{ backgroundColor:"#fff", padding:"1.15rem", borderRadius:"0.75rem", border:"1px solid #E2E8F0", transition:"all 0.2s" },
  phraseTop:{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"0.5rem", marginBottom:"0.3rem" },
  phraseDE:{ fontSize:"1rem", fontWeight:700, color:"#0021A5", margin:0, lineHeight:1.35, flex:1 },
  phraseEN:{ fontSize:"0.85rem", color:"#475569", margin:"0 0 0.3rem", fontWeight:500 },
  phrasePr:{ fontSize:"0.75rem", color:"#94A3B8", margin:"0 0 0.3rem", fontStyle:"italic" },
  phraseCtx:{ fontSize:"0.75rem", color:"#64748B", margin:"0 0 0.4rem", lineHeight:1.4 },
  phraseTags:{ display:"flex", gap:"0.35rem", flexWrap:"wrap", marginBottom:"0.3rem" },
  phraseTag:{ fontSize:"0.62rem", fontWeight:600, backgroundColor:"#FEF3C7", color:"#92400E", padding:"0.15rem 0.45rem", borderRadius:9999, textTransform:"capitalize" },
  phraseCities:{ fontSize:"0.7rem", color:"#94A3B8", display:"flex", alignItems:"center", gap:"0.25rem", margin:"0 0 0.4rem" },
  addToDeck:{ display:"inline-flex", alignItems:"center", gap:"0.3rem", fontSize:"0.75rem", fontWeight:600, color:"#0021A5", padding:"0.4rem 0.75rem", borderRadius:"0.4rem", border:"1px solid #BFDBFE", backgroundColor:"#EFF6FF", cursor:"pointer", width:"100%", justifyContent:"center", transition:"all 0.15s" },

  /* Saved tab */
  categoryHeading:{ fontSize:"0.92rem", fontWeight:600, color:"#1E3A5F", margin:"0 0 0.65rem", paddingBottom:"0.35rem", borderBottom:"2px solid #E2E8F0", textTransform:"capitalize" },

  /* Empty states */
  emptyState:{ padding:"2.5rem 1.5rem", textAlign:"center", backgroundColor:"#fff", borderRadius:"0.75rem", border:"1px dashed #CBD5E1", display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem" },
  emptyTitle:{ fontSize:"0.95rem", fontWeight:600, color:"#334155", margin:0 },
  emptyHint:{ fontSize:"0.82rem", color:"#94A3B8", margin:0, maxWidth:360, lineHeight:1.5 },

  /* Error */
  errorText:{ color:"#DC2626", fontSize:"0.85rem", backgroundColor:"#FEF2F2", padding:"0.5rem 0.85rem", borderRadius:"0.5rem", marginBottom:"0.75rem", textAlign:"center" },
};

export default Reservations;
