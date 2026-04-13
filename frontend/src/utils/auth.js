import axios from "axios";

/**
 * Shared logout utility — call from any component.
 * Clears localStorage and calls the backend logout endpoint.
 */
export async function handleLogout(navigate) {
  try {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      await axios.post("/api/logout", { email: userEmail });
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
  
  // Clear all localStorage keys
  localStorage.removeItem("email");
  localStorage.removeItem("full_name");
  localStorage.removeItem("study_abroad_city");
  localStorage.removeItem("myCities");
  localStorage.removeItem("token");
  localStorage.removeItem("vocabCards");
  localStorage.removeItem("savedEvents");
  localStorage.removeItem("studyStats");
  localStorage.removeItem("dailyGoal");
  localStorage.removeItem("todayProgress");
  localStorage.removeItem("progressDate");
  localStorage.removeItem("reservations");
  localStorage.removeItem("cityPickerDismissed");
  localStorage.removeItem("twHistory");
  localStorage.removeItem("studyHistory");
  localStorage.removeItem("phraseOfDay");
  localStorage.removeItem("phraseOfDayDate");
  localStorage.removeItem("dailyPhraseBookmarks");
  localStorage.removeItem("eventPhraseBookmarks");
  localStorage.removeItem("eventbrite_token");
  
  // Reload the page to reset all component state
  window.location.href = "/";
}

/**
 * Check if a user is currently logged in (has email in localStorage).
 */
export function isLoggedIn() {
  return !!localStorage.getItem("email");
}

/**
 * Get the current user's email, or empty string.
 */
export function getUserEmail() {
  return localStorage.getItem("email") || "";
}

/**
 * Get the stored JWT token.
 */
export function getToken() {
  return localStorage.getItem("token") || "";
}

/**
 * Create an Axios config that includes both the JWT and legacy X-User-Email header.
 */
export function authHeaders() {
  const email = localStorage.getItem("email") || "";
  const token = localStorage.getItem("token") || "";
  const headers = { "X-User-Email": email };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return { headers };
}

/**
 * Restore session from stored JWT token.
 * Returns the user profile object on success, or null on failure.
 */
export async function restoreSession() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const res = await axios.get("/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200 && res.data.email) {
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("full_name", res.data.full_name || "");
      localStorage.setItem("study_abroad_city", res.data.study_abroad_city || "");
      if (res.data.saved_cities) localStorage.setItem("myCities", JSON.stringify(res.data.saved_cities));
      if (res.data.vocab_cards) localStorage.setItem("vocabCards", JSON.stringify(res.data.vocab_cards));
      if (res.data.saved_events) localStorage.setItem("savedEvents", JSON.stringify(res.data.saved_events));
      if (res.data.study_stats) localStorage.setItem("studyStats", JSON.stringify(res.data.study_stats));
      if (res.data.token) localStorage.setItem("token", res.data.token);
      return res.data;
    }
  } catch {
    // Token invalid/expired — clear it
    localStorage.removeItem("token");
  }
  return null;
}
