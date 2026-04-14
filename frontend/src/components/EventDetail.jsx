import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { isLoggedIn, authHeaders } from "../utils/auth.js";
import { Spinner, ErrorState } from "./ui/LoadingStates.jsx";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const EventDetail = () => {
  const { event_id } = useParams();
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Using the Vite proxy to connect securely
        const response = await axios.get(`/api/event-details/${event_id}`);
        setEventDetails(response.data);
      } catch (err) {
        setError("Error fetching event details. The event may no longer exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [event_id]);

  const handleReserveTicket = () => {
    const numberInput = window.prompt("Enter number of tickets to reserve:");

    // Check if user clicked cancel
    if (numberInput === null) return;

    const tickets = parseInt(numberInput);
    if (isNaN(tickets) || tickets < 1) {
      alert("Please enter a valid number of tickets.");
      return;
    }

    let ticketPrice = "Free / Unknown";
    if (eventDetails?.priceRanges && eventDetails.priceRanges.length > 0) {
      ticketPrice = `${eventDetails.priceRanges[0].min} ${eventDetails.priceRanges[0].currency}`;
    }

    const reservation = {
      eventId: eventDetails.id,
      eventName: eventDetails.name,
      tickets: tickets,
      ticketPrice: ticketPrice,
      eventDate: eventDetails?.dates?.start?.localDate || "N/A",
      dateSaved: new Date().toISOString()
    };

    const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    storedReservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(storedReservations));

    // Sync to backend
    if (isLoggedIn()) {
      const email = localStorage.getItem("email");
      axios.put("/api/user/profile", { email, reservations: storedReservations }, authHeaders()).catch(() => {});
    }

    alert(`Successfully saved your reservation for ${tickets} ticket(s)!`);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <Spinner size={48} label="Loading event details…"/>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => navigate("/events")} style={styles.navButton}>← Back</button>
        </div>
        <div style={styles.errorContainer}>
          <ErrorState message={error} onRetry={() => window.location.reload()} retryLabel="Reload"/>
        </div>
      </div>
    );
  }

  const eventName = eventDetails?.name || "Event Name Not Available";
  const eventDate = eventDetails?.dates?.start?.localDate || "N/A";
  const eventTime = eventDetails?.dates?.start?.localTime || "Time TBA";

  // Try to grab the best image (usually the highest resolution one is first or last)
  const imageUrl = eventDetails?.images?.[0]?.url || "https://via.placeholder.com/800x400?text=No+Image+Available";

  const venueName = eventDetails?._embedded?.venues?.[0]?.name || "Venue TBA";
  const cityName = eventDetails?._embedded?.venues?.[0]?.city?.name || "";
  const locationDisplay = cityName ? `${venueName}, ${cityName}` : venueName;

  const eventInfo = eventDetails?.info || eventDetails?.pleaseNote || eventDetails?.description || "No description provided by the organizer.";

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img
          src={logo}
          alt="MyTranslationBuddy Logo"
          style={styles.logo}
          onClick={() => navigate("/")}
        />
        <button onClick={() => navigate("/events")} style={styles.navButton}>
          ← Back to Events
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.imageContainer}>
          <img src={imageUrl} alt={eventName} style={styles.eventImage} />
        </div>

        <div style={styles.detailsCard}>
          <h1 style={styles.title}>{eventName}</h1>

          <div style={styles.metaGrid}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Date</span>
              <span style={styles.metaValue}>{eventDate}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Time</span>
              <span style={styles.metaValue}>{eventTime}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Location</span>
              <span style={styles.metaValue}>{locationDisplay}</span>
            </div>
          </div>

          <div style={styles.infoContainer}>
            <h3 style={styles.sectionTitle}>About This Event</h3>
            <p style={styles.descriptionText}>{eventInfo}</p>
          </div>

          <div style={styles.actionContainer}>
            <button onClick={handleReserveTicket} style={styles.primaryButton}>
              Save to My Events
            </button>
            {eventDetails?.url && (
              <a
                href={eventDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.secondaryButton}
              >
                Buy Official Tickets
              </a>
            )}
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
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    maxWidth: "900px",
    margin: "0 auto 2rem auto",
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
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    overflow: "hidden", // Keeps the image inside the rounded corners
  },
  imageContainer: {
    width: "100%",
    height: "350px",
    backgroundColor: "#e9ecef",
  },
  eventImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  detailsCard: {
    padding: "3rem",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#212529",
    marginBottom: "2rem",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: "1.2",
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2.5rem",
    padding: "1.5rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  metaLabel: {
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#6c757d",
    fontWeight: "600",
  },
  metaValue: {
    fontSize: "1.1rem",
    color: "#212529",
    fontWeight: "500",
  },
  infoContainer: {
    marginBottom: "3rem",
  },
  sectionTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#3a7bd5",
    marginBottom: "1rem",
    fontFamily: "'Poppins', sans-serif",
  },
  descriptionText: {
    fontSize: "1.05rem",
    color: "#495057",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap", // Preserves paragraph breaks from the API
  },
  actionContainer: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    borderTop: "1px solid #e9ecef",
    paddingTop: "2rem",
  },
  primaryButton: {
    padding: "1rem 2rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3a7bd5",
    color: "white",
    cursor: "pointer",
    fontSize: "1.05rem",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  },
  secondaryButton: {
    padding: "1rem 2rem",
    borderRadius: "8px",
    border: "2px solid #3a7bd5",
    backgroundColor: "transparent",
    color: "#3a7bd5",
    cursor: "pointer",
    fontSize: "1.05rem",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#6c757d",
    fontWeight: "500",
  },
  errorContainer: {
    backgroundColor: "#ffffff",
    padding: "3rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto",
  },
  errorText: {
    color: "#dc3545",
    fontSize: "1.1rem",
    fontWeight: "500",
  },
};

export default EventDetail;