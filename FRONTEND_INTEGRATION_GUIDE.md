# Frontend Integration Guide: Smart Tips Display

**For:** Frontend developers integrating tips display  
**Last Updated:** April 6, 2026

---

## Overview

The backend now provides **smart tips endpoints** that automatically organize tips by program. No more client-side filtering needed.

---

## Quick Start: Use `/api/cities/{slug}/full`

This is the simplest endpoint to use for a city details page:

```javascript
// When user clicks on a city (e.g., Vienna)
const citySlug = "vienna";
const response = await fetch(`/api/cities/${citySlug}/full`);
const cityData = response.json();

// The response contains everything you need:
// cityData.city = full city info (name, description, coordinates, etc.)
// cityData.general_tips = tips for all Vienna students
// cityData.program_tips = tips grouped by program (BOKO, WU Vienna, etc.)
// cityData.total_tips = total tip count
```

---

## Response Structure

### `GET /api/cities/vienna/full` Response:

```json
{
  "city": {
    "slug": "vienna",
    "name": "Vienna",
    "description": "Vienna is the capital and largest city of Austria...",
    "coordinates": { "latitude": 48.2082, "longitude": 16.3738 },
    "industries": ["finance", "tourism", "education"],
    ... (20+ more fields)
  },
  
  "general_tips": {
    "count": 12,
    "description": "Tips applicable to all students studying in this city",
    "data": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "city_slug": "vienna",
        "title": "Public Transportation in Vienna",
        "content": "Vienna has an excellent public transport system...",
        "category": "transportation",
        "program": null,
        "priority": 15,
        "short_description": "U-Bahn, trams, and buses overview",
        "tags": ["transport", "u-bahn", "tickets"],
        "source_name": "UF Vienna Guide"
      },
      { ... more general tips ... }
    ]
  },
  
  "program_tips": {
    "count": 2,
    "description": "Tips specific to different programs and universities",
    "data": [
      {
        "program": "UF Exchange - University of Natural Resources (BOKU)",
        "count": 8,
        "tips": [
          {
            "_id": "507f1f77bcf86cd799439012",
            "city_slug": "vienna",
            "title": "BOKU Course Registration",
            "content": "BOKU uses a specific online system for course registration...",
            "category": "academics",
            "program": "UF Exchange - University of Natural Resources (BOKU)",
            "priority": 14,
            "short_description": "Online registration system details",
            "tags": ["academics", "registration", "BOKU"],
            "source_name": "UF BOKU Program Page"
          },
          { ... more BOKU tips ... }
        ]
      },
      {
        "program": "UF Exchange - WU Vienna",
        "count": 7,
        "tips": [
          {
            "_id": "507f1f77bcf86cd799439013",
            "city_slug": "vienna",
            "title": "WU Vienna Business Program",
            "content": "WU Vienna is known for its business and economics programs...",
            "category": "academics",
            "program": "UF Exchange - WU Vienna",
            "priority": 12,
            "short_description": "Program overview and specializations",
            "tags": ["academics", "business", "WU"],
            "source_name": "WU Program Advisor"
          },
          { ... more WU tips ... }
        ]
      }
    ]
  },
  
  "total_tips": 27
}
```

---

## Display Patterns

### Pattern 1: Simple Display (All Tips)

```javascript
function displayCityPage(cityData) {
  // Display city header
  showCityHeader(cityData.city);
  
  // Display general tips in one section
  const section1 = createSection("General Information");
  cityData.general_tips.data.forEach(tip => {
    section1.add(createTipCard(tip));
  });
  display(section1);
  
  // Display program tips in a separate section
  const section2 = createSection("Program-Specific Information");
  cityData.program_tips.data.forEach(programGroup => {
    const subheader = createSubheader(programGroup.program);
    section2.add(subheader);
    programGroup.tips.forEach(tip => {
      section2.add(createTipCard(tip));
    });
  });
  display(section2);
}
```

### Pattern 2: Program Selector

```javascript
function displayCityWithProgramSelector(cityData) {
  // Show city header
  showCityHeader(cityData.city);
  
  // Create program dropdown
  const programs = [
    "All Students (General Tips)",
    ...cityData.program_tips.data.map(p => p.program)
  ];
  
  const programSelector = createDropdown(programs, (selected) => {
    updateTipsDisplay(cityData, selected);
  });
  
  display(programSelector);
  
  // Initially show all tips
  updateTipsDisplay(cityData, "All Students (General Tips)");
}

function updateTipsDisplay(cityData, selectedProgram) {
  const container = document.getElementById("tips-container");
  container.innerHTML = "";
  
  if (selectedProgram === "All Students (General Tips)") {
    // Show general tips + all program tips
    displayGeneralTips(cityData.general_tips.data, container);
    displayAllProgramTips(cityData.program_tips.data, container);
  } else {
    // Show general tips + selected program tips
    displayGeneralTips(cityData.general_tips.data, container);
    const selected = cityData.program_tips.data.find(
      p => p.program === selectedProgram
    );
    if (selected) {
      displayProgramTips(selected, container);
    }
  }
}
```

### Pattern 3: Tabs for Different Programs

```javascript
function displayCityWithTabs(cityData) {
  showCityHeader(cityData.city);
  
  // Create tabs
  const tabs = {
    "General": () => displayGeneralTips(cityData.general_tips.data),
    ...Object.fromEntries(
      cityData.program_tips.data.map(p => [
        p.program,
        () => displayProgramTips(p)
      ])
    )
  };
  
  createTabs(tabs, (tab) => {
    updateDisplay(tabs[tab]);
  });
}

function displayProgramTips(programGroup) {
  const container = document.getElementById("content");
  container.innerHTML = "";
  
  // Show general tips + program-specific tips
  displayGeneralTips(cityData.general_tips.data, container);
  
  const header = document.createElement("h3");
  header.textContent = programGroup.program;
  container.appendChild(header);
  
  programGroup.tips.forEach(tip => {
    container.appendChild(createTipCard(tip));
  });
}
```

---

## Handling Different City Scenarios

### Scenario 1: City with Multiple Programs (Vienna)

```
Vienna
├─ General Tips (12)
│  ├─ Public Transportation
│  ├─ Housing Options
│  ├─ Austrian Culture
│  └─ ... (9 more)
└─ Program Tips
   ├─ BOKU (8 tips)
   │  ├─ Course Registration
   │  ├─ Campus Overview
   │  └─ ... (6 more)
   └─ WU Vienna (7 tips)
      ├─ Business Program Overview
      ├─ Networking Opportunities
      └─ ... (5 more)
```

### Scenario 2: City with Single Program (Würzburg/TASSEP)

```
Würzburg
├─ General Tips (10)
│  ├─ City Overview
│  ├─ Student Housing
│  └─ ... (8 more)
└─ Program Tips
   └─ TASSEP - Universität Würzburg (5 tips)
      ├─ Science Program Details
      ├─ Lab Access
      └─ ... (3 more)
```

### Scenario 3: City with No Programs (Berlin, Munich, Hamburg)

```
Berlin
├─ General Tips (15)
│  ├─ City History
│  ├─ Public Transport
│  ├─ Student Life
│  └─ ... (12 more)
└─ Program Tips
   └─ (empty - no UF-specific programs)
```

**Handle with:**
```javascript
if (cityData.program_tips.count === 0) {
  // Just show general tips, hide program section
  displayGeneralTipsOnly(cityData.general_tips.data);
} else {
  // Show both sections
  displayBothSections(cityData);
}
```

---

## Optional: Category Filtering

If you want to filter by category, use the alternative endpoint:

```javascript
// Get only academic tips
const response = await fetch(
  `/api/cities/vienna/tips-organized?category=academics`
);
const data = response.json();

// Same response structure, but only academic tips
data.general_tips.data; // Academic tips for all students
data.program_tips.data; // Academic tips grouped by program
```

Available categories:
- `academics`
- `housing`
- `city life`
- `eligibility`
- `finances`
- `excursions`
- `planning`
- `food_drink`
- `transportation`
- `sports`

---

## Creating Tip Cards

```javascript
function createTipCard(tip) {
  const card = document.createElement("div");
  card.className = "tip-card";
  card.innerHTML = `
    <div class="tip-header">
      <h4>${escapeHtml(tip.title)}</h4>
      <span class="category-badge">${tip.category}</span>
      ${tip.register ? `<span class="register-badge">${tip.register}</span>` : ""}
    </div>
    
    <p class="short-description">${escapeHtml(tip.short_description)}</p>
    
    <div class="tip-content">
      ${escapeHtml(tip.content)}
    </div>
    
    <div class="tip-footer">
      ${tip.tags ? `<div class="tags">${tip.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>` : ""}
      ${tip.source_name ? `<small class="source">Source: ${escapeHtml(tip.source_name)}</small>` : ""}
    </div>
  `;
  return card;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
```

---

## CSS Styling

```css
.tip-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background: #f9f9f9;
}

.tip-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.tip-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
}

.tip-header h4 {
  margin: 0;
  font-size: 1.1em;
  flex: 1;
}

.category-badge {
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  margin-left: 8px;
}

.register-badge {
  background: #6c757d;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  margin-left: 4px;
}

.short-description {
  color: #666;
  font-size: 0.95em;
  margin: 8px 0;
  font-style: italic;
}

.tip-content {
  line-height: 1.6;
  margin: 12px 0;
  color: #333;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.tag {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85em;
}

.source {
  display: block;
  color: #999;
  margin-top: 8px;
  font-style: italic;
}

.program-section {
  background: #f0f4f8;
  padding: 16px;
  margin-top: 20px;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.program-section h3 {
  margin-top: 0;
  color: #007bff;
}
```

---

## Error Handling

```javascript
async function fetchCityData(citySlug) {
  try {
    const response = await fetch(`/api/cities/${citySlug}/full`);
    
    if (response.status === 404) {
      showError("City not found");
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching city data:", error);
    showError("Failed to load city information");
    return null;
  }
}
```

---

## Loading State

```javascript
async function loadAndDisplayCity(citySlug) {
  showLoadingSpinner();
  
  try {
    const cityData = await fetchCityData(citySlug);
    if (cityData) {
      hideLoadingSpinner();
      displayCityPage(cityData);
    }
  } catch (error) {
    hideLoadingSpinner();
    showError("Failed to load city data");
  }
}
```

---

## Performance Tips

1. **Cache the response** for frequently visited cities
2. **Lazy load** tip cards as user scrolls
3. **Use virtual scrolling** if many tips (unlikely here)
4. **Preload images** from city data
5. **Minimize re-renders** when switching programs

---

## FAQ

**Q: What if a city has no program-specific tips?**  
A: `program_tips.data` will be an empty array. Just check `if (program_tips.count === 0)` before displaying.

**Q: What if a tip doesn't have a `short_description`?**  
A: It's optional. Either skip it or use the first 100 chars of `content`.

**Q: Can I sort tips by category?**  
A: Use the `?category=` query param on `/tips-organized` endpoint.

**Q: How do I show tips without general tips?**  
A: Use the `/tips-organized?category=academic` endpoint and filter manually, or just don't display `general_tips.data`.

**Q: What if a tip is very long?**  
A: Use `short_description` for preview, and expand/collapse on click.

---

## Summary

**Use this endpoint:** `GET /api/cities/{slug}/full`

**Benefits:**
- ✅ One endpoint for complete city page
- ✅ Tips pre-organized by program
- ✅ No client-side filtering needed
- ✅ Easy to display with clear separation
- ✅ All data in single request

**Display options:**
- Simple: List all tips (general + programs)
- Dropdown: Program selector to filter view
- Tabs: Tab view for each program
- Expandable: Collapse/expand each section

That's it! The backend does the heavy lifting now.
