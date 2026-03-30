"""
Tests for city-related API endpoints
"""
import pytest


class TestGetAllCities:
    """Tests for GET /api/cities endpoint"""
    
    def test_get_all_cities_success(self, client):
        """Test getting all cities"""
        response = client.get("/api/cities")
        assert response.status_code == 200
        data = response.json()
        assert "data" in data
        assert "total" in data
        assert "skip" in data
        assert "limit" in data
        assert isinstance(data["data"], list)
        assert data["total"] > 0
    
    def test_get_all_cities_with_limit(self, client):
        """Test getting all cities with custom limit"""
        response = client.get("/api/cities?limit=5")
        assert response.status_code == 200
        data = response.json()
        assert len(data["data"]) <= 5
        assert data["limit"] == 5
    
    def test_get_all_cities_with_skip(self, client):
        """Test pagination with skip parameter"""
        response1 = client.get("/api/cities?limit=5")
        response2 = client.get("/api/cities?skip=5&limit=5")
        assert response1.status_code == 200
        assert response2.status_code == 200
        # Cities should be different
        cities1 = response1.json()["data"]
        cities2 = response2.json()["data"]
        if cities1 and cities2:
            assert cities1[0]["slug"] != cities2[0]["slug"]
    
    def test_get_cities_by_country(self, client):
        """Test filtering cities by country"""
        response = client.get("/api/cities?country=Germany")
        assert response.status_code == 200
        data = response.json()
        for city in data["data"]:
            assert city["country"] == "Germany"
    
    def test_get_cities_by_tag(self, client):
        """Test filtering cities by tag"""
        response = client.get("/api/cities?tag=engineering")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data["data"], list)


class TestGetCityBySlug:
    """Tests for GET /api/cities/{city_slug} endpoint"""
    
    def test_get_city_by_slug_success(self, client):
        """Test getting a city by slug"""
        response = client.get("/api/cities/berlin")
        assert response.status_code == 200
        city = response.json()
        assert city["slug"] == "berlin"
        assert "name" in city
        assert "country" in city
        assert "coordinates" in city
    
    def test_get_city_by_slug_not_found(self, client):
        """Test getting a non-existent city"""
        response = client.get("/api/cities/nonexistentcity")
        assert response.status_code == 404
        assert "not found" in response.json()["detail"]
    
    def test_city_response_structure(self, client):
        """Test the structure of city response"""
        response = client.get("/api/cities/munich")
        assert response.status_code == 200
        city = response.json()
        
        # Check required fields
        required_fields = [
            "slug", "name", "local_name", "country", "country_code",
            "region", "coordinates", "timezone", "currency"
        ]
        for field in required_fields:
            assert field in city, f"Missing field: {field}"
        
        # Check ObjectId is converted to string
        assert isinstance(city["_id"], str)


class TestGetCityTips:
    """Tests for GET /api/cities/{city_slug}/tips endpoint"""
    
    def test_get_city_tips_success(self, client):
        """Test getting tips for a city"""
        response = client.get("/api/cities/berlin/tips")
        assert response.status_code == 200
        data = response.json()
        assert data["city_slug"] == "berlin"
        assert "city" in data
        assert "data" in data
        assert "total" in data
        assert isinstance(data["data"], list)
    
    def test_get_city_tips_nonexistent_city(self, client):
        """Test getting tips for non-existent city"""
        response = client.get("/api/cities/nonexistentcity/tips")
        assert response.status_code == 404
    
    def test_city_tips_response_structure(self, client):
        """Test the structure of tips response"""
        response = client.get("/api/cities/munich/tips")
        assert response.status_code == 200
        data = response.json()
        
        if data["data"]:
            tip = data["data"][0]
            assert "city_slug" in tip
            assert "title" in tip
            assert "content" in tip
            assert "category" in tip
    
    def test_city_tips_with_limit(self, client):
        """Test getting tips with custom limit"""
        response = client.get("/api/cities/berlin/tips?limit=3")
        assert response.status_code == 200
        data = response.json()
        assert len(data["data"]) <= 3
    
    def test_city_tips_by_category(self, client):
        """Test filtering tips by category"""
        response = client.get("/api/cities/berlin/tips?category=housing")
        assert response.status_code == 200
        data = response.json()
        for tip in data["data"]:
            assert tip["category"] == "housing"


class TestSearchCitiesByCountry:
    """Tests for GET /api/cities/search/by-country/{country} endpoint"""
    
    def test_search_cities_by_country_success(self, client):
        """Test searching cities by country"""
        response = client.get("/api/cities/search/by-country/Germany")
        assert response.status_code == 200
        data = response.json()
        assert data["country"] == "Germany"
        assert "data" in data
        for city in data["data"]:
            assert city["country"] == "Germany"
    
    def test_search_cities_by_country_not_found(self, client):
        """Test searching for cities in non-existent country"""
        response = client.get("/api/cities/search/by-country/Atlantis")
        assert response.status_code == 404
    
    def test_search_cities_by_country_pagination(self, client):
        """Test pagination for country search"""
        response = client.get("/api/cities/search/by-country/Germany?limit=5")
        assert response.status_code == 200
        data = response.json()
        assert len(data["data"]) <= 5


class TestSearchCitiesByTag:
    """Tests for GET /api/cities/search/by-tag/{tag} endpoint"""
    
    def test_search_cities_by_tag_success(self, client):
        """Test searching cities by tag"""
        response = client.get("/api/cities/search/by-tag/engineering")
        assert response.status_code == 200
        data = response.json()
        assert data["tag"] == "engineering"
        assert "data" in data
    
    def test_search_cities_by_tag_not_found(self, client):
        """Test searching for cities with non-existent tag"""
        response = client.get("/api/cities/search/by-tag/nonexistenttag")
        assert response.status_code == 404


class TestFeaturedCities:
    """Tests for GET /api/cities/search/featured endpoint"""
    
    def test_get_featured_cities_success(self, client):
        """Test getting featured cities"""
        response = client.get("/api/cities/search/featured")
        assert response.status_code == 200
        data = response.json()
        assert data["featured"] is True
        assert "data" in data
        assert "total" in data
    
    def test_featured_cities_custom_priority(self, client):
        """Test featured cities with custom priority"""
        response = client.get("/api/cities/search/featured?min_priority=9")
        assert response.status_code == 200
        data = response.json()
        assert data["min_priority"] == 9
        # All returned cities should have priority >= 9
        for city in data["data"]:
            assert city.get("priority", 0) >= 9
