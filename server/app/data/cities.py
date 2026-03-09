from app.schemas.city import CityCreate

hamburg_city = CityCreate(
    slug="hamburg",
    name="Hamburg",
    local_name="Hamburg",
    country="Germany",
    country_code="DE",
    region="Hamburg",
    region_type="city_state",
    is_city_state=True,
    capital_of_region=True,
    population=1800000,
    population_approx=True,
    coordinates={"lat": 53.5511, "lng": 9.9937},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Low German influence (Plattdeutsch) / Missingsch",
    english_friendliness="high",
    tagline="Germany's gateway to the world — port city, canals, culture, and maritime soul",
    known_for=[
        "Port of Hamburg",
        "Elbe River",
        "Canals and waterways",
        "Inner Alster lake",
        "Jungfernstieg boulevard",
        "St. Michael's Church",
        "Museums and cultural life",
        "Green neighborhoods and parks"
    ],
    industries=[
        "Logistics",
        "Shipping",
        "Media",
        "Aerospace",
        "Retail",
        "Tourism"
    ],
    cost_of_living_tier="high",
    expat_friendliness="high",
    international_airport="Hamburg Airport (HAM)",
    airport_distance_km=8,
    climate={
        "type": "maritime",
        "summers": "mild to warm",
        "winters": "mild but wet and grey",
        "note": "Northern German port climate with frequent rain, overcast skies, and relatively mild seasonal extremes"
    }
)

berlin_city = CityCreate(
    slug="berlin",
    name="Berlin",
    local_name="Berlin",
    country="Germany",
    country_code="DE",
    region="Berlin",
    region_type="city_state",
    is_city_state=True,
    capital_of_region=True,
    population=3700000,
    population_approx=True,
    coordinates={"lat": 52.5200, "lng": 13.4050},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Berlinerisch",
    english_friendliness="very_high",
    tagline="A city of history, reinvention, art, and innovation",
    known_for=[
        "Brandenburg Gate",
        "Berlin Wall",
        "East Side Gallery",
        "Memorial to the Murdered Jews of Europe",
        "Topography of Terror",
        "Nightlife and club culture",
        "Arts and creative scene",
        "Cold War history"
    ],
    industries=[
        "Technology",
        "Creative industries",
        "Government",
        "Tourism",
        "Media"
    ],
    cost_of_living_tier="high",
    expat_friendliness="very_high",
    international_airport="Berlin Brandenburg Airport (BER)",
    airport_distance_km=24,
    climate={
        "type": "continental",
        "summers": "warm to hot",
        "winters": "cold, grey, occasional snow",
        "note": "Berlin has four distinct seasons and a mix of long grey winters and lively summers."
    }
)

detmold_city = CityCreate(
    slug="detmold",
    name="Detmold",
    local_name="Detmold",
    country="Germany",
    country_code="DE",
    region="North Rhine-Westphalia",
    region_type="federal_state",
    is_city_state=False,
    capital_of_region=False,
    population=75000,
    population_approx=True,
    coordinates={"lat": 51.9363, "lng": 8.8792},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Westphalian / High German",
    english_friendliness="moderate",
    tagline="A smaller German university town surrounded by nature, architecture, and regional history",
    known_for=[
        "Detmold School of Architecture and Interior Architecture",
        "Teutoburg Forest",
        "Externsteine",
        "Bad Salzuflen",
        "Schieder See",
        "Historic architecture and cultural sites"
    ],
    industries=[
        "Education",
        "Regional services",
        "Construction and design education",
        "Tourism"
    ],
    cost_of_living_tier="moderate",
    expat_friendliness="moderate",
    international_airport="Paderborn Lippstadt Airport (PAD)",
    climate={
        "type": "temperate",
        "summers": "mild to warm",
        "winters": "cool and overcast",
        "note": "Green inland climate with easy access to forests and outdoor excursions."
    }
)