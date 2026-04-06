import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faBookmark,
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [logOutMsg, setLogOutMsg] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");

  const handleLogout = async () => {
    try {
      // Using Vite proxy for backend connection
      const response = await axios.post("/api/logout", {
        email: localStorage.getItem("email"),
      });
      if (response.status === 200 || response.status === 204) {
        localStorage.removeItem("email");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setLogOutMsg(error.response.data.error || "Logout error");
      } else {
        setLogOutMsg("An unexpected error occurred during logout.");
      }
    }
  };

  const handleDeleteAccount = () => {
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    setShowDeletePopup(false);
    try {
      const response = await axios.post("/api/delete", {
        email: localStorage.getItem("email"),
      });
      if (response.status === 200 || response.status === 204) {
        localStorage.removeItem("email");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setDeleteMsg(error.response.data.error || "Deletion error");
      } else {
        setDeleteMsg("An unexpected error occurred while deleting account.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img
          src={logo}
          alt="MyTranslationBuddy Logo"
          style={styles.logo}
          onClick={() => navigate("/")}
        />
        <div style={styles.navButtons}>
          <button onClick={() => navigate("/update-password")} style={styles.navButton}>
            Security
          </button>
          {/* Kept these generic for you to implement later */}
          <button onClick={() => navigate("/events")} style={styles.navButton}>
            Local Events
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.profileContent}>
        <div style={styles.profileInfoSection}>
          <div style={styles.profilePicCircle}>
            <span style={styles.profilePicText}>MB</span>
          </div>
          <div>
            <h2 style={styles.name}>
              Student Profile
            </h2>
            <p style={styles.emailText}>
              {localStorage.getItem("email") || "Not logged in"}
            </p>
          </div>
        </div>

        {logOutMsg && <p style={styles.errorText}>{logOutMsg}</p>}
        {deleteMsg && <p style={styles.errorText}>{deleteMsg}</p>}

        <div style={styles.actionsSection}>
          <h3 style={styles.sectionTitle}>Your Dashboard</h3>
          <div style={styles.actionButtons}>
            <button
              onClick={() => navigate("/reservation")}
              style={styles.primaryButton}
            >
              <FontAwesomeIcon icon={faLanguage} style={styles.buttonIcon} />
              <span>Request Guide</span>
            </button>
            <button
              onClick={() => navigate("/saved")}
              style={styles.primaryButton}
            >
              <FontAwesomeIcon icon={faBookmark} style={styles.buttonIcon} />
              <span>Saved Translations</span>
            </button>
            <button
              onClick={() => navigate("/tips")}
              style={styles.primaryButton}
            >
              <FontAwesomeIcon icon={faLightbulb} style={styles.buttonIcon} />
              <span>Dialect Tips</span>
            </button>
          </div>
        </div>

        <div style={styles.dangerZone}>
          <button onClick={handleDeleteAccount} style={styles.deleteButton}>
            Delete Account
          </button>
        </div>
      </div>

      {showDeletePopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h3 style={styles.popupTitle}>Confirm Account Deletion</h3>
            <p style={styles.popupText}>
              Are you sure you want to permanently delete your MyTranslationBuddy account? This action cannot be undone.
            </p>
            <div style={styles.popupButtons}>
              <button onClick={() => setShowDeletePopup(false)} style={styles.secondaryButton}>
                Cancel
              </button>
              <button onClick={confirmDelete} style={styles.dangerButton}>
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "2rem",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  logo: {
    height: "50px",
    cursor: "pointer",
  },
  navButtons: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
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
  logoutButton: {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#e9ecef",
    color: "#495057",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  profileContent: {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "3rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  },
  profileInfoSection: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    marginBottom: "3rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #e9ecef",
  },
  profilePicCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    boxShadow: "0 4px 10px rgba(58, 123, 213, 0.2)",
  },
  profilePicText: {
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  name: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#212529",
    margin: "0 0 0.5rem 0",
  },
  emailText: {
    color: "#6c757d",
    margin: 0,
    fontSize: "1rem",
  },
  actionsSection: {
    marginBottom: "3rem",
  },
  sectionTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#495057",
    marginBottom: "1.5rem",
  },
  actionButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  primaryButton: {
    padding: "2rem 1.5rem",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
    backgroundColor: "#f8f9fa",
    color: "#3a7bd5",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  buttonIcon: {
    fontSize: "2rem",
    color: "#3a7bd5",
  },
  dangerZone: {
    paddingTop: "2rem",
    borderTop: "1px solid #e9ecef",
    display: "flex",
    justifyContent: "flex-end",
  },
  deleteButton: {
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    border: "1px solid #dc3545",
    backgroundColor: "transparent",
    color: "#dc3545",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  errorText: {
    color: "#dc3545",
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    padding: "0.8rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    textAlign: "center",
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1001,
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: "2.5rem",
    borderRadius: "16px",
    textAlign: "center",
    maxWidth: "450px",
    width: "90%",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  popupTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#212529",
  },
  popupText: {
    fontSize: "1rem",
    color: "#6c757d",
    marginBottom: "2rem",
    lineHeight: "1.5",
  },
  popupButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  secondaryButton: {
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    backgroundColor: "transparent",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
  },
  dangerButton: {
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
  },
};

export default Profile;