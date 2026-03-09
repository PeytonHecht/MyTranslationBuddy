import asyncio
from app.database import connect_to_mongo, close_mongo_connection, db
from app.data.cities import hamburg_city, berlin_city, detmold_city
from app.data.tips import hamburg_tips, berlin_tips, detmold_tips


async def seed_cities():
    """Upload city data to cities_dialects database"""
    cities = [
        hamburg_city.model_dump(),
        berlin_city.model_dump(),
        detmold_city.model_dump()
    ]

    for city in cities:
        existing = await db.cities_dialects.cities.find_one({"slug": city["slug"]})
        if not existing:
            await db.cities_dialects.cities.insert_one(city)
            print(f"✓ Inserted city: {city['slug']}")
        else:
            print(f"~ City already exists: {city['slug']}")


async def seed_tips():
    """Upload city tips to cities_dialects database"""
    tips = hamburg_tips + berlin_tips + detmold_tips

    for tip in tips:
        tip_data = tip.model_dump()
        existing = await db.cities_dialects.city_tips.find_one({
            "city_slug": tip_data["city_slug"],
            "title": tip_data["title"]
        })

        if not existing:
            await db.cities_dialects.city_tips.insert_one(tip_data)
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