from app.schemas.tip import CityTipCreate

hamburg_tips = [
    CityTipCreate(
        city_slug="hamburg",
        category="housing",
        title="Student housing for exchange students is limited and first come, first served",
        content="Housing for exchange students is managed through Studierendenwerk Hamburg rather than university-owned residence halls. HAW Hamburg reserves a limited number of rooms each semester, but availability is first come, first served, so students should apply as early as possible.",
        short_description="Apply early for student housing because reserved exchange rooms are limited.",
        tags=["housing", "students", "exchange", "haw hamburg"],
        priority=1,
        source_name="UF HAW Hamburg program page"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="housing",
        title="Student residence halls usually include essentials but no meal plan",
        content="Exchange housing in Hamburg may cost roughly $300 to $500 per month and typically includes bedding, sheets, kitchen utensils, and internet. Students usually have a private room and share a kitchen and bathroom with a small number of other students. Meal plans are not included, but campus cafeterias offer affordable meals.",
        short_description="Budget for shared student housing with basic essentials included.",
        tags=["housing", "budget", "students", "meal plan"],
        priority=2,
        source_name="UF HAW Hamburg program page"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Students with limited German can still study in English",
        content="Exchange students at HAW Hamburg who speak little or no German can still choose from a range of English-taught courses. In general, exchange students are expected to choose courses from within one approved academic program area, such as Engineering.",
        short_description="English-taught course options are available for exchange students.",
        tags=["academics", "language", "engineering", "exchange"],
        priority=1,
        source_name="UF HAW Hamburg program page"
    )
]


berlin_tips = [
    CityTipCreate(
        city_slug="berlin",
        category="academics",
        title="This Berlin program is only open to approved MIB and graduate business students",
        content="This faculty-led Berlin program is restricted to approved MIB and graduate business students. It is not a general open-enrollment study abroad option for all UF students.",
        short_description="Eligibility is limited to approved MIB and graduate business students.",
        tags=["academics", "eligibility", "business", "graduate", "study abroad"],
        priority=1,
        source_name="UF Berlin program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="academics",
        title="The program offers 2 UF GPA credits through a Global Immersion Experience course",
        content="Students in the Berlin program take GEB 6930: Global Immersion Experience, a 2-credit UF GPA course focused on foreign business practices, international business constraints, company visits, and academic lectures in the host country.",
        short_description="The program includes a 2-credit global business immersion course.",
        tags=["academics", "credits", "business", "faculty-led"],
        priority=1,
        source_name="UF Berlin program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="planning",
        title="This program is not currently accepting applications",
        content="At the time of this entry, there are no active application cycles listed for the Berlin faculty-led program, and the page notes that the program is not currently accepting applications.",
        short_description="Check for future application cycles before planning around this program.",
        tags=["applications", "planning", "deadline", "study abroad"],
        priority=1,
        source_name="UF Berlin program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="finances",
        title="Financial aid and scholarships may still apply to faculty-led programs",
        content="Most financial aid that a student would normally receive on campus for the selected term abroad may be applied toward this study abroad program, but eligibility is determined by the Office of Student Financial Aid and Scholarships. UFIC and other colleges or organizations may also offer relevant study abroad scholarships.",
        short_description="Students may be able to use financial aid and scholarships toward the program cost.",
        tags=["financial aid", "scholarships", "cost", "planning"],
        priority=2,
        source_name="UF Berlin program page"
    )
]

detmold_tips = [
    CityTipCreate(
        city_slug="detmold",
        category="academics",
        title="This summer program combines construction, design, and international collaboration",
        content="The program was designed as a knowledge exchange between University of Florida students, students from other universities, and students from TH OWL in Germany. Participants attend lectures, workshops, laboratory studies, and site visits focused on German design, architecture, and construction methods.",
        short_description="Students learn through lectures, labs, workshops, and site visits in Germany.",
        tags=["academics", "construction", "design", "international", "exchange"],
        priority=1,
        source_name="UF Detmold program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="academics",
        title="All instruction is in English",
        content="The program is taught in English and includes lectures, discussions, excursions, and on-site learning activities. This makes it accessible even for students without German language proficiency.",
        short_description="The program is accessible to English-speaking students.",
        tags=["academics", "language", "english", "study abroad"],
        priority=1,
        source_name="UF Detmold program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="housing",
        title="Housing is arranged locally in private homes or apartments with breakfast included",
        content="Students are housed locally in Detmold, often in private homes or apartments. Breakfast is included, and the hosted arrangement adds to the immersion and cultural experience of the program.",
        short_description="Students stay in local housing with breakfast included.",
        tags=["housing", "breakfast", "local housing", "immersion"],
        priority=1,
        source_name="UF Detmold program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="planning",
        title="The program is open to all majors and lasts about four weeks",
        content="This program is open to all majors, requires a minimum 2.5 GPA, and is intended for students in good standing. The program consists of a four-week stay organized by the Department of Civil Engineering.",
        short_description="Open to all majors with a minimum 2.5 GPA.",
        tags=["eligibility", "planning", "gpa", "duration"],
        priority=1,
        source_name="UF Detmold program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="academics",
        title="Students can earn 3 UF GPA credits in construction-focused coursework",
        content="Undergraduate students take BCN 4956: International Studies in Construction for 3 credits, while graduate students take BCN 5957: Advanced International Studies in Construction for 3 credits.",
        short_description="Students earn 3 UF GPA credits through construction-focused coursework.",
        tags=["academics", "credits", "construction", "undergraduate", "graduate"],
        priority=2,
        source_name="UF Detmold program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="excursions",
        title="The program includes excursions and city visits, including Hamburg and optional Berlin",
        content="Program activities include walking tours, industry visits, and excursions connected to design, sustainable construction, water management, and digital construction. Highlights include Hamburg and an optional visit to Berlin.",
        short_description="Excursions are part of the experience, including Hamburg and optional Berlin.",
        tags=["excursions", "hamburg", "berlin", "industry tours", "field work"],
        priority=2,
        source_name="UF Detmold program page"
    )
]