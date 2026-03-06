var simplemaps_europemap_mapdata={
  main_settings: {
   //General settings
    width: "responsive", //'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    popups: "detect",
    
    //State defaults
    state_description: "State description",
    state_color: "#88A4BC",
    state_hover_color: "#3B729F",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "yes",
    
    //Location defaults
    location_description: "Location description",
    location_color: "#FF0000",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_url: "",
    location_size: 25,
    location_type: "circle",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
    //Label defaults
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
    
    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    state_image_url: "",
    state_image_position: "",
    location_image_url: ""
  },
  state_specific: {
    AL: {
      name: "Albania",
      hide: "yes",
      inactive: "yes"
    },
    AM: {
      name: "Armenia",
      hide: "yes",
      inactive: "yes"
    },
    AT: {
      name: "Austria",
      hide: "no",
      inactive: "no"
    },
    BA: {
      name: "Bosnia and Herzegovina",
      hide: "yes",
      inactive: "yes"
    },
    BE: {
      name: "Belgium",
      hide: "yes",
      inactive: "yes"
    },
    BG: {
      name: "Bulgaria",
      hide: "yes",
      inactive: "yes"
    },
    BY: {
      name: "Belarus",
      hide: "yes",
      inactive: "yes"
    },
    CH: {
      name: "Switzerland",
      hide: "yes",
      inactive: "yes"
    },
    CY: {
      name: "Cyprus",
      hide: "yes",
      inactive: "yes"
    },
    CZ: {
      name: "Czech Republic",
      hide: "yes",
      inactive: "yes"
    },
    DE: {
      name: "Germany",
      hide: "no",
      inactive: "no"
    },
    DK: {
      name: "Denmark",
      hide: "yes",
      inactive: "yes"
    },
    EE: {
      name: "Estonia",
      hide: "yes",
      inactive: "yes"
    },
    ES: {
      name: "Spain",
      hide: "yes",
      inactive: "yes"
    },
    FI: {
      name: "Finland",
      hide: "yes",
      inactive: "yes"
    },
    FR: {
      name: "France",
      hide: "yes",
      inactive: "yes"
    },
    GB: {
      name: "United Kingdom",
      hide: "yes",
      inactive: "yes"
    },
    GE: {
      name: "Georgia",
      hide: "yes",
      inactive: "yes"
    },
    GR: {
      name: "Greece",
      hide: "yes",
      inactive: "yes"
    },
    HR: {
      name: "Croatia",
      hide: "yes",
      inactive: "yes"
    },
    HU: {
      name: "Hungary",
      hide: "yes",
      inactive: "yes"
    },
    IE: {
      name: "Ireland",
      hide: "yes",
      inactive: "yes"
    },
    IS: {
      name: "Iceland",
      hide: "yes",
      inactive: "yes"
    },
    IT: {
      name: "Italy",
      hide: "yes",
      inactive: "yes"
    },
    LT: {
      name: "Lithuania",
      hide: "yes",
      inactive: "yes"
    },
    LU: {
      name: "Luxembourg",
      hide: "yes",
      inactive: "yes"
    },
    LV: {
      name: "Latvia",
      hide: "yes",
      inactive: "yes"
    },
    MD: {
      name: "Moldova",
      hide: "yes",
      inactive: "yes"
    },
    ME: {
      name: "Montenegro",
      hide: "yes",
      inactive: "yes"
    },
    MK: {
      name: "Macedonia",
      hide: "yes",
      inactive: "yes"
    },
    NL: {
      name: "Netherlands",
      hide: "yes",
      inactive: "yes"
    },
    NO: {
      name: "Norway",
      hide: "yes",
      inactive: "yes"
    },
    PL: {
      name: "Poland",
      hide: "yes",
      inactive: "yes"
    },
    PT: {
      name: "Portugal",
      hide: "yes",
      inactive: "yes"
    },
    RO: {
      name: "Romania",
      hide: "yes",
      inactive: "yes"
    },
    RS: {
      name: "Serbia",
      hide: "yes",
      inactive: "yes"
    },
    SE: {
      name: "Sweden",
      hide: "yes",
      inactive: "yes"
    },
    SI: {
      name: "Slovenia",
      hide: "yes",
      inactive: "yes"
    },
    SK: {
      name: "Slovakia",
      hide: "yes",
      inactive: "yes"
    },
    TR: {
      name: "Turkey",
      hide: "yes",
      inactive: "yes"
    },
    UA: {
      name: "Ukraine",
      hide: "yes",
      inactive: "yes"
    },
    XK: {
      name: "Kosovo",
      hide: "yes",
      inactive: "yes"
    }
  },
  locations: {
    "0": {
      lat: 52.516,
      lng: 13.377,
      name: "Berlin",
       onclick: function() {
      window.dispatchEvent(
        new CustomEvent("citySelected", {
          detail: { locationId: 0 }
          })
        );
      }
    },
    "1": {
      lat: 48.136,
      lng: 11.578,
      name: "Munich",
      onclick: function() {
      window.dispatchEvent(
        new CustomEvent("citySelected", {
          detail: { locationId: 1 }
          })
        );
      }
    },
    "2": {
      lat: 48.203,
      lng: 16.368,
      name: "Vienna",
      onclick: function() {
      window.dispatchEvent(
        new CustomEvent("citySelected", {
          detail: { locationId: 2 }
            })
          );
        }
      },
    "3": {
      lat: 48.768,
      lng: 9.172,
      name: "Stuttgart",
       onclick: function() {
      window.dispatchEvent(
        new CustomEvent("citySelected", {
          detail: { locationId: 3 }
            })
          );
        }
      },
    "4": {
      lat: 53.556,
      lng: 9.987,
      name: "Hamburg",
      onclick: function() {
        window.dispatchEvent(
          new CustomEvent("citySelected", {
            detail: { locationId: 4 }
          })
        );
      }
    }
  },
  regions: {
    "0": {
      states: [
        "DE",
        "AT"
      ],
      name: "Study Abroad",
      zoomable: "yes"
    }
  },
  labels: {},
  legend: {
    entries: []
  }
};
// Wait for simplemaps to be ready before attaching the callback
function attachMapCallback() {
  if (typeof simplemaps_europemap_mapinfo !== 'undefined') {
    simplemaps_europemap_mapinfo.click_location = function(id) {
      window.dispatchEvent(new CustomEvent('citySelected', { detail: { locationId: id } }));
    };
  } else {
    setTimeout(attachMapCallback, 100);
  }
}
attachMapCallback();