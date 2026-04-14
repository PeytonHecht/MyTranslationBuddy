/**
 * Shared city data for MyTranslationBuddy.
 * Single source of truth — imported by Register, Profile, Events, Reservations, etc.
 */

export const ALL_CITIES = [
  { name:"Berlin",          slug:"berlin",     country:"DE", emoji:"🏛️", tag:"Capital & culture" },
  { name:"Munich",          slug:"munich",     country:"DE", emoji:"🍺", tag:"Beer gardens & Alps" },
  { name:"Hamburg",         slug:"hamburg",    country:"DE", emoji:"⚓", tag:"Harbor & nightlife" },
  { name:"Stuttgart",       slug:"stuttgart",  country:"DE", emoji:"🚗", tag:"Auto & media hub" },
  { name:"Aachen",          slug:"aachen",     country:"DE", emoji:"🔬", tag:"Engineering & trips" },
  { name:"Bonn",            slug:"bonn",       country:"DE", emoji:"🎵", tag:"Beethoven & Rhine" },
  { name:"Detmold",         slug:"detmold",    country:"DE", emoji:"🌲", tag:"Design & forest" },
  { name:"Wiesbaden (EBS)", slug:"ebs",        country:"DE", emoji:"🍷", tag:"Spa city & wine" },
  { name:"Eltville",        slug:"eltville",   country:"DE", emoji:"🏰", tag:"Rhine wine village" },
  { name:"Jena",            slug:"jena",       country:"DE", emoji:"🔭", tag:"Science & optics" },
  { name:"Lemgo",           slug:"lemgo",      country:"DE", emoji:"🚲", tag:"Medieval & bikes" },
  { name:"Mannheim",        slug:"mannheim",   country:"DE", emoji:"🏯", tag:"Palace campus" },
  { name:"Osnabrück",       slug:"osnabruck",  country:"DE", emoji:"🕊️", tag:"City of peace" },
  { name:"Vallendar",       slug:"vallendar",  country:"DE", emoji:"📊", tag:"Top business school" },
  { name:"Würzburg",        slug:"wurzburg",   country:"DE", emoji:"🍷", tag:"Wine & baroque" },
  { name:"Leipzig",         slug:"leipzig",    country:"DE", emoji:"🎨", tag:"Art & nightlife" },
  { name:"Vienna",          slug:"vienna",     country:"AT", emoji:"🎼", tag:"Opera & coffeehouses" },
  { name:"Salzburg",        slug:"salzburg",   country:"AT", emoji:"🏔️", tag:"Alpine & Mozart" },
  { name:"Graz",            slug:"graz",       country:"AT", emoji:"🕰️", tag:"UNESCO old town" },
  { name:"Zurich",          slug:"zurich",     country:"CH", emoji:"🏦", tag:"Lake & innovation" },
  { name:"Bern",            slug:"bern",       country:"CH", emoji:"🐻", tag:"Swiss capital & Aare" },
  { name:"Rapperswil-Jona", slug:"rapperswil", country:"CH", emoji:"🌹", tag:"Rose town on lake" },
  { name:"Winterthur",      slug:"winterthur", country:"CH", emoji:"🔬", tag:"Museums & ZHAW" },
];

export const COUNTRY_FLAGS = { DE:"🇩🇪", AT:"🇦🇹", CH:"🇨🇭" };
export const COUNTRY_NAMES = { DE:"Germany", AT:"Austria", CH:"Switzerland" };

/** Google OAuth Client ID — shared across Login & Register */
export const GOOGLE_CLIENT_ID = "142798767749-a6u0rv4pgjk0kqbi84uligsq77nt8cjr.apps.googleusercontent.com";

// ── Derived helpers for components that need different formats ──

/** City names grouped by country code (used by Events.jsx) */
export const CITIES_BY_COUNTRY = {
  DE: ALL_CITIES.filter(c => c.country === "DE").map(c => c.name).sort(),
  AT: ALL_CITIES.filter(c => c.country === "AT").map(c => c.name).sort(),
  CH: ALL_CITIES.filter(c => c.country === "CH").map(c => c.name).sort(),
};

/** Simple list of city names with "Select a City" placeholder (used by Reservations.jsx) */
export const CITY_NAMES_LIST = ["Select a City", ...ALL_CITIES.map(c => c.name)];

/** Map of city name → slug (used by Reservations.jsx) */
export const CITY_SLUG_MAP = Object.fromEntries(ALL_CITIES.map(c => [c.name, c.slug]));

/** Map of city name → country code (used by Reservations.jsx) */
export const CITY_COUNTRY_MAP = Object.fromEntries(ALL_CITIES.map(c => [c.name, c.country]));

/** Register.jsx format: { slug, name, country flag emoji } */
export const STUDY_CITIES = ALL_CITIES.map(c => ({
  slug: c.slug,
  name: c.name,
  country: COUNTRY_FLAGS[c.country] || "🌍",
}));
