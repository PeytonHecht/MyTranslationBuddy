"""
German phrase library data organized by category and regional dialects.
Study abroad phrases for students in German-speaking countries.
"""

from app.schemas.phrase import PhraseCreate, PhraseCategory, PhraseRegister, PhraseType

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
    PhraseCreate(
        german_phrase="Geh bitte!",
        english_translation="No way! / Come on! (Austrian expression of disbelief)",
        pronunciation="Gay BIT-teh!",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["vienna", "salzburg", "graz"],
        dialect_name="Austrian colloquial",
        usage_context="Very common Austrian expression — does NOT mean 'please go'",
        contextual_note="Despite the literal meaning, this is purely an exclamation of disbelief. You'll hear it constantly.",
        difficulty_level=2,
        tags=["slang", "austrian", "expression", "daily_life", "local_feel"]
    ),
    PhraseCreate(
        german_phrase="I han kei Luscht.",
        english_translation="I don't feel like it. (Swiss German)",
        pronunciation="Ee hahn kay loosht.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich"],
        dialect_name="Swiss German",
        usage_context="Casual way to decline plans — very natural among Swiss students",
        difficulty_level=3,
        tags=["slang", "swiss_german", "zurich", "refusal", "local_feel"]
    ),
    PhraseCreate(
        german_phrase="Passt schon, Schwamm drüber.",
        english_translation="It's fine, water under the bridge.",
        pronunciation="Pahst shohn, shvahm DROO-ber.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["munich", "berlin", "hamburg", "vienna"],
        usage_context="Forgiving someone or moving past a minor issue — very natural",
        difficulty_level=2,
        tags=["slang", "idiom", "forgiveness", "daily_life"]
    ),
    PhraseCreate(
        german_phrase="Da hast du recht, Alter.",
        english_translation="You're right, dude.",
        pronunciation="Dah hahst doo rekht, AL-ter.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "hamburg", "munich"],
        usage_context="Casual agreement among student friends — 'Alter' is like 'dude'",
        contextual_note="Only use with friends your age, never in academic settings.",
        difficulty_level=2,
        tags=["slang", "youth_language", "agreement", "student_slang"]
    ),
    PhraseCreate(
        german_phrase="Ich check das nicht.",
        english_translation="I don't get it.",
        pronunciation="Eekh CHECK dahs neekht.",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "hamburg", "munich", "aachen", "bonn"],
        usage_context="Youth slang for not understanding something — used constantly among students",
        difficulty_level=1,
        tags=["slang", "youth_language", "confusion", "student_slang", "local_feel"]
    ),
    PhraseCreate(
        german_phrase="Servus, wie schaut's?",
        english_translation="Hi, how's it going? (Bavarian/Austrian)",
        pronunciation="ZAIR-voos, vee showts?",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["munich", "salzburg", "vienna", "graz"],
        dialect_name="Bavarian/Austrian",
        usage_context="Standard casual greeting in Bavaria and Austria — use it daily",
        difficulty_level=2,
        tags=["regional", "bavarian", "austrian", "greeting", "local_feel"]
    ),
    PhraseCreate(
        german_phrase="Ey, lass ma' treffen.",
        english_translation="Yo, let's meet up.",
        pronunciation="Ey, lahss mah TREF-fen.",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "hamburg", "bonn"],
        usage_context="Casual way to suggest meeting friends — very common student phrasing",
        difficulty_level=1,
        tags=["slang", "youth_language", "social", "student_slang"]
    ),
    PhraseCreate(
        german_phrase="Krass, oder?",
        english_translation="Crazy, right?",
        pronunciation="Krahss, OH-der?",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "munich", "hamburg", "aachen", "bonn", "mannheim"],
        usage_context="Universal German youth expression for something surprising or impressive",
        difficulty_level=1,
        tags=["slang", "youth_language", "reaction", "ubiquitous", "local_feel"]
    ),
    PhraseCreate(
        german_phrase="Mei, des is a Gaudi!",
        english_translation="Wow, that's great fun! (Bavarian)",
        pronunciation="My, dess iz ah GOW-dee!",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["munich"],
        dialect_name="Bavarian",
        usage_context="At beer gardens, festivals, or fun student events in Munich",
        difficulty_level=3,
        tags=["slang", "bavarian", "munich", "fun", "local_feel"]
    ),
    PhraseCreate(
        german_phrase="Hömma, dat is doch Quatsch!",
        english_translation="Listen, that's nonsense! (Ruhr area dialect)",
        pronunciation="HUH-mah, dat iz dokh kvatsh!",
        category=PhraseCategory.EXCLAMATIONS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["bonn"],
        dialect_name="Rhineland colloquial",
        usage_context="Dismissing something silly — common in the Rhine/Ruhr region",
        difficulty_level=4,
        tags=["slang", "rhineland", "bonn", "expression", "local_feel"]
    ),
    PhraseCreate(
        german_phrase="Feierabend! Auf geht's!",
        english_translation="Done for the day! Let's go!",
        pronunciation="FY-er-AH-bent! Owf gayts!",
        category=PhraseCategory.DAILY_LIFE,
        register=PhraseRegister.INFORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich"],
        usage_context="After classes or work — Germans LOVE their Feierabend (end-of-work celebration)",
        contextual_note="This is a cultural concept: the sacred time after work/study when you relax.",
        difficulty_level=2,
        tags=["slang", "culture", "daily_life", "student_life", "local_feel"]
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

# ============================================================================
# SWISS GERMAN & AUSTRIAN PHRASES - Regional expressions
# ============================================================================

swiss_austrian_phrases = [
    PhraseCreate(
        german_phrase="Gr\u00FCezi",
        english_translation="Hello (formal Swiss greeting)",
        pronunciation="GROO-et-see",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.FORMAL,
        city_slugs=["zurich", "bern", "rapperswil", "winterthur"],
        usage_context="Standard formal greeting in Swiss German-speaking areas",
        example_sentence="Gr\u00FCezi, wie g\u00E4hts Ihne?",
        difficulty_level=1,
        tags=["greeting", "swiss", "formal"]
    ),
    PhraseCreate(
        german_phrase="Hoi z\u00E4me",
        english_translation="Hi everyone (informal Swiss greeting)",
        pronunciation="HOY ZAH-meh",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich", "bern", "rapperswil", "winterthur"],
        usage_context="Casual greeting to a group of friends or classmates",
        example_sentence="Hoi z\u00E4me, sind alli da?",
        difficulty_level=1,
        tags=["greeting", "swiss", "informal", "group"]
    ),
    PhraseCreate(
        german_phrase="Merci vilmal",
        english_translation="Thanks a lot (Swiss German)",
        pronunciation="MEHR-see FEEL-mahl",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich", "bern", "rapperswil", "winterthur"],
        usage_context="Common way to say thank you in Swiss German, mixing French 'merci' with German",
        example_sentence="Merci vilmal f\u00FCr d'Hilf!",
        difficulty_level=1,
        tags=["thanks", "swiss", "gratitude"]
    ),
    PhraseCreate(
        german_phrase="Ade / Tsch\u00FCss",
        english_translation="Bye (Swiss/German goodbye)",
        pronunciation="AH-deh / CHEWS",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich", "bern", "rapperswil", "winterthur"],
        usage_context="Casual goodbye in Swiss German; 'Ade' is distinctly Swiss",
        difficulty_level=1,
        tags=["goodbye", "swiss"]
    ),
    PhraseCreate(
        german_phrase="R\u00F6schti",
        english_translation="Hash browns (iconic Swiss dish)",
        pronunciation="RUSH-tee",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["zurich", "bern", "rapperswil", "winterthur"],
        usage_context="Ordering the classic Swiss potato dish at a restaurant",
        example_sentence="Ich h\u00E4tte gern e R\u00F6schti mit Chees.",
        difficulty_level=1,
        tags=["food", "swiss", "traditional"]
    ),
    PhraseCreate(
        german_phrase="Es Halbtax bitte",
        english_translation="A half-fare card please",
        pronunciation="Es HAHLB-tahx BIT-teh",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["zurich", "bern", "rapperswil", "winterthur"],
        usage_context="Asking for the SBB half-fare discount card at the train station",
        difficulty_level=2,
        tags=["transit", "swiss", "train", "discount"]
    ),
    PhraseCreate(
        german_phrase="Wo isch de n\u00E4chst Coop / Migros?",
        english_translation="Where is the nearest Coop/Migros?",
        pronunciation="Voh ish deh NEKST Koop / MEE-gros?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich", "bern", "rapperswil", "winterthur"],
        usage_context="Asking for directions to the two main Swiss supermarket chains",
        difficulty_level=2,
        tags=["shopping", "swiss", "supermarket"]
    ),
    PhraseCreate(
        german_phrase="Ich zahl mit Twint",
        english_translation="I'll pay with Twint (Swiss mobile payment)",
        pronunciation="Eekh TSAHL mit Twint",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["zurich", "bern", "rapperswil", "winterthur"],
        usage_context="Using the popular Swiss mobile payment app at shops and restaurants",
        difficulty_level=1,
        tags=["payment", "swiss", "technology"]
    ),
    PhraseCreate(
        german_phrase="Servus!",
        english_translation="Hi / Bye (Austrian informal greeting)",
        pronunciation="ZEHR-voos",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["vienna", "salzburg"],
        usage_context="Very common casual greeting and farewell in Austria",
        example_sentence="Servus! Wie geht's dir?",
        difficulty_level=1,
        tags=["greeting", "austrian", "informal"]
    ),
    PhraseCreate(
        german_phrase="Habe die Ehre",
        english_translation="I have the honor (formal Austrian greeting)",
        pronunciation="HAH-beh dee EH-reh",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.FORMAL,
        city_slugs=["vienna", "salzburg"],
        usage_context="Traditional formal greeting in Austria, especially older people",
        difficulty_level=2,
        tags=["greeting", "austrian", "formal", "traditional"]
    ),
    PhraseCreate(
        german_phrase="A Mel\u00E1nge bitte",
        english_translation="A Viennese coffee (similar to cappuccino) please",
        pronunciation="A meh-LAHN-zheh BIT-teh",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["vienna", "salzburg"],
        usage_context="Ordering the classic Viennese coffee drink at a traditional coffee house",
        example_sentence="Herr Ober, a Mel\u00E1nge bitte!",
        difficulty_level=2,
        tags=["coffee", "austrian", "traditional", "cafe"]
    ),
    PhraseCreate(
        german_phrase="Sackerl",
        english_translation="Bag (Austrian for T\u00fcte)",
        pronunciation="ZAHK-erl",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["vienna", "salzburg"],
        usage_context="Asking for a bag at the supermarket - Austrians say 'Sackerl' not 'T\u00fcte'",
        example_sentence="Brauchen Sie ein Sackerl?",
        difficulty_level=1,
        tags=["shopping", "austrian", "vocabulary"]
    ),
]

# ============================================================================
# ADDITIONAL ESSENTIAL PHRASES - Covering all cities
# ============================================================================

essential_phrases = [
    PhraseCreate(
        german_phrase="Sprechen Sie Englisch?",
        english_translation="Do you speak English?",
        pronunciation="SHPREKH-en zee ENG-lish?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="The most important phrase for any newcomer - asking if someone speaks English",
        example_sentence="Entschuldigung, sprechen Sie Englisch?",
        difficulty_level=1,
        tags=["essential", "first_day", "communication"]
    ),
    PhraseCreate(
        german_phrase="Ich bin Student/Studentin an der Uni.",
        english_translation="I am a student at the university.",
        pronunciation="Eekh bin shtoo-DENT/shtoo-DEN-tin ahn der OO-nee.",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Introducing yourself as a student for discounts and general context",
        difficulty_level=1,
        tags=["introduction", "student", "university"]
    ),
    PhraseCreate(
        german_phrase="Kann ich bitte die Rechnung haben?",
        english_translation="Can I have the bill please?",
        pronunciation="Kahn eekh BIT-teh dee REKH-noong HAH-ben?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Asking for the check at a restaurant - essential dining phrase",
        difficulty_level=1,
        tags=["restaurant", "essential", "dining"]
    ),
    PhraseCreate(
        german_phrase="Gibt es einen Studentenrabatt?",
        english_translation="Is there a student discount?",
        pronunciation="Gipt es EYE-nen shtoo-DEN-ten-rah-BAHT?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Student discounts are common at museums, theaters, transport - always ask!",
        difficulty_level=2,
        tags=["student", "discount", "money", "essential"]
    ),
    PhraseCreate(
        german_phrase="Wie komme ich zum Bahnhof?",
        english_translation="How do I get to the train station?",
        pronunciation="Vee KOM-meh eekh tsoom BAHN-hohf?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Asking for directions to the train station - the hub of German/Austrian/Swiss public transit",
        difficulty_level=1,
        tags=["directions", "train", "transport", "essential"]
    ),
    PhraseCreate(
        german_phrase="Ich h\u00E4tte gern ein Bier / ein Wasser bitte.",
        english_translation="I would like a beer / a water please.",
        pronunciation="Eekh HET-teh gehrn ein Beer / ein VAHS-ser BIT-teh.",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Basic ordering at a bar, restaurant, or Biergarten",
        difficulty_level=1,
        tags=["ordering", "drinks", "essential"]
    ),
    PhraseCreate(
        german_phrase="Wo ist die n\u00E4chste Apotheke?",
        english_translation="Where is the nearest pharmacy?",
        pronunciation="Voh ist dee NEKH-steh ah-poh-TAY-keh?",
        category=PhraseCategory.HEALTH,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Finding a pharmacy when you need medicine or health products",
        difficulty_level=1,
        tags=["health", "pharmacy", "essential", "emergency"]
    ),
    PhraseCreate(
        german_phrase="Entschuldigung, ich bin neu hier.",
        english_translation="Excuse me, I'm new here.",
        pronunciation="Ent-SHOOL-dee-goong, eekh bin NOY heer.",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="A great ice-breaker that usually makes locals more helpful and patient",
        difficulty_level=1,
        tags=["introduction", "essential", "helpful"]
    ),
    PhraseCreate(
        german_phrase="Zahlen bitte, zusammen / getrennt.",
        english_translation="Check please, together / separate.",
        pronunciation="TSAH-len BIT-teh, tsoo-ZAH-men / geh-TRENT.",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg"],
        usage_context="Asking for the bill and specifying if paying together or separately - Germans usually split bills",
        difficulty_level=2,
        tags=["restaurant", "dining", "payment", "essential"]
    ),
    PhraseCreate(
        german_phrase="Kann ich mit Karte zahlen?",
        english_translation="Can I pay by card?",
        pronunciation="Kahn eekh mit KAR-teh TSAH-len?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Important to ask - Germany is still heavily cash-based compared to the US! Many places don't accept cards.",
        difficulty_level=1,
        tags=["payment", "essential", "cash", "card"]
    ),
]


# ============================================================================
# BEGINNER BASICS - Absolute first phrases every student needs (Difficulty 1)
# ============================================================================

beginner_basics_phrases = [
    PhraseCreate(
        german_phrase="Ja",
        english_translation="Yes",
        pronunciation="Yah",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="The most basic word you'll use every day.",
        difficulty_level=1,
        tags=["beginner", "essential", "basics"]
    ),
    PhraseCreate(
        german_phrase="Nein",
        english_translation="No",
        pronunciation="Nine",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Simple but essential. Pronounced like the English number 'nine'.",
        difficulty_level=1,
        tags=["beginner", "essential", "basics"]
    ),
    PhraseCreate(
        german_phrase="Bitte",
        english_translation="Please / You're welcome",
        pronunciation="BIT-teh",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Used both as 'please' when asking and as 'you're welcome' when responding to thanks.",
        difficulty_level=1,
        tags=["beginner", "essential", "politeness"]
    ),
    PhraseCreate(
        german_phrase="Danke",
        english_translation="Thank you",
        pronunciation="DAHN-keh",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="A must-know! Add 'schön' (SHURN) to make it 'Danke schön' (Thank you very much).",
        difficulty_level=1,
        tags=["beginner", "essential", "politeness"]
    ),
    PhraseCreate(
        german_phrase="Entschuldigung",
        english_translation="Excuse me / I'm sorry",
        pronunciation="Ent-SHOOL-dee-goong",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Use to get someone's attention, apologize, or start a polite question.",
        difficulty_level=1,
        tags=["beginner", "essential", "politeness"]
    ),
    PhraseCreate(
        german_phrase="Sprechen Sie Englisch?",
        english_translation="Do you speak English?",
        pronunciation="SHPREH-khen zee ENG-lish?",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Your lifeline phrase! Even though many Germans speak English, asking politely first is appreciated.",
        difficulty_level=1,
        tags=["beginner", "essential", "communication"]
    ),
    PhraseCreate(
        german_phrase="Ich bin Student/Studentin.",
        english_translation="I am a student (male/female).",
        pronunciation="Eekh bin shtoo-DENT / shtoo-DEN-tin",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Important for introductions. Use 'Student' if male, 'Studentin' if female. Often gets you discounts!",
        difficulty_level=1,
        tags=["beginner", "essential", "introduction", "student_discount"]
    ),
    PhraseCreate(
        german_phrase="Wo ist die Toilette?",
        english_translation="Where is the restroom?",
        pronunciation="Voh ist dee toy-LET-teh?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="A must-know phrase. Note: In Germany, you often have to pay 50 cents to use public restrooms!",
        difficulty_level=1,
        tags=["beginner", "essential", "survival"]
    ),
    PhraseCreate(
        german_phrase="Ich komme aus Amerika.",
        english_translation="I come from America.",
        pronunciation="Eekh KOM-meh ows ah-MEH-ree-kah",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="A great phrase for introductions. People will be curious about where you're from!",
        difficulty_level=1,
        tags=["beginner", "essential", "introduction"]
    ),
    PhraseCreate(
        german_phrase="Ich hätte gerne...",
        english_translation="I would like...",
        pronunciation="Eekh HET-teh GEHR-neh...",
        category=PhraseCategory.DINING,
        register=PhraseRegister.FORMAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="The polite way to order at restaurants, bakeries, or cafes. Follow with the item name.",
        difficulty_level=1,
        tags=["beginner", "essential", "ordering", "restaurant"]
    ),
    PhraseCreate(
        german_phrase="Die Rechnung, bitte.",
        english_translation="The bill/check, please.",
        pronunciation="Dee REKH-noong, BIT-teh",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="In Germany, waiters won't bring the check until you ask. This phrase is essential!",
        difficulty_level=1,
        tags=["beginner", "essential", "restaurant", "payment"]
    ),
    PhraseCreate(
        german_phrase="Ein Wasser, bitte.",
        english_translation="A water, please.",
        pronunciation="Ine VAS-ser, BIT-teh",
        category=PhraseCategory.DINING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Tip: If you want tap water (free), say 'Leitungswasser, bitte.' Otherwise you'll get expensive bottled water!",
        difficulty_level=1,
        tags=["beginner", "essential", "restaurant", "drink"]
    ),
    PhraseCreate(
        german_phrase="Wie komme ich zum Bahnhof?",
        english_translation="How do I get to the train station?",
        pronunciation="Vee KOM-meh eekh tsoom BAHN-hohf?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Train stations are the center of German transportation. You'll use this one a lot!",
        difficulty_level=1,
        tags=["beginner", "essential", "directions", "train"]
    ),
    PhraseCreate(
        german_phrase="Wie spät ist es?",
        english_translation="What time is it?",
        pronunciation="Vee SHPAYT ist es?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Germans use 24-hour time (e.g. 14:00 = 2 PM). This phrase helps you practice understanding times.",
        difficulty_level=1,
        tags=["beginner", "essential", "time"]
    ),
    PhraseCreate(
        german_phrase="Ich brauche Hilfe.",
        english_translation="I need help.",
        pronunciation="Eekh BROW-kheh HIL-feh",
        category=PhraseCategory.HEALTH,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="An important emergency phrase. Works in any situation where you need assistance.",
        difficulty_level=1,
        tags=["beginner", "essential", "emergency", "help"]
    ),
    PhraseCreate(
        german_phrase="Wie viel kostet das?",
        english_translation="How much does this cost?",
        pronunciation="Vee feel KOS-tet dahs?",
        category=PhraseCategory.SHOPPING,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["berlin", "munich", "hamburg", "vienna", "zurich", "salzburg", "stuttgart", "bonn", "aachen", "mannheim", "jena", "leipzig", "osnabruck", "bern", "rapperswil", "winterthur", "wurzburg", "detmold", "lemgo", "vallendar", "ebs", "eltville"],
        usage_context="Essential for shopping at markets, bakeries, and stores.",
        difficulty_level=1,
        tags=["beginner", "essential", "shopping", "price"]
    ),
]


# ============================================================================
# GRAZ PHRASES - Austrian dialect and local life for Graz exchange students
# ============================================================================

graz_phrases = [
    PhraseCreate(
        german_phrase="Griaß di!",
        english_translation="Hello! (Styrian greeting)",
        pronunciation="GREE-ahss dee",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["graz"],
        usage_context="The standard Styrian greeting — much warmer than 'Hallo'. Use with friends, shopkeepers, and anyone you meet casually.",
        example_sentence="Du betrittst den Bäcker und sagst: Griaß di!",
        cultural_note="Styrians (Steirer) are proud of their dialect. Using 'Griaß di' instead of 'Hallo' instantly wins you points with locals.",
        difficulty_level=1,
        tags=["greeting", "Styrian", "dialect", "Graz"],
        dialect_name="Steirisch (Styrian)"
    ),
    PhraseCreate(
        german_phrase="Pfiat di!",
        english_translation="Goodbye! (Styrian farewell)",
        pronunciation="PFEE-aht dee",
        category=PhraseCategory.GREETINGS,
        register=PhraseRegister.INFORMAL,
        city_slugs=["graz"],
        usage_context="The Styrian way to say goodbye. Much more personal than 'Tschüss'.",
        example_sentence="Du verlässt das Café: Pfiat di, bis morgen!",
        cultural_note="Short for 'Behüte dich Gott' (May God protect you). Very common in Graz and all of Styria.",
        difficulty_level=1,
        tags=["farewell", "Styrian", "dialect", "Graz"],
        dialect_name="Steirisch (Styrian)"
    ),
    PhraseCreate(
        german_phrase="A Sturm, bitte!",
        english_translation="A young wine (Federweißer), please!",
        pronunciation="Ah SHTOORM, BIT-teh",
        category=PhraseCategory.DINING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["graz"],
        usage_context="Ordering Sturm (fermenting grape juice) at a Buschenschank — a must-do autumn tradition in Graz.",
        example_sentence="Im Herbst sagt man beim Buschenschank: A Sturm, bitte!",
        cultural_note="Graz is surrounded by vineyards. Every autumn, Buschenschanken (wine taverns) open and serve Sturm. It's a beloved Styrian tradition.",
        difficulty_level=2,
        tags=["dining", "wine", "Styrian", "autumn", "Buschenschank"],
        dialect_name="Steirisch (Styrian)"
    ),
    PhraseCreate(
        german_phrase="Wo geht's zum Schlossberg?",
        english_translation="How do I get to the Schlossberg?",
        pronunciation="Voh gates tsoom SHLOSS-bairk?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["graz"],
        usage_context="Asking for directions to Graz's iconic Schlossberg hill with the famous Uhrturm (clock tower).",
        example_sentence="Entschuldigung, wo geht's zum Schlossberg? Ich möchte den Uhrturm sehen.",
        cultural_note="The Schlossberg (Castle Hill) is Graz's #1 landmark. You can take the Schlossbergbahn funicular, a glass lift, or hike the 260 steps. Free views of the whole city!",
        difficulty_level=1,
        tags=["directions", "landmark", "Schlossberg", "Uhrturm", "tourism"],
    ),
    PhraseCreate(
        german_phrase="Hast du eine Jausn dabei?",
        english_translation="Did you bring a snack/packed lunch?",
        pronunciation="Hahst doo eye-neh YOW-sn dah-BYE?",
        category=PhraseCategory.DINING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["graz", "vienna", "salzburg"],
        usage_context="'Jause' (Jausn in dialect) is an Austrian snack break, usually bread with cold cuts and cheese. Very common among students.",
        example_sentence="Wir gehen zum Schlossberg wandern — hast du eine Jausn dabei?",
        cultural_note="Austrians take their Jause seriously. It's not just a snack — it's a cultural institution, especially when hiking or studying.",
        difficulty_level=2,
        tags=["snack", "Austrian", "Jause", "food culture"],
        dialect_name="Österreichisches Deutsch"
    ),
    PhraseCreate(
        german_phrase="Ich studier an der Uni Graz.",
        english_translation="I study at the University of Graz.",
        pronunciation="Eekh shtoo-DEER ahn dehr OO-nee GRAHTS.",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["graz"],
        usage_context="Introducing yourself as an exchange student at Karl-Franzens-Universität Graz.",
        example_sentence="Woher kommst du? — Ich bin aus Florida und studier an der Uni Graz.",
        cultural_note="Locals call it 'die Uni' or 'KFU Graz'. Saying you're at the Uni Graz instantly connects you to the student community.",
        difficulty_level=1,
        tags=["academic", "introduction", "university", "exchange"],
    ),
    PhraseCreate(
        german_phrase="Gemma auf a Spritzer!",
        english_translation="Let's go for a wine spritzer!",
        pronunciation="GEM-mah owf ah SHPRIT-zer!",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["graz", "vienna"],
        usage_context="Inviting friends for Austria's most popular casual drink — white wine mixed with sparkling water.",
        example_sentence="Die Vorlesung ist vorbei — gemma auf a Spritzer!",
        cultural_note="The Spritzer (G'spritzter) is THE drink in Austria. Styrian white wines are especially good. Much cheaper than cocktails!",
        difficulty_level=2,
        tags=["social", "drinks", "wine", "Spritzer", "going out"],
        dialect_name="Steirisch (Styrian)"
    ),
    PhraseCreate(
        german_phrase="Wie komm ich zum Hauptplatz?",
        english_translation="How do I get to the main square?",
        pronunciation="Vee komm eekh tsoom HOWPT-plahts?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["graz"],
        usage_context="Asking directions to Graz's central Hauptplatz — the heart of the old town with the Rathaus (town hall).",
        example_sentence="Entschuldigung, wie komm ich zum Hauptplatz?",
        cultural_note="Hauptplatz is the center of Graz's UNESCO old town. The Christmas market (Christkindlmarkt) and farmers' markets are held here.",
        difficulty_level=1,
        tags=["directions", "Hauptplatz", "old town", "navigation"],
    ),
    PhraseCreate(
        german_phrase="Leiwand!",
        english_translation="Awesome! Cool! Great!",
        pronunciation="LYE-vahnd",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["graz", "vienna", "salzburg"],
        usage_context="Austrian slang for 'awesome' or 'cool'. Use it to express enthusiasm about anything.",
        example_sentence="Die Party gestern war echt leiwand!",
        cultural_note="Originally means 'linen cloth' but evolved into Austrian slang for 'great'. One of the most-used Austrian slang words.",
        difficulty_level=1,
        tags=["slang", "Austrian", "enthusiasm", "cool"],
        dialect_name="Österreichisches Deutsch"
    ),
    PhraseCreate(
        german_phrase="Kann ich bitte die Mensa-Karte haben?",
        english_translation="Can I have the cafeteria card, please?",
        pronunciation="Kahn eekh BIT-teh dee MEN-sah KAR-teh HAH-ben?",
        category=PhraseCategory.ACADEMIC,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["graz"],
        usage_context="Getting your Mensa card for discounted student meals at the university cafeteria.",
        example_sentence="An der Mensa-Kasse: Kann ich bitte die Mensa-Karte haben? Ich bin Austauschstudent.",
        cultural_note="The Mensa at Uni Graz offers meals for €3-6 with a student card. There are multiple Mensa locations across campus.",
        difficulty_level=2,
        tags=["academic", "food", "Mensa", "student life", "cafeteria"],
    ),
    PhraseCreate(
        german_phrase="Wo ist die Straßenbahnhaltestelle?",
        english_translation="Where is the tram stop?",
        pronunciation="Voh ist dee SHTRAH-sen-bahn-HAHL-teh-shtel-leh?",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["graz", "vienna"],
        usage_context="Graz has an excellent tram (Straßenbahn) network. This is essential for daily navigation.",
        example_sentence="Wo ist die Straßenbahnhaltestelle für die Linie 1 zum Hauptplatz?",
        cultural_note="Graz trams (Bim in local slang) run frequently. Get a semester ticket — it covers all trams and buses in the city zone.",
        difficulty_level=2,
        tags=["transport", "tram", "Straßenbahn", "public transit", "navigation"],
    ),
    PhraseCreate(
        german_phrase="Ein Käsekrainer, bitte!",
        english_translation="A cheese-filled sausage, please!",
        pronunciation="Ayn KAY-zeh-KRAH-ner, BIT-teh!",
        category=PhraseCategory.DINING,
        register=PhraseRegister.INFORMAL,
        city_slugs=["graz", "vienna"],
        usage_context="Ordering the iconic Austrian street food — a grilled sausage filled with melted cheese, served at Würstelstände.",
        example_sentence="Am Würstelstand am Hauptplatz: Ein Käsekrainer, bitte! Mit Senf.",
        cultural_note="The Käsekrainer is Austria's answer to the hot dog. Best enjoyed at 2 AM after going out. Ask for 'mit Senf' (with mustard)!",
        difficulty_level=2,
        tags=["street food", "sausage", "Austrian", "night life", "Würstelstand"],
    ),
    PhraseCreate(
        german_phrase="Ich brauche ein Semesterticket.",
        english_translation="I need a semester ticket (transit pass).",
        pronunciation="Eekh BROW-kheh ayn zeh-MESS-ter-TIK-et.",
        category=PhraseCategory.TRANSPORTATION,
        register=PhraseRegister.NEUTRAL,
        city_slugs=["graz"],
        usage_context="Getting your discounted student transit pass from Holding Graz for unlimited tram and bus rides.",
        example_sentence="Am ÖBB-Schalter: Ich brauche ein Semesterticket für die Zone Graz.",
        cultural_note="The Graz semester ticket costs about €150 for 6 months. You'll use it daily — trams and buses run until midnight.",
        difficulty_level=2,
        tags=["transport", "semester ticket", "student discount", "transit pass"],
    ),
    PhraseCreate(
        german_phrase="Gibt's hier einen Stammtisch?",
        english_translation="Is there a regulars' table here?",
        pronunciation="Gipps heer eye-nen SHTAHM-tish?",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["graz", "vienna", "salzburg"],
        usage_context="Asking about a Stammtisch — a regular meetup at a pub/café. Many student groups and Erasmus networks organize Stammtische.",
        example_sentence="Im Pub: Gibt's hier einen Stammtisch für Erasmus-Studenten?",
        cultural_note="Stammtisch culture is huge in Austria. It's a regular gathering (weekly/monthly) at the same table in a pub. Great way to meet people!",
        difficulty_level=3,
        tags=["social", "Stammtisch", "meetup", "pub", "student life"],
    ),
    PhraseCreate(
        german_phrase="Oida!",
        english_translation="Dude! / Whoa! / Man! (Austrian exclamation)",
        pronunciation="OY-dah!",
        category=PhraseCategory.SOCIAL,
        register=PhraseRegister.INFORMAL,
        city_slugs=["graz", "vienna", "salzburg"],
        usage_context="The most versatile Austrian slang word. Can express surprise, frustration, excitement — depends entirely on tone.",
        example_sentence="Oida, schau dir das Panorama vom Schlossberg an!",
        cultural_note="'Oida' is to Austria what 'dude' is to California. It can mean anything depending on intonation. Young Austrians use it constantly.",
        difficulty_level=1,
        tags=["slang", "Austrian", "exclamation", "versatile", "youth language"],
        dialect_name="Österreichisches Deutsch"
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
    "bern",
    "rapperswil",
    "winterthur",
    "graz",
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
    city_locked_mastery_phrases +
    swiss_austrian_phrases +
    essential_phrases +
    beginner_basics_phrases +
    graz_phrases
)
