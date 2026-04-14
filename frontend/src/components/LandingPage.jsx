import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  MapPin, Globe, Bookmark, ArrowRight, Volume2, VolumeX,
  Calendar, Sparkles, Compass, ClipboardList, ChevronRight,
  GraduationCap, Languages, Map as MapIcon, Star, User, Info, X,
  Search, ChevronDown, Train, ExternalLink, Plane, Clock,
  DollarSign, Wifi, Coffee, Heart, Zap, TrendingUp, Navigation, BookOpen, LogOut
} from "lucide-react";
import logo from "../assets/MTBLogo.png";
import { handleLogout as sharedLogout, authHeaders } from "../utils/auth.js";
import { API_BASE } from "../config.js";

const BACKEND = API_BASE + "/api";

const CITY_COORDS = [
  { slug:"berlin", name:"Berlin", lat:52.52, lng:13.405, country:"DE", desc:"Capital city — world-class museums, vibrant nightlife, street art & startup culture. Great public transit, tons of student life.", uni:"FU Berlin, HU Berlin, TU Berlin", cost:"€800–1100/mo", beer:"€3.50", transit:"Semester ticket included", vibe:"Creative & edgy", mustDo:"Free museum Sundays, Mauerpark flea market" },
  { slug:"munich", name:"Munich", lat:48.1351, lng:11.582, country:"DE", desc:"Bavarian capital — Oktoberfest, beer gardens, Alpine day-trips & FC Bayern. Beautiful parks, excellent transit.", uni:"LMU, TU München", cost:"€1000–1400/mo", beer:"€4.50", transit:"Semester ticket €195/semester", vibe:"Traditional & polished", mustDo:"English Garden surfing, Viktualienmarkt lunch" },
  { slug:"hamburg", name:"Hamburg", lat:53.5511, lng:9.9937, country:"DE", desc:"Port city — Reeperbahn nightlife, Speicherstadt, harbor views & media industry hub. Rainy but worth it.", uni:"Universität Hamburg", cost:"€850–1150/mo", beer:"€3.80", transit:"HVV semester ticket", vibe:"Maritime & cool", mustDo:"Sunday Fischmarkt at 5am, harbor boat tour" },
  { slug:"stuttgart", name:"Stuttgart", lat:48.7758, lng:9.1829, country:"DE", desc:"Media & auto hub — Mercedes, Porsche, plus Hochschule der Medien for CJC students. Vineyards & Swabian food.", uni:"HdM Stuttgart, Uni Stuttgart", cost:"€850–1150/mo", beer:"€4.00", transit:"Semester ticket included", vibe:"Industrial chic", mustDo:"Mercedes-Benz Museum, Weindorf wine festival" },
  { slug:"aachen", name:"Aachen", lat:50.7753, lng:6.0839, country:"DE", desc:"Engineering hub — RWTH Aachen (top tech uni), near Belgium & Netherlands for cheap weekend trips.", uni:"RWTH Aachen", cost:"€700–900/mo", beer:"€3.00", transit:"Deutschland Semesterticket (regional trains free)", vibe:"Nerdy & international", mustDo:"Day trip to Maastricht (30 min), Aachener Printen cookies" },
  { slug:"bonn", name:"Bonn", lat:50.7374, lng:7.0982, country:"DE", desc:"Beethoven's birthplace — former West German capital, Rhine river walks, relaxed student city with great museums.", uni:"Universität Bonn", cost:"€750–950/mo", beer:"€3.20", transit:"Deutschland Semesterticket (regional trains free)", vibe:"Relaxed & green", mustDo:"Beethoven House, Rhine promenade sunset walk" },
  { slug:"detmold", name:"Detmold", lat:51.9386, lng:8.8789, country:"DE", desc:"Design & architecture — TH OWL's Detmolder Schule, Teutoburg Forest hiking, small-town charm, very affordable.", uni:"TH OWL Detmold", cost:"€550–750/mo", beer:"€2.80", transit:"Deutschland Semesterticket (regional trains free)", vibe:"Cozy small town", mustDo:"Hermannsdenkmal monument, forest hikes" },
  { slug:"ebs", name:"Wiesbaden (EBS)", lat:50.0782, lng:8.2398, country:"DE", desc:"Spa city — top private business school, Rhine wine country, close to Frankfurt nightlife & airport.", uni:"EBS Universität", cost:"€900–1200/mo", beer:"€4.00", transit:"RMV semester ticket", vibe:"Upscale & connected", mustDo:"Neroberg hilltop, Frankfurt Apfelwein district" },
  { slug:"eltville", name:"Eltville", lat:50.0286, lng:8.1175, country:"DE", desc:"Wine village — Riesling capital of the Rheingau, medieval castles, gorgeous river views. Very peaceful.", uni:"EBS campus", cost:"€700–900/mo", beer:"€3.50", transit:"RMV semester ticket", vibe:"Wine country quiet", mustDo:"Rheingau wine trail, castle ruins at sunset" },
  { slug:"jena", name:"Jena", lat:50.9271, lng:11.5892, country:"DE", desc:"Optics & science city — Zeiss Planetarium, TASSEP exchange for science majors, affordable Thuringian life.", uni:"Friedrich Schiller Universität", cost:"€550–750/mo", beer:"€2.80", transit:"Very affordable", vibe:"Academic & affordable", mustDo:"Zeiss Planetarium, Paradies Park" },
  { slug:"lemgo", name:"Lemgo", lat:52.0288, lng:8.8993, country:"DE", desc:"Medieval old town — TH OWL design & engineering campus, quiet study vibes, bike-friendly.", uni:"TH OWL Lemgo", cost:"€500–700/mo", beer:"€2.80", transit:"Deutschland Semesterticket (regional trains free)", vibe:"Quiet & bike-friendly", mustDo:"Hexenbürgermeisterhaus, bike to Detmold" },
  { slug:"mannheim", name:"Mannheim", lat:49.4875, lng:8.466, country:"DE", desc:"Grid city — top business school in Baroque palace, great nightlife, close to Heidelberg for day trips.", uni:"Universität Mannheim", cost:"€750–1000/mo", beer:"€3.50", transit:"VRN semester ticket", vibe:"Diverse & lively", mustDo:"Mannheim Palace campus, Heidelberg day trip" },
  { slug:"osnabruck", name:"Osnabrück", lat:52.2799, lng:8.0472, country:"DE", desc:"City of Peace — where the Peace of Westphalia was signed, charming old town, very student-friendly.", uni:"Universität Osnabrück", cost:"€600–800/mo", beer:"€3.00", transit:"Deutschland Semesterticket (regional trains free)", vibe:"Friendly & historic", mustDo:"Peace Hall, Botanical Garden" },
  { slug:"vallendar", name:"Vallendar", lat:50.3981, lng:7.6175, country:"DE", desc:"Rhine village — WHU (#1 German business school), tight-knit community, Koblenz nearby for nightlife.", uni:"WHU Vallendar", cost:"€700–950/mo", beer:"€3.20", transit:"Regional trains", vibe:"Tight-knit elite", mustDo:"Deutsches Eck in Koblenz, Rhine river cruise" },
  { slug:"wurzburg", name:"Würzburg", lat:49.7913, lng:9.9534, country:"DE", desc:"Franconian wine city — UNESCO Residenz palace, student pubs on the Old Main Bridge, Romantic Road start.", uni:"Julius-Maximilians-Universität", cost:"€650–850/mo", beer:"€3.20", transit:"Affordable regional", vibe:"Wine & history", mustDo:"Sunset wine on Alte Mainbrücke, Residenz palace tour" },
  { slug:"leipzig", name:"Leipzig", lat:51.3397, lng:12.3731, country:"DE", desc:"Creative capital — booming art & music scene, super affordable, ex-East Germany cool factor, Spinnerei galleries.", uni:"Universität Leipzig", cost:"€550–750/mo", beer:"€3.00", transit:"MDV semester ticket", vibe:"Artsy & cheap", mustDo:"Spinnerei art galleries, Karl-Liebknecht-Straße bars" },
  { slug:"vienna", name:"Vienna", lat:48.2082, lng:16.3738, country:"AT", desc:"Imperial capital — Schönbrunn, world-class opera & coffee houses, incredible public transit, always voted #1 livability.", uni:"Universität Wien, BOKU, WU", cost:"€900–1200/mo", beer:"€4.20", transit:"Semester ticket €75!", vibe:"Imperial & vibrant", mustDo:"€10 standing-room opera tickets, Naschmarkt brunch" },
  { slug:"salzburg", name:"Salzburg", lat:47.8095, lng:13.055, country:"AT", desc:"Mozart's birthplace — Alpine scenery, Sound of Music tours, charming old town, close to lakes & ski resorts.", uni:"Universität Salzburg", cost:"€800–1050/mo", beer:"€4.00", transit:"Salzburg Plus card", vibe:"Alpine & historic", mustDo:"Hohensalzburg fortress, Stiegl brewery tour" },
  { slug:"zurich", name:"Zurich", lat:47.3769, lng:8.5417, country:"CH", desc:"Finance & culture hub — stunning lake, trendy Züri West district, chocolate shops, expensive but worth visiting.", uni:"UZH, ETH Zürich", cost:"CHF 1500–2200/mo", beer:"CHF 7.00", transit:"ZVV zone pass", vibe:"Cosmopolitan & creative", mustDo:"Lindenhof viewpoint, Sprüngli hot chocolate" },
  { slug:"bern", name:"Bern", lat:46.948, lng:7.4474, country:"CH", desc:"Swiss capital — UNESCO medieval old town, Einstein's house, Aare river swimming in summer, cozy & walkable.", uni:"Universität Bern", cost:"CHF 1300–1800/mo", beer:"CHF 6.50", transit:"Libero zone pass", vibe:"Cozy capital", mustDo:"Aare river float in summer, Zytglogge clock show" },
  { slug:"rapperswil", name:"Rapperswil-Jona", lat:47.2266, lng:8.8184, country:"CH", desc:"Rose town on Lake Zurich — medieval castle, lakeside walks, OST engineering campus, 30 min to Zurich.", uni:"OST Rapperswil", cost:"CHF 1200–1600/mo", beer:"CHF 6.00", transit:"ZVV zone pass", vibe:"Lakeside & calm", mustDo:"Wooden bridge walk, castle rose garden" },
  { slug:"winterthur", name:"Winterthur", lat:47.5001, lng:8.724, country:"CH", desc:"Museum city — ZHAW engineering, great food scene, Technorama science center, quick Zurich access.", uni:"ZHAW Winterthur", cost:"CHF 1200–1600/mo", beer:"CHF 6.00", transit:"ZVV zone pass", vibe:"Cultural & accessible", mustDo:"Technorama hands-on science, Altstadt cafes" },
  { slug:"graz", name:"Graz", lat:47.0707, lng:15.4395, country:"AT", desc:"Austria's 2nd city — UNESCO old town, Schlossberg clock tower, affordable living, vibrant arts & student scene.", uni:"Universität Graz", cost:"€700–950/mo", beer:"€3.80", transit:"Semester ticket €150", vibe:"Artsy & affordable", mustDo:"Schlossberg elevator, Lend district street food" },
];
const TOTAL_CITIES = CITY_COORDS.length;

const PIN_COLORS = { DE: "#0021A5", AT: "#DC2626", CH: "#059669" };
const PIN_EMOJI = { DE: "🇩🇪", AT: "🇦🇹", CH: "🇨🇭" };
const COUNTRY_LABELS = { DE: "Germany", AT: "Austria", CH: "Switzerland" };
const COUNTRY_FLAGS = { DE: "\uD83C\uDDE9\uD83C\uDDEA", AT: "\uD83C\uDDE6\uD83C\uDDF9", CH: "\uD83C\uDDE8\uD83C\uDDED" };

const TRAVEL_ROUTES = [
  // Major corridors
  { from:"munich", to:"salzburg", time:"1.5h", price:"€29", type:"🚄 IC/EC" },
  { from:"munich", to:"zurich", time:"3.5h", price:"€39", type:"🚄 EC" },
  { from:"munich", to:"vienna", time:"4h", price:"€29", type:"🚄 Railjet" },
  { from:"munich", to:"stuttgart", time:"2h", price:"€23", type:"🚄 ICE" },
  { from:"berlin", to:"leipzig", time:"1h", price:"€19", type:"🚄 ICE" },
  { from:"berlin", to:"hamburg", time:"1.75h", price:"€25", type:"🚄 ICE" },
  { from:"berlin", to:"munich", time:"4h", price:"€35", type:"🚄 ICE" },
  { from:"vienna", to:"salzburg", time:"2.5h", price:"€25", type:"🚄 Railjet" },
  { from:"vienna", to:"graz", time:"2.5h", price:"€20", type:"🚄 Railjet" },
  { from:"zurich", to:"bern", time:"1h", price:"CHF 25", type:"🚄 IC" },
  { from:"zurich", to:"winterthur", time:"20min", price:"CHF 8", type:"🚂 S-Bahn" },
  { from:"zurich", to:"rapperswil", time:"35min", price:"CHF 12", type:"🚂 S-Bahn" },
  { from:"mannheim", to:"stuttgart", time:"35min", price:"€15", type:"🚄 ICE" },
  { from:"bonn", to:"aachen", time:"1h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"wurzburg", to:"munich", time:"2h", price:"€25", type:"🚄 ICE" },
  // Regional network (Deutschland Semesterticket = free regional travel)
  { from:"detmold", to:"lemgo", time:"15min", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"detmold", to:"bonn", time:"2.5h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"lemgo", to:"osnabruck", time:"2h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"bonn", to:"osnabruck", time:"3.5h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"aachen", to:"osnabruck", time:"3h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  // Hesse & Rhine
  { from:"ebs", to:"eltville", time:"20min", price:"Free w/ Semesterticket", type:"🚂 S-Bahn" },
  { from:"ebs", to:"mannheim", time:"1h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"vallendar", to:"bonn", time:"45min", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"vallendar", to:"ebs", time:"1.5h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"mannheim", to:"wurzburg", time:"1.5h", price:"€20", type:"🚄 ICE" },
  { from:"mannheim", to:"bonn", time:"2h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"stuttgart", to:"mannheim", time:"1.5h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  // East Germany
  { from:"jena", to:"leipzig", time:"1.25h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"leipzig", to:"berlin", time:"1.25h", price:"Free w/ Semesterticket", type:"🚂 RE" },
  { from:"jena", to:"berlin", time:"3h", price:"€25", type:"🚄 ICE" },
  // Swiss connections
  { from:"bern", to:"rapperswil", time:"1.5h", price:"CHF 30", type:"🚄 IC" },
  { from:"winterthur", to:"rapperswil", time:"50min", price:"CHF 14", type:"🚂 S-Bahn" },
  { from:"bern", to:"winterthur", time:"1.5h", price:"CHF 30", type:"🚄 IC" },
  // Cross-border fun
  { from:"salzburg", to:"graz", time:"4h", price:"€30", type:"🚄 IC" },
  { from:"hamburg", to:"leipzig", time:"3h", price:"€25", type:"🚄 ICE" },
  { from:"stuttgart", to:"zurich", time:"3h", price:"€29", type:"🚄 EC" },
  // More weekend trips
  { from:"vienna", to:"zurich", time:"8h", price:"€49", type:"🚄 Nightjet 🌙" },
  { from:"graz", to:"vienna", time:"2.5h", price:"€20", type:"🚄 Railjet" },
  { from:"graz", to:"zurich", time:"7h", price:"€49", type:"🚄 Nightjet 🌙" },
  { from:"jena", to:"munich", time:"3.5h", price:"€35", type:"🚄 ICE" },
  { from:"leipzig", to:"hamburg", time:"3h", price:"€25", type:"🚄 ICE" },
  { from:"bonn", to:"mannheim", time:"1.5h", price:"€22", type:"🚄 ICE" },
  { from:"wurzburg", to:"berlin", time:"3.5h", price:"€35", type:"🚄 ICE" },
];

// Weather hook — fetches real data from Open-Meteo (free, no API key)
const useWeather = (slugs) => {
  const [weatherMap, setWeatherMap] = useState({});

  useEffect(() => {
    if (!slugs || slugs.length === 0) return;

    const fetchAll = async () => {
      const results = {};
      await Promise.all(
        slugs.map(async (slug) => {
          const city = CITY_COORDS.find(c => c.slug === slug);
          if (!city) return;
          try {
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=1`
            );
            const data = await res.json();
            const code = data.current?.weathercode ?? 0;
            results[slug] = {
              hi: Math.round(data.daily?.temperature_2m_max?.[0] ?? data.current?.temperature_2m ?? 0),
              lo: Math.round(data.daily?.temperature_2m_min?.[0] ?? 0),
              temp: Math.round(data.current?.temperature_2m ?? 0),
              wind: Math.round(data.current?.windspeed_10m ?? 0),
              icon: wmoCond(code).icon,
              cond: wmoCond(code).cond,
              sunrise: data.daily?.sunrise?.[0]?.slice(11) ?? "—",
              sunset: data.daily?.sunset?.[0]?.slice(11) ?? "—",
            };
          } catch {
            results[slug] = null;
          }
        })
      );
      setWeatherMap(results);
    };

    fetchAll();
  }, [slugs.join(",")]);

  return weatherMap;
};

// WMO weather code → icon + label
const wmoCond = (code) => {
  if (code === 0) return { icon: "☀️", cond: "Clear & sunny" };
  if (code <= 2) return { icon: "⛅", cond: "Partly cloudy" };
  if (code === 3) return { icon: "☁️", cond: "Overcast" };
  if (code <= 49) return { icon: "🌫️", cond: "Foggy" };
  if (code <= 55) return { icon: "🌦️", cond: "Light drizzle" };
  if (code <= 65) return { icon: "🌧️", cond: "Rainy" };
  if (code <= 77) return { icon: "❄️", cond: "Snowy" };
  if (code <= 82) return { icon: "🌧️", cond: "Rain showers" };
  if (code <= 86) return { icon: "🌨️", cond: "Snow showers" };
  if (code <= 99) return { icon: "⛈️", cond: "Thunderstorms" };
  return { icon: "🌡️", cond: "Unknown" };
};

// Exchange rate hook — fetches live EUR↔CHF↔USD rates (free, no key)
const useExchangeRates = () => {
  const [rates, setRates] = useState(null);
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        if (data.result === "success" && data.rates) {
          const usd_eur = data.rates.EUR;
          const usd_chf = data.rates.CHF;
          setRates({
            usd_eur: usd_eur?.toFixed(2),
            usd_chf: usd_chf?.toFixed(2),
            eur_chf: (usd_chf / usd_eur)?.toFixed(2),
            eur_usd: (1 / usd_eur)?.toFixed(2),
          });
        }
      } catch { /* silent fail — rates are a nice-to-have */ }
    };
    fetchRates();
  }, []);
  return rates;
};

// Holidays hook — fetches REAL public holidays from Nager.Date API (free, no key)
const useHolidays = (countryCodes = ["DE", "AT", "CH"]) => {
  const [holidays, setHolidays] = useState([]);
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = new Date().getFullYear();
        const allHolidays = [];
        await Promise.all(
          countryCodes.map(async (cc) => {
            try {
              const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${cc}`);
              if (!res.ok) return;
              const data = await res.json();
              data.forEach(h => {
                allHolidays.push({
                  name: h.localName || h.name,
                  nameEn: h.name,
                  date: h.date,
                  country: cc,
                  counties: h.counties,
                });
              });
              // Also fetch next year's first few months for wrap-around
              const res2 = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year + 1}/${cc}`);
              if (res2.ok) {
                const data2 = await res2.json();
                data2.slice(0, 5).forEach(h => {
                  allHolidays.push({
                    name: h.localName || h.name,
                    nameEn: h.name,
                    date: h.date,
                    country: cc,
                    counties: h.counties,
                  });
                });
              }
            } catch { /* skip this country */ }
          })
        );
        // Sort by date and deduplicate by name+date
        const seen = new Set();
        const unique = allHolidays
          .sort((a, b) => a.date.localeCompare(b.date))
          .filter(h => {
            const key = `${h.date}-${h.nameEn}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        setHolidays(unique);
      } catch { /* silent fail */ }
    };
    fetchHolidays();
  }, [countryCodes.join(",")]);

  // Helper: get next upcoming holiday from today
  const getNextHoliday = (countryCode) => {
    const today = new Date().toISOString().split("T")[0];
    return holidays.find(h =>
      h.date >= today && (!countryCode || h.country === countryCode)
    );
  };

  return { holidays, getNextHoliday };
};

// Air Quality hook — fetches AQI from Open-Meteo Air Quality API (free, no key)
const useAirQuality = (slugs) => {
  const [aqiMap, setAqiMap] = useState({});
  useEffect(() => {
    if (!slugs || slugs.length === 0) return;
    const fetchAll = async () => {
      const results = {};
      await Promise.all(
        slugs.map(async (slug) => {
          const city = CITY_COORDS.find(c => c.slug === slug);
          if (!city) return;
          try {
            const res = await fetch(
              `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lng}&current=european_aqi,pm2_5,pm10`
            );
            const data = await res.json();
            const aqi = data.current?.european_aqi ?? null;
            const pm25 = data.current?.pm2_5 ?? null;
            let label = "—", color = "#9CA3AF", emoji = "🌫️";
            if (aqi !== null) {
              if (aqi <= 20) { label = "Excellent"; color = "#059669"; emoji = "🟢"; }
              else if (aqi <= 40) { label = "Good"; color = "#10B981"; emoji = "🟢"; }
              else if (aqi <= 60) { label = "Moderate"; color = "#F59E0B"; emoji = "🟡"; }
              else if (aqi <= 80) { label = "Poor"; color = "#EF4444"; emoji = "🟠"; }
              else if (aqi <= 100) { label = "Very Poor"; color = "#DC2626"; emoji = "🔴"; }
              else { label = "Hazardous"; color = "#7F1D1D"; emoji = "🔴"; }
            }
            results[slug] = { aqi, pm25, label, color, emoji };
          } catch { results[slug] = null; }
        })
      );
      setAqiMap(results);
    };
    fetchAll();
  }, [slugs.join(",")]);
  return aqiMap;
};

/**
 * Location-based fun facts — keyed by city slug.
 * Falls back to country-level facts, then generic DACH facts.
 * Randomizes on each render (different on every refresh).
 */
const CITY_FUN_FACTS = {
  berlin: [
    { fact: "Berlin has more bridges than Venice — roughly 960 compared to Venice's 400.", emoji: "🌉" },
    { fact: "Tempelhof Airport was converted into one of the world's largest urban parks in 2010.", emoji: "✈️" },
    { fact: "Berlin's U-Bahn system has 175 stations — some still have original 1902 Art Nouveau tiles.", emoji: "🚇" },
    { fact: "Kreuzberg's Turkish market on Maybachufer is the biggest in Europe outside Turkey.", emoji: "🛒" },
    { fact: "Berlin has more museums than rainy days — over 170 museums in total.", emoji: "🏛️" },
    { fact: "The Berlin Wall stood for 10,316 days. It's been down longer than it was up since Feb 2018.", emoji: "🧱" },
    { fact: "Berghain was a power plant before it became the world's most famous nightclub.", emoji: "🎵" },
    { fact: "Berlin is 9× the size of Paris but has less than half its population density.", emoji: "🏙️" },
    { fact: "Currywurst was invented in Berlin in 1949 — there's even a museum dedicated to it.", emoji: "🌭" },
    { fact: "Berlin has more döner kebab shops than Istanbul.", emoji: "🥙" },
  ],
  munich: [
    { fact: "The Eisbach river wave in Munich's English Garden has been illegally surfed since the 1970s.", emoji: "🏄" },
    { fact: "Munich's Hofbräuhaus serves about 10,000 liters of beer per day.", emoji: "🍺" },
    { fact: "Oktoberfest was originally a wedding celebration for Crown Prince Ludwig in 1810.", emoji: "🎪" },
    { fact: "The English Garden is larger than Central Park — 375 hectares of urban green.", emoji: "🌳" },
    { fact: "Munich's Marienplatz Glockenspiel plays at 11am and 12pm — it has 43 bells and 32 figures.", emoji: "⛪" },
    { fact: "Bavaria has more breweries than any other German state — over 600.", emoji: "🍻" },
    { fact: "BMW stands for Bayerische Motoren Werke — the HQ in Munich is shaped like a 4-cylinder engine.", emoji: "🚗" },
    { fact: "Munich's Viktualienmarkt has been an outdoor food market since 1807.", emoji: "🍽️" },
    { fact: "The word 'Lederhosen' means 'leather trousers' and they were originally Alpine workwear.", emoji: "👖" },
    { fact: "Biergartens in Munich let you bring your own food — just buy the beer there. It's the law.", emoji: "🍺" },
  ],
  hamburg: [
    { fact: "Hamburg has more bridges than any city in Europe — about 2,500 total.", emoji: "🌉" },
    { fact: "The Beatles played 281 shows in Hamburg before they became famous.", emoji: "🎤" },
    { fact: "Hamburg's Speicherstadt is the world's largest warehouse district built on timber-pile foundations.", emoji: "🏛️" },
    { fact: "Hamburgers aren't from Hamburg, but the Hamburg steak — minced beef — was.", emoji: "🍔" },
    { fact: "The Elbphilharmonie took 10 years to build and cost €866 million (10× over budget).", emoji: "🎵" },
    { fact: "Hamburg's Fischmarkt has been running every Sunday since 1703.", emoji: "🐟" },
    { fact: "The city has its own miniature country — the Speicherstadt was a free port zone until 2003.", emoji: "🏗️" },
    { fact: "Hamburg is Germany's media capital — more magazines are published here than in any other city.", emoji: "📰" },
  ],
  vienna: [
    { fact: "Vienna's coffee house culture is a UNESCO Intangible Cultural Heritage since 2011.", emoji: "☕" },
    { fact: "You can get standing-room tickets at the Vienna State Opera for just €13.", emoji: "🎵" },
    { fact: "The Wiener Prater Ferris wheel has been spinning since 1897.", emoji: "🎡" },
    { fact: "The Naschmarkt has been Vienna's most popular market since the 16th century.", emoji: "🛒" },
    { fact: "Vienna was voted the world's most liveable city 10 times in a row by Mercer.", emoji: "🏙️" },
    { fact: "Wiener Schnitzel must be veal to be authentic — anything else is 'Schnitzel Wiener Art'.", emoji: "🍽️" },
    { fact: "Sigmund Freud lived in Vienna for 79 years — his apartment is now a museum.", emoji: "🧠" },
    { fact: "Vienna's public transit annual pass costs just €365 — exactly €1 per day.", emoji: "🚇" },
    { fact: "The Vienna Philharmonic's New Year's Concert is broadcast to over 90 countries.", emoji: "🎻" },
    { fact: "Sachertorte was invented at Hotel Sacher in 1832 — they still use the original recipe.", emoji: "🍫" },
  ],
  zurich: [
    { fact: "You can swim in the Limmat river right in Zurich's city center — it's clean enough!", emoji: "🏊" },
    { fact: "Zurich's Bahnhofstrasse is one of the most expensive shopping streets in the world.", emoji: "🛍️" },
    { fact: "Einstein developed his theory of relativity while studying at ETH Zurich.", emoji: "�" },
    { fact: "Zurich has over 1,200 fountains — all flowing with drinkable water.", emoji: "⛲" },
    { fact: "The Swiss National Museum in Zurich looks like a fairy-tale castle but opened in 1898.", emoji: "🏰" },
    { fact: "Zurich's Lake promenade offers free swimming spots called 'Badis' all summer long.", emoji: "☀️" },
  ],
  bern: [
    { fact: "Bern's old town is a UNESCO World Heritage Site with 6 km of covered arcades.", emoji: "🏛️" },
    { fact: "The Bear Park houses real bears — Bern's heraldic animal since at least 1224.", emoji: "�" },
    { fact: "Einstein wrote his theory of special relativity while working at the Bern patent office.", emoji: "🔬" },
    { fact: "Locals swim the Aare river through the city center every summer — it's a Bern tradition.", emoji: "🏊" },
    { fact: "The Zytglogge clock tower has been running since 1530 — its figures animate every hour.", emoji: "🕰️" },
    { fact: "Bern is the de facto capital of Switzerland, but officially it's called the 'Federal City'.", emoji: "�️" },
  ],
  salzburg: [
    { fact: "Salzburg is Mozart's birthplace AND where 'The Sound of Music' was filmed.", emoji: "🎵" },
    { fact: "The Hohensalzburg Fortress is one of the largest medieval castles in Europe.", emoji: "🏰" },
    { fact: "Salzburg literally means 'Salt Castle' — the city grew rich from salt mining.", emoji: "🧂" },
    { fact: "The Salzburg Festival is one of the most prestigious arts festivals in the world since 1920.", emoji: "🎭" },
    { fact: "Salzburg's old town is so well-preserved it's a UNESCO World Heritage Site.", emoji: "🏛️" },
    { fact: "Stiegl brewery in Salzburg is Austria's largest private brewery, founded in 1492.", emoji: "🍺" },
  ],
  graz: [
    { fact: "Graz is Austria's second-largest city and a UNESCO City of Design.", emoji: "🎨" },
    { fact: "The Kunsthaus Graz is nicknamed the 'Friendly Alien' for its blob-like shape.", emoji: "👽" },
    { fact: "Graz's old town is a UNESCO World Heritage Site with the best-preserved city center in Central Europe.", emoji: "🏛️" },
    { fact: "The Schlossberg hill in the center of Graz has a free lift to the top for panoramic views.", emoji: "🏔️" },
    { fact: "Arnold Schwarzenegger grew up near Graz — there's a stadium named after him.", emoji: "💪" },
    { fact: "Graz has more students per capita than almost any other Austrian city.", emoji: "🎓" },
  ],
  stuttgart: [
    { fact: "Both Mercedes-Benz and Porsche were founded in Stuttgart.", emoji: "🚗" },
    { fact: "Stuttgart's Stäffele (outdoor staircases) total over 600 flights — great for urban hiking.", emoji: "🥾" },
    { fact: "The Mercedes-Benz Museum in Stuttgart is €5 after 4pm — great budget culture fix.", emoji: "�️" },
    { fact: "Stuttgart sits in a valley surrounded by vineyards — one of few German cities with urban wineries.", emoji: "🍷" },
    { fact: "The Cannstatter Volksfest is Stuttgart's version of Oktoberfest — and it's actually older.", emoji: "🎪" },
    { fact: "Stuttgart's TV Tower was the world's first telecommunications tower built of reinforced concrete.", emoji: "📡" },
  ],
  leipzig: [
    { fact: "Bach was cantor at St. Thomas Church in Leipzig for 27 years — free organ concerts on Fridays.", emoji: "🎵" },
    { fact: "Leipzig's Spinnerei is a former cotton mill turned into Europe's largest art gallery complex.", emoji: "🎨" },
    { fact: "The Peaceful Revolution of 1989 that led to German reunification started in Leipzig.", emoji: "✌️" },
    { fact: "Karl-Liebknecht-Straße (KarLi) is Leipzig's student bar strip — €2.50 beers all night.", emoji: "�" },
    { fact: "Leipzig has been called 'Hypezig' — it's one of Germany's fastest-growing creative hubs.", emoji: "🎭" },
    { fact: "Goethe set his play 'Faust' in Auerbachs Keller — you can still drink there today.", emoji: "🍷" },
  ],
  mannheim: [
    { fact: "The University of Mannheim is literally inside a Baroque palace — the Schloss.", emoji: "🏰" },
    { fact: "Mannheim's grid layout earned it the nickname 'Quadratestadt' — addresses are block numbers.", emoji: "🗺️" },
    { fact: "Karl Benz built the first automobile in Mannheim in 1886.", emoji: "🚗" },
    { fact: "Heidelberg Castle is only 20 minutes from Mannheim by S-Bahn.", emoji: "🏰" },
    { fact: "Mannheim's Luisenpark was voted Germany's most beautiful park.", emoji: "🌳" },
    { fact: "The SAP Arena in Mannheim hosts Germany's best ice hockey team, the Adler.", emoji: "🏒" },
  ],
  bonn: [
    { fact: "Beethoven was born in Bonn in 1770 — his birth house is now a museum.", emoji: "🎵" },
    { fact: "Bonn was West Germany's capital from 1949 to 1990 — many federal buildings remain.", emoji: "🏛️" },
    { fact: "The Haribo headquarters are in Bonn — gummy bears were invented nearby.", emoji: "🐻" },
    { fact: "Bonn's cherry blossom season on Heerstraße is world-famous every April.", emoji: "🌸" },
    { fact: "The Museum Mile in Bonn has 5 major museums within walking distance.", emoji: "🎨" },
  ],
  osnabruck: [
    { fact: "The Peace of Westphalia was signed in Osnabrück in 1648, ending the Thirty Years' War.", emoji: "🕊️" },
    { fact: "Osnabrück alternates between Catholic and Protestant mayors — a tradition since 1648.", emoji: "⛪" },
    { fact: "Erich Maria Remarque, author of 'All Quiet on the Western Front', was born in Osnabrück.", emoji: "📚" },
    { fact: "Osnabrück Zoo is one of the few zoos built entirely on a hillside.", emoji: "🦁" },
  ],
  wurzburg: [
    { fact: "The Würzburg Residence has the world's largest ceiling fresco — painted by Tiepolo.", emoji: "🎨" },
    { fact: "Alte Mainbrücke is THE student hangout — buy €3 wine and watch the sunset.", emoji: "�" },
    { fact: "Würzburg is the start of the Romantic Road — Germany's most famous tourist route.", emoji: "🛤️" },
    { fact: "Franconian wine from Würzburg comes in unique round bottles called 'Bocksbeutel'.", emoji: "🍶" },
  ],
  aachen: [
    { fact: "Aachen Cathedral was the first German UNESCO World Heritage Site (1978).", emoji: "⛪" },
    { fact: "Charlemagne made Aachen the capital of his empire in the 8th century.", emoji: "👑" },
    { fact: "Aachen is famous for its Printen — a type of gingerbread made here since the 15th century.", emoji: "�" },
    { fact: "RWTH Aachen is one of Europe's top technical universities — the MIT of Germany.", emoji: "🎓" },
    { fact: "Aachen's thermal springs have been used since Roman times — the city name comes from 'Aah' (water).", emoji: "♨️" },
  ],
};

/** Country-level fallback facts */
const COUNTRY_FUN_FACTS = {
  DE: [
    { fact: "Germany has over 1,500 types of beer, many brewed under the 1516 Reinheitsgebot purity law.", emoji: "🍺" },
    { fact: "The autobahn has no universal speed limit — but 30% of it does have restrictions.", emoji: "🚗" },
    { fact: "Germans invented the gummy bear (Haribo = Hans Riegel Bonn) in 1922.", emoji: "🐻" },
    { fact: "Germany recycles ~67% of its waste — one of the highest rates in the world.", emoji: "♻️" },
    { fact: "The Semesterticket gives students unlimited regional transit across the country.", emoji: "🚆" },
    { fact: "'Kindergarten' literally means 'children's garden' — invented in Germany in 1837.", emoji: "👶" },
    { fact: "Germany has a word for grief-eating weight gain: 'Kummerspeck' (grief bacon).", emoji: "🥓" },
    { fact: "'Feierabend' is the German concept of after-work relaxation — literally 'celebration evening'.", emoji: "🎉" },
    { fact: "In Germany, you can drink beer on the street — there's no open container law.", emoji: "🍻" },
    { fact: "Germany's Black Forest inspired many Brothers Grimm fairy tales.", emoji: "🌲" },
    { fact: "'Fernweh' means the opposite of homesickness — a longing for far-off places.", emoji: "✈️" },
    { fact: "The first printed book (Gutenberg Bible) was made in Mainz, Germany in 1455.", emoji: "📖" },
  ],
  AT: [
    { fact: "In Austria, you greet people with 'Grüß Gott' (God greet you) instead of 'Hallo'.", emoji: "👋" },
    { fact: "Austrian composer Johann Strauss II wrote 'The Blue Danube' — Austria's unofficial anthem.", emoji: "🎻" },
    { fact: "The 'Jause' is an Austrian mid-afternoon snack tradition — bread, cheese, and cold cuts.", emoji: "🧀" },
    { fact: "Austria has 62 cable cars and funiculars — one of the densest networks in the world.", emoji: "🚡" },
    { fact: "The croissant ('Kipferl') was actually invented in Vienna, not Paris.", emoji: "🥐" },
    { fact: "Austria's national library has over 12 million items — including handwritten scores by Mozart.", emoji: "📚" },
  ],
  CH: [
    { fact: "Switzerland has 4 official languages: German (63%), French (23%), Italian (8%), Romansh (0.5%).", emoji: "�️" },
    { fact: "Switzerland has enough nuclear bunkers to shelter 114% of its entire population.", emoji: "🏔️" },
    { fact: "The Swiss consume more chocolate per capita than any nation — about 10 kg per person/year.", emoji: "🍫" },
    { fact: "Switzerland's flag is square — the only other square national flag is Vatican City's.", emoji: "🇨🇭" },
    { fact: "Swiss trains run so punctually that the SBB clock became a design icon.", emoji: "⏰" },
    { fact: "It's technically illegal to flush the toilet after 10pm in Swiss apartments — noise pollution.", emoji: "🚽" },
    { fact: "Switzerland has the world's longest tunnel — the Gotthard Base Tunnel at 57.1 km.", emoji: "🚄" },
    { fact: "Swiss citizens can challenge any federal law by collecting 50,000 signatures.", emoji: "📝" },
  ],
};

/** Get a deterministic fun fact for a specific city/country.
 *  Uses day-of-year as seed so fact rotates daily but stays stable across re-renders. */
function getRandomFunFact(citySlug, countryCode, seed = 0) {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / 86400000);
  const stableSeed = dayOfYear + seed;
  // Try city-specific first
  const cityFacts = CITY_FUN_FACTS[citySlug];
  if (cityFacts && cityFacts.length > 0) {
    return cityFacts[stableSeed % cityFacts.length];
  }
  // Fall back to country
  const countryFacts = COUNTRY_FUN_FACTS[countryCode] || COUNTRY_FUN_FACTS.DE;
  return countryFacts[stableSeed % countryFacts.length];
}

/* Helper: returns true if a route is free with Deutschland Semesterticket.
   The €49 Deutschland-Semesterticket covers ALL regional trains (RE, RB,
   S-Bahn, local buses, trams) anywhere in Germany — no city restriction.
   NOT valid: ICE, IC, EC, Railjet, Nightjet, and NOT valid outside Germany. */
const isStudentFree = (r) => {
  const t = r.type || "";
  // Invalid (not covered): ICE, ICEC, IC, EC, Railjet, Nightjet — check FIRST
  const isHighSpeed = /\bICE\b|\bICEC\b|\bIC\b|\bEC\b|Railjet|Nightjet/.test(t);
  if (isHighSpeed) return false;
  // Valid types: RE, RB, S-Bahn, Bus, Tram
  const isRegional = /\bRE\b|\bRB\b|S-Bahn|\bBus\b|\bTram\b/.test(t);
  if (!isRegional) return false;
  // Both endpoints must be in Germany (DE) — ticket doesn't cover Swiss/Austrian networks
  const fromCity = CITY_COORDS.find(c => c.slug === r.from);
  const toCity = CITY_COORDS.find(c => c.slug === r.to);
  return (fromCity?.country === "DE") && (toCity?.country === "DE");
};

const LANDMARKS = [
  { lat:52.5163, lng:13.3777, name:"Brandenburg Gate", type:"landmark", city:"Berlin", icon:"🏛️", tip:"Free to visit 24/7. Best photos at sunrise before crowds.", cat:"culture", url:"https://maps.google.com/?q=Brandenburg+Gate+Berlin" },
  { lat:52.5209, lng:13.4094, name:"Museum Island", type:"museum", city:"Berlin", icon:"🎨", tip:"Get the €22 day pass for all 5 museums. Free Sundays once a month!", cat:"culture", url:"https://maps.google.com/?q=Museum+Island+Berlin" },
  { lat:52.5076, lng:13.3904, name:"Checkpoint Charlie", type:"landmark", city:"Berlin", icon:"📍", tip:"Skip the tourist trap — visit the free Wall Memorial on Bernauer Str. instead.", cat:"culture", url:"https://maps.google.com/?q=Checkpoint+Charlie+Berlin" },
  { lat:52.5316, lng:13.3850, name:"Mauerpark Flea Market", type:"market", city:"Berlin", icon:"🛍️", tip:"Every Sunday. Free karaoke at 3pm is legendary. Come hungry — best street food in Berlin.", cat:"food", url:"https://maps.google.com/?q=Mauerpark+Berlin" },
  { lat:52.4934, lng:13.4210, name:"Markthalle Neun", type:"food", city:"Berlin", icon:"🍽️", tip:"Thursday is Street Food Thursday (5–10pm). €3–8 plates from 30+ vendors. Student paradise.", cat:"food", url:"https://maps.google.com/?q=Markthalle+Neun+Berlin" },
  { lat:52.5074, lng:13.4234, name:"East Side Gallery", type:"landmark", city:"Berlin", icon:"🎨", tip:"1.3km of Berlin Wall murals. Free & open 24/7. Best photos at golden hour.", cat:"culture", url:"https://maps.google.com/?q=East+Side+Gallery+Berlin" },
  { lat:52.5244, lng:13.4105, name:"Hackescher Markt", type:"nightlife", city:"Berlin", icon:"🍸", tip:"Best starting point for a night out in Mitte. Cheap cocktails at nearby bars.", cat:"nightlife", url:"https://maps.google.com/?q=Hackescher+Markt+Berlin" },
  { lat:48.1374, lng:11.5755, name:"Marienplatz", type:"landmark", city:"Munich", icon:"⛪", tip:"Watch the Glockenspiel at 11am or 12pm. Get there 10 min early for a good spot.", cat:"culture", url:"https://maps.google.com/?q=Marienplatz+Munich" },
  { lat:48.1458, lng:11.5820, name:"English Garden", type:"park", city:"Munich", icon:"🌳", tip:"Watch surfers at the Eisbach wave! Bring a blanket & beer from Augustiner.", cat:"nature", url:"https://maps.google.com/?q=English+Garden+Munich" },
  { lat:48.1485, lng:11.5529, name:"Nymphenburg Palace", type:"landmark", city:"Munich", icon:"🏰", tip:"€8 student ticket. The park behind the palace is free & gorgeous for studying.", cat:"culture", url:"https://maps.google.com/?q=Nymphenburg+Palace+Munich" },
  { lat:48.1351, lng:11.5798, name:"Viktualienmarkt", type:"food", city:"Munich", icon:"🍽️", tip:"Munich's outdoor food market since 1807. Grab a Weißwurst before 12pm — tradition!", cat:"food", url:"https://maps.google.com/?q=Viktualienmarkt+Munich" },
  { lat:48.1482, lng:11.5830, name:"Augustiner Keller", type:"beer_garden", city:"Munich", icon:"🍺", tip:"Best beer garden in Munich. €4 Maß in the self-service area. Bring your own food!", cat:"food", url:"https://maps.google.com/?q=Augustiner+Keller+Munich" },
  { lat:53.5433, lng:9.9930, name:"Elbphilharmonie", type:"concert", city:"Hamburg", icon:"🎵", tip:"Free plaza visit with panoramic harbor views. Student concert tickets from €10.", cat:"culture", url:"https://maps.google.com/?q=Elbphilharmonie+Hamburg" },
  { lat:53.5441, lng:9.9887, name:"Speicherstadt", type:"landmark", city:"Hamburg", icon:"🏛️", tip:"Miniatur Wunderland here is a must — book online, walk-ins have 2hr waits.", cat:"culture", url:"https://maps.google.com/?q=Speicherstadt+Hamburg" },
  { lat:53.5501, lng:9.9667, name:"Fischmarkt", type:"market", city:"Hamburg", icon:"🐟", tip:"Every Sunday 5–9:30am. Yes, it's early — but the vibes (and Fischbrötchen) are unmatched.", cat:"food", url:"https://maps.google.com/?q=Fischmarkt+Hamburg" },
  { lat:53.5495, lng:9.9632, name:"Reeperbahn", type:"nightlife", city:"Hamburg", icon:"🎤", tip:"Hamburg's famous nightlife strip. Beatles played here! Student-friendly bars on Sternschanze nearby.", cat:"nightlife", url:"https://maps.google.com/?q=Reeperbahn+Hamburg" },
  { lat:48.7784, lng:9.1800, name:"Mercedes-Benz Museum", type:"museum", city:"Stuttgart", icon:"🚗", tip:"€5 after 4pm! Great even if you're not into cars. Free parking.", cat:"culture", url:"https://maps.google.com/?q=Mercedes+Benz+Museum+Stuttgart" },
  { lat:48.7762, lng:9.1722, name:"Porsche Museum", type:"museum", city:"Stuttgart", icon:"🏎️", tip:"€4 student price. Smaller than Mercedes but more hands-on. Combined ticket saves €3.", cat:"culture", url:"https://maps.google.com/?q=Porsche+Museum+Stuttgart" },
  { lat:48.2084, lng:16.3731, name:"St. Stephen's Cathedral", type:"landmark", city:"Vienna", icon:"⛪", tip:"Climb the 343 steps of the South Tower for the best city panorama.", cat:"culture", url:"https://maps.google.com/?q=Stephansdom+Vienna" },
  { lat:48.1863, lng:16.3123, name:"Schönbrunn Palace", type:"landmark", city:"Vienna", icon:"🏰", tip:"€10 student ticket. The gardens are free — skip the palace on a budget day.", cat:"culture", url:"https://maps.google.com/?q=Schoenbrunn+Palace+Vienna" },
  { lat:48.2034, lng:16.3695, name:"Vienna State Opera", type:"concert", city:"Vienna", icon:"🎵", tip:"€13 standing-room tickets sold 80 min before curtain. Life-changing experience.", cat:"culture", url:"https://maps.google.com/?q=Vienna+State+Opera" },
  { lat:48.1996, lng:16.3656, name:"Naschmarkt", type:"food", city:"Vienna", icon:"💐", tip:"Biggest outdoor market in Vienna. Saturday flea market is gold. €5 falafel at Neni.", cat:"food", url:"https://maps.google.com/?q=Naschmarkt+Vienna" },
  { lat:48.2048, lng:16.3573, name:"MuseumsQuartier", type:"museum", city:"Vienna", icon:"🎨", tip:"Hang out on the courtyard benches (free) — it's Vienna's living room. €5 student museum entry.", cat:"culture", url:"https://maps.google.com/?q=MuseumsQuartier+Vienna" },
  { lat:48.2138, lng:16.3612, name:"Donaukanal", type:"nightlife", city:"Vienna", icon:"🍹", tip:"Summer beach bars along the canal. Free art murals. Flex bar has €3 spritzers on Tuesdays.", cat:"nightlife", url:"https://maps.google.com/?q=Donaukanal+Vienna" },
  { lat:47.7949, lng:13.0470, name:"Hohensalzburg Fortress", type:"landmark", city:"Salzburg", icon:"🏰", tip:"Take the funicular up, walk down through the old town for views the whole way.", cat:"culture", url:"https://maps.google.com/?q=Hohensalzburg+Fortress" },
  { lat:47.8023, lng:13.0440, name:"Mozart's Birthplace", type:"museum", city:"Salzburg", icon:"🎵", tip:"€7 student price. The view from the 3rd floor over Getreidegasse is the real highlight.", cat:"culture", url:"https://maps.google.com/?q=Mozarts+Birthplace+Salzburg" },
  { lat:47.7963, lng:13.0410, name:"Stiegl Brauwelt", type:"beer_garden", city:"Salzburg", icon:"🍺", tip:"Austria's oldest brewery tour. €14.50 includes 2 beer tastings + a snack. Student discount sometimes.", cat:"food", url:"https://maps.google.com/?q=Stiegl+Brauwelt+Salzburg" },
  { lat:47.3763, lng:8.5413, name:"Grossmünster", type:"landmark", city:"Zurich", icon:"⛪", tip:"Free entry. Climb the tower (CHF 5) for views over the lake and Alps on clear days.", cat:"culture", url:"https://maps.google.com/?q=Grossmunster+Zurich" },
  { lat:47.3774, lng:8.5407, name:"Lake Zurich Promenade", type:"park", city:"Zurich", icon:"🌊", tip:"Rent a paddleboard from Mythenquai in summer. Best free sunset spot in the city.", cat:"nature", url:"https://maps.google.com/?q=Lake+Zurich+Promenade" },
  { lat:47.3812, lng:8.5340, name:"Niederdorf (Old Town)", type:"nightlife", city:"Zurich", icon:"🍸", tip:"Zurich's nightlife hub. Langstrasse for budget bars, Niederdorf for cozy spots. Happy hour 5–7pm.", cat:"nightlife", url:"https://maps.google.com/?q=Niederdorf+Zurich" },
  { lat:46.9480, lng:7.4514, name:"Zytglogge Clock Tower", type:"landmark", city:"Bern", icon:"🕰️", tip:"Shows animate at :57 every hour. The guided tour inside reveals 600 years of mechanism.", cat:"culture", url:"https://maps.google.com/?q=Zytglogge+Bern" },
  { lat:46.9479, lng:7.4410, name:"Aare River Float", type:"park", city:"Bern", icon:"🏊", tip:"Locals swim the Aare in summer! Enter at Eichholz, exit at Marzili. Free & unforgettable.", cat:"nature", url:"https://maps.google.com/?q=Marzilibad+Bern" },
  { lat:47.0708, lng:15.4372, name:"Schlossberg", type:"landmark", city:"Graz", icon:"🏰", tip:"Take the free lift up, grab a Puntigamer at the top. Best sunset in Austria.", cat:"culture", url:"https://maps.google.com/?q=Schlossberg+Graz" },
  { lat:47.0707, lng:15.4346, name:"Kunsthaus Graz", type:"museum", city:"Graz", icon:"🎨", tip:"The alien-looking blob lights up at night. €7 student entry, free outdoor photo ops.", cat:"culture", url:"https://maps.google.com/?q=Kunsthaus+Graz" },
  { lat:47.0690, lng:15.4356, name:"Lend District Street Food", type:"food", city:"Graz", icon:"🍽️", tip:"Graz's hip neighborhood. Farmer's market on Saturdays. Best kebab in Austria for €4.", cat:"food", url:"https://maps.google.com/?q=Lendplatz+Graz" },
  { lat:50.7753, lng:6.0839, name:"Aachen Cathedral", type:"landmark", city:"Aachen", icon:"⛪", tip:"UNESCO #1 in Germany. Free entry. The treasury (€5) has Charlemagne's actual relics.", cat:"culture", url:"https://maps.google.com/?q=Aachen+Cathedral" },
  { lat:50.7748, lng:6.0836, name:"Café Extrablatt Aachen", type:"study_cafe", city:"Aachen", icon:"☕", tip:"Student favorite café right by the cathedral. €3 coffee, free wifi, outdoor terrace.", cat:"food", url:"https://maps.google.com/?q=Cafe+Extrablatt+Aachen" },
  { lat:49.7944, lng:9.9210, name:"Würzburg Residence", type:"landmark", city:"Würzburg", icon:"🏰", tip:"€4.50 student ticket for the largest ceiling fresco in the world. Free gardens.", cat:"culture", url:"https://maps.google.com/?q=Wurzburg+Residence" },
  { lat:49.7930, lng:9.9267, name:"Alte Mainbrücke", type:"viewpoint", city:"Würzburg", icon:"🌅", tip:"THE student hangout. Buy wine from the bridge kiosk (€3/glass) and watch the sunset. Iconic.", cat:"nature", url:"https://maps.google.com/?q=Alte+Mainbrucke+Wurzburg" },
  { lat:51.3406, lng:12.3747, name:"St. Thomas Church", type:"landmark", city:"Leipzig", icon:"🎵", tip:"Bach worked here. Free organ concerts on Fridays at noon — sit in his actual choir loft.", cat:"culture", url:"https://maps.google.com/?q=Thomaskirche+Leipzig" },
  { lat:51.3321, lng:12.3548, name:"Spinnerei Art Galleries", type:"museum", city:"Leipzig", icon:"��", tip:"Former cotton mill turned art complex. 100+ studios & galleries. Free to wander. 2nd Saturdays are open nights.", cat:"culture", url:"https://maps.google.com/?q=Spinnerei+Leipzig" },
  { lat:51.3388, lng:12.3743, name:"Karl-Liebknecht-Straße (KarLi)", type:"nightlife", city:"Leipzig", icon:"🍻", tip:"Leipzig's student bar street. €2.50 beers, döner at 2am, and everyone is out on Thursday.", cat:"nightlife", url:"https://maps.google.com/?q=Karl+Liebknecht+Strasse+Leipzig" },
  { lat:49.4872, lng:8.4619, name:"Mannheim Palace", type:"landmark", city:"Mannheim", icon:"🏰", tip:"You literally go to class here — the uni IS the palace. Flex on your Instagram.", cat:"culture", url:"https://maps.google.com/?q=Mannheim+Palace" },
  { lat:49.4062, lng:8.6760, name:"Heidelberg Castle (Day Trip)", type:"landmark", city:"Mannheim", icon:"🏰", tip:"20 min by S-Bahn. Most romantic ruin in Germany. €4 student ticket. Free views from Philosophenweg.", cat:"culture", url:"https://maps.google.com/?q=Heidelberg+Castle" },
  { lat:50.7351, lng:7.0997, name:"Beethoven House", type:"museum", city:"Bonn", icon:"🎵", tip:"Where Beethoven was born. €6 student entry. The original instruments are incredible.", cat:"culture", url:"https://maps.google.com/?q=Beethoven+Haus+Bonn" },
  { lat:50.7336, lng:7.0990, name:"Bonn Museum Mile", type:"museum", city:"Bonn", icon:"🎨", tip:"5 major museums within walking distance. Bundeskunsthalle has rotating world-class exhibits.", cat:"culture", url:"https://maps.google.com/?q=Museumsmeile+Bonn" },
  { lat:50.7326, lng:7.0980, name:"Heerstraße Cherry Blossoms", type:"park", city:"Bonn", icon:"🌸", tip:"Every April this street turns into a pink tunnel. Most Instagrammed spot in Bonn.", cat:"nature", url:"https://maps.google.com/?q=Heerstrasse+Bonn+Cherry+Blossoms" },
  { lat:52.2761, lng:8.0440, name:"Peace Hall (Rathaus)", type:"landmark", city:"Osnabrück", icon:"🕊️", tip:"Where the Peace of Westphalia was signed in 1648. Free entry. History nerds will love it.", cat:"culture", url:"https://maps.google.com/?q=Rathaus+Osnabruck" },
  { lat:52.2782, lng:8.0450, name:"Felix Nussbaum Haus", type:"museum", city:"Osnabrück", icon:"🎨", tip:"Daniel Libeskind-designed museum. Haunting art collection. €5 student entry.", cat:"culture", url:"https://maps.google.com/?q=Felix+Nussbaum+Haus+Osnabruck" },
  { lat:52.2724, lng:8.0510, name:"Osnabrück Zoo", type:"park", city:"Osnabrück", icon:"🦁", tip:"Built on a hillside — one of the most unique zoo layouts in Germany. €11 student ticket.", cat:"nature", url:"https://maps.google.com/?q=Zoo+Osnabruck" },
  { lat:50.7760, lng:6.0850, name:"Aachen Thermal Baths", type:"spa", city:"Aachen", icon:"♨️", tip:"Carolus Thermen — thermal springs used since Roman times. €14 for 2.5 hrs. Pure relaxation.", cat:"nature", url:"https://maps.google.com/?q=Carolus+Thermen+Aachen" },
  { lat:48.7810, lng:9.1770, name:"Stuttgart TV Tower", type:"landmark", city:"Stuttgart", icon:"📡", tip:"World's first reinforced concrete TV tower (1956). €9 for panoramic views over the Kessel.", cat:"culture", url:"https://maps.google.com/?q=Fernsehturm+Stuttgart" },
  { lat:48.7830, lng:9.1850, name:"Killesbergpark", type:"park", city:"Stuttgart", icon:"🌳", tip:"Free park with a miniature railway, tower, and summer light shows. Perfect study break.", cat:"nature", url:"https://maps.google.com/?q=Killesbergpark+Stuttgart" },
  { lat:46.9505, lng:7.4385, name:"Bern Einstein House", type:"museum", city:"Bern", icon:"🔬", tip:"Where Einstein lived when he wrote his theory of relativity. €6 entry, tiny but mind-blowing.", cat:"culture", url:"https://maps.google.com/?q=Einstein+Haus+Bern" },
  { lat:47.3750, lng:8.5430, name:"Zurich Kunsthaus", type:"museum", city:"Zurich", icon:"🎨", tip:"One of Switzerland's most important art museums. CHF 10 student. Free on Wednesdays.", cat:"culture", url:"https://maps.google.com/?q=Kunsthaus+Zurich" },
  { lat:47.8010, lng:13.0380, name:"Mirabell Gardens", type:"park", city:"Salzburg", icon:"🌹", tip:"Sound of Music filming location. Free entry. The fountain and rose garden are stunning.", cat:"nature", url:"https://maps.google.com/?q=Mirabell+Gardens+Salzburg" },
  { lat:47.0680, lng:15.4400, name:"Murinsel Island", type:"landmark", city:"Graz", icon:"🌉", tip:"Floating island in the Mur river — part café, part amphitheatre. Free to walk through.", cat:"culture", url:"https://maps.google.com/?q=Murinsel+Graz" },
];

const diffLabel = l => { if(l===1) return "Beginner"; if(l===2) return "Elementary"; if(l===3) return "Intermediate"; if(l===4) return "Advanced"; if(l===5) return "Expert"; return "Level "+l; };
const enColor = lv => { if(!lv) return {bg:"#F3F4F6",text:"#6B7280"}; const l=lv.toLowerCase().replace(/[_\s]/g,""); if(l==="veryhigh") return {bg:"#D1FAE5",text:"#065F46"}; if(l==="high") return {bg:"#DBEAFE",text:"#1E40AF"}; if(l==="moderate") return {bg:"#FEF3C7",text:"#92400E"}; return {bg:"#FEE2E2",text:"#991B1B"}; };
const costColor = t => { if(!t) return {bg:"#F3F4F6",text:"#6B7280"}; const l=t.toLowerCase().replace(/[_\s]/g,""); if(l==="low") return {bg:"#D1FAE5",text:"#065F46"}; if(l==="moderate") return {bg:"#DBEAFE",text:"#1E40AF"}; if(l==="high") return {bg:"#FEF3C7",text:"#92400E"}; return {bg:"#FEE2E2",text:"#991B1B"}; };
const friendlyLabel = v => v ? v.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase()) : "";

/* Editorial quick-pick cards */
/* Editorial quick-pick pool — curated local tips, expanded */
const QUICK_PICKS_POOL = [
  // Berlin
  { emoji:"🎨", label:"Free street art", city:"Berlin", detail:"East Side Gallery, 24/7", slug:"berlin" },
  { emoji:"🌭", label:"Currywurst capital", city:"Berlin", detail:"Invented here in 1949", slug:"berlin" },
  { emoji:"🛍️", label:"Sunday flea market", city:"Berlin", detail:"Mauerpark, free karaoke at 3pm", slug:"berlin" },
  { emoji:"🧱", label:"Wall Memorial", city:"Berlin", detail:"Free outdoor museum, Bernauer Str.", slug:"berlin" },
  { emoji:"🍽️", label:"Street Food Thursday", city:"Berlin", detail:"Markthalle Neun, €3–8 plates", slug:"berlin" },
  // Munich
  { emoji:"🏄", label:"River surfing", city:"Munich", detail:"Eisbach wave, English Garden", slug:"munich" },
  { emoji:"🍺", label:"Augustiner Keller", city:"Munich", detail:"€4 Maß, BYO food allowed", slug:"munich" },
  { emoji:"🪴", label:"English Garden", city:"Munich", detail:"Bigger than Central Park", slug:"munich" },
  { emoji:"🍽️", label:"Weißwurst before noon", city:"Munich", detail:"Viktualienmarkt tradition", slug:"munich" },
  // Hamburg
  { emoji:"🎤", label:"Beatles stage", city:"Hamburg", detail:"Reeperbahn history walk", slug:"hamburg" },
  { emoji:"🎵", label:"Elbphilharmonie", city:"Hamburg", detail:"Free plaza + €10 student concerts", slug:"hamburg" },
  { emoji:"🐟", label:"Sunday Fischmarkt", city:"Hamburg", detail:"5am start, legendary vibes", slug:"hamburg" },
  { emoji:"🏗️", label:"Speicherstadt", city:"Hamburg", detail:"UNESCO warehouse district", slug:"hamburg" },
  // Vienna
  { emoji:"🎵", label:"€13 opera", city:"Vienna", detail:"Standing room, Staatsoper", slug:"vienna" },
  { emoji:"☕", label:"Coffeehouse culture", city:"Vienna", detail:"UNESCO heritage since 2011", slug:"vienna" },
  { emoji:"🧀", label:"Naschmarkt brunch", city:"Vienna", detail:"€5 falafel at Neni", slug:"vienna" },
  { emoji:"🎡", label:"Prater Ferris wheel", city:"Vienna", detail:"Spinning since 1897", slug:"vienna" },
  { emoji:"🍹", label:"Beach bars", city:"Vienna", detail:"Donaukanal, €3 spritzers", slug:"vienna" },
  // Salzburg
  { emoji:"🏔️", label:"Alpine views", city:"Salzburg", detail:"Hohensalzburg fortress", slug:"salzburg" },
  { emoji:"🎵", label:"Mozart's birthplace", city:"Salzburg", detail:"€7 student, Getreidegasse", slug:"salzburg" },
  { emoji:"🍺", label:"Oldest brewery", city:"Salzburg", detail:"Stiegl since 1492, 2 tastings", slug:"salzburg" },
  // Zurich
  { emoji:"🏊‍♀️", label:"Lake swimming", city:"Zurich", detail:"Free Badis all summer", slug:"zurich" },
  { emoji:"⛲", label:"1,200 fountains", city:"Zurich", detail:"All drinkable water", slug:"zurich" },
  { emoji:"🌊", label:"Paddleboarding", city:"Zurich", detail:"Rent at Mythenquai, sunset views", slug:"zurich" },
  // Bern
  { emoji:"🏊", label:"River float", city:"Bern", detail:"Swim the Aare all summer", slug:"bern" },
  { emoji:"🐻", label:"Bear Park", city:"Bern", detail:"Real bears since 1224", slug:"bern" },
  { emoji:"🕰️", label:"Clock tower show", city:"Bern", detail:"Zytglogge, every hour since 1530", slug:"bern" },
  // Stuttgart
  { emoji:"🚗", label:"€5 after 4pm", city:"Stuttgart", detail:"Mercedes-Benz Museum", slug:"stuttgart" },
  { emoji:"🚗", label:"Porsche Museum", city:"Stuttgart", detail:"€4 student, hands-on exhibits", slug:"stuttgart" },
  { emoji:"🍷", label:"Urban vineyards", city:"Stuttgart", detail:"Wine tasting in the city", slug:"stuttgart" },
  // Leipzig
  { emoji:"🍺", label:"Cheapest beer", city:"Leipzig", detail:"€2.50 on KarLi", slug:"leipzig" },
  { emoji:"🎭", label:"Free galleries", city:"Leipzig", detail:"Spinnerei open nights", slug:"leipzig" },
  { emoji:"🎵", label:"Free organ concerts", city:"Leipzig", detail:"St. Thomas Church, Fridays", slug:"leipzig" },
  // Mannheim
  { emoji:"🎓", label:"Palace campus", city:"Mannheim", detail:"Class in a Baroque palace", slug:"mannheim" },
  { emoji:"🏰", label:"Fairy-tale castle", city:"Heidelberg", detail:"20 min from Mannheim", slug:"mannheim" },
  // Graz
  { emoji:"🌅", label:"Free sunset", city:"Graz", detail:"Schlossberg hilltop + Puntigamer", slug:"graz" },
  { emoji:"👽", label:"Friendly Alien", city:"Graz", detail:"Kunsthaus blob, €7 student", slug:"graz" },
  { emoji:"🍽️", label:"Best kebab in Austria", city:"Graz", detail:"Lendplatz, €4", slug:"graz" },
  // Others
  { emoji:"🕊️", label:"Peace treaty", city:"Osnabrück", detail:"1648 Westphalian Peace Hall", slug:"osnabruck" },
  { emoji:"🍷", label:"Bridge wine", city:"Würzburg", detail:"Sunset on Alte Mainbrücke", slug:"wurzburg" },
  { emoji:"⛪", label:"UNESCO Cathedral", city:"Aachen", detail:"Germany's first World Heritage Site", slug:"aachen" },
  { emoji:"🎵", label:"Beethoven's birthplace", city:"Bonn", detail:"€6 student museum entry", slug:"bonn" },
  { emoji:"🌸", label:"Cherry blossoms", city:"Bonn", detail:"Heerstraße every April", slug:"bonn" },
];

/* Build dynamic quick picks: prioritize user's pinned cities, random each page refresh */
function buildQuickPicks(myCitySlugs) {
  const pool = [...QUICK_PICKS_POOL];
  // True random shuffle — different every page refresh
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const result = [];
  const usedCities = new Set();
  const addUnique = (item) => {
    if (!usedCities.has(item.slug)) { result.push(item); usedCities.add(item.slug); }
  };
  if (myCitySlugs && myCitySlugs.length > 0) {
    const mySet = new Set(myCitySlugs);
    pool.filter(p => mySet.has(p.slug)).forEach(p => { if (result.length < 3) addUnique(p); });
    pool.filter(p => !mySet.has(p.slug)).forEach(p => { if (result.length < 6) addUnique(p); });
  } else {
    pool.forEach(p => { if (result.length < 6) addUnique(p); });
  }
  return result;
}

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [cities, setCities] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [phraseOfDay, setPhraseOfDay] = useState(null);
  const [showPhrase, setShowPhrase] = useState(() => {
    const dismissed = sessionStorage.getItem("phraseDismissed");
    return !dismissed;
  });
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [citySearch, setCitySearch] = useState("");
  const [selectedPin, setSelectedPin] = useState(null);
  const [showRoutes, setShowRoutes] = useState(false);
  const [mapSearch, setMapSearch] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);
  const [flashcardSaved, setFlashcardSaved] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [pickerSelected, setPickerSelected] = useState([]);
  const [myCityDropdown, setMyCityDropdown] = useState(false);
  const routeLayerRef = useRef(null);

  const [routeFrom, setRouteFrom] = useState("");
  const [routeTo, setRouteTo] = useState("");
  const [showRouteFinder, setShowRouteFinder] = useState(false);
  const [foundRoute, setFoundRoute] = useState(null); 

  const readUserData = () => {
    const email = localStorage.getItem("email") || "";
    return {
      email,
      name: localStorage.getItem("full_name") || "",
      city: localStorage.getItem("study_abroad_city") || "",
      cities: email ? (() => { try { return JSON.parse(localStorage.getItem("myCities") || "[]"); } catch { return []; } })() : [],
    };
  };
  const [userData, setUserData] = useState(readUserData);
  const userEmail = userData.email;
  const userName = userData.name;
  const userCity = userData.city;
  const userCities = userData.cities;
  const userCityData = CITY_COORDS.find(c => c.slug === userCity || c.name.toLowerCase() === userCity.toLowerCase());
  const weatherMap = useWeather(userCities);
  const exchangeRates = useExchangeRates();
  const { holidays, getNextHoliday } = useHolidays(["DE", "AT", "CH"]);
  const aqiMap = useAirQuality(userCities);

  // Compute quick picks once on mount — random each page refresh, but stable across re-renders (no glitch)
  const [stableQuickPicks, setStableQuickPicks] = useState(() => buildQuickPicks(userCities));
  // Update quick picks if the user changes their saved cities
  const prevCitiesRef = useRef(userCities.join(","));
  useEffect(() => {
    const key = userCities.join(",");
    if (key !== prevCitiesRef.current) {
      prevCitiesRef.current = key;
      setStableQuickPicks(buildQuickPicks(userCities));
    }
  }, [userCities.join(",")]);

  // Re-read localStorage whenever it changes (e.g. after profile update or city picker save)
  useEffect(() => {
    const onStorage = () => setUserData(readUserData());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Sync user profile from server on mount (ensures myCities & study_abroad_city are fresh)
  useEffect(() => {
    if (!userEmail) return;
    axios.get(`${BACKEND}/user/profile?email=${encodeURIComponent(userEmail)}`, authHeaders())
      .then(res => {
        const d = res.data;
        if (d.study_abroad_city) localStorage.setItem("study_abroad_city", d.study_abroad_city);
        if (d.full_name) localStorage.setItem("full_name", d.full_name);
        if (Array.isArray(d.saved_cities) && d.saved_cities.length > 0) {
          localStorage.setItem("myCities", JSON.stringify(d.saved_cities));
        }
        setUserData(readUserData());
      })
      .catch(() => {});
  }, [userEmail]);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  // Show city picker for new users who haven't selected cities yet
  useEffect(() => {
    if (userEmail && userCities.length === 0 && !localStorage.getItem("cityPickerDismissed")) {
      setTimeout(() => setShowCityPicker(true), 1200);
    }
  }, []);

  useEffect(() => {
    axios.get(BACKEND + "/cities/?limit=100").then(r => { const d = r.data.data || r.data; setCities(Array.isArray(d) ? d : []); }).catch(() => {}).finally(() => setLoading(false));
    // Fetch phrases — personalize by user's cities if available
    const fetchPhrase = async () => {
      try {
        let allPhrases = [];
        if (userCities.length > 0) {
          // Try to get phrases for the user's selected cities
          for (const slug of userCities.slice(0, 5)) {
            try {
              const res = await axios.get(`${BACKEND}/phrases/?city_slug=${slug}&limit=50`);
              const p = res.data.phrases || res.data.data || res.data || [];
              allPhrases = [...allPhrases, ...p];
            } catch {}
          }
        }
        // Fallback: if no user city phrases, get general
        if (allPhrases.length === 0) {
          const res = await axios.get(BACKEND + "/phrases/?limit=50");
          allPhrases = res.data.phrases || res.data.data || res.data || [];
        }
        // Deduplicate by _id
        const seen = new Set();
        allPhrases = allPhrases.filter(p => { if (seen.has(p._id)) return false; seen.add(p._id); return true; });
        if (allPhrases.length) {
          // Prefer actual dialect/slang phrases — not standard German questions tagged to a city
          const funPhrases = allPhrases.filter(p => {
            const tags = (p.tags || []).join(" ").toLowerCase();
            const cat = (p.category || "").toLowerCase();
            const reg = (p.register || "").toLowerCase();
            const hasDialect = !!p.dialect_name;
            const hasSlangTag = tags.includes("slang") || tags.includes("regional") || tags.includes("colloquial") || tags.includes("local_feel") || tags.includes("fun");
            const isInformalCat = cat === "exclamations" || cat === "social" || cat === "greetings" || cat === "food_drink";
            const isInformalReg = reg === "informal" || reg === "casual" || reg === "colloquial";
            // Must have at least dialect name OR slang tags — not just "informal" standard German
            return hasDialect || hasSlangTag || (isInformalCat && isInformalReg);
          });
          const pool = funPhrases.length >= 3 ? funPhrases : allPhrases;
          const day = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / 86400000);
          setPhraseOfDay(pool[day % pool.length]);
        }
      } catch {}
    };
    fetchPhrase();
  }, []);

  /* MAP SETUP */
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const L = window.L; if (!L) return;
    const map = L.map(mapRef.current, { center:[48.5,10.5], zoom:6, minZoom:4, maxZoom:19, zoomControl:false, scrollWheelZoom:true, dragging:true });
    L.control.zoom({ position:"topright" }).addTo(map);

    const osmLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", { attribution:"\u00A9 CARTO \u00A9 OSM", maxZoom:19 });
    const satLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { attribution:"\u00A9 Esri", maxZoom:19 });
    osmLayer.addTo(map);

    let currentBase = "street";
    map.on("zoomend", () => {
      const z = map.getZoom();
      if (z >= 13 && currentBase === "street") { map.removeLayer(osmLayer); satLayer.addTo(map); currentBase = "satellite"; }
      else if (z < 13 && currentBase === "satellite") { map.removeLayer(satLayer); osmLayer.addTo(map); currentBase = "street"; }
    });

    // City markers
    CITY_COORDS.forEach(pin => {
      const color = PIN_COLORS[pin.country];
      const flag = PIN_EMOJI[pin.country];
      const isUserCity = userCityData && pin.slug === userCityData.slug;
      const isSavedCity = userCities.includes(pin.slug);
      const starBadge = isUserCity ? '<div style="position:absolute;top:-10px;right:-10px;background:#FA4616;color:#fff;font-size:8px;font-weight:800;padding:2px 5px;border-radius:9999px;white-space:nowrap;box-shadow:0 2px 6px rgba(250,70,22,0.4);z-index:3;border:1.5px solid #fff">YOUR CITY</div>' : isSavedCity ? '<div style="position:absolute;top:-8px;right:-10px;background:'+color+';color:#fff;font-size:7px;font-weight:700;padding:2px 5px;border-radius:9999px;white-space:nowrap;box-shadow:0 2px 6px '+color+'55;z-index:3;border:1.5px solid #fff">SAVED</div>' : "";
      const pinScale = isUserCity ? "scale(1.2)" : "scale(1)";
      const icon = L.divIcon({ className:"", html:'<div class="mtb-pin" style="display:flex;flex-direction:column;align-items:center;cursor:pointer;position:relative;transform:'+pinScale+'">'+starBadge+'<div class="mtb-pulse" style="position:absolute;top:4px;left:50%;transform:translateX(-50%);width:24px;height:24px;border-radius:50%;background:'+color+';opacity:0.25"></div><svg width="36" height="46" viewBox="0 0 32 42" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35));position:relative;z-index:2;transition:transform 0.2s" onmouseover="this.style.transform=\'scale(1.15)\'" onmouseout="this.style.transform=\'scale(1)\'"><path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z" fill="'+color+'"/><circle cx="16" cy="15" r="10" fill="#fff"/><text x="16" y="19" text-anchor="middle" font-size="12">'+flag+'</text></svg></div>', iconSize:[36,46], iconAnchor:[18,46], popupAnchor:[0,-46] });
      const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);

      const costBg = pin.country === "CH" ? "#FEF3C7" : "#D1FAE5";
      const costCol = pin.country === "CH" ? "#92400E" : "#065F46";
      marker.bindTooltip('<div style="font-family:Inter,system-ui,sans-serif;padding:12px 14px;min-width:240px;max-width:320px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><strong style="font-size:0.95rem;color:#111827">'+flag+' '+pin.name+'</strong><span style="font-size:0.6rem;font-weight:700;color:#fff;background:'+color+';padding:2px 8px;border-radius:9999px">'+COUNTRY_LABELS[pin.country]+'</span></div><div style="font-size:0.78rem;color:#4B5563;line-height:1.5;margin-bottom:8px">'+pin.desc+'</div>'+(pin.uni?'<div style="font-size:0.72rem;color:#0021A5;font-weight:600;margin-bottom:8px">\uD83C\uDFEB '+pin.uni+'</div>':'')+'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">'+(pin.cost?'<span style="font-size:0.62rem;font-weight:600;background:'+costBg+';color:'+costCol+';padding:3px 8px;border-radius:4px"><span style="opacity:0.7;font-size:0.55rem;display:block;line-height:1;margin-bottom:1px">AVG RENT</span>\uD83D\uDCB0 '+pin.cost+'</span>':'')+(pin.beer?'<span style="font-size:0.62rem;font-weight:600;background:#FFF7ED;color:#92400E;padding:3px 8px;border-radius:4px"><span style="opacity:0.7;font-size:0.55rem;display:block;line-height:1;margin-bottom:1px">BEER</span>\uD83C\uDF7A '+pin.beer+'</span>':'')+(pin.transit?'<span style="font-size:0.62rem;font-weight:600;background:#EEF2FF;color:#4338CA;padding:3px 8px;border-radius:4px"><span style="opacity:0.7;font-size:0.55rem;display:block;line-height:1;margin-bottom:1px">TRANSIT</span>\uD83D\uDE83 '+pin.transit+'</span>':'')+'</div>'+(pin.mustDo?'<div style="font-size:0.7rem;color:#059669;font-weight:600;background:#ECFDF5;padding:5px 8px;border-radius:6px;border:1px solid #A7F3D0;margin-bottom:6px">\u2B50 '+pin.mustDo+'</div>':'')+'<div style="font-size:0.64rem;font-weight:600;color:#0021A5;text-align:center;padding-top:4px;border-top:1px solid #E5E7EB">Click for city details</div></div>', { direction:"top", offset:[0,-10], opacity:0.97, className:"city-tooltip" });

      marker.on("click", () => {
        setSelectedPin(pin);
        map.flyTo([pin.lat, pin.lng], 13, { duration: 1.2 });
      });
    });

    // Landmark markers
    const CAT_COLORS = { culture:"#4338CA", food:"#EA580C", nature:"#059669", nightlife:"#9333EA", default:"#6B7280" };
    const CAT_LABELS = { culture:"Culture", food:"Food & Drink", nature:"Nature", nightlife:"Nightlife", default:"Spot" };
    const landmarkLayer = L.layerGroup();
    LANDMARKS.forEach(lm => {
      const lIcon = L.divIcon({ className:"", html:'<div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid #E5E7EB;box-shadow:0 2px 8px rgba(0,0,0,0.18);font-size:15px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.transform=\'scale(1.25)\';this.style.borderColor=\'#FA4616\';this.style.boxShadow=\'0 4px 16px rgba(250,70,22,0.3)\'" onmouseout="this.style.transform=\'scale(1)\';this.style.borderColor=\'#E5E7EB\';this.style.boxShadow=\'0 2px 8px rgba(0,0,0,0.18)\'">'+lm.icon+'</div>', iconSize:[30,30], iconAnchor:[15,15] });
      const lMarker = L.marker([lm.lat, lm.lng], { icon: lIcon });
      const catColor = CAT_COLORS[lm.cat] || CAT_COLORS.default;
      const catLabel = CAT_LABELS[lm.cat] || CAT_LABELS.default;
      lMarker.bindTooltip('<div style="font-family:Inter,system-ui,sans-serif;padding:10px 12px;max-width:300px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px"><strong style="font-size:0.88rem;color:#111827">'+lm.icon+' '+lm.name+'</strong><span style="font-size:0.58rem;font-weight:700;color:#fff;background:'+catColor+';padding:2px 7px;border-radius:9999px;text-transform:uppercase;letter-spacing:0.05em">'+catLabel+'</span></div><div style="font-size:0.72rem;color:#6B7280;margin-bottom:6px">'+lm.city+'</div>'+(lm.tip?'<div style="font-size:0.74rem;color:#065F46;font-weight:500;background:#ECFDF5;padding:5px 8px;border-radius:6px;border:1px solid #A7F3D0;line-height:1.45;margin-bottom:6px">\uD83D\uDCA1 '+lm.tip+'</div>':'')+'<div style="font-size:0.68rem;text-align:center;padding-top:5px;border-top:1px solid #E5E7EB;color:#0021A5;font-weight:600">\uD83D\uDCCD Click to open in Google Maps</div></div>', { direction:"top", offset:[0,-8], className:"city-tooltip" });

      // Click opens Google Maps
      lMarker.on("click", () => {
        if (lm.url) window.open(lm.url, "_blank", "noopener,noreferrer");
      });

      landmarkLayer.addLayer(lMarker);
    });
    map.on("zoomend", () => {
      if (map.getZoom() >= 8 && !map.hasLayer(landmarkLayer)) landmarkLayer.addTo(map);
      else if (map.getZoom() < 8 && map.hasLayer(landmarkLayer)) map.removeLayer(landmarkLayer);
    });

    // Travel routes
    const routeLayer = L.layerGroup();
    TRAVEL_ROUTES.forEach(r => {
      const fromCity = CITY_COORDS.find(c => c.slug === r.from);
      const toCity = CITY_COORDS.find(c => c.slug === r.to);
      if (!fromCity || !toCity) return;
      const isFree = isStudentFree(r);
      const line = L.polyline([[fromCity.lat, fromCity.lng], [toCity.lat, toCity.lng]], {
        color: isFree ? "#10B981" : "#FA4616", weight: isFree ? 2.5 : 2, opacity: isFree ? 0.7 : 0.5, dashArray: isFree ? "4, 6" : "8, 8", className: "mtb-route"
      });
      line.bindTooltip('<div style="font-family:Inter,system-ui,sans-serif;padding:8px 10px;text-align:center"><strong style="font-size:0.82rem;color:#111827">'+fromCity.name+' → '+toCity.name+'</strong><div style="display:flex;gap:8px;justify-content:center;margin-top:4px;font-size:0.72rem;color:#4B5563"><span>⏱ '+r.time+'</span><span style="'+(isFree?'color:#059669;font-weight:600':'')+'">'+( isFree ? '🎓 Free' : r.price )+'</span></div>'+(r.type?'<div style="font-size:0.65rem;color:#6B7280;margin-top:3px">'+r.type+'</div>':'')+(isFree?'<div style="font-size:0.62rem;color:#059669;font-weight:600;margin-top:4px;background:#ECFDF5;padding:2px 6px;border-radius:4px;display:inline-block">Included w/ Student Train Pass</div>':'')+'</div>', { sticky: true, className: "city-tooltip" });
      routeLayer.addLayer(line);
    });
    routeLayerRef.current = routeLayer;
    window.__mtbMap__ = map;
    mapInstanceRef.current = map;

    if (userCityData) {
      setTimeout(() => map.flyTo([userCityData.lat, userCityData.lng], 11, { duration: 2 }), 800);
    }

    return () => { if(mapInstanceRef.current){mapInstanceRef.current.remove();mapInstanceRef.current=null;} };
  }, [navigate]);

  const speakPhrase = (text) => {
    if(!text) return;
    if(isSpeaking){window.speechSynthesis.cancel();setIsSpeaking(false);return;}
    const u=new SpeechSynthesisUtterance(text); u.lang="de-DE"; u.rate=0.82;
    u.onend=()=>setIsSpeaking(false); u.onerror=()=>setIsSpeaking(false);
    setIsSpeaking(true); window.speechSynthesis.speak(u);
  };

  const saveAsFlashcard = async () => {
    if (!userEmail) { navigate("/login"); return; }
    if (!phraseOfDay?._id || flashcardSaved) return;
    try {
      await axios.post(`${BACKEND}/phrases/bookmarks`, { phrase_id: phraseOfDay._id, user_email: userEmail }, authHeaders());
      setFlashcardSaved(true);
    } catch (err) {
      if (err?.response?.status === 400) setFlashcardSaved(true); // already bookmarked
      else console.error("Flashcard save error:", err);
    }
  };

  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = routeLayerRef.current;
    if (!map || !layer) return;
    if (showRoutes && !map.hasLayer(layer)) {
    layer.addTo(map);
    // Remove temporary highlight line if it exists
    if (window._tempRouteLine) {
      map.removeLayer(window._tempRouteLine);
      window._tempRouteLine = null;
    }
    } else if (!showRoutes && map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
  }, [showRoutes]);

  const flyToCity = useCallback((slug) => {
    const map = mapInstanceRef.current;
    const city = CITY_COORDS.find(c => c.slug === slug);
    if (!map || !city) return;
    map.flyTo([city.lat, city.lng], 13, { duration: 1.5 });
    setMapSearch("");
    const el = document.getElementById("mtb-map");
    if (el) {
      const headerOffset = 50; 
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      }); 
    }
  }, []);

  const flyToCountry = useCallback((code) => {
    const map = mapInstanceRef.current; if (!map) return;
    const bounds = { DE: [[47.2,5.8],[55.1,15.1]], AT: [[46.3,9.5],[49.0,17.2]], CH: [[45.8,5.9],[47.9,10.5]] };
    if (bounds[code]) map.flyToBounds(bounds[code], { duration: 1.2, padding: [30,30] });
  }, []);

  const findRoute = () => {
    if (!routeFrom || !routeTo) return;
    
    // Try direct route
    let route = TRAVEL_ROUTES.find(r => 
      (r.from === routeFrom && r.to === routeTo)
    );
    
    // Try reverse direction
    if (!route) {
      route = TRAVEL_ROUTES.find(r => 
        r.from === routeTo && r.to === routeFrom
      );
    }
    
    if (route) {
      setFoundRoute(route);
      
      const fromCity = CITY_COORDS.find(c => c.slug === route.from);
      const toCity = CITY_COORDS.find(c => c.slug === route.to);
      
      if (fromCity && toCity && mapInstanceRef.current) {
        // Remove any existing temporary route line
        if (window._tempRouteLine) {
          mapInstanceRef.current.removeLayer(window._tempRouteLine);
        }
        
        const isFree = isStudentFree(route);
        
        // Create the flashy dotted line (same as train connections)
        const line = L.polyline([[fromCity.lat, fromCity.lng], [toCity.lat, toCity.lng]], {
          color: isFree ? "#10B981" : "#FA4616",
          weight: 3,
          opacity: 0.9,
          dashArray: "8, 8",
          className: "mtb-route"  // This adds the flashy animation
        });
        
        // Add pulsing effect with a second line underneath
        const pulseLine = L.polyline([[fromCity.lat, fromCity.lng], [toCity.lat, toCity.lng]], {
          color: isFree ? "#10B981" : "#FA4616",
          weight: 5,
          opacity: 0.3,
          className: "mtb-route-pulse"
        });
        
        line.bindTooltip(`
          <div style="font-family:Inter,system-ui,sans-serif;padding:8px 10px;text-align:center">
            <strong style="font-size:0.82rem;color:#111827">${fromCity.name} → ${toCity.name}</strong>
            <div style="display:flex;gap:8px;justify-content:center;margin-top:4px;font-size:0.72rem;color:#4B5563">
              <span>⏱ ${route.time}</span>
              <span style="${isFree ? 'color:#059669;font-weight:600' : ''}">${isFree ? '🎓 Free' : route.price}</span>
            </div>
            ${route.type ? `<div style="font-size:0.65rem;color:#6B7280;margin-top:3px">${route.type}</div>` : ''}
            ${isFree ? '<div style="font-size:0.62rem;color:#059669;font-weight:600;margin-top:4px;background:#ECFDF5;padding:2px 6px;border-radius:4px;display:inline-block">✓ Included w/ Student Train Pass</div>' : ''}
          </div>
        `, { sticky: true, className: "city-tooltip" });
        
        // Add both layers
        pulseLine.addTo(mapInstanceRef.current);
        line.addTo(mapInstanceRef.current);
        
        // Store both layers for cleanup
        window._tempRouteLine = { line, pulseLine };
        
        // Fly to show the route
        const bounds = L.latLngBounds([fromCity.lat, fromCity.lng], [toCity.lat, toCity.lng]);
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], duration: 1.5 });
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
          if (window._tempRouteLine && mapInstanceRef.current) {
            mapInstanceRef.current.removeLayer(window._tempRouteLine.line);
            mapInstanceRef.current.removeLayer(window._tempRouteLine.pulseLine);
            window._tempRouteLine = null;
          }
        }, 8000);
      }
    } else {
      setFoundRoute(null);
      alert("No direct route found between these cities. Try a different combination!");
    }
  };

  const getPhraseRegionInfo = () => {
    if(!phraseOfDay?.city_slugs?.length) return null;
    return phraseOfDay.city_slugs.map(s => { const c=CITY_COORDS.find(cc=>cc.slug===s); return c ? {name:c.name,country:COUNTRY_LABELS[c.country],flag:COUNTRY_FLAGS[c.country],slug:s} : {name:s,country:"",flag:"\uD83C\uDF0D",slug:s}; });
  };

  const grouped = cities.reduce((a,c) => { const k=c.country||"Other"; (a[k]=a[k]||[]).push(c); return a; }, {});
  const order = ["Germany","Austria","Switzerland"];
  const sorted = Object.entries(grouped).sort((a,b) => { const ia=order.indexOf(a[0]),ib=order.indexOf(b[0]); return (ia<0?99:ia)-(ib<0?99:ib); });
  const flags = { Germany:"\uD83C\uDDE9\uD83C\uDDEA", Austria:"\uD83C\uDDE6\uD83C\uDDF9", Switzerland:"\uD83C\uDDE8\uD83C\uDDED" };
  const regionInfo = getPhraseRegionInfo();

  const deCities = CITY_COORDS.filter(c=>c.country==="DE").length;
  const atCities = CITY_COORDS.filter(c=>c.country==="AT").length;
  const chCities = CITY_COORDS.filter(c=>c.country==="CH").length;

  const handleLogout = () => sharedLogout(navigate);

  const isSignedIn = !!userEmail;

  return (
    <div style={S.page}>
      {/* HEADER */}
      <header style={S.hdr}><div style={S.hdrIn}>
        <div style={S.hdrL} onClick={()=>navigate("/")}><img src={logo} alt="MTB" style={{height:72}}/><span style={S.brand}>MyTranslationBuddy</span></div>
      <nav style={S.nav}>
        {[{path:"/tips",icon:<Compass size={15}/>,label:"Explore"},{path:"/reservations",icon:<ClipboardList size={15}/>,label:"Study"},{path:"/events",icon:<Calendar size={15}/>,label:"Events"},{path:"/",icon:<MapPin size={15}/>,label:"Home"}].map(({path,icon,label})=>{
          const active = isActive(path);
          return (
            <button 
              key={path} 
              onClick={()=>navigate(path)} 
              style={{...S.nb,...(active?S.nbActive:{})}}
              onMouseEnter={e=>{
                if(!active){
                  e.currentTarget.style.backgroundColor="#dfdfdf";
                  e.currentTarget.style.color="#0021A5";
                  e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";
                }
              }}
              onMouseLeave={e=>{
                if(!active){
                  e.currentTarget.style.backgroundColor="transparent";
                  e.currentTarget.style.color="#6B7280";
                  e.currentTarget.style.boxShadow="none";
                }
              }}
            >
              {icon} {label}
            </button>
          );
        })}
        {userEmail ? (
          <>
            <button onClick={()=>navigate("/profile")} style={S.nbA}><User size={14}/> Profile</button>
            <button onClick={handleLogout} style={{...S.nb, color:"#DC2626", marginLeft:"0.25rem"}} 
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#FEF2F2"; e.currentTarget.style.color="#DC2626";}} 
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.color="#6B7280";}}>
              <LogOut size={14}/> Logout
            </button>
          </>
        ) : (
          <button onClick={()=>navigate("/login")} style={S.nbA}>Sign In</button>
        )}
      </nav>
      </div></header>

      {/* HERO */}
      <section style={S.hero}>
        <div style={{...S.heroIn, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)"}}>
          {userName ? (
            <>
              <h1 style={S.heroT}>
                Hey <span style={S.heroHL}>{userName.split(" ")[0]}</span>,
                {userCityData
                  ? <> ready for <span style={S.heroHL}>{userCityData.name}</span>?</>
                  : <> your adventure starts here</>
                }
              </h1>
              <p style={S.heroSub}>
                {userCityData
                  ? `Learn the dialect before you land, find tonight's best event, and stop Googling "how to order in German" — we've got ${userCityData.name} covered.`
                  : `From your first awkward café order to your last Biergarten sunset — ${TOTAL_CITIES} cities, three countries, zero guesswork.`
                }
              </p>
            </>
          ) : (
            <>
              <h1 style={S.heroT}>Your study abroad semester,<br/><span style={S.heroHL}>figured out</span></h1>
              <p style={S.heroSub}>From your first awkward café order to your last Biergarten sunset — {TOTAL_CITIES} cities, three countries, zero guesswork.</p>
            </>
          )}
          <div style={S.heroActs}>
            <button onClick={()=>{ const el=document.getElementById("mtb-map"); if(el) el.scrollIntoView({behavior:"smooth"}); }} style={S.heroP}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 30px rgba(250,70,22,0.5)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px rgba(250,70,22,0.4)";}}><Navigation size={18}/> Explore the Map</button>
            {isSignedIn ? (
              <>
                <button onClick={()=>navigate("/reservations")} style={S.heroO}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.14)";e.currentTarget.style.borderColor="rgba(255,255,255,0.4)";}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";}}><Languages size={18}/> Practice Phrases</button>
                <button onClick={()=>navigate("/events")} style={S.heroO}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.14)";e.currentTarget.style.borderColor="rgba(255,255,255,0.4)";}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";}}><Calendar size={18}/> Find Events</button>
              </>
            ) : (
              <button onClick={()=>navigate("/login")} style={S.heroO}
                onMouseEnter={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.14)";e.currentTarget.style.borderColor="rgba(255,255,255,0.4)";}}
                onMouseLeave={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";}}><User size={18}/> Sign in to get started</button>
            )}
          </div>
          {/* Quick stats badge removed — cleaner hero */}
        </div>
        <div style={{position:"absolute",top:"-20%",right:"-10%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(250,70,22,0.15),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-30%",left:"-15%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,33,165,0.2),transparent 70%)",pointerEvents:"none"}}/>
      </section>

      {/* QUICK PICKS — only for signed-in users */}
      {isSignedIn ? (
        <section style={S.picksWrap}>
          <div style={S.picksScroll}>
            {stableQuickPicks.map((p,i) => (
              <div key={i} onClick={()=>flyToCity(p.slug)} style={S.pickCard}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 30px rgba(0,0,0,0.12)";e.currentTarget.style.borderColor="#FED7AA";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.06)";e.currentTarget.style.borderColor="#E5E7EB";}}>
                <span style={{fontSize:"1.8rem"}}>{p.emoji}</span>
                <div>
                  <div style={{fontSize:"0.68rem",fontWeight:700,color:"#FA4616",textTransform:"uppercase",letterSpacing:"0.06em"}}>{p.label}</div>
                  <div style={{fontSize:"0.88rem",fontWeight:600,color:"#111827"}}>{p.city}</div>
                  <div style={{fontSize:"0.72rem",color:"#6B7280"}}>{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section style={{maxWidth:800,margin:"-4.5rem auto 0",padding:"0 2rem",position:"relative",zIndex:2}}>
          {/* Clear glass frosted fill with subtle border */}
          <div style={{
            borderRadius:"1.4rem",
            background:"rgba(255,255,255,0.3)",
            backdropFilter:"blur(16px)",
            WebkitBackdropFilter:"blur(16px)",
            border:"1px solid rgba(255,255,255,0.4)",
            boxShadow:"0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
            padding:"2rem 2.5rem",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:"2rem",flexWrap:"wrap"}}>
              {/* Left: Content */}
              <div style={{flex:1,minWidth:280}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",padding:"0.3rem 0.8rem",borderRadius:9999,background:"#FFF7ED",border:"1px solid #FED7AA",marginBottom:"0.75rem"}}>
                  <GraduationCap size={13} color="#FA4616"/>
                  <span style={{fontSize:"0.7rem",fontWeight:600,color:"#EA580C",letterSpacing:"0.04em",textTransform:"uppercase"}}>For UF Students</span>
                </div>
                <h3 style={{fontSize:"1.3rem",fontWeight:800,color:"#111827",margin:"0 0 0.5rem",lineHeight:1.3,letterSpacing:"-0.02em"}}>
                  Your study abroad toolkit,{" "}
                  <span style={{background:"linear-gradient(90deg,#FA4616,#FF6B35)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>personalized</span>
                </h3>
                <p style={{fontSize:"0.85rem",color:"#6B7280",margin:"0 0 1.25rem",lineHeight:1.6}}>
                  Sign in with your UF email to get started.
                </p>
                <div style={{display:"flex",gap:"0.6rem",flexWrap:"wrap"}}>
                  <button onClick={()=>navigate("/login")} style={{
                    display:"inline-flex",alignItems:"center",gap:"0.4rem",padding:"0.7rem 1.5rem",
                    borderRadius:"0.65rem",border:"none",
                    background:"linear-gradient(135deg,#0021A5,#003087)",color:"#fff",
                    cursor:"pointer",fontSize:"0.88rem",fontWeight:700,
                    boxShadow:"0 4px 16px rgba(0,33,165,0.25)",transition:"all 0.2s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,33,165,0.35)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 16px rgba(0,33,165,0.25)";}}>
                    Sign In <ArrowRight size={14}/>
                  </button>
                  <button onClick={()=>navigate("/register")} style={{
                    display:"inline-flex",alignItems:"center",gap:"0.4rem",padding:"0.7rem 1.5rem",
                    borderRadius:"0.65rem",border:"1.5px solid #D1D5DB",
                    background:"#fff",color:"#374151",
                    cursor:"pointer",fontSize:"0.88rem",fontWeight:600,transition:"all 0.2s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#F9FAFB";e.currentTarget.style.borderColor="#9CA3AF";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.borderColor="#D1D5DB";}}>
                    Create Account
                  </button>
                </div>
              </div>
              {/* Right: Feature chips */}
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem",minWidth:180}}>
                {[
                  {icon:"🗺️",text:"23 cities · 3 countries"},
                  {icon:"💬",text:"295+ dialect phrases"},
                  {icon:"📅",text:"Local events & culture"},
                  {icon:"📚",text:"Flashcards & quizzes"},
                ].map((f,i) => (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"0.6rem",padding:"0.5rem 0.75rem",borderRadius:"0.6rem",background:"#F9FAFB",border:"1px solid #F3F4F6"}}>
                    <span style={{fontSize:"0.9rem"}}>{f.icon}</span>
                    <span style={{fontSize:"0.78rem",fontWeight:500,color:"#374151"}}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MAP — full-bleed, no robotic header */}
      <section id="mtb-map" style={S.mapSection}>
        {/* Floating toolbar */}
      <div style={S.mapToolbar}>
        <div style={S.mapSearchWrap}>
          <Search size={14} color="#9CA3AF"/>
          <input value={mapSearch} onChange={e=>setMapSearch(e.target.value)} placeholder={userCities.length > 0 ? 'Search or type "my"' : 'Search cities...'} style={S.mapSearchInput}/>
          {mapSearch && (
            <div style={S.mapSearchDrop}>
              {/* Show user's pinned cities at the top */}
              {userCities.length > 0 && mapSearch.toLowerCase() === "my" && (
                <div style={{padding:"0.35rem 0.75rem",fontSize:"0.65rem",fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.08em",borderBottom:"1px solid #F3F4F6"}}>📌 Your Cities</div>
              )}
              {userCities.length > 0 && mapSearch.toLowerCase().startsWith("my") && (
                userCities.map(slug => {
                  const c = CITY_COORDS.find(cc => cc.slug === slug);
                  if (!c) return null;
                  return (
                    <div key={c.slug} onClick={() => { flyToCity(c.slug); setMapSearch(""); }} style={{...S.mapSearchItem, backgroundColor:"#F0FDF4"}}>
                      {PIN_EMOJI[c.country]} {c.name} <span style={{color:"#059669",fontSize:"0.7rem",fontWeight:600}}>📌 Saved</span>
                    </div>
                  );
                })
              )}
              {CITY_COORDS.filter(c => c.name.toLowerCase().includes(mapSearch.toLowerCase()) && !mapSearch.toLowerCase().startsWith("my")).slice(0,5).map(c => (
                <div key={c.slug} onClick={() => { flyToCity(c.slug); setMapSearch(""); }} style={S.mapSearchItem}>
                  {PIN_EMOJI[c.country]} {c.name} <span style={{color:"#9CA3AF",fontSize:"0.7rem"}}>{"\u00B7"} {c.uni?.split(",")[0]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Route Finder Section */}
        <div style={{position:"relative"}}>
          <button onClick={() => setShowRouteFinder(!showRouteFinder)} style={{
            ...S.routeToggle,
            ...(showRouteFinder ? {backgroundColor:"rgba(250,70,22,0.08)",color:"#FA4616",borderColor:"rgba(250,70,22,0.35)"} : {})
          }}>
            <Train size={14}/> Plan Trip
          </button>
          
          {showRouteFinder && (
            <div style={{
              position:"absolute",
              top:"100%",
              left:0,
              marginTop:"0.5rem",
              backgroundColor:"#fff",
              borderRadius:"0.75rem",
              border:"1px solid #E5E7EB",
              boxShadow:"0 8px 24px rgba(0,0,0,0.12)",
              padding:"0.75rem",
              minWidth:"280px",
              zIndex:1000
            }}>
              <div style={{fontSize:"0.7rem",fontWeight:700,color:"#374151",marginBottom:"0.5rem"}}>Find a Direct Train Connection</div>
              
              <select value={routeFrom} onChange={(e) => setRouteFrom(e.target.value)} style={{
                width:"100%",
                padding:"0.4rem 0.6rem",
                borderRadius:"0.5rem",
                border:"1px solid #E5E7EB",
                fontSize:"0.75rem",
                marginBottom:"0.5rem",
                backgroundColor:"#fff"
              }}>
                <option value="">From: Select city</option>
                {CITY_COORDS.map(city => (
                  <option key={city.slug} value={city.slug}>{PIN_EMOJI[city.country]} {city.name}</option>
                ))}
              </select>
              
              <select value={routeTo} onChange={(e) => setRouteTo(e.target.value)} style={{
                width:"100%",
                padding:"0.4rem 0.6rem",
                borderRadius:"0.5rem",
                border:"1px solid #E5E7EB",
                fontSize:"0.75rem",
                marginBottom:"0.5rem",
                backgroundColor:"#fff"
              }}>
                <option value="">To: Select city</option>
                {CITY_COORDS.map(city => (
                  <option key={city.slug} value={city.slug}>{PIN_EMOJI[city.country]} {city.name}</option>
                ))}
              </select>
              
              <button onClick={findRoute} style={{
                width:"100%",
                padding:"0.4rem",
                borderRadius:"0.5rem",
                border:"none",
                background:"linear-gradient(135deg,#0021A5,#003087)",
                color:"#fff",
                cursor:"pointer",
                fontSize:"0.75rem",
                fontWeight:600,
                marginBottom:"0.5rem"
              }}>
                Find Route
              </button>
              
              {foundRoute && (
                <div style={{
                  backgroundColor:"#ECFDF5",
                  border:"1px solid #A7F3D0",
                  borderRadius:"0.5rem",
                  padding:"0.5rem",
                  marginTop:"0.5rem"
                }}>
                  <div style={{fontSize:"0.7rem",fontWeight:700,color:"#065F46",marginBottom:"0.25rem"}}>✓ Route Found!</div>
                  <div style={{fontSize:"0.7rem",color:"#064E3B"}}>
                    <div>🚂 {foundRoute.type || "Train"}</div>
                    <div>⏱️ {foundRoute.time}</div>
                    <div>{isStudentFree(foundRoute) ? "🎓 FREE with Student Pass" : `💰 ${foundRoute.price}`}</div>
                  </div>
                </div>
              )}
              
              {foundRoute === null && routeFrom && routeTo && (
                <div style={{
                  backgroundColor:"#FEF2F2",
                  border:"1px solid #FECACA",
                  borderRadius:"0.5rem",
                  padding:"0.5rem",
                  marginTop:"0.5rem"
                }}>
                  <div style={{fontSize:"0.7rem",color:"#991B1B"}}>No direct route found. Try a different combination!</div>
                </div>
              )}
            </div>
          )}
        </div>
          <div style={S.flyBtns}>
            {[{code:"DE",flag:"\uD83C\uDDE9\uD83C\uDDEA"},{code:"AT",flag:"\uD83C\uDDE6\uD83C\uDDF9"},{code:"CH",flag:"\uD83C\uDDE8\uD83C\uDDED"}].map(c => (
              <button key={c.code} onClick={()=>flyToCountry(c.code)} style={S.flyBtn}>{c.flag}</button>
            ))}
            <button onClick={()=>{const m=mapInstanceRef.current;if(m)m.flyTo([48.5,10.5],6,{duration:1});}} style={S.flyBtn}><Globe size={12}/></button>
          </div>
          <button onClick={()=>setShowRoutes(!showRoutes)} style={{...S.routeToggle,...(showRoutes?{backgroundColor:"rgba(250,70,22,0.08)",color:"#FA4616",borderColor:"rgba(250,70,22,0.35)"}:{})}}>
            <Train size={14}/> {showRoutes ? "Hide Train Lines" : "Train Connections"}
          </button>
        </div>

        {/* Floating legend */}
        <div style={S.mapLegend}>
          <span style={{fontSize:"0.58rem",fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em",marginRight:"0.15rem"}}>Map Key</span>
          {Object.entries(PIN_COLORS).map(([k,c])=><span key={k} style={S.legI}><span style={{...S.legD,backgroundColor:c}}/> {COUNTRY_FLAGS[k]} {COUNTRY_LABELS[k]}</span>)}
          <span style={S.legI}><span style={{...S.legD,backgroundColor:"#fff",border:"2px solid #D1D5DB"}}/> Landmarks <span style={{fontSize:"0.55rem",color:"#9CA3AF"}}>(zoom in)</span></span>
          {showRoutes && <><span style={{width:1,height:14,background:"#E5E7EB",flexShrink:0}}/><span style={S.legI}><span style={{width:14,height:2,backgroundColor:"#FA4616",display:"inline-block",borderRadius:1}}/> Paid</span><span style={{...S.legI,display:"flex",alignItems:"center",gap:"0.25rem"}}><span style={{width:14,height:2,backgroundColor:"#10B981",display:"inline-block",borderRadius:1}}/> Student Pass <a href="https://int.bahn.de/en/faq/deutschlandticket-which-trains" target="_blank" rel="noopener noreferrer" title="Learn which trains your student ticket covers" style={{display:"inline-flex",cursor:"pointer",color:"#10B981",fontSize:"0.5rem"}}><Info size={10}/></a></span></>}
        </div>

        <div ref={mapRef} style={S.mapW}/>

        {/* City Preview Panel */}
        {selectedPin && (
          <div style={S.cityPanel}>
            <button onClick={()=>setSelectedPin(null)} style={S.cityPanelX}
              onMouseEnter={e=>{e.currentTarget.style.background="#E5E7EB";e.currentTarget.style.color="#374151";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#F3F4F6";e.currentTarget.style.color="#6B7280";}}><X size={14}/></button>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.75rem"}}>
              <span style={{fontSize:"1.6rem"}}>{PIN_EMOJI[selectedPin.country]}</span>
              <div>
                <h3 style={{fontSize:"1.15rem",fontWeight:700,color:"#111827",margin:0}}>{selectedPin.name}</h3>
                <span style={{fontSize:"0.72rem",color:"#6B7280"}}>{COUNTRY_LABELS[selectedPin.country]}</span>
              </div>
            </div>
            {selectedPin.uni && <div style={S.cpRow}><GraduationCap size={13} color="#0021A5"/><span style={{fontSize:"0.78rem",fontWeight:600,color:"#0021A5"}}>{selectedPin.uni}</span></div>}
            <p style={{fontSize:"0.82rem",color:"#4B5563",lineHeight:1.5,margin:"0 0 0.75rem 0"}}>{selectedPin.desc}</p>
            {selectedPin.vibe && <div style={S.cpVibe}><Coffee size={12}/> Vibe: <strong>{selectedPin.vibe}</strong></div>}
            <div style={S.cpStats}>
              {selectedPin.cost && <div style={S.cpStat}><DollarSign size={12} color="#059669"/><div><span style={{fontSize:"0.58rem",fontWeight:600,color:"#9CA3AF",display:"block",lineHeight:1}}>Avg Rent</span><span>{selectedPin.cost}</span></div></div>}
              {selectedPin.beer && <div style={S.cpStat}><span style={{fontSize:"0.85rem"}}>{"\uD83C\uDF7A"}</span><div><span style={{fontSize:"0.58rem",fontWeight:600,color:"#9CA3AF",display:"block",lineHeight:1}}>Beer Price</span><span>{selectedPin.beer}</span></div></div>}
              {selectedPin.transit && <div style={S.cpStat}><Train size={12} color="#4338CA"/><div><span style={{fontSize:"0.58rem",fontWeight:600,color:"#9CA3AF",display:"block",lineHeight:1}}>Transit</span><span>{selectedPin.transit}</span></div></div>}
            </div>
            {selectedPin.mustDo && <div style={S.cpMustDo}><Star size={12} color="#059669"/> <span>{selectedPin.mustDo}</span></div>}

            {/* Nearby landmarks */}
            {(() => {
              const nearbyLandmarks = LANDMARKS.filter(lm => lm.city === selectedPin.name);
              if (!nearbyLandmarks.length) return null;
              return (
                <div style={{marginTop:"0.75rem"}}>
                  <div style={{fontSize:"0.72rem",fontWeight:700,color:"#374151",marginBottom:"0.4rem",display:"flex",alignItems:"center",gap:"0.3rem"}}><MapPin size={12}/> {nearbyLandmarks.length} places to visit</div>
                  {nearbyLandmarks.map((lm,i) => (
                    <div key={i} style={{...S.cpRoute,cursor:"pointer"}} onClick={()=>lm.url && window.open(lm.url,"_blank","noopener,noreferrer")}>
                      <span>{lm.icon} {lm.name}</span>
                      <ExternalLink size={11} color="#9CA3AF"/>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Nearby routes */}
            {(() => {
              const routes = TRAVEL_ROUTES.filter(r => r.from === selectedPin.slug || r.to === selectedPin.slug);
              if (!routes.length) return null;
              const freeRoutes = routes.filter(r => isStudentFree(r));
              const paidRoutes = routes.filter(r => !isStudentFree(r));
              return (
                <div style={{marginTop:"0.75rem"}}>
                  <div style={{fontSize:"0.72rem",fontWeight:700,color:"#374151",marginBottom:"0.4rem",display:"flex",alignItems:"center",gap:"0.3rem"}}><Train size={12}/> {routes.length} Weekend Trip{routes.length !== 1 ? "s" : ""}</div>
                  {freeRoutes.length > 0 && (
                    <div style={{background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"0.4rem",padding:"0.35rem 0.55rem",marginBottom:"0.35rem",fontSize:"0.68rem",color:"#065F46",fontWeight:600,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"0.4rem"}}>
                      <span>🎓 {freeRoutes.length} route{freeRoutes.length!==1?"s":""} included w/ Student Train Pass</span>
                      <a href="https://int.bahn.de/en/faq/deutschlandticket-which-trains" target="_blank" rel="noopener noreferrer" style={{flexShrink:0,fontSize:"0.6rem",color:"#059669",textDecoration:"underline",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Info</a>
                    </div>
                  )}
                  {routes.map((r,i) => {
                    const dest = CITY_COORDS.find(c => c.slug === (r.from === selectedPin.slug ? r.to : r.from));
                    const isFree = isStudentFree(r);
                    return dest ? (
                      <div key={i} onClick={()=>flyToCity(dest.slug)} style={{...S.cpRoute,borderColor:isFree?"#A7F3D0":"#F3F4F6"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"0.3rem",flex:1,minWidth:0}}>
                          <span>{PIN_EMOJI[dest.country]}</span>
                          <span style={{fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{dest.name}</span>
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:"0.4rem",flexShrink:0}}>
                          {r.type && <span style={{fontSize:"0.58rem",color:"#6B7280"}}>{r.type}</span>}
                          <span style={{fontSize:"0.68rem",fontWeight:600,color:isFree?"#059669":"#374151"}}>{r.time}</span>
                          <span style={{fontSize:"0.62rem",color:isFree?"#059669":"#6B7280",fontWeight:isFree?600:400}}>{isFree ? "🎓 Free" : r.price}</span>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              );
            })()}

            <div style={{display:"flex",gap:"0.5rem",marginTop:"1rem"}}>
              <button onClick={()=>navigate("/tips?city="+selectedPin.slug)} style={S.cpPrimary}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 6px 18px rgba(0,33,165,0.35)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 3px 10px rgba(0,33,165,0.25)";}}>
                <Compass size={14}/> Explore</button>
              <button onClick={()=>navigate("/events?city="+encodeURIComponent(selectedPin.name))} style={S.cpSecondary}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.background="#EFF6FF";e.currentTarget.style.color="#0021A5";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#E5E7EB";e.currentTarget.style.background="#fff";e.currentTarget.style.color="#374151";}}>
                <Calendar size={14}/> Events</button>
            </div>
          </div>
        )}
      </section>

      {/* YOUR CITIES — daily briefing */}
      {userCities.length > 0 ? (
        <section style={{maxWidth:1200,margin:"0 auto",padding:"2.5rem 2rem 1.5rem"}}>
          {/* Section header */}
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem",marginBottom:"1.75rem"}}>
            <div>
              <p style={{fontSize:"0.68rem",fontWeight:700,color:"#FA4616",textTransform:"uppercase",letterSpacing:"0.1em",margin:"0 0 0.25rem"}}>❖ PERSONALIZED FOR YOU</p>
              <h2 style={{fontSize:"1.5rem",fontWeight:800,color:"#111827",margin:0,lineHeight:1.1}}>Daily Snapshot</h2>
              <p style={{fontSize:"0.82rem",color:"#9CA3AF",margin:"0.25rem 0 0"}}>Your {userCities.length === 1 ? "city" : `${userCities.length} cities`}. Today's snapshot.</p>
            </div>
            <button onClick={()=>{navigate("/tips");setTimeout(()=>window.scrollTo(0,0),50);}} style={{display:"inline-flex",alignItems:"center",gap:"0.35rem",padding:"0.5rem 1.1rem",border:"1.5px solid #E5E7EB",borderRadius:"0.6rem",background:"#fff",cursor:"pointer",fontSize:"0.78rem",fontWeight:600,color:"#374151",transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#0021A5";e.currentTarget.style.color="#0021A5";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#E5E7EB";e.currentTarget.style.color="#374151";}}>              
              <Globe size={13}/> All {TOTAL_CITIES} cities
            </button>
          </div>

          {/* Cards */}
          {(() => {
            const now = new Date();
            const hour = now.getHours();
            const dayIdx = Math.floor(now.getTime() / 86400000);
            const dayOfWeek = now.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayOfWeek];
            const timeEmoji = hour < 5 ? "🌙" : hour < 12 ? "🌤️" : hour < 17 ? "☀️" : hour < 21 ? "🌇" : "🌙";
            const timeLabel = hour < 5 ? "Late Night" : hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : hour < 21 ? "Evening" : "Night";

            const WEATHER_POOL = [
              { icon:"☀️", cond:"Clear & sunny",   hi:22, lo:12 },
              { icon:"⛅", cond:"Partly cloudy",   hi:18, lo:10 },
              { icon:"🌥️", cond:"Mostly cloudy",   hi:15, lo:9  },
              { icon:"🌦️", cond:"Light showers",   hi:14, lo:8  },
              { icon:"🌧️", cond:"Rainy day",       hi:11, lo:7  },
              { icon:"🌤️", cond:"Breezy & bright", hi:20, lo:11 },
              { icon:"❄️", cond:"Cold & crisp",    hi:4,  lo:-1 },
              { icon:"🌩️", cond:"Thunderstorms",   hi:17, lo:11 },
            ];

            const DAILY_PHRASES = [
              { de:"Entschuldigung, wo ist die nächste U-Bahn?", en:"Excuse me, where is the nearest subway?",  ctx:"🚇 Getting around" },
              { de:"Einmal Kaffee zum Mitnehmen, bitte.",           en:"One coffee to go, please.",                ctx:"☕ Morning café"   },
              { de:"Haben Sie WLAN hier?",                          en:"Do you have WiFi here?",                   ctx:"📶 Study cafés"    },
              { de:"Was können Sie empfehlen?",                   en:"What do you recommend?",                   ctx:"🍽️ Ordering food"  },
              { de:"Ist dieser Platz noch frei?",                   en:"Is this seat still free?",                 ctx:"📚 Library / café" },
              { de:"Kann ich mit Karte zahlen?",                    en:"Can I pay by card?",                       ctx:"💳 Shopping"       },
              { de:"Darf ich kurz vorbei?",                         en:"May I squeeze past?",                      ctx:"🚌 Crowded transit" },
              { de:"Haben Sie noch etwas Günstigeres?",           en:"Do you have something cheaper?",           ctx:"🛍️ Budgeting"      },
              { de:"Einmal bitte, zum Mitnehmen.",                  en:"One please, to take away.",                ctx:"🥙 Snack run"      },
              { de:"Wie komme ich zum Bahnhof?",                    en:"How do I get to the train station?",       ctx:"🚆 Weekend trips"  },
            ];

            const LOCAL_TIPS = {
              berlin:   ["Sunday brunch at Mauerpark is unmissable — arrive by 11am.", "Museum Island is free the last Thursday of each month after 6pm.", "The U8 runs all night on weekends — no night bus needed."],
              munich:   ["Biergartens let you BYO food — just buy your drink there.", "MVV day tickets are worth it if you're making 3+ trips.", "The English Garden has a real river surfing wave — free to watch."],
              hamburg:  ["Fischmarkt runs 5–9:30am Sundays — go straight from the club.", "Alster lake paddle boats rent for ~€15/hr — great afternoon.", "HVV Proficard saves 20% if you commute regularly."],
              bonn:     ["Free entry to Kunstmuseum every first Thursday of the month.", "Rheinboulevard at sunset is the best free view in the city.", "Rhine ferry from Königswinter is cheap and worth it."],
              vienna:   ["Standing-room opera tickets are €10–15 — queue 80 min before.", "All museums are free for under-26 EU citizens.", "Würstelstand hot dogs at midnight are a Viennese ritual."],
              salzburg: ["Mozart's birthplace is €13 but the fortress view is free.", "Augustinerbräu sells huge mugs of beer for ~€5.", "Bus 25 to Hallstatt runs daily in summer."],
              zurich:   ["Zurich museums are free the first Wednesday of the month.", "Swimming in the Limmat river in summer is completely free.", "The Zurich Card covers all public transit + museums."],
              bern:     ["Swimming in the Aare is Bern's best free summer activity.", "The rose garden above the old town has the best city panorama.", "Einstein's apartment is surprisingly small and surprisingly cool."],
              aachen:   ["Day trip to Maastricht is only 30 min by RE train.", "RWTH student card gets discounts at most cafés and cinemas.", "The Christmas market in December is one of Germany's best."],
              default:  ["Check the local Mensa for the cheapest hot lunch on campus.", "Student ID gets you 20–50% off at museums and cinemas.", "Most cities have free walking tours daily — tip what you can."],
            };

            const TONIGHT_BY_CITY = {
              berlin:   { sunday:"🎼 Philharmonie rush tickets go on sale — check their site", monday:"🎸 Jazz bars in Kreuzberg kick off late, usually no cover", tuesday:"🍺 Prater Biergarten's student night — €3 beers under the chestnut trees", wednesday:"🎭 Volksbühne open rehearsal nights — grab a cheap last-minute ticket", thursday:"🪩 Berghain pre-party vibes start — Thursday is the new Friday in Berlin", friday:"🎉 East Side Gallery is lit at night and totally free — take a walk", saturday:"🌟 Mauerpark amphitheater karaoke at 3pm, then clubs open at midnight" },
              munich:   { sunday:"🍺 Augustiner Keller biergarten golden hour — the best Sunday ritual", monday:"🎵 Nacht der Musik at various venues — student-priced tickets available", tuesday:"� Cinema at Museumslichtspiele does €6 Tuesday nights", wednesday:"🏄 Eisbach river surfers stay late on warm nights — free to watch", thursday:"🍻 Münchner Kindl pre-drinks near LMU before heading to Schwabing", friday:"🎉 English Garden gets buzzing — bring a blanket and Augustiner cans", saturday:"🌟 Oktoberfest tents open at 10am — arrive early or queue for hours" },
              hamburg:  { sunday:"🐟 Fischmarkt ends at 9:30am — go straight from last night or rise early", monday:"🎵 Elbphilharmonie has Monday concerts from €15 — worth every cent", tuesday:"🍸 Strandperle beach bar is the Tuesday local ritual", wednesday:"🎤 Molotow hosts mid-week indie gigs — student door deals before 10pm", thursday:"🎭 Reeperbahn Festival fringe events happen all year — check locally", friday:"� Alster boat bars start up — sunset cruise drinks from the dock", saturday:"🌟 Schanzenviertel wakes up at midnight — bars till 5am" },
              vienna:   { sunday:"🎼 Vienna Boys Choir sings Sunday morning mass — €12 standing room", monday:"☕ Kaffeehäuser are perfect on slow Mondays — read the newspaper like a local", tuesday:"🍷 Heuriger wine taverns open from 4pm — CHF3 Grüner Veltliner", wednesday:"🎵 Volksoper has weekday discount tickets from €8 for students", thursday:"🪩 Gürtel bar street warms up — students spill out of the arches at 11pm", friday:"� Naschmarkt shuts and transforms into a late-night bar district", saturday:"🌟 Donaukanal beach bars are packed — Flex and Motto open till 6am" },
              salzburg: { sunday:"🎼 Mozarteum Sunday matinée — €10 for world-class classical music", monday:"🍺 Augustinerbräu is quiet on Mondays — perfect for a solo evening", tuesday:"🌅 Hohensalzburg fortress is beautiful at sunset — free outside", wednesday:"🎭 Landestheater student tickets go on sale Wednesday morning", thursday:"🍻 Steingasse bars come alive Thursday night — the local student strip", friday:"🎉 Müllner Bräu biergarten fills up fast — get there before 6pm", saturday:"🌟 Old Town Getreidegasse is magical at night — no car traffic, all atmosphere" },
              zurich:   { sunday:"🚴 Zurich's car-free Sunday lakeside walk is the best free thing in the city", monday:"🎵 Tonhalle has last-minute student tickets from CHF12 on Mondays", tuesday:"☕ Conditorei Schober has been serving hot chocolate since 1814 — treat yourself", wednesday:"🎨 Kunsthaus is free the first Wednesday of the month after 5pm", thursday:"🍸 Langstrasse bar crawl — the student budget option before Friday prices kick in", friday:"🎉 Rimini bar on the Limmat lake pier — best Friday evening vibe in the city", saturday:"🌟 Zurich clubs open at 2am — Hive and Zukunft are the spots" },
              bern:     { sunday:"🌊 Aare swim in summer ends with a BBQ at Marzilibad — free and unforgettable", monday:"☕ Einstein Haus is surprisingly interesting on a slow Monday afternoon", tuesday:"🌹 Rosengarten is free and has the best city view — perfect any evening", wednesday:"� Stadttheater student rush tickets go on sale Wednesday at noon", thursday:"🍻 Brasserie Lorraine is the student hangout — cheap beer, great terrace", friday:"🎉 Reitschule cultural center has free Friday events — very Bern", saturday:"🌟 Old Town arcades (Lauben) at night — the medieval street is stunning" },
              graz:     { sunday:"🏰 Schlossberg evening walk is free and the view is spectacular", monday:"🎵 Oper Graz student tickets from €8 — one of Austria's best opera houses", tuesday:"🍺 Puntigamer brewery tours run Tuesday evenings — cheap and fun", wednesday:"🎨 Kunsthaus Graz lights up at night — the alien blobject is actually incredible", thursday:"🍻 Lendplatz bars warm up Thursday — the cool neighbourhood to know", friday:"🎉 Volksgarten starts the weekend — outdoor bar, student prices all night", saturday:"🌟 Schlossberg clock tower at 11pm — the night panorama is one of a kind" },
              aachen:   { sunday:"🏛️ Aachen Cathedral is free and stunning — especially on quiet Sunday mornings", monday:"☕ Pontstraße café hop — every place has student discount Monday deals", tuesday:"🚂 Quick trip to Maastricht — 30 min by RE, Dutch happy hours start at 4pm", wednesday:"🎭 Eurogress cultural events — often student-free entry mid-week", thursday:"🍻 Pontstraße goes off Thursday — the student nightlife strip", friday:"🎉 Elisengarten is the pre-game spot before heading to the clubs", saturday:"🌟 Maastricht market + nightlife — the best cross-border Saturday trip" },
              bonn:     { sunday:"🎼 Beethoven-Haus Sunday concert — intimate chamber music, €12 tickets", monday:"🌊 Rhine promenade evening walk — locals run and cycle here every night", tuesday:"🍺 Biergarten am Rhein gets the sunset crowd on clear evenings", wednesday:"🎭 Oper Bonn student tickets from €7 — midweek deals are the best", thursday:"� Markt square bars fill up Thursday — the pre-weekend ritual", friday:"🎉 Kennedy Ufer riverside bars open — the student stretch along the Rhine", saturday:"🌟 Day trip to Cologne is only 20 min by S-Bahn — back for a late Bonn night" },
              default:  { sunday:"🎼 Check local church or concert halls for free Sunday performances", monday:"☕ Find the university Mensa café — often open evenings too", tuesday:"🍺 Tuesday is cheapest bar night across Germany and Austria", wednesday:"🎭 Mid-week theatre and concert rush tickets are usually half price", thursday:"🪩 Thursday is the student night out in most German university towns", friday:"🎉 The weekend starts tonight — check local social media for what's on", saturday:"🌟 Prime night out — every venue has something on" },
            };
            const tonightMap = TONIGHT_BY_CITY;

            // Bookmark helpers for daily phrases
            const getDailyBookmarks = () => {
              try { return JSON.parse(localStorage.getItem("dailyPhraseBookmarks") || "[]"); } catch { return []; }
            };
            const toggleDailyBookmark = (phrase) => {
              const prev = getDailyBookmarks();
              const exists = prev.some(p => p.de === phrase.de);
              const next = exists ? prev.filter(p => p.de !== phrase.de) : [...prev, phrase];
              localStorage.setItem("dailyPhraseBookmarks", JSON.stringify(next));
              setUserData(prev => ({...prev})); // force re-render
            };
            const isDailyBookmarked = (de) => getDailyBookmarks().some(p => p.de === de);

            // Sort: primary city first
            const sortedCities = [...userCities].sort((a, b) => {
              const aP = a === userCityData?.slug ? -1 : 0;
              const bP = b === userCityData?.slug ? -1 : 0;
              return aP - bP;
            });

            return (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"1.25rem"}}>
                {loading ? (
                  /* ── Shimmer skeleton while loading ── */
                  Array.from({length: 3}).map((_, i) => (
                    <div key={i} style={{borderRadius:"1.25rem",overflow:"hidden",border:"1px solid #E5E7EB",background:"#fff"}}>
                      <div style={{height:"60px",background:"linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite"}}/>
                      <div style={{padding:"1rem",display:"flex",flexDirection:"column",gap:"0.75rem"}}>
                        <div style={{height:"16px",width:"60%",borderRadius:"8px",background:"linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite"}}/>
                        <div style={{height:"12px",width:"90%",borderRadius:"6px",background:"linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite"}}/>
                        <div style={{height:"12px",width:"75%",borderRadius:"6px",background:"linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite"}}/>
                        <div style={{height:"32px",width:"40%",borderRadius:"10px",background:"linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite",marginTop:"0.5rem"}}/>
                      </div>
                      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
                    </div>
                  ))
                ) : sortedCities.map((slug, cardIdx) => {
                  const pin = CITY_COORDS.find(c => c.slug === slug);
                  if (!pin) return null;

                  const weather = weatherMap[slug] ?? {
                    icon: "⏳", cond: "Loading...", hi: "—", lo: "—",
                    sunrise: "—", sunset: "—",
                  };
                  const phrase = DAILY_PHRASES[(dayIdx + pin.name.charCodeAt(0)) % DAILY_PHRASES.length];
                  const tips = LOCAL_TIPS[slug] || LOCAL_TIPS.default;
                  const tip = tips[(dayIdx + cardIdx) % tips.length];
                  const isPrimary = pin.slug === userCityData?.slug;
                  const cityTonight = tonightMap[slug] || tonightMap.default;
                  const tonightTip = cityTonight[dayName.toLowerCase()] || "🌙 Good night for a walk along the river";
                  const hdrGradient = isPrimary
                    ? "linear-gradient(135deg,#FA4616 0%,#c73800 100%)"
                    : "linear-gradient(135deg,#0021A5 0%,#003087 100%)";

                  return (
                    <div key={slug} style={{borderRadius:"1rem",overflow:"hidden",boxShadow:isPrimary?"0 8px 32px rgba(250,70,22,0.13)":"0 4px 24px rgba(0,0,0,0.06)",border:isPrimary?"1.5px solid #FDBA74":"1px solid #E2E8F0",background:"#fff",transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",gridColumn:isPrimary&&userCities.length>1?"1 / -1":"auto"}}
                      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=isPrimary?"0 20px 56px rgba(250,70,22,0.16)":"0 20px 56px rgba(0,33,165,0.12)";}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=isPrimary?"0 8px 32px rgba(250,70,22,0.13)":"0 4px 24px rgba(0,0,0,0.06)";}}>

                      {/* Header */}
                      <div style={{background:hdrGradient,padding:isPrimary?"0.75rem 1rem":"0.6rem 0.85rem",position:"relative",overflow:"hidden"}}>
                        <div style={{position:"absolute",top:"-40%",right:"-15%",width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none"}}/>
                        <div style={{position:"absolute",bottom:"-30%",left:"-10%",width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.03)",pointerEvents:"none"}}/>
                        <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <div style={{display:"flex",alignItems:"center",gap:"0.4rem"}}>
                            {isPrimary && <span style={{fontSize:"0.45rem",fontWeight:800,background:"rgba(255,255,255,0.2)",color:"#fff",padding:"0.12rem 0.45rem",borderRadius:9999,letterSpacing:"0.1em",border:"1px solid rgba(255,255,255,0.3)",backdropFilter:"blur(4px)"}}>❖ YOUR CITY</span>}
                            <span style={{fontSize:isPrimary?"1.4rem":"1.1rem",lineHeight:1,filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.15))"}}>{PIN_EMOJI[pin.country]}</span>
                            <h3 style={{fontSize:isPrimary?"1.25rem":"0.92rem",fontWeight:800,color:"#fff",margin:0,letterSpacing:"-0.02em",textShadow:"0 1px 3px rgba(0,0,0,0.1)"}}>{pin.name}</h3>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:"0.35rem",background:"rgba(255,255,255,0.12)",borderRadius:"0.5rem",padding:isPrimary?"0.3rem 0.6rem":"0.25rem 0.5rem",border:"1px solid rgba(255,255,255,0.1)",backdropFilter:"blur(8px)"}}>
                            <span style={{fontSize:isPrimary?"1rem":"0.85rem"}}>{weather.icon}</span>
                            <div style={{textAlign:"right"}}>
                              <p style={{fontSize:isPrimary?"0.82rem":"0.72rem",fontWeight:800,color:"#fff",margin:0,lineHeight:1}}>{weather.lo}° / {weather.hi}°C</p>
                              <p style={{fontSize:isPrimary?"0.52rem":"0.45rem",color:"rgba(255,255,255,0.55)",margin:"0.05rem 0 0",fontWeight:500}}>{weather.cond}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      {isPrimary ? (
                        /* ===== PRIMARY CITY — organized sections ===== */
                        <div style={{padding:"0.75rem 1rem",display:"flex",flexDirection:"column",gap:"0.65rem"}}>
                          {/* Time context bar */}
                          <div style={{display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.3rem 0.6rem",background:"#F8FAFC",borderRadius:"0.5rem",border:"1px solid #F1F5F9"}}>
                            <span style={{fontSize:"0.75rem"}}>{timeEmoji}</span>
                            <span style={{fontSize:"0.65rem",fontWeight:600,color:"#64748B"}}>{timeLabel} in {pin.name} · {dayName}</span>
                          </div>

                          {/* ── Section: Language & Culture ── */}
                          <div>
                            <div style={{display:"flex",alignItems:"center",gap:"0.3rem",marginBottom:"0.35rem"}}>
                              <div style={{width:3,height:12,borderRadius:2,background:"linear-gradient(180deg,#0021A5,#3B82F6)"}}/>
                              <span style={{fontSize:"0.56rem",fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.1em"}}>Language & Culture</span>
                            </div>
                            <div style={{display:"grid",gridTemplateColumns:userCities.length>1?"1fr 1fr":"1fr",gap:"0.5rem"}}>
                              {/* Phrase of the day */}
                              <div style={{background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",borderRadius:"0.65rem",padding:"0.55rem 0.7rem",border:"1px solid #BFDBFE",transition:"all 0.2s"}}
                                onMouseEnter={e=>{e.currentTarget.style.borderColor="#93C5FD";}}
                                onMouseLeave={e=>{e.currentTarget.style.borderColor="#BFDBFE";}}>
                                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.25rem"}}>
                                  <span style={{fontSize:"0.55rem",fontWeight:700,color:"#0021A5",textTransform:"uppercase",letterSpacing:"0.08em"}}>💬 Street-Ready German</span>
                                  <div style={{display:"flex",alignItems:"center",gap:"0.25rem"}}>
                                    <button onClick={(e)=>{e.stopPropagation();toggleDailyBookmark(phrase);}} title={isDailyBookmarked(phrase.de)?"Remove bookmark":"Bookmark"} style={{background:isDailyBookmarked(phrase.de)?"#FFF7ED":"#fff",border:isDailyBookmarked(phrase.de)?"1px solid #FA4616":"1px solid #BFDBFE",borderRadius:"0.3rem",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s",padding:0}}>
                                      <Bookmark size={10} fill={isDailyBookmarked(phrase.de)?"#FA4616":"none"} color={isDailyBookmarked(phrase.de)?"#FA4616":"#0021A5"}/>
                                    </button>
                                    <button onClick={()=>{if(typeof speechSynthesis!=="undefined"){const u=new SpeechSynthesisUtterance(phrase.de);u.lang="de-DE";u.rate=0.85;speechSynthesis.speak(u);}}} style={{background:"#fff",border:"1px solid #BFDBFE",borderRadius:"0.3rem",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s",padding:0}}>
                                      <Volume2 size={10} color="#0021A5"/>
                                    </button>
                                  </div>
                                </div>
                                <p style={{fontSize:"0.88rem",fontWeight:800,color:"#0021A5",margin:"0 0 0.15rem",lineHeight:1.25}}>{phrase.de}</p>
                                <p style={{fontSize:"0.7rem",color:"#374151",margin:"0 0 0.2rem"}}>{phrase.en}</p>
                                <span style={{fontSize:"0.55rem",fontWeight:600,color:"#003087",background:"rgba(0,33,165,0.08)",padding:"0.08rem 0.4rem",borderRadius:9999}}>{phrase.ctx}</span>
                              </div>
                              {/* Local tip */}
                              <div style={{display:"flex",alignItems:"flex-start",gap:"0.45rem",background:"#F5F8FF",borderRadius:"0.65rem",padding:"0.55rem 0.7rem",border:"1px solid #C7D7F8"}}>
                                <div style={{width:24,height:24,borderRadius:"0.35rem",background:"linear-gradient(135deg,#0021A5,#003087)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.72rem"}}>💡</div>
                                <div style={{flex:1,minWidth:0}}>
                                  <p style={{fontSize:"0.55rem",fontWeight:700,color:"#0021A5",textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 0.1rem"}}>Local tip</p>
                                  <p style={{fontSize:"0.72rem",color:"#1e3a8a",margin:0,lineHeight:1.35,fontWeight:500}}>{tip}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ── Section: What's On Tonight ── */}
                          <div>
                            <div style={{display:"flex",alignItems:"center",gap:"0.3rem",marginBottom:"0.35rem"}}>
                              <div style={{width:3,height:12,borderRadius:2,background:"linear-gradient(180deg,#FA4616,#FF8C42)"}}/>
                              <span style={{fontSize:"0.56rem",fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.1em"}}>What's On</span>
                            </div>
                            <div style={{display:"flex",alignItems:"flex-start",gap:"0.45rem",background:"#FFF7F5",borderRadius:"0.65rem",padding:"0.55rem 0.7rem",border:"1px solid #FECDC2"}}>
                              <div style={{width:24,height:24,borderRadius:"0.35rem",background:"linear-gradient(135deg,#FA4616,#c73800)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.72rem"}}>
                                {isWeekend ? "🎉" : "🌆"}
                              </div>
                              <div style={{flex:1,minWidth:0}}>
                                <p style={{fontSize:"0.55rem",fontWeight:700,color:"#c73800",textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 0.1rem"}}>Tonight · {dayName}</p>
                                <p style={{fontSize:"0.72rem",color:"#7C2D12",margin:0,lineHeight:1.35,fontWeight:500}}>{tonightTip}</p>
                              </div>
                            </div>
                          </div>

                          {/* ── Section: Live Info Grid ── */}
                          <div>
                            <div style={{display:"flex",alignItems:"center",gap:"0.3rem",marginBottom:"0.35rem"}}>
                              <div style={{width:3,height:12,borderRadius:2,background:"linear-gradient(180deg,#059669,#34D399)"}}/>
                              <span style={{fontSize:"0.56rem",fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.1em"}}>Live Info</span>
                            </div>
                            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem"}}>
                              {/* Daylight */}
                              <div style={{background:"linear-gradient(135deg,#FFF8ED,#FFFBE8)",borderRadius:"0.55rem",padding:"0.4rem 0.55rem",border:"1px solid #FDEAB8"}}>
                                <div style={{display:"flex",alignItems:"center",gap:"0.25rem",marginBottom:"0.15rem"}}>
                                  <span style={{fontSize:"0.65rem"}}>🌅</span>
                                  <span style={{fontSize:"0.5rem",fontWeight:700,color:"#92400E",textTransform:"uppercase",letterSpacing:"0.06em"}}>Daylight</span>
                                </div>
                                <p style={{fontSize:"0.68rem",color:"#78350F",margin:0,lineHeight:1.3,fontWeight:600}}>
                                  ☀️ {weather.sunrise ?? "—"} · 🌇 {weather.sunset ?? "—"}
                                </p>
                              </div>
                              {/* Next Holiday */}
                              {(() => {
                                const countryCode = pin.country || "DE";
                                const nextH = getNextHoliday(countryCode);
                                if (!nextH) return null;
                                const daysUntil = Math.ceil((new Date(nextH.date) - now) / (1000*60*60*24));
                                const countryFlag = {DE:"🇩🇪",AT:"🇦🇹",CH:"🇨🇭"}[countryCode] || "🌍";
                                return (
                                  <div style={{background:"linear-gradient(135deg,#F0FFF4,#ECFDF5)",borderRadius:"0.55rem",padding:"0.4rem 0.55rem",border:"1px solid #A7F3D0"}}>
                                    <div style={{display:"flex",alignItems:"center",gap:"0.25rem",marginBottom:"0.15rem"}}>
                                      <span style={{fontSize:"0.65rem"}}>🗓️</span>
                                      <span style={{fontSize:"0.5rem",fontWeight:700,color:"#065F46",textTransform:"uppercase",letterSpacing:"0.06em"}}>Holiday {countryFlag}</span>
                                    </div>
                                    <p style={{fontSize:"0.68rem",color:"#064E3B",margin:0,lineHeight:1.3,fontWeight:600}}>
                                      {nextH.name} {daysUntil === 0 ? "— today!" : <>· {daysUntil}d</>}
                                    </p>
                                    {nextH.name !== nextH.nameEn && <p style={{fontSize:"0.55rem",color:"#059669",margin:"0.05rem 0 0",fontStyle:"italic"}}>({nextH.nameEn})</p>}
                                  </div>
                                );
                              })()}
                              {/* Air Quality */}
                              {aqiMap[slug] && aqiMap[slug].aqi !== null && (
                                <div style={{background:"linear-gradient(135deg,#F8FFFE,#ECFDF8)",borderRadius:"0.55rem",padding:"0.4rem 0.55rem",border:"1px solid #99F6E4"}}>
                                  <div style={{display:"flex",alignItems:"center",gap:"0.25rem",marginBottom:"0.15rem"}}>
                                    <span style={{fontSize:"0.65rem"}}>{aqiMap[slug].emoji}</span>
                                    <span style={{fontSize:"0.5rem",fontWeight:700,color:"#0D9488",textTransform:"uppercase",letterSpacing:"0.06em"}}>Air Quality</span>
                                  </div>
                                  <p style={{fontSize:"0.68rem",color:"#134E4A",margin:0,lineHeight:1.3,fontWeight:600}}>
                                    <span style={{color:aqiMap[slug].color}}>{aqiMap[slug].label}</span> · AQI {aqiMap[slug].aqi}
                                  </p>
                                </div>
                              )}
                              {/* Exchange Rates */}
                              {exchangeRates && (
                                <div style={{background:"linear-gradient(135deg,#FFF8F0,#FFF5EB)",borderRadius:"0.55rem",padding:"0.4rem 0.55rem",border:"1px solid #FED7AA"}}>
                                  <div style={{display:"flex",alignItems:"center",gap:"0.25rem",marginBottom:"0.15rem"}}>
                                    <span style={{fontSize:"0.65rem"}}>💱</span>
                                    <span style={{fontSize:"0.5rem",fontWeight:700,color:"#92400E",textTransform:"uppercase",letterSpacing:"0.06em"}}>Rates</span>
                                  </div>
                                  <div style={{display:"flex",gap:"0.35rem",flexWrap:"wrap"}}>
                                    <span style={{fontSize:"0.65rem",color:"#78350F",fontWeight:600}}>$→€{exchangeRates.usd_eur}</span>
                                    <span style={{fontSize:"0.65rem",color:"#78350F",fontWeight:600}}>$→CHF{exchangeRates.usd_chf}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* ── Fun Fact — full width accent ── */}
                          {(() => {
                            const cityFact = getRandomFunFact(slug, pin.country || "DE", cardIdx);
                            return (
                              <div style={{display:"flex",alignItems:"flex-start",gap:"0.45rem",background:"linear-gradient(135deg,#FAF5FF,#F3E8FF)",borderRadius:"0.65rem",padding:"0.55rem 0.7rem",border:"1px solid #DDD6FE"}}>
                                <span style={{fontSize:"0.75rem",flexShrink:0}}>{cityFact.emoji}</span>
                                <div style={{flex:1,minWidth:0}}>
                                  <p style={{fontSize:"0.55rem",fontWeight:700,color:"#6D28D9",textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 0.1rem"}}>Did You Know? · {pin.name}</p>
                                  <p style={{fontSize:"0.72rem",color:"#4C1D95",margin:0,lineHeight:1.35,fontWeight:500}}>{cityFact.fact}</p>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      ) : (
                        /* ===== SECONDARY CITY — organized compact layout ===== */
                        <div style={{padding:"0.6rem 0.85rem",display:"flex",flexDirection:"column",gap:"0.45rem"}}>
                          {/* Time context */}
                          <div style={{display:"flex",alignItems:"center",gap:"0.35rem",padding:"0.25rem 0.5rem",background:"#F8FAFC",borderRadius:"0.4rem",border:"1px solid #F1F5F9"}}>
                            <span style={{fontSize:"0.65rem"}}>{timeEmoji}</span>
                            <span style={{fontSize:"0.58rem",fontWeight:600,color:"#64748B"}}>{timeLabel} · {dayName}</span>
                          </div>

                          {/* Tonight + Quick tip — side by side highlights */}
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem"}}>
                            <div style={{display:"flex",alignItems:"flex-start",gap:"0.35rem",background:"#FFF7F5",borderRadius:"0.5rem",padding:"0.4rem 0.5rem",border:"1px solid #FECDC2"}}>
                              <div style={{width:20,height:20,borderRadius:"0.3rem",background:"linear-gradient(135deg,#FA4616,#c73800)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.6rem"}}>{isWeekend?"🎉":"🌆"}</div>
                              <div style={{flex:1,minWidth:0}}>
                                <p style={{fontSize:"0.48rem",fontWeight:700,color:"#c73800",textTransform:"uppercase",letterSpacing:"0.06em",margin:"0 0 0.05rem"}}>Tonight</p>
                                <p style={{fontSize:"0.65rem",color:"#7C2D12",margin:0,lineHeight:1.25,fontWeight:500}}>{tonightTip}</p>
                              </div>
                            </div>
                            <div style={{display:"flex",alignItems:"flex-start",gap:"0.35rem",background:"#F5F8FF",borderRadius:"0.5rem",padding:"0.4rem 0.5rem",border:"1px solid #C7D7F8"}}>
                              <div style={{width:20,height:20,borderRadius:"0.3rem",background:"linear-gradient(135deg,#0021A5,#003087)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.6rem"}}>💡</div>
                              <div style={{flex:1,minWidth:0}}>
                                <p style={{fontSize:"0.48rem",fontWeight:700,color:"#0021A5",textTransform:"uppercase",letterSpacing:"0.06em",margin:"0 0 0.05rem"}}>Quick tip</p>
                                <p style={{fontSize:"0.65rem",color:"#1e3a8a",margin:0,lineHeight:1.25,fontWeight:500}}>{tip}</p>
                              </div>
                            </div>
                          </div>

                          {/* Live info mini-grid: Holiday + AQI */}
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem"}}>
                            {(() => {
                              const cc = pin.country || "DE";
                              const nextH = getNextHoliday(cc);
                              if (!nextH) return null;
                              const hDate = new Date(nextH.date);
                              const daysUntil = Math.max(0, Math.ceil((hDate - new Date()) / 86400000));
                              return (
                                <div style={{background:"#F0FFF4",borderRadius:"0.45rem",padding:"0.35rem 0.45rem",border:"1px solid #A7F3D0"}}>
                                  <div style={{display:"flex",alignItems:"center",gap:"0.25rem",marginBottom:"0.1rem"}}>
                                    <span style={{fontSize:"0.58rem"}}>🗓️</span>
                                    <span style={{fontSize:"0.48rem",fontWeight:700,color:"#065F46",textTransform:"uppercase",letterSpacing:"0.05em"}}>Holiday</span>
                                  </div>
                                  <p style={{fontSize:"0.65rem",color:"#064E3B",margin:0,lineHeight:1.25,fontWeight:600}}>
                                    {nextH.localName || nextH.name} · <span style={{fontWeight:700}}>{daysUntil === 0 ? "Today!" : `${daysUntil}d`}</span>
                                  </p>
                                </div>
                              );
                            })()}
                            {aqiMap[slug] && aqiMap[slug].aqi !== null && (
                              <div style={{background:"#F8FFFE",borderRadius:"0.45rem",padding:"0.35rem 0.45rem",border:"1px solid #99F6E4"}}>
                                <div style={{display:"flex",alignItems:"center",gap:"0.25rem",marginBottom:"0.1rem"}}>
                                  <span style={{fontSize:"0.58rem"}}>{aqiMap[slug].emoji}</span>
                                  <span style={{fontSize:"0.48rem",fontWeight:700,color:"#0F766E",textTransform:"uppercase",letterSpacing:"0.05em"}}>Air</span>
                                </div>
                                <p style={{fontSize:"0.65rem",color:"#134E4A",margin:0,lineHeight:1.25,fontWeight:600}}>
                                  <span style={{color:aqiMap[slug].color}}>{aqiMap[slug].label}</span> · {aqiMap[slug].aqi}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Fun Fact — compact */}
                          {(() => {
                            const cityFact = getRandomFunFact(slug, pin.country || "DE", cardIdx + 100);
                            return (
                              <div style={{display:"flex",alignItems:"flex-start",gap:"0.35rem",background:"#FAF5FF",borderRadius:"0.5rem",padding:"0.4rem 0.5rem",border:"1px solid #DDD6FE"}}>
                                <span style={{fontSize:"0.62rem",flexShrink:0}}>{cityFact.emoji}</span>
                                <p style={{fontSize:"0.65rem",color:"#4C1D95",margin:0,lineHeight:1.3,fontWeight:500}}>{cityFact.fact}</p>
                              </div>
                            );
                          })()}

                          {/* Quick actions footer */}
                          <div style={{display:"flex",gap:"0.35rem",paddingTop:"0.25rem",borderTop:"1px solid #F1F5F9"}}>
                            <button onClick={()=>navigate("/tips?city="+slug)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.2rem",padding:"0.3rem",border:"1px solid #E2E8F0",borderRadius:"0.4rem",background:"#fff",cursor:"pointer",fontSize:"0.62rem",fontWeight:600,color:"#374151",transition:"all 0.15s"}}
                              onMouseEnter={e=>{e.currentTarget.style.borderColor="#0021A5";e.currentTarget.style.color="#0021A5";e.currentTarget.style.background="#EFF6FF";}}
                              onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#374151";e.currentTarget.style.background="#fff";}}>
                              <Compass size={10}/> Explore
                            </button>
                            <button onClick={()=>navigate("/events?city="+encodeURIComponent(pin.name))} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.2rem",padding:"0.3rem",border:"1px solid #E2E8F0",borderRadius:"0.4rem",background:"#fff",cursor:"pointer",fontSize:"0.62rem",fontWeight:600,color:"#374151",transition:"all 0.15s"}}
                              onMouseEnter={e=>{e.currentTarget.style.borderColor="#FA4616";e.currentTarget.style.color="#FA4616";e.currentTarget.style.background="#FFF7ED";}}
                              onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#374151";e.currentTarget.style.background="#fff";}}>
                              <Calendar size={10}/> Events
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </section>
      ) : userName ? (
        <section style={{maxWidth:1200,margin:"0 auto",padding:"2.5rem 2rem 1.5rem"}}>
          <div style={{background:"#fff",borderRadius:"1rem",border:"1px solid #E5E7EB",padding:"2.5rem",textAlign:"center"}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem"}}><MapPin size={24} color="#0021A5"/></div>
            <h3 style={{fontSize:"1.2rem",fontWeight:700,color:"#111827",margin:"0 0 0.4rem"}}>Save cities to personalize your experience</h3>
            <p style={{fontSize:"0.88rem",color:"#6B7280",maxWidth:420,margin:"0 auto 1.25rem",lineHeight:1.55}}>Head to Explore, pick the cities you're studying in or want to visit, and they'll show up here as your personal hub.</p>
            <button onClick={() => navigate("/tips")} style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",padding:"0.7rem 1.5rem",border:"none",borderRadius:"0.6rem",background:"linear-gradient(135deg,#0021A5,#003087)",color:"#fff",cursor:"pointer",fontSize:"0.88rem",fontWeight:700,boxShadow:"0 3px 12px rgba(0,33,165,0.2)"}}><Compass size={15}/> Browse Cities</button>
          </div>
        </section>
      ) : null}

      {/* CITY PICKER MODAL — shown for new users with no saved cities */}
      {showCityPicker && (
        <div style={{position:"fixed",inset:0,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)",animation:"slideUp 0.3s ease-out"}}>
          <div style={{background:"#fff",borderRadius:"1.25rem",width:"90%",maxWidth:560,maxHeight:"80vh",overflow:"hidden",boxShadow:"0 25px 60px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column"}}>
            <div style={{padding:"1.75rem 2rem 1rem",borderBottom:"1px solid #F3F4F6"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.5rem"}}>
                <div style={{width:40,height:40,borderRadius:"0.75rem",background:"linear-gradient(135deg,#0021A5,#003087)",display:"flex",alignItems:"center",justifyContent:"center"}}><MapPin size={20} color="#fff"/></div>
                <div>
                  <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#111827",margin:0}}>Where are you studying abroad?</h2>
                  <p style={{fontSize:"0.82rem",color:"#6B7280",margin:0}}>Pick your cities to personalize your experience</p>
                </div>
              </div>
            </div>
            <div style={{padding:"1rem 2rem",overflowY:"auto",flex:1}}>
              {["DE","AT","CH"].map(code => {
                const countryCities = CITY_COORDS.filter(c => c.country === code);
                return (
                  <div key={code} style={{marginBottom:"1rem"}}>
                    <div style={{fontSize:"0.72rem",fontWeight:700,color:"#6B7280",marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"0.06em"}}>{PIN_EMOJI[code]} {COUNTRY_LABELS[code]}</div>
                    <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
                      {countryCities.map(city => {
                        const selected = pickerSelected.includes(city.slug);
                        return (
                          <button key={city.slug} onClick={() => setPickerSelected(prev => selected ? prev.filter(s=>s!==city.slug) : [...prev, city.slug])}
                            style={{
                              padding:"0.4rem 0.85rem",borderRadius:9999,fontSize:"0.78rem",fontWeight:600,cursor:"pointer",transition:"all 0.15s",
                              background: selected ? "linear-gradient(135deg,#0021A5,#003087)" : "#F9FAFB",
                              color: selected ? "#fff" : "#374151",
                              border: selected ? "1.5px solid #0021A5" : "1.5px solid #E5E7EB",
                              boxShadow: selected ? "0 2px 8px rgba(0,33,165,0.2)" : "none",
                            }}>
                            {selected ? "✓ " : ""}{city.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{padding:"1rem 2rem 1.5rem",borderTop:"1px solid #F3F4F6",display:"flex",gap:"0.75rem",justifyContent:"flex-end",alignItems:"center"}}>
              <span style={{fontSize:"0.78rem",color:"#6B7280",flex:1}}>{pickerSelected.length > 0 ? `${pickerSelected.length} selected` : "Select at least one city"}</span>
              <button onClick={() => { setShowCityPicker(false); localStorage.setItem("cityPickerDismissed","true"); }} style={{padding:"0.55rem 1.2rem",border:"1px solid #E5E7EB",borderRadius:"0.6rem",background:"#fff",cursor:"pointer",fontSize:"0.82rem",fontWeight:600,color:"#6B7280"}}>Skip</button>
              <button onClick={() => {
                if (pickerSelected.length > 0) {
                  localStorage.setItem("myCities", JSON.stringify(pickerSelected));
                  localStorage.setItem("cityPickerDismissed","true");
                  setShowCityPicker(false);
                  setUserData(readUserData());
                }
              }} disabled={pickerSelected.length === 0} style={{
                padding:"0.55rem 1.5rem",border:"none",borderRadius:"0.6rem",
                background: pickerSelected.length > 0 ? "linear-gradient(135deg,#FA4616,#FF6B35)" : "#E5E7EB",
                color: pickerSelected.length > 0 ? "#fff" : "#9CA3AF",
                cursor: pickerSelected.length > 0 ? "pointer" : "not-allowed",
                fontSize:"0.82rem",fontWeight:700,boxShadow: pickerSelected.length > 0 ? "0 3px 12px rgba(250,70,22,0.3)" : "none",
              }}><Compass size={14}/> Let's Go!</button>
            </div>
          </div>
        </div>
      )}

      <footer style={S.foot}><p style={{margin:0}}>&copy; 2026 MyTranslationBuddy &mdash; Built by Gators, for Gators {"\uD83D\uDC0A"}</p><p style={{margin:"0.35rem 0 0",fontSize:"0.68rem",color:"#D1D5DB"}}>{TOTAL_CITIES} cities · 3 countries · 1 semester to explore them all</p></footer>
    </div>
  );
};

/* STYLES */
const S = {
  page:{minHeight:"100vh",backgroundColor:"#F9FAFB",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif"},
  hdr:{backgroundColor:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid rgba(229,231,235,0.5)",position:"sticky",top:0,zIndex:1000,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},
  hdrIn:{maxWidth:1280,margin:"0 auto",padding:"0.2rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center"},
  hdrL:{display:"flex",alignItems:"center",gap:"0.6rem",cursor:"pointer"},
  brand:{fontSize:"1.05rem",fontWeight:800,color:"#0021A5",letterSpacing:"-0.01em"},
  nav:{display:"flex",gap:"0.15rem",alignItems:"center",flexWrap:"wrap",background:"#F3F4F6",borderRadius:"0.65rem",padding:"0.2rem"},
  nb:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 0.85rem",border:"none",borderRadius:"0.5rem",backgroundColor:"transparent",color:"#6B7280",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,transition:"all 0.2s"},
  nbActive:{backgroundColor:"#fff",color:"#0021A5",boxShadow:"0 1px 3px rgba(0,0,0,0.08)",fontWeight:700},
  nbA:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 1.1rem",border:"none",borderRadius:"0.5rem",background:"linear-gradient(135deg,#FA4616,#FF6B35)",color:"#fff",cursor:"pointer",fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.02em",boxShadow:"0 2px 8px rgba(250,70,22,0.25)",marginLeft:"0.35rem"},
  hero:{background:"linear-gradient(160deg,#0a0a1a 0%,#0021A5 40%,#003087 70%,#1a1a2e 100%)",padding:"5rem 2rem 4rem",textAlign:"center",overflow:"hidden",position:"relative"},
  heroIn:{maxWidth:720,margin:"0 auto",position:"relative",zIndex:1},
  heroT:{fontSize:"2.8rem",fontWeight:800,color:"#fff",margin:"0 0 1rem 0",lineHeight:1.15,letterSpacing:"-0.03em"},
  heroHL:{background:"linear-gradient(90deg,#FA4616,#FFB347)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  heroSub:{fontSize:"1.05rem",color:"rgba(255,255,255,0.7)",margin:"0 auto 2.5rem",lineHeight:1.65,maxWidth:540},
  heroActs:{display:"flex",gap:"0.6rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"2.5rem"},
  heroP:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.85rem 2rem",borderRadius:"0.75rem",border:"none",background:"linear-gradient(135deg,#FA4616,#FF6B35)",color:"#fff",cursor:"pointer",fontSize:"0.95rem",fontWeight:700,boxShadow:"0 4px 20px rgba(250,70,22,0.4)",transition:"all 0.25s ease"},
  heroO:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.85rem 1.5rem",borderRadius:"0.75rem",border:"1.5px solid rgba(255,255,255,0.25)",backgroundColor:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.9)",cursor:"pointer",fontSize:"0.95rem",fontWeight:600,backdropFilter:"blur(4px)",transition:"all 0.25s ease"},
  countryRow:{display:"flex",justifyContent:"center",gap:"1rem",flexWrap:"wrap"},
  countryPill:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.6rem 1.2rem",borderRadius:"1rem",backgroundColor:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",cursor:"pointer",transition:"all 0.2s",backdropFilter:"blur(4px)"},
  picksWrap:{maxWidth:1200,margin:"-2rem auto 0",padding:"0 2rem",position:"relative",zIndex:2},
  picksScroll:{display:"flex",gap:"0.75rem",overflowX:"auto",paddingBottom:"0.75rem"},
  pickCard:{display:"flex",alignItems:"center",gap:"0.75rem",padding:"1rem 1.25rem",backgroundColor:"#fff",borderRadius:"1rem",border:"1px solid #E5E7EB",boxShadow:"0 4px 20px rgba(0,0,0,0.06)",cursor:"pointer",minWidth:220,transition:"all 0.25s ease",flexShrink:0},
  mapSection:{position:"relative",margin:"2rem 0 0"},
  mapToolbar:{position:"absolute",top:".75rem",left:"1rem",right:"auto",display:"flex",alignItems:"center",gap:"0.4rem",zIndex:500,padding:"0.5rem 0.65rem",backgroundColor:"rgba(255,255,255,0.92)",backdropFilter:"blur(16px)",borderRadius:"0.85rem",border:"1px solid rgba(229,231,235,0.6)",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"},
  mapSearchWrap:{position:"relative",display:"flex",alignItems:"center",gap:"0.35rem",padding:"0.35rem 0.65rem",border:"1px solid #E5E7EB",borderRadius:"0.5rem",backgroundColor:"rgba(249,250,251,0.8)",minWidth:160},
  mapSearchInput:{border:"none",outline:"none",fontSize:"0.78rem",backgroundColor:"transparent",width:110,color:"#374151"},
  mapSearchDrop:{position:"absolute",top:"100%",left:0,right:0,marginTop:4,backgroundColor:"#fff",border:"1px solid #E5E7EB",borderRadius:"0.6rem",boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:100,overflow:"hidden"},
  mapSearchItem:{padding:"0.5rem 0.75rem",fontSize:"0.82rem",cursor:"pointer",borderBottom:"1px solid #F3F4F6",display:"flex",alignItems:"center",gap:"0.4rem",color:"#374151",fontWeight:500,transition:"background 0.15s ease"},
  flyBtns:{display:"flex",gap:"0.25rem"},
  flyBtn:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.25rem",padding:"0.35rem 0.55rem",border:"1px solid #E5E7EB",borderRadius:"0.5rem",backgroundColor:"#fff",cursor:"pointer",fontSize:"0.75rem",fontWeight:600,color:"#374151",transition:"all 0.2s ease",whiteSpace:"nowrap"},
  routeToggle:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.35rem 0.65rem",border:"1.5px solid #E5E7EB",borderRadius:"0.5rem",backgroundColor:"#fff",cursor:"pointer",fontSize:"0.75rem",fontWeight:600,color:"#374151",transition:"all 0.2s ease",whiteSpace:"nowrap"},
  mapLegend:{position:"absolute",bottom:".75rem",left:"1rem",display:"flex",gap:"0.6rem",zIndex:500,padding:"0.4rem 0.65rem",backgroundColor:"rgba(255,255,255,0.88)",backdropFilter:"blur(12px)",borderRadius:"0.6rem",border:"1px solid rgba(229,231,235,0.5)",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"},
  legI:{display:"flex",alignItems:"center",gap:"0.25rem",fontSize:"0.68rem",color:"#374151",fontWeight:500},
  legD:{width:9,height:9,borderRadius:"50%",display:"inline-block"},
  mapW:{width:"100%",height:"65vh",minHeight:500,zIndex:1},
  cityPanel:{position:"absolute",top:".75rem",right:"1rem",width:320,maxHeight:"calc(100% - 2rem)",overflowY:"auto",backgroundColor:"rgba(255,255,255,0.97)",backdropFilter:"blur(16px)",borderRadius:"1rem",border:"1px solid #E5E7EB",boxShadow:"0 16px 48px rgba(0,0,0,0.18)",padding:"1.25rem",zIndex:500,animation:"slideUp 0.3s ease-out"},
  cityPanelX:{position:"absolute",top:"0.6rem",right:"0.6rem",background:"#F3F4F6",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6B7280",transition:"all 0.15s"},
  cpRow:{display:"flex",alignItems:"center",gap:"0.35rem",marginBottom:"0.5rem"},
  cpVibe:{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.75rem",color:"#6B7280",marginBottom:"0.6rem",padding:"0.35rem 0.6rem",backgroundColor:"#F9FAFB",borderRadius:"0.5rem",border:"1px solid #F3F4F6"},
  cpStats:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem",marginBottom:"0.75rem"},
  cpStat:{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.72rem",color:"#374151",fontWeight:500,padding:"0.35rem 0.5rem",backgroundColor:"#F9FAFB",borderRadius:"0.4rem",border:"1px solid #F3F4F6"},
  cpMustDo:{display:"flex",alignItems:"flex-start",gap:"0.3rem",fontSize:"0.75rem",color:"#065F46",fontWeight:500,backgroundColor:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"0.5rem",padding:"0.5rem 0.65rem",lineHeight:1.4},
  cpRoute:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.35rem 0.55rem",backgroundColor:"#F9FAFB",borderRadius:"0.4rem",fontSize:"0.75rem",fontWeight:500,color:"#374151",cursor:"pointer",marginBottom:"0.3rem",border:"1px solid #F3F4F6",transition:"all 0.15s ease"},
  cpPrimary:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.35rem",padding:"0.6rem",border:"none",borderRadius:"0.6rem",background:"linear-gradient(135deg,#0021A5,#003087)",color:"#fff",cursor:"pointer",fontSize:"0.82rem",fontWeight:700,boxShadow:"0 3px 10px rgba(0,33,165,0.25)",transition:"all 0.2s ease"},
  cpSecondary:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.35rem",padding:"0.6rem 0.85rem",border:"1.5px solid #E5E7EB",borderRadius:"0.6rem",backgroundColor:"#fff",cursor:"pointer",fontSize:"0.82rem",fontWeight:600,color:"#374151",transition:"all 0.2s ease"},
  fp:{position:"fixed",bottom:"1.5rem",right:"1.5rem",width:370,maxHeight:"82vh",overflowY:"auto",backgroundColor:"#fff",borderRadius:"1.25rem",border:"1px solid #E5E7EB",boxShadow:"0 20px 60px rgba(0,0,0,0.15),0 0 0 1px rgba(0,0,0,0.02)",padding:"1.5rem",zIndex:999,animation:"slideUp 0.4s ease-out"},
  fpX:{position:"absolute",top:"0.75rem",right:"0.75rem",background:"#F3F4F6",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6B7280"},
  fpHdr:{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.85rem"},
  fpSpk:{width:40,height:40,borderRadius:"0.75rem",backgroundColor:"#FFF7ED",border:"1px solid #FED7AA",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  fpLbl:{fontSize:"0.62rem",fontWeight:700,color:"#92400E",letterSpacing:"0.1em",display:"block"},
  fpCat:{fontSize:"0.68rem",fontWeight:600,color:"#6B7280",textTransform:"capitalize"},
  fpDE:{fontSize:"1.35rem",fontWeight:800,color:"#0021A5",margin:"0 0 0.6rem 0",lineHeight:1.3},
  fpActs:{display:"flex",alignItems:"center",gap:"0.45rem",marginBottom:"0.6rem",flexWrap:"wrap"},
  fpAB:{display:"inline-flex",alignItems:"center",gap:"0.3rem",fontSize:"0.78rem",fontWeight:600,color:"#0021A5",padding:"0.4rem 0.85rem",borderRadius:"0.5rem",border:"1.5px solid #0021A5",backgroundColor:"#EFF6FF",cursor:"pointer",transition:"all 0.2s"},
  fpPB:{display:"inline-flex",alignItems:"center",fontSize:"0.75rem",color:"#6B7280",padding:"0.35rem 0.65rem",borderRadius:"0.5rem",border:"1px solid #E5E7EB",backgroundColor:"#F9FAFB",cursor:"pointer",fontStyle:"italic",transition:"all 0.15s"},
  fpEN:{display:"flex",alignItems:"center",gap:"0.35rem",fontSize:"0.95rem",color:"#374151",margin:"0 0 0.5rem 0",fontWeight:600},
  fpCtx:{display:"flex",alignItems:"flex-start",gap:"0.4rem",padding:"0.55rem 0.75rem",backgroundColor:"#FFF7ED",border:"1px solid #FED7AA",borderRadius:"0.5rem",marginBottom:"0.6rem",fontSize:"0.78rem",color:"#78350F",lineHeight:1.45,fontWeight:500},
  fpReg:{backgroundColor:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:"0.5rem",padding:"0.6rem 0.75rem",marginBottom:"0.6rem"},
  fpRH:{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.72rem",fontWeight:600,color:"#374151",marginBottom:"0.4rem"},
  fpPills:{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.3rem"},
  fpPill:{fontSize:"0.68rem",fontWeight:600,color:"#374151",backgroundColor:"#fff",border:"1px solid #D1D5DB",padding:"0.2rem 0.5rem",borderRadius:9999,cursor:"pointer",transition:"all 0.15s"},
  fpTags:{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.5rem"},
  fpTg:{display:"inline-flex",alignItems:"center",gap:"0.15rem",fontSize:"0.62rem",fontWeight:600,backgroundColor:"#FEF3C7",color:"#92400E",padding:"0.18rem 0.45rem",borderRadius:9999,textTransform:"capitalize"},
  fpEx:{fontSize:"0.75rem",color:"#4B5563",fontStyle:"italic",margin:"0 0 0.5rem 0",lineHeight:1.45,paddingLeft:"0.5rem",borderLeft:"3px solid #DBEAFE"},
  fpBr:{display:"inline-flex",alignItems:"center",gap:"0.3rem",fontSize:"0.75rem",fontWeight:600,color:"#0021A5",border:"1px solid #BFDBFE",backgroundColor:"#EFF6FF",cursor:"pointer",padding:"0.4rem 0.85rem",borderRadius:"0.5rem",transition:"all 0.15s",width:"100%",justifyContent:"center"},
  fpTog:{position:"fixed",bottom:"1.5rem",right:"1.5rem",zIndex:999,display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.7rem 1.25rem",borderRadius:9999,border:"1px solid #FED7AA",backgroundColor:"#FFF7ED",cursor:"pointer",fontSize:"0.82rem",fontWeight:600,color:"#92400E",boxShadow:"0 4px 20px rgba(0,0,0,0.12)",animation:"slideUp 0.3s ease-out"},
  sec:{maxWidth:1200,margin:"0 auto",padding:"3rem 2rem"},
  cBlock:{marginBottom:"2rem"},
  cHead:{display:"flex",justifyContent:"space-between",alignItems:"baseline",paddingBottom:"0.6rem",borderBottom:"2px solid #DBEAFE",marginBottom:"1rem"},
  cTi:{fontSize:"1.12rem",fontWeight:600,color:"#0021A5",margin:0},
  cCount:{fontSize:"0.82rem",fontWeight:400,color:"#6B7280"},
  cGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:"1rem"},
  cCard:{backgroundColor:"#fff",padding:"1.1rem",borderRadius:"0.75rem",border:"1px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},
  cCardH:{borderColor:"#0021A5",boxShadow:"0 4px 16px rgba(0,33,165,0.12)",transform:"translateY(-2px)"},
  cCardTop:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.25rem"},
  cName:{fontSize:"1rem",fontWeight:600,color:"#111827",margin:0},
  dBadge:{display:"inline-block",fontSize:"0.66rem",fontWeight:600,backgroundColor:"#EEF2FF",color:"#4338CA",padding:"0.15rem 0.5rem",borderRadius:9999,marginBottom:"0.35rem"},
  cUni:{fontSize:"0.72rem",fontWeight:600,color:"#0021A5",margin:"0 0 0.3rem 0"},
  cTag:{fontSize:"0.8rem",color:"#6B7280",margin:"0 0 0.6rem 0",lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"},
  mBadge:{fontSize:"0.66rem",fontWeight:600,padding:"0.18rem 0.5rem",borderRadius:"0.35rem"},
  foot:{textAlign:"center",padding:"2.5rem 2rem",color:"#9CA3AF",fontSize:"0.78rem",borderTop:"1px solid #E5E7EB",background:"#FAFBFC",letterSpacing:"0.01em"},
};

if(typeof document!=="undefined"){const el=document.getElementById("mtb-anim")||document.createElement("style");el.id="mtb-anim";el.textContent="@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes mtbPulse{0%{transform:translateX(-50%) scale(1);opacity:0.25}50%{transform:translateX(-50%) scale(2.2);opacity:0}100%{transform:translateX(-50%) scale(1);opacity:0.25}}@keyframes dashFlow{to{stroke-dashoffset:-16}}.mtb-pulse{animation:mtbPulse 2.5s ease-out infinite}.mtb-route{animation:dashFlow 1s linear infinite}.city-tooltip .leaflet-tooltip-content{font-family:Inter,system-ui,sans-serif}.leaflet-tooltip{border:1px solid #E5E7EB!important;border-radius:0.85rem!important;padding:0!important;box-shadow:0 12px 36px rgba(0,0,0,0.18)!important;max-width:340px!important;width:max-content!important;min-width:200px!important;overflow:visible!important;white-space:normal!important;word-wrap:break-word!important;overflow-wrap:break-word!important;line-height:1.4!important}.leaflet-tooltip *{max-width:100%!important;overflow-wrap:break-word!important;word-break:break-word!important}";if(!el.parentNode)document.head.appendChild(el);}

export default LandingPage;
