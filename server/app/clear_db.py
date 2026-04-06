import asyncio
from app.database import connect_to_mongo, close_mongo_connection, db


async def clear():
    """Clear cities and city_tips collections from cities_info database"""
    await connect_to_mongo()
    print("\n🗑️  Clearing cities_info database...\n")

    result1 = await db.cities_info.cities.drop()
    print("✓ Dropped 'cities' collection")

    result2 = await db.cities_info.city_tips.drop()
    print("✓ Dropped 'city_tips' collection")

    print("\n✓ Clear complete!\n")
    await close_mongo_connection()


if __name__ == "__main__":
    asyncio.run(clear())
