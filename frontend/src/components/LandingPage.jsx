import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, MessageSquare, Coffee } from 'lucide-react';

// Mock phrase data (eventually you can fetch this from your backend API)
const dialectData = {
  berlin: {
    name: "Berlin",
    dialect: "Berlinerisch",
    greeting: "Icke",
    phrases: [
      { local: "Na?", standard: "Wie geht es dir?", english: "How are you? / What's up?", context: "The ultimate Berlin greeting. Acknowledge with another 'Na'." },
      { local: "Icke", standard: "Ich", english: "I / Me", context: "Classic Berlinerisch pronoun replacement." },
      { local: "Späti", standard: "Spätkauf", english: "Late-night convenience store", context: "Crucial for student life; where you buy drinks after hours." }
    ]
  },
  vienna: {
    name: "Vienna",
    dialect: "Wienerisch",
    greeting: "Servus",
    phrases: [
      { local: "Servus", standard: "Hallo / Tschüss", english: "Hello / Goodbye", context: "Friendly, versatile greeting used across Austria and Bavaria." },
      { local: "Oida", standard: "Alter", english: "Dude / Man (Contextual)", context: "Can mean anything from 'wow' to 'are you kidding me?' depending on tone." },
      { local: "Leiwand", standard: "Toll / Super", english: "Awesome / Great", context: "Used to describe something really good." }
    ]
  }
  // Add Munich, Hamburg, Stuttgart...
};

const CityDetails = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const city = dialectData[cityId] || dialectData['berlin']; // Fallback for demo

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Map
        </button>
        <h1 style={styles.title}>{city.name} Dialect Guide</h1>
      </header>

      <main style={styles.main}>
        <div style={styles.heroCard}>
          <MessageSquare size={32} color="#3B82F6" />
          <h2>Mastering {city.dialect}</h2>
          <p>
            Understanding the local slang will make navigating campus, ordering food,
            and making friends significantly easier.
          </p>
        </div>

        <h3 style={styles.sectionTitle}>Essential Student Phrases</h3>
        <div style={styles.grid}>
          {city.phrases.map((phrase, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cardHeader}>
                <h4 style={styles.localPhrase}>{phrase.local}</h4>
                <button style={styles.audioButton} title="Listen to pronunciation">
                  <Volume2 size={18} color="#6B7280" />
                </button>
              </div>
              <div style={styles.translations}>
                <p><strong>Standard German:</strong> {phrase.standard}</p>
                <p><strong>English:</strong> {phrase.english}</p>
              </div>
              <div style={styles.contextBox}>
                <Coffee size={14} />
                <span>{phrase.context}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const styles = {
  pageContainer: { fontFamily: "'Inter', sans-serif", backgroundColor: "#F9FAFB", minHeight: "100vh", padding: "2rem" },
  header: { maxWidth: "1000px", margin: "0 auto 2rem", display: "flex", flexDirection: "column", gap: "1rem" },
  backButton: { display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", color: "#4B5563", cursor: "pointer", fontSize: "1rem", padding: "0" },
  title: { fontSize: "2.5rem", color: "#111827", margin: 0 },
  main: { maxWidth: "1000px", margin: "0 auto" },
  heroCard: { backgroundColor: "#DBEAFE", padding: "2rem", borderRadius: "1rem", marginBottom: "2rem" },
  sectionTitle: { fontSize: "1.5rem", color: "#374151", marginBottom: "1rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" },
  card: { backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" },
  localPhrase: { fontSize: "1.5rem", fontWeight: "bold", color: "#2563EB", margin: 0 },
  audioButton: { background: "#F3F4F6", border: "none", padding: "0.5rem", borderRadius: "50%", cursor: "pointer" },
  translations: { fontSize: "0.9rem", color: "#4B5563", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" },
  contextBox: { display: "flex", gap: "0.5rem", alignItems: "flex-start", padding: "0.75rem", backgroundColor: "#F3F4F6", borderRadius: "0.5rem", fontSize: "0.85rem", color: "#374151" }
};

export default CityDetails;