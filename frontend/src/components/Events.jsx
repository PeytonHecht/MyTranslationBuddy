import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Changed to Germany (DE) since the app is for study abroad students there
  const countryCode = "DE";
  const radius = "";
  const unit = "miles";
  const size = "20";

  const fetchEvents = async (keywordParam = "", pageNum = 0) => {
    setIsLoading(true);
    try {
      // Using Vite proxy to communicate with your FastAPI backend
      const response = await axios.get("/api/tm-events", {
        params: {
          countryCode,
          keyword: keywordParam,
          radius,
          unit,
          size,
          page: pageNum
        },
        withCredentials: false
      });

      if (
        response.data &&
        response.data._embedded &&
        Array.isArray(response.data._embedded.events)
      ) {
        setEvents(response.data._embedded.events);
        setError("");
        if (response.data.page) {
          setCurrentPage(response.data.page.number);
          setTotalPages(response.data.page.totalPages);
        }
      } else if (response.data.fault) {
        setEvents([]);
        setError(response.data.fault.faultstring || "Error fetching events.");
      } else {
        setEvents([]);
        setError("No events found for this search.");
      }
    } catch (err) {
      setError(
        err.response && err.response.data
          ? err.response.data.fault?.faultstring || "Error fetching events."
          : "An unexpected error occurred while fetching events."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial events in Germany on load
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents(searchKeyword.trim(), 0);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    fetchEvents(searchKeyword.trim(), pageNum);
  };

  const renderPageButtons = () => {
    const maxButtons = 5;
    let start = Math.max(currentPage - Math.floor(maxButtons / 2), 0);
    let end = start + maxButtons;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxButtons, 0);
    }
    const buttons = [];
    for (let i = start; i < end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            ...styles.pageNumberButton,
            backgroundColor: i === currentPage ? "#3a7bd5" : "#fff",
            color: i === currentPage ? "#fff" : "#3a7bd5",
            borderColor: i === currentPage ? "#3a7bd5" : "#ced4da"
          }}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
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
        <button onClick={() => navigate("/profile")} style={styles.navButton}>
          ← Back to Profile
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>Local Events in Germany</h1>
          <p style={styles.subtitle}>Discover festivals, concerts, and cultural meetups near you</p>
        </div>

        <div style={styles.searchContainer}>
          <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search (e.g., Oktoberfest, museum, concert)"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              Search
            </button>
          </form>
        </div>

        {error && <p style={styles.errorText}>{error}</p>}

        {isLoading ? (
          <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>Searching for events...</p>
          </div>
        ) : events.length === 0 && !error ? (
          <p style={styles.loadingText}>No events found.</p>
        ) : (
          <>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Event Name</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>City / Venue</th>
                    <th style={styles.th}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => {
                    const eventDate =
                      event.dates && event.dates.start && event.dates.start.localDate
                        ? event.dates.start.localDate
                        : "TBD";

                    // Try to grab the city name to make it more relevant for travelers
                    const city =
                      event._embedded &&
                      event._embedded.venues &&
                      event._embedded.venues[0] &&
                      event._embedded.venues[0].city
                        ? event._embedded.venues[0].city.name
                        : "";

                    const venue =
                      event._embedded &&
                      event._embedded.venues &&
                      event._embedded.venues[0] &&
                      event._embedded.venues[0].name
                        ? event._embedded.venues[0].name
                        : "Location TBA";

                    const locationDisplay = city ? `${city} - ${venue}` : venue;

                    return (
                      <tr key={event.id} style={styles.tr}>
                        <td style={styles.td}>
                          <strong>{event.name || "Untitled Event"}</strong>
                        </td>
                        <td style={styles.td}>{eventDate}</td>
                        <td style={styles.td}>{locationDisplay}</td>
                        <td style={styles.td}>
                          {event.url ? (
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={styles.linkButton}
                            >
                              Get Tickets
                            </a>
                          ) : (
                            <span style={styles.linkDisabled}>N/A</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
                  disabled={currentPage === 0}
                  style={{
                    ...styles.pageButton,
                    opacity: currentPage === 0 ? 0.5 : 1,
                    cursor: currentPage === 0 ? "not-allowed" : "pointer"
                  }}
                >
                  Previous
                </button>
                {renderPageButtons()}
                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
                  disabled={currentPage === totalPages - 1}
                  style={{
                    ...styles.pageButton,
                    opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                    cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer"
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
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
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "3rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  },
  titleSection: {
    textAlign: "center",
    marginBottom: "2.5rem",
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
    margin: 0,
  },
  searchContainer: {
    marginBottom: "3rem",
    display: "flex",
    justifyContent: "center",
  },
  searchForm: {
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    borderRadius: "8px",
    overflow: "hidden", // Keeps the button border radius flush with the input
  },
  searchInput: {
    flex: "1 1 auto",
    padding: "1rem 1.5rem",
    fontSize: "1rem",
    border: "1px solid #ced4da",
    borderRight: "none",
    borderRadius: "8px 0 0 8px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  searchButton: {
    padding: "0 2rem",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "#3a7bd5",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  },
  errorText: {
    color: "#dc3545",
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "2rem",
  },
  loadingContainer: {
    padding: "4rem",
    textAlign: "center",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#6c757d",
    textAlign: "center",
  },
  tableContainer: {
    width: "100%",
    overflowX: "auto",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
  },
  th: {
    padding: "1.2rem 1rem",
    textAlign: "left",
    backgroundColor: "#f8f9fa",
    color: "#495057",
    fontWeight: "600",
    borderBottom: "2px solid #dee2e6",
  },
  tr: {
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#f8f9fa",
    },
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #e9ecef",
    color: "#212529",
    verticalAlign: "middle",
  },
  linkButton: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(58, 123, 213, 0.1)",
    color: "#3a7bd5",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
  },
  linkDisabled: {
    color: "#adb5bd",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2.5rem",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  pageButton: {
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    border: "1px solid #ced4da",
    backgroundColor: "#fff",
    color: "#495057",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  pageNumberButton: {
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    border: "1px solid",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }
};

export default Events;