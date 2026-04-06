import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const OAuthAuthenticate = () => {
  const navigate = useNavigate();

  // Note for your group report: In a production app, this Client ID
  // should ideally live in your frontend .env file (e.g., import.meta.env.VITE_EVENTBRITE_CLIENT_ID)
  const client_id = "EYPKMDVUGG73ZWQBXB";
  const redirect_uri = "http://localhost:5173/oauth-callback";

  const handleAuth = () => {
    // Directs the user to Eventbrite to log in and approve your app
    const authUrl = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    // This catches the token when Eventbrite redirects back to your app
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get("access_token");

      if (token) {
        localStorage.setItem("eventbrite_token", token);
        // Cleans the ugly token out of the browser URL bar for security/cleanliness
        window.history.replaceState(null, null, window.location.pathname);
        // Sends the user to the events page now that they are authenticated
        navigate("/events");
      }
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img
          src={logo}
          alt="MyTranslationBuddy Logo"
          style={styles.logo}
          onClick={() => navigate("/")}
        />
        <button onClick={() => navigate("/profile")} style={styles.navButton}>
          ← Back to Profile
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.title}>Connect Eventbrite</h2>
          <p style={styles.subtitle}>
            Link your Eventbrite account to discover local cultural events, language exchanges, and festivals during your stay in Germany!
          </p>

          <div style={styles.buttonGroup}>
            <button onClick={handleAuth} style={styles.primaryButton}>
              Authorize Eventbrite
            </button>
            <button onClick={() => navigate("/profile")} style={styles.secondaryButton}>
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "2rem",
    position: "relative",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  logo: {
    height: "50px",
    cursor: "pointer",
  },
  navButton: {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    backgroundColor: "#fff",
    color: "#495057",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 8rem)",
  },
  card: {
    padding: "3rem 2.5rem",
    borderRadius: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#212529",
    marginBottom: "1rem",
    background: "linear-gradient(90deg, #f05537, #ff8066)", // Eventbrite brand colors
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "'Poppins', sans-serif",
  },
  subtitle: {
    fontSize: "1.05rem",
    color: "#6c757d",
    marginBottom: "2.5rem",
    lineHeight: "1.6",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  primaryButton: {
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f05537", // Eventbrite orange
    color: "white",
    cursor: "pointer",
    fontSize: "1.05rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  secondaryButton: {
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    backgroundColor: "transparent",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
};

export default OAuthAuthenticate;