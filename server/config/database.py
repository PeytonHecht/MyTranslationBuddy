import os
from motor.motor_asyncio import AsyncIOMotorClient

# Load MongoDB Atlas connection string from environment variable
mongo_uri = os.getenv('MONGODB_URI')

# Initialize the MongoDB client
client = AsyncIOMotorClient(mongo_uri)

db = client.get_database()  # get the default database
