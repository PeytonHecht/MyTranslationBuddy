var simplemaps_europemap_mapdata={
  main_settings: {
    width: "responsive",
    background_color: "#D4E6F1",
    background_transparent: "no",
    border_color: "#ffffff",
    popups: "on_click",
    state_description: "",
    state_color: "#C8D6E5",
    state_hover_color: "#ABB8C7",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "yes",
    location_description: "Click to explore tips, programs & phrases",
    location_color: "#2563EB",
    location_opacity: 0.9,
    location_hover_opacity: 1,
    location_url: "",
    location_size: 30,
    location_type: "marker",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 3,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    auto_load: "yes",
    url_new_tab: "no",
    initial_back: "no",
    initial_zoom: -1,
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom: "yes",
    back_image: "no",
    initial_hover_opacity: 0.5,
    hide_labels: "no",
    hide_eastern_labels: "no",
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    popup_color: "white",
    popup_opacity: 0.95,
    popup_shadow: 3,
    popup_corners: 8,
    popup_font: "13px/1.5 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    popup_nocss: "no",
    div: "map",
    adjacent_opacity: 0.5,
    label_color: "#374151",
    label_hover_color: "#1E3A8A",
    label_size: 18,
    label_font: "Inter, Arial",
    manual_zoom: "no",
    reference_size: 780,
    js_hooks: "yes"
  },
  state_specific: {
    AL: { name: "Albania", color: "#DFE6E9", inactive: "yes" },
    AT: { name: "Austria", color: "#E8D5F5", hover_color: "#D4B8E8", description: "Austria — Home to Vienna and Salzburg. Imperial history, classical music, Alpine scenery.<br><strong>Currency:</strong> Euro (EUR)<br><strong>UF Programs:</strong> European Studies, WU Vienna, BOKU Vienna" },
    BA: { name: "Bosnia and Herzegovina", color: "#DFE6E9", inactive: "yes" },
    BE: { name: "Belgium", color: "#DFE6E9" },
    BG: { name: "Bulgaria", color: "#DFE6E9", inactive: "yes" },
    BY: { name: "Belarus", color: "#DFE6E9", inactive: "yes" },
    CH: { name: "Switzerland", color: "#D1FAE5", hover_color: "#A7F3D0", description: "Switzerland — Home to Zurich, Bern, Rapperswil & Winterthur. Alps, engineering, finance.<br><strong>Currency:</strong> Swiss Franc (CHF)<br><strong>UF Programs:</strong> ZHAW, OST, University of Bern" },
    CY: { name: "Cyprus", color: "#DFE6E9", inactive: "yes" },
    CZ: { name: "Czech Republic", color: "#DFE6E9" },
    DE: { name: "Germany", color: "#BFDBFE", hover_color: "#93C5FD", description: "Germany — 16 cities from Berlin to Munich. Engineering, culture, history.<br><strong>Currency:</strong> Euro (EUR)<br><strong>UF Programs:</strong> 12+ study abroad programs" },
    DK: { name: "Denmark", color: "#DFE6E9" },
    EE: { name: "Estonia", color: "#DFE6E9", inactive: "yes" },
    ES: { name: "Spain", color: "#DFE6E9" },
    FI: { name: "Finland", color: "#DFE6E9" },
    FR: { name: "France", color: "#DFE6E9" },
    GB: { name: "United Kingdom", color: "#DFE6E9" },
    GR: { name: "Greece", color: "#DFE6E9", inactive: "yes" },
    HR: { name: "Croatia", color: "#DFE6E9", inactive: "yes" },
    HU: { name: "Hungary", color: "#DFE6E9" },
    IE: { name: "Ireland", color: "#DFE6E9" },
    IS: { name: "Iceland", color: "#DFE6E9", inactive: "yes" },
    IT: { name: "Italy", color: "#DFE6E9" },
    LT: { name: "Lithuania", color: "#DFE6E9", inactive: "yes" },
    LU: { name: "Luxembourg", color: "#DFE6E9" },
    LV: { name: "Latvia", color: "#DFE6E9", inactive: "yes" },
    MD: { name: "Moldova", color: "#DFE6E9", inactive: "yes" },
    ME: { name: "Montenegro", color: "#DFE6E9", inactive: "yes" },
    MK: { name: "Macedonia", color: "#DFE6E9", inactive: "yes" },
    MT: { name: "Malta", color: "#DFE6E9", inactive: "yes" },
    NL: { name: "Netherlands", color: "#DFE6E9" },
    NO: { name: "Norway", color: "#DFE6E9" },
    PL: { name: "Poland", color: "#DFE6E9" },
    PT: { name: "Portugal", color: "#DFE6E9" },
    RO: { name: "Romania", color: "#DFE6E9", inactive: "yes" },
    RS: { name: "Serbia", color: "#DFE6E9", inactive: "yes" },
    SE: { name: "Sweden", color: "#DFE6E9" },
    SI: { name: "Slovenia", color: "#DFE6E9", inactive: "yes" },
    SK: { name: "Slovakia", color: "#DFE6E9" },
    TR: { name: "Turkey", color: "#DFE6E9", inactive: "yes" },
    UA: { name: "Ukraine", color: "#DFE6E9", inactive: "yes" },
    XK: { name: "Kosovo", color: "#DFE6E9", inactive: "yes" }
  },
  locations: {
    "0": {
      lat: 52.516, lng: 13.377, name: "Berlin",
      description: "Capital city \u2013 history, art & nightlife<br><em>Click to explore</em>",
      color: "#2563EB", size: 35, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "berlin" } })); }
    },
    "1": {
      lat: 48.136, lng: 11.578, name: "Munich",
      description: "Bavarian capital \u2013 tradition & innovation<br><em>Click to explore</em>",
      color: "#2563EB", size: 35, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "munich" } })); }
    },
    "2": {
      lat: 48.203, lng: 16.368, name: "Vienna",
      description: "Imperial capital \u2013 music, culture & coffee<br><em>Click to explore</em>",
      color: "#7C3AED", size: 35, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "vienna" } })); }
    },
    "3": {
      lat: 48.768, lng: 9.172, name: "Stuttgart",
      description: "Automotive hub \u2013 engineering & green spaces<br><em>Click to explore</em>",
      color: "#2563EB", size: 28, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "stuttgart" } })); }
    },
    "4": {
      lat: 53.556, lng: 9.987, name: "Hamburg",
      description: "Port city \u2013 HAW (Hamburg University of Applied Sciences), maritime culture & media<br><em>Click to explore</em>",
      color: "#2563EB", size: 35, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "hamburg" } })); }
    },
    "5": {
      lat: 50.776, lng: 6.084, name: "Aachen",
      description: "Engineering hub near Belgium & Netherlands<br><em>Click to explore</em>",
      color: "#2563EB", size: 25, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "aachen" } })); }
    },
    "6": {
      lat: 50.7344, lng: 7.0994, name: "Bonn",
      description: "Former capital \u2013 Beethoven\u2019s birthplace<br><em>Click to explore</em>",
      color: "#2563EB", size: 25, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "bonn" } })); }
    },
    "7": {
      lat: 51.935, lng: 8.870, name: "Detmold",
      description: "Nature & architecture in Lippe<br><em>Click to explore</em>",
      color: "#2563EB", size: 22, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "detmold" } })); }
    },
    "8": {
      lat: 50.083, lng: 8.240, name: "Wiesbaden (EBS)",
      description: "EBS Universit\u00E4t \u2013 European Business School, Business & Law<br><em>Click to explore</em>",
      color: "#2563EB", size: 24, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "ebs" } })); }
    },
    "9": {
      lat: 50.029, lng: 8.068, name: "Eltville",
      description: "Wine town on the Rhine \u2013 Pharmacy<br><em>Click to explore</em>",
      color: "#2563EB", size: 22, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "eltville" } })); }
    },
    "10": {
      lat: 50.927, lng: 11.586, name: "Jena",
      description: "Optics & science in Thuringia<br><em>Click to explore</em>",
      color: "#2563EB", size: 25, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "jena" } })); }
    },
    "11": {
      lat: 52.027, lng: 8.899, name: "Lemgo",
      description: "Technische Hochschule Ostwestfalen-Lippe (TH OWL) \u2013 Interior Design & Construction<br><em>Click to explore</em>",
      color: "#2563EB", size: 22, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "lemgo" } })); }
    },
    "12": {
      lat: 51.338, lng: 12.379, name: "Leipzig",
      description: "Music, culture & vibrant nightlife<br><em>Click to explore</em>",
      color: "#2563EB", size: 25, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "leipzig" } })); }
    },
    "13": {
      lat: 49.488, lng: 8.466, name: "Mannheim",
      description: "Baroque palace \u2013 top business school<br><em>Click to explore</em>",
      color: "#2563EB", size: 25, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "mannheim" } })); }
    },
    "14": {
      lat: 52.280, lng: 8.043, name: "Osnabr\u00FCck",
      description: "City of Peace \u2013 Hochschule Osnabr\u00FCck, engineering & sustainability<br><em>Click to explore</em>",
      color: "#2563EB", size: 25, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "osnabruck" } })); }
    },
    "15": {
      lat: 47.811, lng: 13.055, name: "Salzburg",
      description: "Mozart\u2019s city \u2013 music & business<br><em>Click to explore</em>",
      color: "#7C3AED", size: 30, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "salzburg" } })); }
    },
    "16": {
      lat: 50.364, lng: 7.594, name: "Vallendar",
      description: "WHU \u2013 Otto Beisheim School of Management<br><em>Click to explore</em>",
      color: "#2563EB", size: 22, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "vallendar" } })); }
    },
    "17": {
      lat: 49.794, lng: 9.929, name: "W\u00FCrzburg",
      description: "Baroque gem on the Main River<br><em>Click to explore</em>",
      color: "#2563EB", size: 25, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "wurzburg" } })); }
    },
    "18": {
      lat: 47.377, lng: 8.541, name: "Zurich",
      description: "Finance & culture at the foot of the Alps<br><em>Click to explore</em>",
      color: "#10B981", size: 30, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "zurich" } })); }
    },
    "19": {
      lat: 46.948, lng: 7.447, name: "Bern",
      description: "Swiss capital \u2013 UNESCO old town<br><em>Click to explore</em>",
      color: "#10B981", size: 28, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "bern" } })); }
    },
    "20": {
      lat: 47.227, lng: 8.818, name: "Rapperswil",
      description: "Lakeside town on Lake Zurich<br><em>Click to explore</em>",
      color: "#10B981", size: 22, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "rapperswil" } })); }
    },
    "21": {
      lat: 47.500, lng: 8.724, name: "Winterthur",
      description: "ZHAW (Zurich University of Applied Sciences) \u2013 engineering & Swiss culture<br><em>Click to explore</em>",
      color: "#10B981", size: 25, type: "marker",
      onclick: function(){ window.dispatchEvent(new CustomEvent("citySelected", { detail: { slug: "winterthur" } })); }
    }
  },
  regions: {
    "0": {
      states: ["DE", "AT", "CH"],
      name: "Study Abroad Region",
      zoomable: "yes"
    }
  },
  labels: {},
  legend: {
    entries: [
      { name: "Germany", icon_path: "", color: "#2563EB", type: "square" },
      { name: "Austria", icon_path: "", color: "#7C3AED", type: "square" },
      { name: "Switzerland", icon_path: "", color: "#10B981", type: "square" }
    ]
  }
};
