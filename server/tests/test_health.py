"""
Tests for health check endpoints
"""
import pytest


def test_health_check(client):
    """Test the /health endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    assert "MyTranslationBuddy" in response.json()["message"]


def test_root_endpoint(client):
    """Test the root / endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Welcome to MyTranslationBuddy API"
    assert "version" in data
    assert "docs" in data


def test_api_v1_health(client):
    """Test the /api/v1/health endpoint"""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "MyTranslationBuddy"
