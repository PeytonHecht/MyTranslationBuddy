import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Trash2, MapPin, MessageCircle, BookOpen, ArrowLeft, Bookmark } from 'lucide-react';
import logo from "../assets/MTBLogo.png";

const DialectTips = () => {
  const navigate = useNavigate();
  const [phrase, setPhrase] = useState("");
  const [region, setRegion] = useState("");
  const [meaning, setMeaning] = useState("");
  const [tips, setTips] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    setIsLoading(true);
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/login");
        return;
      }

      const response = await axios.post("/api/get-tips", { email });
      setTips(response.data);
    } catch (err) {
      console.error("Failed to load dialect tips", err);
      // Fallback data for frontend testing
      // setTips([{ _id: "1", region: "Hamburg", phrase: "Moin", meaning: "Hello / Good morning" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTip = async (e) => {
    e.preventDefault(); // Prevent page refresh if wrapped in a form
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

      fetchTips();
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
      fetchTips();
    } catch (error) {
      console.error("Error deleting tip:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img
            src={logo}
            alt="MyTranslationBuddy Logo"
            style={styles.logo}
            onClick={() => navigate("/")}
          />
          <button onClick={() => navigate("/profile")} style={styles.backButton}>
            <ArrowLeft size={18} />
            Back to Profile
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.heroCard}>
          <Bookmark size={32} color="#3B82F6" style={{ marginBottom: '1rem' }} />
          <h1 style={styles.title}>My Phrasebook</h1>
          <p style={styles.subtitle}>
            Track local slang, regional dialects, and useful phrases for your study abroad journey.
          </p>
        </div>

        {errorMsg && (
          <div style={styles.errorBanner}>
            {errorMsg}
          </div>
        )}

        {/* Add Tip Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Add a New Phrase</h2>
          <form style={styles.formGroup} onSubmit={handleAddTip}>
            <div style={styles.inputWrapper}>
              <MessageCircle size={18} color="#6B7280" style={styles.inputIcon} />
              <input
                type="text"
                placeholder="German Phrase (e.g., 'Moin')"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputWrapper}>
              <MapPin size={18} color="#6B7280" style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Region (e.g., Hamburg)"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputWrapper}>
              <BookOpen size={18} color="#6B7280" style={styles.inputIcon} />
              <input
                type="text"
                placeholder="English Meaning"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.primaryButton}>
              <Plus size={18} />
              Save Tip
            </button>
          </form>
        </div>

        {/* Saved Tips List */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Saved Phrases</h2>

          {isLoading ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyStateText}>Loading your phrasebook...</p>
            </div>
          ) : tips.length > 0 ? (
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
                        <span style={styles.regionBadge}>
                          <MapPin size={12} style={{ marginRight: '4px' }} />
                          {tip.region}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <strong style={styles.phraseText}>{tip.phrase}</strong>
                      </td>
                      <td style={styles.td}>{tip.meaning}</td>
                      <td style={styles.td}>
                        <button
                          onClick={() => handleDeleteTip(tip._id || tip.id)}
                          style={styles.deleteButton}
                          title="Delete Phrase"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <Bookmark size={48} color="#D1D5DB" style={{ marginBottom: '1rem' }} />
              <p style={styles.emptyStateText}>
                Your phrasebook is empty. Start adding local slang above!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #E5E7EB",
    padding: "1rem 2rem",
  },
  headerContent: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "40px",
    cursor: "pointer",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #E5E7EB",
    backgroundColor: "#ffffff",
    color: "#4B5563",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  main: {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "0 2rem",
  },
  heroCard: {
    backgroundColor: "#DBEAFE",
    padding: "2rem",
    borderRadius: "1rem",
    marginBottom: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1E3A8A",
    margin: "0 0 0.5rem 0",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#3B82F6",
    margin: 0,
  },
  errorBanner: {
    backgroundColor: "#FEE2E2",
    color: "#991B1B",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    fontSize: "0.9rem",
    border: "1px solid #F87171",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 1.5rem 0",
  },
  formGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    alignItems: "center",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem 0.75rem 2.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #D1D5DB",
    fontSize: "0.95rem",
    backgroundColor: "#F9FAFB",
    boxSizing: "border-box",
    outline: "none",
  },
  primaryButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    backgroundColor: "#2563EB",
    color: "white",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    height: "100%",
  },
  tableContainer: {
    width: "100%",
    overflowX: "auto",
    borderRadius: "0.5rem",
    border: "1px solid #E5E7EB",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "1rem",
    backgroundColor: "#F9FAFB",
    color: "#4B5563",
    fontWeight: "600",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #E5E7EB",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #E5E7EB",
    color: "#374151",
    fontSize: "0.95rem",
    verticalAlign: "middle",
  },
  tr: {
    backgroundColor: "#ffffff",
  },
  regionBadge: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#DBEAFE",
    color: "#1E3A8A",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  phraseText: {
    color: "#111827",
    fontSize: "1rem",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: "1px solid #FCA5A5",
    backgroundColor: "#FEF2F2",
    color: "#EF4444",
    cursor: "pointer",
  },
  emptyState: {
    padding: "3rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #E5E7EB",
    borderRadius: "0.5rem",
    backgroundColor: "#F9FAFB",
  },
  emptyStateText: {
    color: "#6B7280",
    margin: 0,
    fontSize: "0.95rem",
  },
};

export default DialectTips;