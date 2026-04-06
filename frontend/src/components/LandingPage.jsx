import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/MTBLogo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Map Data Configuration
    window.simplemaps_europemap_mapdata = {
      main_settings: {
        width: "responsive",
        background_color: "#FFFFFF",
        background_transparent: "yes",
        border_color: "#ffffff",
        popups: "detect",
        state_description: "State description",
        state_color: "#88A4BC",
        state_hover_color: "#3B729F",
        state_url: "",
        border_size: 1.5,
        all_states_inactive: "no",
        all_states_zoomable: "yes",
        location_description: "Location description",
        location_color: "#FF0000",
        location_opacity: 0.8,
        location_hover_opacity: 1,
        location_url: "",
        location_size: 25,
        location_type: "circle",
        location_border_color: "#FFFFFF",
        location_border: 2,
        location_hover_border: 2.5,
        all_locations_inactive: "no",
        all_locations_hidden: "no",
        label_color: "#d5ddec",
        label_hover_color: "#d5ddec",
        label_size: 22,
        label_font: "Arial",
        hide_labels: "no",
        manual_zoom: "no",
        back_image: "no",
        arrow_color: "#cecece",
        arrow_color_border: "#808080",
        initial_back: "no",
        initial_zoom: 0,
        initial_zoom_solo: "yes",
        region_opacity: 1,
        region_hover_opacity: 0.6,
        zoom_out_incrementally: "yes",
        zoom_percentage: 0.99,
        zoom_time: 0.5,
        popup_color: "white",
        popup_opacity: 0.9,
        popup_shadow: 1,
        popup_corners: 5,
        popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
        popup_nocss: "no",
        div: "map", // ID of the div below
        auto_load: "yes",
        url_new_tab: "no",
        images_directory: "default",
        fade_time: 0.1,
        link_text: "View Website",
      },
      state_specific: {
        AT: { name: "Austria", hide: "no", inactive: "no" },
        DE: { name: "Germany", hide: "no", inactive: "no" }
      },
      locations: {
        "0": { lat: 52.516, lng: 13.377, name: "Berlin", onclick: function() { window.dispatchEvent(new CustomEvent("mapClick")); } },
        "1": { lat: 48.136, lng: 11.578, name: "Munich", onclick: function() { window.dispatchEvent(new CustomEvent("mapClick")); } },
        "2": { lat: 48.203, lng: 16.368, name: "Vienna", onclick: function() { window.dispatchEvent(new CustomEvent("mapClick")); } },
        "3": { lat: 48.768, lng: 9.172, name: "Stuttgart", onclick: function() { window.dispatchEvent(new CustomEvent("mapClick")); } },
        "4": { lat: 53.556, lng: 9.987, name: "Hamburg", onclick: function() { window.dispatchEvent(new CustomEvent("mapClick")); } }
      }
    };

    // 2. Load the script using the correct path from your screenshot
    const script = document.createElement("script");
    script.src = "/maps/europemap.js"; // <-- UPDATED PATH based on your screenshot
    script.async = true;
    document.body.appendChild(script);

    // 3. Setup the redirect event
    const handleRedirect = () => navigate('/login');
    window.addEventListener("mapClick", handleRedirect);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener("mapClick", handleRedirect);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <img src={logo} alt="MTB Logo" style={styles.logo} />
      <h1 style={styles.title}>Study Abroad Map</h1>
      <p style={styles.subtitle}>Click a city to log in and see your guides</p>

      <div style={styles.mapContainer}>
        <div id="map" style={{ minHeight: "500px", width: "100%" }}></div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: "2rem"
  },
  logo: { height: "60px", marginBottom: "1rem" },
  title: { fontSize: "2.5rem", fontWeight: "800", color: "#1e3a8a", margin: 0 },
  subtitle: { color: "#6c757d", marginBottom: "2rem" },
  mapContainer: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    minHeight: "520px"
  }
};

export default LandingPage;