from app.schemas.tip import CityTipCreate
bonn_tips = [
    CityTipCreate(
        city_slug="bonn",
        category="academics",
        title="UF Exchange - Rheinische Friedrich-Wilhelms Universität Bonn Program Overview",
        content=(
            "All UF students are welcome to study at the University of Bonn for a semester or full academic year. "
            "Bonn is considered one of Europe's most important institutions of higher education, a leading research university, and a prominent international institution. "
            "Alumni include five Nobel Prize winners. Exchange students can enroll in courses from a variety of academic disciplines, including Natural Sciences, Social Sciences, and Humanities. "
            "Special German language and culture courses are offered by Bonn's International Office. ECTS credits typically convert 2:1 to UF credits."
        ),
        short_description="UF-specific details for Bonn exchange program.",
        tags=["UF-specific", "Bonn", "exchange", "research", "Nobel", "faculty-led"],
        priority=10,
        source_name="UF Bonn program page",
        program="UF Exchange - Rheinische Friedrich-Wilhelms Universität Bonn"
    ),
    CityTipCreate(
        city_slug="bonn",
        category="eligibility",
        title="Eligibility & Requirements (Bonn UF Exchange)",
        content="Open to all majors. Minimum 3.0 GPA. Must be in good disciplinary standing.",
        short_description="All majors, 3.0+ GPA, good standing.",
        tags=["eligibility", "GPA", "requirements", "undergraduate", "graduate", "UF only"],
        priority=11,
        source_name="UF Bonn program page",
        program="UF Exchange - Rheinische Friedrich-Wilhelms Universität Bonn"
    ),
    CityTipCreate(
        city_slug="bonn",
        category="academics",
        title="Academic Departments & Courses (Bonn UF Exchange)",
        content=(
            "Exchange students can enroll in courses from Natural Sciences, Social Sciences, Humanities, and more. "
            "Special German language and culture courses are available at different levels. The International Office offers 'Germany in a Global Context' taught in English. "
            "ECTS credits typically convert 2:1 to UF credits. Contact the Study Abroad Advisor for credit conversion details."
        ),
        short_description="Wide range of disciplines; German language and culture courses; ECTS credits convert 2:1 to UF credits.",
        tags=["academics", "natural sciences", "social sciences", "humanities", "German", "ECTS", "courses"],
        priority=12,
        source_name="UF Bonn program page",
        program="UF Exchange - Rheinische Friedrich-Wilhelms Universität Bonn"
    ),
    CityTipCreate(
        city_slug="bonn",
        category="city life",
        title="Bonn City Overview (UF Exchange)",
        content=(
            "Bonn is located in the southernmost part of the Rhine-Ruhr region, the largest metropolitan area of Germany. "
            "The city is famous for Beethoven, the Bonn Theatre, Schauspiel Biennale festival, art museums, and the German Museum. "
            "Every spring, Bonn comes alive with cherry blossom trees. Bonn is easily accessible to Cologne and Düsseldorf."
        ),
        short_description="General city overview for Bonn exchange students.",
        tags=["general", "city overview", "Bonn", "Rhine", "Beethoven", "festivals", "museums", "cherry blossoms"],
        priority=13,
        source_name="General Bonn info",
        program="UF Exchange - Rheinische Friedrich-Wilhelms Universität Bonn"
    ),
    CityTipCreate(
        city_slug="bonn",
        category="housing",
        title="Housing in Bonn (UF Exchange)",
        content=(
            "Exchange students can reserve a dorm room after acceptance. Dorms are operated by Studierendenwerk Bonn, with over 30 complexes. All rooms are single, some with kitchenette and private bathroom, others with shared facilities. Rent is $400-$500/month. Private housing is also an option, but can be difficult."
        ),
        short_description="Reserve dorms via Studierendenwerk Bonn; single rooms; $400-$500/month; private housing possible.",
        tags=["housing", "student housing", "Studierendenwerk", "Bonn", "dorm", "private", "rent"],
        priority=14,
        source_name="UF Bonn program page",
        program="UF Exchange - Rheinische Friedrich-Wilhelms Universität Bonn"
    ),
]
# Tips for UF students studying abroad in Würzburg (TASSEP - Universität Würzburg)
wurzburg_tips = [
    CityTipCreate(
        city_slug="wurzburg",
        category="academics",
        title="TASSEP - Universität Würzburg Program Overview",
        content=(
            "The Trans-Atlantic Science Student Exchange Program (TASSEP) is a consortium of universities from the EU, Canada, and the US. "
            "TASSEP allows science students to take most junior-level courses abroad and graduate on time, with strong academic advising and credit transfer support. "
            "UF students participate in a UF Exchange program, paying UF tuition and earning UF GPA credit."
        ),
        short_description="UF-specific details for TASSEP - Universität Würzburg exchange program.",
        tags=["eligibility", "GPA", "requirements", "undergraduate", "UF only"],
        priority=11,
        source_name="UF TASSEP Würzburg program page",
        program="TASSEP - Universität Würzburg"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="academics",
        title="Academic Departments & Courses (TASSEP - Universität Würzburg)",
        content=(
            "Departments and courses available at Universität Würzburg include Biology, Chemistry, and Mathematics. "
            "Language of instruction is German. See the university website for more information about available courses."
        ),
        short_description="Biology, Chemistry, Mathematics; courses taught in German.",
        tags=["academics", "biology", "chemistry", "mathematics", "German", "courses"],
        priority=12,
        source_name="UF TASSEP Würzburg program page",
        program="TASSEP - Universität Würzburg"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="city life",
        title="Würzburg City Overview (TASSEP - Universität Würzburg)",
        content=(
            "Würzburg is a lively university city in Bavaria, set on the vine-clad banks of the Main River. "
            "The city features beautiful baroque masterpieces, Franconian wineries, and serves as a picturesque starting point for Bavaria’s Romantic Road."
        ),
        short_description="General city overview for TASSEP Würzburg students.",
        tags=["general", "city overview", "Bavaria", "baroque", "wineries", "Romantic Road"],
        priority=13,
        source_name="General Würzburg info",
        program="TASSEP - Universität Würzburg"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="housing",
        title="Housing in Würzburg (TASSEP - Universität Würzburg)",
        content="More information about housing can be found on the University of Würzburg's website. Exchange students should apply early for best placement.",
        short_description="Apply early for student housing; see university website for details.",
        tags=["housing", "student housing", "apply early", "Würzburg"],
        priority=14,
        source_name="UF TASSEP Würzburg program page",
        program="TASSEP - Universität Würzburg"
    ),
]

vienna_boku_exchange_tips = [
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="UF Exchange - University of Natural Resources and Life Sciences (BOKU) Program Overview",
        content=(
            "The University of Natural Resources and Life Sciences, Vienna (BOKU), founded in 1872, is renowned for its research and communication of sustainability solutions and protection of natural resources. "
            "UF students participate in a UF Exchange program, earning UF GPA credit. BOKU offers a wide scientific spectrum, from agrarian issues to biotechnological research. "
            "Bachelor-level programs include Agricultural Sciences, Environment & Bio-Resources Management, Environmental Sciences & Civil Engineering, Equine Sciences, Food Science & Biotechnology, Forestry, Landscape Architecture & Planning, Wood & Fiber Technology. "
            "Courses are listed with ECTS credits (typically 2:1 conversion to UF credits). Courses for a specific semester are published online just before the semester begins; students should review offerings from the previous year. "
            "Program Advisor: Morgan Williams-Franklin."
        ),
        short_description="UF-specific details for BOKU Vienna exchange program.",
        tags=["UF-specific", "BOKU", "exchange", "sustainability", "agriculture", "faculty-led"],
        priority=10,
        source_name="UF BOKU Vienna program page",
        program="UF Exchange - University of Natural Resources and Life Sciences (BOKU)"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="eligibility",
        title="Eligibility & Requirements (BOKU Vienna UF Exchange)",
        content="Must have completed at least 12 credit hours at UF, minimum 2.5 GPA, and be in good standing. Open to undergraduate and graduate students. Not open to non-UF students.",
        short_description="12+ credits, 2.5+ GPA, good standing, UF only.",
        tags=["eligibility", "GPA", "requirements", "undergraduate", "graduate", "UF only"],
        priority=11,
        source_name="UF BOKU Vienna program page",
        program="UF Exchange - University of Natural Resources and Life Sciences (BOKU)"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="Academic Departments & Courses (BOKU Vienna UF Exchange)",
        content=(
            "BOKU offers Bachelor-level programs in Agricultural Sciences, Environment & Bio-Resources Management, Environmental Sciences & Civil Engineering, Equine Sciences, Food Science & Biotechnology, Forestry, Landscape Architecture & Planning, Wood & Fiber Technology. "
            "Courses are listed with ECTS credits (typically 2:1 conversion to UF credits). Students can choose courses from various subjects, as long as they meet prerequisites."
        ),
        short_description="Wide range of science and sustainability courses; ECTS credits convert 2:1 to UF credits.",
        tags=["academics", "agriculture", "environment", "bio-resources", "ECTS", "courses"],
        priority=12,
        source_name="UF BOKU Vienna program page",
        program="UF Exchange - University of Natural Resources and Life Sciences (BOKU)"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="city life",
        title="Vienna City Overview (BOKU Vienna UF Exchange)",
        content=(
            "Vienna is Austria's capital, famous for its Baroque streetscapes, imperial palaces, artistic and musical masterpieces, coffee-house culture, and vibrant design scene. "
            "The city offers excellent public transportation, abundant green spaces, and recreational areas such as the Wienerwald, Prater, and Donauinsel. "
            "Vienna is an international city with a population of over 1.7 million, blending imperial traditions with modern architecture."
        ),
        short_description="General city overview for BOKU Vienna students.",
        tags=["general", "city overview", "Vienna", "culture", "transportation", "green space"],
        priority=13,
        source_name="General Vienna info",
        program="UF Exchange - University of Natural Resources and Life Sciences (BOKU)"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="housing",
        title="Housing in Vienna (BOKU UF Exchange)",
        content=(
            "BOKU does not arrange accommodation for students or aid in their search. Living in Vienna can be expensive; expect to pay $400-$800/month for rent. "
            "Student residence halls are an easy option; use OeAD (Austrian Exchange Office) to book a room, or contact dormitories directly for potentially cheaper options. Private accommodations are also available. "
            "See the university website and OeAD for more information on housing options."
        ),
        short_description="Apply early for student housing; use OeAD or contact dorms directly.",
        tags=["housing", "student housing", "OeAD", "Vienna", "apply early"],
        priority=14,
        source_name="UF BOKU Vienna program page",
        program="UF Exchange - University of Natural Resources and Life Sciences (BOKU)"
    ),
]

ebs_tips = [
    CityTipCreate(
        city_slug="ebs",
        category="academics",
        title="UF Exchange - EBS Universität für Wirtschaft und Recht Program Overview",
        content=(
            "The EBS University of Business and Law exchange program is open only to graduate business students. "
            "If interested, contact Ana Portocarrero, Director of MAIB and MSM programs (ana.portocarrero@warrington.ufl.edu). "
            "Program Type: UF Exchange. Experience Type: Traditional Study. Duration: Ten or more weeks. "
            "Field of Study: Business Administration. UF students earn UF GPA credit."
        ),
        short_description="UF-specific details for EBS Universität für Wirtschaft und Recht exchange program.",
        tags=["UF-specific", "EBS", "exchange", "business", "graduate", "faculty-led"],
        priority=10,
        source_name="UF EBS program page",
        program="UF Exchange - EBS Universität für Wirtschaft und Recht"
    ),
    CityTipCreate(
        city_slug="ebs",
        category="eligibility",
        title="Eligibility & Requirements (EBS UF Exchange)",
        content="Open only to graduate business students. Not open to non-UF students.",
        short_description="Graduate business students, UF only.",
        tags=["eligibility", "graduate", "business", "UF only"],
        priority=11,
        source_name="UF EBS program page",
        program="UF Exchange - EBS Universität für Wirtschaft und Recht"
    ),
    CityTipCreate(
        city_slug="ebs",
        category="academics",
        title="Academic Departments & Courses (EBS UF Exchange)",
        content=(
            "EBS offers graduate-level courses in Business Administration. Students participate in traditional study for ten or more weeks. "
            "Contact the program director for more information about available courses."
        ),
        short_description="Graduate business courses; traditional study, ten or more weeks.",
        tags=["academics", "business", "graduate", "courses"],
        priority=12,
        source_name="UF EBS program page",
        program="UF Exchange - EBS Universität für Wirtschaft und Recht"
    ),
    CityTipCreate(
        city_slug="ebs",
        category="city life",
        title="EBS City Overview (UF Exchange)",
        content=(
            "EBS Universität für Wirtschaft und Recht is located in Wiesbaden and Oestrich-Winkel, Germany. "
            "Wiesbaden is a historic spa city known for its architecture, parks, and vibrant business community. "
            "Oestrich-Winkel is in the scenic Rheingau wine region, offering a picturesque setting for study."
        ),
        short_description="General city overview for EBS UF Exchange students.",
        tags=["general", "city overview", "Wiesbaden", "Oestrich-Winkel", "Rheingau", "business"],
        priority=13,
        source_name="General EBS info",
        program="UF Exchange - EBS Universität für Wirtschaft und Recht"
    ),
    CityTipCreate(
        city_slug="ebs",
        category="housing",
        title="Housing for EBS UF Exchange Students",
        content=(
            "Students are responsible for arranging their own housing. Options include student residence halls, private apartments, and shared flats. "
            "Contact the university or program director for guidance on housing options. Apply early for best placement."
        ),
        short_description="Arrange your own housing; apply early for best options.",
        tags=["housing", "student housing", "private", "shared", "apply early"],
        priority=14,
        source_name="UF EBS program page",
        program="UF Exchange - EBS Universität für Wirtschaft und Recht"
    ),
]

eltville_tips = [
    CityTipCreate(
        city_slug="eltville",
        category="academics",
        title="Advanced Pharmacy Practical Experience - Eltville Program Overview",
        content=(
            "This program is for pre-approved UF Pharmacy students. For more information and eligibility, contact Dr. Randell Doty (doty@cop.ufl.edu). "
            "Program Type: Independent Study. College: Pharmacy. Level: Graduate. UF students earn UF GPA credit. "
            "Program Advisor: Iva Lien."
        ),
        short_description="UF-specific details for Advanced Pharmacy Practical Experience in Eltville.",
        tags=["UF-specific", "Pharmacy", "independent study", "graduate", "faculty-led"],
        priority=10,
        source_name="UF Eltville Pharmacy program page",
        program="Advanced Pharmacy Practical Experience - Eltville"
    ),
    CityTipCreate(
        city_slug="eltville",
        category="eligibility",
        title="Eligibility & Requirements (Eltville Pharmacy UF Independent Study)",
        content="Open only to pre-approved UF Pharmacy graduate students. Not open to non-UF students.",
        short_description="Pre-approved UF Pharmacy graduate students, UF only.",
        tags=["eligibility", "graduate", "Pharmacy", "UF only"],
        priority=11,
        source_name="UF Eltville Pharmacy program page",
        program="Advanced Pharmacy Practical Experience - Eltville"
    ),
    CityTipCreate(
        city_slug="eltville",
        category="academics",
        title="Academic Departments & Courses (Eltville Pharmacy UF Independent Study)",
        content=(
            "The program offers advanced practical experience in Pharmacy. Contact Dr. Randell Doty for more information about available coursework and requirements."
        ),
        short_description="Advanced practical experience in Pharmacy; independent study.",
        tags=["academics", "Pharmacy", "graduate", "courses"],
        priority=12,
        source_name="UF Eltville Pharmacy program page",
        program="Advanced Pharmacy Practical Experience - Eltville"
    ),
    CityTipCreate(
        city_slug="eltville",
        category="city life",
        title="Eltville City Overview (UF Pharmacy Independent Study)",
        content=(
            "Eltville am Rhein is a picturesque town in the Rheingau wine region, known for its historic castle, vineyards, and riverside promenades. "
            "The town offers a peaceful setting for study and easy access to Wiesbaden and Frankfurt."
        ),
        short_description="General city overview for Eltville Pharmacy students.",
        tags=["general", "city overview", "Eltville", "Rheingau", "Pharmacy"],
        priority=13,
        source_name="General Eltville info",
        program="Advanced Pharmacy Practical Experience - Eltville"
    ),
    CityTipCreate(
        city_slug="eltville",
        category="housing",
        title="Housing for Eltville Pharmacy UF Independent Study Students",
        content=(
            "Students are responsible for arranging their own housing. Options include student residence halls, private apartments, and shared flats. "
            "Contact the university or program director for guidance on housing options. Apply early for best placement."
        ),
        short_description="Arrange your own housing; apply early for best options.",
        tags=["housing", "student housing", "private", "shared", "apply early"],
        priority=14,
        source_name="UF Eltville Pharmacy program page",
        program="Advanced Pharmacy Practical Experience - Eltville"
    ),
]

munich_pharmacy_tips = [
    CityTipCreate(
        city_slug="munich",
        category="academics",
        title="Advanced Pharmacy Practical Experience - Munich Program Overview",
        content=(
            "This program is for pre-approved UF Pharmacy students. For more information and eligibility, contact Dr. Randell Doty (doty@cop.ufl.edu). "
            "Program Type: Independent Study. College: Pharmacy. Level: Graduate. UF students earn UF GPA credit. "
            "Program Advisor: Iva Lien."
        ),
        short_description="UF-specific details for Advanced Pharmacy Practical Experience in Munich.",
        tags=["UF-specific", "Pharmacy", "independent study", "graduate", "faculty-led"],
        priority=10,
        source_name="UF Munich Pharmacy program page",
        program="Advanced Pharmacy Practical Experience - Munich"
    ),
    CityTipCreate(
        city_slug="munich",
        category="eligibility",
        title="Eligibility & Requirements (Munich Pharmacy UF Independent Study)",
        content="Open only to pre-approved UF Pharmacy graduate students. Not open to non-UF students.",
        short_description="Pre-approved UF Pharmacy graduate students, UF only.",
        tags=["eligibility", "graduate", "Pharmacy", "UF only"],
        priority=11,
        source_name="UF Munich Pharmacy program page",
        program="Advanced Pharmacy Practical Experience - Munich"
    ),
    CityTipCreate(
        city_slug="munich",
        category="academics",
        title="Academic Departments & Courses (Munich Pharmacy UF Independent Study)",
        content=(
            "The program offers advanced practical experience in Pharmacy. Contact Dr. Randell Doty for more information about available coursework and requirements."
        ),
        short_description="Advanced practical experience in Pharmacy; independent study.",
        tags=["academics", "Pharmacy", "graduate", "courses"],
        priority=12,
        source_name="UF Munich Pharmacy program page",
        program="Advanced Pharmacy Practical Experience - Munich"
    ),
    CityTipCreate(
        city_slug="munich",
        category="city life",
        title="Munich City Overview (UF Pharmacy Independent Study)",
        content=(
            "Munich is one of the most beautiful and safest cities in Germany, blending traditional and modern flair, breathtaking nature, and beautiful architecture. "
            "The city offers easy access to leisure activities, cultural and social life, and is a hub for innovation and science."
        ),
        short_description="General city overview for Munich Pharmacy students.",
        tags=["general", "city overview", "Munich", "Pharmacy"],
        priority=13,
        source_name="General Munich info",
        program="Advanced Pharmacy Practical Experience - Munich"
    ),
    CityTipCreate(
        city_slug="munich",
        category="housing",
        title="Housing for Munich Pharmacy UF Independent Study Students",
        content=(
            "Students are responsible for arranging their own housing. Options include student residence halls, private apartments, and shared flats. "
            "Contact the university or program director for guidance on housing options. Apply early for best placement."
        ),
        short_description="Arrange your own housing; apply early for best options.",
        tags=["housing", "student housing", "private", "shared", "apply early"],
        priority=14,
        source_name="UF Munich Pharmacy program page",
        program="Advanced Pharmacy Practical Experience - Munich"
    ),
]

salzburg_tips = [
    CityTipCreate(
        city_slug="salzburg",
        category="academics",
        title="UF in Salzburg - Business Program Overview",
        content=(
            "UF in Salzburg offers programs in Music, European Studies, and Business. The Business track includes HIS 4956: Contemporary Austrian History and POS 4956/ECO 4956: Economics and Politics of the European Union. "
            "Students experience the European way of life, culture, arts, and business worlds. Total UF GPA credits: 6. Program Advisor: Morgan Williams-Franklin. Program Directors: Mutlu Çitim-Kepic, Glenn Kepic."
        ),
        short_description="UF-specific details for UF in Salzburg - Business program.",
        tags=["UF-specific", "Salzburg", "business", "faculty-led", "study abroad"],
        priority=10,
        source_name="UF Salzburg Business program page",
        program="UF in Salzburg - Business"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="eligibility",
        title="Eligibility & Requirements (UF in Salzburg - Business)",
        content="Open to all majors. 2.5 GPA or higher. Students in good disciplinary standing. Undergraduate students preferred, graduates considered. Interview required with program coordinator.",
        short_description="All majors, 2.5+ GPA, good standing, interview required.",
        tags=["eligibility", "GPA", "requirements", "undergraduate", "graduate", "interview"],
        priority=11,
        source_name="UF Salzburg Business program page",
        program="UF in Salzburg - Business"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="academics",
        title="Academic Tracks & Courses (UF in Salzburg - Business)",
        content=(
            "Business track: HIS 4956: Contemporary Austrian History; POS 4956/ECO 4956: Economics and Politics of the European Union. "
            "European Studies track: HIS 4956; POS 4956/ECO 4956. Music track: Instrumental/Vocal Lessons; MUH 3212: Music History II. Optional: Voices of Salzburg Oral History Project (0 credits, open to all tracks)."
        ),
        short_description="Business, European Studies, and Music tracks; 6 UF GPA credits.",
        tags=["academics", "business", "European Studies", "music", "courses", "credits"],
        priority=12,
        source_name="UF Salzburg Business program page",
        program="UF in Salzburg - Business"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="city life",
        title="Salzburg City Overview (UF in Salzburg - Business)",
        content=(
            "Salzburg is considered one of the most beautiful cities in Europe, situated in the heart of Europe on the northern edge of the eastern Alps at the Austrian-German border. "
            "The city mirrors more than a thousand years of European history and culture in its UNESCO World Heritage historical center. Rich cultural heritage is reflected in concerts, festivals, and events throughout the year. Population: ~150,000."
        ),
        short_description="General city overview for UF in Salzburg students.",
        tags=["general", "city overview", "Salzburg", "culture", "heritage", "UNESCO"],
        priority=13,
        source_name="General Salzburg info",
        program="UF in Salzburg - Business"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="excursions",
        title="Excursions for UF in Salzburg - Business",
        content=(
            "Salzburg: Guided tours of Fortress Hohensalzburg and Hellbrunn Palace, visit to Salzburg Festival Halls, optional concert performance. "
            "Salzkammergut: Mauthausen Concentration Camp, St. Florian Monastery, Mondsee, St. Michael's Basilica, hiking in lake region. "
            "Vienna: 4-day trip with guided walking tour, UN tour, Vienna State Opera, Austrian Parliament, Schönbrunn Palace. Munich, Germany: day trip."
        ),
        short_description="Guided tours, concerts, excursions to Vienna, Munich, Salzkammergut.",
        tags=["excursions", "Salzburg", "Vienna", "Munich", "Salzkammergut", "tours"],
        priority=14,
        source_name="UF Salzburg Business program page",
        program="UF in Salzburg - Business"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="housing",
        title="Housing for UF in Salzburg - Business Students",
        content=(
            "Students stay at the Dorint City-Hotel Salzburg. Contact program advisor or directors for more information about housing arrangements."
        ),
        short_description="Dorint City-Hotel Salzburg; contact advisor for details.",
        tags=["housing", "hotel", "Salzburg", "student housing"],
        priority=15,
        source_name="UF Salzburg Business program page",
        program="UF in Salzburg - Business"
    ),
]

salzburg_music_tips = [
    CityTipCreate(
        city_slug="salzburg",
        category="academics",
        title="UF in Salzburg - Music Program Overview",
        content=(
            "UF in Salzburg offers programs in Music, European Studies, and Business. Music majors and minors may take private lessons, music history, and/or arranging. "
            "European Studies provides major credit for History and Political Science majors. Experience the European way of life, culture, arts, and business worlds. "
            "Salzburg is considered one of the most beautiful cities in Europe, situated in the heart of Europe on the northern edge of the eastern Alps at the Austrian-German border. "
            "The city mirrors more than a thousand years of European history and culture in its UNESCO World Heritage historical center. Rich cultural heritage is reflected in concerts, festivals, and events throughout the year."
        ),
        short_description="UF-specific details for UF in Salzburg - Music program.",
        tags=["UF-specific", "Salzburg", "music", "faculty-led", "study abroad"],
        priority=10,
        source_name="UF Salzburg Music program page",
        program="UF in Salzburg - Music"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="eligibility",
        title="Eligibility & Requirements (UF in Salzburg - Music)",
        content="Open to all majors. 2.5 GPA or higher. Students in good disciplinary standing. Undergraduate students preferred, graduates considered. Interview required with program coordinator.",
        short_description="All majors, 2.5+ GPA, good standing, interview required.",
        tags=["eligibility", "GPA", "requirements", "undergraduate", "graduate", "interview"],
        priority=11,
        source_name="UF Salzburg Music program page",
        program="UF in Salzburg - Music"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="academics",
        title="Academic Tracks & Courses (UF in Salzburg - Music)",
        content=(
            "Music track: Instrumental/Vocal Lessons; MUH 3212: Music History II. "
            "Business track: HIS 4956: Contemporary Austrian History; POS 4956/ECO 4956: Economics and Politics of the European Union. "
            "European Studies track: HIS 4956; POS 4956/ECO 4956. "
            "Optional: Voices of Salzburg Oral History Project (0 credits, open to all tracks). Total UF GPA credits: 6."
        ),
        short_description="Music, Business, and European Studies tracks; 6 UF GPA credits.",
        tags=["academics", "music", "business", "European Studies", "courses", "credits"],
        priority=12,
        source_name="UF Salzburg Music program page",
        program="UF in Salzburg - Music"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="city life",
        title="Salzburg City Overview (UF in Salzburg - Music)",
        content=(
            "Salzburg is considered one of the most beautiful cities in Europe, situated in the heart of Europe on the northern edge of the eastern Alps at the Austrian-German border. "
            "The city mirrors more than a thousand years of European history and culture in its UNESCO World Heritage historical center. Rich cultural heritage is reflected in concerts, festivals, and events throughout the year. Population: ~150,000."
        ),
        short_description="General city overview for UF in Salzburg Music students.",
        tags=["general", "city overview", "Salzburg", "culture", "heritage", "UNESCO"],
        priority=13,
        source_name="General Salzburg info",
        program="UF in Salzburg - Music"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="excursions",
        title="Excursions for UF in Salzburg - Music",
        content=(
            "Salzburg: Guided tours of Fortress Hohensalzburg and Hellbrunn Palace, visit to Salzburg Festival Halls, optional concert performance. "
            "Salzkammergut: Mauthausen Concentration Camp, St. Florian Monastery, Mondsee, St. Michael's Basilica, hiking in lake region. "
            "Vienna: 4-day trip with guided walking tour, UN tour, Vienna State Opera, Austrian Parliament, Schönbrunn Palace. Munich, Germany: day trip."
        ),
        short_description="Guided tours, concerts, excursions to Vienna, Munich, Salzkammergut.",
        tags=["excursions", "Salzburg", "Vienna", "Munich", "Salzkammergut", "tours"],
        priority=14,
        source_name="UF Salzburg Music program page",
        program="UF in Salzburg - Music"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="housing",
        title="Housing for UF in Salzburg - Music Students",
        content=(
            "Students stay at the Dorint City-Hotel Salzburg. Contact program advisor or directors for more information about housing arrangements."
        ),
        short_description="Dorint City-Hotel Salzburg; contact advisor for details.",
        tags=["housing", "hotel", "Salzburg", "student housing"],
        priority=15,
        source_name="UF Salzburg Music program page",
        program="UF in Salzburg - Music"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="costs",
        title="Program Costs (UF in Salzburg - Music)",
        content=(
            "2026 program fee: $9,592. A $395 nonrefundable deposit is due at application. Remaining fees are due 45 days prior to departure. Financial aid may allow payment deferment. Tuition for 6 credits, housing, 2 meals/day, guided tours, excursions, events, health insurance, and emergency medical assistance are included. Not included: airfare, personal travel, personal expenses."
        ),
        short_description="Program fee $9,592; deposit $395; includes tuition, housing, meals, excursions, insurance.",
        tags=["costs", "fees", "tuition", "housing", "meals", "excursions", "insurance"],
        priority=16,
        source_name="UF Salzburg Music program page",
        program="UF in Salzburg - Music"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="financial aid",
        title="Financial Aid for UF in Salzburg - Music",
        content=(
            "Most financial aid received on campus can be applied to the cost of this study abroad program, but eligibility is determined by the Office of Student Financial Aid and Scholarships (SFA). Contact SFA for details."
        ),
        short_description="Financial aid may apply; eligibility determined by SFA.",
        tags=["financial aid", "scholarships", "cost", "planning"],
        priority=17,
        source_name="UF Salzburg Music program page",
        program="UF in Salzburg - Music"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="scholarships",
        title="Scholarships for UF in Salzburg - Music",
        content=(
            "UF International Center sponsors many study abroad scholarships. UFIC scholarships, UF colleges, departments, and national organizations offer additional scholarships. Students who apply for UFIC scholarships are considered for all eligible awards. Check UFIC Scholarship Application page for requirements."
        ),
        short_description="UFIC and other scholarships available; check eligibility requirements.",
        tags=["scholarships", "UFIC", "awards", "study abroad"],
        priority=18,
        source_name="UF Salzburg Music program page",
        program="UF in Salzburg - Music"
    ),
]
from app.schemas.tip import CityTipCreate

wu_vienna_undergrad_tips = [
    CityTipCreate(
        city_slug="wu_vienna",
        category="academics",
        title="UF Exchange - WU Vienna University of Economics and Business Program Overview (Undergraduate)",
        content=(
            "WU is the EU’s largest educational institution for business and economics, business law, and social sciences, with about 26,000 students. "
            "Founded in 1898 as the 'Imperial Export Academy,' WU prepares students for international trade and business. "
            "WU values international education, research-based teaching, and maintains EQUIS accreditation. "
            "The campus features modern buildings and open green spaces. UF students participate in a UF Exchange program, earning UF GPA credit. "
            "Learn more about this program on the Heavener International Programs website."
        ),
        short_description="UF-specific details for WU Vienna undergraduate exchange program.",
        tags=["UF-specific", "WU Vienna", "exchange", "business", "undergraduate", "faculty-led"],
        priority=10,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business (Undergraduate)"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="eligibility",
        title="Eligibility & Requirements (WU Vienna UF Exchange - Undergraduate)",
        content="Must have completed at least 12 credit hours at UF, minimum 3.0 GPA, and be in good disciplinary standing. Should study in the Warrington College of Business. Non-business undergraduates must obtain permission from WCBA advisors. Undergraduate business students receive priority, but additional students may be accommodated on a space-available basis.",
        short_description="12+ credits, 3.0+ GPA, good standing, business students prioritized.",
        tags=["eligibility", "GPA", "requirements", "undergraduate", "business", "UF only"],
        priority=11,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business (Undergraduate)"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="academics",
        title="Academic Departments & Courses (WU Vienna UF Exchange - Undergraduate)",
        content=(
            "WU offers a wide variety of courses taught in English. Students can search WU Vienna's course catalog and use the Warrington College of Business course equivalency database to see how courses transfer back to UF. "
            "Courses not listed in the database require case-by-case approval. Language of instruction: English and German. Program Advisor: Morgan Williams-Franklin."
        ),
        short_description="Wide range of business courses; English and German instruction.",
        tags=["academics", "business", "undergraduate", "courses", "English", "German"],
        priority=12,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business (Undergraduate)"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="academics",
        title="Pre-Semester Programs (WU Vienna UF Exchange - Undergraduate)",
        content=(
            "WU Vienna offers a pre-semester German Language Program (beginner to advanced) and an Orientation and Cultural Program. "
            "Language Program: two weeks, ~€50 fee, 2 ECTS (1 UF credit), mornings. Orientation Program: two weeks, ~€375 fee, social activities, out-of-town trips, presentations, afternoons. Spaces are limited; apply early. Students can participate in both programs."
        ),
        short_description="Pre-semester German Language and Orientation programs available.",
        tags=["academics", "language", "orientation", "German", "pre-semester", "ECTS"],
        priority=13,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business (Undergraduate)"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="city life",
        title="Vienna City Overview (WU Vienna UF Exchange - Undergraduate)",
        content=(
            "Vienna is one of the safest, most beautiful capital cities in Europe, home to key international organizations and consistently rated as one of the world’s most livable cities. "
            "The city is a prime cultural center with abundant architecture, palaces, theaters, opera houses, museums, and seasonal attractions. "
            "Quality of life is high due to parks, green spaces, and vibrant cafe culture."
        ),
        short_description="General city overview for WU Vienna undergraduate students.",
        tags=["general", "city overview", "Vienna", "culture", "parks", "livability"],
        priority=14,
        source_name="General Vienna info",
        program="UF Exchange - WU Vienna University of Economics and Business (Undergraduate)"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="housing",
        title="Housing in Vienna (WU Vienna UF Exchange - Undergraduate)",
        content=(
            "Students can apply to live in a WU dorm or seek private accommodation. Dorm housing is arranged by OeAD, with pre-reserved quotas for exchange students. Apply early for best placement. Dorms are located throughout the city. "
            "Housing costs: €450–700/month. Students are responsible for reserving and securing their own housing. Private options are available."
        ),
        short_description="Apply early for OeAD dorms or seek private housing; €450–700/month.",
        tags=["housing", "student housing", "OeAD", "Vienna", "apply early", "private"],
        priority=15,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business (Undergraduate)"
    ),
]
wu_vienna_tips = [
    CityTipCreate(
        city_slug="wu_vienna",
        category="academics",
        title="UF Exchange - WU Vienna University of Economics and Business Program Overview",
        content=(
            "WU is the EU’s largest educational institution for business and economics, business law, and social sciences, with about 26,000 students. "
            "Founded in 1898 as the 'Imperial Export Academy,' WU prepares students for international trade and business. "
            "WU values international education, research-based teaching, and maintains EQUIS accreditation. "
            "The campus features modern buildings and open green spaces. UF students participate in a UF Exchange program, earning UF GPA credit. "
            "Learn more about this program on the Heavener International Programs website."
        ),
        short_description="UF-specific details for WU Vienna exchange program.",
        tags=["UF-specific", "WU Vienna", "exchange", "business", "graduate", "faculty-led"],
        priority=10,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="eligibility",
        title="Eligibility & Requirements (WU Vienna UF Exchange)",
        content="Must have completed at least 12 credit hours at UF, minimum 3.0 GPA, and be in good disciplinary standing. Should study in the Warrington College of Business. Non-business undergraduates must obtain permission from WCBA advisors. Undergraduate business students receive priority, but additional students may be accommodated on a space-available basis.",
        short_description="12+ credits, 3.0+ GPA, good standing, business students prioritized.",
        tags=["eligibility", "GPA", "requirements", "undergraduate", "graduate", "business", "UF only"],
        priority=11,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="academics",
        title="Academic Departments & Courses (WU Vienna UF Exchange)",
        content=(
            "WU offers a wide variety of courses taught in English. Students can search WU Vienna's course catalog and use the Warrington College of Business course equivalency database to see how courses transfer back to UF. "
            "Courses not listed in the database require case-by-case approval. Language of instruction: English and German. Program Advisor: Morgan Williams-Franklin."
        ),
        short_description="Wide range of business courses; English and German instruction.",
        tags=["academics", "business", "graduate", "courses", "English", "German"],
        priority=12,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="academics",
        title="Pre-Semester Programs (WU Vienna UF Exchange)",
        content=(
            "WU Vienna offers a pre-semester German Language Program (beginner to advanced) and an Orientation and Cultural Program. "
            "Language Program: two weeks, ~€50 fee, 2 ECTS (1 UF credit), mornings. Orientation Program: two weeks, ~€375 fee, social activities, out-of-town trips, presentations, afternoons. Spaces are limited; apply early. Students can participate in both programs."
        ),
        short_description="Pre-semester German Language and Orientation programs available.",
        tags=["academics", "language", "orientation", "German", "pre-semester", "ECTS"],
        priority=13,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="city life",
        title="Vienna City Overview (WU Vienna UF Exchange)",
        content=(
            "Vienna is one of the safest, most beautiful capital cities in Europe, home to key international organizations and consistently rated as one of the world’s most livable cities. "
            "The city is a prime cultural center with abundant architecture, palaces, theaters, opera houses, museums, and seasonal attractions. "
            "Quality of life is high due to parks, green spaces, and vibrant cafe culture."
        ),
        short_description="General city overview for WU Vienna students.",
        tags=["general", "city overview", "Vienna", "culture", "parks", "livability"],
        priority=14,
        source_name="General Vienna info",
        program="UF Exchange - WU Vienna University of Economics and Business"
    ),
    CityTipCreate(
        city_slug="wu_vienna",
        category="housing",
        title="Housing in Vienna (WU Vienna UF Exchange)",
        content=(
            "Students can apply to live in a WU dorm or seek private accommodation. Dorm housing is arranged by OeAD, with pre-reserved quotas for exchange students. Apply early for best placement. Dorms are located throughout the city. "
            "Housing costs: €450–700/month. Students are responsible for reserving and securing their own housing. Private options are available."
        ),
        short_description="Apply early for OeAD dorms or seek private housing; €450–700/month.",
        tags=["housing", "student housing", "OeAD", "Vienna", "apply early", "private"],
        priority=15,
        source_name="UF WU Vienna program page",
        program="UF Exchange - WU Vienna University of Economics and Business"
    ),
]
hamburg_tips = [
    # Removed duplicate Hamburg tips
    # Munich tips moved to their own array below
    CityTipCreate(
        city_slug="hamburg",
        category="city life",
        title="Living in Hamburg: Port city, canals, culture, and maritime soul",
        content="Hamburg is Germany's gateway to the world, famous for its port, canals, vibrant culture, and green neighborhoods. The city offers a high quality of life, international atmosphere, and plenty of student activities.",
        short_description="Port city, canals, culture, international student life.",
        tags=["city life", "culture", "port", "canals", "students"],
        priority=0,
        source_name="General city info"
    ),
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
        source_name="UF HAW Hamburg program page",
        program="UF Exchange - HAW Hamburg"
    ),
    # Student testimonials
    CityTipCreate(
        city_slug="hamburg",
        category="fun",
        title="Student Testimonial: Hamburg is one of the most beautiful cities",
        content=(
            "\"In my opinion, Hamburg is one of the most beautiful cities in Germany. "
            "When you enjoy a drink in the Tower Bar you have an unbelievable view of the harbour, "
            "the Elbe and the roof tops of Hamburg.\" - Shanti, Netherlands"
        ),
        short_description="Exchange student recommends the Tower Bar for harbour views.",
        tags=["testimonial", "student life", "hamburg", "Tower Bar", "harbour"],
        priority=3,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Student Testimonial: Professors with industry experience",
        content=(
            "\"The professors at the HAW Hamburg have all worked in industry and have a lot of knowledge because of this. "
            "They can explain why the things you learn in class are relevant for your later working life.\" - Cheuk Ho, Hong Kong"
        ),
        short_description="HAW professors bring real industry experience into the classroom.",
        tags=["testimonial", "academics", "professors", "industry"],
        priority=4,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="excursions",
        title="Student Testimonial: Airbus Hamburg site visit",
        content=(
            "\"As part of my classes I visited the Airbus Hamburg site. It was incredible to see the company "
            "and its production facilities from the inside, from the perspective of the engineers working there.\" "
            "- Vanessa, Australia"
        ),
        short_description="Engineering students can visit major companies like Airbus.",
        tags=["testimonial", "excursions", "Airbus", "engineering", "industry visit"],
        priority=5,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    # Course offerings by department
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Media & Film Courses at HAW Hamburg",
        content=(
            "Available courses: Artistic Composition 2, Camera Acting Project (Short Cut), Perception, "
            "Practice Dramaturgy, Sound Design, Studio Hamburg Project, Video Technology & Production, "
            "Video or Audio Project. Classes can be a mixture of German and English, but you do not need "
            "German to complete the classes. Most courses are project-based. "
            "Available: Winter (Sept-Feb) and Summer (March-July) semester."
        ),
        short_description="Project-based media & film courses; no German required.",
        tags=["academics", "media", "film", "courses", "project-based"],
        priority=10,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Design & Art Courses at HAW Hamburg",
        content=(
            "Available courses: Book Illustration*, Brand Design, Design Theory, Drawing, Editorial Design*, "
            "Fashion Design*, Interaction Design*, Interactive Illustration & Games, Painting*, Photography*, "
            "Textile Design, Type Design. Courses marked with * are in German with an English tutorial. "
            "The other classes (except Design Theory) are a mixture of English and German. "
            "In all cases you do not need German to complete the classes. "
            "Available: Winter (Sept-Feb) and Summer (March-July) semester."
        ),
        short_description="Design & art courses with English tutorials; no German required.",
        tags=["academics", "design", "art", "courses", "illustration", "fashion"],
        priority=11,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="International Business Courses at HAW Hamburg",
        content=(
            "Available courses: International Accounting & Taxation, International Business Law, "
            "International Capital Markets, International Corporate Finance, International Economics 2, "
            "International Human Resource Management, International Management, International Marketing, "
            "International Organisation & Cooperation, International Trade & Logistics/FDI, "
            "Academic Research & Writing, Country Studies, Intercultural Communication & Competence, "
            "Project Work. Available: Winter (Sept-Feb) and Summer (March-July) semester."
        ),
        short_description="Comprehensive international business program with 14+ courses.",
        tags=["academics", "business", "international", "courses", "marketing", "finance"],
        priority=12,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Social Work Courses at HAW Hamburg",
        content=(
            "Available courses: Child Abuse & Neglect, Child Protection & Family Treatment, "
            "Children's Books, Digital Natives - youth & digital media, Future of Social Work, "
            "Mental Health & Recovery, Organizational & System Development, "
            "Morality Social Justice & Principles of Human Relationships in modern societies, "
            "Social Policy in the European Union, Qualitative & Quantitative Research Methods. "
            "Based on Bachelor programmes Social Work and Education & Learning in Childhood. "
            "Available: Summer (March-July) semester only."
        ),
        short_description="Social work courses including child protection, mental health, and social policy.",
        tags=["academics", "social work", "courses", "mental health", "child protection"],
        priority=13,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Aeronautical Engineering Courses at HAW Hamburg",
        content=(
            "Available courses: Aircraft Design, Aircraft Engines, Aircraft Systems, "
            "Architecture of the Aircraft Cabin, Electrical Aircraft Cabin Systems, "
            "Mechanical Aircraft Cabin Systems, Aeronautical Engineering research (individual project), "
            "Aeronautical Engineering Design (team project). Where capacity and schedules allow, "
            "it is possible to combine these with automotive or mechanical engineering classes. "
            "Available: Summer (March-July) semester only."
        ),
        short_description="Specialized aeronautical engineering with Airbus industry connections.",
        tags=["academics", "aeronautical", "engineering", "aircraft", "courses"],
        priority=14,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Automotive Engineering Courses at HAW Hamburg",
        content=(
            "Available courses: Introduction to Body in White Design, Introduction to Commercial Vehicle Design, "
            "Introduction to Vehicle Dynamics, Drive Train Design, Finite Element Method (FEM), "
            "Automotive Engineering Design (team project), Automotive Engineering research (individual project). "
            "Where capacity and schedules allow, it is possible to combine these with aeronautical "
            "or mechanical engineering classes. Available: Summer (March-July) semester only."
        ),
        short_description="Automotive engineering with FEM, vehicle dynamics, and team projects.",
        tags=["academics", "automotive", "engineering", "vehicle design", "courses"],
        priority=15,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Mechanical Engineering Courses at HAW Hamburg",
        content=(
            "Available courses: Energy Systems, Finite Elements, Machine Cutting Technology, "
            "Systematic Product Development, Technical Thermodynamics 1. "
            "Where capacity and schedules allow, it is possible to combine these with aeronautical "
            "or automotive engineering classes. Available: Summer (March-July) semester only."
        ),
        short_description="Mechanical engineering fundamentals with cross-discipline options.",
        tags=["academics", "mechanical", "engineering", "thermodynamics", "courses"],
        priority=16,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Information Engineering Courses at HAW Hamburg",
        content=(
            "Winter semester: Algorithms & Data Structures, Digital Circuits, Economics & Management, "
            "Electrical Engineering 1, Elective courses, Electronics 2, German, Learning & Study Methods 1, "
            "Mathematics 1, Signals & Systems 1, Software Construction 1. "
            "Summer semester: Bus Systems & Sensors, Databases, Digital Communication Systems, "
            "Digital Signal Processing, Digital Systems 1, Electrical Engineering 2, Electronics 1, "
            "Intercultural competence, Mathematics 2, Microcontrollers, Operating Systems, "
            "Software Construction 2, Signals & Systems 2, Software Engineering. "
            "Available: Winter (Sept-Feb) and Summer (March-July) semester."
        ),
        short_description="Full information engineering curriculum across both semesters.",
        tags=["academics", "information engineering", "electrical", "software", "courses"],
        priority=17,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Computer Science Courses at HAW Hamburg",
        content=(
            "Available courses: Computer Graphics, Databases, Lab for Application Integration (HAWAI), "
            "Modelling & Simulation research project, Operating Systems, Seminar (Bachelor), "
            "Software Construction 2, Software Engineering. This programme is a collaboration between "
            "the Department of Computer Science and the Department of Information & Electrical Engineering. "
            "Available: Summer (March-July) semester only."
        ),
        short_description="Computer science with collaborative projects between departments.",
        tags=["academics", "computer science", "software engineering", "databases", "courses"],
        priority=18,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Digital Information & Media Courses at HAW Hamburg",
        content=(
            "Available courses: Digital Culture and Critical Theory, International Communication Systems, "
            "Knowledge Organization, Search Engine Technology and Search Engine Use, "
            "Social Media and Innovation. These classes are from the Media & Information "
            "Bachelor's degree programme and make up a 30 ECTS semester programme. "
            "Available: Summer (March-July) semester only."
        ),
        short_description="Digital media programme covering social media, search engines, and digital culture.",
        tags=["academics", "digital media", "information", "social media", "courses"],
        priority=19,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Life Sciences Engineering Courses at HAW Hamburg",
        content=(
            "Available courses: Advanced Control Systems, Applied Limnology, Instrumental Analysis, "
            "Mathematics 3, Particle Technology, Pharmacology/Toxicology, Photovoltaic Applications, "
            "Plant Engineering, Protein Preparation/Preparative Chromatography, Project Management, "
            "Sustainable Energy Economics. These are classes from the Bachelor's engineering programmes "
            "in the Faculty of Life Sciences. Available: Summer (March-July) semester only."
        ),
        short_description="Life sciences engineering including pharmacology and sustainable energy.",
        tags=["academics", "life sciences", "engineering", "pharmacology", "courses"],
        priority=20,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="academics",
        title="Nutrition & Health Courses at HAW Hamburg",
        content=(
            "Available courses: Consumer Behaviour, Eating Behaviour, Food Marketing, "
            "German Food and Culture, International Human Resource Management & Leadership, "
            "Marketing Research, Project Management, Public Health Nutrition, Public Health Project, "
            "Quality of Nutrition and Hygiene in Catering Services, Scientific Ergonomics with lab, "
            "Sensory Analysis, Working in multi-cultural groups, Academic English / Basic German. "
            "Available: Summer (March-July) semester only."
        ),
        short_description="Nutrition & health programme with public health and food culture courses.",
        tags=["academics", "nutrition", "health", "food", "public health", "courses"],
        priority=21,
        source_name="HAW Hamburg exchange brochure",
        program="UF Exchange - HAW Hamburg"
    ),
]

munich_tips = [
    CityTipCreate(
        city_slug="munich",
        category="academics",
        title="Global E3 - Munich University of Applied Science Program Overview",
        content=(
            "UF engineering students can participate in the Global E3 exchange program at Munich University of Applied Science (HM). "
            "Students must complete a Global E3 application and list at least 3 school choices. Applications are due March 1 (Fall) and September 15 (Spring). "
            "Eligibility: UF engineering students, GPA 3.0+, good disciplinary standing. "
            "Language of instruction: English and German. "
            "Departments at HM include Architecture, Civil Engineering, Mechanical, Automotive and Aeronautical Engineering, Electrical Engineering, Computer Science, Applied Sciences, Business Administration, and more. "
            "Program Type: UF Exchange, Experience Type: Traditional Study, Duration: Ten or more weeks. "
            "Contacts: UFIC Advisor Morgan Williams-Franklin, Program Coordinator Pingchien Neo (pneo@eng.ufl.edu). "
            "Housing: HM does not own residence halls, but reserves a limited number of rooms in the student union’s residence halls for exchange students. Rooms are allocated first come, first served and are not located on-campus. "
            "Open to UF students only."
        ),
        short_description="UF-specific details for Global E3 program at Munich University of Applied Science.",
        tags=["UF-specific", "engineering", "exchange", "Global E3", "faculty-led", "study abroad"],
        priority=50,
        source_name="UF Global E3 Munich program page",
        program="Global E3 - Munich University of Applied Science"
    ),
    CityTipCreate(
        city_slug="munich",
        category="city life",
        title="Munich City Overview (Global E3)",
        content=(
            "Munich is one of the most beautiful and safest cities in Germany, blending traditional and modern flair, breathtaking nature, and beautiful architecture. "
            "The university is at the heart of Munich, offering easy access to leisure activities, cultural and social life. "
            "Student housing is limited and located in the surrounding areas, not on-campus. Exchange students should apply early for housing."
        ),
        short_description="General city overview for Global E3 engineering students.",
        tags=["general", "city overview", "engineering", "culture", "housing", "Global E3"],
        priority=51,
        source_name="General Munich info",
        program="Global E3 - Munich University of Applied Science"
    )
]




berlin_tips = [
    CityTipCreate(
        city_slug="berlin",
        category="city life",
        title="Living in Berlin: History, art, innovation, and nightlife",
        content="Berlin is a city of history, reinvention, art, and innovation. It offers a lively student scene, creative industries, and a mix of historic and modern attractions.",
        short_description="History, art, innovation, vibrant student life.",
        tags=["city life", "history", "art", "innovation", "students"],
        priority=0,
        source_name="General city info",
        program="UF in Berlin - Master of International Business (MIB GIE)"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="academics",
        title="This Berlin program is only open to approved MIB and graduate business students",
        content="This faculty-led Berlin program is restricted to approved MIB and graduate business students. It is not a general open-enrollment study abroad option for all UF students.",
        short_description="Eligibility is limited to approved MIB and graduate business students.",
        tags=["academics", "eligibility", "business", "graduate", "study abroad"],
        priority=1,
        source_name="UF Berlin program page",
        program="UF in Berlin - Master of International Business (MIB GIE)"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="academics",
        title="The program offers 2 UF GPA credits through a Global Immersion Experience course",
        content="Students in the Berlin program take GEB 6930: Global Immersion Experience, a 2-credit UF GPA course focused on foreign business practices, international business constraints, company visits, and academic lectures in the host country.",
        short_description="The program includes a 2-credit global business immersion course.",
        tags=["academics", "credits", "business", "faculty-led"],
        priority=1,
        source_name="UF Berlin program page",
        program="UF in Berlin - Master of International Business (MIB GIE)"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="planning",
        title="This program is not currently accepting applications",
        content="At the time of this entry, there are no active application cycles listed for the Berlin faculty-led program, and the page notes that the program is not currently accepting applications.",
        short_description="Check for future application cycles before planning around this program.",
        tags=["applications", "planning", "deadline", "study abroad"],
        priority=1,
        source_name="UF Berlin program page",
        program="UF in Berlin - Master of International Business (MIB GIE)"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="finances",
        title="Financial aid and scholarships may still apply to faculty-led programs",
        content="Most financial aid that a student would normally receive on campus for the selected term abroad may be applied toward this study abroad program, but eligibility is determined by the Office of Student Financial Aid and Scholarships. UFIC and other colleges or organizations may also offer relevant study abroad scholarships.",
        short_description="Students may be able to use financial aid and scholarships toward the program cost.",
        tags=["financial aid", "scholarships", "cost", "planning"],
        priority=2,
        source_name="UF Berlin program page",
        program="UF in Berlin - Master of International Business (MIB GIE)"
    ),
    # TASSEP - Technische Universität Berlin tips (differentiated)
    CityTipCreate(
        city_slug="berlin",
        category="city life",
        title="TASSEP/TUB: Berlin as a cultural hub for science students",
        content="Berlin is a multicultural city with immense historical significance, inspiring young artists and scientists from around the world. TASSEP students at TUB enjoy access to opera, art, theater, concerts, festivals, museums, galleries, and a vibrant student community.",
        short_description="TASSEP/TUB: Cultural hub, science, vibrant student life.",
        tags=["city life", "culture", "history", "science", "TASSEP", "TUB", "students"],
        priority=10,
        source_name="UF TASSEP Berlin program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="academics",
        title="TASSEP/TUB: Science exchange at Technische Universität Berlin",
        content="UF science students can study at TUB via TASSEP, a consortium of EU, Canadian, and US universities. TASSEP allows students to take most junior-level courses abroad and graduate on time. Departments include Astronomy, Biochemistry, Biology, Chemistry, Environmental Science, Geological Sciences, Horticultural Sciences, Mathematics, Microbiology, Physics, Plant Sciences, and Statistics.",
        short_description="TASSEP/TUB: Science exchange, multiple departments.",
        tags=["science", "exchange", "TASSEP", "TUB", "Berlin"],
        priority=11,
        source_name="UF TASSEP Berlin program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="eligibility",
        title="TASSEP/TUB: Eligibility requirements for UF students",
        content="Open to all majors. Applicants must have a minimum 2.5 GPA and be in good standing.",
        short_description="TASSEP/TUB: All majors, 2.5+ GPA, good standing required.",
        tags=["eligibility", "GPA", "TASSEP", "TUB", "requirements"],
        priority=12,
        source_name="UF TASSEP Berlin program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="academics",
        title="TASSEP/TUB: Application process and academic advising",
        content="TASSEP ensures students are properly advised about course selection and credit transfer. Students pay UF tuition and receive credit for courses taken abroad. Strong academic advising helps students graduate on time.",
        short_description="TASSEP/TUB: Application, advising, credit transfer.",
        tags=["application", "TASSEP", "TUB", "advising", "credit"],
        priority=13,
        source_name="UF TASSEP Berlin program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="academics",
        title="TASSEP/TUB: Courses and language of instruction",
        content="Most bachelor-level courses at TUB are taught in German. Exchange students need to provide proof of the required level of German. Some courses are taught in English; see the TUB website for details.",
        short_description="TASSEP/TUB: Courses mostly in German, some in English, language requirements.",
        tags=["academics", "language", "German", "English", "TASSEP", "TUB", "courses"],
        priority=14,
        source_name="UF TASSEP Berlin program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="housing",
        title="TASSEP/TUB: Student housing for exchange students",
        content="A limited number of Studierendenwerk dormitory rooms are available for exchange students. Apply through the TUB International Office after the application deadline. Exchange students cannot apply directly for the dorms.",
        short_description="TASSEP/TUB: Limited dorm rooms, apply via TUB International Office.",
        tags=["housing", "dorms", "TUB", "TASSEP", "apply"],
        priority=15,
        source_name="UF TASSEP Berlin program page"
    ),
        CityTipCreate(
            city_slug="berlin",
            category="academics",
            title="UF in Berlin - MIB GIE Program Overview",
            content=(
                "This program is only open to approved MIB/graduate business students. "
                "Pre-selected students should begin an application by clicking the 'Apply Now' button. "
                "The Academic Advising form and UFIC deposit are waived for students on this program. "
                "If you have questions, contact Study Abroad Advisor Iva Lien or Program Director Ana Portocarrero (ana.portocarrero@warrington.ufl.edu, 352-273-0341). "
                "Course: GEB 6930 - Global Immersion Experience (2 UF GPA credits). "
                "This course provides an overview of foreign business practices and global constraints in Berlin. "
                "Students visit businesses, organizations, and participate in academic lectures for practical understanding. "
                "Program Type: UF Sponsored (Faculty-Led). Experience Type: Study Tour. Duration: 0-2 weeks. "
                "Level: Graduate. Field of Study: Business Administration. Not open to non-UF students. "
                "Currently not accepting applications."
            ),
            short_description="UF-specific details for MIB GIE program in Berlin.",
            tags=["UF-specific", "MIB", "graduate", "business", "faculty-led", "study tour"],
            priority=20,
            source_name="UF Berlin MIB GIE program page",
            program="UF in Berlin - Master of International Business (MIB GIE)"
        ),
        CityTipCreate(
            city_slug="berlin",
            category="city life",
            title="Berlin City Overview (MIB GIE)",
            content=(
                "Berlin, the capital of Germany, is a city of contrasts and creativity. "
                "Known for its rich history, vibrant arts scene, and dynamic culture, Berlin offers iconic landmarks like the Brandenburg Gate and Berlin Wall. "
                "The city was the epicenter of both World Wars and the Cold War, with the Berlin Wall symbolizing division. "
                "Sites like the East Side Gallery, Memorial to the Murdered Jews of Europe, and Topography of Terror reflect Berlin's turbulent past. "
                "Since the fall of the Wall in 1989, Berlin has become a global capital of culture and innovation, attracting artists, musicians, and entrepreneurs. "
                "Explore galleries, nightclubs, and historical sites for a unique blend of history and modern creativity."
            ),
            short_description="General city overview for MIB GIE students.",
            tags=["general", "city overview", "history", "culture", "landmarks"],
            priority=21,
            source_name="General Berlin info",
            program="UF in Berlin - Master of International Business (MIB GIE)"
        ),
    )
]

# Tips for UF students studying abroad in Stuttgart (HdM is the school UF students attend)
stuttgart_tips = [
    CityTipCreate(
        city_slug="stuttgart",
        category="city life",
        title="Living in Stuttgart: Festivals, culture, and international experience",
        content="Stuttgart is lively, with many festivals (Oktoberfest, wine, Christmas), vibrant student life, and proximity to Black Forest, Swabian Alb, Lake Constance, Heidelberg, Munich, France, and Switzerland. ESN Stuttgart organizes events and activities for exchange students.",
        short_description="Festivals, culture, international student life, ESN events.",
        tags=["city life", "festivals", "culture", "international", "students"],
        priority=0,
        source_name="General city info"
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="academics",
        title="Hochschule der Medien: Broad spectrum of media expertise",
        content="HdM is a public university specializing in media, design, business, library science, advertising, computer science, and publishing. About 30 accredited Bachelor’s and Master’s programs are offered, with 5500 students enrolled.",
        short_description="Specialized media university with diverse programs.",
        tags=["media", "design", "business", "advertising", "computer science"],
        priority=1,
        source_name="UF HdM program page"
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="eligibility",
        title="Eligibility requirements for UF students",
        content="Open to all majors. Applicants must have a 3.0 GPA and be in good disciplinary standing.",
        short_description="Open to all majors, 3.0+ GPA, good standing required.",
        tags=["eligibility", "GPA", "requirements"],
        priority=2,
        source_name="UF HdM program page"
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="academics",
        title="English-taught Minor Programmes and ECTS credit system",
        content="Exchange students can choose from a variety of English-taught Minor Programmes, each one semester long and worth 30 ECTS credits. B2 English proficiency required. ECTS credits typically convert 2:1 to UF credits.",
        short_description="English-taught minors, B2 English, ECTS credits convert 2:1.",
        tags=["academics", "minors", "english", "ECTS", "credit"],
        priority=3,
        source_name="UF HdM program page"
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="housing",
        title="Student housing in Stuttgart",
        content="Student housing is managed by Studierendenwerk Stuttgart. Most exchange students are allocated to Filderbahnplatz residencies or dormitories in Esslingen. Flats typically house 6 students, each with a single room and shared kitchen/bathroom. Apply early due to high demand.",
        short_description="Shared student flats, single rooms, apply early for housing.",
        tags=["housing", "student flats", "shared", "apply early"],
        priority=4,
        source_name="UF HdM program page"
    )
]

# Tips for UF students studying abroad in Aachen (RWTH is the school UF students attend via Global E3)
aachen_tips = [
    CityTipCreate(
        city_slug="aachen",
        category="city life",
        title="Living in Aachen: Lively student city near Belgium and Netherlands",
        content="Aachen is Germany’s westernmost city, famous for Printen gingerbread, hot springs, Mardi Gras, equestrian tournaments, and a historic city centre. Nature parks and international culture make it a welcoming place for students.",
        short_description="Lively student city, historic, international, nature parks.",
        tags=["city life", "historic", "international", "nature", "students"],
        priority=0,
        source_name="General city info"
    ),
    CityTipCreate(
        city_slug="aachen",
        category="academics",
        title="RWTH Aachen University: Engineering exchange via Global E3",
        content="UF has an agreement with RWTH Aachen University. Students apply via Global E3, an international exchange program for engineering students. Academic credit and practical training are available. Departments include Civil, Mechanical, Georesources, Materials, Electrical, and Information Technology.",
        short_description="Engineering exchange, Global E3, multiple departments.",
        tags=["engineering", "exchange", "Global E3", "RWTH"],
        priority=1,
        source_name="UF RWTH Aachen program page"
    ),
    CityTipCreate(
        city_slug="aachen",
        category="eligibility",
        title="Eligibility requirements for UF students",
        content="Applicants should be in the College of Engineering, have a GPA of 3.0 or higher, and be in good disciplinary standing.",
        short_description="Engineering majors, 3.0+ GPA, good standing required.",
        tags=["eligibility", "GPA", "engineering", "requirements"],
        priority=2,
        source_name="UF RWTH Aachen program page"
    ),
    CityTipCreate(
        city_slug="aachen",
        category="academics",
        title="Global E3 application process and school selection",
        content="Students must complete a Global E3 application and list at least 3 school choices. Placement is not guaranteed at a specific school. Academic credit and internships are possible. Programs run at the same cost as other UF exchanges.",
        short_description="Global E3 app, list 3 schools, credit/internship options.",
        tags=["application", "Global E3", "credit", "internship"],
        priority=3,
        source_name="UF RWTH Aachen program page"
    ),
    CityTipCreate(
        city_slug="aachen",
        category="housing",
        title="Student housing in Aachen",
        content="Housing is offered by Studentenwerk Aachen. Apply early as rooms are limited. The International Office is not in charge of housing and RWTH cannot guarantee placement.",
        short_description="Apply early for student housing, limited rooms.",
        tags=["housing", "student housing", "apply early", "placement"],
        priority=4,
        source_name="UF RWTH Aachen program page"
    ),
    CityTipCreate(
        city_slug="aachen",
        category="city life",
        title="Student life and culture in Aachen",
        content="Aachen is a lively student city near Belgium and the Netherlands, famous for Printen gingerbread, hot springs, Mardi Gras, equestrian tournaments, and a historic city centre. Nature parks and international culture make it a welcoming place for students.",
        short_description="Lively student city, historic, international, nature parks.",
        tags=["city life", "culture", "student", "international", "nature"],
        priority=5,
        source_name="UF RWTH Aachen program page"
    )
        ,
        CityTipCreate(
            city_slug="aachen",
            category="academics",
            title="RWTH Aachen University Program Overview",
            content=(
                "RWTH Aachen University is a leading European scientific and research institution with over 44,000 students in 152 courses of study, including more than 8,500 international students. "
                "Teaching is application-oriented, and graduates are sought-after in business and industry. Interdisciplinary research and real-world relevance characterize RWTH's education. "
                "UF students participate in a UF Exchange program for ten or more weeks, earning UF GPA credit."
            ),
            short_description="UF-specific details for RWTH Aachen University exchange program.",
            tags=["UF-specific", "RWTH Aachen", "exchange", "engineering", "science", "faculty-led"],
            priority=10,
            source_name="UF RWTH Aachen program page",
            program="RWTH Aachen University"
        ),
        CityTipCreate(
            city_slug="aachen",
            category="eligibility",
            title="Eligibility & Requirements (RWTH Aachen University)",
            content="Applicants should be in the College of Engineering, have a 3.0 GPA or higher, and be in good disciplinary standing. Undergraduate level. Not open to non-UF students.",
            short_description="Engineering majors, 3.0+ GPA, good standing, UF only.",
            tags=["eligibility", "GPA", "requirements", "engineering", "undergraduate", "UF only"],
            priority=11,
            source_name="UF RWTH Aachen program page",
            program="RWTH Aachen University"
        ),
        CityTipCreate(
            city_slug="aachen",
            category="academics",
            title="Academic Departments & Courses (RWTH Aachen University)",
            content=(
                "RWTH Aachen offers a wide range of academic departments, focusing on science and engineering. Subjects include software engineering, biomedical engineering, automotive engineering, and more. "
                "Most courses are taught in German, but many English-taught courses and modules are available. Exchange students may participate in English-language Master's modules if they meet requirements."
            ),
            short_description="Wide range of engineering/science courses, English options available.",
            tags=["academics", "engineering", "science", "courses", "English", "German", "modules"],
            priority=12,
            source_name="UF RWTH Aachen program page",
            program="RWTH Aachen University"
        ),
        CityTipCreate(
            city_slug="aachen",
            category="city life",
            title="Aachen City Overview (RWTH Aachen University)",
            content=(
                "Aachen is Germany’s westernmost city, near Belgium and the Netherlands, nestled between the Eifel and Ardennes national parks. "
                "The city has a population of 245,000, including about 60,000 students. Famous for Printen gingerbread, hot springs, Mardi Gras, equestrian tournaments, and a historic city centre. "
                "Nature parks, bars, cafés, restaurants, and a lively student community make Aachen welcoming for all."
            ),
            short_description="General city overview for RWTH Aachen students.",
            tags=["general", "city overview", "nature", "culture", "student life", "Aachen"],
            priority=13,
            source_name="General Aachen info",
            program="RWTH Aachen University"
        ),
        CityTipCreate(
            city_slug="aachen",
            category="housing",
            title="Housing in Aachen (RWTH Aachen University)",
            content=(
                "Accommodation at RWTH Aachen is not guaranteed, but the International Center sets aside some rooms for exchange students on a first-come, first-served basis. "
                "Contact the RWTH Aachen Housing Advice Service for details. Application deadlines: June 15 (Fall), February 15 (Spring). Estimated living expenses: €800/month including housing."
            ),
            short_description="Housing is limited, apply early; estimated €800/month living expenses.",
            tags=["housing", "student housing", "apply early", "cost", "Aachen"],
            priority=14,
            source_name="UF RWTH Aachen program page",
            program="RWTH Aachen University"
        ),
]

# Tips for UF students studying abroad in Lemgo (TH OWL is the school UF students attend)
lemgo_tips = [
    CityTipCreate(
        city_slug="lemgo",
        category="city life",
        title="Living in Lemgo: Nature, excursions, and cultural sites in Lippe district",
        content="Lemgo and the Lippe district offer nature, hiking trails, museums, architectural landmarks, and spa towns. Excursions include visits to design locations, hiking, and cultural sites.",
        short_description="Nature, hiking, design excursions, spa towns, student life.",
        tags=["city life", "nature", "excursions", "spa", "students"],
        priority=0,
        source_name="General city info"
    ),
    CityTipCreate(
        city_slug="lemgo",
        category="academics",
        title="TH OWL Interior Design: Mutual exchange of design knowledge",
        content="The program brings together UF students, students from other universities, and German students from TH OWL for a mutual exchange of design knowledge. Students attend lectures, visit design locations, and complete a studio project using cutting edge lab facilities.",
        short_description="Mutual design exchange, studio project, lab facilities.",
        tags=["design", "exchange", "studio", "lab"],
        priority=1,
        source_name="UF TH OWL program page"
    ),
    CityTipCreate(
        city_slug="lemgo",
        category="eligibility",
        title="Eligibility requirements for UF students",
        content="Applicants should be in the College of Design, Construction, and Planning, have a minimum 2.5 GPA, and be in good standing at UF.",
        short_description="DCP majors, 2.5+ GPA, good standing required.",
        tags=["eligibility", "GPA", "DCP", "requirements"],
        priority=2,
        source_name="UF TH OWL program page"
    ),
    CityTipCreate(
        city_slug="lemgo",
        category="academics",
        title="Courses and credits for Interior Design students",
        content="Courses are taught by UF faculty. Undergraduates take IND 4940: Design Field Experience and IND 4930: Design in Detmold (3 credits each). Graduates take IND 6941 and IND 5937 (3 credits each). Total: 6 UF GPA credits.",
        short_description="UF faculty, 6 credits, undergraduate and graduate options.",
        tags=["courses", "credits", "faculty", "undergraduate", "graduate"],
        priority=3,
        source_name="UF TH OWL program page"
    ),
    CityTipCreate(
        city_slug="lemgo",
        category="housing",
        title="Student housing at TH OWL",
        content="Students are housed in dorms at TH OWL. Apply early for best placement.",
        short_description="Dorm housing at TH OWL, apply early.",
        tags=["housing", "dorms", "TH OWL", "apply early"],
        priority=4,
        source_name="UF TH OWL program page"
    ),
    CityTipCreate(
        city_slug="lemgo",
        category="city life",
        title="Nature, excursions, and cultural sites in Lippe district",
        content="Lemgo and the Lippe district offer nature, hiking trails, museums, architectural landmarks, and spa towns. Excursions include visits to design locations, hiking, and cultural sites.",
        short_description="Nature, hiking, design excursions, spa towns.",
        tags=["city life", "nature", "excursions", "spa", "culture"],
        priority=5,
        source_name="UF TH OWL program page"
    )
]

# Tips for UF students studying abroad in Munich (HM is the school UF students attend via Global E3)
munich_global_e3_tips = [
    CityTipCreate(
        city_slug="munich",
        category="city life",
        title="Living in Munich: Tradition, modernity, nature, and culture",
        content="Munich is one of the most beautiful and safest cities in Germany, blending tradition, modernity, nature, and culture. The university is at the heart of Munich, giving students access to leisure activities, rich cultural and social life, and opportunities beyond their studies.",
        short_description="Beautiful, safe city, vibrant student life, culture, nature.",
        tags=["city life", "tradition", "modernity", "culture", "students"],
        priority=0,
        source_name="General city info"
    ),
    CityTipCreate(
        city_slug="munich",
        category="academics",
        title="Munich University of Applied Sciences: Engineering exchange via Global E3",
        content="UF engineering students can study at HM via Global E3. Departments include Architecture, Civil, Mechanical, Automotive, Aeronautical, Electrical, Information Technology, Building Services, Print and Media Technology, Applied Sciences, Mechatronics, Computer Science, Mathematics, Geoinformatics, Engineering and Management, Business Administration, Applied Social Sciences, Design, General and Interdisciplinary Studies, and Tourism.",
        short_description="Engineering exchange, Global E3, multiple departments.",
        tags=["engineering", "exchange", "Global E3", "HM"],
        priority=1,
        source_name="UF Munich program page"
    ),
    CityTipCreate(
        city_slug="munich",
        category="eligibility",
        title="Eligibility requirements for UF students",
        content="Applicants should be in the College of Engineering, have a GPA of 3.0 or higher, and be in good disciplinary standing.",
        short_description="Engineering majors, 3.0+ GPA, good standing required.",
        tags=["eligibility", "GPA", "engineering", "requirements"],
        priority=2,
        source_name="UF Munich program page"
    ),
    CityTipCreate(
        city_slug="munich",
        category="academics",
        title="Global E3 application process and school selection",
        content="Students must complete a Global E3 application and list at least 3 school choices. Placement is not guaranteed at a specific school. Academic credit and internships are possible. Programs run at the same cost as other UF exchanges.",
        short_description="Global E3 app, list 3 schools, credit/internship options.",
        tags=["application", "Global E3", "credit", "internship"],
        priority=3,
        source_name="UF Munich program page"
    ),
    CityTipCreate(
        city_slug="munich",
        category="housing",
        title="Student housing in Munich",
        content="HM does not own residence halls, but reserves rooms in the student union’s residence halls for exchange students. Rooms are limited, allocated on a first come first served basis, and located in surrounding areas of Munich.",
        short_description="Limited student housing, first come first served.",
        tags=["housing", "student housing", "first come", "limited"],
        priority=4,
        source_name="UF Munich program page"
    ),
        # Sport Management tips
        CityTipCreate(
            city_slug="munich",
            category="academics",
            title="UF in Austria & Germany - Sport Management Program Overview",
            content=(
                "The UF Department of Sport Management offers a 9-day Study Abroad program to Munich, Germany, and Vienna, Austria, during Spring Break 2026. "
                "Students in all majors are welcome to participate while taking the 3-credit International Sport Management class. "
                "The course explores sport governance structures, player development systems, Olympic sport legacy, Alpine sport heritage, and recreational sport culture in Germany and Austria through site visits, guest lectures, and guided tours. "
                "No prerequisites; open to all majors."
            ),
            short_description="UF-specific details for Sport Management program in Munich.",
            tags=["UF-specific", "sport management", "faculty-led", "study tour", "academics"],
            priority=60,
            source_name="UF Sport Management program page",
            program="UF in Austria & Germany - Sport Management"
        ),
        CityTipCreate(
            city_slug="munich",
            category="eligibility",
            title="Eligibility & Requirements (Sport Management)",
            content="Open to all majors. Minimum 2.5 GPA. Students must be in good standing. Graduate and undergraduate students are eligible. Open to non-UF students.",
            short_description="All majors, 2.5+ GPA, good standing, open to non-UF students.",
            tags=["eligibility", "GPA", "requirements", "graduate", "undergraduate", "non-UF"],
            priority=61,
            source_name="UF Sport Management program page",
            program="UF in Austria & Germany - Sport Management"
        ),
        CityTipCreate(
            city_slug="munich",
            category="excursions",
            title="Excursions & Site Visits (Sport Management)",
            content=(
                "Excursions include tours of Allianz Arena, Bayern Munich's training facilities and youth academy, Olympiapark, Olympic Village, and a day trip to Garmisch-Partenkirchen in the Bavarian Alps for an Olympic Ski Jump and Ice Sport stadium. "
                "Networking with sport students at Technical University of Munich (TUM) and a visit to Dachau Concentration Camp Memorial are also included. Welcome dinner at Hofbräuhaus Munich."
            ),
            short_description="Site visits: Allianz Arena, Olympiapark, Garmisch-Partenkirchen, TUM, Dachau.",
            tags=["excursions", "site visits", "Bayern Munich", "Olympic", "networking", "TUM", "Dachau"],
            priority=62,
            source_name="UF Sport Management program page",
            program="UF in Austria & Germany - Sport Management"
        ),
        CityTipCreate(
            city_slug="munich",
            category="housing",
            title="Housing in Munich (Sport Management)",
            content="Students stay in hostels located in the heart of Munich within walking distance of key tourist sites. Rooms are shared with up to one other student.",
            short_description="Hostel housing in central Munich, shared rooms.",
            tags=["housing", "hostel", "Munich", "shared rooms"],
            priority=63,
            source_name="UF Sport Management program page",
            program="UF in Austria & Germany - Sport Management"
        ),
        CityTipCreate(
            city_slug="munich",
            category="city life",
            title="Munich City Overview (Sport Management)",
            content=(
                "Munich captivates visitors with stunning architecture, world-class museums, and vibrant culture. "
                "Highlights include Marienplatz, Nymphenburg Palace, Alte Pinakothek, Deutsches Museum, and the English Garden. "
                "The city blends history, art, and recreation, offering a unique experience for sport management students."
            ),
            short_description="General city overview for Sport Management students.",
            tags=["general", "city overview", "architecture", "culture", "recreation"],
            priority=64,
            source_name="General Munich info",
            program="UF in Austria & Germany - Sport Management"
        ),
        # Technology Innovation & Entrepreneurship tips
        CityTipCreate(
            city_slug="munich",
            category="academics",
            title="UF in Munich - Technology Innovation & Entrepreneurship Program Overview",
            content=(
                "This program helps students build and exercise technology innovation and entrepreneurship skills in Munich, one of Europe's most dynamic and innovative cities. "
                "Munich has overtaken Berlin in startup fundraising, raising over €2.3bn in 2024. UF instructors and local entrepreneurs guide students to apply leading-edge innovation models to building tech startups. "
                "Students who take both UF in Munich Innovation and Entrepreneurship courses will be two-thirds of the way to completing the UF Engineering Innovation Certificate."
            ),
            short_description="UF-specific details for Technology Innovation & Entrepreneurship program in Munich.",
            tags=["UF-specific", "technology", "innovation", "entrepreneurship", "engineering", "faculty-led"],
            priority=70,
            source_name="UF Munich Innovation & Entrepreneurship program page",
            program="UF in Munich - Technology Innovation & Entrepreneurship"
        ),
        CityTipCreate(
            city_slug="munich",
            category="eligibility",
            title="Eligibility & Requirements (Technology Innovation & Entrepreneurship)",
            content="Open to students of all majors. Priority given to rising sophomores or up in the College of Engineering. Open to undergraduate and graduate students. Must have a 3.0 GPA or higher and be in good disciplinary standing. Not open to non-UF students.",
            short_description="All majors, priority engineering, 3.0+ GPA, good standing, UF only.",
            tags=["eligibility", "GPA", "requirements", "engineering", "undergraduate", "graduate", "UF only"],
            priority=71,
            source_name="UF Munich Innovation & Entrepreneurship program page",
            program="UF in Munich - Technology Innovation & Entrepreneurship"
        ),
        CityTipCreate(
            city_slug="munich",
            category="academics",
            title="Course Information (Technology Innovation & Entrepreneurship)",
            content=(
                "Courses are taught by UF faculty: EGN 4641 / 6640 Engineering Entrepreneurship (3 credits) and EGN 4643 / 6642 Engineering Innovation (3 credits). "
                "Total: 6 UF GPA credits."
            ),
            short_description="Engineering Entrepreneurship & Innovation courses, 6 UF GPA credits.",
            tags=["academics", "engineering", "entrepreneurship", "innovation", "courses", "credits"],
            priority=72,
            source_name="UF Munich Innovation & Entrepreneurship program page",
            program="UF in Munich - Technology Innovation & Entrepreneurship"
        ),
        CityTipCreate(
            city_slug="munich",
            category="excursions",
            title="Excursions & Site Visits (Technology Innovation & Entrepreneurship)",
            content=(
                "Weekly group excursions focus on experiencing German life and understanding the technology-based economy. "
                "Excursions include Neuschwanstein Castle, Salzburg, technology and cultural museums, startup and large technology companies, and incubators. "
                "Cultural venues illustrate the power of combining technology, arts, and culture for discussions on design thinking and user experiences."
            ),
            short_description="Excursions: Neuschwanstein, Salzburg, museums, startups, incubators.",
            tags=["excursions", "site visits", "technology", "culture", "design thinking", "startups", "incubators"],
            priority=73,
            source_name="UF Munich Innovation & Entrepreneurship program page",
            program="UF in Munich - Technology Innovation & Entrepreneurship"
        ),
        CityTipCreate(
            city_slug="munich",
            category="housing",
            title="Housing in Munich (Technology Innovation & Entrepreneurship)",
            content="Students will be housed in hotels for the duration of the program.",
            short_description="Hotel housing in Munich.",
            tags=["housing", "hotel", "Munich"],
            priority=74,
            source_name="UF Munich Innovation & Entrepreneurship program page",
            program="UF in Munich - Technology Innovation & Entrepreneurship"
        ),
        CityTipCreate(
            city_slug="munich",
            category="city life",
            title="Munich City Overview (Technology Innovation & Entrepreneurship)",
            content=(
                "Munich captivates visitors with stunning architecture, from the neo-Gothic Neues Rathaus in Marienplatz to Nymphenburg Palace. "
                "Art and history lovers can explore world-class museums like Alte Pinakothek and Deutsches Museum. "
                "The English Garden offers serene walking paths, river surfing, and a Japanese tea house. "
                "Munich provides an excellent environment for founding and growing innovation-centric enterprises at the intersection of quality of life and entrepreneurial opportunity."
            ),
            short_description="General city overview for Technology Innovation & Entrepreneurship students.",
            tags=["general", "city overview", "architecture", "culture", "innovation", "entrepreneurship"],
            priority=75,
            source_name="General Munich info",
            program="UF in Munich - Technology Innovation & Entrepreneurship"
        )
    ]

# Tips for UF students studying abroad in Jena (Friedrich Schiller Universität via TASSEP)
jena_tips = [
    CityTipCreate(
        city_slug="jena",
        category="city life",
        title="Living in Jena: Historic university city with vibrant student life",
        content="Jena is a historic university city in Thuringia, known for science, research, and a lively student community. The city offers proximity to nature and research institutions, and a rich scientific tradition.",
        short_description="Historic university city, science, nature, student life.",
        tags=["city life", "science", "nature", "students"],
        priority=0,
        source_name="General city info"
    ),
    CityTipCreate(
        city_slug="jena",
        category="academics",
        title="Friedrich Schiller Universität: Science exchange via TASSEP",
        content="UF science students can study at Friedrich Schiller Universität Jena via TASSEP, a consortium of EU, Canadian, and US universities. TASSEP allows students to take most junior-level courses abroad and graduate on time. Departments include Astronomy, Biochemistry, Biology, Chemistry, Geological Sciences, Mathematics, Microbiology, Physics, and Statistics.",
        short_description="Science exchange, TASSEP, multiple departments.",
        tags=["science", "exchange", "TASSEP", "Jena"],
        priority=1,
        source_name="UF TASSEP Jena program page"
    ),
    CityTipCreate(
        city_slug="jena",
        category="eligibility",
        title="Eligibility requirements for UF students",
        content="Open to all majors. Applicants must have a minimum 2.5 GPA and be in good standing.",
        short_description="All majors, 2.5+ GPA, good standing required.",
        tags=["eligibility", "GPA", "requirements"],
        priority=2,
        source_name="UF TASSEP Jena program page"
    ),
    CityTipCreate(
        city_slug="jena",
        category="academics",
        title="TASSEP application process and academic advising",
        content="TASSEP ensures students are properly advised about course selection and credit transfer. Students pay UF tuition and receive credit for courses taken abroad. Strong academic advising helps students graduate on time.",
        short_description="TASSEP app, academic advising, credit transfer.",
        tags=["application", "TASSEP", "advising", "credit"],
        priority=3,
        source_name="UF TASSEP Jena program page"
    ),
    CityTipCreate(
        city_slug="jena",
        category="city life",
        title="Student life and culture in Jena",
        content="Jena is a historic university city with a vibrant student community, rich scientific tradition, and proximity to nature and research institutions. The city offers a lively atmosphere and opportunities for science students.",
        short_description="Historic university city, lively student life, science tradition.",
        tags=["city life", "culture", "student", "science", "nature"],
        priority=4,
        source_name="UF TASSEP Jena program page"
    )
]

# Tips for UF students studying abroad in Vienna (TU Wien via TASSEP)
vienna_tips = [
    CityTipCreate(
        city_slug="vienna",
        category="city life",
        title="Living in Vienna: Imperial capital with vibrant culture and green spaces",
        content="Vienna is an imperial capital blending Baroque streetscapes, art, music, coffee-house culture, and vibrant design scenes. The city offers excellent public transportation, infrastructure, and abundant green space for recreation.",
        short_description="Imperial city, vibrant culture, green spaces, student life.",
        tags=["city life", "imperial", "culture", "green space", "students"],
        priority=0,
        source_name="General city info"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="Technische Universität Wien: Science exchange via TASSEP",
        content="UF science students can study at TU Wien via TASSEP, a consortium of EU, Canadian, and US universities. TASSEP allows students to take most junior-level courses abroad and graduate on time. Departments include Astronomy, Biochemistry, Biology, Chemistry, Geological Sciences, Horticultural Sciences, Mathematics, Microbiology, Physics, Plant Sciences, and Statistics.",
        ),
    # Vienna TASSEP tips
    CityTipCreate(
        city_slug="vienna",
        category="eligibility",
        title="Eligibility requirements for UF students",
        content="Open to all majors. Applicants must have a minimum 2.5 GPA and be in good standing.",
        short_description="All majors, 2.5+ GPA, good standing required.",
        tags=["eligibility", "GPA", "requirements"],
        priority=2,
        source_name="UF TASSEP Vienna program page"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="TASSEP application process and academic advising",
        content="TASSEP ensures students are properly advised about course selection and credit transfer. Students pay UF tuition and receive credit for courses taken abroad. Strong academic advising helps students graduate on time.",
        short_description="TASSEP app, academic advising, credit transfer.",
        tags=["application", "TASSEP", "advising", "credit"],
        priority=3,
        source_name="UF TASSEP Vienna program page"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="city life",
        title="Student life and culture in Vienna",
        content="Vienna is an imperial capital with Baroque streetscapes, art, music, coffee-house culture, and vibrant design scenes. The city offers excellent public transportation, infrastructure, and abundant green space for recreation.",
        short_description="Imperial city, vibrant culture, green spaces, student life.",
        tags=["city life", "culture", "student", "imperial", "green space"],
        priority=4,
        source_name="UF TASSEP Vienna program page"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="housing",
        title="Student housing at TU Wien",
        content="More information about housing options while studying at TU Wien can be found on their website. Apply early for best placement.",
        short_description="Student housing at TU Wien, apply early.",
        tags=["housing", "TU Wien", "apply early"],
        priority=5,
        source_name="UF TASSEP Vienna program page"
    ),
    # Vienna Sport Management tips
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="UF in Austria & Germany - Sport Management Program Overview",
        content=(
            "The UF Department of Sport Management offers a 9-day Study Abroad program to Vienna, Austria, and Munich, Germany, during Spring Break 2026. "
            "Students take the 3-credit International Sport Management class, exploring sport governance, Olympic legacy, Alpine sport heritage, and recreational sport culture through site visits, lectures, and tours. "
            "No prerequisites; open to all majors."
        ),
        short_description="UF-specific details for Sport Management program in Vienna.",
        tags=["UF-specific", "sport management", "faculty-led", "study tour", "academics"],
        priority=60,
        source_name="UF Sport Management program page",
        program="UF in Austria & Germany - Sport Management"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="eligibility",
        title="Eligibility & Requirements (Sport Management)",
        content="Open to all majors. Minimum 2.5 GPA. Students must be in good standing. Graduate and undergraduate students are eligible. Open to non-UF students.",
        short_description="All majors, 2.5+ GPA, good standing, open to non-UF students.",
        tags=["eligibility", "GPA", "requirements", "graduate", "undergraduate", "non-UF"],
        priority=61,
        source_name="UF Sport Management program page",
        program="UF in Austria & Germany - Sport Management"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="excursions",
        title="Excursions & Site Visits (Sport Management)",
        content=(
            "Excursions in Vienna include visits to the Austrian Olympic Committee or Austria Ministry of the Arts, Culture, Civil Service, & Sport, a sport sponsorship and marketing lecture at Red Bull Headquarters, and a tour of SK Rapid Vienna. "
            "Farewell dinner at a Viennese Heuriger. Walking tours of Vienna's historic center and cultural sites."
        ),
        short_description="Site visits: Olympic Committee, Red Bull HQ, SK Rapid Vienna, Heuriger dinner.",
        tags=["excursions", "site visits", "Olympic Committee", "Red Bull", "SK Rapid Vienna", "Heuriger"],
        priority=62,
        source_name="UF Sport Management program page",
        program="UF in Austria & Germany - Sport Management"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="housing",
        title="Housing in Vienna (Sport Management)",
        content="Students stay in hostels located in the heart of Vienna within walking distance of key tourist sites. Rooms are shared with up to one other student.",
        short_description="Hostel housing in central Vienna, shared rooms.",
        tags=["housing", "hostel", "Vienna", "shared rooms"],
        priority=63,
        source_name="UF Sport Management program page",
        program="UF in Austria & Germany - Sport Management"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="city life",
        title="Vienna City Overview (Sport Management)",
        content=(
            "Vienna enchants visitors with imperial palaces, classical music, and a timeless blend of culture, beauty, and refinement. "
            "Highlights include Schönbrunn and Hofburg palaces, Mozart and Strauss concerts, Vienna State Opera, and traditional cafés. "
            "The city offers a unique experience for sport management students, combining history, art, and sport culture."
        ),
        short_description="General city overview for Sport Management students.",
        tags=["general", "city overview", "imperial", "culture", "music", "sport"],
        priority=64,
        source_name="General Vienna info",
        program="UF in Austria & Germany - Sport Management"
    ),
]

# Tips for UF students in Switzerland and Austria (CJC in Zürich and Vienna)
zurich_tips = [
    CityTipCreate(
        city_slug="zurich",
        category="city life",
        title="Living in Zurich: Financial and cultural hub by Lake Zurich",
        content="Zurich is Switzerland’s largest city, blending medieval charm with modern sophistication. It offers a high quality of life, efficient public transport, world-class museums, and a thriving arts scene. Gateway to the Swiss Alps.",
        short_description="Financial/cultural hub, high quality of life, arts, Alps.",
        tags=["city life", "culture", "arts", "Alps", "students"],
        priority=0,
        source_name="General city info"
    ),
    CityTipCreate(
        city_slug="zurich",
        category="academics",
        title="UF in Switzerland and Austria: CJC study abroad program in Zurich",
        content="This UF program combines academics with authentic travel. Students immerse in Zurich’s culture, history, and natural beauty, with visits to iconic sites and engaging cultural events. Courses in advertising, PR, journalism, and media production are taught by UF faculty and count toward your degree.",
        program="UF in Switzerland and Austria",
        short_description="UF CJC program: academics, culture, travel, faculty-led.",
        tags=["UF program", "CJC", "advertising", "journalism", "PR", "media", "Zurich"],
        priority=1,
        source_name="UF CJC Zurich program page"
    ),
    CityTipCreate(
        city_slug="zurich",
        category="eligibility",
        title="UF in Switzerland and Austria: Eligibility requirements",
        content="Open to all majors, major focus on CJC majors/minors. 2.5 GPA and good standing required.",
        program="UF in Switzerland and Austria",
        short_description="Open to all majors, CJC focus, 2.5+ GPA, good standing.",
        tags=["eligibility", "GPA", "CJC", "UF program", "Zurich"],
        priority=2,
        source_name="UF CJC Zurich program page"
    ),
    CityTipCreate(
        city_slug="zurich",
        category="academics",
        title="UF in Switzerland and Austria: Course information",
        content="Courses are taught by UF faculty. Required: MMC 4302 World Communications Systems (3 credits). Choose one: ADV 4930, JOU 4930, PUR 4932, RTV 4930 (3 credits each). Total: 6 UF GPA credits.",
        program="UF in Switzerland and Austria",
        short_description="UF faculty, 6 credits, multiple CJC courses.",
        tags=["courses", "credits", "faculty", "CJC", "UF program", "Zurich"],
        priority=3,
        source_name="UF CJC Zurich program page"
    ),
    CityTipCreate(
        city_slug="zurich",
        category="housing",
        title="UF in Switzerland and Austria: Student housing in Zurich",
        content="Students are housed in hotels in Zurich. Excursions and site visits are included.",
        program="UF in Switzerland and Austria",
        short_description="Hotel housing, excursions, UF program.",
        tags=["housing", "hotel", "excursions", "UF program", "Zurich"],
        priority=4,
        source_name="UF CJC Zurich program page"
    )
]
vienna_tips += [
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="UF in Switzerland and Austria: CJC study abroad program in Vienna",
        content="This UF program combines academics with authentic travel. Students immerse in Vienna’s imperial grandeur, artistic legacy, and vibrant café culture. Courses in advertising, PR, journalism, and media production are taught by UF faculty and count toward your degree.",
        program="UF in Switzerland and Austria",
        short_description="UF CJC program: academics, culture, travel, faculty-led.",
        tags=["UF program", "CJC", "advertising", "journalism", "PR", "media", "Vienna"],
        priority=10,
        source_name="UF CJC Vienna program page"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="eligibility",
        title="UF in Switzerland and Austria: Eligibility requirements",
        content="Open to all majors, major focus on CJC majors/minors. 2.5 GPA and good standing required.",
        program="UF in Switzerland and Austria",
        short_description="Open to all majors, CJC focus, 2.5+ GPA, good standing.",
        tags=["eligibility", "GPA", "CJC", "UF program", "Vienna"],
        priority=11,
        source_name="UF CJC Vienna program page"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="UF in Switzerland and Austria: Course information",
        content="Courses are taught by UF faculty. Required: MMC 4302 World Communications Systems (3 credits). Choose one: ADV 4930, JOU 4930, PUR 4932, RTV 4930 (3 credits each). Total: 6 UF GPA credits.",
        program="UF in Switzerland and Austria",
        short_description="UF faculty, 6 credits, multiple CJC courses.",
        tags=["courses", "credits", "faculty", "CJC", "UF program", "Vienna"],
        priority=12,
        source_name="UF CJC Vienna program page"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="housing",
        title="UF in Switzerland and Austria: Student housing in Vienna",
        content="Students are housed in hotels in Vienna. Excursions and site visits are included.",
        program="UF in Switzerland and Austria",
        short_description="Hotel housing, excursions, UF program.",
        tags=["housing", "hotel", "excursions", "UF program", "Vienna"],
        priority=13,
        source_name="UF CJC Vienna program page"
    )
]

# ---------------------------------------------------------------------------
# Non-program city essentials and fun tips (city-specific, practical)
# ---------------------------------------------------------------------------

bonn_tips += [
    CityTipCreate(
        city_slug="bonn",
        category="transportation",
        title="Use the SWB app for real-time trams and buses in Bonn",
        content="Download Bonn's local transit app (SWB/Verkehr) and save your frequent tram and bus routes. It helps a lot for late classes and weekend trips across Bonn and nearby Cologne.",
        short_description="Real-time local transit routing for daily student commuting.",
        tags=["bonn", "transport", "tram", "student life"],
        priority=1,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="bonn",
        category="city life",
        title="Cherry blossom season in Altstadt is beautiful and crowded",
        content="In spring, the Heerstraße/Altstadt area becomes very busy during cherry blossom peak. Go early in the morning for photos and quieter walks.",
        short_description="Best timing tip for Bonn's famous cherry blossom streets.",
        tags=["bonn", "spring", "cherry blossoms", "fun"],
        priority=2,
        source_name="City Essentials Guide"
    ),
]

wurzburg_tips += [
    CityTipCreate(
        city_slug="wurzburg",
        category="city life",
        title="Walk to the Alte Mainbrücke at sunset",
        content="The Old Main Bridge is a local favorite for sunset views, student meetups, and relaxed evenings by the river. It's a great social starting point in Würzburg.",
        short_description="Classic local hangout with river and city views.",
        tags=["wurzburg", "social", "sunset", "main river"],
        priority=1,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="transportation",
        title="Validate local transport tickets correctly",
        content="If you use regional tickets or day passes, check validation rules before boarding. Keep your ticket accessible for inspection, especially on trams and regional trains.",
        short_description="Avoid fines by understanding local ticket validation.",
        tags=["wurzburg", "transport", "tickets", "budget"],
        priority=2,
        source_name="City Essentials Guide"
    ),
]

ebs_tips += [
    CityTipCreate(
        city_slug="ebs",
        category="city life",
        title="Treat EBS as a two-location experience: Wiesbaden + Oestrich-Winkel",
        content="Plan your week around both locations and commute times. Save key addresses in your map app and leave extra buffer before first-time campus trips.",
        short_description="Practical planning for EBS's split-location routine.",
        tags=["ebs", "wiesbaden", "oestrich-winkel", "planning"],
        priority=1,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="ebs",
        category="networking",
        title="Use local business events and alumni meetups early",
        content="Wiesbaden and nearby Frankfurt host regular startup and business events. Join at least one event in your first month to build local professional contacts quickly.",
        short_description="Early networking creates internship and project opportunities.",
        tags=["ebs", "networking", "business", "career"],
        priority=2,
        source_name="City Essentials Guide"
    ),
]

eltville_tips += [
    CityTipCreate(
        city_slug="eltville",
        category="city life",
        title="Eltville is calm—plan errands around nearby larger hubs",
        content="Eltville is peaceful and small. For bigger shopping runs or specialized services, many students plan periodic trips to Wiesbaden or Frankfurt.",
        short_description="Smart weekly planning for a smaller-town routine.",
        tags=["eltville", "planning", "shopping", "wiesbaden"],
        priority=1,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="eltville",
        category="wellbeing",
        title="Use the riverside routes for decompression",
        content="The Rhine promenade is great for short walks between study sessions. Many students use it as a low-cost way to reset and manage stress.",
        short_description="Simple local wellness habit with no extra cost.",
        tags=["eltville", "wellbeing", "rhine", "student life"],
        priority=2,
        source_name="City Essentials Guide"
    ),
]

salzburg_tips += [
    CityTipCreate(
        city_slug="salzburg",
        category="transportation",
        title="Get comfortable with Salzburg's bus network quickly",
        content="Most day-to-day movement in Salzburg is by bus. Save your common routes and stop names so weekend travel and evening returns are less stressful.",
        short_description="Faster local navigation with saved routes and stops.",
        tags=["salzburg", "transport", "bus", "daily life"],
        priority=1,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="city life",
        title="Use student discounts at museums and music venues",
        content="Carry your student ID whenever you explore Salzburg's museums, concerts, or cultural events—discounts are common and add up over the semester.",
        short_description="Student ID can significantly cut cultural activity costs.",
        tags=["salzburg", "culture", "student discount", "budget"],
        priority=2,
        source_name="City Essentials Guide"
    ),
]

mannheim_tips = [
    CityTipCreate(
        city_slug="mannheim",
        category="city life",
        title="Living in Mannheim: Grid city layout and strong student energy",
        content="Mannheim's city center uses a block-grid system (quadrants), which feels unusual at first but becomes very efficient once you learn it. The city has an active student scene and easy links to Heidelberg and Frankfurt.",
        short_description="Grid layout + strong regional rail connectivity for students.",
        tags=["mannheim", "city life", "students", "regional travel"],
        priority=0,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="mannheim",
        category="transportation",
        title="Use tram and S-Bahn combinations for daily travel",
        content="Mannheim is very connected by trams and regional rail. Learn your nearest interchange station early, especially if your housing and campus are in different districts.",
        short_description="Transit strategy tip for fast daily commutes.",
        tags=["mannheim", "tram", "sbahn", "commute"],
        priority=1,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="mannheim",
        category="housing",
        title="Start housing search early and compare neighborhood tradeoffs",
        content="Compare rent, tram access, and evening safety when choosing neighborhoods. A slightly higher rent can be worth it if commute time drops significantly.",
        short_description="Balance price, commute, and comfort in housing choices.",
        tags=["mannheim", "housing", "rent", "planning"],
        priority=2,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="mannheim",
        category="food_drink",
        title="Look for daily lunch menus near campus",
        content="Many cafes and canteens offer lower-priced weekday lunch specials. Keep a shortlist of budget spots for high-workload weeks.",
        short_description="Budget-friendly meal planning tip for students.",
        tags=["mannheim", "food", "budget", "student life"],
        priority=3,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="mannheim",
        category="fun",
        title="Explore both industrial-modern and baroque sides of the city",
        content="Mannheim combines modern urban spaces with historical architecture around the palace area. Exploring both gives you a much better sense of local identity.",
        short_description="Quick local-culture orientation beyond classes.",
        tags=["mannheim", "culture", "history", "fun"],
        priority=4,
        source_name="City Essentials Guide"
    ),
]

leipzig_tips = [
    CityTipCreate(
        city_slug="leipzig",
        category="city life",
        title="Living in Leipzig: Creative, affordable, and student-friendly",
        content="Leipzig is known for relatively affordable living, a strong student culture, and creative neighborhoods like Plagwitz and Südvorstadt. It's a great city for balancing study, social life, and budget.",
        short_description="Affordable, creative city with a strong student atmosphere.",
        tags=["leipzig", "city life", "students", "budget"],
        priority=0,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="leipzig",
        category="transportation",
        title="Leipzig's tram + S-Bahn network can cover most routines",
        content="Plan around one or two main interchange stations and save route favorites in your transit app. This makes daily campus commutes and weekend plans much easier.",
        short_description="Transit setup tip for efficient everyday mobility.",
        tags=["leipzig", "transport", "tram", "sbahn"],
        priority=1,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="leipzig",
        category="housing",
        title="Search housing with commute time and neighborhood vibe in mind",
        content="Leipzig has diverse neighborhoods with different atmospheres and price ranges. Compare rent, noise level, and night transit access before signing.",
        short_description="Choose housing by both budget and day-to-day lifestyle.",
        tags=["leipzig", "housing", "planning", "student life"],
        priority=2,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="leipzig",
        category="food_drink",
        title="Keep a shortlist of budget lunch spots around your routes",
        content="Leipzig has many student-friendly cafes and bakeries. Build a list of affordable options near campus and transit lines to save time and money.",
        short_description="Practical food budgeting strategy for busy weeks.",
        tags=["leipzig", "food", "budget", "daily life"],
        priority=3,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="leipzig",
        category="fun",
        title="Use free/low-cost cultural events to learn the city quickly",
        content="Leipzig has frequent galleries, music events, and neighborhood festivals with low or no entry fees. They're ideal for meeting people and getting local context fast.",
        short_description="Low-cost social and cultural integration strategy.",
        tags=["leipzig", "events", "culture", "social"],
        priority=4,
        source_name="City Essentials Guide"
    ),
]

# Standalone cultural tips for Bern (no program tag → shows in Cultural tab)
bern_cultural_tips = [
    CityTipCreate(
        city_slug="bern",
        category="food",
        title="Bernese Food & Dining Culture",
        content=(
            "Bern is famous for its hearty traditional cuisine. Try the Berner Platte — a massive platter of cured meats, sausages, "
            "tongue, and sauerkraut served with potatoes and beans. Zibelechueche (onion tart) is a Bernese specialty, especially "
            "popular during the Zibelemärit (onion market) in November. For a sweet treat, try Toblerone — it was invented in Bern! "
            "Budget tip: university Mensas (cafeterias) offer meals for 7–10 CHF. Grocery shopping at Migros or Coop is much cheaper than eating out."
        ),
        short_description="Berner Platte, Zibelechueche, Toblerone — hearty Swiss-German food culture.",
        tags=["food", "culture", "Bernese cuisine"],
        priority=0,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="bern",
        category="social norms",
        title="Swiss Social Norms & Etiquette in Bern",
        content=(
            "The Swiss-German region values punctuality, politeness, and personal space. Always greet people with 'Grüezi' (formal) or 'Hoi' (casual). "
            "Three-cheek-kiss greetings are common among friends (left-right-left). Quiet hours (Ruhezeit) are strictly observed: "
            "no loud noises between 10 PM–7 AM, and all day on Sundays. Recycling is mandatory — use color-coded bags and bins. "
            "Tipping is not expected (service is included) but rounding up is appreciated. Shops close early on Saturdays and are closed on Sundays."
        ),
        short_description="Punctuality, Grüezi, quiet hours, Sunday closures, mandatory recycling.",
        tags=["social norms", "etiquette", "Swiss-German"],
        priority=1,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="bern",
        category="daily life",
        title="Daily Life & Getting Around Bern",
        content=(
            "Bern has excellent public transport — trams and buses run frequently and are always on time. Buy a Libero monthly pass for unlimited travel. "
            "In summer, locals swim in the Aare River — it's a beloved Bernese tradition (the current is strong, so follow the locals' lead). "
            "The Bärengraben (bear park) is a must-visit — bears are the city's symbol. The Bundeshaus (parliament) offers free tours. "
            "Bern's arcades (Lauben) are the longest covered shopping promenades in Europe — perfect for rainy days."
        ),
        short_description="Trams, Aare swimming, bear park, covered arcades, Libero pass.",
        tags=["daily life", "transport", "activities"],
        priority=2,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="bern",
        category="city life",
        title="Weekend Trips & Events from Bern",
        content=(
            "From Bern, you can reach Interlaken and the Jungfrau region in under an hour — some of the most stunning Alpine scenery in the world. "
            "Lucerne, Basel, and Zurich are all under 1.5 hours by train. The Zibelemärit (onion market) in late November is a beloved tradition "
            "with confetti battles and onion braids. Bern's Gurtenfestival in July is a major open-air music festival on the Gurten hill. "
            "In winter, the Christmas markets in the old town are magical."
        ),
        short_description="Jungfrau region, Zibelemärit, Gurtenfestival, easy Swiss rail travel.",
        tags=["city life", "weekend trips", "events", "Alps"],
        priority=3,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="bern",
        category="language",
        title="Language in Bern: Swiss-German Bernese Dialect",
        content=(
            "Bern sits in the Swiss-German part of Switzerland. Locals speak Berndütsch (Bernese German), which is quite different from Standard German. "
            "For example, 'Wie geht's?' becomes 'Wi geit's?' and 'Nicht' becomes 'Nid'. Don't worry — everyone understands High German (Hochdeutsch) "
            "and many speak excellent English, especially at the university. The French-speaking part of Switzerland (Romandie) starts just 30 minutes west, "
            "so you may hear French too. Learning a few Swiss-German phrases will delight locals."
        ),
        short_description="Berndütsch dialect, everyone understands High German and English.",
        tags=["language", "dialect", "Swiss-German", "Berndütsch"],
        priority=4,
        source_name="Swiss cultural guide"
    ),
]

# Tips for UF Exchange - Eastern Switzerland University of Applied Sciences (OST)
rapperswil_tips = [
    CityTipCreate(
        city_slug="hamburg",
        category="transportation",
        title="Ferries can be part of your normal commute in Hamburg",
        content="Hamburg's harbor ferries are part of the public transport system on some routes. They can be practical and scenic when moving between river-adjacent neighborhoods.",
        short_description="Use ferry routes strategically for commuting and city orientation.",
        tags=["hamburg", "transport", "ferry", "city life"],
        priority=3,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="hamburg",
        category="fun",
        title="Explore neighborhood markets for low-cost local food",
        content="Hamburg has weekly markets across districts with affordable produce and snacks. They're great for budget cooking and discovering local staples.",
        short_description="Weekly markets help with budget and local integration.",
        tags=["hamburg", "markets", "budget", "food"],
        priority=4,
        source_name="City Essentials Guide"
    ),
]

bonn_tips += [
    CityTipCreate(
        city_slug="bonn",
        category="food_drink",
        title="Use student canteens and lunch specials to control costs",
        content="Canteens and daily lunch menus can cut food spending significantly during exam periods. Keep a shortlist near your common routes.",
        short_description="Low-effort meal budgeting strategy for students.",
        tags=["bonn", "food", "budget", "student life"],
        priority=3,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="bonn",
        category="planning",
        title="Day-trip planning: Cologne and Düsseldorf are easy from Bonn",
        content="Bonn's rail connections make short cultural day trips simple. Plan around regional day passes to save money on weekend travel.",
        short_description="Practical nearby travel strategy for weekends.",
        tags=["bonn", "regional travel", "budget", "weekend"],
        priority=4,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="bonn",
        category="fun",
        title="Use the Rhine promenade for easy social meetups",
        content="The riverside areas are convenient, low-cost places to meet classmates, walk, and decompress after long study days.",
        short_description="Simple social routine with no reservation needed.",
        tags=["bonn", "rhine", "social", "wellbeing"],
        priority=5,
        source_name="City Essentials Guide"
    ),
]

wurzburg_tips += [
    CityTipCreate(
        city_slug="wurzburg",
        category="food_drink",
        title="Use weekday lunch menus near campus to save",
        content="Many student-friendly places in Würzburg run weekday lunch deals. Tracking a few favorites can reduce weekly food costs.",
        short_description="Reliable budget-food strategy for busy weeks.",
        tags=["wurzburg", "food", "budget", "student life"],
        priority=3,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="planning",
        title="Weather-ready shoes matter on hills and older streets",
        content="Würzburg has hilly sections and historic surfaces, so waterproof shoes and layers make daily commutes much easier in colder months.",
        short_description="Comfort and mobility tip for seasonal conditions.",
        tags=["wurzburg", "weather", "planning", "daily life"],
        priority=4,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="fun",
        title="Build a low-cost weekend routine around river walks and viewpoints",
        content="A lot of Würzburg's best experiences are free: walks by the Main, old-town exploration, and scenic lookout points.",
        short_description="Affordable way to enjoy the city regularly.",
        tags=["wurzburg", "free", "weekend", "city life"],
        priority=5,
        source_name="City Essentials Guide"
    ),
]

ebs_tips += [
    CityTipCreate(
        city_slug="ebs",
        category="transportation",
        title="Plan commute buffers between class blocks",
        content="Because EBS activities can span Wiesbaden and Oestrich-Winkel, leave realistic transit buffers to avoid missing sessions or networking events.",
        short_description="Commute-buffer planning prevents avoidable stress.",
        tags=["ebs", "transport", "planning", "student life"],
        priority=3,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="ebs",
        category="food_drink",
        title="Set a weekday meal routine near campus hubs",
        content="Choose 2-3 reliable lunch spots near your most frequent locations to save time and keep daily spending predictable.",
        short_description="Consistent meal strategy for high-workload weeks.",
        tags=["ebs", "food", "budget", "routine"],
        priority=4,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="ebs",
        category="fun",
        title="Use Rhine-area walks and small town centers for reset days",
        content="Short local outings in the Rheingau area are a great way to recover from intense coursework while still staying close to campus commitments.",
        short_description="Low-cost recovery and social activity option.",
        tags=["ebs", "rheingau", "wellbeing", "social"],
        priority=5,
        source_name="City Essentials Guide"
    ),
]

eltville_tips += [
    CityTipCreate(
        city_slug="eltville",
        category="transportation",
        title="Coordinate train timing for classes and errands",
        content="In smaller towns like Eltville, timing matters. Check return schedules before heading out so evening plans don't become long waits.",
        short_description="Simple schedule habit that saves hours each week.",
        tags=["eltville", "transport", "planning", "train"],
        priority=3,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="eltville",
        category="food_drink",
        title="Keep basic groceries stocked for limited-hour days",
        content="Store hours and options can feel limited compared with large cities. A weekly grocery rhythm helps avoid expensive last-minute choices.",
        short_description="Budget and convenience tip for smaller-city living.",
        tags=["eltville", "groceries", "budget", "daily life"],
        priority=4,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="eltville",
        category="fun",
        title="Use vineyard and riverside routes for low-cost weekend plans",
        content="Local walks and short trips in the Rheingau area offer good social options without major planning or spending.",
        short_description="Easy, affordable weekend activity pattern.",
        tags=["eltville", "weekend", "rheingau", "social"],
        priority=5,
        source_name="City Essentials Guide"
    ),
]

salzburg_tips += [
    CityTipCreate(
        city_slug="salzburg",
        category="food_drink",
        title="Track student-friendly lunch menus near central routes",
        content="Salzburg can get pricey in tourist-heavy zones, so keeping a list of student-value lunch places helps maintain a realistic budget.",
        short_description="Smart food budgeting in a high-traffic city center.",
        tags=["salzburg", "food", "budget", "student life"],
        priority=3,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="planning",
        title="Peak tourist seasons require earlier bookings",
        content="Popular periods increase demand for transport, events, and some services. Plan essentials a bit earlier than usual during major festival windows.",
        short_description="Seasonal planning tip to avoid logistical stress.",
        tags=["salzburg", "planning", "tourism", "events"],
        priority=4,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="fun",
        title="Use nearby nature routes for low-cost recharge days",
        content="Short hikes and nearby viewpoints are a major advantage of Salzburg. They're ideal for low-cost social plans between assignment deadlines.",
        short_description="Affordable outdoor option for wellbeing and social time.",
        tags=["salzburg", "nature", "wellbeing", "weekend"],
        priority=5,
        source_name="City Essentials Guide"
    ),
]

zurich_tips += [
    CityTipCreate(
        city_slug="zurich",
        category="transportation",
        title="Public transport is excellent—learn fare zones early",
        content="Zurich's transit is extremely reliable, but fare zones matter. Understanding zones early helps avoid overpaying and simplifies daily travel.",
        short_description="Zone awareness saves money in a high-cost city.",
        tags=["zurich", "transport", "zones", "budget"],
        priority=1,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="zurich",
        category="food_drink",
        title="Plan a realistic food budget from week one",
        content="Zurich prices can surprise new students. Combining grocery prep with occasional set lunch offers keeps spending sustainable.",
        short_description="Early food budgeting prevents monthly overspend.",
        tags=["zurich", "food", "budget", "planning"],
        priority=2,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="zurich",
        category="city life",
        title="Use lakefront and neighborhood libraries for study breaks",
        content="Mixing focused study blocks with short lake or library breaks is a common local rhythm and helps with workload management.",
        short_description="Balanced study routine tip used by many students.",
        tags=["zurich", "study", "wellbeing", "daily life"],
        priority=3,
        source_name="City Essentials Guide"
    ),
    CityTipCreate(
        city_slug="zurich",
        category="fun",
        title="Take advantage of free/low-cost city festivals and public events",
        content="Zurich hosts seasonal events and neighborhood festivals that are good for meeting people without high recurring costs.",
        short_description="Social integration without expensive nightlife every weekend.",
        tags=["zurich", "events", "social", "budget"],
        priority=4,
        source_name="City Essentials Guide"
    ),
]

# Standalone cultural tips for Rapperswil (no program tag → shows in Cultural tab)
rapperswil_cultural_tips = [
    CityTipCreate(
        city_slug="rapperswil",
        category="food",
        title="Rapperswil Food & Lake Zurich Dining",
        content=(
            "Rapperswil's lakeside setting means fresh fish from Lake Zurich is a local specialty — try Egli (perch) fillets at a Beizli (small Swiss tavern). "
            "The town's old town has cozy restaurants serving Rösti, Raclette, and Zürcher Geschnetzeltes (veal in cream sauce). "
            "For budget meals, the OST Mensa offers lunches for 7–9 CHF. Migros and Coop supermarkets are nearby. "
            "In summer, lakeside Badi (swimming) cafés serve drinks and snacks with stunning views."
        ),
        short_description="Lake Zurich fish, Rösti, Raclette, budget Mensa meals, lakeside cafés.",
        tags=["food", "culture", "Lake Zurich"],
        priority=0,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="rapperswil",
        category="social norms",
        title="Swiss Social Norms in the Zurich Region",
        content=(
            "The Zurich region is part of the Swiss-German cultural area. Locals are friendly but reserved — don't be surprised if people take time to warm up. "
            "Greet with 'Grüezi' (formal) or 'Hoi' (casual). Be punctual — even a few minutes late is considered rude. "
            "Quiet hours (Ruhezeit) are strictly enforced: no noise after 10 PM and all day Sunday. Laundry schedules in apartments are shared and strict. "
            "Recycling is a way of life — separate glass by color, use official trash bags (Gebührensäcke), and compost organic waste."
        ),
        short_description="Grüezi, punctuality, strict quiet hours, shared laundry, detailed recycling.",
        tags=["social norms", "etiquette", "Swiss-German"],
        priority=1,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="rapperswil",
        category="daily life",
        title="Daily Life & Activities in Rapperswil",
        content=(
            "Rapperswil is known as the 'Town of Roses' (Rosenstadt) — the castle rose garden has 15,000 rose bushes with lake views. "
            "The medieval Rapperswil Castle hosts a Polish museum (a historic connection). The wooden footbridge to Hurden is a scenic 840m walk across the lake. "
            "Knies Kinderzoo (children's zoo) is a family favorite. Public transport via ZVV connects to Zurich in 30 min. "
            "The Jona river area is great for jogging. In summer, kayaking and paddleboarding on Lake Zurich are popular."
        ),
        short_description="Rose gardens, castle, wooden footbridge, 30 min to Zurich, water sports.",
        tags=["daily life", "activities", "Lake Zurich"],
        priority=2,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="rapperswil",
        category="city life",
        title="Weekend Trips & Events from Rapperswil",
        content=(
            "From Rapperswil, Zurich is 30 min by train — explore the Bahnhofstrasse, Kunsthaus, and vibrant nightlife. "
            "The Appenzell region and Säntis mountain are under 1.5 hours east for hiking. Lucerne is about 1 hour south. "
            "In summer, the Blues'n'Jazz festival in Rapperswil is a highlight. The lake ferry (Zürichsee-Schifffahrt) offers scenic cruises "
            "connecting Rapperswil to Zurich with stops at lakeside villages."
        ),
        short_description="Zurich 30 min, Appenzell hiking, Blues'n'Jazz festival, lake ferries.",
        tags=["city life", "weekend trips", "events"],
        priority=3,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="rapperswil",
        category="language",
        title="Language in Rapperswil: Züritüütsch Dialect",
        content=(
            "Rapperswil is in the Zurich German-speaking region. Locals speak Züritüütsch (Zurich German), a Swiss-German dialect. "
            "Standard German is understood everywhere, and English proficiency is high, especially among younger people and at OST. "
            "Some useful Swiss-German: 'Merci vilmal' (thanks a lot), 'Uf Widerluege' (goodbye), 'Es Bier, bitte' (a beer, please). "
            "Learning even a few words of Swiss-German will earn you smiles and respect."
        ),
        short_description="Züritüütsch dialect; High German and English widely understood.",
        tags=["language", "dialect", "Swiss-German", "Züritüütsch"],
        priority=4,
        source_name="Swiss cultural guide"
    ),
]

# Tips for UF Exchange - ZHAW School of Engineering (Winterthur)
winterthur_tips = [
    CityTipCreate(
        city_slug="vienna",
        category="culture",
        title="Understanding Viennese Formality and Communication Style",
        content=(
            "Viennese culture values politeness, respect, and formal address. Use 'Herr' and 'Frau' with titles until invited otherwise. "
            "While Austrians are generally warm, they maintain a certain professional distance initially. Directness is appreciated but delivered diplomatically. "
            "Small talk is less common than in the US—conversations often jump to deeper topics. Don't take brief replies as coldness; it's simply directness. "
            "Humor tends toward wit and irony rather than overt jokes."
        ),
        short_description="Formal etiquette, diplomatic directness, Austrian warmth with professional boundaries.",
        tags=["culture", "communication", "etiquette", "vienna", "social norms"],
        priority=100,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="culture",
        title="Viennese Café Culture and Daily Social Life",
        content=(
            "Cafés are central to Viennese life—not just for coffee, but as a social space and tradition dating back centuries. "
            "Expect to spend 1-2 hours over a single coffee without feeling rushed (staff won't push you out). "
            "Ordering: request 'Wiener Melange' (cappuccino-like), 'Schwarzer' (black coffee), or 'Brauner' (coffee with milk). "
            "Bring your own laptop or book casually—working in cafés is normalized. "
            "Tipping: round up or leave 5-10% for full service, though not mandatory."
        ),
        short_description="Café as cultural pillar, coffee terminology, social time norms, tipping customs.",
        tags=["culture", "café", "social", "vienna", "daily life"],
        priority=101,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="culture",
        title="University Culture and Classroom Expectations",
        content=(
            "Austrian universities are more formal than US schools: professors expect punctuality and respect. Call instructors 'Herr Professor' or 'Frau Professora' unless told otherwise. "
            "Class size varies; large lectures are common, but seminars are discussion-based. Preparation is valued—show you've done the reading. "
            "Skipping class regularly is frowned upon and can affect your grade or standing. "
            "Exam culture: oral exams are standard in some programs; practice explaining concepts clearly in German if possible. "
            "Group work is common in seminars; Austrians expect organized planning and punctuality in group meetings."
        ),
        short_description="Formal professor relations, attendance expectations, exam preparation, group work norms.",
        tags=["academics", "culture", "classroom", "vienna", "expectations"],
        priority=102,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="culture",
        title="Social Norms and Dinner Etiquette",
        content=(
            "Dining is more formal than US casual eating. If invited to a Viennese home, arrive on time (being 5-10 minutes late is acceptable, earlier is rude). Bring flowers or wine as a hostess gift. "
            "Table manners matter: keep both hands visible on the table when not eating, eat slowly, and don't start until the host. "
            "Splitting bills: Dutch-style 'Spaltung' is not common; one person typically pays or it's discussed beforehand. "
            "Compliment the food genuinely; 'Sehr lecker' (very tasty) is appreciated. "
            "Religious/dietary restrictions are respected but mention them early when planning meals together."
        ),
        short_description="Dinner invitations, table etiquette, gifting norms, payment expectations, dietary respect.",
        tags=["culture", "etiquette", "dining", "vienna", "social"],
        priority=103,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="culture",
        title="Navigating Bureaucracy with Viennese Efficiency and Procedure",
        content=(
            "Austria runs on systems and procedures. When dealing with administration (housing, residence permits, banking), follow instructions exactly. "
            "Bring all required documents on your first visit—Austrian officials dislike unnecessary return trips. "
            "Forms matter: fill them out completely and accurately. Handwritten vs. typed documents have specific rules. "
            "Appointments: many offices require them; book online or by phone first. Walk-ins may be turned away. "
            "Even though the process feels rigid, Austrians respect when you follow procedures correctly—it speeds everything up."
        ),
        short_description="Document-heavy systems, appointment culture, exact procedure adherence, efficiency value.",
        tags=["culture", "bureaucracy", "practicality", "vienna", "administration"],
        priority=104,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="culture",
        title="Punctuality, Scheduling, and Time Management",
        content=(
            "Austrians—especially Viennese—place high value on punctuality. Arriving more than 5 minutes late is disrespectful and requires an apology. "
            "Plan travel with buffer time; assume public transport could be slightly delayed (even if rare). "
            "Scheduled plans (class, meetings, social events) start and end on time. Don't arrive early for casual plans, but arrive on time. "
            "Cancellations: if you can't make something, notify people as soon as possible. Last-minute cancellations can damage relationships. "
            "Time blocking: Austrians respect other people's time; don't let informal hangouts run over into scheduled activities."
        ),
        short_description="On-time culture, scheduling respect, buffer planning, cancellation protocol.",
        tags=["culture", "time", "punctuality", "vienna", "planning"],
        priority=105,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="culture",
        title="Environmental Consciousness and Sustainability",
        content=(
            "Austrians and especially Viennese take environmental responsibility seriously. Recycling is mandatory and strictly organized by type (paper, plastic, metal, organic). "
            "Public transport use is the norm; driving a car is less common and can be viewed critically. Walk or bike when possible. "
            "Food waste is minimized; many people shop for groceries more frequently (smaller quantities, less packaging). "
            "Plastic bags and unnecessary packaging are discouraged—bring reusable bags. "
            "Joining in these practices shows respect for local values and helps integration."
        ),
        short_description="Rigorous recycling, public transit priority, food waste minimization, anti-plastic culture.",
        tags=["culture", "environment", "sustainability", "vienna", "values"],
        priority=106,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="culture",
        title="Greeting Customs and Physical Boundaries",
        content=(
            "Greetings vary by context: 'Guten Morgen/Tag/Abend' (good morning/day/evening) is standard in public and professional settings. "
            "In casual settings, 'Hallo' or 'Servus' (South Austrian, very casual) are common. Don't use 'Servus' with strangers. "
            "Handshakes: appropriate in professional and formal settings. In casual or social settings, a wave or verbal greeting suffices. "
            "Cheek kissing (one kiss) is common among close friends and family, not with strangers or acquaintances. "
            "Personal space: Austrians respect distance; standing too close can feel invasive."
        ),
        short_description="Formal/casual greetings, handshake norms, kiss protocol, personal space respect.",
        tags=["culture", "etiquette", "greeting", "vienna", "boundaries"],
        priority=107,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="culture",
        title="Common Cultural Mistakes to Avoid",
        content=(
            "❌ Don't assume everyone speaks English—always ask politely first in German. "
            "❌ Avoid loud or boisterous behavior in public; quiet confidence is valued. "
            "❌ Don't discuss politics or history casually; Austrians can be sensitive about WWII and are often neutral politically. "
            "❌ Don't touch someone's personal items without asking—Austrians value autonomy. "
            "❌ Avoid excessive compliments about appearance; it can feel inappropriate. Professional or situational compliments are better. "
            "❌ Don't underestimate formality in first meetings—you can always become more casual, but starting too casual is harder to recover from."
        ),
        short_description="Etiquette pitfalls: language, volume, politics, boundaries, formality.",
        tags=["culture", "mistakes", "avoid", "vienna", "integration"],
        priority=108,
        source_name="Cultural Guide"
    ),
]

# Standalone cultural tips for Winterthur (no program tag → shows in Cultural tab)
winterthur_cultural_tips = [
    CityTipCreate(
        city_slug="winterthur",
        category="food",
        title="Winterthur Food & Dining Scene",
        content=(
            "Winterthur has a surprisingly diverse food scene for its size. The Marktgasse (market street) in the old town is lined with restaurants, "
            "cafés, and bakeries. Try classic Swiss-German dishes: Zürcher Geschnetzeltes (sliced veal in cream sauce with Rösti), Käseschnitte "
            "(Swiss cheese toast), and Bündnerfleisch (air-dried beef). The weekly market on Tuesdays and Fridays has fresh local produce. "
            "Student budget tip: the ZHAW Mensa offers meals for 7–9 CHF. Migros and Coop are everywhere for groceries."
        ),
        short_description="Diverse old town dining, Zürcher Geschnetzeltes, weekly markets, budget Mensa.",
        tags=["food", "culture", "Swiss cuisine"],
        priority=0,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="winterthur",
        category="social norms",
        title="Swiss Social Norms in Winterthur",
        content=(
            "Winterthur follows typical Swiss-German social norms. Punctuality is paramount — arriving late is seen as disrespectful. "
            "Greet with 'Grüezi' (formal) or 'Hoi' (casual). On public transport, it's polite to offer seats to elderly passengers. "
            "Noise rules are strict: quiet hours 10 PM–7 AM and all day Sunday. Apartment recycling is detailed — separate paper, cardboard, "
            "glass (by color), PET bottles, aluminum, and use official Gebührensäcke (paid trash bags). "
            "Sunday is rest day: shops are closed, avoid mowing lawns or doing laundry in shared facilities."
        ),
        short_description="Punctuality, Grüezi, strict quiet hours, detailed recycling, Sunday rest.",
        tags=["social norms", "etiquette", "Swiss-German"],
        priority=1,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="winterthur",
        category="daily life",
        title="Daily Life & Culture in Winterthur",
        content=(
            "Winterthur is called the 'City of Museums' — it has 17 museums, including the world-renowned Oskar Reinhart Collection and the Fotomuseum. "
            "The Stadtgarten (city garden) is a relaxing park in the center. The Technorama (Swiss Science Center) is a hands-on science museum "
            "loved by all ages. Public transport via Stadtbus connects the entire city, and Zurich is just 20 minutes by S-Bahn. "
            "The Eulachpark and Wildpark Bruderhaus (deer park) are great for jogging and nature walks."
        ),
        short_description="City of Museums, Technorama, Stadtgarten, 20 min to Zurich, nature parks.",
        tags=["daily life", "museums", "culture", "transport"],
        priority=2,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="winterthur",
        category="city life",
        title="Weekend Trips & Events from Winterthur",
        content=(
            "Winterthur's location is unbeatable for travel: Zurich (20 min), Zurich Airport (15 min), Konstanz/Germany (1 hr), "
            "St. Gallen (45 min), and the Rhine Falls (30 min) — Europe's largest waterfall. "
            "Major local events: Winterthurer Musikfestwochen (June) is one of Europe's biggest open-air music festivals and it's free. "
            "The Albanifest (late June) is Switzerland's largest old town festival. Christmas markets in the Altstadt are charming."
        ),
        short_description="Zurich 20 min, Rhine Falls 30 min, free Musikfestwochen, Albanifest.",
        tags=["city life", "weekend trips", "events", "festivals"],
        priority=3,
        source_name="Swiss cultural guide"
    ),
    CityTipCreate(
        city_slug="winterthur",
        category="language",
        title="Language in Winterthur: Swiss-German Dialect",
        content=(
            "Winterthur is in the Zurich German-speaking region. Locals speak Swiss-German (Schwyzerdütsch), specifically the Zurich variety. "
            "Standard German (Hochdeutsch) is understood by everyone and used in formal settings, university, and writing. "
            "English proficiency is high, especially among students and at ZHAW. Useful phrases: 'Grüezi mitenand' (hello everyone), "
            "'Merci' (thank you — yes, the French word is used!), 'Tschüss' or 'Ade' (bye). Swiss-German has no standard written form, "
            "so don't be confused when texts look different from Standard German."
        ),
        short_description="Swiss-German dialect; High German and English widely spoken.",
        tags=["language", "dialect", "Swiss-German", "Schwyzerdütsch"],
        priority=4,
        source_name="Swiss cultural guide"
    ),
]

# Tips for UF students studying abroad in Mannheim (UF Exchange - University of Mannheim)
mannheim_tips = [
    CityTipCreate(
        city_slug="mannheim",
        category="culture",
        title="Grid City Layout and Urban Planning Excellence",
        content=(
            "Mannheim is unique in Europe: its city center is laid out on a grid system of 'quadrats' (squares labeled with letters and numbers). "
            "This unusual layout was intentional (17th-century design); it reflects planning precision and rational thinking. "
            "The grid makes the city extremely logical and navigable once you understand the system. "
            "This layout philosophy extends to German values: order, efficiency, and logical organization. "
            "Respecting this urban planning shows appreciation for local history and culture. "
            "The grid becomes endearing to residents; it's a unique identifier for the city."
        ),
        short_description="Unique grid layout, rational planning, efficiency value, logical navigation, historical design.",
        tags=["culture", "mannheim", "urban", "planning", "history", "identity"],
        priority=230,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="mannheim",
        category="culture",
        title="Heidelberg Proximity and Regional Culture",
        content=(
            "Mannheim is about 15-20 minutes by train from Heidelberg, a major cultural and tourist attraction. "
            "The region blends industrial Mannheim with romantic Heidelberg; cultures are different but complementary. "
            "Day trips to Heidelberg for culture and sightseeing are common. "
            "The Neckar River and surrounding wine regions make the area culturally rich. "
            "Understanding both cities provides fuller picture of regional identity. "
            "Regional pride exists but is less intense than Bavaria or Rhineland."
        ),
        short_description="Heidelberg proximity, regional blend, day trips accessible, wine regions, cultural richness.",
        tags=["culture", "mannheim", "heidelberg", "region", "proximity", "travel"],
        priority=231,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="mannheim",
        category="culture",
        title="Industrial Heritage and Modern Business Culture",
        content=(
            "Mannheim is historically industrial (chemical, automotive) but has modernized into a service and tech hub. "
            "The city values innovation, efficiency, and quality. "
            "Business and entrepreneurship are important; local companies are major employers. "
            "Student culture blends academic with professional focus. Internships are normalized. "
            "The culture is less 'fun party' and more 'work seriously, play moderately.' "
            "Respect for business traditions and modern innovation balance the culture."
        ),
        short_description="Industrial heritage, business-focused, innovation valued, professional culture, balanced lifestyle.",
        tags=["academics", "culture", "business", "mannheim", "industry", "practical"],
        priority=232,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="mannheim",
        category="culture",
        title="Rhine Region and Water Culture",
        content=(
            "Mannheim sits on the Rhine River; water sports and river culture are part of life. "
            "River walks, boat tours, and water sports (kayaking, rowing) are accessible and popular. "
            "The Rhine promenade is a major social and recreational space. "
            "Water quality and river conservation are important values. "
            "Cycling along the river is a common leisure activity and commuting method. "
            "The river provides psychological and recreational well-being for residents."
        ),
        short_description="Rhine River culture, water sports accessible, river recreation, cycling infrastructure.",
        tags=["culture", "lifestyle", "mannheim", "rhine", "outdoor", "wellbeing"],
        priority=233,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="mannheim",
        category="culture",
        title="Common Cultural Mistakes to Avoid",
        content=(
            "❌ Don't mock the grid layout; it's a source of local pride. "
            "❌ Avoid viewing Mannheim as just 'industrial' or boring; it's modern and vibrant. "
            "❌ Don't dismiss business culture as dry; students have active social lives. "
            "❌ Avoid arriving late; punctuality is important in business-oriented culture. "
            "❌ Don't ignore proximity to Heidelberg; day trips are cultural integration. "
            "❌ Avoid loud behavior in shared spaces; quiet respect is valued."
        ),
        short_description="Grid pride, city respect, business balance, punctuality, cultural exploration, quiet demeanor.",
        tags=["culture", "mistakes", "avoid", "mannheim", "integration", "identity"],
        priority=234,
        source_name="Cultural Guide"
    ),
]

# LEIPZIG CULTURAL TIPS (Alternative culture, publishing, arts)
leipzig_cultural_tips = [
    CityTipCreate(
        city_slug="leipzig",
        category="culture",
        title="Alternative Culture and Creative Community",
        content=(
            "Leipzig is known for alternative, artistic, and activist culture. The city attracts creatives, artists, and free thinkers. "
            "DIY culture is strong; self-organized projects, squats, and community initiatives are normalized. "
            "The culture questions authority and values individual expression and authenticity. "
            "Art, music, theater, and performance are central to city identity, not peripheral. "
            "Gentrification is a sensitive issue; new arrivals should respect existing community and activism. "
            "Students engage with social issues and activism as part of normal discourse."
        ),
        short_description="Alternative culture, DIY spirit, artist community, activism, authentic expression, art-focused.",
        tags=["culture", "leipzig", "alternative", "art", "activism", "community"],
        priority=240,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="leipzig",
        category="culture",
        title="Publishing, Literature, and Intellectual Tradition",
        content=(
            "Leipzig has a historic role in German book publishing and printing (since 15th century). "
            "The city has intellectual and literary heritage; philosophical thought and discourse are valued. "
            "The Leipzig Book Fair is one of Europe's largest; publishing and reading are cultural anchors. "
            "University culture emphasizes ideas, debate, and critical thinking. "
            "Student bookshops, reading groups, and literary events are active. "
            "Engaging with ideas and discourse is normalized; coffee culture often includes philosophical discussion."
        ),
        short_description="Publishing legacy, intellectual culture, Book Fair tradition, literary tradition, critical discourse.",
        tags=["culture", "leipzig", "literature", "ideas", "tradition", "intellectual"],
        priority=241,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="leipzig",
        category="culture",
        title="Music and Nightlife Culture",
        content=(
            "Leipzig has vibrant independent music scene: experimental, indie, electronic, classical. "
            "Live music venues are abundant and affordable. Student bands and DIY concerts are common. "
            "Nightlife is active but distinctly alternative (independent clubs, underground venues, smaller bars). "
            "The culture prioritizes authenticity over corporate entertainment. "
            "Festival culture is strong (Wave-Gotik-Treffen for alternative culture, etc.). "
            "Supporting independent venues over chains is cultural practice."
        ),
        short_description="Independent music scene, live venues abundant, DIY concerts, alternative nightlife, festivals.",
        tags=["culture", "leipzig", "music", "nightlife", "art", "lifestyle"],
        priority=242,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="leipzig",
        category="culture",
        title="Affordability and Student-Friendly Culture",
        content=(
            "Leipzig is one of Germany's most affordable cities; rent, food, and entertainment are very cheap. "
            "This affordability attracts students and creatives on tight budgets; financial constraints are normalized. "
            "Shared apartments (WGs) are standard and very affordable (€150-300/month). "
            "Student discounts are generous. Free or very cheap cultural events are abundant. "
            "Part-time work is normalized; many students work and study simultaneously. "
            "The affordability creates space for experimentation and risk-taking in artistic pursuits."
        ),
        short_description="Affordable living, cheap WGs, generous student discounts, free events, part-time work normalized.",
        tags=["culture", "leipzig", "budget", "affordable", "student life", "practical"],
        priority=243,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="leipzig",
        category="culture",
        title="Common Cultural Mistakes to Avoid",
        content=(
            "❌ Don't treat alternative culture as a costume or tourist experience; it's a real living community. "
            "❌ Avoid conspicuous consumption or 'fancy' behavior; it's culturally tone-deaf in this context. "
            "❌ Don't disrespect or mock activist/political engagement; discourse is taken seriously. "
            "❌ Avoid chain stores when local alternatives exist; support independent businesses. "
            "❌ Don't assume everyone is poor; respect for financial diversity exists. "
            "❌ Avoid dismissing the city as just 'East German poor'; it's vibrant and creative."
        ),
        short_description="Culture respect, authenticity, activism respect, local support, financial sensitivity, city appreciation.",
        tags=["culture", "mistakes", "avoid", "leipzig", "integration", "values"],
        priority=244,
        source_name="Cultural Guide"
    ),
]

# EBS CULTURAL TIPS (Business school in Rhineland / Wine region)
ebs_cultural_tips = [
    CityTipCreate(
        city_slug="ebs",
        category="culture",
        title="Rhineland Tradition and Wine Region Culture (Rheingau/Wiesbaden)",
        content=(
            "EBS campuses are in Wiesbaden (spa city) and Oestrich-Winkel (wine region). The Rhineland-Hesse region has centuries of tradition. "
            "Wine culture (Rheingau Riesling) is integral to local identity and daily social life. "
            "The region values tradition, craftsmanship, and heritage. Historic architecture and traditions are respected. "
            "Wiesbaden is a historic spa city with Prussian architectural heritage; understanding this context enriches experience. "
            "Local pride in region is strong; respecting regional identity shows cultural engagement. "
            "Wine tastings, vineyard walks, and regional festivals are normal activities."
        ),
        short_description="Rheingau wine heritage, spa culture, tradition-focused, regional pride, historic architecture.",
        tags=["culture", "ebs", "wiesbaden", "rheingau", "wine", "tradition"],
        priority=250,
        source_name="Cultural Guide"
    ),
    CityTipCreate(
        city_slug="ebs",
        category="culture",
        title="Elite Business School Culture and Professional Expectations",
        content=(
            "EBS is an elite, internationally-focused business school. The culture is formal, professional, and ambitious. "
            "Business formal dress is normalized; appearance and professionalism matter. "
            "Networking is emphasized as core skill; building relationships with peers and alumni is expected. "
            "Competitive but collaborative; group projects have high expectations. "
            "International students (majority are international) create multicultural, English-heavy environment. "
            "Career and professional development are central; internships and job placement are prioritized. "
            "Excellence and ambition are cultural norms."
        ),
        short_description="Elite culture, professional formality, networking emphasis, ambitious, international environment.",
        tags=["academics", "culture", "business", "ebs", "professional", "elite"],
        priority=251,
        source_name="Cultural Guide"
    ),
]

# ═══════════════════════════════════════════════════════════
# Osnabrück ISU Summer Engineering Program
# ═══════════════════════════════════════════════════════════
osnabruck_isu_tips = [
    CityTipCreate(
        city_slug="osnabruck",
        category="overview",
        title="ISU Summer Engineering Program Overview",
        content=(
            "The ISU (Iowa State University) Summer Engineering Program in Osnabrück is a faculty-led summer program "
            "open to UF students through the study abroad office. It focuses on Agricultural & Biological Engineering "
            "(ABE) courses taught by UF/ISU faculty at the Osnabrück University of Applied Sciences. "
            "The program runs roughly 5–6 weeks in May–June and includes excursions to German engineering firms, "
            "farms, and renewable energy sites. All courses are taught in English."
        ),
        short_description="5–6 week summer engineering program at Osnabrück University of Applied Sciences.",
        tags=["overview", "ISU", "engineering", "summer", "ABE", "faculty-led"],
        priority=1,
        program="ISU Summer Engineering - Osnabrück",
        source_name="UF ISU Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="academics",
        title="Courses Offered (ISU Summer Engineering)",
        content=(
            "Students typically take ABE 4932 special-topics courses in Agricultural & Biological Engineering. "
            "Common topics include precision agriculture, renewable energy systems, biosystems engineering, "
            "and water resource management. Courses carry UF GPA credit (3–6 credits). "
            "Classes are held at the Osnabrück University of Applied Sciences campus and include lab visits, "
            "field trips, and guest lectures by German industry professionals."
        ),
        short_description="ABE 4932 courses: precision ag, renewable energy, biosystems; 3–6 UF GPA credits.",
        tags=["courses", "ABE 4932", "credits", "precision agriculture", "renewable energy"],
        priority=2,
        program="ISU Summer Engineering - Osnabrück",
        source_name="UF ISU Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="excursions",
        title="Excursions & Site Visits (ISU Summer Engineering)",
        content=(
            "The program includes organized excursions to major German engineering and agriculture sites: "
            "CLAAS (agricultural machinery), Krone (forage harvesting equipment), wind farms and biogas plants, "
            "the VW Autostadt in Wolfsburg, and local organic and conventional farms. "
            "There's also a weekend trip to Berlin and sometimes Hamburg or Cologne. "
            "These excursions bridge classroom theory with real-world German engineering and sustainability practices."
        ),
        short_description="Visits to CLAAS, Krone, VW, wind farms, biogas plants; weekend trips to Berlin.",
        tags=["excursions", "CLAAS", "Krone", "VW", "wind farm", "biogas", "Berlin"],
        priority=3,
        program="ISU Summer Engineering - Osnabrück",
        source_name="UF ISU Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="housing",
        title="Housing & Living (ISU Summer Engineering)",
        content=(
            "Students are typically housed in student dormitories near the Osnabrück University of Applied Sciences campus. "
            "Rooms are furnished with shared kitchen and bathroom facilities. "
            "Osnabrück is a mid-sized city (170k population) with a low cost of living compared to larger German cities. "
            "Expect to spend €600–€900 per month on housing, food, and local transport."
        ),
        short_description="Student dorms near campus; €600–€900/month total living costs.",
        tags=["housing", "dorms", "cost of living", "Osnabrück"],
        priority=4,
        program="ISU Summer Engineering - Osnabrück",
        source_name="UF ISU Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="costs",
        title="Costs & Financial Aid (ISU Summer Engineering)",
        content=(
            "Program costs include UF tuition (summer rates), program fee (~$2,500–$3,500 covering excursions, "
            "some meals, and administrative support), round-trip airfare (~$800–$1,200), and personal expenses. "
            "Students remain enrolled at UF and can use Bright Futures and other state/federal financial aid. "
            "Additional scholarships may be available through the UF Study Abroad office."
        ),
        short_description="UF tuition + ~$2,500–$3,500 program fee; Bright Futures and financial aid apply.",
        tags=["costs", "tuition", "program fee", "financial aid", "Bright Futures", "scholarships"],
        priority=5,
        program="ISU Summer Engineering - Osnabrück",
        source_name="UF ISU Osnabrück program page"
    ),
]

# ═══════════════════════════════════════════════════════════
# Würzburg TASSEP Program
# ═══════════════════════════════════════════════════════════
wurzburg_tassep_tips = [
    CityTipCreate(
        city_slug="wurzburg",
        category="overview",
        title="TASSEP Exchange Program Overview (Würzburg)",
        content=(
            "TASSEP stands for Trans-Atlantic Science Student Exchange Program. It is a consortium of "
            "European and North American universities that facilitates tuition-free semester exchanges for "
            "science and engineering students. UF students pay UF tuition and receive transfer credit. "
            "At the University of Würzburg (Julius-Maximilians-Universität), TASSEP students can study "
            "biology, chemistry, physics, mathematics, computer science, and other STEM fields. "
            "The program is ideal for students who want a genuine immersion experience at a full German research university."
        ),
        short_description="TASSEP = Trans-Atlantic Science Student Exchange Program; tuition-free semester exchange for STEM students.",
        tags=["TASSEP", "overview", "exchange", "science", "STEM", "tuition-free"],
        priority=1,
        program="TASSEP - Universität Würzburg",
        source_name="UF TASSEP Würzburg program page"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="academics",
        title="Academics at University of Würzburg (TASSEP)",
        content=(
            "The University of Würzburg is a leading German research university founded in 1402. "
            "It is especially strong in the natural sciences — Wilhelm Röntgen discovered X-rays here. "
            "TASSEP students take courses alongside German students (some in English, many in German). "
            "Common fields: biology, biochemistry, chemistry, physics, mathematics, computer science, "
            "and earth sciences. The ECTS credit system is used; 30 ECTS ≈ 15 US credits per semester."
        ),
        short_description="Founded 1402; strong in natural sciences; courses in English and German; ECTS credits.",
        tags=["academics", "University of Würzburg", "research", "ECTS", "natural sciences", "Röntgen"],
        priority=2,
        program="TASSEP - Universität Würzburg",
        source_name="UF TASSEP Würzburg program page"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="eligibility",
        title="Eligibility & Requirements (TASSEP Würzburg)",
        content=(
            "Requirements: minimum 3.0 GPA, sophomore standing or above, enrolled in a CLAS/STEM major. "
            "German language proficiency is strongly recommended (B1 level or higher) since many courses are in German. "
            "Students who don't speak German can find some English-taught courses but options may be limited. "
            "Application deadlines: Fall/Academic Year — early February; Spring — early September."
        ),
        short_description="Min 3.0 GPA; STEM major; German B1+ recommended; Fall deadline early Feb.",
        tags=["eligibility", "GPA", "STEM", "German language", "B1", "deadline"],
        priority=3,
        program="TASSEP - Universität Würzburg",
        source_name="UF TASSEP Würzburg program page"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="housing",
        title="Housing in Würzburg (TASSEP)",
        content=(
            "The Studentenwerk Würzburg operates several student residence halls (Wohnheime). "
            "TASSEP exchange students can apply for a room through the International Office. "
            "Expect to pay €250–€400/month for a furnished room in a shared apartment (WG) or dorm. "
            "Würzburg is a small, walkable city, so most student housing is within biking distance of campus."
        ),
        short_description="Student residence halls via Studentenwerk; €250–€400/month; walkable city.",
        tags=["housing", "Studentenwerk", "dorm", "WG", "rent", "walkable"],
        priority=4,
        program="TASSEP - Universität Würzburg",
        source_name="UF TASSEP Würzburg program page"
    ),
    CityTipCreate(
        city_slug="wurzburg",
        category="city life",
        title="Life in Würzburg",
        content=(
            "Würzburg is a charming baroque city of ~130,000 on the Main River in Lower Franconia, Bavaria. "
            "It's famous for the UNESCO-listed Würzburg Residence palace, excellent Franconian wines, "
            "and a vibrant student scene (1 in 5 residents is a student). "
            "The Alte Mainbrücke (Old Main Bridge) is a beloved gathering spot for wine in the evening. "
            "Würzburg is well-connected by train: Munich ~2 hrs, Frankfurt ~1 hr, Nuremberg ~1 hr."
        ),
        short_description="Baroque city on the Main River; UNESCO palace; Franconian wine; great student scene.",
        tags=["city life", "baroque", "Main River", "wine", "Alte Mainbrücke", "UNESCO", "student city"],
        priority=5,
        program="TASSEP - Universität Würzburg",
        source_name="General Würzburg info"
    ),
]

# ═══════════════════════════════════════════════════════════
# Berlin NFL (Globalizing American Sports) — CJC Faculty-led
# ═══════════════════════════════════════════════════════════
berlin_nfl_tips = [
    CityTipCreate(
        city_slug="berlin",
        category="overview",
        title="CJC: Globalizing American Sports — NFL in Berlin",
        content=(
            "This is a short-term, faculty-led program through UF's College of Journalism and Communications (CJC). "
            "Students explore how American professional sports — especially the NFL — expand internationally, "
            "using Berlin as a case study. The program typically runs 2–3 weeks in May or summer. "
            "Students earn 3 UF GPA credits, attend NFL Europe events or related sports media activities, "
            "and visit German media organizations."
        ),
        short_description="2–3 week CJC faculty-led program on NFL globalization; 3 UF GPA credits.",
        tags=["overview", "CJC", "NFL", "sports media", "faculty-led", "Berlin"],
        priority=1,
        program="UF in Berlin - Globalizing the NFL",
        source_name="UF CJC Berlin NFL program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="academics",
        title="Coursework & Activities (NFL in Berlin)",
        content=(
            "The program centers on JOU/MMC/ADV/PUR special-topics courses examining sports communication, "
            "media globalization, and brand management in international markets. "
            "Activities include visits to German sports media outlets, the Olympiastadion, "
            "meetings with NFL Germany representatives, and cultural excursions in Berlin. "
            "Guest lectures from German journalists and sports marketing professionals are common."
        ),
        short_description="JOU/MMC/ADV/PUR courses; visits to Olympiastadion, German media, NFL Germany reps.",
        tags=["courses", "JOU", "sports communication", "Olympiastadion", "media", "NFL Germany"],
        priority=2,
        program="UF in Berlin - Globalizing the NFL",
        source_name="UF CJC Berlin NFL program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="costs",
        title="Costs & Logistics (NFL in Berlin)",
        content=(
            "Program costs include UF tuition (summer rate), a program fee (~$2,000–$3,500 covering "
            "accommodations, some meals, excursion entries, and group transport), and personal expenses. "
            "Round-trip airfare to Berlin is typically $700–$1,100. "
            "Students may use Bright Futures, financial aid, and study abroad scholarships. "
            "The program is open to all UF undergraduates, not just CJC majors."
        ),
        short_description="UF tuition + ~$2,000–$3,500 program fee; open to all UF undergrads.",
        tags=["costs", "program fee", "Bright Futures", "financial aid", "open enrollment"],
        priority=3,
        program="UF in Berlin - Globalizing the NFL",
        source_name="UF CJC Berlin NFL program page"
    ),
]

# ═══════════════════════════════════════════════════════════
# CJC Switzerland & Austria (Zurich + Vienna)
# ═══════════════════════════════════════════════════════════
cjc_switzerland_austria_zurich_tips = [
    CityTipCreate(
        city_slug="zurich",
        category="overview",
        title="CJC: Global Media in Switzerland & Austria (Zurich)",
        content=(
            "This CJC (College of Journalism and Communications) faculty-led program explores global media, "
            "communications, and journalism across Switzerland and Austria. Students spend time in Zurich and Vienna, "
            "visiting media organizations, attending lectures, and producing content. "
            "The program typically runs 2–3 weeks in May 2026 and awards 3 UF GPA credits."
        ),
        short_description="2–3 week CJC program in Zurich & Vienna; global media & communications; 3 credits.",
        tags=["overview", "CJC", "global media", "journalism", "Switzerland", "Austria", "faculty-led"],
        priority=1,
        program="CJC: Global Media - Switzerland & Austria 2026",
        source_name="UF CJC Switzerland/Austria program page"
    ),
    CityTipCreate(
        city_slug="zurich",
        category="academics",
        title="Coursework & Activities in Zurich (CJC)",
        content=(
            "In Zurich, students visit major Swiss media outlets, advertising agencies, and public broadcasting. "
            "Coursework covers comparative media systems, press freedom, public diplomacy, and digital journalism. "
            "Students may visit the Internationale Funkausstellung, Tamedia, SRF (Swiss Broadcasting), "
            "and attend guest lectures on Swiss neutrality and media regulation."
        ),
        short_description="Visit Swiss media outlets, SRF, Tamedia; courses on media systems and digital journalism.",
        tags=["academics", "Swiss media", "SRF", "Tamedia", "digital journalism", "press freedom"],
        priority=2,
        program="CJC: Global Media - Switzerland & Austria 2026",
        source_name="UF CJC Switzerland/Austria program page"
    ),
    CityTipCreate(
        city_slug="zurich",
        category="costs",
        title="Costs & Logistics (CJC Switzerland & Austria)",
        content=(
            "Program costs include UF tuition (summer rate), a program fee (~$3,000–$4,500 covering "
            "accommodations in both cities, some meals, inter-city travel, and excursion entries), "
            "and personal spending money. Round-trip airfare typically $800–$1,200. "
            "Financial aid and study abroad scholarships apply. Open to all UF undergraduates."
        ),
        short_description="UF tuition + ~$3,000–$4,500 program fee covering both cities; open to all UF students.",
        tags=["costs", "program fee", "financial aid", "Zurich", "Vienna", "open enrollment"],
        priority=3,
        program="CJC: Global Media - Switzerland & Austria 2026",
        source_name="UF CJC Switzerland/Austria program page"
    ),
]

cjc_switzerland_austria_vienna_tips = [
    CityTipCreate(
        city_slug="vienna",
        category="overview",
        title="CJC: Global Media in Switzerland & Austria (Vienna)",
        content=(
            "The Vienna portion of the CJC program focuses on Austrian media, the role of Vienna "
            "as a UN/international organization hub, and comparative European press systems. "
            "Students visit the United Nations Vienna office, Austrian Broadcasting Corporation (ORF), "
            "and explore how Austria's media landscape differs from the US and Switzerland."
        ),
        short_description="Vienna segment: UN office, ORF broadcasting, Austrian media analysis.",
        tags=["overview", "Vienna", "CJC", "UN", "ORF", "Austrian media"],
        priority=1,
        program="CJC: Global Media - Switzerland & Austria 2026",
        source_name="UF CJC Switzerland/Austria program page"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="Media & Communications Activities in Vienna (CJC)",
        content=(
            "In Vienna, students attend presentations at the United Nations Information Service, "
            "visit ORF (Austrian Broadcasting), tour the Ringstraße and Habsburg cultural institutions, "
            "and compare Austrian and Swiss media regulation. "
            "The program includes cultural excursions to Schönbrunn Palace, the Belvedere, and Vienna's café culture."
        ),
        short_description="UN Information Service, ORF, Habsburg sites; compare Austrian vs Swiss media.",
        tags=["academics", "UN", "ORF", "Habsburg", "Schönbrunn", "media regulation"],
        priority=2,
        program="CJC: Global Media - Switzerland & Austria 2026",
        source_name="UF CJC Switzerland/Austria program page"
    ),
]

# ============================================================================
# Cities in Civilization (ALS 4404 / ALS 5405) — Multi-city faculty-led program
# Berlin & Vienna portions
# ============================================================================

cities_in_civilization_berlin_tips = [
    CityTipCreate(
        city_slug="berlin",
        category="overview",
        title="Cities in Civilization (ALS 4404) – Program Overview",
        content=(
            "Cities in Civilization is a UF faculty-led summer program taught by Dr. James Jawitz (jawitz@ufl.edu). "
            "The course (ALS 4404 for undergrads, ALS 5405 for grads) covers 6 major European cities in 6 weeks: "
            "London → Paris → Berlin → Vienna → Florence → Rome. Students earn 6 UF credits while studying "
            "the evolution of civilization through architecture, art, government, religion, and urban design. "
            "Estimated cost: $9,754 (includes lodging, some meals, rail pass, museum entries)."
        ),
        short_description="6-week, 6-city European tour — 6 credits — taught by Dr. James Jawitz.",
        tags=["overview", "faculty-led", "multi-city", "summer", "credits", "ALS 4404"],
        priority=1,
        program="Cities in Civilization",
        source_name="UF Cities in Civilization program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="academics",
        title="Berlin Segment – Cities in Civilization",
        content=(
            "In Berlin, students explore Germany's complex 20th-century history through "
            "the Brandenburg Gate, Reichstag, Berlin Wall memorial, Checkpoint Charlie, "
            "Museum Island, and the Jewish Museum. The program examines how Berlin rebuilt "
            "itself after WWII and reunification, making it a living case study in urban resilience. "
            "Students also visit Potsdam's Sanssouci Palace (Prussian royal history)."
        ),
        short_description="Brandenburg Gate, Berlin Wall, Museum Island, Reichstag, Potsdam excursion.",
        tags=["academics", "Berlin", "history", "WWII", "reunification", "Museum Island"],
        priority=2,
        program="Cities in Civilization",
        source_name="UF Cities in Civilization program page"
    ),
    CityTipCreate(
        city_slug="berlin",
        category="eligibility",
        title="Eligibility & Cost – Cities in Civilization",
        content=(
            "Open to all UF students in good standing with a minimum 2.0 GPA. "
            "No foreign language prerequisite. Estimated cost: $9,754 includes housing, "
            "Eurail pass, museum admissions, some group meals, and in-country travel. "
            "UF tuition and airfare are additional. Bright Futures and financial aid can apply."
        ),
        short_description="Open to all majors, 2.0+ GPA, ~$9,754 program fee + UF tuition + airfare.",
        tags=["eligibility", "cost", "GPA", "financial aid", "Bright Futures"],
        priority=3,
        program="Cities in Civilization",
        source_name="UF Cities in Civilization program page"
    ),
]

cities_in_civilization_vienna_tips = [
    CityTipCreate(
        city_slug="vienna",
        category="overview",
        title="Cities in Civilization (ALS 4404) – Vienna Segment",
        content=(
            "The Vienna segment of Cities in Civilization examines the Habsburg Empire's influence on European culture. "
            "Students visit Schönbrunn Palace, the Hofburg, St. Stephen's Cathedral, the Vienna State Opera, "
            "and Belvedere Museum (home to Klimt's 'The Kiss'). The curriculum covers Vienna's role as a center "
            "of music (Mozart, Beethoven, Strauss), psychoanalysis (Freud), and the Austro-Hungarian Empire's legacy."
        ),
        short_description="Habsburg palaces, Vienna Opera, Klimt, Mozart — cultural capital of Central Europe.",
        tags=["overview", "Vienna", "Habsburg", "culture", "music", "Klimt", "Mozart"],
        priority=1,
        program="Cities in Civilization",
        source_name="UF Cities in Civilization program page"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="Academic Focus in Vienna – Cities in Civilization",
        content=(
            "In Vienna, students analyze the city as a crossroads of Eastern and Western European civilization. "
            "Topics include the Ottoman sieges, the Congress of Vienna (1815), fin-de-siècle art (Secession movement), "
            "and Austria's transition from empire to republic. Students keep reflective journals and participate "
            "in group discussions comparing Vienna with London, Paris, and Berlin."
        ),
        short_description="Ottoman history, Congress of Vienna, Secession art, empire-to-republic transition.",
        tags=["academics", "history", "Secession", "Congress of Vienna", "Ottoman", "comparative"],
        priority=2,
        program="Cities in Civilization",
        source_name="UF Cities in Civilization program page"
    ),
]

# ============================================================================
# OWL Construction Management (Detmold/Lemgo) – expanded details
# ============================================================================

owl_construction_expanded_tips = [
    CityTipCreate(
        city_slug="detmold",
        category="costs",
        title="OWL Construction Program Costs & Financial Details",
        content=(
            "The UF in Detmold - International Construction program costs approximately €2,280 program fee "
            "plus UF tuition. The program fee covers housing with breakfast, excursions, course materials, "
            "and some group activities. Students are responsible for airfare, personal meals (except breakfast), "
            "and spending money. The 4-week duration keeps overall costs lower than semester-long programs."
        ),
        short_description="~€2,280 program fee + UF tuition; includes housing with breakfast and excursions.",
        tags=["costs", "program fee", "housing", "breakfast", "excursions", "budget"],
        priority=3,
        program="UF in Detmold - International Construction",
        source_name="UF Detmold program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="academics",
        title="TH OWL Lemgo Campus – Partner Institution",
        content=(
            "Technische Hochschule Ostwestfalen-Lippe (TH OWL) has campuses in both Detmold and Lemgo. "
            "The Lemgo campus specializes in engineering and technology. UF construction students may visit "
            "Lemgo's facilities for specialized labs in digital construction, Building Information Modeling (BIM), "
            "and sustainable building technology. TH OWL is known for its hands-on, applied research approach."
        ),
        short_description="TH OWL Lemgo campus: engineering labs, BIM, sustainable construction tech.",
        tags=["academics", "TH OWL", "Lemgo", "BIM", "engineering", "sustainability"],
        priority=2,
        program="UF in Detmold - International Construction",
        source_name="TH OWL information"
    ),
]


# ============================================================================
# OWL INTERIOR DESIGN PROGRAM (Lemgo) - New detailed tips
# ============================================================================

owl_interior_design_tips = [
    CityTipCreate(
        city_slug="lemgo",
        category="overview",
        title="OWL Interior Design Program Overview",
        content=(
            "The UF in Lemgo - OWL Interior Design program is a summer program run through Technische "
            "Hochschule Ostwestfalen-Lippe (TH OWL). Students explore European interior design philosophy, "
            "sustainability in design, and cultural influences on spatial design. The program runs approximately "
            "4 weeks during the summer and includes studio work, site visits, and excursions to design studios "
            "and museums across the region."
        ),
        short_description="4-week summer interior design program at TH OWL in Lemgo.",
        tags=["overview", "interior design", "TH OWL", "summer"],
        priority=5,
        program="UF in Lemgo - OWL Interior Design",
        source_name="UF Lemgo program page"
    ),
    CityTipCreate(
        city_slug="lemgo",
        category="academics",
        title="Interior Design Studio & Coursework",
        content=(
            "Students take a design studio course focused on a real-world project, often redesigning or "
            "reimagining a space in the Lemgo or Detmold area. Coursework includes lectures on European design "
            "trends, sustainability (Nachhaltigkeit), and Bauhaus influence. Students earn UF credits, typically "
            "3-6 credits depending on the specific offering. The program integrates German design philosophy "
            "with hands-on practice."
        ),
        short_description="Design studio with real-world projects, 3-6 UF credits, Bauhaus-influenced.",
        tags=["academics", "studio", "Bauhaus", "credits", "sustainability"],
        priority=4,
        program="UF in Lemgo - OWL Interior Design",
        source_name="UF Lemgo program page"
    ),
    CityTipCreate(
        city_slug="lemgo",
        category="costs",
        title="OWL Interior Design Costs",
        content=(
            "Program costs typically include a program fee (approximately €2,000-€2,500) plus UF tuition. "
            "The program fee usually covers housing, some meals, course materials, and excursion transport. "
            "Students pay separately for flights, personal meals, and spending money. Lemgo's cost of living "
            "is considerably lower than larger German cities."
        ),
        short_description="~€2,000-€2,500 program fee + UF tuition. Low cost of living in Lemgo.",
        tags=["costs", "budget", "program fee", "affordable"],
        priority=3,
        program="UF in Lemgo - OWL Interior Design",
        source_name="UF Lemgo program page"
    ),
]


# ============================================================================
# HOCHSCHULE OSNABRÜCK BUSINESS INTERNSHIP PROGRAM
# ============================================================================

osnabruck_business_internship_tips = [
    CityTipCreate(
        city_slug="osnabruck",
        category="overview",
        title="Hochschule Osnabrück Business Internship Overview",
        content=(
            "The UF in Osnabrück - Business Internship program at Hochschule Osnabrück "
            "(Osnabrück University of Applied Sciences) combines academic coursework with a professional "
            "internship placement in a German company. Students gain practical work experience in an "
            "international business environment. The program typically runs for one semester and offers "
            "both classroom learning and real-world professional development."
        ),
        short_description="Semester-long business internship + coursework at Hochschule Osnabrück.",
        tags=["overview", "internship", "business", "applied sciences"],
        priority=5,
        program="UF in Osnabrück - Business Internship",
        source_name="UF Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="academics",
        title="Business Internship Academic Requirements",
        content=(
            "Students take business courses at Hochschule Osnabrück alongside their internship placement. "
            "Courses are typically taught in English and cover international business, management, and "
            "European market dynamics. The internship component provides 3-6 credits depending on hours. "
            "Some German language preparation may be required or recommended before departure."
        ),
        short_description="English-taught business courses + internship credits.",
        tags=["academics", "courses", "english", "internship", "credits"],
        priority=4,
        program="UF in Osnabrück - Business Internship",
        source_name="UF Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="housing",
        title="Housing in Osnabrück",
        content=(
            "Students typically live in student housing (Studentenwohnheim) arranged through Hochschule "
            "Osnabrück or the local Studentenwerk. Rooms are usually single or shared in furnished "
            "apartments. The campus area is well-connected by bus, and Osnabrück is a very bikeable city. "
            "Monthly rent is typically €250-€400, making it quite affordable compared to larger cities."
        ),
        short_description="Student housing €250-€400/month, bikeable city, good bus connections.",
        tags=["housing", "studentenwohnheim", "affordable", "bike"],
        priority=3,
        program="UF in Osnabrück - Business Internship",
        source_name="UF Osnabrück program page"
    ),
]


# ============================================================================
# SALZBURG EUROPEAN STUDIES PROGRAM
# ============================================================================

salzburg_european_studies_tips = [
    CityTipCreate(
        city_slug="salzburg",
        category="overview",
        title="Salzburg European Studies Program Overview",
        content=(
            "The UF in Salzburg - European Studies program is a semester or summer program focusing on "
            "European politics, history, culture, and society. Based in Mozart's birthplace, students study "
            "at a local partner institution while immersing themselves in Austrian culture. Salzburg's compact "
            "size, stunning Alpine setting, and proximity to Munich (1.5 hours by train) make it an ideal "
            "base for exploring Central Europe."
        ),
        short_description="European Studies in Mozart's birthplace, Alpine setting, near Munich.",
        tags=["overview", "european studies", "culture", "Alps"],
        priority=5,
        program="UF in Salzburg - European Studies",
        source_name="UF Salzburg program page"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="academics",
        title="European Studies Coursework",
        content=(
            "Courses cover European Union politics, Austrian history, comparative government, and cultural "
            "studies. Many courses incorporate field trips to significant historical sites, including visits "
            "to nearby concentration camp memorials, EU institutions, and cultural landmarks. Students earn "
            "12-15 UF credits per semester. Some courses may be taught by local faculty with expertise in "
            "European affairs."
        ),
        short_description="12-15 credits: EU politics, Austrian history, cultural studies with field trips.",
        tags=["academics", "credits", "EU", "politics", "history", "field trips"],
        priority=4,
        program="UF in Salzburg - European Studies",
        source_name="UF Salzburg program page"
    ),
    CityTipCreate(
        city_slug="salzburg",
        category="costs",
        title="Salzburg Program Costs & Living Expenses",
        content=(
            "Salzburg uses the Euro (EUR). As a major tourist city, some areas are pricey, but student "
            "discounts are widely available. A meal at a local Gasthaus costs €8-€15. The Salzburg Card "
            "provides free public transport and museum entry. Student housing is typically included in the "
            "program fee. The city's compact size means most students walk or bike everywhere."
        ),
        short_description="Euro currency, student discounts available, walkable city, Salzburg Card recommended.",
        tags=["costs", "Euro", "student discounts", "walkable", "Salzburg Card"],
        priority=3,
        program="UF in Salzburg - European Studies",
        source_name="UF Salzburg program page"
    ),
]


# ============================================================================
# BONN EXCHANGE PROGRAM
# ============================================================================

bonn_exchange_tips = [
    CityTipCreate(
        city_slug="bonn",
        category="overview",
        title="University of Bonn Exchange Program Overview",
        content=(
            "The UF Exchange at the University of Bonn (Rheinische Friedrich-Wilhelms-Universität Bonn) "
            "is a semester-long exchange program at one of Germany's most prestigious universities. "
            "Bonn is the former capital of West Germany and home to major international organizations "
            "including the United Nations. The university was founded in 1818 and has produced multiple "
            "Nobel laureates."
        ),
        short_description="Semester exchange at prestigious University of Bonn, former German capital.",
        tags=["overview", "exchange", "Bonn", "prestigious", "UN"],
        priority=5,
        program="UF Exchange - Rheinische Friedrich-Wilhelms Universität Bonn",
        source_name="UF Bonn program page"
    ),
    CityTipCreate(
        city_slug="bonn",
        category="academics",
        title="Bonn Exchange Academics & Course Selection",
        content=(
            "Exchange students can choose from the university's wide course catalog. Many graduate-level "
            "courses are offered in English, while undergraduate courses are primarily in German (B2 level "
            "recommended). Popular departments include economics, political science, and natural sciences. "
            "Students typically earn 15-18 ECTS credits (European Credit Transfer System), which convert "
            "to approximately 8-10 UF credits."
        ),
        short_description="Wide course catalog, English graduate courses, 15-18 ECTS credits typical.",
        tags=["academics", "exchange", "ECTS", "European Credit Transfer System", "German language"],
        priority=4,
        program="UF Exchange - Rheinische Friedrich-Wilhelms Universität Bonn",
        source_name="UF Bonn program page"
    ),
]


# ============================================================================
# BOKU VIENNA (University of Natural Resources and Life Sciences)
# ============================================================================

boku_vienna_tips = [
    CityTipCreate(
        city_slug="vienna",
        category="overview",
        title="BOKU Vienna Program Overview",
        content=(
            "BOKU (Universität für Bodenkultur Wien / University of Natural Resources and Life Sciences, "
            "Vienna) offers exchange opportunities for students interested in environmental sciences, "
            "agriculture, biotechnology, forestry, and sustainable development. Founded in 1872, BOKU is "
            "Austria's premier life sciences university. The campus combines historic buildings with modern "
            "research facilities across several locations in Vienna."
        ),
        short_description="Austria's top life sciences university: environment, agriculture, biotech.",
        tags=["overview", "BOKU", "life sciences", "environment", "agriculture"],
        priority=5,
        program="UF Exchange - BOKU Vienna",
        source_name="BOKU Vienna information"
    ),
    CityTipCreate(
        city_slug="vienna",
        category="academics",
        title="BOKU Academic Programs & Courses",
        content=(
            "BOKU offers courses in English at the master's level, covering topics like environmental "
            "management, food science, biotechnology, and landscape architecture. Undergraduate courses "
            "are primarily in German. Students earn ECTS credits (European Credit Transfer System). "
            "BOKU is particularly strong in sustainability research, making it ideal for students in "
            "environmental engineering, natural resource management, or agricultural sciences."
        ),
        short_description="English master's courses, ECTS credits, strong sustainability focus.",
        tags=["academics", "ECTS", "European Credit Transfer System", "sustainability", "environmental"],
        priority=4,
        program="UF Exchange - BOKU Vienna",
        source_name="BOKU Vienna information"
    ),
]


# ============================================================================
# UNIVERSITY OF GRAZ EXCHANGE
# ============================================================================

graz_tips = [
    CityTipCreate(
        city_slug="graz",
        category="overview",
        title="University of Graz Exchange Program",
        content=(
            "The Karl-Franzens-Universität Graz (University of Graz) is Austria's second-largest university, "
            "located in the country's second city. Graz is a UNESCO World Heritage city known for its "
            "Renaissance architecture, vibrant student culture, and affordable living. The University "
            "of Graz is strong in humanities, social sciences, and natural sciences. "
            "With over 30,000 students, Graz has a lively student scene with great nightlife, cafés, "
            "and cultural events. The city is also a gateway to the Alps and only 2.5 hours from Vienna by train."
        ),
        short_description="Austria's second-largest university, UNESCO city, vibrant student culture.",
        tags=["overview", "Graz", "exchange", "UNESCO", "humanities"],
        priority=3,
        program="UF Exchange - University of Graz",
        source_name="University of Graz information"
    ),
    CityTipCreate(
        city_slug="graz",
        category="academics",
        title="Academics at University of Graz",
        content=(
            "The University of Graz offers a wide range of courses in English at the master's level. "
            "Strong departments include environmental sciences, law, linguistics, and molecular biology. "
            "Graz is also home to the Technical University of Graz (TU Graz), which partners with the university. "
            "ECTS credits transfer to UF. The semester runs from October to January (winter) and March to June (summer)."
        ),
        short_description="English master's courses, strong in environmental sciences and law, ECTS credits.",
        tags=["academics", "ECTS", "environmental sciences", "law", "molecular biology"],
        priority=2,
        program="UF Exchange - University of Graz",
        source_name="University of Graz information"
    ),
    CityTipCreate(
        city_slug="graz",
        category="city life",
        title="Living in Graz",
        content=(
            "Graz is Austria's second-largest city (~290,000 people) and a UNESCO World Heritage site. "
            "The historic old town features Renaissance and baroque architecture, the famous Schlossberg hill "
            "with its clock tower, and Kunsthaus Graz (the 'friendly alien' art museum). "
            "The Mur River runs through the center. Cost of living is lower than Vienna or Salzburg. "
            "Graz has excellent public transit and is very bike-friendly."
        ),
        short_description="UNESCO city, affordable, bike-friendly, Schlossberg landmark, vibrant arts scene.",
        tags=["city life", "UNESCO", "affordable", "Schlossberg", "arts", "bike-friendly"],
        priority=1,
        program="UF Exchange - University of Graz",
        source_name="General Graz info"
    ),
    CityTipCreate(
        city_slug="graz",
        category="housing",
        title="Housing in Graz",
        content=(
            "Student housing in Graz is affordable compared to other Austrian cities. "
            "OeAD Housing manages rooms for exchange students (€250-€400/month). "
            "Shared apartments (WGs) are very common and easy to find on platforms like WG-Gesucht. "
            "Most student neighborhoods are in Geidorf, Leonhard, and St. Leonhard, all within walking distance of the university."
        ),
        short_description="Affordable housing €250-€400/month via OeAD; popular WGs near campus.",
        tags=["housing", "OeAD", "affordable", "WG", "student neighborhoods"],
        priority=2,
        program="UF Exchange - University of Graz",
        source_name="OeAD Housing / University of Graz"
    ),
]


# ============================================================================
# UF MUNICH TECHNOLOGY & INNOVATION PROGRAM
# ============================================================================

munich_tech_innovation_tips = [
    CityTipCreate(
        city_slug="munich",
        category="overview",
        title="UF Munich Technology & Innovation Program Overview",
        content=(
            "The UF in Munich - Technology & Innovation program focuses on Germany's technology ecosystem, "
            "with visits to major companies like BMW, Siemens, and Munich's thriving startup scene. Students "
            "study at a partner institution in Munich while participating in company visits, workshops, and "
            "innovation challenges. Munich is Germany's tech capital with the highest concentration of "
            "engineering talent in Europe."
        ),
        short_description="Tech & innovation program with BMW, Siemens visits in Germany's tech capital.",
        tags=["overview", "technology", "innovation", "BMW", "Siemens", "startups"],
        priority=5,
        program="UF in Munich - Technology Innovation & Entrepreneurship",
        source_name="UF Munich program page"
    ),
    CityTipCreate(
        city_slug="munich",
        category="academics",
        title="Technology & Innovation Coursework",
        content=(
            "Courses cover topics like German engineering culture, technology management, innovation "
            "ecosystems, and European tech policy. Site visits to companies are integrated into the "
            "curriculum. Students also explore the intersection of traditional German engineering "
            "(Maschinenbau) and modern digital innovation. Credits typically range from 6-9 UF credits."
        ),
        short_description="6-9 credits: engineering culture, tech management, company site visits.",
        tags=["academics", "credits", "engineering", "tech management", "site visits"],
        priority=4,
        program="UF in Munich - Technology Innovation & Entrepreneurship",
        source_name="UF Munich program page"
    ),
]


# ============================================================================
# HOCHSCHULE OSNABRÜCK AG & LIFE SCIENCES
# ============================================================================

osnabruck_ag_life_tips = [
    CityTipCreate(
        city_slug="osnabruck",
        category="overview",
        title="Hochschule Osnabrück Agriculture & Life Sciences Overview",
        content=(
            "The UF in Osnabrück - Agriculture & Life Sciences program at Hochschule Osnabrück "
            "(Osnabrück University of Applied Sciences) offers students in agriculture, animal sciences, "
            "food science, and environmental studies the chance to study German and European approaches to "
            "these fields. Lower Saxony is Germany's top agricultural state, making Osnabrück an ideal "
            "location for this program."
        ),
        short_description="Agriculture & Life Sciences at Hochschule Osnabrück in Germany's top ag state.",
        tags=["overview", "agriculture", "life sciences", "applied sciences"],
        priority=5,
        program="UF in Osnabrück - Agriculture & Life Sciences",
        source_name="UF Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="academics",
        title="Agriculture & Life Sciences Coursework",
        content=(
            "Courses are taught in English and cover European agricultural policy (Common Agricultural "
            "Policy / CAP), sustainable farming, food production systems, and animal welfare standards. "
            "Farm visits and field trips to agricultural research facilities are integral to the program. "
            "Students typically earn 6-12 credits depending on the program length."
        ),
        short_description="English-taught: EU ag policy, sustainable farming, farm visits, 6-12 credits.",
        tags=["academics", "CAP", "sustainable farming", "field trips", "credits"],
        priority=4,
        program="UF in Osnabrück - Agriculture & Life Sciences",
        source_name="UF Osnabrück program page"
    ),
]


# ============================================================================
# WHU VALLENDAR PROGRAM (Additional details)
# ============================================================================

whu_vallendar_expanded_tips = [
    CityTipCreate(
        city_slug="vallendar",
        category="overview",
        title="WHU – Otto Beisheim School of Management Overview",
        content=(
            "WHU – Otto Beisheim School of Management in Vallendar is one of Germany's and Europe's most "
            "prestigious business schools. It is triple-accredited (AACSB, EQUIS, AMBA) and consistently "
            "ranked among Europe's top business schools. The intimate campus sits along the Rhine River near "
            "Koblenz. WHU is known for its strong entrepreneurship focus, with many graduates founding "
            "successful companies."
        ),
        short_description="Triple-accredited elite business school on the Rhine, strong entrepreneurship focus.",
        tags=["overview", "WHU", "business school", "accredited", "entrepreneurship", "Rhine"],
        priority=5,
        program="UF Exchange - WHU Vallendar",
        source_name="WHU Otto Beisheim School of Management"
    ),
    CityTipCreate(
        city_slug="vallendar",
        category="academics",
        title="WHU Academic Programs & Courses",
        content=(
            "WHU offers exchange spots primarily in its Bachelor of Science in International Business "
            "Administration and its Master in Management programs. Many courses are taught in English, "
            "covering finance, strategy, entrepreneurship, and international management. The academic "
            "calendar follows European semester dates. Students earn ECTS credits (European Credit Transfer "
            "System). Class sizes are small, fostering close interaction with faculty."
        ),
        short_description="English-taught business courses, small classes, ECTS credits.",
        tags=["academics", "ECTS", "European Credit Transfer System", "business", "finance", "small classes"],
        priority=4,
        program="UF Exchange - WHU Vallendar",
        source_name="WHU Otto Beisheim School of Management"
    ),
    CityTipCreate(
        city_slug="vallendar",
        category="housing",
        title="Living in Vallendar & the Rhine Valley",
        content=(
            "Vallendar is a small town (population ~9,000) on the Rhine River, about 7 km from Koblenz. "
            "Student housing is typically arranged by WHU in local apartments or the student residence. "
            "The Rhine Valley is a UNESCO World Heritage site with stunning scenery, castles, and wine "
            "villages. Students often take the train to Koblenz for nightlife, shopping, and dining. "
            "Rent is quite affordable at €200-€350/month."
        ),
        short_description="Small Rhine Valley town, affordable housing €200-€350, near Koblenz.",
        tags=["housing", "Rhine Valley", "affordable", "Koblenz", "UNESCO"],
        priority=3,
        program="UF Exchange - WHU Vallendar",
        source_name="WHU Otto Beisheim School of Management"
    ),
]


# ============================================================================
# EBS UNIVERSITÄT (Additional detail - Graduate focus)
# ============================================================================

ebs_graduate_tips = [
    CityTipCreate(
        city_slug="ebs",
        category="overview",
        title="EBS Universität – Graduate Programs",
        content=(
            "EBS Universität für Wirtschaft und Recht (EBS University of Business and Law) in Wiesbaden "
            "is primarily a graduate-level institution for UF exchange students. The university offers "
            "Master's programs in Management, Finance, Real Estate, and Business Law. The Wiesbaden campus "
            "is located in a historic villa, and the Oestrich-Winkel campus sits among Rhine vineyards. "
            "EBS is EQUIS-accredited and known for its strong corporate connections."
        ),
        short_description="Graduate-focused business & law, EQUIS-accredited, historic Wiesbaden campus.",
        tags=["overview", "graduate", "EBS", "business", "law", "EQUIS"],
        priority=5,
        program="UF Exchange - EBS Universität (Graduate)",
        source_name="EBS Universität information"
    ),
    CityTipCreate(
        city_slug="ebs",
        category="academics",
        title="EBS Graduate Course Offerings",
        content=(
            "Graduate exchange students at EBS can choose from courses in corporate finance, strategic "
            "management, real estate economics, and German business law. Courses are taught in English at "
            "the Master's level. The university emphasizes case-study methodology and practitioner guest "
            "lectures. ECTS credits (European Credit Transfer System) are awarded. Small cohort sizes "
            "ensure personalized attention."
        ),
        short_description="English Master's courses: finance, strategy, real estate, law. ECTS credits.",
        tags=["academics", "graduate", "ECTS", "European Credit Transfer System", "finance", "case study"],
        priority=4,
        program="UF Exchange - EBS Universität (Graduate)",
        source_name="EBS Universität information"
    ),
]

# ============================================================================
# STUTTGART HdM (Hochschule der Medien) — Expanded Program Tips
# ============================================================================
stuttgart_hdm_expanded_tips = [
    CityTipCreate(
        city_slug="stuttgart",
        category="overview",
        title="Hochschule der Medien (HdM) Stuttgart — Program Overview",
        content=(
            "HdM welcomes exchange students from around the world each semester, offering a vibrant international "
            "atmosphere and a wide range of English-taught programs. HdM is perhaps the most CJC-like institution "
            "in Germany, with a dedication to hands-on learning and a focus on media and communication. Programs "
            "typically run for one semester and offer 30 ECTS credits (usually equivalent to about 15 UF credits). "
            "Stuttgart is a modern city in southern Germany known as a manufacturing hub and headquarters to prominent "
            "companies including Mercedes-Benz and Porsche, who partner with HdM on many student projects. The city "
            "hosts festivals throughout the year including Frühlingsfest, an early spring event similar to Oktoberfest."
        ),
        short_description="CJC-like media university with English-taught programs, 30 ECTS/semester.",
        tags=["HdM", "CJC", "media", "communication", "ECTS", "exchange", "Stuttgart"],
        priority=10,
        program="CJC Exchange - Hochschule der Medien Stuttgart",
        source_name="UFIC HdM Stuttgart program page"
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="academics",
        title="HdM Minor Programs — Advertising & App Design",
        content=(
            "Advertising: Covers planning, design, and production of communications in advertising — from 'first idea' "
            "to visual design to finished product dissemination. Specializations include Analysis & Strategy, Design & "
            "Advertising, and Publishing & Production. Students learn about all phases of conception, publishing, and "
            "distribution of printed and digital media, including mobile web apps.\n\n"
            "App Design & Development: Provides an introduction and practical experience in interaction design and "
            "front-end development of mobile applications. This Minor focuses on practice-oriented HCI (Human Centred "
            "Iterative interaction design). Due to the close proximity to the automotive industry in Stuttgart, there "
            "will be at least one project working directly with an automotive partner."
        ),
        short_description="Advertising covers full campaign lifecycle; App Design focuses on HCI and mobile dev with automotive partners.",
        tags=["advertising", "app design", "HCI", "mobile", "automotive", "minor programs"],
        priority=5,
        program="CJC Exchange - Hochschule der Medien Stuttgart",
        source_name="UFIC HdM Stuttgart program page"
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="academics",
        title="HdM Minor Programs — Data, Film & Games",
        content=(
            "Data-Driven Consulting: Equips students with cutting-edge skills in consulting projects, emphasizing the "
            "role of data in deriving actionable business insights. Students learn to navigate consulting engagements, "
            "manage stakeholder relationships, and leverage advanced analytical tools.\n\n"
            "Experimental & Nonfiction Film: Explores filmic forms beyond conventional storytelling — experimental cinema, "
            "documentary film, essay video, immersive environments, and hybrid nonfictional formats.\n\n"
            "Games Development: Covers history of game development, business aspects, youth protection regulations, "
            "games design fundamentals, architecture of games systems, and in-depth insight into component functionality."
        ),
        short_description="Data consulting, experimental film, and games development minor programs.",
        tags=["data", "consulting", "film", "games", "minor programs"],
        priority=5,
        program="CJC Exchange - Hochschule der Medien Stuttgart",
        source_name="UFIC HdM Stuttgart program page"
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="academics",
        title="HdM Minor Programs — Product Design, Publishing & Journalism",
        content=(
            "Integrated Product Design: Responds to the increasingly complex context of product development in an "
            "interconnected, globalized, and digitalized world. Provides skills for developing future-proof and "
            "sustainable products and product-service systems.\n\n"
            "International Publishing: The publishing industry makes more money than TV, radio, film and music combined. "
            "This program offers an exciting mix of print and digital media, preparing students for the digital "
            "transformation in publishing.\n\n"
            "Journalism & Communication Management: For students with content-oriented backgrounds (journalism, "
            "media, PR, corporate communications). Learn to develop new concepts and strategies addressing core "
            "audience needs and improve skills in leading innovative teams."
        ),
        short_description="Product design, publishing, and journalism & communication management programs.",
        tags=["product design", "publishing", "journalism", "communication", "minor programs"],
        priority=5,
        program="CJC Exchange - Hochschule der Medien Stuttgart",
        source_name="UFIC HdM Stuttgart program page"
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="academics",
        title="HdM Minor Programs — Psychology, Social Media & More",
        content=(
            "Media & Business Psychology: Research-driven learning experience exploring how psychology shapes media, "
            "business, and technology, with real-world applications.\n\n"
            "Media Creation & Management: Gain inside knowledge in creating and capitalizing media — from having an "
            "idea, putting it into practice through production, and managing finances.\n\n"
            "Social Media & Management: Equips you with both online marketing and management skills through "
            "hands-on content production for social media sites.\n\n"
            "Storytelling: Discover the hidden secrets of storytelling in film, media, marketing, and everyday life. "
            "Stories have been shared in every culture for thousands of years — find your story.\n\n"
            "Visual Communication: Introduction to user interfaces, user-centered design and UX, basic scripting "
            "languages, and strategic design for socially relevant questions."
        ),
        short_description="Psychology, media creation, social media, storytelling, and visual communication minors.",
        tags=["psychology", "social media", "storytelling", "visual communication", "UX", "minor programs"],
        priority=5,
        program="CJC Exchange - Hochschule der Medien Stuttgart",
        source_name="UFIC HdM Stuttgart program page"
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="housing",
        title="HdM Stuttgart — Support & Orientation",
        content=(
            "HdM provides comprehensive support to help exchange students settle in smoothly:\n"
            "• Orientation Week to get familiar with campus life\n"
            "• HdM Exchange Network for social and academic support\n"
            "• Assistance with housing and local integration\n\n"
            "For more information, including program costs, housing information, application details, and other "
            "resources, visit UFIC Hochschule der Medien.\n\n"
            "Contacts: UFIC Study Abroad Advisor — Morgan Williams-Franklin; "
            "CJC Study Abroad Program Director — Dr. Roxanne Coche."
        ),
        short_description="Orientation week, exchange network, housing assistance. Contact Morgan Williams-Franklin or Dr. Roxanne Coche.",
        tags=["housing", "orientation", "support", "contacts", "HdM"],
        priority=6,
        program="CJC Exchange - Hochschule der Medien Stuttgart",
        source_name="UFIC HdM Stuttgart program page"
    ),
]

# ============================================================================
# DETMOLD — UF Interior Design Expanded Tips
# ============================================================================
detmold_interior_design_tips = [
    CityTipCreate(
        city_slug="detmold",
        category="overview",
        title="UF in Lippe — Ostwestfalen-Lippe Interior Design Program Overview",
        content=(
            "The program was developed so UF students and TH OWL Interior Architecture, Architecture, and "
            "Construction Engineering students could benefit from mutual exchange of design knowledge. German "
            "students from the Detmolder Schule für Architektur und Innenarchitektur participate by enrolling "
            "in regular UF Interior Design courses, while UF students attend this summer program in Germany.\n\n"
            "Students attend lectures and visit various locations to observe different design processes, techniques, "
            "and methods used in Germany. They also learn about German history, government, culture, social norms, "
            "preservation techniques, restoration efforts, and construction practices. The 6-week program includes "
            "completion of a design studio project utilizing cutting-edge lab facilities and additional design firm "
            "and industry tours. All instruction is in English."
        ),
        short_description="6-week summer design exchange with TH OWL — studio project, industry tours, all in English.",
        tags=["interior design", "TH OWL", "Detmold", "summer", "design exchange"],
        priority=10,
        program="UF in Lippe - OWL Interior Design",
        source_name="UFIC OWL Interior Design program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="eligibility",
        title="Interior Design Program — Eligibility & Requirements",
        content=(
            "• Students should study in the College of Design, Construction, and Planning\n"
            "• Minimum 2.5 GPA required\n"
            "• Must be in good standing at UF\n"
            "• Open to non-UF students as well\n\n"
            "Program runs Summer A 2026. Application deadline: March 2, 2026.\n"
            "Contacts: Study Abroad Advisor — Morgan Williams-Franklin; "
            "Program Director — Roberto Rengel (352-294-1397, rrengel@ufl.edu)."
        ),
        short_description="College of Design, Construction, and Planning; 2.5+ GPA; open to non-UF students.",
        tags=["eligibility", "GPA", "design", "construction", "planning"],
        priority=9,
        program="UF in Lippe - OWL Interior Design",
        source_name="UFIC OWL Interior Design program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="academics",
        title="Interior Design Program — Courses & Credits",
        content=(
            "Courses taught by UF faculty. Total: 6 UF GPA credits.\n\n"
            "Undergraduates:\n"
            "• IND 4940: Design Field Experience (3 credits)\n"
            "• IND 4930: Design in Detmold (3 credits)\n\n"
            "Graduates:\n"
            "• IND 6941: Design Field Experience (3 credits)\n"
            "• IND 5937: Design in Detmold (3 credits)\n\n"
            "The multidisciplinary summer program at TH-OWL in Detmold runs seven weeks over the summer semester. "
            "Students take an advanced lighting and color course, participate in TH-OWL's design project week, "
            "get acquainted with the German lighting industry, visit regional design offices, and experience "
            "German culture. Field trips include regional design offices and showrooms, museums, the Cologne "
            "cathedral, and a week-long stay in Berlin."
        ),
        short_description="6 UF GPA credits — studio, design field experience, lighting & color, Berlin field trip.",
        tags=["academics", "credits", "IND courses", "lighting", "Berlin trip"],
        priority=8,
        program="UF in Lippe - OWL Interior Design",
        source_name="UFIC OWL Interior Design program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="costs",
        title="Interior Design Program — Costs & Financial Aid",
        content=(
            "A $525 nonrefundable administrative charge is due at application. Remaining payments due 45 days "
            "before departure (deferrable with financial aid).\n\n"
            "Three invoices:\n"
            "1. OWL Program Fee: €1,100 — excursions, travel while in Germany\n"
            "2. OWL Accommodations with local host: approx. €2,000\n"
            "3. UF Bursar: Tuition for 6 credits based on residency\n"
            "Plus: UF International Center health insurance ~$40\n\n"
            "NOT included: round-trip airfare, some meals, additional personal travel, personal expenses.\n\n"
            "Financial aid that you would normally receive can typically be applied. Contact SFA at (352) 392-1275 "
            "or sfa-help@mail.ufl.edu. UFIC also sponsors many study abroad scholarships."
        ),
        short_description="$525 admin fee + €1,100 program + €2,000 housing + tuition. Most financial aid applies.",
        tags=["costs", "financial aid", "scholarships", "tuition", "housing costs"],
        priority=7,
        program="UF in Lippe - OWL Interior Design",
        source_name="UFIC OWL Interior Design program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="housing",
        title="Interior Design Program — Housing & Location",
        content=(
            "Students are housed in dorms at Technische Hochschule Ostwestfalen-Lippe.\n\n"
            "Lippe is a district in North Rhine-Westphalia. The most prominent cities are Detmold and Lemgo, "
            "both where TH OWL is located. The district is marked by the Teutoburg Forest, offering countless "
            "nature opportunities. Attractions include:\n"
            "• Schieder See — idyllic lake with an amusement park (Funtastico), skate course, and horse park\n"
            "• Externsteine — mysterious Stone Age rock formation\n"
            "• Bad Salzuflen — spa town with centuries-old salt water springs"
        ),
        short_description="TH OWL dorms in Detmold. Teutoburg Forest, Schieder See, Externsteine nearby.",
        tags=["housing", "dorms", "Lippe", "Teutoburg Forest", "nature"],
        priority=6,
        program="UF in Lippe - OWL Interior Design",
        source_name="UFIC OWL Interior Design program page"
    ),
    CityTipCreate(
        city_slug="detmold",
        category="excursions",
        title="Interior Design Program — Excursions & Experiences",
        content=(
            "Excursions include visits to museums, prominent architectural and modern design locations, hiking "
            "trails, and various landmarks within Detmold and surrounding towns. The field trip schedule also "
            "includes a week-long stay in Berlin.\n\n"
            "Students visit regional design offices and showrooms, museums including the Cologne cathedral, and "
            "experience German cultural sites. The program emphasizes experiential learning — much of the "
            "education comes from experiencing the places visited firsthand."
        ),
        short_description="Museums, architectural sites, Cologne cathedral, week in Berlin, design office tours.",
        tags=["excursions", "Berlin", "Cologne", "design offices", "museums"],
        priority=5,
        program="UF in Lippe - OWL Interior Design",
        source_name="UFIC OWL Interior Design program page"
    ),
]

# ============================================================================
# JENA — TASSEP Friedrich Schiller Universität Expanded Tips
# ============================================================================
jena_tassep_expanded_tips = [
    CityTipCreate(
        city_slug="jena",
        category="overview",
        title="TASSEP — Friedrich Schiller Universität Jena Program Overview",
        content=(
            "The Trans-Atlantic Science Student Exchange Program (TASSEP) is a consortium of member universities "
            "from the European Union, Canada, and the United States. Through strong academic advising by science "
            "faculty working in close cooperation with study abroad offices, TASSEP ensures students are properly "
            "advised about course selection and eases credit transfer.\n\n"
            "The goal is to permit students to take most of their normal junior-level courses abroad and still "
            "graduate on time. As an exchange program, TASSEP provides the most affordable means for students to "
            "study abroad by allowing students to pay their home university's tuition.\n\n"
            "There are 20 European member institutions. Friedrich Schiller Universität Jena is one of Germany's "
            "most traditional universities, founded in 1558."
        ),
        short_description="TASSEP science exchange — pay UF tuition, take junior-level courses, graduate on time.",
        tags=["TASSEP", "science", "exchange", "consortium", "affordable"],
        priority=10,
        program="TASSEP - Friedrich Schiller Universität Jena",
        source_name="UFIC TASSEP Jena program page"
    ),
    CityTipCreate(
        city_slug="jena",
        category="eligibility",
        title="TASSEP Jena — Eligibility & Application",
        content=(
            "• Open to all majors\n"
            "• Minimum 2.5 GPA required\n"
            "• Must be in good standing at UF\n"
            "• Language of instruction: German\n"
            "• Not open to non-UF students\n\n"
            "Available terms: Fall 2026 (deadline May 4, 2026), Spring 2027 (deadline October 9, 2026), "
            "or full Academic Year 2027 (deadline May 4, 2026).\n\n"
            "TASSEP Coordinators: Tammy Davidson (davidson@chem.ufl.edu) and Valeria Kleiman (kleiman@ufl.edu). "
            "Program Advisor: Morgan Williams-Franklin."
        ),
        short_description="All majors, 2.5+ GPA, instruction in German. UF-only. Contact Davidson or Kleiman.",
        tags=["eligibility", "GPA", "German language", "TASSEP coordinators"],
        priority=9,
        program="TASSEP - Friedrich Schiller Universität Jena",
        source_name="UFIC TASSEP Jena program page"
    ),
    CityTipCreate(
        city_slug="jena",
        category="academics",
        title="TASSEP Jena — Academics & Fields of Study",
        content=(
            "Friedrich Schiller University Jena offers courses across many science disciplines. Eligible fields "
            "of study include: Astronomy, Biochemistry, Biology, Chemistry, Geological Sciences, Mathematics, "
            "Microbiology and Cell Science, Physics, and Statistics.\n\n"
            "The program is classified as UF Exchange, providing UF GPA credit. TASSEP's unique vertical "
            "curriculum approach addresses the challenge that science students face with large numbers of "
            "required courses in a standard 4-5 year curriculum.\n\n"
            "Credit type: UF GPA. College: Liberal Arts and Sciences."
        ),
        short_description="Science fields: astronomy, bio, chem, physics, math, stats. UF GPA credit.",
        tags=["academics", "science", "STEM", "astronomy", "chemistry", "biology", "physics"],
        priority=8,
        program="TASSEP - Friedrich Schiller Universität Jena",
        source_name="UFIC TASSEP Jena program page"
    ),
    CityTipCreate(
        city_slug="jena",
        category="housing",
        title="TASSEP Jena — Housing",
        content=(
            "The Studierendenwerk Thuringia manages 29 residential buildings in Jena with around 3,000 places. "
            "Most students live in a single room within a shared apartment with 1-8 other students, sharing "
            "a kitchen and bathroom. There are a few single apartments available.\n\n"
            "Rental prices: approximately €200-350/month, fixed for 6-month periods. "
            "The Studierendenwerk requires a €300 deposit after signing the rental agreement."
        ),
        short_description="Shared apartments, €200-350/month, €300 deposit. 29 dorm buildings available.",
        tags=["housing", "dorms", "Studierendenwerk", "shared apartment", "affordable"],
        priority=7,
        program="TASSEP - Friedrich Schiller Universität Jena",
        source_name="UFIC TASSEP Jena program page"
    ),
    CityTipCreate(
        city_slug="jena",
        category="costs",
        title="TASSEP Jena — Costs & Financial Aid",
        content=(
            "As a UF Exchange student, you pay UF tuition for the semester. Housing, meals, and other expenses "
            "are paid directly to the host university or third parties. A $525 nonrefundable administrative "
            "charge is due at application.\n\n"
            "Most financial aid can be applied toward program costs. Contact the Office of Student Financial Aid "
            "and Scholarships at (352) 392-1275 or sfa-help@mail.ufl.edu.\n\n"
            "UFIC sponsors a large number of study abroad scholarships for academic year, semester, and summer "
            "programs. Students who apply for UFIC scholarships are considered for all eligible scholarships."
        ),
        short_description="Pay UF tuition + $525 admin fee + housing. Financial aid & UFIC scholarships available.",
        tags=["costs", "tuition", "financial aid", "scholarships", "UFIC"],
        priority=6,
        program="TASSEP - Friedrich Schiller Universität Jena",
        source_name="UFIC TASSEP Jena program page"
    ),
    CityTipCreate(
        city_slug="jena",
        category="city life",
        title="About Jena, Germany",
        content=(
            "Jena is a German city known for the Optical Museum displaying vintage Zeiss microscopes and a "
            "spectacles collection. Planetary projections and musical laser shows take place at the Zeiss "
            "Planetarium. The Botanical Garden features a tropical greenhouse and medicinal plants.\n\n"
            "The Karmelitenklosterruine is the remains of a 15th-century monastery. The Saaleradweg cycle path "
            "follows the Saale River through the city, perfect for weekend bike rides.\n\n"
            "Jena has a strong student culture — Friedrich Schiller University was founded in 1558 and the city "
            "revolves around its academic community. Living costs are very affordable compared to Western Germany."
        ),
        short_description="Zeiss Planetarium, Botanical Garden, Saale River cycling, affordable student city.",
        tags=["Jena", "city life", "Zeiss", "planetarium", "cycling", "affordable"],
        priority=5,
        program="TASSEP - Friedrich Schiller Universität Jena",
        source_name="UFIC TASSEP Jena program page"
    ),
]
