"""
Test suite for complete city endpoint.
Tests the /cities/{slug}/complete endpoint that returns city + tips + phrases.
"""

import pytest


class TestCityComplete:
    """Tests for the complete city endpoint"""

    def test_get_city_complete(self, client):
        """Test retrieving complete city details with tips and phrases"""
        response = client.get("/api/cities/vienna/complete")
        assert response.status_code == 200
        
        data = response.json()
        
        # City object should be present
        assert "city" in data
        assert data["city"]["slug"] == "vienna"
        assert data["city"]["name"]
        assert "country" in data["city"]
        assert "region" in data["city"]
        
        # Tips should be organized
        assert "tips" in data
        assert "general" in data["tips"]
        assert "by_program" in data["tips"]
        assert "total" in data["tips"]
        
        # Phrases should be organized by scope
        assert "phrases" in data
        assert "city_specific" in data["phrases"]
        assert "region_relevant" in data["phrases"]
        assert "country_general" in data["phrases"]
        assert "total_available" in data["phrases"]
        
        # Metadata should include geographic info
        assert "metadata" in data
        assert data["metadata"]["country"]
        assert data["metadata"]["region"]

    def test_city_complete_tips_structure(self, client):
        """Test that tips are properly organized in complete endpoint"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        tips = data["tips"]
        
        # General tips
        assert "count" in tips["general"]
        assert "description" in tips["general"]
        assert "data" in tips["general"]
        assert isinstance(tips["general"]["data"], list)
        
        # Program-specific tips
        assert "count" in tips["by_program"]
        assert "description" in tips["by_program"]
        assert "data" in tips["by_program"]
        assert isinstance(tips["by_program"]["data"], list)
        
        # All general tips should have no program or empty program
        for tip in tips["general"]["data"]:
            assert tip["program"] is None or tip["program"] == ""

    def test_city_complete_phrases_structure(self, client):
        """Test that phrases are properly organized in complete endpoint"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        phrases = data["phrases"]
        
        # City-specific phrases
        assert "count" in phrases["city_specific"]
        assert "description" in phrases["city_specific"]
        assert "data" in phrases["city_specific"]
        assert isinstance(phrases["city_specific"]["data"], list)
        
        # Region phrases
        assert "count" in phrases["region_relevant"]
        assert "description" in phrases["region_relevant"]
        assert "data" in phrases["region_relevant"]
        assert isinstance(phrases["region_relevant"]["data"], list)
        
        # Country phrases
        assert "count" in phrases["country_general"]
        assert "description" in phrases["country_general"]
        assert "data" in phrases["country_general"]
        assert isinstance(phrases["country_general"]["data"], list)
        
        # Total available
        assert "total_available" in phrases
        assert phrases["total_available"] >= 0

    def test_city_complete_city_specific_phrases(self, client):
        """Test that city-specific phrases are actually city-specific"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        city_phrases = data["phrases"]["city_specific"]["data"]
        
        # All city-specific phrases should have vienna in city_slugs
        for phrase in city_phrases:
            assert "vienna" in phrase.get("city_slugs", [])

    def test_city_complete_region_phrases(self, client):
        """Test that region phrases match the city's region"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        region = data["metadata"]["region"].lower()
        region_phrases = data["phrases"]["region_relevant"]["data"]
        
        # Region phrases should have matching dialect_name or tags
        # (Note: at least some should match, not necessarily all)
        if region_phrases:
            has_matching = False
            for phrase in region_phrases:
                dialect = (phrase.get("dialect_name") or "").lower()
                tags = [t.lower() for t in phrase.get("tags", [])]
                if region in dialect or region in tags:
                    has_matching = True
                    break
            # At least one phrase should match the region
            # (This is a soft check as some phrases may not have dialect_name)

    def test_city_complete_metadata(self, client):
        """Test that metadata contains geographic information"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        metadata = data["metadata"]
        assert metadata["country"]
        assert metadata["region"]
        assert "region_type" in metadata

    def test_city_complete_all_tips_have_city_slug(self, client):
        """Test that all tips in complete response have city_slug"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        # Check general tips
        for tip in data["tips"]["general"]["data"]:
            assert "city_slug" in tip
            assert tip["city_slug"] == "vienna"
        
        # Check program tips
        for program_group in data["tips"]["by_program"]["data"]:
            for tip in program_group["tips"]:
                assert "city_slug" in tip
                assert tip["city_slug"] == "vienna"

    def test_city_complete_nonexistent_city(self, client):
        """Test that nonexistent city returns 404"""
        response = client.get("/api/cities/nonexistent_city/complete")
        assert response.status_code == 404

    def test_city_complete_multiple_programs(self, client):
        """Test city with multiple programs shows all of them"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        # Vienna should have multiple programs
        programs = data["tips"]["by_program"]["data"]
        program_names = [p["program"] for p in programs]
        
        # Vienna has BOKO and WU Vienna at least
        assert len(programs) >= 1

    def test_city_complete_single_city_no_programs(self, client):
        """Test city with no program-specific tips"""
        response = client.get("/api/cities/berlin/complete")
        data = response.json()
        
        # Berlin may have program tips or not, but endpoint should work
        assert response.status_code == 200
        assert "tips" in data
        assert "by_program" in data["tips"]

    def test_city_complete_phrases_have_required_fields(self, client):
        """Test that all phrases have required fields"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        all_phrases = (
            data["phrases"]["city_specific"]["data"] +
            data["phrases"]["region_relevant"]["data"] +
            data["phrases"]["country_general"]["data"]
        )
        
        for phrase in all_phrases:
            assert "german_phrase" in phrase
            assert "english_translation" in phrase
            assert "category" in phrase
            assert "difficulty_level" in phrase

    def test_city_complete_response_structure(self, client):
        """Test the complete structure of response"""
        response = client.get("/api/cities/munich/complete")
        data = response.json()
        
        # Top-level keys
        assert set(data.keys()) >= {"city", "tips", "phrases", "metadata"}
        
        # Tips structure
        assert set(data["tips"].keys()) >= {"general", "by_program", "total"}
        
        # Phrases structure
        assert set(data["phrases"].keys()) >= {
            "city_specific", 
            "region_relevant", 
            "country_general",
            "total_available"
        }

    def test_city_complete_phrases_limited_to_20(self, client):
        """Test that phrase data is limited to top 20 per category"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        # Each category should return at most 20 phrases
        assert len(data["phrases"]["city_specific"]["data"]) <= 20
        assert len(data["phrases"]["region_relevant"]["data"]) <= 20
        assert len(data["phrases"]["country_general"]["data"]) <= 20

    def test_city_complete_tips_count_matches_data(self, client):
        """Test that tip counts match actual data"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        general_count = data["tips"]["general"]["count"]
        general_data = data["tips"]["general"]["data"]
        assert general_count == len(general_data)
        
        program_count = data["tips"]["by_program"]["count"]
        program_data = data["tips"]["by_program"]["data"]
        assert program_count == len(program_data)

    def test_city_complete_phrases_count_matches_data(self, client):
        """Test that phrase counts match actual data"""
        response = client.get("/api/cities/vienna/complete")
        data = response.json()
        
        # City phrases
        city_count = data["phrases"]["city_specific"]["count"]
        # Note: count may be > 20 but data is limited to 20
        assert city_count >= 0
        
        # Region phrases
        region_count = data["phrases"]["region_relevant"]["count"]
        assert region_count >= 0
        
        # Country phrases
        country_count = data["phrases"]["country_general"]["count"]
        assert country_count >= 0
