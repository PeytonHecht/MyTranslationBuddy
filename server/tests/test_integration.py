"""
Integration tests for the API
Tests interactions between different endpoints
"""
import pytest


class TestCityTipsIntegration:
    """Tests for city and tips endpoint interactions"""
    
    def test_get_city_and_its_tips(self, client):
        """Test getting a city and then fetching its tips"""
        # Get a city
        cities_response = client.get("/api/cities?limit=1")
        assert cities_response.status_code == 200
        
        cities_data = cities_response.json()
        if cities_data["data"]:
            city_slug = cities_data["data"][0]["slug"]
            
            # Get tips for that city
            tips_response = client.get(f"/api/cities/{city_slug}/tips")
            assert tips_response.status_code == 200
            
            tips_data = tips_response.json()
            assert tips_data["city_slug"] == city_slug
    
    def test_city_slug_consistency(self, client):
        """Test that city slugs are consistent across endpoints"""
        # Get all cities
        all_cities_response = client.get("/api/cities?limit=5")
        assert all_cities_response.status_code == 200
        
        cities = all_cities_response.json()["data"]
        for city in cities:
            slug = city["slug"]
            
            # Get individual city
            individual_response = client.get(f"/api/cities/{slug}")
            assert individual_response.status_code == 200
            assert individual_response.json()["slug"] == slug
    
    def test_city_country_consistency(self, client):
        """Test that cities returned by country filter match the country"""
        response = client.get("/api/cities?country=Germany&limit=10")
        assert response.status_code == 200
        
        cities = response.json()["data"]
        for city in cities:
            assert city["country"] == "Germany"
            
            # Verify each city individually
            city_response = client.get(f"/api/cities/{city['slug']}")
            assert city_response.status_code == 200
            assert city_response.json()["country"] == "Germany"
    
    def test_tips_consistency_across_endpoints(self, client):
        """Test that tips are consistent across different endpoints"""
        # Get tips via city endpoint
        city_tips_response = client.get("/api/cities/berlin/tips?limit=5")
        assert city_tips_response.status_code == 200
        city_tips = city_tips_response.json()["data"]
        
        if city_tips:
            # Get tips via general tips endpoint with same city filter
            general_tips_response = client.get("/api/tips?city_slug=berlin&limit=5")
            assert general_tips_response.status_code == 200
            general_tips = general_tips_response.json()["data"]
            
            # Both should have the same city_slug
            for tip in city_tips + general_tips:
                assert tip["city_slug"] == "berlin"


class TestPaginationConsistency:
    """Tests for pagination consistency"""
    
    def test_cities_pagination_consistency(self, client):
        """Test that pagination works consistently for cities"""
        # Get first page
        page1 = client.get("/api/cities?skip=0&limit=5").json()
        # Get second page
        page2 = client.get("/api/cities?skip=5&limit=5").json()
        
        if page1["data"] and page2["data"]:
            # Pages should not have duplicate cities
            page1_slugs = {city["slug"] for city in page1["data"]}
            page2_slugs = {city["slug"] for city in page2["data"]}
            assert len(page1_slugs.intersection(page2_slugs)) == 0
    
    def test_tips_pagination_consistency(self, client):
        """Test that pagination works consistently for tips"""
        # Get first page
        page1 = client.get("/api/tips?skip=0&limit=10").json()
        # Get second page
        page2 = client.get("/api/tips?skip=10&limit=10").json()
        
        if page1["data"] and page2["data"]:
            # Pages should not have duplicate tips
            page1_ids = {tip["_id"] for tip in page1["data"]}
            page2_ids = {tip["_id"] for tip in page2["data"]}
            assert len(page1_ids.intersection(page2_ids)) == 0


class TestErrorHandling:
    """Tests for error handling"""
    
    def test_invalid_limit_parameter(self, client):
        """Test that invalid limit parameter is rejected"""
        response = client.get("/api/cities?limit=1000")
        assert response.status_code == 422  # Unprocessable Entity
    
    def test_invalid_skip_parameter(self, client):
        """Test that invalid skip parameter is rejected"""
        response = client.get("/api/cities?skip=-1")
        assert response.status_code == 422  # Unprocessable Entity
    
    def test_invalid_endpoint(self, client):
        """Test 404 for invalid endpoint"""
        response = client.get("/api/nonexistent")
        assert response.status_code == 404
