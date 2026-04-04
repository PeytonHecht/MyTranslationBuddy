import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const Reservations = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  // Regions in Germany for study abroad focus
  const regions = [
    "Select a Region",
    "Bavaria (Bayern)",
    "Baden-Württemberg",
    "Berlin",
    "North Rhine-Westphalia",
    "Saxony (Sachsen)",
    "Other/General",
  ];

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/login");
        return;
      }

      const response = await axios.post("/api/get-reservations", { email });
      setReservations(response.data);
    } catch (err) {
      console.error("Failed to load reservations", err);
    }
  };

  const handleAddReservation = async () => {
    if (region === "Select a Region" || !region) {
      setError("Please select a valid region.");
      return;
    }
    if (!topic) {
      setError("Please enter a topic you need help with.");
      return;
    }

    try {
      await axios.post("/api/add-reservation", {
        email: localStorage.getItem("email"),
        region: region,
        topic: topic,
        date: date,
      });

      // Refresh the list after adding
      fetchReservations();

      // Clear inputs
      setRegion("");
      setTopic("");
      setError("");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || "Reservation Error");
      } else {
        setError("Could not connect to server.");
      }
    }
  };

  const handleDeleteReservation = async (id) => {
    try {
      await axios.delete("/api/delete-reservation", {
        data: { id: id },
      });

      // Refresh the list after deleting
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
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
        <h1 style={styles.title}>Dialect Guide Reservation</h1>
        <p style={styles.subtitle}>Request a translation guide for your study abroad region</p>

        {error && <p style={styles.errorText}>{error}</p>}

        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={styles.input}
            >
              {regions.map((r, index) => (
                <option key={index} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Topic (e.g., Ordering food, Train directions)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={styles.input}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleAddReservation} style={styles.primaryButton}>
              Request Guide
            </button>
          </div>
        </div>

        {reservations.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>German Region</th>
                  <th style={styles.th}>Topic / Focus</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((item) => (
                  <tr key={item._id || item.id} style={styles.tr}>
                    <td style={styles.td}>{item.date}</td>
                    <td style={styles.td}>{item.region}</td>
                    <td style={styles.td}>{item.topic}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleDeleteReservation(item._id || item.id)}
                        style={styles.deleteButton}
                      >
                        Cancel
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
              No active reservations. Request a regional guide above to get started!
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
  },
  tr: {
    transition: "background-color 0.2s",
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

export default Reservations;