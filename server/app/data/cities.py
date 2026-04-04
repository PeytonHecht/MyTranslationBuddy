from app.schemas.city import CityCreate
stuttgart_city = CityCreate(
    slug="stuttgart",
    name="Stuttgart",
    local_name="Stuttgart",
    country="Germany",
    country_code="DE",
    region="Baden-Württemberg",
    region_type="state_capital",
    is_city_state=False,
    capital_of_region=True,
    population=635000,
    population_approx=True,
    coordinates={"lat": 48.7758, "lng": 9.1829},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Swabian",
    english_friendliness="high",
    tagline="Capital of Baden-Württemberg, known for engineering, culture, and green spaces",
    known_for=[
        "Automotive industry",
        "Engineering",
        "Green spaces",
        "Cultural scene",
        "State capital"
    ],
    industries=[
        "Automotive",
        "Engineering",
        "Tourism",
        "Culture"
    ],
    cost_of_living_tier="high",
    expat_friendliness="high",
    international_airport="Stuttgart Airport (STR)",
    airport_distance_km=13,
    climate={
        "type": "temperate",
        "summers": "warm",
        "winters": "cool",
        "note": "Stuttgart has a temperate climate with warm summers and cool winters."
    },
    image_url=None,
    tags=["engineering", "culture", "green spaces", "state capital"],
    priority=10,
    source_name="UF Stuttgart program page"
)
from app.schemas.city import CityCreate

bonn_city = CityCreate(
    slug="bonn",
    name="Bonn",
    local_name="Bonn",
    country="Germany",
    country_code="DE",
    region="Rhine-Ruhr",
    region_type="region",
    is_city_state=False,
    capital_of_region=False,
    population=330000,
    population_approx=True,
    coordinates={"lat": 50.7339, "lng": 7.0997},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Rheinisch",
    english_friendliness="high",
    tagline="Birthplace of Beethoven, lively academic town and cultural center on the Rhine",
    known_for=[
        "Beethoven",
        "Research university",
        "Festivals",
        "Museums",
        "Proximity to Cologne and Düsseldorf"
    ],
    industries=["Education", "Culture", "Tourism"],
    description=(
        "The birthplace of Beethoven, Bonn is a lively academic town and cultural center on the picturesque Rhine River. "
        "Bonn is a leading research university and one of Europe's most important institutions of higher education, with alumni including five Nobel Prize winners. "
        "The city is known for its festivals, museums, and proximity to Cologne and Düsseldorf."
    ),
    tags=["university", "culture", "Beethoven", "Rhine", "research", "festivals", "museums"],
    climate={
        "type": "temperate oceanic",
        "summers": "warm",
        "winters": "cool",
        "note": "Bonn has a temperate oceanic climate with warm summers and cool winters."
    }
)
mannheim_city = CityCreate(
    slug="mannheim",
    name="Mannheim",
    local_name="Mannheim",
    country="Germany",
    country_code="DE",
    region="Baden-Württemberg",
    region_type="state",
    is_city_state=False,
    capital_of_region=False,
    population=310000,
    population_approx=True,
    coordinates={"lat": 49.4875, "lng": 8.4660},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Kurpfälzisch",
    english_friendliness="high",
    tagline="Energetic city between the Rhine and Neckar Rivers, known for culture, trade, and academia",
    known_for=[
        "University of Mannheim",
        "Baroque palace",
        "Cultural scene",
        "Landmark palace",
        "Busy city center",
        "Inland port",
        "Trade, publishing, tourism"
    ],
    industries=[
        "Trade",
        "Publishing",
        "Tourism",
        "Cultural institutions",
        "Academia"
    ],
    cost_of_living_tier="moderate",
    expat_friendliness="high",
    international_airport="Frankfurt Airport (FRA)",
    airport_distance_km=75,
    climate={
        "type": "temperate",
        "summers": "warm",
        "winters": "cool",
        "note": "Mannheim has a temperate climate with warm summers and cool winters."
    },
    image_url=None
)
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
    population=1840000,
    population_approx=True,
    coordinates={"lat": 53.5511, "lng": 9.9937},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Hamburgisch",
    english_friendliness="high",
    tagline="Germany's gateway to the world, famous for its port, canals, and vibrant culture",
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
    },
    image_url=None
)

ebs_city = CityCreate(
    slug="ebs",
    name="Wiesbaden / Oestrich-Winkel",
    local_name="Wiesbaden / Oestrich-Winkel",
    country="Germany",
    country_code="DE",
    region="Hesse",
    region_type="state",
    is_city_state=False,
    capital_of_region=False,
    population=2000,
    population_approx=True,
    coordinates={"lat": 50.0833, "lng": 8.2333},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Hessian",
    english_friendliness="high",
    tagline="Leading private university for business and law in Wiesbaden and Oestrich-Winkel",
    known_for=[
        "Business Administration",
        "Law",
        "Graduate programs",
        "Wiesbaden spa city",
        "Oestrich-Winkel wine region"
    ],
    industries=[
        "Business",
        "Law",
        "Education"
    ],
    cost_of_living_tier="high",
    expat_friendliness="high",
    international_airport="Frankfurt Airport (FRA)",
    airport_distance_km=40,
    climate={
        "type": "temperate",
        "summers": "warm",
        "winters": "cool",
        "note": "Wiesbaden and Oestrich-Winkel have a temperate climate with warm summers and cool winters."
    },
    image_url=None,
    tags=["business", "law", "graduate", "exchange", "Wiesbaden", "Oestrich-Winkel", "Rheingau"],
    priority=10,
    source_name="UF EBS program page"
)

eltville_city = CityCreate(
    slug="eltville",
    name="Eltville am Rhein",
    local_name="Eltville am Rhein",
    country="Germany",
    country_code="DE",
    region="Hesse",
    region_type="town",
    is_city_state=False,
    capital_of_region=False,
    population=17000,
    population_approx=True,
    coordinates={"lat": 50.0275, "lng": 8.1194},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Hessian",
    english_friendliness="high",
    tagline="Picturesque town in the Rheingau wine region, known for its castle and vineyards",
    known_for=[
        "Historic castle",
        "Vineyards",
        "Riverside promenades",
        "Peaceful study setting",
        "Easy access to Wiesbaden and Frankfurt"
    ],
    industries=[
        "Wine production",
        "Tourism",
        "Education"
    ],
    cost_of_living_tier="moderate",
    expat_friendliness="high",
    international_airport="Frankfurt Airport (FRA)",
    airport_distance_km=40,
    climate={
        "type": "temperate",
        "summers": "warm",
        "winters": "cool",
        "note": "Eltville has a temperate climate with warm summers and cool winters."
    },
    image_url=None,
    tags=["Pharmacy", "graduate", "independent study", "Eltville", "Rheingau"],
    priority=10,
    source_name="UF Eltville Pharmacy program page"
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

osnabruck_city = CityCreate(
    slug="osnabruck",
    name="Osnabrück",
    local_name="Osnabrück",
    country="Germany",
    country_code="DE",
    region="Lower Saxony",
    region_type="federal_state",
    is_city_state=False,
    capital_of_region=False,
    population=170000,
    population_approx=True,
    coordinates={"lat": 52.2799, "lng": 8.0472},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Low German (Plattdeutsch)",
    english_friendliness="high",
    tagline="Historic university town with a vibrant student life and international focus",
    known_for=[
        "Hochschule Osnabrück - University of Applied Sciences",
        "Medieval old town and half-timbered houses",
        "Cultural festivals and international events",
        "Proximity to Hamburg and Amsterdam",
        "Innovative hi-tech and engineering companies"
    ],
    industries=[
        "Agriculture",
        "Engineering",
        "Technology",
        "Food industry",
        "Logistics"
    ],
    cost_of_living_tier="moderate",
    expat_friendliness="high",
    international_airport="Münster Osnabrück International Airport (FMO)",
    airport_distance_km=35,
    climate={
        "type": "temperate",
        "summers": "mild to warm",
        "winters": "cool and overcast",
        "note": "Green inland climate, easy access to forests and outdoor excursions."
    }
)

vallendar_city = CityCreate(
    slug="vallendar",
    name="Vallendar",
    local_name="Vallendar",
    country="Germany",
    country_code="DE",
    region="Rhineland-Palatinate",
    region_type="town",
    is_city_state=False,
    capital_of_region=False,
    population=9000,
    population_approx=True,
    coordinates={"lat": 50.3972, "lng": 7.6172},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Central German",
    english_friendliness="high",
    tagline="Small town in the UNESCO Central Rhine Valley, surrounded by vineyards and historic monuments",
    known_for=[
        "Central Rhine Valley UNESCO World Heritage site",
        "Proximity to Koblenz, Frankfurt, Cologne",
        "Vineyards, river promenades, historic monuments",
        "Picturesque landscape and cozy lanes"
    ],
    industries=[
        "Tourism",
        "Wine production",
        "Education"
    ],
    cost_of_living_tier="moderate",
    expat_friendliness="high",
    international_airport="Frankfurt Airport (FRA)",
    airport_distance_km=110,
    climate={
        "type": "temperate",
        "summers": "warm",
        "winters": "cool",
        "note": "Picturesque river valley climate with mild winters and warm summers."
    }
)


aachen_city = CityCreate(
    slug="aachen",
    name="Aachen",
    local_name="Aachen",
    country="Germany",
    country_code="DE",
    region="North Rhine-Westphalia",
    region_type="city",
    is_city_state=False,
    capital_of_region=False,
    population=245000,
    population_approx=True,
    coordinates={"lat": 50.7753, "lng": 6.0839},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Ripuarian Franconian",
    english_friendliness="high",
    tagline="Westernmost German city, famous for student life, history, and international culture",
    known_for=[
        "RWTH Aachen University",
        "Printen gingerbread",
        "Hot springs",
        "Mardi Gras carnival",
        "Equestrian tournaments",
        "Historic city centre",
        "Proximity to Belgium, Netherlands, Eifel and Ardennes parks"
    ],
    industries=[
        "Education",
        "Engineering",
        "Tourism",
        "Technology"
    ],
    cost_of_living_tier="moderate",
    expat_friendliness="high",
    international_airport="Cologne Bonn Airport (CGN)",
    airport_distance_km=85,
    climate={
        "type": "temperate",
        "summers": "mild to warm",
        "winters": "cool",
        "note": "Border city climate, lively student community, historic and modern mix."
    }
)

lemgo_city = CityCreate(
    slug="lemgo",
    name="Lemgo",
    local_name="Lemgo",
    country="Germany",
    country_code="DE",
    region="North Rhine-Westphalia",
    region_type="district",
    is_city_state=False,
    capital_of_region=False,
    population=41000,
    population_approx=True,
    coordinates={"lat": 52.0401, "lng": 8.7007},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Westphalian",
    english_friendliness="moderate",
    tagline="Historic town in the Lippe district, surrounded by nature and design landmarks",
    known_for=[
        "Technische Hochschule Ostwestfalen-Lippe (TH OWL)",
        "Teutoburg Forest",
        "Schieder See",
        "Externsteine",
        "Bad Salzuflen spa town",
        "Historic architecture and cultural sites"
    ],
    industries=[
        "Education",
        "Design",
        "Tourism",
        "Regional services"
    ],
    cost_of_living_tier="moderate",
    expat_friendliness="moderate",
    international_airport="Paderborn Lippstadt Airport (PAD)",
    airport_distance_km=50,
    climate={
        "type": "temperate",
        "summers": "mild to warm",
        "winters": "cool and overcast",
        "note": "Green inland climate, easy access to forests and outdoor excursions."
    }
)

munich_city = CityCreate(
    slug="munich",
    name="Munich",
    local_name="München",
    country="Germany",
    country_code="DE",
    region="Bavaria",
    region_type="state_capital",
    is_city_state=False,
    capital_of_region=True,
    population=1480000,
    population_approx=True,
    coordinates={"lat": 48.1351, "lng": 11.5820},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Bavarian",
    english_friendliness="high",
    tagline="Safest city in Germany, blending tradition, modernity, nature, and culture",
    known_for=[
        "Munich University of Applied Sciences (HM)",
        "Oktoberfest",
        "Beautiful architecture",
        "Breathtaking nature",
        "Rich cultural and social life",
        "Meeting point of traditional and modern flair"
    ],
    industries=[
        "Education",
        "Engineering",
        "Tourism",
        "Technology",
        "Business"
    ],
    cost_of_living_tier="high",
    expat_friendliness="high",
    international_airport="Munich Airport (MUC)",
    airport_distance_km=30,
    climate={
        "type": "continental",
        "summers": "warm",
        "winters": "cold",
        "note": "Mix of traditional and modern, vibrant student life, and international culture."
    }
)

jena_city = CityCreate(
    slug="jena",
    name="Jena",
    local_name="Jena",
    country="Germany",
    country_code="DE",
    region="Thuringia",
    region_type="city",
    is_city_state=False,
    capital_of_region=False,
    population=110000,
    population_approx=True,
    coordinates={"lat": 50.9271, "lng": 11.5899},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Thuringian",
    english_friendliness="moderate",
    tagline="Historic university city in Thuringia, known for science and vibrant student life",
    known_for=[
        "Friedrich Schiller Universität Jena",
        "Astronomy, Biochemistry, Biology, Chemistry, Geological Sciences, Mathematics, Microbiology, Physics, Statistics",
        "Historic city center",
        "Vibrant student community",
        "Proximity to nature and research institutions"
    ],
    industries=[
        "Education",
        "Science",
        "Research",
        "Tourism"
    ],
    cost_of_living_tier="moderate",
    expat_friendliness="moderate",
    international_airport="Leipzig/Halle Airport (LEJ)",
    airport_distance_km=70,
    climate={
        "type": "continental",
        "summers": "warm",
        "winters": "cold",
        "note": "University city with rich scientific tradition and lively student life."
    }
)

leipzig_city = CityCreate(
    slug="leipzig",
    name="Leipzig",
    local_name="Leipzig",
    country="Germany",
    country_code="DE",
    region="Saxony",
    region_type="city",
    is_city_state=False,
    capital_of_region=False,
    population=620000,
    population_approx=True,
    coordinates={"lat": 51.3397, "lng": 12.3731},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Saxon",
    english_friendliness="moderate",
    tagline="Creative university city known for affordable living, music history, and startup energy",
    known_for=[
        "Leipzig University",
        "Music heritage (Bach, Gewandhaus)",
        "Plagwitz and alternative culture",
        "Strong startup and creative scene",
        "Fast rail links to Berlin and Dresden"
    ],
    industries=["Education", "Technology", "Creative Industries", "Logistics", "Research"],
    cost_of_living_tier="moderate",
    expat_friendliness="high",
    international_airport="Leipzig/Halle Airport (LEJ)",
    airport_distance_km=18,
    climate={
        "type": "temperate",
        "summers": "warm",
        "winters": "cool",
        "note": "Leipzig has four seasons and generally affordable urban living for students."
    }
)

vienna_city = CityCreate(
    slug="vienna",
    name="Vienna",
    local_name="Wien",
    country="Austria",
    country_code="AT",
    region="Vienna",
    region_type="capital_city",
    is_city_state=True,
    capital_of_region=True,
    population=1900000,
    population_approx=True,
    coordinates={"lat": 48.2082, "lng": 16.3738},
    timezone="Europe/Vienna",
    currency="EUR",
    languages_official=["German"],
    dialect="Viennese German",
    english_friendliness="high",
    tagline="Imperial capital blending Baroque streetscapes, art, music, and modern design",
    known_for=[
        "Technische Universität Wien (TU Wien)",
        "Baroque architecture",
        "Imperial palaces",
        "Coffee-house culture",
        "Epicurean and design scenes",
        "Green spaces: Wienerwald, Prater, Donauinsel"
    ],
    industries=[
        "Education",
        "Science",
        "Tourism",
        "Design",
        "Culture"
    ],
    cost_of_living_tier="high",
    expat_friendliness="high",
    international_airport="Vienna International Airport (VIE)",
    airport_distance_km=20,
    climate={
        "type": "continental",
        "summers": "warm",
        "winters": "cold",
        "note": "Imperial city with vibrant culture, excellent infrastructure, and abundant green space."
    }
)

zurich_city = CityCreate(
    slug="zurich",
    name="Zurich",
    local_name="Zürich",
    country="Switzerland",
    country_code="CH",
    region="Canton of Zurich",
    region_type="canton_capital",
    is_city_state=False,
    capital_of_region=True,
    population=435000,
    population_approx=True,
    coordinates={"lat": 47.3769, "lng": 8.5417},
    timezone="Europe/Zurich",
    currency="CHF",
    languages_official=["German"],
    dialect="Swiss German (Züritüütsch)",
    english_friendliness="high",
    tagline="Switzerland's largest city with top public transit, universities, and a high quality of life",
    known_for=[
        "Lake Zurich",
        "Financial center",
        "ETH Zurich and universities",
        "Museums and arts",
        "Gateway to the Alps"
    ],
    industries=[
        "Finance",
        "Technology",
        "Education",
        "Media",
        "Tourism"
    ],
    cost_of_living_tier="very_high",
    expat_friendliness="high",
    international_airport="Zurich Airport (ZRH)",
    airport_distance_km=12,
    climate={
        "type": "temperate",
        "summers": "mild to warm",
        "winters": "cool and often wet",
        "note": "Zurich has four seasons and excellent year-round mobility for students."
    }
)

wurzburg_city = CityCreate(
    slug="wurzburg",
    name="Würzburg",
    local_name="Würzburg",
    country="Germany",
    country_code="DE",
    region="Bavaria",
    region_type="city",
    is_city_state=False,
    capital_of_region=False,
    population=128000,
    population_approx=True,
    coordinates={"lat": 49.7913, "lng": 9.9534},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="Franconian",
    english_friendliness="moderate",
    tagline="Historic Bavarian university city known for wine culture and baroque architecture",
    known_for=[
        "University of Würzburg",
        "Franconian wine region",
        "Baroque architecture",
        "Main River",
        "Romantic Road gateway"
    ],
    industries=["Education", "Tourism", "Wine", "Research"],
    cost_of_living_tier="moderate",
    expat_friendliness="moderate",
    international_airport="Frankfurt Airport (FRA)",
    airport_distance_km=120,
    climate={
        "type": "temperate",
        "summers": "warm",
        "winters": "cool",
        "note": "Würzburg has warm summers and cool winters in a river valley climate."
    }
)

salzburg_city = CityCreate(
    slug="salzburg",
    name="Salzburg",
    local_name="Salzburg",
    country="Austria",
    country_code="AT",
    region="Salzburg",
    region_type="state_capital",
    is_city_state=False,
    capital_of_region=True,
    population=155000,
    population_approx=True,
    coordinates={"lat": 47.8095, "lng": 13.0550},
    timezone="Europe/Vienna",
    currency="EUR",
    languages_official=["German"],
    dialect="Austro-Bavarian",
    english_friendliness="high",
    tagline="Alpine cultural city famous for music, history, and UNESCO heritage",
    known_for=[
        "Mozart",
        "UNESCO old town",
        "Festivals and concerts",
        "Alpine setting",
        "Austrian-German cultural crossroads"
    ],
    industries=["Tourism", "Culture", "Education", "Hospitality"],
    cost_of_living_tier="high",
    expat_friendliness="high",
    international_airport="Salzburg Airport (SZG)",
    airport_distance_km=4,
    climate={
        "type": "continental",
        "summers": "mild to warm",
        "winters": "cold",
        "note": "Salzburg has four distinct seasons and nearby Alpine weather influence."
    }
)
