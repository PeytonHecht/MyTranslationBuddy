import asyncio
from app.database import connect_to_mongo, close_mongo_connection, db
from app.data.cities import (
    hamburg_city, berlin_city, detmold_city, osnabruck_city, vallendar_city, stuttgart_city, aachen_city, lemgo_city, munich_city, jena_city, vienna_city,
    bonn_city, ebs_city, eltville_city, mannheim_city
)
from app.data.tips import (
    hamburg_tips, berlin_tips, detmold_tips, osnabruck_tips, vallendar_tips, stuttgart_tips, aachen_tips, lemgo_tips, munich_tips, jena_tips, vienna_tips,
    bonn_tips, wurzburg_tips, ebs_tips, eltville_tips, munich_pharmacy_tips, salzburg_tips, salzburg_music_tips
)


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
        mannheim_city.model_dump()
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
        + bonn_tips + wurzburg_tips + ebs_tips + eltville_tips + munich_pharmacy_tips + salzburg_tips + salzburg_music_tips
    )

    for tip in tips:
        tip_data = tip.model_dump()
        existing = await db.cities_info.city_tips.find_one({
            "city_slug": tip_data["city_slug"],
            "title": tip_data["title"]
        })

        if not existing:
            await db.cities_info.city_tips.insert_one(tip_data)
            print(f"✓ Inserted tip: {tip_data['title']}")
        else:
            print(f"~ Tip already exists: {tip_data['title']}")


async def seed():
    """Main seeding function"""
    await connect_to_mongo()
    print("\n📦 Seeding MyTranslationBuddy databases...\n")
    
    await seed_cities()
    print()
    await seed_tips()
    
    print("\n✓ Seeding complete!\n")
    await close_mongo_connection()


if __name__ == "__main__":
    asyncio.run(seed())