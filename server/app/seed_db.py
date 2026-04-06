import asyncio
from app.database import connect_to_mongo, close_mongo_connection, db
from app.data.cities import (
    hamburg_city, berlin_city, detmold_city, osnabruck_city, vallendar_city, stuttgart_city, aachen_city, lemgo_city, munich_city, jena_city, vienna_city,
    bonn_city, ebs_city, eltville_city, mannheim_city, zurich_city, wurzburg_city, salzburg_city, leipzig_city
)
from app.data.tips import (
    hamburg_tips, berlin_tips, detmold_tips, osnabruck_tips, vallendar_tips, stuttgart_tips, aachen_tips, lemgo_tips, munich_tips, jena_tips, vienna_tips,
    bonn_tips, wurzburg_tips, ebs_tips, eltville_tips, munich_pharmacy_tips, salzburg_tips, salzburg_music_tips, zurich_tips, leipzig_tips, mannheim_tips
)
from app.data.phrases import all_phrases


async def seed_cities():
    """Upload city data to cities_info database"""
    cities = [
        hamburg_city.model_dump(),
        berlin_city.model_dump(),
        osnabruck_city.model_dump(),
        detmold_city.model_dump(),
        vallendar_city.model_dump(),
        stuttgart_city.model_dump(),
        aachen_city.model_dump(),
        lemgo_city.model_dump(),
        munich_city.model_dump(),
        jena_city.model_dump(),
        vienna_city.model_dump(),
        bonn_city.model_dump(),
        ebs_city.model_dump(),
        eltville_city.model_dump(),
        mannheim_city.model_dump(),
        zurich_city.model_dump(),
        wurzburg_city.model_dump(),
        salzburg_city.model_dump(),
        leipzig_city.model_dump(),
    ]

    for city in cities:
        if not isinstance(city, dict):
            city = city.model_dump()
        existing = await db.cities_info.cities.find_one({"slug": city["slug"]})
        if not existing:
            await db.cities_info.cities.insert_one(city)
            print(f"✓ Inserted city: {city['slug']}")
        else:
            print(f"~ City already exists: {city['slug']}")


async def seed_tips():
    """Upload city tips to cities_info database"""
    tips = (
        hamburg_tips + berlin_tips + detmold_tips + osnabruck_tips + vallendar_tips + stuttgart_tips + aachen_tips + lemgo_tips + munich_tips + jena_tips + vienna_tips
        + bonn_tips + wurzburg_tips + ebs_tips + eltville_tips + munich_pharmacy_tips + salzburg_tips + salzburg_music_tips + zurich_tips + leipzig_tips + mannheim_tips
    )

    for tip in tips:
        tip_data = tip.model_dump()
        # Normalize program-specific pseudo city slugs to real cities
        if tip_data.get("city_slug") == "wu_vienna":
            tip_data["city_slug"] = "vienna"

        existing = await db.cities_info.city_tips.find_one({
            "city_slug": tip_data["city_slug"],
            "title": tip_data["title"]
        })

        if not existing:
            await db.cities_info.city_tips.insert_one(tip_data)
            print(f"✓ Inserted tip: {tip_data['title']}")
        else:
            print(f"~ Tip already exists: {tip_data['title']}")


async def seed_phrases():
    """Upload German phrase library to phrases_vocabulary database"""
    for phrase in all_phrases:
        phrase_data = phrase.model_dump()
        existing = await db.phrases_vocabulary.phrases.find_one({
            "german_phrase": phrase_data["german_phrase"],
            "english_translation": phrase_data["english_translation"]
        })

        if not existing:
            await db.phrases_vocabulary.phrases.insert_one(phrase_data)
            print(f"✓ Inserted phrase: {phrase_data['german_phrase']}")
        else:
            print(f"~ Phrase already exists: {phrase_data['german_phrase']}")


async def seed():
    """Main seeding function"""
    await connect_to_mongo()
    print("\n📦 Seeding MyTranslationBuddy databases...\n")
    
    await seed_cities()
    print()
    await seed_tips()
    print()
    await seed_phrases()
    
    print("\n✓ Seeding complete!\n")
    await close_mongo_connection()


if __name__ == "__main__":
    asyncio.run(seed())