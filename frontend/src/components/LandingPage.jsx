import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Globe, BookOpen, Users, MessageCircle, MapPin, GraduationCap, Info, Languages, Compass, Thermometer, DollarSign, Briefcase } from 'lucide-react';
import logo from "../assets/MTBLogo.png";

const mapIdToCitySlug = {
  0: "berlin",
  1: "munich",
  2: "vienna",
  3: "stuttgart",
  4: "hamburg",
};

const normalizeCity = (city) => ({
  id: city.slug,
  slug: city.slug,
  name: city.name,
  local_name: city.local_name || city.name,
  description: city.tagline || city.description || "",
  fullDescription: city.description || city.tagline || "",
  english_friendliness: city.english_friendliness || "moderate",
  cost_of_living_tier: city.cost_of_living_tier || "moderate",
  known_for: city.known_for || [],
  industries: city.industries || [],
  dialect: city.dialect || "N/A",
  climate: city.climate || { type: "unknown" },
  international_airport: city.international_airport || "N/A",
});

const LandingPage = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [citiesError, setCitiesError] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityPhrases, setCityPhrases] = useState([]);
  const [cityTips, setCityTips] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  // Load external map scripts

useEffect(() => {
  const fetchCities = async () => {
    try {
      const response = await axios.get("/api/cities", {
        params: { limit: 100 },
      });
      const cityData = response?.data?.data || [];
      setCities(cityData.map(normalizeCity));
    } catch (error) {
      console.error("Failed to load cities", error);
      setCitiesError("Could not load city data from the server.");
    }
  };

  fetchCities();
}, []);

useEffect(() => {
  // Load from local files in public/maps folder
  const script1 = document.createElement('script');
  script1.src = '/maps/mapdata.js';  // This points to public/maps/mapdata.js
  script1.async = true;
  
  const script2 = document.createElement('script');
  script2.src = '/maps/europemap.js'; // This points to public/maps/europemap.js
  script2.async = true;
  
  script2.onload = () => {
    console.log('Map loaded successfully');
    setMapLoaded(true);
  };

  script2.onerror = (error) => {
    console.error('Failed to load map:', error);
  };

  document.head.appendChild(script1);
  document.head.appendChild(script2);

  return () => {
    document.head.removeChild(script1);
    document.head.removeChild(script2);
  };
}, []);

useEffect(() => {

  const handleCitySelection = (event) => {
    const locationId = event.detail.locationId;

    const cityId = mapIdToCitySlug[locationId];

    const city = cities.find(c => c.id === cityId);

    if (city) {
      setSelectedCity(city);
      setActiveSection(null); // reset section when city changes
    }
  };

  window.addEventListener("citySelected", handleCitySelection);

  return () => {
    window.removeEventListener("citySelected", handleCitySelection);
  };

}, [cities]);

useEffect(() => {
  if (!selectedCity?.slug) {
    setCityPhrases([]);
    setCityTips([]);
    return;
  }

  const fetchCityDetails = async () => {
    try {
      const [phrasesResponse, tipsResponse] = await Promise.all([
        axios.get("/api/phrases", {
          params: { city_slug: selectedCity.slug, limit: 5 },
        }),
        axios.get("/api/tips", {
          params: { city_slug: selectedCity.slug, limit: 5 },
        }),
      ]);

      setCityPhrases(phrasesResponse?.data?.phrases || []);
      setCityTips(tipsResponse?.data?.data || []);
    } catch (error) {
      console.error(`Failed to load phrase/tip data for ${selectedCity.slug}`, error);
      setCityPhrases([]);
      setCityTips([]);
    }
  };

  fetchCityDetails();
}, [selectedCity?.slug]);


const handleSectionChange = (section) => {
  setActiveSection(section);
};
const sectionContent = {
  basic: (
    <div>
      <h3>Basic Information</h3>
      <p>{selectedCity?.fullDescription}</p>

      <ul>
        {(selectedCity?.known_for || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  ),

  phrases: (
    <div>
      <h3>Phrases & Pronunciation</h3>
      <p>
        Learn common German phrases used in {selectedCity?.name}.
      </p>

      <p>
        Local dialect: <strong>{selectedCity?.dialect}</strong>
      </p>

      {cityPhrases.length > 0 && (
        <ul>
          {cityPhrases.map((phrase) => (
            <li key={phrase._id || `${phrase.german_phrase}-${phrase.english_translation}`}>
              <strong>{phrase.german_phrase}</strong> — {phrase.english_translation}
            </li>
          ))}
        </ul>
      )}
    </div>
  ),

  culture: (
    <div>
      <h3>Culture & Tips</h3>

      <p>
        {selectedCity?.name} has a {selectedCity?.climate.type} climate.
      </p>

      <p>
        Industries: {(selectedCity?.industries || []).join(", ")}
      </p>

      {cityTips.length > 0 && (
        <ul>
          {cityTips.map((tip) => (
            <li key={tip._id || `${tip.city_slug}-${tip.title}`}>
              <strong>{tip.title}</strong>: {tip.short_description || tip.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

  // Helper function to get color based on English friendliness
  const getEnglishFriendlinessColor = (level) => {
    switch(level) {
      case 'very_high': return '#10B981';
      case 'high': return '#3B82F6';
      case 'moderate': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  // Helper function to get color based on cost of living
  const getCostOfLivingColor = (tier) => {
    switch(tier) {
      case 'very_high': return '#EF4444';
      case 'high': return '#F59E0B';
      default: return '#10B981';
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoContainer}>
            <img
              src={logo}
              alt="MyTranslationBuddy Logo"
              style={styles.logo}
              onClick={() => navigate("/")}
            />
            <h1 style={styles.logoText}>My Translation Buddy</h1>
          </div>
          <nav style={styles.nav}>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#features" style={styles.navLink}>Features</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
          </nav>
          <div style={styles.navButtons}>
            <button onClick={() => navigate("/login")} style={styles.loginButton}>
              Login
            </button>
            <button onClick={() => navigate("/register")} style={styles.registerButton}>
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Your Language & Culture Companion</h1>
          <p style={styles.subtitle}>
            Preparing to study abroad in Germany and Austria? Master essential German phrases 
            and cultural insights tailored for student life.
          </p>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section style={styles.mapSection}>
        <div style={styles.mapContainer}>
          <div style={styles.mapWrapper}>
            <h3 style={styles.mapTitle}>Select Your Destination</h3>
            
            {/* External Map Container */}
            <div id="map" style={styles.externalMap}>
              {!mapLoaded && (
                <div style={styles.mapLoading}>
                  Loading map...
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div style={styles.legend}>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, backgroundColor: '#3B82F6'}}></div>
                <span>Study Abroad City</span>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div style={styles.infoPanel}>
            {selectedCity ? (
              <div style={styles.cityInfo}>
                <div style={styles.cityHeader}>
                  <div style={styles.cityIcon}>
                    <MapPin size={24} color="#3B82F6" />
                  </div>
                  <div>
                    <h2 style={styles.cityName}>
                      {selectedCity.name} 
                      {selectedCity.local_name !== selectedCity.name && (
                        <span style={styles.localName}> ({selectedCity.local_name})</span>
                      )}
                    </h2>
                    <p style={styles.cityDescription}>{selectedCity.fullDescription}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={styles.quickStats}>
                  <div style={styles.statItem}>
                    <div style={styles.statLabel}>
                      <Thermometer size={14} color="#6B7280" />
                      <span>Climate</span>
                    </div>
                    <span style={styles.statValue}>{selectedCity.climate.type}</span>
                  </div>
                  <div style={styles.statItem}>
                    <div style={styles.statLabel}>
                      <DollarSign size={14} color="#6B7280" />
                      <span>Cost of Living</span>
                    </div>
                    <span style={{
                      ...styles.statValue,
                      color: getCostOfLivingColor(selectedCity.cost_of_living_tier)
                    }}>
                      {selectedCity.cost_of_living_tier.replace('_', ' ')}
                    </span>
                  </div>
                  <div style={styles.statItem}>
                    <div style={styles.statLabel}>
                      <Briefcase size={14} color="#6B7280" />
                      <span>English Friendly</span>
                    </div>
                    <span style={{
                      ...styles.statValue,
                      color: getEnglishFriendlinessColor(selectedCity.english_friendliness)
                    }}>
                      {selectedCity.english_friendliness.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Three Action Buttons */}
                <div style={styles.actionButtonsContainer}>
                  <button 
                    style={styles.actionButton}
                    onClick={() => handleSectionChange("basic")}
                  >
                    <Info size={20} color="#3B82F6" style={styles.actionButtonIcon} />
                    <div style={styles.actionButtonContent}>
                      <span style={styles.actionButtonTitle}>Basic Info</span>
                      <span style={styles.actionButtonDescription}>
                        Essential facts about {selectedCity.name}
                      </span>
                    </div>
                    
                  </button>
                    
                  <button 
                    style={styles.actionButton}
                    onClick={() => handleSectionChange("phrases")}
                  >
                    <Languages size={20} color="#10B981" style={styles.actionButtonIcon} />
                    <div style={styles.actionButtonContent}>
                      <span style={styles.actionButtonTitle}>Phrases & Pronunciation</span>
                      <span style={styles.actionButtonDescription}>
                        Key German phrases with {selectedCity.dialect} influence
                      </span>
                    </div>
                  </button>

                  <button 
                    style={styles.actionButton}
                    onClick={() => handleSectionChange("culture")}
                  >
                    <Compass size={20} color="#F59E0B" style={styles.actionButtonIcon} />
                    <div style={styles.actionButtonContent}>
                      <span style={styles.actionButtonTitle}>City Tips & Culture</span>
                      <span style={styles.actionButtonDescription}>
                        Local customs and student insights
                      </span>
                    </div>
                  </button>
                </div>
                <div style={{ marginTop: "20px" }}>
                      {activeSection && sectionContent[activeSection]}
                    </div>
                <button 
                  style={styles.exploreButton}
                  onClick={() => console.log("Explore", selectedCity.name)}
                >
                  Explore All Resources for {selectedCity.name}
                </button>
              </div>
            ) : (
              <div style={styles.placeholderInfo}>
                <div style={styles.placeholderIcon}>
                  <MapPin size={48} color="#9CA3AF" />
                </div>
                <h3 style={styles.placeholderTitle}>Choose Your Study Abroad Destination</h3>
                <p style={styles.placeholderText}>
                  Click on any city on the map to access basic information, essential phrases, 
                  and cultural tips for your study abroad journey.
                </p>
                <div style={styles.cityList}>
                  {cities.map(city => (
                    <button
                      key={city.id}
                      style={styles.cityPill}
                      onClick={() => setSelectedCity(city)}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
                {citiesError && <p style={styles.placeholderText}>{citiesError}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <h2 style={styles.featuresTitle}>Everything You Need to Succeed Abroad</h2>
        
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={{...styles.featureIcon, backgroundColor: '#DBEAFE'}}>
              <BookOpen size={24} color="#2563EB" />
            </div>
            <h3 style={styles.featureTitle}>Practical Translations</h3>
            <p style={styles.featureDescription}>
              Access categorized German phrases for academic life, housing, dining, 
              transportation, and more with contextual usage notes.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={{...styles.featureIcon, backgroundColor: '#DCFCE7'}}>
              <Users size={24} color="#16A34A" />
            </div>
            <h3 style={styles.featureTitle}>Cultural Insights</h3>
            <p style={styles.featureDescription}>
              Understand German and Austrian university culture, social norms, and daily life 
              expectations to help you adapt and thrive.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={{...styles.featureIcon, backgroundColor: '#F3E8FF'}}>
              <MessageCircle size={24} color="#9333EA" />
            </div>
            <h3 style={styles.featureTitle}>Student-Focused Content</h3>
            <p style={styles.featureDescription}>
              Every phrase and tip is designed specifically for English-speaking students 
              navigating academic and everyday life in German-speaking countries.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Start Your German Adventure?</h2>
          <p style={styles.ctaText}>
            Select a city above to begin exploring essential phrases and cultural tips 
            for your study abroad experience in Germany or Austria.
          </p>
          <button 
            onClick={() => navigate("/register")} 
            style={styles.ctaButton}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>
            &copy; 2026 My Translation Buddy. Empowering students to succeed in German-speaking countries.
          </p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  headerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logo: {
    height: "40px",
    cursor: "pointer",
  },
  logoText: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#111827",
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
  },
  navLink: {
    color: "#4B5563",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.2s",
    cursor: "pointer",
  },
  navButtons: {
    display: "flex",
    gap: "1rem",
  },
  loginButton: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "transparent",
    color: "#4B5563",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  registerButton: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563EB",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  hero: {
    background: "linear-gradient(to bottom, #ffffff, #f0f9ff)",
    padding: "4rem 2rem",
  },
  heroContent: {
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "1rem",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "1.25rem",
    color: "#6B7280",
    maxWidth: "550px",
    margin: "0 auto",
  },
  mapSection: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem",
  },
  mapContainer: {
    display: "grid",
    gridTemplateColumns: "65% 35%",
    gap: "2rem",
    alignItems: "center",
  },
  mapWrapper: {
    backgroundColor: "#f8fafc",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
  },
  mapTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "1rem",
    color: "#1F2937",
  },
  externalMap: {
    width: "100%",
    minHeight: "400px",
    position: "relative",
  },
  mapLoading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#6B7280",
    fontSize: "1rem",
  },
  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },
  infoPanel: {
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    padding: "1.5rem",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
  },
  cityInfo: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cityHeader: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  cityIcon: {
    padding: "0.75rem",
    backgroundColor: "#DBEAFE",
    borderRadius: "0.5rem",
  },
  cityName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#111827",
    margin: "0 0 0.25rem 0",
  },
  localName: {
    fontSize: "1rem",
    fontWeight: "normal",
    color: "#6B7280",
  },
  cityDescription: {
    color: "#6B7280",
    margin: 0,
    lineHeight: 1.5,
    fontSize: "0.95rem",
  },
  quickStats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.5rem",
    backgroundColor: "#F9FAFB",
    padding: "0.75rem",
    borderRadius: "0.75rem",
    marginBottom: "1.5rem",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  statLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: "0.7rem",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  statValue: {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#1F2937",
    textTransform: "capitalize",
  },
  actionButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem",
    backgroundColor: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "0.75rem",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
    width: "100%",
  },
  actionButtonIcon: {
    flexShrink: 0,
  },
  actionButtonContent: {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
  },
  actionButtonTitle: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#111827",
  },
  actionButtonDescription: {
    fontSize: "0.8rem",
    color: "#6B7280",
  },
  exploreButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#2563EB",
    color: "#ffffff",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "auto",
    transition: "background-color 0.2s",
  },
  placeholderInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
  },
  placeholderIcon: {
    padding: "1rem",
    backgroundColor: "#F3F4F6",
    borderRadius: "50%",
    marginBottom: "1rem",
  },
  placeholderTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "0.5rem",
  },
  placeholderText: {
    color: "#6B7280",
    maxWidth: "280px",
    margin: "0 auto 1rem",
    fontSize: "0.9rem",
  },
  cityList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "center",
    marginTop: "1rem",
  },
  cityPill: {
    backgroundColor: "#F3F4F6",
    color: "#4B5563",
    padding: "0.4rem 0.8rem",
    borderRadius: "2rem",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  features: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "4rem 2rem",
  },
  featuresTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
    marginBottom: "3rem",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2rem",
  },
  featureCard: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.2s",
  },
  featureIcon: {
    width: "fit-content",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
  },
  featureTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "0.5rem",
  },
  featureDescription: {
    color: "#6B7280",
    lineHeight: 1.6,
    margin: 0,
  },
  cta: {
    backgroundColor: "#2563EB",
    padding: "4rem 2rem",
  },
  ctaContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "1rem",
  },
  ctaText: {
    fontSize: "1.125rem",
    color: "#BFDBFE",
    marginBottom: "2rem",
  },
  ctaButton: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#2563EB",
    backgroundColor: "#ffffff",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  footer: {
    backgroundColor: "#111827",
    padding: "2rem",
  },
  footerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    textAlign: "center",
  },
  footerText: {
    color: "#9CA3AF",
    margin: 0,
  },
};

export default LandingPage;