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

vienna_tips = [
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
        source_name="UF HAW Hamburg program page"
    )
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
        source_name="General city info"
    ),
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
            program="UF in Berlin - MIB GIE"
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
            program="UF in Berlin - MIB GIE"
        ),
            CityTipCreate(
                city_slug="berlin",
                category="academics",
                title="UF in Berlin - Globalizing the NFL Program Overview",
                content=(
                    "CJC’s Globalizing American Sports course includes traveling to Berlin to create media content surrounding the 2025 NFL game played in Germany. "
                    "RTV4930 Globalizing American Sports teaches how American sports institutions expand internationally, with a short-term study abroad component. "
                    "While in Europe, students create media content about the event atmosphere, local fans, and American football culture in Germany. "
                    "Tickets to the game are not included or required. Pre-production and post-production are done from Gainesville throughout the semester. "
                    "Open to UF undergraduate and CJC Professional Master’s students (additional graduate work required). "
                    "Application deadline: August 13, 5 p.m. Requirements: Resume, Cover Letter/Statement of Interest, Project Pitch (2). "
                    "Contacts: Study Abroad Advisor Morgan Williams-Franklin, Program Directors Dr. Roxane Coche (rcoche@jou.ufl.edu) and Prof. Eric Esterline (eesterline@jou.ufl.ed). "
                    "Courses: RTV 4930 (1 UF GPA credit), MMC 6936 (1 UF GPA credit). Taught by UF faculty. "
                    "Program Type: UF Sponsored - Faculty Led. Not open to non-UF students. "
                    "Field of Study: Advertising, Film & Media Studies, Journalism, Marketing, Photography, Telecommunication. "
                    "Excursions: Olympia Stadium Berlin, Berlin Tennis Club, UF-organized visits to cultural sites. Housing: Hostel living near downtown Berlin. "
                    "Currently not accepting applications."
                ),
                short_description="UF-specific details for Globalizing the NFL program in Berlin.",
                tags=["UF-specific", "NFL", "media", "journalism", "faculty-led", "study tour", "CJC"],
                priority=30,
                source_name="UF Berlin Globalizing the NFL program page",
                program="UF in Berlin - Globalizing the NFL"
            ),
            CityTipCreate(
                city_slug="berlin",
                category="city life",
                title="Berlin City Overview (Globalizing the NFL)",
                content=(
                    "Berlin is a vibrant city known for its rich history, diverse culture, and dynamic arts scene. "
                    "Once divided by the Berlin Wall, Berlin is now a hub for innovation, technology, and creative industries. "
                    "Iconic landmarks include the Brandenburg Gate, Reichstag, and Museum Island. "
                    "Excursions for NFL-focused students include Olympia Stadium Berlin, Berlin Tennis Club, and UF-organized visits to cultural sites. "
                    "Hostel living near downtown Berlin offers easy access to the city's attractions."
                ),
                short_description="General city overview for NFL-focused students.",
                tags=["general", "city overview", "history", "culture", "landmarks", "NFL"],
                priority=31,
                source_name="General Berlin info",
                program="UF in Berlin - Globalizing the NFL"
            ),
]

detmold_tips = [
    CityTipCreate(
        city_slug="detmold",
        category="city life",
        title="Living in Detmold: Nature, architecture, and regional history",
        content="Detmold is a smaller German university town surrounded by nature, architecture, and regional history. It offers a friendly student community and access to the Teutoburg Forest and cultural sites.",
        short_description="Nature, architecture, regional history, student life.",
        tags=["city life", "nature", "architecture", "history", "students"],
        priority=0,
        source_name="General city info"
    ),
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

osnabruck_tips = [
    CityTipCreate(
        city_slug="osnabruck",
        category="city life",
        title="Living in Osnabrück: Historic town with international connections",
        content="Osnabrück is a historic German town with medieval architecture, cultural festivals, and a vibrant student life. It is home to many international companies and offers easy access to Hamburg and Amsterdam.",
        short_description="Historic town, festivals, international student life.",
        tags=["city life", "history", "festivals", "international", "students"],
        priority=0,
        source_name="General city info"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="academics",
        title="Internship opportunities at multinational firms",
        content="UF business students at Hochschule Osnabrück can intern at multinational firms. While German fluency is not required, enrolling in a German crash course upon arrival is encouraged for those interested in interning.",
        short_description="Internships available; German crash course recommended.",
        tags=["internship", "business", "german", "crash course"],
        priority=1,
        source_name="UF Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="eligibility",
        title="Eligibility requirements for UF students",
        content="Applicants should be in the College of Agricultural and Life Sciences, have a 2.5 GPA or higher, and be in good disciplinary standing.",
        short_description="2.5+ GPA, CALS students, good standing required.",
        tags=["eligibility", "GPA", "CALS", "requirements"],
        priority=2,
        source_name="UF Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="academics",
        title="Courses in English and German; ECTS credit system",
        content="Students with B1/B2 German can choose from a wide range of courses. Many English-taught courses and semester programs are available for those with little or no German. ECTS credits typically convert 2:1 to UF credits.",
        short_description="Wide course selection; ECTS credits convert 2:1 to UF credits.",
        tags=["academics", "ECTS", "english", "german", "courses"],
        priority=3,
        source_name="UF Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="housing",
        title="Student housing options for international students",
        content="Student Services Osnabrück maintains 20+ apartment buildings, with furnished rooms for international students. Hochschule Osnabrück also helps exchange students secure rooms via Studentenwerk Osnabrück. Rent is about $300/month plus ~$500 deposit. Shared residences include internet, satellite TV, and laundry.",
        short_description="Affordable, furnished student housing available for internationals.",
        tags=["housing", "student housing", "international", "rent"],
        priority=4,
        source_name="UF Osnabrück program page"
    ),
    CityTipCreate(
        city_slug="osnabruck",
        category="city life",
        title="Historic city with vibrant student life and events",
        content="Osnabrück is a historic German town with medieval architecture, theatres, museums, and festivals. The city is home to many international companies and offers easy access to Hamburg and Amsterdam.",
        short_description="Historic, lively city with international connections.",
        tags=["city life", "culture", "festivals", "international"],
        priority=5,
        source_name="UF Osnabrück program page"
    )
]

# Tips for UF students studying abroad in Vallendar (WHU is the school UF students attend)
vallendar_tips = [
    CityTipCreate(
        city_slug="vallendar",
        category="city life",
        title="Living in Vallendar: Picturesque town in the Central Rhine Valley",
        content="Vallendar is a small, beautiful town in the UNESCO Central Rhine Valley, surrounded by vineyards and historic monuments. Students often visit Koblenz for dining and shopping. Frankfurt and Cologne are just over an hour away.",
        short_description="Picturesque town, vineyards, historic monuments, student life.",
        tags=["city life", "valley", "vineyards", "historic", "students"],
        priority=0,
        source_name="General city info"
    ),
    CityTipCreate(
        city_slug="vallendar",
        category="academics",
        title="WHU – Otto Beisheim School of Management: Internationally accredited business school",
        content="WHU is AACSB, EQUIS, and FIBBA accredited. Courses emphasize practical orientation, internationality, personality development, and technology. Industry professionals teach many courses with a hands-on approach.",
        short_description="Accredited, practical, international business education.",
        tags=["business", "accredited", "practical", "international"],
        priority=1,
        source_name="UF WHU program page"
    ),
    CityTipCreate(
        city_slug="vallendar",
        category="eligibility",
        title="Eligibility requirements for UF students",
        content="Applicants must have completed at least 12 credit hours at UF, have a 3.0 GPA or higher, be in good disciplinary standing, and should study in the Warrington College of Business. Non-business undergraduates need WCBA advisor permission.",
        short_description="3.0+ GPA, 12+ credits, WCBA students, good standing required.",
        tags=["eligibility", "GPA", "WCBA", "requirements"],
        priority=2,
        source_name="UF WHU program page"
    ),
    CityTipCreate(
        city_slug="vallendar",
        category="academics",
        title="Wide range of business courses and equivalencies",
        content="WHU offers a variety of business courses. Use WCBA's course equivalency database to find out which courses at WHU can apply to your UF degree. Academic advisors can provide more information about equivalencies.",
        short_description="Wide business course selection; check equivalencies.",
        tags=["academics", "business", "courses", "equivalency"],
        priority=3,
        source_name="UF WHU program page"
    ),
    CityTipCreate(
        city_slug="vallendar",
        category="housing",
        title="University-arranged housing options for exchange students",
        content="WHU has a housing coordinator who arranges dorms and apartments for exchange students. Most are semi-furnished and within a 10-20 minute walk from campus. Fully furnished, private apartments are also available. Placements are secured on a first-come, first-serve basis.",
        short_description="Semi-furnished dorms and private apartments arranged by WHU.",
        tags=["housing", "dorms", "apartments", "exchange"],
        priority=4,
        source_name="UF WHU program page"
    ),
    CityTipCreate(
        city_slug="vallendar",
        category="city life",
        title="Student life in Vallendar and Koblenz",
        content="Vallendar is a small, beautiful town in the UNESCO Central Rhine Valley, surrounded by vineyards and historic monuments. Students often visit Koblenz for dining and shopping. Frankfurt and Cologne are just over an hour away.",
        short_description="Picturesque town, close to Koblenz, Frankfurt, Cologne.",
        tags=["city life", "culture", "valley", "proximity"],
        priority=5,
        source_name="UF WHU program page"
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
    ),
    CityTipCreate(
        city_slug="stuttgart",
        category="city life",
        title="Festivals, student life, and international experience in Stuttgart",
        content="Stuttgart is lively, with many festivals (Oktoberfest, wine, Christmas), vibrant student life, and proximity to Black Forest, Swabian Alb, Lake Constance, Heidelberg, Munich, France, and Switzerland. ESN Stuttgart organizes events and activities for exchange students.",
        short_description="Lively city, festivals, ESN events, international experience.",
        tags=["city life", "festivals", "ESN", "international", "student life"],
        priority=5,
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
munich_tips = [
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

# Additional non-program boosters for undercovered cities
hamburg_tips += [
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