import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const SavedTranslations = () => {
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchSavedTranslations();
  }, []); // <-- FIXED: Added the empty dependency array to prevent infinite loops!

  const fetchSavedTranslations = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/login");
        return;
      }

      // Using the Vite proxy to connect to the backend
      const response = await axios.post("/api/get-saved-translations", { email });
      setSavedItems(response.data);
    } catch (error) {
      console.error("Failed to load saved translations", error);
      // setSavedItems([{ _id: "1", date: "2026-02-20", original: "Where is the train station?", translated: "Wo ist der Bahnhof?", dialect: "Standard German" }]);
    }
  };

  const handleDeleteTranslation = async (id) => {
    try {
      await axios.delete("/api/delete-saved-translation", {
        data: { id: id }
      });
      // Refresh the data after successful deletion
      fetchSavedTranslations();
    } catch (error) {
      console.error("Error deleting translation:", error);
      setErrorMsg("Failed to delete the translation.");
    }
  };

  return (
    <div style={styles.container}>
      <img
        src={logo}
        alt="MyTranslationBuddy Logo"
        style={styles.logo}
        onClick={() => navigate("/")}
      />

      <div style={styles.navButtons}>
        <button onClick={() => navigate("/profile")} style={styles.navButton}>
          ← Back to Profile
        </button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Saved Translations</h1>
        <p style={styles.subtitle}>Your personal history of German phrases and study notes</p>

        {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}

        {savedItems.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date Saved</th>
                  <th style={styles.th}>Original English</th>
                  <th style={styles.th}>German Translation</th>
                  <th style={styles.th}>Dialect / Region</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedItems.map((item) => (
                  <tr key={item._id || item.id} style={styles.tr}>
                    <td style={styles.td}>{item.date}</td>
                    <td style={styles.td}><strong>{item.original}</strong></td>
                    <td style={styles.td}>{item.translated}</td>
                    <td style={styles.td}>
                      <span style={styles.badge}>{item.dialect || "Standard"}</span>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleDeleteTranslation(item._id || item.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p style={styles.placeholder}>
              You haven't saved any translations yet.
            </p>
          </div>
        )}
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
  logo: {
    position: "absolute",
    top: "2rem",
    left: "2rem",
    height: "50px",
    cursor: "pointer",
  },
  navButtons: {
    position: "absolute",
    top: "2rem",
    right: "2rem",
  },
  navButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    backgroundColor: "#fff",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  content: {
    margin: "5rem auto 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1000px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "0.5rem",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#6c757d",
    marginBottom: "3rem",
    textAlign: "center",
  },
  tableContainer: {
    width: "100%",
    overflowX: "auto",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    backgroundColor: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "1.2rem 1rem",
    textAlign: "left",
    backgroundColor: "#f8f9fa",
    color: "#495057",
    fontWeight: "600",
    borderBottom: "2px solid #dee2e6",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #e9ecef",
    color: "#212529",
    verticalAlign: "middle",
  },
  tr: {
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#f8f9fa",
    },
  },
  badge: {
    backgroundColor: "rgba(58, 123, 213, 0.1)",
    color: "#3a7bd5",
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    display: "inline-block",
  },
  deleteButton: {
    padding: "0.4rem 0.8rem",
    borderRadius: "6px",
    border: "1px solid #dc3545",
    backgroundColor: "transparent",
    color: "#dc3545",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  emptyState: {
    width: "100%",
    padding: "4rem 2rem",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px dashed #ced4da",
    boxSizing: "border-box",
  },
  placeholder: {
    fontSize: "1.1rem",
    color: "#6c757d",
    margin: 0,
  },
  errorText: {
    color: "#dc3545",
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "2rem",
  },
};

export default SavedTranslations;