# MyTranslationBuddy 🐊🇩🇪

A full-stack web app built for UF students studying abroad in Germany, Austria, and Switzerland (the DACH region). It helps you learn German phrases, find events in your city, translate text, and just generally get ready for a semester abroad. Built with React + Vite on the frontend and Python FastAPI on the backend, with MongoDB Atlas for the database.

We made this as a senior project, as of now it actually works end to end. You can register with your @ufl.edu email (or sign in with Google using your @ufl.edu email), pick your study abroad city, browse an interactive map of 23+ cities, learn dialect-specific phrases with audio playback, discover real events via Ticketmaster, translate German → English with the floating widget, and track your vocab with flashcards.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [Frontend Overview](#frontend-overview)
  - [Pages & Components](#pages--components)
  - [Interactive Map](#interactive-map)
  - [Audio Pronunciation](#audio-pronunciation)
  - [Translation Widget](#translation-widget)
  - [Events Discovery](#events-discovery)
  - [Google OAuth](#google-oauth-frontend)
  - [Study Hub & Flashcards](#study-hub--flashcards)
- [Backend Overview](#backend-overview)
  - [API Routes](#api-routes)
  - [Database Schema](#database-schema)
  - [External APIs Used](#external-apis-used)
- [Testing](#testing)
- [Environment Variables](#environment-variables)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, React Router v7 |
| UI Icons | Lucide React, FontAwesome |
| Map | Leaflet 1.9 (loaded via CDN) + CARTO/Esri tile layers |
| Backend | Python 3, FastAPI, Uvicorn |
| Database | MongoDB Atlas (via Motor async driver + PyMongo) |
| Auth | bcrypt password hashing, Google OAuth 2.0 (ID token verification) |
| Translation | Smartcat Translation API |
| Events | Ticketmaster Discovery API v2 |
| HTTP Client | Axios (frontend), httpx (backend) |
| Validation | Pydantic v2 |

---

## Project Structure

```
MyTranslationBuddy/
├── frontend/                   # React + Vite app
│   ├── index.html              # Entry point — loads Leaflet CSS/JS from CDN
│   ├── vite.config.js          # Dev server + proxy /api → localhost:8000
│   ├── package.json
│   ├── public/                 # Static assets (background, map data)
│   └── src/
│       ├── App.jsx             # Router setup — all page routes defined here
│       ├── main.jsx            # React root render
│       ├── App.css / index.css # Global styles
│       ├── assets/             # Images (logo, team headshots)
│       └── components/         # All page components (see below)
│
├── server/                     # FastAPI backend
│   ├── run.py                  # Uvicorn entry point (port 8000)
│   ├── pytest.ini              # Test configuration
│   ├── requirements.txt        # Python dependencies
│   ├── run_tests.sh            # Shell script to run test suites
│   ├── app/
│   │   ├── main.py             # FastAPI app creation, CORS, router includes
│   │   ├── config.py           # Settings (Pydantic BaseSettings, env loading)
│   │   ├── database.py         # MongoDB connection manager (Motor async)
│   │   ├── exceptions.py       # Custom exception classes
│   │   ├── routes/             # API route files
│   │   │   ├── auth.py         # Register, login, logout, Google OAuth, profile CRUD
│   │   │   ├── cities.py       # City data endpoints
│   │   │   ├── events.py       # Ticketmaster proxy
│   │   │   ├── phrases.py      # Phrase library + bookmarks
│   │   │   ├── tips.py         # City tips / study abroad program tips
│   │   │   ├── translate.py    # Smartcat translation proxy
│   │   │   └── health.py       # Health check endpoints
│   │   ├── schemas/            # Pydantic models for request/response validation
│   │   ├── data/               # Seed data scripts (cities, phrases, tips)
│   │   └── middleware/         # Error handler middleware
│   └── tests/                  # Pytest test suites
│       ├── conftest.py         # Shared fixtures (FastAPI TestClient)
│       ├── test_auth.py        # Auth + profile tests
│       ├── test_cities.py      # City endpoint tests
│       ├── test_events.py      # Ticketmaster proxy tests
│       ├── test_phrases.py     # Phrase library tests
│       ├── test_tips.py        # Tips endpoint tests
│       └── test_health.py      # Health check tests
```

---

## How to Run

### Backend

```bash
cd server
pip install -r requirements.txt
# Make sure you have a .env file with MONGODB_URI and API keys (see Environment Variables)
python run.py
# Server starts on http://localhost:8000
# Swagger docs at http://localhost:8000/docs
```

### Translation Engine

```
Install Docker Desktop at https://www.docker.com/products/docker-desktop/
In terminal, run:
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Vite dev server starts on http://localhost:5173
# All /api/* requests get proxied to localhost:8000 automatically (configured in vite.config.js)
```

---

## Frontend Overview

### Pages & Components

| Route | Component | What it does |
|-------|-----------|-------------|
| `/` | `LandingPage.jsx` | Main dashboard — interactive map, city cards, travel routes, landmarks |
| `/login` | `Login.jsx` | Email/password login + Google Sign-In button |
| `/register` | `Register.jsx` | Account creation (UFL emails only) |
| `/profile` | `Profile.jsx` | View/edit profile, manage saved cities, view bookmarks & saved events |
| `/update-password` | `UpdatePassword.jsx` | Change password form |
| `/oauth-callback` | `OAuthAuthenticate.jsx` | Eventbrite OAuth callback handler |
| `/events` | `Events.jsx` | Browse events from Ticketmaster, filter by country/city/category/date |
| `/event-details/:id` | `EventDetail.jsx` | Single event detail page |
| `/tips` | `DialectTips.jsx` | Browse cities, view study abroad program info, explore dialect phrases with audio |
| `/reservations` | `Reservations.jsx` | Study Hub — phrase library, vocab flashcards, daily goals, quiz mode |
| (global) | `TranslateWidget.jsx` | Floating translate button on every page |

### Interactive Map

The landing page has a full interactive map built with **Leaflet.js** (loaded from CDN in `index.html`). It's not using react-leaflet for the map itself — it directly uses `window.L` to create the map instance.

- **Tile layers**: Starts with [CARTO Voyager](https://carto.com/basemaps/) for street view, auto-switches to [Esri World Imagery](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9) satellite tiles when you zoom in past level 13
- **City pins**: 23 cities across DE/AT/CH with custom colored SVG markers (blue for Germany, red for Austria, green for Switzerland). Each pin has a rich tooltip with cost of living, beer price, transit info, must-do activities, and university names
- **Landmarks**: 40+ landmarks (museums, beer gardens, viewpoints, etc.) that appear when you zoom in past level 10, each with a student tip and a link to Google Maps
- **Travel routes**: Polyline routes between cities showing train times and prices — highlights which routes are free with the €49 Deutschland Semesterticket
- All coordinates and city data are hardcoded in `LandingPage.jsx` in the `CITY_COORDS`, `LANDMARKS`, and `TRAVEL_ROUTES` arrays

### Audio Pronunciation

We use the **Web Speech API** — specifically `window.speechSynthesis` and `SpeechSynthesisUtterance`. It's a browser-native API, so there's no external service or API key needed.

- [MDN Docs: SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [MDN Docs: SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)

How it works: when a user clicks the speaker icon next to a German phrase, we create a new `SpeechSynthesisUtterance` with the German text, set `lang` to `"de-DE"` and `rate` to around `0.82–0.85` (slightly slower so you can hear the pronunciation clearly), and call `window.speechSynthesis.speak(utterance)`. We track speaking state so the button shows active feedback and you can click again to stop.

This is used on the Landing Page (phrase of the day), Events page (event phrases sidebar), Dialect Tips page (phrase cards), and the Study Hub / Reservations page (flashcards and phrase library). The code pattern is essentially the same across all four — create an utterance, set German language, speak it.

### Translation Widget

There's a floating "🌐 Translate" button (the `TranslateWidget.jsx` component) that shows up on every single page. It's rendered outside the `<Routes>` in `App.jsx` so it persists across navigation.

When you type German text and hit Translate, it POSTs to `/api/translate` on our backend, which proxies the request to the **Smartcat Translation API**.

- [Smartcat API Docs](https://developers.smartcat.com/)
- The backend constructs a Basic Auth header using `SMARTCAT_ACCOUNT_ID` and `SMARTCAT_API_KEY`, sends the text to Smartcat's `/api/integration/v1/smartTranslation/translate` endpoint, and returns the translation
- Supports German → English by default (the widget hardcodes `source_language: "de"` and `target_language: "en"`)
- The schema supports more language codes (es, fr, pt, zh, ja) if we wanted to expand later

### Events Discovery

The Events page (`Events.jsx`) pulls real event data from the **Ticketmaster Discovery API v2**.

- [Ticketmaster Discovery API Docs](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)
- The frontend doesn't call Ticketmaster directly — it calls our backend proxy at `GET /api/tm-events` to avoid CORS issues
- The backend (`routes/events.py`) forwards the request to `https://app.ticketmaster.com/discovery/v2/events.json` with the API key and query params (country, city, keyword, date range, pagination)
- Users can filter by country (Germany/Austria/Switzerland), city, category (Music, Sports, Arts), and date range (this week, this month, 3 months)
- Events can be saved/bookmarked to your profile and they persist to MongoDB
- The Events page also has a sidebar with useful German phrases for events (asking for tickets, ordering beer, etc.) with audio playback and bookmark functionality. Those phrases are hardcoded per country (DE/AT/CH) directly in the component

### Google OAuth (Frontend)

On the login and register pages, there's a "Sign in with Google" button. This uses **Google Identity Services** (the newer GIS library, not the old gapi).

- [Google Identity Services Docs](https://developers.google.com/identity/gsi/web/guides/overview)
- The frontend loads `https://accounts.google.com/gsi/client` as a script, initializes it with our Google Client ID, and renders the sign-in button
- When the user signs in with Google, it returns a JWT credential (ID token). The frontend sends this token to `POST /api/auth/google` on our backend
- The backend verifies the token with Google's `https://oauth2.googleapis.com/tokeninfo?id_token=` endpoint, checks that the email ends in `@ufl.edu`, and either finds the existing user or creates a new account
- Google users don't have a password stored — their `hashed_password` field is empty

There's also a separate Eventbrite OAuth flow (`OAuthAuthenticate.jsx`) that uses the implicit grant to get an access token from Eventbrite. It's used for the events page but the main event source is Ticketmaster.

- [Eventbrite OAuth Docs](https://www.eventbrite.com/platform/api#/reference/authentication)

### Study Hub & Flashcards

The Reservations page (`Reservations.jsx`) is basically a Study Hub. It's got a few things going on:

- **Phrase Library**: Fetches phrases from `GET /api/phrases/?limit=100` and lets you filter by category, city, country, and phrase type (standard/regional/slang). You can bookmark phrases and listen to them
- **Vocab Flashcards**: You can add your own vocab cards (German word + English translation + context). They're stored in localStorage. There's a flashcard mode where you flip through them, and a quiz mode where you type the translation and it checks if you're right
- **Daily Goals**: Set a daily phrase review goal and track progress (also localStorage)
- **Phrase of the Day**: Picks a random phrase from your saved cities' phrase pool, different each day
- **Saved Phrases**: View all your bookmarked phrases from the backend, filter by type/category

---

## Backend Overview

### API Routes

All routes are prefixed with `/api` (except health checks).

#### Auth (`routes/auth.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Create account (UFL email only, password validated for strength) |
| POST | `/api/login` | Login with email + password, returns profile data |
| POST | `/api/logout` | Logout (clears session marker) |
| POST | `/api/delete` | Delete account + all associated bookmarks |
| GET | `/api/user/profile?email=` | Get user profile |
| PUT | `/api/user/profile` | Update profile fields (name, city, major, saved_cities, saved_events) |
| POST | `/api/user/change-password` | Change password (requires current password) |
| POST | `/api/auth/google` | Google OAuth — verify ID token, check @ufl.edu, create or find user |

#### Cities (`routes/cities.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cities/` | Get all cities (paginated, filterable by country/tag) |
| GET | `/api/cities/{slug}` | Get a single city by slug |
| GET | `/api/cities/search/by-country/{country}` | Search cities by country name |
| GET | `/api/cities/{slug}/tips` | Get tips for a specific city |
| GET | `/api/cities/{slug}/phrases` | Get phrases associated with a city |
| GET | `/api/cities/{slug}/complete` | Get city + tips + phrases all in one response |

#### Phrases (`routes/phrases.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/phrases/` | Get all phrases (filterable by category, city_slug, difficulty, register, phrase_type) |
| POST | `/api/phrases/` | Create a new phrase |
| GET | `/api/phrases/categories` | List all categories with counts |
| GET | `/api/phrases/cities` | List all cities that have phrases |
| GET | `/api/phrases/search` | Full-text search across German text, English translation, and tags |
| GET | `/api/phrases/{id}` | Get a single phrase by ID |
| POST | `/api/phrases/bookmarks` | Create a bookmark (user_email + phrase_id) |
| DELETE | `/api/phrases/bookmarks/{id}` | Delete a bookmark |
| GET | `/api/phrases/bookmarks` | Get all bookmarks for a user |

#### Tips (`routes/tips.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tips/` | Get all tips (filterable by city_slug, category) |
| GET | `/api/tips/by-category/{category}` | Get tips filtered by category |
| GET | `/api/tips/by-program/{program_name}` | Get tips for a specific study abroad program |

#### Events (`routes/events.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tm-events` | Proxy to Ticketmaster Discovery API. Params: countryCode, keyword, city, size, page, startDateTime, endDateTime |

#### Translation (`routes/translate.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/translate` | Translate text via Smartcat API. Body: `{ source_text, source_language, target_language }` |

#### Health (`routes/health.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Basic health check |
| GET | `/` | Root endpoint (welcome message + version) |
| GET | `/api/v1/health` | API health endpoint |

### Database Schema

We use 4 MongoDB databases on Atlas:

#### `users_auth` database
- **`users` collection**: User accounts
  - `email` (string, unique) — must be @ufl.edu
  - `hashed_password` (string) — bcrypt hash, empty for Google auth users
  - `full_name`, `study_abroad_city`, `major` (strings)
  - `graduation_year` (int, optional)
  - `interests` (array of strings)
  - `saved_cities` (array of city slug strings)
  - `saved_events` (array of event objects with id, name, url, date, etc.)
  - `is_active` (bool), `role` (string, "user" or "admin")
  - `auth_provider` (string, "google" if Google OAuth)
  - `created_at`, `updated_at` (datetime)

#### `cities_info` database
- **`cities` collection**: City data
  - `slug` (string, unique) — e.g. "berlin", "munich"
  - `name`, `local_name`, `country`, `country_code`, `region`, `region_type`
  - `population` (int), `coordinates` ({ lat, lng })
  - `timezone`, `currency`, `languages_official` (array)
  - `dialect`, `english_friendliness`, `description`, `tagline`
  - `known_for`, `industries`, `tags` (arrays)
  - `cost_of_living_tier`, `expat_friendliness`
  - `climate` ({ type, summers, winters, note })
  - `international_airport`, `airport_distance_km`
  - `image_url`, `priority`, `source_name`, `source_url`

- **`city_tips` collection**: Tips for cities / study abroad programs
  - `city_slug` (string)
  - `category` (string — transportation, housing, food_drink, events, etiquette, etc.)
  - `title`, `content` (strings)
  - `program` (string, optional — name of the study abroad program)
  - `short_description`, `tags`, `priority`, `source_name`, `source_url`

#### `phrases_vocabulary` database
- **`phrases` collection**: German phrase library
  - `german_phrase`, `english_translation`, `pronunciation` (strings)
  - `category` (enum: academic, housing, dining, transportation, health, greetings, social, shopping, emergency, exclamations, daily_life)
  - `register` (enum: informal, neutral, formal)
  - `phrase_type` (enum: standard, regional, slang)
  - `country_codes` (array, e.g. ["DE", "AT"])
  - `regions`, `city_slugs` (arrays)
  - `dialect_name` (string, e.g. "Bavarian", "Viennese")
  - `usage_context`, `contextual_note`, `cultural_note` (strings)
  - `example_sentence`, `audio_url` (strings)
  - `tags` (array), `difficulty_level` (1-5)

- **`phrase_bookmarks` collection**: User phrase bookmarks
  - `user_email`, `phrase_id`, `created_at`

#### `translation_history` database
- **`translations` collection**: Past translation records
- **`saved_translations` collection**: User-saved translations

### External APIs Used

| API | What we use it for | Docs |
|-----|-------------------|------|
| **Smartcat Translation API** | German ↔ English text translation (the floating widget) | [developers.smartcat.com](https://developers.smartcat.com/) |
| **Ticketmaster Discovery API v2** | Real event listings in DACH cities (concerts, sports, arts) | [developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) |
| **Google OAuth 2.0 / Identity Services** | "Sign in with Google" for @ufl.edu accounts | [developers.google.com/identity/gsi/web](https://developers.google.com/identity/gsi/web/guides/overview) |
| **Google Token Verification** | Backend verifies Google ID tokens via `oauth2.googleapis.com/tokeninfo` | [developers.google.com/identity/sign-in/web/backend-auth](https://developers.google.com/identity/sign-in/web/backend-auth) |
| **Eventbrite OAuth** | Optional Eventbrite account linking (implicit grant flow) | [eventbrite.com/platform/api](https://www.eventbrite.com/platform/api#/reference/authentication) |
| **Web Speech API** | Browser-native text-to-speech for German phrase pronunciation | [MDN SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) |
| **Leaflet.js** | Interactive map rendering | [leafletjs.com](https://leafletjs.com/) |
| **CARTO Basemaps** | Street-level map tiles | [carto.com/basemaps](https://carto.com/basemaps/) |
| **Esri World Imagery** | Satellite map tiles (auto-switches at high zoom) | [ArcGIS](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9) |

---

## Testing

All backend tests live in `server/tests/` and use **pytest** with FastAPI's `TestClient`. The test client spins up the full app (including the MongoDB connection) so these are real integration tests hitting the actual database.

### Running Tests

```bash
cd server

# Run everything
pytest -v

# Or use the shell script
chmod +x run_tests.sh
./run_tests.sh all

# Run specific test suites
./run_tests.sh health
./run_tests.sh cities
./run_tests.sh auth
./run_tests.sh phrases
./run_tests.sh tips
```

### What's Tested

**`test_health.py`** — Basic sanity checks
- Verifies `/health`, `/`, and `/api/v1/health` all return 200 with expected data

**`test_auth.py`** — Auth and profile management
- Registration: successful signup, non-UFL email rejection, weak password rejection, duplicate email rejection
- Login: successful login, wrong password, nonexistent user
- Profile: get profile, update profile (name/city/major), get profile for nonexistent user
- Password change, account deletion, Google OAuth flow

**`test_cities.py`** — City data endpoints
- Get all cities with pagination (skip/limit)
- Filter by country, filter by tag
- Get single city by slug, 404 for nonexistent slug
- Verify response structure has all required fields
- Get city tips and city phrases

**`test_phrases.py`** — Phrase library
- Get all phrases with default pagination
- Pagination (skip/limit, verify different results on different pages)
- Filter by category, city, difficulty, register, phrase_type
- Combined filtering (multiple filters at once)
- Phrase search endpoint
- Categories listing, cities listing
- Bookmark CRUD (create, list, delete)
- Edge cases: invalid bookmark IDs, missing fields

**`test_tips.py`** — City tips
- Get all tips with pagination
- Filter by city_slug, by category
- Get tips by program name
- Verify response structure
- 404 for nonexistent programs

**`test_events.py`** — Ticketmaster proxy
- Default event fetch
- Filter by country, city, keyword
- Pagination
- Accepts 200, 502, or 504 (since the Ticketmaster API key could be expired in test environments)

### Test Config

`conftest.py` creates a shared `client` fixture using `TestClient(app)` which auto-handles the FastAPI lifespan (MongoDB connect/disconnect). Tests use `uuid4()` for unique emails so they don't collide on repeated runs.

---

## Environment Variables

Create a `server/.env` file with:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# Smartcat Translation
SMARTCAT_BASE_URL=https://us.smartcat.ai
SMARTCAT_ACCOUNT_ID=your_account_id
SMARTCAT_API_KEY=your_api_key
SMARTCAT_PROFILE_ID=your_profile_id

# Ticketmaster
TICKETMASTER_API_KEY=your_ticketmaster_key

# Database names (optional, have defaults)
CITIES_DB=cities_info
USERS_DB=users_auth
TRANSLATIONS_DB=translation_history
PHRASES_DB=phrases_vocabulary
```

The Google Client ID for OAuth is hardcoded in the frontend (`Login.jsx` and `Register.jsx`) since it's a public client ID anyway. If you're forking this, swap it out for your own.

---
