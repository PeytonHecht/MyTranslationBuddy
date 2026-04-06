# Tips Data Structure & Organization Strategy

**Date:** April 6, 2026  
**Purpose:** Explain how study abroad tips are organized and how the API delivers them to students

---

## Overview: Why Tips Need Smart Organization

Students studying abroad in German cities need **two types of tips**:

1. **General Tips** — Applicable to ALL students in the city (housing costs, public transportation, city culture)
2. **Program-Specific Tips** — Tailored to their specific university/program (academic requirements, course offerings, program deadlines)

Without smart organization, students get confused by conflicting information or miss critical program-specific advice. Our structure ensures they get both.

---

## Data Structure: How Tips Are Stored

Every tip in the database has a **required `program` field**:

```python
CityTipCreate(
    city_slug="berlin",
    category="academics",
    title="...",
    content="...",
    program=None,  # ← NULL means "general tip for all students"
    short_description="...",
    tags=[...],
    priority=10,
    source_name="...",
)

CityTipCreate(
    city_slug="vienna",
    category="academics",
    title="...",
    content="...",
    program="UF Exchange - University of Natural Resources (BOKU)",  # ← Specific program
    short_description="...",
    tags=[...],
    priority=10,
    source_name="...",
)
```

### The `program` Field Rules

- **`program = None` or empty string** → General tip (applies to all students in that city)
- **`program = "UF Exchange - University X"`** → This tip is ONLY for students in that specific program

This simple structure enables powerful organization.

---

## Tip Categories

Tips are organized by category to help students find what they need:

| Category | Examples |
|----------|----------|
| `academics` | Course registration, academic requirements, ECTS credit conversion, professor office hours |
| `housing` | Dorm options, rent costs, utilities setup, lease agreements |
| `city life` | Cultural events, recreational activities, student areas, transportation hubs |
| `eligibility` | GPA requirements, prerequisite courses, language proficiency, visa info |
| `finances` | Tuition costs, scholarships, job opportunities, cost of living breakdown |
| `excursions` | Day trips, weekend getaways, museums, tourist attractions |
| `planning` | Packing lists, what to bring, registration deadlines, arrival information |
| `food_drink` | Student cafeterias, favorite restaurants, grocery shopping, dietary options |
| `transportation` | Public transit passes, bike rentals, train stations, navigation tips |
| `sports` | University gym access, sports clubs, recreational activities |

---

## API Endpoints for Tips

### 1. **GET /api/tips** — Generic Tips Query
**Use Case:** Search all tips across all cities

```bash
GET /api/tips?city_slug=berlin&category=housing&limit=20

Response:
{
  "data": [
    { "city_slug": "berlin", "category": "housing", "title": "...", "program": null },
    { "city_slug": "berlin", "category": "housing", "title": "...", "program": null },
  ],
  "total": 45,
  "skip": 0,
  "limit": 20
}
```

**Note:** Returns all tips (general + program-specific) mixed together. Good for filtering but not ideal for display.

---

### 2. **GET /api/cities/{city_slug}/tips** — City Tips (Basic)
**Use Case:** Get all tips for a specific city

```bash
GET /api/cities/vienna/tips?category=academics&limit=50

Response:
{
  "city_slug": "vienna",
  "city": { "slug": "vienna", "name": "Vienna" },
  "data": [
    { "title": "...", "program": null, "category": "academics" },
    { "title": "...", "program": "UF Exchange - BOKU", "category": "academics" },
    { "title": "...", "program": "UF Exchange - WU Vienna", "category": "academics" },
  ],
  "total": 15,
  "skip": 0,
  "limit": 50
}
```

**Note:** Returns all tips mixed together. Still requires client-side filtering to separate general from program-specific.

---

### 3. **GET /api/cities/{city_slug}/tips-organized** — City Tips (Organized) ⭐ **RECOMMENDED**
**Use Case:** Display city tips organized by program type

```bash
GET /api/cities/vienna/tips-organized?category=academics

Response:
{
  "city_slug": "vienna",
  "city": { "slug": "vienna", "name": "Vienna" },
  "general_tips": {
    "count": 5,
    "data": [
      {
        "title": "General Academic Culture in Vienna",
        "content": "Vienna universities emphasize...",
        "program": null,
        "category": "academics",
        "priority": 10,
      },
      { ... more general tips ... }
    ]
  },
  "program_tips": {
    "count": 2,
    "data": [
      {
        "program": "UF Exchange - University of Natural Resources (BOKU)",
        "count": 7,
        "tips": [
          {
            "title": "BOKU Course Registration System",
            "content": "BOKU uses a different registration...",
            "program": "UF Exchange - BOKU",
            "category": "academics",
          },
          { ... more BOKU tips ... }
        ]
      },
      {
        "program": "UF Exchange - WU Vienna",
        "count": 6,
        "tips": [
          {
            "title": "WU Vienna Class Structure",
            "content": "WU emphasizes practical business...",
            "program": "UF Exchange - WU Vienna",
            "category": "academics",
          },
          { ... more WU tips ... }
        ]
      }
    ]
  },
  "total_tips": 18,
  "category_filter": "academics"
}
```

**Key Features:**
- ✅ General tips listed first (applies to everyone)
- ✅ Program tips grouped by program name
- ✅ Count of tips per program
- ✅ All tips sorted by priority within their group
- ✅ Optional category filtering
- ✅ Perfect for the city details page

---

### 4. **GET /api/cities/{city_slug}/full** — Complete City Details ⭐ **BEST FOR CITY PAGE**
**Use Case:** Display complete city page with all information and organized tips

```bash
GET /api/cities/vienna/full

Response:
{
  "city": {
    "slug": "vienna",
    "name": "Vienna",
    "local_name": "Wien",
    "country": "Austria",
    "coordinates": { "latitude": 48.2082, "longitude": 16.3738 },
    "timezone": "Europe/Vienna",
    "description": "Vienna is the capital of Austria...",
    "tagline": "The City of Music and Culture",
    "known_for": [
      "Classical music and opera",
      "Imperial palaces and history",
      "Coffeehouse culture",
      "Elegant architecture"
    ],
    "industries": ["finance", "technology", "arts", "tourism"],
    "climate": { "type": "temperate", "seasons": [...] },
    ... (25+ more fields)
  },
  "general_tips": {
    "count": 12,
    "description": "Tips applicable to all students studying in this city",
    "data": [
      { "title": "Public Transportation in Vienna", "program": null, ... },
      { "title": "Vienna Housing Market", "program": null, ... },
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
          { "title": "BOKU Course System", "program": "UF Exchange - BOKU", ... },
          { ... more BOKU tips ... }
        ]
      },
      {
        "program": "UF Exchange - WU Vienna",
        "count": 7,
        "tips": [
          { "title": "WU Vienna Academics", "program": "UF Exchange - WU Vienna", ... },
          { ... more WU tips ... }
        ]
      }
    ]
  },
  "total_tips": 27
}
```

**Perfect For:**
- City details page display
- Shows everything a student needs to know
- Organized in a way that's easy to understand
- Separates general from program-specific info

---

## Frontend Usage Examples

### Example 1: City Selection → Show Overview

```javascript
// User clicks on Vienna
const response = await fetch('/api/cities/vienna/full');
const data = await response.json();

// Display city info
showCityInfo(data.city);

// Display general tips in one section
displayGeneralTips(data.general_tips.data);

// Display programs in dropdown
const programs = data.program_tips.data.map(p => p.program);
showProgramSelector(programs);
```

### Example 2: User Selects Program → Show Program Tips

```javascript
// User selects "UF Exchange - BOKU"
const selectedProgram = "UF Exchange - University of Natural Resources (BOKU)";
const response = await fetch('/api/cities/vienna/full');
const data = await response.json();

// Find the program in the response
const bokoProgram = data.program_tips.data.find(
  p => p.program === selectedProgram
);

// Show general + program-specific tips
displayGeneralTips(data.general_tips.data);
displayProgramTips(bokoProgram.tips);
```

### Example 3: Category Filter

```javascript
// User filters by "academics"
const response = await fetch('/api/cities/vienna/tips-organized?category=academics');
const data = response.json();

// Now general_tips and program_tips both show only academic content
displayOrganizedTips(data);
```

---

## Current Tips Data: Vienna Example

### Vienna Summary
- **Total Tips:** 27
- **General Tips:** 12 (apply to all Vienna students)
- **BOKU Program Tips:** 8
- **WU Vienna Program Tips:** 7

### Categories Represented
| Category | Count | General | BOKU | WU |
|----------|-------|---------|------|-----|
| academics | 6 | 1 | 2 | 3 |
| housing | 4 | 2 | 1 | 1 |
| city life | 5 | 4 | 1 | 0 |
| finances | 3 | 2 | 1 | 0 |
| eligibility | 2 | 0 | 2 | 0 |
| planning | 2 | 1 | 1 | 0 |

---

## Why This Structure Works

### Problem It Solves
**Without organization:** A student sees 27 tips and can't tell which apply to them
**With organization:** They see 12 general tips, then 8 BOKU-specific tips if that's their program

### Benefits for Students
1. **No Confusion** — Clear separation between general and program-specific info
2. **Completeness** — Get both general city knowledge AND program-specific details
3. **Easy Navigation** — Filter by category across both general and program tips
4. **Time Saving** — Don't have to read tips that don't apply to them

### Benefits for Developers
1. **Flexible** — Easy to add new programs without changing structure
2. **Scalable** — Works whether a city has 0 programs or 5+ programs
3. **Queryable** — Database queries are straightforward (filter by program or program=null)
4. **Testable** — Can test general tips separately from program-specific tips

---

## Data Consistency Rules

To maintain data quality:

✅ **Every tip has:**
- `city_slug` — Valid city from the 19 cities
- `category` — One of the defined categories
- `program` — Either NULL or name of valid program
- `priority` — Integer (0-20, higher = more important)
- `title` and `content` — Non-empty strings

✅ **Program-specific tips MUST:**
- Match the city where the program is located
- Be about that specific program or university
- Have `program` field set to exact program name

✅ **General tips MUST:**
- Apply to all students in that city
- Have `program` field as NULL or empty string
- Cover: housing, transportation, culture, food, activities

---

## API Response Format Glossary

### `general_tips` Object
```javascript
{
  "count": 12,                    // Number of general tips
  "description": "Tips applicable to all students...",
  "data": [                       // Array of tip objects
    {
      "title": "...",
      "content": "...",
      "program": null,            // NULL = general tip
      "category": "housing",
      "priority": 10,
      ... (other tip fields)
    }
  ]
}
```

### `program_tips` Object
```javascript
{
  "count": 2,                     // Number of programs with tips
  "description": "Tips specific to different programs...",
  "data": [                       // Array of program groupings
    {
      "program": "UF Exchange - BOKU",  // Program name
      "count": 8,                       // Tips for this program
      "tips": [                         // Array of tip objects
        {
          "title": "...",
          "program": "UF Exchange - BOKU",  // Matches parent
          "category": "academics",
          ... (other tip fields)
        }
      ]
    }
  ]
}
```

---

## Testing the Endpoints

### Test 1: Get All Vienna Data Organized

```bash
curl -X GET "http://localhost:8000/api/cities/vienna/full"

# Verify response has:
# - city object with full details
# - general_tips.count > 0
# - program_tips.count > 0
# - total_tips = general_tips.count + sum of all program tips
```

### Test 2: Get Only Academic Tips

```bash
curl -X GET "http://localhost:8000/api/cities/vienna/tips-organized?category=academics"

# Verify response has:
# - general_tips with only "academic" category
# - program_tips with only "academic" category
# - total_tips reflects filtered count
```

### Test 3: Get Tips for City with No Program-Specific Tips

```bash
curl -X GET "http://localhost:8000/api/cities/berlin/full"

# Verify response has:
# - general_tips with Berlin's tips
# - program_tips.count = 0 or empty (Berlin has no UF programs)
```

---

## Migration Path (If Adding More Programs)

When you add a new UF program to a city:

1. **Add general tips first** (if not already there)
   - Housing in that city
   - Transportation
   - Culture and dining
   - Local activities

2. **Add program-specific tips**
   - Set `program` field to exact program name
   - Cover academics, eligibility, costs
   - Link to program requirements

3. **Update verification**
   - Run `verify_data.py` to ensure data integrity
   - Check that all programs map to valid cities
   - Verify no tips have invalid city_slugs

---

## Summary

| Endpoint | Use Case | Returns | Organization |
|----------|----------|---------|---------------|
| `GET /api/tips` | Generic search | All tips mixed | By filter params |
| `GET /api/cities/{slug}/tips` | City tips | All tips mixed | By priority |
| `GET /api/cities/{slug}/tips-organized` | City tips display | General + programs | Separated by program |
| `GET /api/cities/{slug}/full` | City page | City + organized tips | Complete package |

**Recommendation:** Use `/api/cities/{slug}/full` for your city details page. It provides everything in a well-organized format.

---

**Questions?** This structure is designed to be straightforward and scalable as you add more programs and cities.
