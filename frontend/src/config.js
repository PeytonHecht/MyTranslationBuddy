/**
 * Centralized configuration for the MyTranslationBuddy frontend.
 *
 * In development the Vite dev-server proxy rewrites /api → localhost:8000,
 * so API_BASE defaults to "" (relative).
 *
 * For production (GitHub Pages), set VITE_API_URL in a .env.production file
 * or in the build environment so API calls target the deployed backend:
 *
 *   VITE_API_URL=https://your-backend-host.com
 *
 * Every component should import { API_BASE } from "../config.js" instead of
 * hardcoding "/api".
 */

export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

/**
 * Helper: build an absolute API path.
 *   api("/cities/")  →  "/api/cities/"            (dev, VITE_API_URL unset)
 *   api("/cities/")  →  "https://host.com/api/cities/"  (prod, VITE_API_URL set)
 */
export function api(path) {
  return `${API_BASE}${path.startsWith("/api") ? path : "/api" + path}`;
}
