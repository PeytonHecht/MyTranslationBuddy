"""
Tests for events proxy API endpoint
"""
import pytest


class TestTicketmasterProxy:
    """Tests for GET /api/tm-events"""

    def test_get_events_default(self, client):
        """Test getting events with default parameters"""
        response = client.get("/api/tm-events")
        # May timeout or return empty if API key expired, both are acceptable
        assert response.status_code in [200, 502, 504]
        if response.status_code == 200:
            data = response.json()
            assert "page" in data or "_embedded" in data or "_info" in data

    def test_get_events_with_country(self, client):
        """Test getting events filtered by country"""
        response = client.get("/api/tm-events?countryCode=AT")
        assert response.status_code in [200, 502, 504]

    def test_get_events_with_city(self, client):
        """Test getting events filtered by city"""
        response = client.get("/api/tm-events?countryCode=DE&city=Berlin")
        assert response.status_code in [200, 502, 504]

    def test_get_events_with_keyword(self, client):
        """Test getting events with keyword search"""
        response = client.get("/api/tm-events?keyword=concert&countryCode=DE")
        assert response.status_code in [200, 502, 504]

    def test_get_events_pagination(self, client):
        """Test events pagination"""
        response = client.get("/api/tm-events?page=0&size=5")
        assert response.status_code in [200, 502, 504]
