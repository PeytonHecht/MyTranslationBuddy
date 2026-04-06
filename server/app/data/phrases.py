"""
German phrase library data organized by category and regional dialects.
Study abroad phrases for students in German-speaking countries.
"""

from app.schemas.phrase import PhraseCreate, PhraseCategory, PhraseRegister

# ============================================================================
# ACADEMIC PHRASES - University and classroom interactions
# ============================================================================

academic_phrases = [
    PhraseCreate(
        german_phrase="Entschuldigung, könnten Sie das bitte wiederholen?",
        english_translation="Excuse me, could you please repeat that?",
        pronunciation="En-SHOOL-dee-goong, KUN-ten zee dahs BIT-te VEE-der-hoh-len?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="When you don't understand the professor in class",
        example_sentence="Der Professor erklärt schnell. Entschuldigung, könnten Sie das bitte wiederholen?",
        difficulty_level=2,
        tags=["classroom", "university", "learning"]
    ),
    PhraseCreate(
        german_phrase="Ich verstehe das nicht.",
        english_translation="I don't understand that.",
        pronunciation="Eekh fer-SHTAH-eh dahs neekht.",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg", "aachen"],
        usage_context="General expression of not understanding something",
        example_sentence="Der Text ist zu kompliziert. Ich verstehe das nicht.",
        difficulty_level=1,
        tags=["comprehension", "confusion"]
    ),
    PhraseCreate(
        german_phrase="Können Sie mir helfen?",
        english_translation="Can you help me?",
        pronunciation="KUN-nen zee meer HEL-fen?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Asking a professor or teaching assistant for help",
        example_sentence="Ich habe ein Problem mit der Aufgabe. Können Sie mir helfen?",
        difficulty_level=1,
        tags=["asking_for_help", "assistance"]
    ),
    PhraseCreate(
        german_phrase="Wo ist die Bibliothek?",
        english_translation="Where is the library?",
        pronunciation="Voh ist dee bib-lee-oh-TAPE-k?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "aachen", "hamburg"],
        usage_context="Asking for directions to the university library",
        example_sentence="Ich muss Bücher für mein Projekt finden. Wo ist die Bibliothek?",
        difficulty_level=1,
        tags=["directions", "campus", "studying"]
    ),
    PhraseCreate(
        german_phrase="Wann sind deine Sprechstunden?",
        english_translation="When are your office hours?",
        pronunciation="Vahn zine DINE-eh SHPRECK-shtoon-den?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Asking a professor when they're available to meet",
        example_sentence="Ich hätte gerne eine Frage. Wann sind deine Sprechstunden?",
        difficulty_level=2,
        tags=["meeting", "professor", "appointment"]
    ),
]

# ============================================================================
# HOUSING PHRASES - Apartment hunting and living arrangements
# ============================================================================

housing_phrases = [
    PhraseCreate(
        german_phrase="Ich suche eine Wohnung.",
        english_translation="I'm looking for an apartment.",
        pronunciation="Eekh ZOO-khe eye-neh VOH-noong.",
        category=PhraseCategory.HOUSING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg", "aachen"],
        usage_context="When inquiring about available apartments or housing",
        example_sentence="Ich bin neu hier und ich suche eine Wohnung.",
        difficulty_level=1,
        tags=["apartment", "housing", "accommodation"]
    ),
    PhraseCreate(
        german_phrase="Wie viel kostet die Miete pro Monat?",
        english_translation="How much is the rent per month?",
        pronunciation="Vee feel KOS-tet dee MEET-eh proh MOH-naht?",
        category=PhraseCategory.HOUSING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Asking about monthly rent costs when apartment hunting",
        example_sentence="Die Wohnung sieht schön aus. Wie viel kostet die Miete pro Monat?",
        difficulty_level=1,
        tags=["rent", "money", "cost"]
    ),
    PhraseCreate(
        german_phrase="Sind Nebenkosten im Preis enthalten?",
        english_translation="Are utilities included in the price?",
        pronunciation="Zint NAY-ben-KOS-ten im PRICE en-HAHL-ten?",
        category=PhraseCategory.HOUSING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Clarifying what expenses are covered in rent",
        example_sentence="Das ist eine gute Wohnung. Sind Nebenkosten im Preis enthalten?",
        difficulty_level=2,
        tags=["expenses", "utilities", "costs"]
    ),
    PhraseCreate(
        german_phrase="Der Vermieter ist sehr nett.",
        english_translation="The landlord is very nice.",
        pronunciation="Der fer-MITE-er ist zehr net.",
        category=PhraseCategory.HOUSING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Describing your landlord's personality",
        example_sentence="Ich bin froh über meine neue Wohnung. Der Vermieter ist sehr nett.",
        difficulty_level=1,
        tags=["landlord", "relationship", "positive"]
    ),
    PhraseCreate(
        german_phrase="Es gibt ein Problem mit der Heizung.",
        english_translation="There's a problem with the heating.",
        pronunciation="Es gibt ein PROH-blem mit der HEIGHTS-oong.",
        category=PhraseCategory.HOUSING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg", "aachen"],
        usage_context="Reporting a maintenance issue to your landlord",
        example_sentence="Es ist sehr kalt in meinem Zimmer. Es gibt ein Problem mit der Heizung.",
        difficulty_level=2,
        tags=["maintenance", "problem", "repair"]
    ),
]

# ============================================================================
# DINING PHRASES - Restaurants, ordering food, and eating out
# ============================================================================

dining_phrases = [
    PhraseCreate(
        german_phrase="Ein Tisch für zwei Personen, bitte.",
        english_translation="A table for two people, please.",
        pronunciation="Eye-n TISH foo-r TSVYE PER-zoh-nen, BIT-teh.",
        category=PhraseCategory.DINING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Requesting a table at a restaurant",
        example_sentence="Guten Tag! Ein Tisch für zwei Personen, bitte.",
        difficulty_level=1,
        tags=["restaurant", "seating", "service"]
    ),
    PhraseCreate(
        german_phrase="Was empfehlen Sie?",
        english_translation="What do you recommend?",
        pronunciation="Vahs em-FAHL-len zee?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg", "aachen"],
        usage_context="Asking the waiter for menu recommendations",
        example_sentence="Die Karte ist sehr groß. Was empfehlen Sie?",
        difficulty_level=1,
        tags=["menu", "recommendations", "ordering"]
    ),
    PhraseCreate(
        german_phrase="Ich bin Vegetarier/in.",
        english_translation="I'm a vegetarian.",
        pronunciation="Eekh bin Veg-eh-TAHR-ee-er/in.",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Informing restaurant staff of dietary restrictions",
        example_sentence="Ich bin Vegetarier. Haben Sie vegetarische Optionen?",
        difficulty_level=1,
        tags=["dietary", "restrictions", "food"]
    ),
    PhraseCreate(
        german_phrase="Die Rechnung, bitte.",
        english_translation="The bill, please.",
        pronunciation="Dee RECK-noong, BIT-teh.",
        category=PhraseCategory.DINING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Asking for the bill at the end of a meal",
        example_sentence="Das Essen war sehr lecker. Die Rechnung, bitte.",
        difficulty_level=1,
        tags=["payment", "bill", "service"]
    ),
    PhraseCreate(
        german_phrase="Das schmeckt fantastisch!",
        english_translation="This tastes fantastic!",
        pronunciation="Dahs SHMEKT fan-TAHS-tish!",
        category=PhraseCategory.DINING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Complimenting the food at a restaurant",
        example_sentence="Das Schnitzel ist perfekt! Das schmeckt fantastisch!",
        difficulty_level=1,
        tags=["compliments", "food", "positive"]
    ),
]

# ============================================================================
# TRANSPORTATION PHRASES - Getting around the city
# ============================================================================

transportation_phrases = [
    PhraseCreate(
        german_phrase="Wo ist die nächste U-Bahn-Station?",
        english_translation="Where is the nearest subway station?",
        pronunciation="Voh ist dee NACE-teh OO-bahn-stah-tsee-OHN?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Asking for directions to the U-Bahn (subway)",
        example_sentence="Ich bin verloren. Wo ist die nächste U-Bahn-Station?",
        difficulty_level=1,
        tags=["directions", "transport", "subway"]
    ),
    PhraseCreate(
        german_phrase="Eine Fahrkarte zum Zentrum, bitte.",
        english_translation="A ticket to the city center, please.",
        pronunciation="Eye-neh FAHR-kahr-teh toom TSEN-troom, BIT-teh.",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Buying a public transport ticket",
        example_sentence="Ich möchte zum Zentrum fahren. Eine Fahrkarte zum Zentrum, bitte.",
        difficulty_level=1,
        tags=["tickets", "transport", "payment"]
    ),
    PhraseCreate(
        german_phrase="Wie lange dauert die Fahrt?",
        english_translation="How long does the trip take?",
        pronunciation="Vee LAHNG-eh DOW-ert dee FAHRT?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Asking about travel time",
        example_sentence="Ich muss zum Flughafen. Wie lange dauert die Fahrt?",
        difficulty_level=1,
        tags=["time", "duration", "travel"]
    ),
    PhraseCreate(
        german_phrase="Entschuldigung, muss ich hier aussteigen?",
        english_translation="Excuse me, do I need to get off here?",
        pronunciation="En-SHOOL-dee-goong, moos eekh heer OWS-shtigh-gen?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Asking someone for confirmation of your stop",
        example_sentence="Der Bus ist voll. Entschuldigung, muss ich hier aussteigen?",
        difficulty_level=2,
        tags=["buses", "stops", "confirmation"]
    ),
    PhraseCreate(
        german_phrase="Das Taxi ist zu teuer.",
        english_translation="The taxi is too expensive.",
        pronunciation="Dahs TAHK-see ist tsoo TOY-rer.",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Commenting on taxi prices",
        example_sentence="Ich nehme lieber die U-Bahn. Das Taxi ist zu teuer.",
        difficulty_level=1,
        tags=["taxis", "cost", "complaint"]
    ),
]

# ============================================================================
# HEALTH & EMERGENCY PHRASES - Medical situations and emergencies
# ============================================================================

health_phrases = [
    PhraseCreate(
        german_phrase="Ich brauche einen Arzt.",
        english_translation="I need a doctor.",
        pronunciation="Eekh BROW-kheh eye-nen AHRTS.",
        category=PhraseCategory.HEALTH,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg", "aachen"],
        usage_context="When you need medical help",
        example_sentence="Mir geht es nicht gut. Ich brauche einen Arzt.",
        difficulty_level=1,
        tags=["emergency", "medical", "health"]
    ),
    PhraseCreate(
        german_phrase="Ich habe Kopfschmerzen.",
        english_translation="I have a headache.",
        pronunciation="Eekh HAH-beh KOPF-shmert-zen.",
        category=PhraseCategory.HEALTH,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Describing a symptom to a doctor",
        example_sentence="Ich fühle mich nicht wohl. Ich habe Kopfschmerzen.",
        difficulty_level=1,
        tags=["symptoms", "pain", "medical"]
    ),
    PhraseCreate(
        german_phrase="Wo ist das nächste Krankenhaus?",
        english_translation="Where is the nearest hospital?",
        pronunciation="Voh ist dahs NACE-teh KRAHN-ken-howss?",
        category=PhraseCategory.HEALTH,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Finding a hospital in an emergency",
        example_sentence="Mein Freund ist verletzt. Wo ist das nächste Krankenhaus?",
        difficulty_level=2,
        tags=["emergency", "hospital", "directions"]
    ),
    PhraseCreate(
        german_phrase="Notfall! Rufen Sie den Krankenwagen!",
        english_translation="Emergency! Call an ambulance!",
        pronunciation="NOT-fahl! ROO-fen zee den KRAHN-ken-vah-gen!",
        category=PhraseCategory.EMERGENCY,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="In a serious emergency situation",
        example_sentence="Ein Auto hat eine Person getroffen! Notfall! Rufen Sie den Krankenwagen!",
        difficulty_level=1,
        tags=["emergency", "critical", "ambulance"]
    ),
]

# ============================================================================
# GREETINGS & SOCIAL PHRASES - Basic interactions and politeness
# ============================================================================

greeting_phrases = [
    PhraseCreate(
        german_phrase="Guten Morgen!",
        english_translation="Good morning!",
        pronunciation="GOO-ten MOR-gen!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Greeting someone in the morning",
        example_sentence="Guten Morgen! Wie geht es dir heute?",
        difficulty_level=1,
        tags=["greetings", "politeness", "morning"]
    ),
    PhraseCreate(
        german_phrase="Wie geht es dir?",
        english_translation="How are you?",
        pronunciation="Vee GATE es deer?",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Casual greeting to someone you know",
        example_sentence="Hallo! Wie geht es dir?",
        difficulty_level=1,
        tags=["greetings", "casual", "greeting"]
    ),
    PhraseCreate(
        german_phrase="Freut mich, dich kennenzulernen.",
        english_translation="Nice to meet you.",
        pronunciation="FROIT meekh, deekh KEN-nen-tsoo-LAIR-nen.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="When meeting someone for the first time",
        example_sentence="Das ist mein Freund Max. Freut mich, dich kennenzulernen.",
        difficulty_level=1,
        tags=["introductions", "social", "formal"]
    ),
    PhraseCreate(
        german_phrase="Entschuldigung!",
        english_translation="Excuse me! / Sorry!",
        pronunciation="En-SHOOL-dee-goong!",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Getting someone's attention or apologizing",
        example_sentence="Entschuldigung! Können Sie mir helfen?",
        difficulty_level=1,
        tags=["politeness", "apology", "attention"]
    ),
    PhraseCreate(
        german_phrase="Danke dir!",
        english_translation="Thanks to you!",
        pronunciation="DAHN-keh deer!",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Thanking someone informally",
        example_sentence="Du hast mir sehr geholfen. Danke dir!",
        difficulty_level=1,
        tags=["gratitude", "politeness", "thanks"]
    ),
]


# ============================================================================
# DAILY LIFE / ADMIN PHRASES - High-value production phrases for student needs
# ============================================================================

daily_life_phrases = [
    PhraseCreate(
        german_phrase="Ich brauche eine Meldebescheinigung.",
        english_translation="I need a registration certificate.",
        pronunciation="Eekh BROW-kheh EYE-neh MEL-deh-beh-SHY-nee-goong.",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "stuttgart", "bonn", "mannheim", "osnabruck", "jena", "vienna"],
        usage_context="At city offices when handling residency registration paperwork",
        contextual_note="This is commonly needed for enrollment, bank setup, and visa paperwork.",
        difficulty_level=3,
        tags=["bureaucracy", "registration", "documents", "student_setup"]
    ),
    PhraseCreate(
        german_phrase="Ich möchte ein deutsches Bankkonto eröffnen.",
        english_translation="I would like to open a German bank account.",
        pronunciation="Eekh MURSH-teh ine DOY-ches BANK-kohn-toh er-UFF-nen.",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "stuttgart", "aachen", "mannheim", "bonn", "vienna"],
        usage_context="At a bank when setting up local finances",
        contextual_note="Bring your passport and address registration if requested.",
        difficulty_level=3,
        tags=["banking", "money", "student_setup"]
    ),
    PhraseCreate(
        german_phrase="Gibt es hier WLAN für Studierende?",
        english_translation="Is there Wi-Fi here for students?",
        pronunciation="Gibt es heer VEE-lahn fur shtoo-DEE-ren-deh?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "aachen", "lemgo", "detmold", "osnabruck", "jena", "vienna"],
        usage_context="At libraries, campus buildings, and student housing",
        difficulty_level=2,
        tags=["internet", "campus", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Ich brauche einen Termin bei der Ausländerbehörde.",
        english_translation="I need an appointment at the foreigners' office.",
        pronunciation="Eekh BROW-kheh EYE-nen ter-MEEN bye der OWS-len-der-beh-HUR-deh.",
        category=PhraseCategory.EMERGENCY,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "stuttgart", "mannheim", "bonn", "osnabruck", "jena", "aachen", "vienna"],
        usage_context="When arranging visa or residence permit appointments",
        contextual_note="Critical phrase for non-EU students during onboarding.",
        difficulty_level=4,
        tags=["visa", "immigration", "bureaucracy", "appointments"]
    ),
    PhraseCreate(
        german_phrase="Können Sie mir beim Semesterticket helfen?",
        english_translation="Can you help me with the semester ticket?",
        pronunciation="KUN-nen zee meer bym zeh-MES-ter-tik-et HEL-fen?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "stuttgart", "osnabruck", "aachen", "lemgo", "jena", "mannheim", "bonn"],
        usage_context="At student service offices to understand local transport access",
        difficulty_level=2,
        tags=["transport", "university", "ticket", "student_services"]
    ),
    PhraseCreate(
        german_phrase="Ich habe eine Allergie gegen Nüsse.",
        english_translation="I have a nut allergy.",
        pronunciation="Eekh HAH-beh EYE-neh ah-ler-GEE geh-gen NU-seh.",
        category=PhraseCategory.HEALTH,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "stuttgart", "vienna", "bonn", "mannheim", "aachen"],
        usage_context="In restaurants, cafeterias, or medical situations",
        difficulty_level=2,
        tags=["health", "allergy", "food_safety"]
    ),
]


# ============================================================================
# REGIONAL / LOCAL PHRASES - Dialect-aware support per study-abroad city
# ============================================================================

regional_city_phrases = [
    PhraseCreate(
        german_phrase="Grüß Gott!",
        english_translation="Hello! (Southern German/Austrian greeting)",
        pronunciation="Groos got!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.FORMAL,
        city_slugs=["stuttgart", "munich", "vienna"],
        dialect_name="Southern German / Austrian",
        usage_context="Common greeting in southern regions and Austria",
        cultural_note="More regionally natural than 'Guten Tag' in southern contexts.",
        difficulty_level=1,
        tags=["regional", "greeting", "southern_german", "austrian_german"]
    ),
    PhraseCreate(
        german_phrase="Moin!",
        english_translation="Hi! (Northern German greeting)",
        pronunciation="Moyn!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["hamburg", "osnabruck"],
        dialect_name="Northern German",
        usage_context="Everyday casual greeting in northern Germany",
        cultural_note="Used throughout the day, not only in the morning.",
        difficulty_level=1,
        tags=["regional", "greeting", "northern_german"]
    ),
    PhraseCreate(
        german_phrase="Ei gude, wie?",
        english_translation="Hey there, how's it going? (Hessian)",
        pronunciation="Eye GOO-deh, vee?",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["ebs", "eltville"],
        dialect_name="Hessian",
        usage_context="Friendly informal greeting around the Rhine-Main area",
        difficulty_level=3,
        tags=["regional", "hessian", "greeting"]
    ),
    PhraseCreate(
        german_phrase="Alla hopp!",
        english_translation="Let's go!/Come on! (Palatinate region)",
        pronunciation="AH-lah hop!",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["mannheim"],
        dialect_name="Kurpfälzisch / Palatinate",
        usage_context="Motivating expression common in southwest regional speech",
        difficulty_level=2,
        tags=["regional", "mannheim", "motivation"]
    ),
    PhraseCreate(
        german_phrase="Dat is jut so.",
        english_translation="That's good like that. (Berlin colloquial)",
        pronunciation="Daht is yoot zoh.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin"],
        dialect_name="Berlin colloquial",
        usage_context="Local casual speech in Berlin conversations",
        contextual_note="Learners should usually reply in standard German but can recognize this.",
        difficulty_level=4,
        tags=["regional", "berlin", "colloquial"]
    ),
    PhraseCreate(
        german_phrase="Tschö!",
        english_translation="Bye! (Rhineland-style farewell)",
        pronunciation="Chur!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["bonn", "aachen", "vallendar"],
        dialect_name="Rhineland",
        usage_context="Very common informal goodbye in western Germany",
        difficulty_level=1,
        tags=["regional", "farewell", "rheinland"]
    ),
    PhraseCreate(
        german_phrase="Nu?",
        english_translation="So?/What's up? (Thuringian colloquial)",
        pronunciation="Noo?",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["jena"],
        dialect_name="Thuringian colloquial",
        usage_context="Short local conversational opener in Thuringia",
        difficulty_level=3,
        tags=["regional", "jena", "small_talk"]
    ),
    PhraseCreate(
        german_phrase="Servus!",
        english_translation="Hi!/Bye! (Bavarian greeting)",
        pronunciation="ZER-voos!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["munich"],
        dialect_name="Bavarian",
        usage_context="Widely used in Munich for both greeting and farewell",
        difficulty_level=1,
        tags=["regional", "munich", "bavarian", "greeting"]
    ),
    PhraseCreate(
        german_phrase="Passt scho.",
        english_translation="It's fine / that'll do. (Bavarian/Austrian colloquial)",
        pronunciation="Pahst shoh.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["munich", "vienna", "stuttgart"],
        dialect_name="Southern colloquial",
        usage_context="Used to indicate something is acceptable",
        difficulty_level=2,
        tags=["regional", "colloquial", "agreement"]
    ),
    PhraseCreate(
        german_phrase="Hoi zäme!",
        english_translation="Hi everyone! (Swiss German)",
        pronunciation="Hoy TSEH-meh!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich"],
        dialect_name="Swiss German (Züritüütsch)",
        usage_context="Common informal group greeting in Zurich",
        cultural_note="In Swiss contexts this often feels more natural than standard German greetings.",
        difficulty_level=2,
        tags=["regional", "swiss_german", "zurich", "greeting", "slang"]
    ),
    PhraseCreate(
        german_phrase="Merci vilmal!",
        english_translation="Thanks a lot! (Swiss German)",
        pronunciation="Mehr-SEE FEEL-mahl!",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich"],
        dialect_name="Swiss German",
        usage_context="Friendly way to thank someone in everyday Zurich interactions",
        difficulty_level=2,
        tags=["regional", "swiss_german", "gratitude", "slang", "zurich"]
    ),
    PhraseCreate(
        german_phrase="Es isch mega guet.",
        english_translation="That's really great. (Swiss German slang)",
        pronunciation="Es ish MEH-gah goo-et.",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich"],
        dialect_name="Swiss German",
        usage_context="Positive slang response among students in Zurich",
        difficulty_level=3,
        tags=["regional", "swiss_german", "student_slang", "zurich"]
    ),
    PhraseCreate(
        german_phrase="Ich hätt gern es GA-Tageskarte, bitte.",
        english_translation="I'd like a GA day pass, please.",
        pronunciation="Eekh het gairn es GAH TAH-ges-kar-teh, BIT-teh.",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["zurich"],
        dialect_name="Swiss transport usage",
        usage_context="At Swiss transit counters when buying day travel passes",
        contextual_note="Very useful for student weekend travel in Switzerland.",
        difficulty_level=3,
        tags=["zurich", "switzerland", "transport", "student_travel"]
    ),
    PhraseCreate(
        german_phrase="Wo cha me günstig esse i de Nähe?",
        english_translation="Where can you eat cheaply nearby? (Swiss German)",
        pronunciation="Voh kha meh GOON-stig EH-seh ee deh NEH-heh?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich"],
        dialect_name="Swiss German",
        usage_context="Asking locals for affordable student food options",
        difficulty_level=4,
        tags=["zurich", "swiss_german", "budget", "student_life", "slang"]
    ),
    PhraseCreate(
        german_phrase="Wo ist hier das Studierendensekretariat?",
        english_translation="Where is the student administration office here?",
        pronunciation="Voh ist heer dahs shtoo-DEE-ren-den-zeh-kreh-tah-ree-AHT?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.FORMAL,
        city_slugs=["detmold", "lemgo", "osnabruck", "vallendar", "ebs", "eltville"],
        usage_context="Useful at smaller university towns and partner campuses",
        difficulty_level=3,
        tags=["campus", "admin", "university_services"]
    ),
]


# ============================================================================
# HYPERLOCAL SLANG PHRASES - One local-feel phrase set per city/program slug
# ============================================================================

hyperlocal_slang_phrases = [
    PhraseCreate(
        german_phrase="Des isch voll guat.",
        english_translation="That's really good. (Swabian/Bavarian colloquial)",
        pronunciation="Dess ish fol goo-aht.",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["stuttgart"],
        dialect_name="Swabian colloquial",
        usage_context="Casual positive reaction among students in Stuttgart",
        contextual_note="Good for listening comprehension even if you answer in standard German.",
        difficulty_level=3,
        tags=["slang", "stuttgart", "swabian", "local_feel"]
    ),
    PhraseCreate(
        german_phrase="Et kütt wie et kütt.",
        english_translation="It is what it is. (Rhenish saying)",
        pronunciation="Et kuht vee et kuht.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["bonn"],
        dialect_name="Rhenish",
        usage_context="A local expression for accepting situations as they are",
        difficulty_level=3,
        tags=["slang", "bonn", "rhenish", "expression"]
    ),
    PhraseCreate(
        german_phrase="Machd's guud.",
        english_translation="Take care. (Palatinate-style farewell)",
        pronunciation="Mahkts good.",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["mannheim"],
        dialect_name="Kurpfälzisch",
        usage_context="Friendly local goodbye in the Mannheim area",
        difficulty_level=2,
        tags=["slang", "mannheim", "farewell", "local"]
    ),
    PhraseCreate(
        german_phrase="Moin moin!",
        english_translation="Hey there! (Northern German)",
        pronunciation="Moyn moyn!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["hamburg"],
        dialect_name="Northern colloquial",
        usage_context="Warm informal greeting in Hamburg",
        difficulty_level=1,
        tags=["slang", "hamburg", "northern", "greeting"]
    ),
    PhraseCreate(
        german_phrase="Ei, des läuft!",
        english_translation="Hey, that's going great! (Hessian colloquial)",
        pronunciation="Eye, dess loyft!",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["ebs", "eltville"],
        dialect_name="Hessian",
        usage_context="Positive student slang around Wiesbaden/Oestrich-Winkel/Eltville",
        difficulty_level=3,
        tags=["slang", "hessian", "ebs", "eltville", "local_feel"]
    ),
    PhraseCreate(
        german_phrase="Ick bin heute uff'm Sprung.",
        english_translation="I'm in a rush today. (Berlin colloquial)",
        pronunciation="Ik bin hoy-teh oofm shproong.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin"],
        dialect_name="Berlin colloquial",
        usage_context="Natural colloquial phrase for fast-paced student days in Berlin",
        difficulty_level=4,
        tags=["slang", "berlin", "colloquial", "daily_life"]
    ),
    PhraseCreate(
        german_phrase="Läuft bei dir!",
        english_translation="You're doing great! (German youth slang)",
        pronunciation="Loyft by deer!",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["detmold", "lemgo"],
        usage_context="Casual positive phrase used by students in smaller university towns",
        difficulty_level=2,
        tags=["slang", "detmold", "lemgo", "student_slang"]
    ),
    PhraseCreate(
        german_phrase="Moin, alles paletti?",
        english_translation="Hey, all good? (Northern colloquial)",
        pronunciation="Moyn, AL-les pah-LET-tee?",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["osnabruck"],
        usage_context="Friendly check-in with classmates and roommates",
        difficulty_level=2,
        tags=["slang", "osnabruck", "northern", "small_talk"]
    ),
    PhraseCreate(
        german_phrase="Alles easy am Rhein.",
        english_translation="All easy on the Rhine.",
        pronunciation="AL-les EE-zee am rine.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["vallendar"],
        usage_context="Playful local phrase for student life in the Rhine valley",
        difficulty_level=2,
        tags=["slang", "vallendar", "rhine", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Das ist ja mal stark!",
        english_translation="That's seriously awesome!",
        pronunciation="Dahs ist yah mahl shtark!",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["aachen"],
        usage_context="Energetic reaction common among student groups",
        difficulty_level=1,
        tags=["slang", "aachen", "reaction", "student_slang"]
    ),
    PhraseCreate(
        german_phrase="Nu dann, passt das.",
        english_translation="Alright then, that works. (Thuringian flavor)",
        pronunciation="Noo dan, pahst dahs.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["jena"],
        dialect_name="Thuringian colloquial",
        usage_context="Agreeing casually in Jena student interactions",
        difficulty_level=3,
        tags=["slang", "jena", "agreement", "thuringian"]
    ),
    PhraseCreate(
        german_phrase="Oida, des war heftig!",
        english_translation="Dude, that was intense! (Austrian slang)",
        pronunciation="Oy-dah, dess var HEF-tig!",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
    city_slugs=["vienna", "salzburg"],
        dialect_name="Austrian colloquial",
        usage_context="Very common Austrian youth-style reaction phrase",
        contextual_note="Use with peers; avoid in formal contexts.",
        difficulty_level=3,
        tags=["slang", "austrian", "vienna", "salzburg"]
    ),
    PhraseCreate(
        german_phrase="Baba, bis später!",
        english_translation="Bye, see you later! (Austrian colloquial)",
        pronunciation="Bah-bah, bis SHPAY-ter!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
    city_slugs=["vienna", "salzburg"],
        dialect_name="Austrian colloquial",
        usage_context="Friendly informal goodbye in Austria",
        difficulty_level=2,
        tags=["slang", "farewell", "austrian", "vienna", "salzburg"]
    ),
    PhraseCreate(
        german_phrase="Hoi mitenand!",
        english_translation="Hi everyone! (Swiss German)",
        pronunciation="Hoy mee-teh-NAND!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich"],
        dialect_name="Swiss German",
        usage_context="Common Swiss greeting variant in group settings",
        difficulty_level=2,
        tags=["slang", "swiss_german", "zurich", "greeting"]
    ),
    PhraseCreate(
        german_phrase="Sali zäme!",
        english_translation="Hey everyone! (Swiss German)",
        pronunciation="SAH-lee TSEH-meh!",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich"],
        dialect_name="Swiss German",
        usage_context="Friendly social greeting among students in Zurich",
        difficulty_level=2,
        tags=["slang", "swiss_german", "zurich", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Des läuft wie geschmiert.",
        english_translation="That's running smoothly.",
        pronunciation="Dess loyft vee geh-SHMEERT.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["wurzburg"],
        usage_context="Colloquial phrase for things going well in daily student life",
        difficulty_level=2,
        tags=["slang", "wurzburg", "franconian_region", "daily_life"]
    ),
    PhraseCreate(
        german_phrase="Bassd scho, mir kriegen des hin.",
        english_translation="It's fine, we'll figure it out. (Franconian flavor)",
        pronunciation="Bahst shoh, meer KREE-gen dess hin.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["wurzburg"],
        dialect_name="Franconian colloquial",
        usage_context="Encouraging classmates during projects or admin tasks",
        difficulty_level=3,
        tags=["slang", "wurzburg", "franconian", "peer_support"]
    ),
]


# ============================================================================
# CITY-LOCKED MASTERY PHRASES - Extensive per-city practical + local feel
# ============================================================================

city_locked_mastery_phrases = [
    PhraseCreate(
        german_phrase="Gibt's hier ein günstiges Studi-Café in der Nähe?",
        english_translation="Is there an affordable student café nearby?",
        pronunciation="Gibts heer ine GOON-sti-ges SHTOO-dee kah-FEH in der NEH-heh?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin"],
        usage_context="Asking locals for student-friendly food spots in Berlin",
        difficulty_level=2,
        tags=["berlin", "student_life", "budget", "local"]
    ),
    PhraseCreate(
        german_phrase="Wo finde ich in München ein gemütliches Wirtshaus?",
        english_translation="Where can I find a cozy traditional tavern in Munich?",
        pronunciation="Voh FIN-deh eekh in MUN-khen ine geh-MOOT-li-khes VEERTS-hows?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["munich"],
        usage_context="Asking for traditional local dining in Munich",
        difficulty_level=3,
        tags=["munich", "bavarian", "food", "local"]
    ),
    PhraseCreate(
        german_phrase="Wo kann man in Hamburg gut an den Landungsbrücken lernen?",
        english_translation="Where can you study well near the Landungsbrücken in Hamburg?",
        pronunciation="Voh kan man in HAM-boork goot an den LAN-doongs-brook-en LER-nen?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["hamburg"],
        usage_context="Finding study spots around iconic Hamburg neighborhoods",
        difficulty_level=3,
        tags=["hamburg", "study_spots", "local"]
    ),
    PhraseCreate(
        german_phrase="Wo ist in Stuttgart der beste Flohmarkt am Wochenende?",
        english_translation="Where is the best flea market in Stuttgart on weekends?",
        pronunciation="Voh ist in SHTOOT-gart der BES-teh FLOH-markt am VO-khen-en-deh?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["stuttgart"],
        usage_context="Asking locals about weekend market culture",
        difficulty_level=3,
        tags=["stuttgart", "shopping", "weekend", "local"]
    ),
    PhraseCreate(
        german_phrase="Wie komme ich von Bonn schnell nach Köln?",
        english_translation="How do I get from Bonn to Cologne quickly?",
        pronunciation="Vee KOM-eh eekh fon bon shnel nahkh KURLN?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["bonn"],
        usage_context="Frequent day-trip transport question for Bonn students",
        difficulty_level=2,
        tags=["bonn", "transport", "regional_travel"]
    ),
    PhraseCreate(
        german_phrase="Gibt es in Mannheim ein gutes Lerncafé?",
        english_translation="Is there a good study café in Mannheim?",
        pronunciation="Gibt es in MAN-hime ine GOO-tes Lern-kah-FEH?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["mannheim"],
        usage_context="Finding social study spaces near campus",
        difficulty_level=2,
        tags=["mannheim", "study", "cafes"]
    ),
    PhraseCreate(
        german_phrase="Wo fährt der nächste Bus nach Koblenz?",
        english_translation="Where does the next bus to Koblenz leave from?",
        pronunciation="Voh fehrt der NEKH-steh boos nahkh KOHB-lents?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["vallendar"],
        usage_context="Frequent practical mobility question for Vallendar students",
        difficulty_level=2,
        tags=["vallendar", "transport", "koblenz"]
    ),
    PhraseCreate(
        german_phrase="Wo finde ich in Aachen die besten Lernräume?",
        english_translation="Where can I find the best study rooms in Aachen?",
        pronunciation="Voh FIN-deh eekh in AH-khen dee BES-ten LERN-roi-meh?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["aachen"],
        usage_context="Locating effective study spaces around RWTH/Aachen",
        difficulty_level=2,
        tags=["aachen", "study", "campus"]
    ),
    PhraseCreate(
        german_phrase="Gibt's in Osnabrück ein gutes Studentenkino?",
        english_translation="Is there a good student cinema in Osnabrück?",
        pronunciation="Gibts in OZ-nah-brook ine GOO-tes shtoo-DEN-ten-kee-noh?",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["osnabruck"],
        usage_context="Asking about local student social venues",
        difficulty_level=2,
        tags=["osnabruck", "student_life", "social"]
    ),
    PhraseCreate(
        german_phrase="Wo kann man in Detmold günstig wohnen?",
        english_translation="Where can you live affordably in Detmold?",
        pronunciation="Voh kan man in DET-moldt GOON-stig VO-nen?",
        category=PhraseCategory.HOUSING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["detmold"],
        usage_context="Looking for affordable housing in a smaller city",
        difficulty_level=2,
        tags=["detmold", "housing", "budget"]
    ),
    PhraseCreate(
        german_phrase="Welche WG ist nah an der TH OWL?",
        english_translation="Which shared flat is close to TH OWL?",
        pronunciation="VEL-kheh veh-GEH ist nah an der teh hah oh ve el?",
        category=PhraseCategory.HOUSING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["lemgo"],
        usage_context="Housing search around TH OWL campus",
        difficulty_level=3,
        tags=["lemgo", "housing", "wg", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Wo trifft man in Jena am besten Studierende?",
        english_translation="Where is the best place to meet students in Jena?",
        pronunciation="Voh trift man in YEH-nah am BES-ten shtoo-DEE-ren-deh?",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["jena"],
        usage_context="Making friends and building local social network",
        difficulty_level=2,
        tags=["jena", "social", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Wo findet man in Leipzig günstige WGs mit guter Anbindung?",
        english_translation="Where can you find affordable shared flats in Leipzig with good transit access?",
        pronunciation="Voh FIN-det man in LIPE-tsikh GOON-sti-geh veh-GEHS mit GOO-ter AN-bin-doong?",
        category=PhraseCategory.HOUSING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["leipzig"],
        usage_context="Housing search in Leipzig neighborhoods with strong tram/S-Bahn access",
        difficulty_level=3,
        tags=["leipzig", "housing", "wg", "transport"]
    ),
    PhraseCreate(
        german_phrase="Wo sind in Leipzig gute Lernorte rund um die Uni?",
        english_translation="Where are good study spots in Leipzig around the university?",
        pronunciation="Voh zint in LIPE-tsikh GOO-teh LERN-or-teh roont oom dee OO-nee?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["leipzig"],
        usage_context="Finding student-preferred study places near Leipzig University",
        difficulty_level=2,
        tags=["leipzig", "study_spots", "university", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Wo bekommt man in Würzburg studentische Rabatte?",
        english_translation="Where can you get student discounts in Würzburg?",
        pronunciation="Voh beh-KOMT man in VURTS-boork shtoo-DEN-ti-sheh rah-BAT-eh?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["wurzburg"],
        usage_context="Saving money with city-specific student discount spots",
        difficulty_level=3,
        tags=["wurzburg", "discount", "student_budget"]
    ),
    PhraseCreate(
        german_phrase="Wo sind in Salzburg gute Orte zum Üben oder Proben?",
        english_translation="Where are good places in Salzburg to practice or rehearse?",
        pronunciation="Voh zint in ZALTZ-boork GOO-teh OR-te tsoom OO-ben oh-der PRO-ben?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["salzburg"],
        usage_context="Useful for music/business program participants in Salzburg",
        difficulty_level=3,
        tags=["salzburg", "music", "practice", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Wo findet man in Zürich günstige Mittagsmenüs?",
        english_translation="Where can you find affordable lunch menus in Zurich?",
        pronunciation="Voh FIN-det man in TSOO-rikh GOON-sti-geh MIT-tags-meh-NUHS?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["zurich"],
        usage_context="Essential budget dining question in high-cost Zurich",
        difficulty_level=3,
        tags=["zurich", "budget", "dining", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Wo sind in Wien gute Lernorte nahe der WU?",
        english_translation="Where are good study spots in Vienna near WU?",
        pronunciation="Voh zint in veen GOO-teh LERN-or-teh NA-heh der veh-oo?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["vienna"],
        usage_context="Program-specific practical phrase for WU participants in real city Vienna",
        difficulty_level=2,
        tags=["vienna", "wu", "study_spots", "local"]
    ),
    PhraseCreate(
        german_phrase="Wo kann ich in Eltville am Rhein günstig einkaufen?",
        english_translation="Where can I shop affordably in Eltville am Rhein?",
        pronunciation="Voh kan eekh in ELT-vi-leh am rine GOON-stig ine-kow-fen?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["eltville"],
        usage_context="Everyday budget shopping question in a smaller town",
        difficulty_level=3,
        tags=["eltville", "shopping", "budget", "daily_life"]
    ),
    PhraseCreate(
        german_phrase="Wo trifft man in Wiesbaden/Oestrich-Winkel Studierende von EBS?",
        english_translation="Where do you meet EBS students in Wiesbaden/Oestrich-Winkel?",
        pronunciation="Voh trift man in VEES-bah-den OH-strikh VIN-kel shtoo-DEE-ren-deh fon eh-beh-ess?",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["ebs"],
        usage_context="Networking and social integration around EBS locations",
        difficulty_level=4,
        tags=["ebs", "networking", "student_life", "social"]
    ),
    PhraseCreate(
        german_phrase="Wo kann man in Leipzig abends günstig essen gehen?",
        english_translation="Where can you eat out affordably in Leipzig in the evening?",
        pronunciation="Voh kan man in LIPE-tsikh AH-bents GOON-stig ES-sen gay-en?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["leipzig"],
        usage_context="Budget dinner planning in Leipzig student neighborhoods",
        difficulty_level=2,
        tags=["leipzig", "dining", "budget", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Fährt die S-Bahn direkt zum Hauptbahnhof Leipzig?",
        english_translation="Does the S-Bahn go directly to Leipzig central station?",
        pronunciation="Fehrt dee es-bahn dee-REKT tsoom HOWPT-bahn-hof LIPE-tsikh?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["leipzig"],
        usage_context="Navigating major transit connections in Leipzig",
        difficulty_level=2,
        tags=["leipzig", "transport", "sbahn", "travel"]
    ),
    PhraseCreate(
        german_phrase="Wo ist in Leipzig ein gutes Späti in der Nähe?",
        english_translation="Where is a good late-night corner shop nearby in Leipzig?",
        pronunciation="Voh ist in LIPE-tsikh ine GOO-tes SHPAY-tee in der NEH-heh?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["leipzig"],
        usage_context="Useful everyday slang phrase in urban student neighborhoods",
        difficulty_level=3,
        tags=["leipzig", "spati", "local", "daily_life"]
    ),
    PhraseCreate(
        german_phrase="Wo findet man in Salzburg günstige Studentencafés?",
        english_translation="Where can you find affordable student cafés in Salzburg?",
        pronunciation="Voh FIN-det man in ZALTZ-boork GOON-sti-geh shtoo-DEN-ten-kah-FEHS?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["salzburg"],
        usage_context="Budget-friendly café search for Salzburg students",
        difficulty_level=3,
        tags=["salzburg", "cafes", "budget", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Welche Buslinie fährt in Salzburg zum Hauptbahnhof?",
        english_translation="Which bus line in Salzburg goes to the main station?",
        pronunciation="VEL-kheh BOOS-lee-nee-eh fehrt in ZALTZ-boork tsoom HOWPT-bahn-hof?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["salzburg"],
        usage_context="Practical mobility phrase for daily commuting in Salzburg",
        difficulty_level=2,
        tags=["salzburg", "transport", "bus", "commute"]
    ),
    PhraseCreate(
        german_phrase="Wo kann man in Würzburg günstig Mittag essen?",
        english_translation="Where can you have an affordable lunch in Würzburg?",
        pronunciation="Voh kan man in VURTS-boork GOON-stig MIT-tag ES-sen?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["wurzburg"],
        usage_context="Everyday lunch budgeting for Würzburg students",
        difficulty_level=2,
        tags=["wurzburg", "dining", "budget", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Welche Straßenbahn fährt in Würzburg zur Uni?",
        english_translation="Which tram in Würzburg goes to the university?",
        pronunciation="VEL-kheh SHTRAH-sen-bahn fehrt in VURTS-boork tsoor OO-nee?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["wurzburg"],
        usage_context="Getting to campus in Würzburg by tram",
        difficulty_level=2,
        tags=["wurzburg", "transport", "tram", "campus"]
    ),
    PhraseCreate(
        german_phrase="Gibt es in Detmold ruhige Lernorte am Abend?",
        english_translation="Are there quiet study places in Detmold in the evening?",
        pronunciation="Gibt es in DET-moldt ROO-ig-eh LERN-or-teh am AH-bent?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["detmold"],
        usage_context="Finding quiet evening study spots in a smaller city",
        difficulty_level=2,
        tags=["detmold", "study", "quiet", "evening"]
    ),
    PhraseCreate(
        german_phrase="Wo gibt es in Eltville günstige Supermärkte?",
        english_translation="Where are affordable supermarkets in Eltville?",
        pronunciation="Voh gibt es in ELT-vi-leh GOON-sti-geh ZOO-per-mehrk-teh?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["eltville"],
        usage_context="Daily essentials shopping in Eltville",
        difficulty_level=2,
        tags=["eltville", "shopping", "groceries", "budget"]
    ),
    PhraseCreate(
        german_phrase="Wo findet man in Vallendar günstige WG-Zimmer?",
        english_translation="Where can you find affordable shared-flat rooms in Vallendar?",
        pronunciation="Voh FIN-det man in VAL-len-dar GOON-sti-geh veh-GEH TSIM-er?",
        category=PhraseCategory.HOUSING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["vallendar"],
        usage_context="Student housing search near WHU/Vallendar",
        difficulty_level=3,
        tags=["vallendar", "housing", "wg", "student_life"]
    ),
    PhraseCreate(
        german_phrase="Wie komme ich von EBS schnell nach Wiesbaden Zentrum?",
        english_translation="How do I get quickly from EBS to downtown Wiesbaden?",
        pronunciation="Vee KOM-eh eekh fon eh-beh-ess shnel nahkh VEES-bah-den TSEN-troom?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["ebs"],
        usage_context="Frequent local transit question for EBS students",
        difficulty_level=3,
        tags=["ebs", "transport", "wiesbaden", "commute"]
    ),
    PhraseCreate(
        german_phrase="Können Sie mich empfehlen?",
        english_translation="Can you recommend me?",
        pronunciation="KUN-nen zee meekh emp-FAY-len?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "vienna", "aachen"],
        usage_context="Asking professor for professional recommendation",
        difficulty_level=2,
        tags=["academic", "recommendation", "professional"]
    ),
    PhraseCreate(
        german_phrase="Das ist sehr hilfreich.",
        english_translation="That's very helpful.",
        pronunciation="Dahs ist ZAIR HILF-raikhe.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "vienna", "hamburg"],
        usage_context="Expressing gratitude for assistance",
        difficulty_level=1,
        tags=["social", "gratitude", "expression"]
    ),
    PhraseCreate(
        german_phrase="Ich freue mich auf deine Antwort.",
        english_translation="I look forward to your response.",
        pronunciation="Eekh FROI-eh meekh owf DINE-eh AHN-tvort.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.FORMAL,
        city_slugs=["vienna", "berlin"],
        usage_context="Polite closing for emails or conversations",
        difficulty_level=2,
        tags=["formal", "communication", "writing"]
    ),
    PhraseCreate(
        german_phrase="Das kostet eine kleine Vermögen!",
        english_translation="That costs a fortune!",
        pronunciation="Dahs KOS-tet AY-neh KLINE-eh Fair-MERN-gen!",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["munich", "vienna", "zurich"],
        usage_context="Expressing shock at high prices in expensive cities",
        difficulty_level=2,
        tags=["shopping", "money", "expression", "expensive"]
    ),
    PhraseCreate(
        german_phrase="Kann ich dich später anrufen?",
        english_translation="Can I call you later?",
        pronunciation="Kahn eekh deekh SHPAY-ter AHN-roo-fen?",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "munich", "vienna"],
        usage_context="Making plans to contact someone later",
        difficulty_level=1,
        tags=["social", "communication", "planning"]
    ),
]


OFFERED_CITY_SLUGS = {
    "stuttgart",
    "bonn",
    "mannheim",
    "hamburg",
    "ebs",
    "eltville",
    "berlin",
    "detmold",
    "osnabruck",
    "vallendar",
    "aachen",
    "lemgo",
    "munich",
    "jena",
    "leipzig",
    "vienna",
    "zurich",
    "salzburg",
    "wurzburg",
}


def get_phrase_city_coverage():
    """Return a coverage map of city_slug -> number of phrases linked to that city."""
    coverage = {slug: 0 for slug in OFFERED_CITY_SLUGS}
    for phrase in all_phrases:
        for slug in phrase.city_slugs:
            if slug in coverage:
                coverage[slug] += 1
    return coverage


def get_missing_phrase_cities():
    """Return any offered city slugs that currently have zero phrase coverage."""
    coverage = get_phrase_city_coverage()
    return [slug for slug, count in coverage.items() if count == 0]

# Combine all phrases into a single list for easy seeding
all_phrases = (
    academic_phrases +
    housing_phrases +
    dining_phrases +
    transportation_phrases +
    health_phrases +
    greeting_phrases +
    daily_life_phrases +
    regional_city_phrases +
    hyperlocal_slang_phrases +
    city_locked_mastery_phrases
)
