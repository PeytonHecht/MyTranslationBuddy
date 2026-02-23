import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, BookOpen, Users, MessageCircle, MapPin, GraduationCap } from 'lucide-react';
import logo from "../assets/MTBLogo.png";

// City data for the map
const cities = [
  {
    id: 'berlin',
    name: 'Berlin',
    x: 70,
    y: 30,
    description: "Germany's vibrant capital with world-class universities",
    universities: ['Humboldt-Universität', 'Freie Universität', 'TU Berlin']
  },
  {
    id: 'munich',
    name: 'Munich',
    x: 55,
    y: 80,
    description: "Bavaria's cultural hub and tech center",
    universities: ['LMU München', 'TU München']
  },
  {
    id: 'hamburg',
    name: 'Hamburg',
    x: 45,
    y: 15,
    description: 'Port city with maritime culture',
    universities: ['Universität Hamburg', 'HafenCity Universität']
  },
  {
    id: 'cologne',
    name: 'Cologne',
    x: 25,
    y: 45,
    description: 'Historic city on the Rhine',
    universities: ['Universität zu Köln', 'TH Köln']
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt',
    x: 35,
    y: 55,
    description: 'Financial center with international flair',
    universities: ['Goethe-Universität', 'Frankfurt UAS']
  },
  {
    id: 'heidelberg',
    name: 'Heidelberg',
    x: 35,
    y: 65,
    description: 'Historic university town',
    universities: ['Ruprecht-Karls-Universität']
  },
  {
    id: 'freiburg',
    name: 'Freiburg',
    x: 20,
    y: 75,
    description: 'Charming city in the Black Forest',
    universities: ['Albert-Ludwigs-Universität']
  },
  {
    id: 'leipzig',
    name: 'Leipzig',
    x: 60,
    y: 40,
    description: 'Creative hub with rich musical heritage',
    universities: ['Universität Leipzig']
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [hoveredCity, setHoveredCity] = useState(null);

  const handleExploreCity = (cityName) => {
    // You can navigate to a city-specific page or just scroll to features
    console.log(`Exploring ${cityName}`);
    // navigate(`/city/${cityName.toLowerCase()}`);
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
            Preparing to study abroad in Germany? Master essential German phrases 
            and cultural insights tailored for student life.
          </p>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section style={styles.mapSection}>
        <div style={styles.mapContainer}>
          <div style={styles.mapWrapper}>
            <h3 style={styles.mapTitle}>Select Your Destination</h3>
            <svg viewBox="0 0 100 100" style={styles.mapSvg}>
              {/* Simplified Germany outline */}
              <path
                d="M 30,10 L 45,8 L 55,12 L 65,10 L 75,15 L 80,25 L 78,35 L 75,45 L 70,55 L 65,65 L 60,75 L 55,85 L 50,88 L 45,85 L 40,80 L 35,75 L 28,70 L 22,65 L 18,58 L 15,50 L 18,40 L 22,30 L 25,20 Z"
                fill="#E8F4F8"
                stroke="#3B82F6"
                strokeWidth="0.5"
              />
              
              {/* Cities */}
              {cities.map((city) => (
                <g key={city.id}>
                  {(hoveredCity === city.id || selectedCity?.id === city.id) && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="3"
                      fill="#3B82F6"
                      opacity="0.3"
                      style={styles.pulseAnimation}
                    />
                  )}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="2"
                    fill={selectedCity?.id === city.id ? '#EF4444' : '#3B82F6'}
                    stroke="white"
                    strokeWidth="0.5"
                    style={styles.cityMarker}
                    onClick={() => setSelectedCity(city)}
                    onMouseEnter={() => setHoveredCity(city.id)}
                    onMouseLeave={() => setHoveredCity(null)}
                  />
                  <text
                    x={city.x}
                    y={city.y - 3}
                    fontSize="3"
                    fill="#1F2937"
                    textAnchor="middle"
                    style={styles.cityLabel}
                  >
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
            
            {/* Legend */}
            <div style={styles.legend}>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, backgroundColor: '#3B82F6'}}></div>
                <span>Study Abroad City</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, backgroundColor: '#EF4444'}}></div>
                <span>Selected</span>
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
                    <h2 style={styles.cityName}>{selectedCity.name}</h2>
                    <p style={styles.cityDescription}>{selectedCity.description}</p>
                  </div>
                </div>

                <div style={styles.universitiesSection}>
                  <div style={styles.universitiesHeader}>
                    <GraduationCap size={20} color="#4B5563" />
                    <h3 style={styles.universitiesTitle}>Popular Universities</h3>
                  </div>
                  <ul style={styles.universitiesList}>
                    {selectedCity.universities.map((uni, index) => (
                      <li key={index} style={styles.universityItem}>
                        <div style={styles.universityDot}></div>
                        {uni}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  style={styles.exploreButton}
                  onClick={() => handleExploreCity(selectedCity.name)}
                >
                  Start Learning German for {selectedCity.name}
                </button>
              </div>
            ) : (
              <div style={styles.placeholderInfo}>
                <div style={styles.placeholderIcon}>
                  <MapPin size={48} color="#9CA3AF" />
                </div>
                <h3 style={styles.placeholderTitle}>Choose Your Study Abroad Destination</h3>
                <p style={styles.placeholderText}>
                  Click on any city on the map to learn more about study abroad opportunities 
                  and start your German language journey
                </p>
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
              Understand German university culture, social norms, and daily life 
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
              navigating academic and everyday life in Germany.
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
            for your study abroad experience.
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
            &copy; 2026 My Translation Buddy. Empowering students to succeed abroad.
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
    maxWidth: "800px",
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
    maxWidth: "600px",
    margin: "0 auto",
  },
  mapSection: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem",
  },
  mapContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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
  mapSvg: {
    width: "100%",
    height: "auto",
    minHeight: "400px",
  },
  cityMarker: {
    cursor: "pointer",
    transition: "r 0.2s",
  },
  cityLabel: {
    userSelect: "none",
    fontSize: "3px",
    fontWeight: "500",
  },
  pulseAnimation: {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
    padding: "2rem",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
    minHeight: "400px",
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
  cityDescription: {
    color: "#6B7280",
    margin: 0,
  },
  universitiesSection: {
    flex: 1,
  },
  universitiesHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  universitiesTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1F2937",
    margin: 0,
  },
  universitiesList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  universityItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 0",
    color: "#4B5563",
  },
  universityDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#3B82F6",
  },
  exploreButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#2563EB",
    color: "#ffffff",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "1.5rem",
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
    maxWidth: "300px",
    margin: "0 auto",
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

// Add keyframes for pulse animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
`;
document.head.appendChild(styleSheet);

export default LandingPage;