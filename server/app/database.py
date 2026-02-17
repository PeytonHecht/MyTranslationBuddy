import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def connect_to_mongo():
    # This uses the URI from your .env and adds the SSL certificate fix
    db.client = AsyncIOMotorClient(
        settings.mongodb_uri, 
        tlsCAFile=certifi.where()
    )
    try:
        # Pings the database to verify the connection
        await db.client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(f"Connection failed: {e}")

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("Closed MongoDB connection.")

async def init_indexes():
    # Required by your main.py import, but can stay empty for now
    pass