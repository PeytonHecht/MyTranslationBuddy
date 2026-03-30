"""
Pytest configuration and fixtures for API testing
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import connect_to_mongo, close_mongo_connection
import asyncio


@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    # Don't close the loop here, let pytest handle it


@pytest.fixture(scope="session")
def setup_db():
    """Setup database connection for tests"""
    import asyncio
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(connect_to_mongo())
    yield
    # Skip closing MongoDB to avoid issues with leftover connections


@pytest.fixture
def client():
    """Create a test client for the FastAPI app"""
    with TestClient(app) as test_client:
        yield test_client
