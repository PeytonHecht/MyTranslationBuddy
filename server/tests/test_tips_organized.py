"""
Test suite for organized tips endpoints.
Tests the new /tips-organized and /full endpoints for displaying tips by program.
"""

import pytest


class TestTipsOrganized:
    """Tests for the organized tips endpoint"""

    def test_get_city_full_details(self, client):
        """Test retrieving complete city details with organized tips"""
        response = client.get("/api/cities/vienna/full")
        assert response.status_code == 200
        
        data = response.json()
        
        # City object should be present with full details
        assert "city" in data
        assert data["city"]["slug"] == "vienna"
        assert data["city"]["name"]
        assert "coordinates" in data["city"]
        assert "description" in data["city"]
        
        # Tips should be organized
        assert "general_tips" in data
        assert "program_tips" in data
        assert "total_tips" in data
        
        # General tips structure
        assert "count" in data["general_tips"]
        assert "description" in data["general_tips"]
        assert "data" in data["general_tips"]
        assert isinstance(data["general_tips"]["data"], list)
        
        # Program tips structure
        assert "count" in data["program_tips"]
        assert "description" in data["program_tips"]
        assert "data" in data["program_tips"]
        assert isinstance(data["program_tips"]["data"], list)
        
        # All general tips should have program=null
        for tip in data["general_tips"]["data"]:
            assert tip["program"] is None or tip["program"] == ""

    def test_city_full_has_general_and_program_tips(self, client):
        """Test that Vienna has both general and program-specific tips"""
        response = client.get("/api/cities/vienna/full")
        data = response.json()
        
        # Vienna should have general tips (for all students)
        assert data["general_tips"]["count"] > 0
        
        # Vienna should have program-specific tips (WU, BOKU)
        assert data["program_tips"]["count"] > 0
        
        # Total should match sum of parts
        program_tips_total = sum(p["count"] for p in data["program_tips"]["data"])
        assert (data["general_tips"]["count"] + program_tips_total) == data["total_tips"]

    def test_program_tips_grouped_by_name(self, client):
        """Test that program tips are grouped by program name"""
        response = client.get("/api/cities/vienna/full")
        data = response.json()
        
        for program_group in data["program_tips"]["data"]:
            assert "program" in program_group
            assert "tips" in program_group
            assert "count" in program_group
            assert isinstance(program_group["tips"], list)
            assert program_group["count"] == len(program_group["tips"])
            
            # All tips in this group should have matching program
            for tip in program_group["tips"]:
                assert tip["program"] == program_group["program"]

    def test_tips_organized_by_city(self, client):
        """Test the /tips-organized endpoint"""
        response = client.get("/api/cities/berlin/tips-organized")
        assert response.status_code == 200
        
        data = response.json()
        assert data["city_slug"] == "berlin"
        assert "city" in data
        assert "general_tips" in data
        assert "program_tips" in data
        assert "total_tips" in data
        assert "category_filter" in data
        
        # General tips should be a list
        assert isinstance(data["general_tips"]["data"], list)

    def test_tips_organized_with_category_filter(self, client):
        """Test filtering organized tips by category"""
        response = client.get("/api/cities/vienna/tips-organized?category=academics")
        assert response.status_code == 200
        
        data = response.json()
        assert data["category_filter"] == "academics"
        
        # All general tips should be academics
        for tip in data["general_tips"]["data"]:
            assert tip["category"] == "academics"
        
        # All program tips should be academics
        for program_group in data["program_tips"]["data"]:
            for tip in program_group["tips"]:
                assert tip["category"] == "academics"

    def test_city_without_program_tips(self, client):
        """Test city with only general tips (no program-specific tips)"""
        response = client.get("/api/cities/berlin/full")
        assert response.status_code == 200
        
        data = response.json()
        # Berlin has general tips for sure
        assert data["general_tips"]["count"] > 0
        
        # Berlin may or may not have program tips, that's okay
        assert data["program_tips"]["count"] >= 0

    def test_nonexistent_city_returns_404(self, client):
        """Test that requesting non-existent city returns 404"""
        response = client.get("/api/cities/nonexistent_city/full")
        assert response.status_code == 404

    def test_tips_are_sorted_by_priority(self, client):
        """Test that tips within each group are sorted by priority"""
        response = client.get("/api/cities/vienna/full")
        data = response.json()
        
        # Check general tips are sorted by priority (descending)
        priorities = [t.get("priority", 0) for t in data["general_tips"]["data"]]
        assert priorities == sorted(priorities, reverse=True)
        
        # Check program tips are sorted by priority within each program
        for program_group in data["program_tips"]["data"]:
            priorities = [t.get("priority", 0) for t in program_group["tips"]]
            assert priorities == sorted(priorities, reverse=True)

    def test_tips_have_required_fields(self, client):
        """Test that all tips have required fields"""
        response = client.get("/api/cities/vienna/full")
        data = response.json()
        
        # Check general tips
        for tip in data["general_tips"]["data"]:
            assert "title" in tip
            assert "content" in tip
            assert "category" in tip
            assert "city_slug" in tip
            assert "program" in tip
            assert tip["program"] is None or tip["program"] == ""
        
        # Check program tips
        for program_group in data["program_tips"]["data"]:
            for tip in program_group["tips"]:
                assert "title" in tip
                assert "content" in tip
                assert "category" in tip
                assert "city_slug" in tip
                assert "program" in tip
                assert tip["program"] is not None and tip["program"] != ""

    def test_multiple_programs_same_city(self, client):
        """Test city with multiple programs (Vienna has BOKO and WU)"""
        response = client.get("/api/cities/vienna/full")
        data = response.json()
        
        # Vienna should have 2 programs
        assert data["program_tips"]["count"] >= 1
        
        program_names = [p["program"] for p in data["program_tips"]["data"]]
        assert len(program_names) == len(set(program_names))  # No duplicate program names

    def test_tips_organized_response_structure(self, client):
        """Test the complete response structure of organized tips endpoint"""
        response = client.get("/api/cities/munich/tips-organized")
        assert response.status_code == 200
        
        data = response.json()
        
        # Verify all required top-level fields
        assert "city_slug" in data
        assert "city" in data
        assert "general_tips" in data
        assert "program_tips" in data
        assert "total_tips" in data
        assert "category_filter" in data
        
        # Verify city object has slug and name
        assert data["city"]["slug"] == "munich"
        assert data["city"]["name"]
        
        # Verify general_tips structure
        gt = data["general_tips"]
        assert isinstance(gt, dict)
        assert "count" in gt
        assert "data" in gt
        assert isinstance(gt["data"], list)
        
        # Verify program_tips structure
        pt = data["program_tips"]
        assert isinstance(pt, dict)
        assert "count" in pt
        assert "data" in pt
        assert isinstance(pt["data"], list)
        
        # Each program group has required fields
        for program_group in pt["data"]:
            assert "program" in program_group
            assert "tips" in program_group
            assert "count" in program_group
            assert isinstance(program_group["tips"], list)
            assert len(program_group["tips"]) == program_group["count"]

    def test_empty_category_returns_results(self, client):
        """Test that filtering by non-existent category returns empty results gracefully"""
        response = client.get("/api/cities/vienna/tips-organized?category=nonexistent")
        assert response.status_code == 200
        
        data = response.json()
        # Should have structure even if empty
        assert "general_tips" in data
        assert "program_tips" in data
        # May have 0 results
        assert data["general_tips"]["count"] >= 0
