import React from "react";
import { useNavigate } from "react-router-dom";
// Make sure to change this to your actual logo file
import logo from "../assets/MTBLogo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img
        src={logo}
        alt="MyTranslationBuddy Logo"
        style={styles.logo}
        onClick={() => navigate("/")}
      />

      <div style={styles.navButtons}>
        <button onClick={() => navigate("/register")} style={styles.navButton}>
          Register
        </button>
        <button onClick={() => navigate("/login")} style={styles.navButton}>
          Login
        </button>
      </div>

      <div style={styles.heroWrapper}>
        <div style={styles.content}>
          <h1 style={styles.title}>
            <span style={styles.logoBlack}>My</span>
            <span style={styles.logoRed}>Translation</span>
            <span style={styles.logoBlack}>Buddy</span>
            </h1>
          <p style={styles.subtitle}>Your guide to study abroad programs in Germany</p>
        </div>

        <div style={styles.curveBackground}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#3a7bd5"
              fillOpacity="0.1"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FDFBF7",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    position: "relative",
    minHeight: "100vh",
  },
  heroWrapper: {
    position: "relative",
    minHeight: "calc(100vh-80px)",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2 rem",
    position: "relative",
    zIndex: 10,
  },
  barTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  logo: {
    position: "absolute",
    top: "2rem",
    left: "2rem",
    height: "50px",
    cursor: "pointer",
    zIndex: 10,
  },
  navButtons: {
    position: "absolute",
    top: "2rem",
    right: "2rem",
    display: "flex",
    gap: "1rem",
    zIndex: 10,
  },
  navButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "transparent",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // This allows the content to take up the available space
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    //background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    //WebkitBackgroundClip: "text",
    //WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
    fontFamily: "'Poppins', sans-serif",
  },
  logoBlack: {
    color: "#0F161D",
    display: "inline",
  },
  logoRed: {
  color: "#BB0103",
   display: "inline",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#6c757d",
    marginBottom: "2rem",
    fontWeight: "300",
  },
  curveBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    overflow: "hidden",
    zIndex: 0,
  },
};

export default LandingPage;