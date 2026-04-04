"""
Pytest configuration and fixtures for API testing
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
import asyncio


@pytest.fixture
def client():
    """Create a test client for the FastAPI app"""
    # TestClient automatically handles lifespan context manager
    with TestClient(app) as test_client:
        yield test_client
