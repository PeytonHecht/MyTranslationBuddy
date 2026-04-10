import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Users,
  Home,
  AlertCircle,
  MessageCircle,
  Clock,
  DollarSign,
  Utensils,
  Book,
  ArrowLeft,
  Loader,
  AlertTriangle,
  ExternalLink,
  LogOut,
  Compass,
  ClipboardList,
  Calendar,
  User
} from 'lucide-react';
import logo from '../assets/MTBLogo.png';
import '../styles/CityDetailPage.css';

const CityDetailPage = () => {
  const { citySlug } = useParams();
  const navigate = useNavigate();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [relatedPhrases, setRelatedPhrases] = useState({});

  const userEmail = localStorage.getItem("email") || "";  // Changed from null to ""

  const handleLogout = async () => {
    try { 
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
  
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/cities/${citySlug}/complete`);
        setCityData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load city data:', err);
        setError('Could not load city information. Please try again.');
        setLoading(false);
      }
    };

    if (citySlug) {
      fetchCityData();
    }
  }, [citySlug]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getPhrasesByTag = (tag) => {
    return [
      ...(cityData?.phrases?.city_specific?.data || []),
      ...(cityData?.phrases?.region_relevant?.data || [])
    ].filter(phrase => 
      phrase.tags && phrase.tags.some(t => 
        t.toLowerCase().includes(tag.toLowerCase())
      )
    ).slice(0, 5);
  };

  if (loading) {
    return (
      <div className="city-detail-loading">
        <Loader size={48} className="spinner" />
        <p>Loading city information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="city-detail-error">
        <AlertTriangle size={48} />
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} /> Back to Cities
        </button>
      </div>
    );
  }

  if (!cityData) return null;

  const city = cityData.city;
  const generalTips = cityData.tips?.general?.data || [];
  const programTipsData = cityData.tips?.by_program?.data || [];
  const cityPhrases = cityData.phrases?.city_specific?.data || [];
  const regionPhrases = cityData.phrases?.region_relevant?.data || [];

  return (
    <div className="city-detail-page">
      {/* NAVBAR */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerLeft} onClick={() => navigate("/")}>
            <img src={logo} alt="MTB" style={{ height: 55 }} />
            <span style={styles.brand}>MyTranslationBuddy</span>
          </div>
          <nav style={styles.nav}>
            <button onClick={() => navigate("/tips")} style={styles.navBtn}><Compass size={15}/> Explore</button>
            <button onClick={() => navigate("/reservations")} style={styles.navBtn}><ClipboardList size={15}/> Study</button>
            <button onClick={() => navigate("/events")} style={styles.navBtn}><Calendar size={15}/> Events</button>
            <button onClick={() => navigate("/")} style={styles.navBtn}><Home size={15}/> Home</button>
            {localStorage.getItem("email") ? (
              <>
                <button onClick={() => navigate("/profile")} style={styles.profileBtn}><User size={14}/> Profile</button>
                <button onClick={handleLogout} style={{...styles.navBtn, color:"#DC2626", marginLeft:"0.25rem"}} 
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#FEF2F2"; e.currentTarget.style.color="#DC2626";}} 
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280";}}>
                  <LogOut size={14}/> Logout
                </button>
              </>
            ) : (
              <button onClick={() => navigate("/login")} style={styles.profileBtn}>Sign In</button>
            )}
          </nav>
        </div>
      </header>
      {/* Header */}
      <div className="city-header" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))`,
        backgroundSize: 'cover'
      }}>
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} /> Back
        </button>
        
        <div className="city-header-content">
          <h1>{city.name || 'Unknown City'}</h1>
          <div className="city-meta">
            <span className="location-badge">
              <MapPin size={16} /> {city.country}
            </span>
            <span className="region-badge">
              {city.region} ({city.region_type})
            </span>
          </div>
          <p className="city-description">{city.description || 'Discover this amazing city'}</p>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="quick-facts">
        <div className="fact-card">
          <DollarSign size={24} />
          <div>
            <h4>Cost of Living</h4>
            <p>{city.cost_of_living_tier || 'Moderate'}</p>
          </div>
        </div>
        
        <div className="fact-card">
          <Users size={24} />
          <div>
            <h4>Population</h4>
            <p>{city.population ? `${(city.population / 1000).toFixed(0)}k` : 'N/A'}</p>
          </div>
        </div>

        <div className="fact-card">
          <MessageCircle size={24} />
          <div>
            <h4>Local Dialect</h4>
            <p>{city.dialect || 'Standard German'}</p>
          </div>
        </div>

        <div className="fact-card">
          <Home size={24} />
          <div>
            <h4>Known For</h4>
            <p>{city.known_for?.slice(0, 2).join(', ') || 'Culture & History'}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="city-content">
        {/* Cultural Guide Section */}
        <section className="cultural-guide">
          <h2>
            <Book size={28} /> Cultural Guide
          </h2>
          <p className="section-intro">
            Navigate cultural expectations and social norms in {city.name}
          </p>

          {/* University Culture & Classroom Expectations */}
          <div className="guide-card">
            <div 
              className="card-header"
              onClick={() => toggleSection('university-culture')}
            >
              <div className="header-title">
                <Users size={20} />
                <h3>University Culture & Classroom Expectations</h3>
              </div>
              {expandedSections['university-culture'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections['university-culture'] && (
              <div className="card-content">
                <div className="content-text">
                  <p>
                    German universities emphasize independent research and critical thinking. Professors expect students 
                    to be self-directed and proactive about their learning. Participation in seminars is highly valued.
                  </p>
                  <ul>
                    <li><strong>Punctuality:</strong> Arriving on time is crucial. Being 5+ minutes late is considered disrespectful.</li>
                    <li><strong>Participation:</strong> Engage actively in discussions and ask questions when you don't understand.</li>
                    <li><strong>Formality:</strong> Use "Herr Professor" and "Frau Professor" until told otherwise.</li>
                    <li><strong>Office Hours:</strong> It's common to meet professors during office hours (Sprechstunde) for clarification.</li>
                    <li><strong>Group Work:</strong> Emphasis on collaborative projects; be reliable and prepared.</li>
                  </ul>
                </div>

                {/* Related Phrases Link */}
                <div className="related-phrases-box">
                  <h4>Related Phrases for the Classroom:</h4>
                  <div className="phrase-preview">
                    {getPhrasesByTag('classroom').map((phrase, idx) => (
                      <div key={idx} className="phrase-item">
                        <span className="phrase-german">{phrase.german_phrase}</span>
                        <span className="phrase-english">{phrase.english_translation}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="view-all-phrases-btn"
                    onClick={() => navigate('/phrase-library', { state: { filter: 'academic' } })}
                  >
                    View All Academic Phrases <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Social Norms & Communication Styles */}
          <div className="guide-card">
            <div 
              className="card-header"
              onClick={() => toggleSection('social-norms')}
            >
              <div className="header-title">
                <Users size={20} />
                <h3>Social Norms & Communication Styles</h3>
              </div>
              {expandedSections['social-norms'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections['social-norms'] && (
              <div className="card-content">
                <div className="content-text">
                  <p>
                    German communication tends to be direct and honest. What might sound blunt in English is considered 
                    straightforward and respectful in German culture.
                  </p>
                  <ul>
                    <li><strong>Directness:</strong> Germans value directness over political correctness. Criticism is given directly.</li>
                    <li><strong>Greetings:</strong> Handshakes are standard in formal settings. Kissing on the cheek is less common among strangers.</li>
                    <li><strong>Personal Space:</strong> Germans respect personal space in public but may seem reserved in initial meetings.</li>
                    <li><strong>Small Talk:</strong> Minimal small talk; conversations are more substantive and purposeful.</li>
                    <li><strong>Humor:</strong> Germans appreciate intelligent humor, but self-deprecating humor may not land the same way.</li>
                  </ul>
                </div>

                <div className="related-phrases-box">
                  <h4>Common Greetings & Polite Phrases:</h4>
                  <div className="phrase-preview">
                    {getPhrasesByTag('greeting').map((phrase, idx) => (
                      <div key={idx} className="phrase-item">
                        <span className="phrase-german">{phrase.german_phrase}</span>
                        <span className="phrase-english">{phrase.english_translation}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="view-all-phrases-btn"
                    onClick={() => navigate('/phrase-library', { state: { filter: 'social' } })}
                  >
                    View All Social Phrases <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Daily Life Tips */}
          <div className="guide-card">
            <div 
              className="card-header"
              onClick={() => toggleSection('daily-life')}
            >
              <div className="header-title">
                <Clock size={20} />
                <h3>Daily Life Tips: Money, Punctuality & Etiquette</h3>
              </div>
              {expandedSections['daily-life'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections['daily-life'] && (
              <div className="card-content">
                <div className="content-text">
                  <h4>Money & Banking</h4>
                  <ul>
                    <li>Germany is still heavily cash-based; withdraw money from ATMs regularly</li>
                    <li>Student discounts are everywhere (Studentenausweis - student ID is essential)</li>
                    <li>Opening a bank account is straightforward; bring your passport and enrollment confirmation</li>
                    <li>Tipping is not mandatory but rounding up or 5-10% is appreciated in restaurants</li>
                  </ul>

                  <h4>Punctuality</h4>
                  <ul>
                    <li>"German time" is exact. Being 5 minutes late is considered rude.</li>
                    <li>Plan to arrive 10-15 minutes early for appointments and classes</li>
                    <li>Public transportation is reliable; plan accordingly</li>
                  </ul>

                  <h4>Everyday Etiquette</h4>
                  <ul>
                    <li>Always say "Guten Tag" when entering a shop; "Auf Wiedersehen" when leaving</li>
                    <li>Hold doors for others; it's expected</li>
                    <li>Keep noise levels low in residential areas, especially evenings and weekends</li>
                    <li>Recycling is mandatory; learn the sorting system (Mülltrennung)</li>
                  </ul>
                </div>

                <div className="related-phrases-box">
                  <h4>Money & Shopping Phrases:</h4>
                  <div className="phrase-preview">
                    {getPhrasesByTag('shopping').map((phrase, idx) => (
                      <div key={idx} className="phrase-item">
                        <span className="phrase-german">{phrase.german_phrase}</span>
                        <span className="phrase-english">{phrase.english_translation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Common Cultural Mistakes */}
          <div className="guide-card">
            <div 
              className="card-header"
              onClick={() => toggleSection('mistakes')}
            >
              <div className="header-title">
                <AlertCircle size={20} />
                <h3>Common Cultural Mistakes & How to Avoid Them</h3>
              </div>
              {expandedSections['mistakes'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections['mistakes'] && (
              <div className="card-content">
                <div className="content-text">
                  <div className="mistake-item">
                    <h4>❌ Assuming Germans are Unfriendly</h4>
                    <p>Germans are reserved initially but become very warm once they know you. Don't confuse directness with coldness.</p>
                  </div>

                  <div className="mistake-item">
                    <h4>❌ Being Late Without Explanation</h4>
                    <p>Always notify people if you'll be delayed. Punctuality shows respect for others' time.</p>
                  </div>

                  <div className="mistake-item">
                    <h4>❌ Ignoring Recycling Rules</h4>
                    <p>Mülltrennung (waste sorting) is serious. Violating it can result in fines and social disapproval from neighbors.</p>
                  </div>

                  <div className="mistake-item">
                    <h4>❌ Excessive Partying Late at Night</h4>
                    <p>Quiet hours (Ruhezeiten) are typically 10 PM - 7 AM on weekdays and 10 PM - 9 AM on Sundays.</p>
                  </div>

                  <div className="mistake-item">
                    <h4>❌ Not Using Formal Address Initially</h4>
                    <p>Always use "Sie" (formal you) and surnames until invited to use "du" (informal you).</p>
                  </div>

                  <div className="mistake-item">
                    <h4>❌ Being Uncomfortable with Directness</h4>
                    <p>Take criticism as constructive feedback, not as an attack. Germans separate the person from the idea.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Tips Section */}
        <section className="tips-section">
          <h2>
            <Book size={28} /> Study Abroad Tips
          </h2>

          {/* General Tips */}
          {generalTips.length > 0 && (
            <div className="tips-subsection">
              <h3>Tips for All Students</h3>
              <div className="tips-list">
                {generalTips.map((tip, idx) => (
                  <div key={idx} className="tip-card">
                    <div className="tip-header">
                      <h4>{tip.title}</h4>
                      <span className="tip-category">{tip.category}</span>
                    </div>
                    <p>{tip.content}</p>
                    {tip.tags && (
                      <div className="tip-tags">
                        {tip.tags.slice(0, 3).map((tag, tidx) => (
                          <span key={tidx} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Program-Specific Tips */}
          {programTipsData.length > 0 && (
            <div className="tips-subsection">
              <h3>Program-Specific Tips</h3>
              
              <div className="program-selector">
                {programTipsData.map((program, idx) => (
                  <button
                    key={idx}
                    className={`program-button ${selectedProgram === program.program ? 'active' : ''}`}
                    onClick={() => setSelectedProgram(selectedProgram === program.program ? null : program.program)}
                  >
                    {program.program}
                    <span className="tip-count">{program.tips?.length || 0} tips</span>
                  </button>
                ))}
              </div>

              {selectedProgram && (
                <div className="program-tips">
                  {programTipsData
                    .find(p => p.program === selectedProgram)
                    ?.tips?.map((tip, idx) => (
                      <div key={idx} className="tip-card program-tip">
                        <div className="tip-header">
                          <h4>{tip.title}</h4>
                          <span className="tip-category">{tip.category}</span>
                        </div>
                        <p>{tip.content}</p>
                        {tip.tags && (
                          <div className="tip-tags">
                            {tip.tags.slice(0, 3).map((tag, tidx) => (
                              <span key={tidx} className="tag">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Phrases Section */}
        <section className="phrases-section">
          <h2>
            <MessageCircle size={28} /> Useful Phrases for {city.name}
          </h2>
          <p className="section-intro">Quick reference for essential phrases in this city</p>

          <div className="phrases-preview">
            <div className="phrase-category">
              <h3>City-Specific Phrases</h3>
              <p className="category-desc">Phrases specifically useful in {city.name}</p>
              <div className="phrases-list">
                {cityPhrases.slice(0, 5).map((phrase, idx) => (
                  <div key={idx} className="phrase-card">
                    <p className="phrase-german">{phrase.german_phrase}</p>
                    <p className="phrase-english">{phrase.english_translation}</p>
                    {phrase.usage_context && (
                      <p className="usage">{phrase.usage_context}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="phrase-category">
              <h3>Region-Relevant Phrases</h3>
              <p className="category-desc">Phrases from {city.region} region</p>
              <div className="phrases-list">
                {regionPhrases.slice(0, 5).map((phrase, idx) => (
                  <div key={idx} className="phrase-card">
                    <p className="phrase-german">{phrase.german_phrase}</p>
                    <p className="phrase-english">{phrase.english_translation}</p>
                    {phrase.usage_context && (
                      <p className="usage">{phrase.usage_context}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            className="explore-all-phrases"
            onClick={() => navigate('/phrase-library', { state: { citySlug } })}
          >
            Explore Complete Phrase Library <ExternalLink size={18} />
          </button>
        </section>
      </div>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(229,231,235,0.5)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
  },
  headerInner: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0.2rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    cursor: "pointer"
  },
  brand: {
    fontSize: "1.05rem",
    fontWeight: 800,
    color: "#0021A5",
    letterSpacing: "-0.01em"
  },
  nav: {
    display: "flex",
    gap: "0.15rem",
    alignItems: "center",
    flexWrap: "wrap",
    background: "#F3F4F6",
    borderRadius: "0.65rem",
    padding: "0.2rem"
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.45rem 0.85rem",
    border: "none",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    color: "#6B7280",
    cursor: "pointer",
    fontSize: "0.78rem",
    fontWeight: 500,
    transition: "all 0.2s"
  },
  profileBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.45rem 1.1rem",
    border: "none",
    borderRadius: "0.5rem",
    background: "linear-gradient(135deg,#FA4616,#FF6B35)",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.02em",
    boxShadow: "0 2px 8px rgba(250,70,22,0.25)",
    marginLeft: "0.35rem"
  }
};

export default CityDetailPage;
