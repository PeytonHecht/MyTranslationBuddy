import axios from "axios";
import { API_BASE } from "../config.js";

/**
 * Shared logout utility — call from any component.
 * Clears localStorage and calls the backend logout endpoint.
 */
export async function handleLogout(navigate) {
  try {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      await axios.post(`${API_BASE}/api/logout`, { email: userEmail });
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
  
  // Navigate via router instead of hard reload (works with HashRouter)
  if (navigate) {
    navigate("/");
  } else {
    window.location.href = window.location.pathname + "#/";
  }
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
 * Save user session data from a login/register/restore API response to localStorage.
 * Call this after any successful auth response to avoid duplicating setItem blocks.
 */
export function saveUserSession(data) {
  if (data.email) localStorage.setItem("email", data.email);
  if (data.full_name !== undefined) localStorage.setItem("full_name", data.full_name || "");
  if (data.study_abroad_city !== undefined) localStorage.setItem("study_abroad_city", data.study_abroad_city || "");
  if (data.token) localStorage.setItem("token", data.token);
  if (Array.isArray(data.saved_cities)) localStorage.setItem("myCities", JSON.stringify(data.saved_cities));
  if (Array.isArray(data.vocab_cards)) localStorage.setItem("vocabCards", JSON.stringify(data.vocab_cards));
  if (Array.isArray(data.saved_events)) localStorage.setItem("savedEvents", JSON.stringify(data.saved_events));
  if (data.study_stats && typeof data.study_stats === "object") {
    localStorage.setItem("studyStats", JSON.stringify(data.study_stats));
    // Restore individual study-stat keys so the Study Hub picks them up
    if (data.study_stats.daily_goal) localStorage.setItem("dailyGoal", data.study_stats.daily_goal.toString());
    if (data.study_stats.today_progress != null) localStorage.setItem("todayProgress", data.study_stats.today_progress.toString());
    if (data.study_stats.progress_date) localStorage.setItem("progressDate", data.study_stats.progress_date);
    if (Array.isArray(data.study_stats.study_history)) localStorage.setItem("studyHistory", JSON.stringify(data.study_stats.study_history));
    if (Array.isArray(data.study_stats.translation_history)) localStorage.setItem("twHistory", JSON.stringify(data.study_stats.translation_history));
  }
  if (Array.isArray(data.reservations)) localStorage.setItem("reservations", JSON.stringify(data.reservations));
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
    const res = await axios.get(`${API_BASE}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200 && res.data.email) {
      saveUserSession(res.data);
      return res.data;
    }
  } catch {
    // Token invalid/expired — clear it
    localStorage.removeItem("token");
  }
  return null;
}
