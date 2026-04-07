import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const Tracking = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [wordsLearned, setWordsLearned] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [trackingError, setTrackingError] = useState("");

  useEffect(() => {
    fetchTrackingData();
  }, []);

  const fetchTrackingData = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/login");
        return;
      }

      const response = await axios.post("/api/checktracking", { email });
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch tracking data", error);
    }
  };

  const handleAddTracking = async () => {
    if (!category || !wordsLearned) {
      setTrackingError("Please fill out both the category and amount.");
      return;
    }

    try {
      await axios.post("/api/addtracking", {
        email: localStorage.getItem("email"),
        exerciseType: category,
        exerciseTime: wordsLearned,
        date: date
      });

      fetchTrackingData();
      setCategory("");
      setWordsLearned("");
      setTrackingError("");
    } catch (error) {
      if (error.response && error.response.data) {
        setTrackingError(error.response.data.error || "Tracking Error");
      } else {
        setTrackingError("Could not connect to the server.");
      }
    }
  };

  const handleDeleteTracking = async (id) => {
    try {
      await axios.delete("/api/deletetracking", {
        data: { id: id }
      });
      fetchTrackingData();
    } catch (error) {
      console.error("Error deleting record:", error);
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
        <h1 style={styles.title}>Vocabulary Tracker</h1>
        <p style={styles.subtitle}>Log how many new German words you learn each day</p>

        {trackingError && <p style={styles.errorText}>{trackingError}</p>}

        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Topic (e.g., Food, Transit, Slang)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Words Learned (e.g., 15)"
              value={wordsLearned}
              onChange={(e) => setWordsLearned(e.target.value)}
              style={styles.input}
              min="1"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleAddTracking} style={styles.primaryButton}>
              Log Words
            </button>
          </div>
        </div>

        {data.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Topic / Category</th>
                  <th style={styles.th}>Words Learned</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} style={styles.tr}>
                    <td style={styles.td}>{item[4] || item.date}</td>
                    <td style={styles.td}>{item[2] || item.exerciseType}</td>
                    <td style={styles.td}>
                      <span style={styles.numberBadge}>{item[3] || item.exerciseTime} words</span>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleDeleteTracking(item[0] || item._id)}
                        style={styles.deleteButton}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p style={styles.placeholder}>No vocabulary logged yet. Start tracking your progress above!</p>
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
    marginTop: "5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "0.5rem",
    fontFamily: "'Poppins', sans-serif",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#6c757d",
    marginBottom: "2.5rem",
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
  numberBadge: {
    backgroundColor: "rgba(58, 123, 213, 0.1)",
    color: "#3a7bd5",
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "600",
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

export default Tracking;