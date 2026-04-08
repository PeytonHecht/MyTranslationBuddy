# MyTranslationBuddy 🐊🇩🇪

A full-stack study abroad companion for UF students headed to Germany, Austria, and Switzerland (DACH). Built with React + Vite and Python FastAPI, powered by MongoDB Atlas.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, React Router, Axios, Lucide Icons |
| Backend | Python 3.12, FastAPI, Motor (async MongoDB), Pydantic v2, bcrypt |
| Database | MongoDB Atlas — 3 databases: `users_auth`, `phrases_vocabulary`, `cities_info` |
| APIs | Ticketmaster Discovery API (events), Google OAuth (auth) |
| Dev | Vite dev server (port 5173), Uvicorn (port 8000), Pytest |

---

## Project Structure

```
MyTranslationBuddy/
├── frontend/               # React + Vite SPA
│   ├── src/
│   │   ├── App.jsx         # Router with all page routes
│   │   ├── components/
│   │   │   ├── LandingPage.jsx    # Home — hero, interactive map, daily snapshot
│   │   │   ├── DialectTips.jsx    # Explore Cities — grid + city detail tabs
│   │   │   ├── Reservations.jsx   # Study Hub — flashcards, quiz, phrase library
│   │   │   ├── Events.jsx         # Event Discovery — Ticketmaster integration
│   │   │   ├── Profile.jsx        # User profile & saved cities
│   │   │   ├── Login.jsx          # Email/password + Google OAuth login
│   │   │   ├── Register.jsx       # UFL-only registration
│   │   │   └── ...
│   │   └── assets/
│   └── public/maps/        # Interactive Europe map (SVG data)
│
├── server/                 # FastAPI backend
│   ├── run.py              # Uvicorn entry point
│   ├── app/
│   │   ├── main.py         # FastAPI app, lifespan, CORS, router includes
│   │   ├── config.py       # Settings (MongoDB URI, CORS, app name)
│   │   ├── database.py     # Motor async MongoDB connection
│   │   ├── routes/
│   │   │   ├── auth.py     # /api — register, login, logout, profile, password
│   │   │   ├── phrases.py  # /api/phrases — CRUD, search, bookmarks, stats
│   │   │   ├── cities.py   # /api/cities — city list, detail, tips, search
│   │   │   ├── tips.py     # /api/tips — tips list, by program, by category
│   │   │   ├── events.py   # /api/tm-events — Ticketmaster proxy
│   │   │   └── health.py   # /health, / — health check
│   │   ├── schemas/        # Pydantic models for validation
│   │   ├── data/           # Seed data (phrases, cities, tips)
│   │   └── seed_db.py      # Database seeding script
│   └── tests/              # Pytest test suite
│       ├── conftest.py
│       ├── test_auth.py
│       ├── test_phrases.py
│       ├── test_cities.py
│       ├── test_tips.py
│       ├── test_events.py
│       ├── test_integration.py
│       └── test_health.py
└── README.md
```

---

## Backend API Routes

### Auth (`/api`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register (UFL email only) |
| POST | `/api/login` | Login with email/password |
| POST | `/api/logout` | Logout |
| POST | `/api/delete` | Delete account + associated data |
| GET | `/api/user/profile?email=` | Get user profile |
| PUT | `/api/user/profile` | Update profile (name, city, major, saved_cities, saved_events) |
| POST | `/api/user/change-password` | Change password |
| POST | `/api/auth/google` | Google OAuth login |

### Phrases (`/api/phrases`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/phrases/` | List phrases (filter: category, city_slug, difficulty, register, phrase_type) |
| POST | `/api/phrases/` | Create a phrase |
| GET | `/api/phrases/categories` | Category list with counts |
| GET | `/api/phrases/cities` | City list with phrase counts |
| GET | `/api/phrases/random` | Random phrase (filter: category, city_slug) |
| GET | `/api/phrases/stats/overview` | Analytics: totals, by_category, by_register, by_difficulty, by_city |
| POST | `/api/phrases/search` | Full-text search (English/German/all) with filters |
| POST | `/api/phrases/bookmarks` | Bookmark a phrase |
| GET | `/api/phrases/bookmarks?user_email=` | Get user's bookmarks with phrase data |
| DELETE | `/api/phrases/bookmarks/{id}?user_email=` | Remove bookmark |
| PATCH | `/api/phrases/{id}` | Update a phrase |
| DELETE | `/api/phrases/{id}` | Delete a phrase + bookmarks |
| GET | `/api/phrases/{id}` | Get single phrase |

### Cities (`/api/cities`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cities` | List cities (filter: country, tag; pagination) |
| GET | `/api/cities/{slug}` | City detail |
| GET | `/api/cities/{slug}/tips` | Tips for city (filter: category; pagination) |
| GET | `/api/cities/search/by-country/{country}` | Cities by country |
| GET | `/api/cities/search/by-tag/{tag}` | Cities by tag |
| GET | `/api/cities/search/featured` | Featured cities |

### Tips (`/api/tips`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tips` | List tips (filter: city_slug, category; pagination) |
| GET | `/api/tips/by-program/{name}` | Tips for specific program |
| GET | `/api/tips/by-category/{category}` | Tips by category (filter: city_slug; pagination) |
| GET | `/api/tips/programs` | List all unique programs |
| GET | `/api/tips/categories` | List all unique categories |
| GET | `/api/tips/programs/{name}/cities` | Cities offering a program |
| GET | `/api/tips/search?q=` | Search tips by title/content |
| GET | `/api/tips/stats` | Tip statistics (totals, per-city breakdown) |

### Events (`/api`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tm-events` | Ticketmaster proxy (params: countryCode, keyword, city, size, page, startDateTime, endDateTime) |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/` | Root — welcome + version |
| GET | `/api/v1/health` | API health |

---

## Data Persistence

| Data | Storage | Notes |
|------|---------|-------|
| User accounts | MongoDB `users_auth.users` | email, password (bcrypt), profile fields |
| Saved cities | MongoDB `users_auth.users.saved_cities` | Array of city slugs, synced from Profile page |
| Saved events | MongoDB `users_auth.users.saved_events` | Array of event objects, synced from Events page |
| Phrase bookmarks | MongoDB `phrases_vocabulary.phrase_bookmarks` | Per-user bookmark with phrase_id |
| Vocab flashcards | localStorage `vocabCards` | Client-side study deck |
| Study plans | localStorage `reservations` | Client-side study plans |
| Daily progress | localStorage `todayProgress` | Client-side daily goal tracking |

---

## Quick Start

```bash
# Backend
cd server
pip install -r requirements.txt
python run.py                    # Starts on port 8000

# Seed DB (one-time)
python -m app.seed_db

# Frontend
cd frontend
npm install
npx vite --port 5173             # Starts on port 5173

# Tests
cd server
pytest -v
```

---

## Key Features

- **23 DACH cities** with programs, tips, cultural info, and train routes
- **295+ German phrases** with audio (TTS), pronunciation, bookmarks, and phrase_type filtering (standard / regional / slang)
- **Study Hub** with flashcards, spaced repetition, quizzes, daily goals, and Phrase of the Day
- **Event Discovery** powered by Ticketmaster with heart-save, timeline view, and seasonal picks
- **Interactive Europe map** with city pins, tooltips, and student train routes
- **User profiles** with MongoDB persistence for saved cities and events
- **UFL-only auth** (email + Google OAuth) with password hashing

---

*Built by Gators, for Gators 🐊*