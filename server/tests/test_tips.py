"""
Tests for tips-related API endpoints
"""
import pytest


class TestGetAllTips:
    """Tests for GET /api/tips endpoint"""
    
    def test_get_all_tips_success(self, client):
        """Test getting all tips"""
        response = client.get("/api/tips")
        assert response.status_code == 200
        data = response.json()
        assert "data" in data
        assert "total" in data
        assert "skip" in data
        assert "limit" in data
        assert isinstance(data["data"], list)
        assert data["total"] > 0
    
    def test_get_all_tips_with_limit(self, client):
        """Test getting tips with custom limit"""
        response = client.get("/api/tips?limit=10")
        assert response.status_code == 200
        data = response.json()
        assert len(data["data"]) <= 10
        assert data["limit"] == 10
    
    def test_get_all_tips_with_skip(self, client):
        """Test tips pagination with skip"""
        response1 = client.get("/api/tips?limit=5")
        response2 = client.get("/api/tips?skip=5&limit=5")
        assert response1.status_code == 200
        assert response2.status_code == 200
        
        tips1 = response1.json()["data"]
        tips2 = response2.json()["data"]
        if tips1 and tips2:
            assert tips1[0]["_id"] != tips2[0]["_id"]
    
    def test_get_tips_by_city_slug(self, client):
        """Test filtering tips by city_slug"""
        response = client.get("/api/tips?city_slug=berlin")
        assert response.status_code == 200
        data = response.json()
        for tip in data["data"]:
            assert tip["city_slug"] == "berlin"
    
    def test_get_tips_by_category(self, client):
        """Test filtering tips by category"""
        response = client.get("/api/tips?category=housing")
        assert response.status_code == 200
        data = response.json()
        for tip in data["data"]:
            assert tip["category"] == "housing"
    
    def test_tips_response_structure(self, client):
        """Test the structure of tips response"""
        response = client.get("/api/tips?limit=1")
        assert response.status_code == 200
        data = response.json()
        
        if data["data"]:
            tip = data["data"][0]
            assert "city_slug" in tip
            assert "title" in tip
            assert "content" in tip
            assert "category" in tip
            assert "tags" in tip


class TestGetTipsByProgram:
    """Tests for GET /api/tips/by-program/{program_name} endpoint"""
    
    def test_get_tips_by_program_success(self, client):
        """Test getting tips for a specific program"""
        # First, get a program name from the database
        response = client.get("/api/tips?limit=1")
        if response.status_code == 200 and response.json()["data"]:
            program_name = response.json()["data"][0].get("program")
            if program_name:
                import urllib.parse
                encoded_program = urllib.parse.quote(program_name)
                response = client.get(f"/api/tips/by-program/{encoded_program}")
                assert response.status_code == 200
                data = response.json()
                assert "program" in data
                assert "data" in data
                for tip in data["data"]:
                    assert tip["program"] == program_name
    
    def test_get_tips_by_program_not_found(self, client):
        """Test getting tips for non-existent program"""
        response = client.get("/api/tips/by-program/NonexistentProgram")
        assert response.status_code == 404
    
    def test_tips_by_program_response_structure(self, client):
        """Test the structure of program tips response"""
        response = client.get("/api/tips?limit=1")
        if response.status_code == 200 and response.json()["data"]:
            program_name = response.json()["data"][0].get("program")
            if program_name:
                import urllib.parse
                encoded_program = urllib.parse.quote(program_name)
                response = client.get(f"/api/tips/by-program/{encoded_program}")
                assert response.status_code == 200
                data = response.json()
                assert "program" in data
                assert "total" in data
                assert "skip" in data
                assert "limit" in data


class TestGetTipsByCategory:
    """Tests for GET /api/tips/by-category/{category} endpoint"""
    
    def test_get_tips_by_category_success(self, client):
        """Test getting tips by category"""
        response = client.get("/api/tips/by-category/housing")
        assert response.status_code == 200
        data = response.json()
        assert "data" in data
        assert "total" in data
        for tip in data["data"]:
            assert tip["category"] == "housing"
    
    def test_get_tips_by_category_not_found(self, client):
        """Test getting tips for non-existent category"""
        response = client.get("/api/tips/by-category/nonexistentcategory")
        assert response.status_code == 404
    
    def test_tips_by_category_with_city_filter(self, client):
        """Test getting tips by category and city"""
        response = client.get("/api/tips/by-category/housing?city_slug=berlin")
        assert response.status_code == 200
        data = response.json()
        for tip in data["data"]:
            assert tip["category"] == "housing"
            assert tip["city_slug"] == "berlin"
    
    def test_tips_by_category_pagination(self, client):
        """Test pagination for category tips"""
        response = client.get("/api/tips/by-category/housing?limit=5")
        assert response.status_code == 200
        data = response.json()
        assert len(data["data"]) <= 5


class TestTipsPriority:
    """Tests for tips priority and sorting"""
    
    def test_tips_have_priority(self, client):
        """Test that tips have priority field"""
        response = client.get("/api/tips?limit=10")
        assert response.status_code == 200
        data = response.json()
        for tip in data["data"]:
            assert "priority" in tip
            assert isinstance(tip["priority"], int)
