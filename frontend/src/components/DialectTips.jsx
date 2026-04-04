import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const DialectTips = () => {
  const navigate = useNavigate();
  const [phrase, setPhrase] = useState("");
  const [region, setRegion] = useState("");
  const [meaning, setMeaning] = useState("");
  const [tips, setTips] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/login");
        return;
      }

      // Using Vite proxy for backend connection
      const response = await axios.post("/api/get-tips", { email });
      setTips(response.data);
    } catch (err) {
      console.error("Failed to load dialect tips", err);
      // Fallback data for testing if backend isn't ready
      // setTips([{ _id: "1", region: "Hamburg", phrase: "Moin", meaning: "Hello / Good morning" }]);
    }
  };

  const handleAddTip = async () => {
    if (!phrase || !region || !meaning) {
      setErrorMsg("Please fill out all fields to save a tip.");
      return;
    }

    try {
      await axios.post("/api/add-tip", {
        email: localStorage.getItem("email"),
        phrase: phrase,
        region: region,
        meaning: meaning,
        dateAdded: new Date().toISOString(),
      });

      // Refresh the list after adding
      fetchTips();

      // Clear inputs
      setPhrase("");
      setRegion("");
      setMeaning("");
      setErrorMsg("");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.error || "Error saving tip");
      } else {
        setErrorMsg("Could not connect to server.");
      }
    }
  };

  const handleDeleteTip = async (id) => {
    try {
      await axios.delete("/api/delete-tip", {
        data: { id: id },
      });

      // Refresh the list after deleting
      fetchTips();
    } catch (error) {
      console.error("Error deleting tip:", error);
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
        <h1 style={styles.title}>Saved Dialect Tips</h1>
        <p style={styles.subtitle}>Track local slang and phrases for your study abroad regions</p>

        {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}

        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="German Phrase / Slang (e.g., 'Moin')"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Region (e.g., Hamburg)"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="English Meaning"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleAddTip} style={styles.primaryButton}>
              Save Tip
            </button>
          </div>
        </div>

        {tips.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Region</th>
                  <th style={styles.th}>Phrase / Slang</th>
                  <th style={styles.th}>Meaning</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tips.map((tip) => (
                  <tr key={tip._id || tip.id} style={styles.tr}>
                    <td style={styles.td}>
                      <span style={styles.regionBadge}>{tip.region}</span>
                    </td>
                    <td style={styles.td}><strong>{tip.phrase}</strong></td>
                    <td style={styles.td}>{tip.meaning}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleDeleteTip(tip._id || tip.id)}
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
              No dialect tips saved yet. Start adding local phrases above!
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
    border: "none",
    backgroundColor: "transparent",
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
    maxWidth: "900px",
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
    marginBottom: "2.5rem",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    marginBottom: "3rem",
    boxSizing: "border-box",
  },
  inputGroup: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  input: {
    flex: "1 1 200px",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    backgroundColor: "#f8f9fa",
    transition: "border-color 0.2s",
  },
  primaryButton: {
    flex: "0 1 auto",
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3a7bd5",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
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
  regionBadge: {
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
    padding: "3rem",
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
    fontSize: "0.95rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
  },
};

export default DialectTips;