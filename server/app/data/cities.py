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
    description="Stuttgart is the capital of Baden-Württemberg and Germany's automotive heart, home to Daimler and Porsche. The city seamlessly blends industrial excellence with vibrant cultural offerings, beautiful parks, and a strong international business community. Known for high quality of life, excellent public transport, and access to both wine country and the Swabian Alps.",
    tags=["engineering", "culture", "green spaces", "state capital", "automotive", "business"],
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
    cost_of_living_tier="moderate",
    expat_friendliness="high",
    international_airport="Cologne Bonn Airport (CGN)",
    airport_distance_km=26,
    description=(
        "The birthplace of Beethoven, Bonn is a lively academic town and cultural center on the picturesque Rhine River. "
        "Bonn is a leading research university and one of Europe's most important institutions of higher education, with alumni including five Nobel Prize winners. "
        "The city is known for its festivals, museums, and proximity to Cologne and Düsseldorf."
    ),
    tags=["university", "culture", "Beethoven", "Rhine", "research", "festivals", "museums"],
    priority=8,
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
    image_url=None,
    description="Mannheim is an energetic and dynamic city at the confluence of the Rhine and Neckar Rivers in Baden-Württemberg. Home to the prestigious University of Mannheim, the city is known for its distinctive grid-pattern city center, stunning Baroque palace (Schloss), and vibrant cultural and commercial scene. A major trade hub with strong international business connections, Mannheim balances academic excellence with urban vitality and cultural richness.",
    tags=["university", "business", "Baroque palace", "Rhine", "exchange", "commerce", "culture"],
    priority=9,
    source_name="UF Mannheim program page"
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
    image_url=None,
    description="Hamburg is Germany's gateway to the world, a major port city with vibrant culture, canals, and maritime heritage.",
    tags=["port", "maritime", "culture", "canals", "gateway", "exchange"],
    priority=8,
    source_name="UF Hamburg program page"
)

ebs_city = CityCreate(
    slug="ebs",
    name="Wiesbaden",
    local_name="Wiesbaden",
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
    description="EBS Universität für Wirtschaft und Recht is a leading private university split between Wiesbaden and Oestrich-Winkel in the Rheingau wine region. EBS is known for its rigorous business and law programs, strong international network, and high-quality executive education. Located in Germany's cultural heartland, it offers a unique blend of academic excellence and access to the picturesque Rhine Valley.",
    tags=["business", "law", "graduate", "exchange", "Wiesbaden", "Oestrich-Winkel", "Rheingau", "private university"],
    priority=9,
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
    description="Eltville am Rhein is a picturesque town nestled in the UNESCO-protected Rheingau wine region along the Rhine River. Known for its medieval castle, award-winning vineyards, and peaceful riverside setting, Eltville offers an ideal environment for pharmacy students seeking a combination of rigorous academics and serene natural beauty. The town balances authentic German charm with accessibility to major cities like Wiesbaden and Frankfurt.",
    tags=["Pharmacy", "graduate", "independent study", "Eltville", "Rheingau", "wine region", "Rhine"],
    priority=8,
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
    },
    image_url=None,
    description="Berlin is a dynamic capital city of history, culture, art, innovation, and vibrant nightlife. A major study abroad destination with world-class museums and international student community.",
    tags=["history", "art", "innovation", "culture", "exchange", "CLAS", "science"],
    priority=9,
    source_name="UF Berlin programs page"
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
    airport_distance_km=40,
    climate={
        "type": "temperate",
        "summers": "mild to warm",
        "winters": "cool and overcast",
        "note": "Green inland climate with easy access to forests and outdoor excursions."
    },
    image_url=None,
    description="Detmold is a smaller German university town surrounded by nature, architecture, and regional history. Home to design and architecture education programs.",
    tags=["design", "architecture", "nature", "exchange", "construction"],
    priority=7,
    source_name="UF Detmold program page"
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
    },
    image_url=None,
    description="Osnabrück is a historic university town with vibrant student life, cultural festivals, and strong international connections. Gateway to nature and innovation.",
    tags=["historic", "student life", "international", "exchange", "engineering"],
    priority=7,
    source_name="UF Osnabrück program page"
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
    },
    image_url=None,
    description="Vallendar is a small town in the UNESCO Central Rhine Valley, surrounded by vineyards and historic monuments. Ideal for business and international studies.",
    tags=["wine region", "Rhine valley", "UNESCO", "exchange", "business"],
    priority=7,
    source_name="UF Vallendar program page"
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
    },
    image_url=None,
    description="Aachen is the westernmost German city, famous for student life, rich history, and international culture. Home to renowned engineering programs.",
    tags=["border city", "engineering", "international", "exchange", "RWTH"],
    priority=8,
    source_name="UF Aachen program page"
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
    },
    description="Lemgo is a historic town in the Lippe district of North Rhine-Westphalia, home to Technische Hochschule Ostwestfalen-Lippe (TH OWL). Surrounded by natural beauty including the Teutoburg Forest, scenic lakes like Schieder See, and the dramatic rock formations of Externsteine, Lemgo is an ideal setting for interior design and creative studies. The town offers a peaceful, nature-focused environment while maintaining excellent connections to larger cities.",
    tags=["design", "interior design", "TH OWL", "exchange", "Teutoburg Forest", "nature"],
    priority=7,
    source_name="UF Lemgo program page"
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
    },
    image_url=None,
    description="Munich is one of Germany's safest and most beautiful cities, blending tradition with modernity, nature with culture. A premier study abroad destination with excellent universities.",
    tags=["Oktoberfest", "engineering", "culture", "exchange", "Global E3", "pharmacy"],
    priority=9,
    source_name="UF Munich programs page"
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
    },
    image_url=None,
    description="Jena is a historic university city in Thuringia, known for science research and vibrant student community. Gateway to nature and intellectual engagement.",
    tags=["science", "research", "historic", "exchange", "TASSEP"],
    priority=7,
    source_name="UF Jena program page"
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
    },
    image_url=None,
    description="Vienna is an imperial capital blending Baroque architecture, world-class art, classical music heritage, and modern design. A major hub for international study abroad programs.",
    tags=["imperial", "culture", "music", "exchange", "science", "TASSEP"],
    priority=9,
    source_name="UF Vienna programs page"
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
    dialect="Upper Saxon",
    english_friendliness="moderate",
    tagline="Dynamic city of music, culture, and creativity in Saxony",
    known_for=[
        "Universität Leipzig",
        "Bach and classical music heritage",
        "Peaceful Revolution of 1989",
        "Thriving arts and creative scene",
        "Affordable cost of living",
        "Spinnerei arts district"
    ],
    industries=[
        "Education",
        "Culture",
        "Media",
        "IT and Technology",
        "Automotive",
        "Tourism"
    ],
    cost_of_living_tier="low",
    expat_friendliness="moderate",
    international_airport="Leipzig/Halle Airport (LEJ)",
    airport_distance_km=18,
    climate={
        "type": "continental",
        "summers": "warm",
        "winters": "cold",
        "note": "Leipzig has a continental climate with warm summers and cold, snowy winters."
    },
    image_url=None,
    description="Leipzig is a dynamic city of music, culture, and creativity in Saxony. Known for Bach heritage, affordable living, and vibrant student scene.",
    tags=["music", "culture", "affordable", "history", "arts"],
    priority=8,
    source_name="General Leipzig info"
)

zurich_city = CityCreate(
    slug="zurich",
    name="Zurich",
    local_name="Zürich",
    country="Switzerland",
    country_code="CH",
    region="Zürich",
    region_type="canton_capital",
    is_city_state=False,
    capital_of_region=True,
    population=435000,
    population_approx=True,
    coordinates={"lat": 47.3769, "lng": 8.5417},
    timezone="Europe/Zurich",
    currency="CHF",
    languages_official=["German"],
    dialect="Züritüütsch (Swiss German)",
    english_friendliness="high",
    tagline="Switzerland's largest city, blending medieval charm with modern sophistication at the foot of the Alps",
    known_for=[
        "Financial capital of Switzerland",
        "ETH Zürich and University of Zurich",
        "Lake Zurich and Alpine scenery",
        "Old Town (Altstadt)",
        "World-class museums and galleries",
        "High quality of life"
    ],
    industries=[
        "Finance and Banking",
        "Technology",
        "Education",
        "Tourism",
        "Life Sciences"
    ],
    cost_of_living_tier="very high",
    expat_friendliness="high",
    international_airport="Zurich Airport (ZRH)",
    airport_distance_km=11,
    climate={
        "type": "temperate oceanic",
        "summers": "warm",
        "winters": "cold",
        "note": "Zurich has a temperate climate with warm summers and cold winters. Snow is common in winter months."
    },
    image_url=None,
    description="Zurich is Switzerland's largest city, a financial and cultural hub blending medieval charm with modern sophistication at the foot of the Alps.",
    tags=["finance", "Alps", "culture", "exchange", "technology"],
    priority=9,
    source_name="UF Zurich program page"
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
    tagline="Birthplace of Mozart, Baroque masterpiece at the Austrian-German border",
    known_for=[
        "Mozart's birthplace",
        "Baroque architecture",
        "The Sound of Music",
        "Salzburg Festival",
        "Hohensalzburg Fortress",
        "Alpine scenery and proximity to German border"
    ],
    industries=[
        "Tourism",
        "Culture",
        "Education",
        "Music"
    ],
    cost_of_living_tier="high",
    expat_friendliness="high",
    international_airport="Salzburg Airport (SZG)",
    airport_distance_km=4,
    climate={
        "type": "oceanic",
        "summers": "warm",
        "winters": "cold",
        "note": "Salzburg has a temperate oceanic climate with warm summers and cold, snowy winters. The Alps influence weather patterns."
    },
    image_url=None,
    description="Salzburg is the birthplace of Mozart and a Baroque masterpiece at the Austrian-German border. A premier destination for music, culture, and business studies.",
    tags=["Mozart", "Baroque", "music", "exchange", "Alps"],
    priority=9,
    source_name="UF Salzburg programs page"
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
    population=130000,
    population_approx=True,
    coordinates={"lat": 49.7913, "lng": 9.9534},
    timezone="Europe/Berlin",
    currency="EUR",
    languages_official=["German"],
    dialect="East Franconian",
    english_friendliness="moderate",
    tagline="Baroque university city on the Main River, gateway to Bavaria's Romantic Road",
    known_for=[
        "Universität Würzburg",
        "Würzburg Residence (UNESCO World Heritage)",
        "Franconian wine",
        "Romantic Road starting point",
        "Baroque architecture",
        "Main River promenade"
    ],
    industries=[
        "Education",
        "Wine production",
        "Tourism",
        "Healthcare",
        "Research"
    ],
    cost_of_living_tier="moderate",
    expat_friendliness="moderate",
    international_airport="Frankfurt Airport (FRA)",
    airport_distance_km=120,
    climate={
        "type": "continental",
        "summers": "warm",
        "winters": "cold",
        "note": "Würzburg has a continental climate with warm summers and cold winters. The Main River valley provides a mild microclimate for viticulture."
    },
    image_url=None,
    description="Würzburg is a Baroque university city on the Main River and gateway to Bavaria's Romantic Road. Known for wine, history, and research excellence.",
    tags=["Baroque", "wine", "Romantic Road", "exchange", "TASSEP"],
    priority=8,
    source_name="UF Würzburg program page"
)

bern_city = CityCreate(
    slug="bern",
    name="Bern",
    local_name="Bern",
    country="Switzerland",
    country_code="CH",
    region="Bern",
    region_type="capital_city",
    is_city_state=False,
    capital_of_region=True,
    population=140000,
    population_approx=True,
    coordinates={"lat": 46.9480, "lng": 7.4474},
    timezone="Europe/Zurich",
    currency="CHF",
    languages_official=["German", "French"],
    dialect="Bärndütsch (Bernese German)",
    english_friendliness="high",
    tagline="Switzerland's capital, a UNESCO World Heritage medieval gem near the French-German language border",
    known_for=[
        "University of Bern",
        "UNESCO World Heritage old town",
        "Albert Einstein's professorship",
        "Berner Oberland and Alps",
        "Federal Palace (Bundeshaus)",
        "Aare River swimming",
        "Bear Park (Bärengraben)"
    ],
    industries=[
        "Government",
        "Education",
        "Tourism",
        "Research",
        "International organizations"
    ],
    cost_of_living_tier="very high",
    expat_friendliness="high",
    international_airport="Bern Airport (BRN) / Zurich Airport (ZRH)",
    airport_distance_km=9,
    climate={
        "type": "temperate oceanic",
        "summers": "warm",
        "winters": "cold",
        "note": "Bern has a temperate climate with warm summers and cold winters. The Berner Oberland and Alps are about an hour away by train."
    },
    image_url=None,
    description="Bern is Switzerland's capital, a UNESCO World Heritage medieval gem near the French-German language border. Premier destination for international exchange students.",
    tags=["UNESCO", "medieval", "capital", "exchange", "Alps"],
    priority=9,
    source_name="UF Bern program page"
)

rapperswil_city = CityCreate(
    slug="rapperswil",
    name="Rapperswil-Jona",
    local_name="Rapperswil-Jona",
    country="Switzerland",
    country_code="CH",
    region="St. Gallen",
    region_type="municipality",
    is_city_state=False,
    capital_of_region=False,
    population=27000,
    population_approx=True,
    coordinates={"lat": 47.2266, "lng": 8.8184},
    timezone="Europe/Zurich",
    currency="CHF",
    languages_official=["German"],
    dialect="Swiss German",
    english_friendliness="high",
    tagline="Mediterranean-feeling lakeside town on Lake Zurich, 30 minutes from Zurich city",
    known_for=[
        "Eastern Switzerland University of Applied Sciences (OST)",
        "Lake Zurich waterfront",
        "Rapperswil Castle",
        "Rose gardens",
        "Proximity to Zurich and the Alps",
        "Mediterranean holiday atmosphere"
    ],
    industries=[
        "Education",
        "Technology",
        "Tourism"
    ],
    cost_of_living_tier="very high",
    expat_friendliness="high",
    international_airport="Zurich Airport (ZRH)",
    airport_distance_km=40,
    climate={
        "type": "temperate oceanic",
        "summers": "warm",
        "winters": "cold",
        "note": "Rapperswil enjoys a mild lakeside climate with warm summers and cold winters. Close to mountains for hiking and skiing."
    },
    image_url=None,
    description="Rapperswil-Jona is a Mediterranean-feeling lakeside town on Lake Zurich, 30 minutes from Zurich city. Home to OST engineering programs.",
    tags=["lakeside", "Mediterranean", "exchange", "engineering", "OST"],
    priority=8,
    source_name="UF Rapperswil program page"
)

winterthur_city = CityCreate(
    slug="winterthur",
    name="Winterthur",
    local_name="Winterthur",
    country="Switzerland",
    country_code="CH",
    region="Zürich",
    region_type="city",
    is_city_state=False,
    capital_of_region=False,
    population=115000,
    population_approx=True,
    coordinates={"lat": 47.5001, "lng": 8.7240},
    timezone="Europe/Zurich",
    currency="CHF",
    languages_official=["German"],
    dialect="Züritüütsch (Swiss German)",
    english_friendliness="high",
    tagline="Vibrant Swiss city near Zurich, home to ZHAW School of Engineering and world-class museums",
    known_for=[
        "ZHAW Zurich University of Applied Sciences",
        "Oskar Reinhart art collections",
        "Technorama science center",
        "Old town and cultural scene",
        "Proximity to Zurich (20 min by train)",
        "Green spaces and surrounding vineyards"
    ],
    industries=[
        "Education",
        "Engineering",
        "Technology",
        "Culture",
        "Insurance"
    ],
    cost_of_living_tier="very high",
    expat_friendliness="high",
    international_airport="Zurich Airport (ZRH)",
    airport_distance_km=12,
    climate={
        "type": "temperate oceanic",
        "summers": "warm",
        "winters": "cold",
        "note": "Winterthur has a temperate climate similar to Zurich, with warm summers and cold winters. Snow is common in winter months."
    },
    image_url=None,
    description="Winterthur is a vibrant Swiss city near Zurich, home to ZHAW School of Engineering and world-class museums. Perfect for engineering and design studies.",
    tags=["engineering", "design", "culture", "exchange", "ZHAW"],
    priority=8,
    source_name="UF Winterthur program page"
)

graz_city = CityCreate(
    slug="graz",
    name="Graz",
    local_name="Graz",
    country="Austria",
    country_code="AT",
    region="Styria",
    region_type="state_capital",
    is_city_state=False,
    capital_of_region=True,
    population=290000,
    population_approx=True,
    coordinates={"lat": 47.0707, "lng": 15.4395},
    timezone="Europe/Vienna",
    currency="EUR",
    languages_official=["German"],
    dialect="Steirisch (Styrian)",
    english_friendliness="high",
    tagline="Austria's second city — a UNESCO World Heritage student hub with Alpine charm",
    known_for=[
        "UNESCO World Heritage old town",
        "University of Graz",
        "Schlossberg clock tower",
        "Kunsthaus Graz (Friendly Alien)",
        "Affordable student living",
        "Gateway to the Alps"
    ],
    industries=[
        "Education",
        "Technology",
        "Automotive",
        "Culture",
        "Tourism"
    ],
    cost_of_living_tier="medium",
    expat_friendliness="high",
    international_airport="Graz Airport (GRZ)",
    airport_distance_km=10,
    climate={
        "type": "temperate continental",
        "summers": "warm",
        "winters": "cold",
        "note": "Graz has a continental climate with warm summers and cold winters. It is one of Austria's sunniest cities."
    },
    image_url=None,
    description="Graz is Austria's second-largest city and a UNESCO World Heritage site, known for its Renaissance old town, vibrant student culture, and affordable living. Home to the University of Graz and TU Graz, it's a fantastic study abroad destination with Alpine access and a lively arts scene.",
    tags=["UNESCO", "student city", "affordable", "Alpine", "culture", "exchange"],
    priority=9,
    source_name="University of Graz / General info"
)