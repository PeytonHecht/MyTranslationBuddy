"""
Test suite for German phrase library API endpoints.
Tests phrase retrieval, searching, and bookmark functionality.
"""

import pytest
from bson import ObjectId
from uuid import uuid4


class TestPhraseRetrieval:
    """Tests for retrieving phrases from the database"""

    def test_get_all_phrases(self, client):
        """Test retrieving all phrases with default pagination"""
        response = client.get("/api/phrases/")
        assert response.status_code == 200
        data = response.json()

        assert "phrases" in data
        assert "total" in data
        assert "skip" in data
        assert "limit" in data
        assert data["skip"] == 0
        assert data["limit"] == 20
        assert isinstance(data["phrases"], list)
        assert data["total"] > 0

    def test_get_phrases_pagination(self, client):
        """Test phrase pagination with skip and limit"""
        # Get first 5 phrases
        response1 = client.get("/api/phrases/?skip=0&limit=5")
        assert response1.status_code == 200
        data1 = response1.json()
        assert len(data1["phrases"]) <= 5

        # Get next 5 phrases
        response2 = client.get("/api/phrases/?skip=5&limit=5")
        assert response2.status_code == 200
        data2 = response2.json()

        # Verify different results
        if data1["total"] > 5:
            assert data1["phrases"][0]["_id"] != data2["phrases"][0]["_id"]

    def test_filter_phrases_by_category(self, client):
        """Test filtering phrases by category"""
        response = client.get("/api/phrases/?category=academic")
        assert response.status_code == 200
        data = response.json()

        assert data["total"] > 0
        for phrase in data["phrases"]:
            assert phrase["category"] == "academic"

    def test_filter_phrases_by_city(self, client):
        """Test filtering phrases by city slug"""
        response = client.get("/api/phrases/?city_slug=berlin")
        assert response.status_code == 200
        data = response.json()

        assert data["total"] > 0
        for phrase in data["phrases"]:
            assert "berlin" in phrase["city_slugs"]

    def test_filter_phrases_by_difficulty(self, client):
        """Test filtering phrases by difficulty level"""
        response = client.get("/api/phrases/?difficulty=2")
        assert response.status_code == 200
        data = response.json()

        for phrase in data["phrases"]:
            assert phrase["difficulty_level"] == 2

    def test_filter_phrases_by_register(self, client):
        """Test filtering phrases by register (formality level)"""
        response = client.get("/api/phrases/?register=formal")
        assert response.status_code == 200
        data = response.json()

        assert data["total"] > 0
        for phrase in data["phrases"]:
            assert phrase["register"] == "formal"

    def test_combined_filtering(self, client):
        """Test combining multiple filters"""
        response = client.get(
            "/api/phrases/?category=academic&register=formal&difficulty=2"
        )
        assert response.status_code == 200
        data = response.json()

        for phrase in data["phrases"]:
            assert phrase["category"] == "academic"
            assert phrase["register"] == "formal"
            assert phrase["difficulty_level"] == 2

    def test_get_single_phrase(self, client):
        """Test retrieving a single phrase by ID"""
        # First get a phrase ID
        response1 = client.get("/api/phrases/?limit=1")
        phrases = response1.json()["phrases"]
        assert len(phrases) > 0

        phrase_id = phrases[0]["_id"]

        # Now retrieve it directly
        response2 = client.get(f"/api/phrases/{phrase_id}")
        assert response2.status_code == 200
        data = response2.json()

        assert data["_id"] == phrase_id
        assert "german_phrase" in data
        assert "english_translation" in data

    def test_get_invalid_phrase_id(self, client):
        """Test retrieving a phrase with invalid ID format"""
        response = client.get("/api/phrases/invalid_id_format")
        assert response.status_code == 400

    def test_get_nonexistent_phrase(self, client):
        """Test retrieving a phrase that doesn't exist"""
        fake_id = str(ObjectId())
        response = client.get(f"/api/phrases/{fake_id}")
        assert response.status_code == 404


class TestPhraseCategories:
    """Tests for retrieving phrase categories"""

    def test_get_all_categories(self, client):
        """Test retrieving all available categories"""
        response = client.get("/api/phrases/categories")
        assert response.status_code == 200
        data = response.json()

        assert "categories" in data
        assert len(data["categories"]) > 0

        for category in data["categories"]:
            assert "name" in category
            assert "count" in category
            assert category["count"] > 0

    def test_categories_have_expected_names(self, client):
        """Test that expected categories are present"""
        response = client.get("/api/phrases/categories")
        data = response.json()
        category_names = [cat["name"] for cat in data["categories"]]

        expected_categories = [
            "academic",
            "housing",
            "dining",
            "transportation",
            "health",
            "greetings",
            "social",
        ]
        for expected in expected_categories:
            assert expected in category_names


class TestPhraseCities:
    """Tests for retrieving cities with phrases"""

    def test_get_all_cities_with_phrases(self, client):
        """Test retrieving all cities that have phrases"""
        response = client.get("/api/phrases/cities")
        assert response.status_code == 200
        data = response.json()

        assert "cities" in data
        assert len(data["cities"]) > 0

        for city in data["cities"]:
            assert "slug" in city
            assert "phrase_count" in city
            assert city["phrase_count"] > 0

    def test_expected_cities_present(self, client):
        """Test that expected cities are in the response"""
        response = client.get("/api/phrases/cities")
        data = response.json()
        city_slugs = [city["slug"] for city in data["cities"]]

        expected_cities = ["berlin", "munich", "vienna", "aachen"]
        for expected in expected_cities:
            assert expected in city_slugs


class TestPhraseSearch:
    """Tests for phrase search functionality"""

    def test_search_english_phrase(self, client):
        """Test searching for phrases by English translation"""
        response = client.post(
            "/api/phrases/search",
            json={
                "query": "help",
                "search_type": "english",
            },
        )
        assert response.status_code == 200
        data = response.json()

        assert "results" in data
        assert "total" in data
        assert data["query"] == "help"
        assert data["search_type"] == "english"
        assert data["total"] > 0

        for result in data["results"]:
            assert "help" in result["english_translation"].lower()

    def test_search_german_phrase(self, client):
        """Test searching for phrases by German text"""
        response = client.post(
            "/api/phrases/search",
            json={
                "query": "Wohnung",
                "search_type": "german",
            },
        )
        assert response.status_code == 200
        data = response.json()

        assert data["search_type"] == "german"
        assert data["total"] > 0

    def test_search_all_fields(self, client):
        """Test searching in both German and English"""
        response = client.post(
            "/api/phrases/search",
            json={
                "query": "apartment",
                "search_type": "all",
            },
        )
        assert response.status_code == 200
        data = response.json()

        assert data["search_type"] == "all"
        assert data["total"] > 0

    def test_search_with_category_filter(self, client):
        """Test search with category filtering"""
        response = client.post(
            "/api/phrases/search",
            json={
                "query": "help",
                "search_type": "english",
                "category": "academic",
            },
        )
        assert response.status_code == 200
        data = response.json()

        for result in data["results"]:
            assert result["category"] == "academic"

    def test_search_with_city_filter(self, client):
        """Test search with city slug filtering"""
        response = client.post(
            "/api/phrases/search",
            json={
                "query": "apartment",
                "search_type": "all",
                "city_slug": "berlin",
            },
        )
        assert response.status_code == 200
        data = response.json()

        for result in data["results"]:
            assert "berlin" in result["city_slugs"]

    def test_search_with_difficulty_range(self, client):
        """Test search with difficulty level filtering"""
        response = client.post(
            "/api/phrases/search",
            json={
                "query": "the",
                "search_type": "all",
                "difficulty_min": 1,
                "difficulty_max": 2,
            },
        )
        assert response.status_code == 200
        data = response.json()

        for result in data["results"]:
            assert 1 <= result["difficulty_level"] <= 2

    def test_search_with_register_filter(self, client):
        """Test search with register (formality) filtering"""
        response = client.post(
            "/api/phrases/search",
            json={
                "query": "the",
                "search_type": "all",
                "register": "informal",
            },
        )
        assert response.status_code == 200
        data = response.json()

        for result in data["results"]:
            assert result["register"] == "informal"

    def test_search_too_short_query(self, client):
        """Test that search fails with query less than 2 characters"""
        response = client.post(
            "/api/phrases/search",
            json={
                "query": "a",
                "search_type": "english",
            },
        )
        assert response.status_code == 400

    def test_search_pagination(self, client):
        """Test search results pagination"""
        response = client.post(
            "/api/phrases/search",
            json={
                "query": "the",
                "search_type": "all",
            },
            params={"skip": 0, "limit": 5},
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data["results"]) <= 5


class TestPhraseBookmarks:
    """Tests for phrase bookmark (favorites) functionality"""

    def test_create_bookmark(self, client):
        """Test creating a bookmark for a phrase"""
        # First get a phrase ID
        response1 = client.get("/api/phrases/?limit=1")
        phrase_id = response1.json()["phrases"][0]["_id"]

        # Create bookmark
        unique_email = f"student-{uuid4().hex[:8]}@example.com"
        response2 = client.post(
            "/api/phrases/bookmarks",
            json={
                "phrase_id": phrase_id,
                "user_email": unique_email,
                "personal_notes": "Important for exam",
            },
        )
        assert response2.status_code == 201
        data = response2.json()

        assert "bookmark_id" in data
        assert data["phrase_id"] == phrase_id
        assert data["user_email"] == unique_email

    def test_bookmark_duplicate_prevention(self, client):
        """Test that bookmarking the same phrase twice fails"""
        # Get a phrase
        response1 = client.get("/api/phrases/?limit=1")
        phrase_id = response1.json()["phrases"][0]["_id"]

        # Create first bookmark
        unique_email = f"student2-{uuid4().hex[:8]}@example.com"
        client.post(
            "/api/phrases/bookmarks",
            json={
                "phrase_id": phrase_id,
                "user_email": unique_email,
                "personal_notes": "First bookmark",
            },
        )

        # Try to create duplicate
        response2 = client.post(
            "/api/phrases/bookmarks",
            json={
                "phrase_id": phrase_id,
                "user_email": unique_email,
                "personal_notes": "Second bookmark",
            },
        )
        assert response2.status_code == 400
        assert "already bookmarked" in response2.json()["detail"].lower()

    def test_bookmark_nonexistent_phrase(self, client):
        """Test bookmarking a phrase that doesn't exist"""
        fake_id = str(ObjectId())
        response = client.post(
            "/api/phrases/bookmarks",
            json={
                "phrase_id": fake_id,
                "user_email": "student@example.com",
            },
        )
        assert response.status_code == 404

    def test_get_user_bookmarks(self, client):
        """Test retrieving a user's bookmarks"""
        # Create a bookmark first
        response1 = client.get("/api/phrases/?limit=1")
        phrase_id = response1.json()["phrases"][0]["_id"]

        unique_email = f"testuser-{uuid4().hex[:8]}@example.com"
        client.post(
            "/api/phrases/bookmarks",
            json={
                "phrase_id": phrase_id,
                "user_email": unique_email,
                "personal_notes": "Test note",
            },
        )

        # Get bookmarks
        response2 = client.get(
            "/api/phrases/bookmarks", params={"user_email": unique_email}
        )
        assert response2.status_code == 200
        data = response2.json()

        assert "bookmarks" in data
        assert "total" in data
        assert data["user_email"] == unique_email
        assert data["total"] > 0

    def test_get_bookmarks_no_email(self, client):
        """Test getting bookmarks without email parameter fails"""
        response = client.get("/api/phrases/bookmarks")
        assert response.status_code == 422

    def test_get_empty_bookmarks(self, client):
        """Test getting bookmarks for user with none"""
        response = client.get(
            "/api/phrases/bookmarks",
            params={"user_email": "nonexistent@example.com"},
        )
        assert response.status_code == 200
        data = response.json()

        assert data["total"] == 0
        assert data["bookmarks"] == []

    def test_delete_bookmark(self, client):
        """Test deleting a bookmark"""
        # Create a bookmark
        response1 = client.get("/api/phrases/?limit=1")
        phrase_id = response1.json()["phrases"][0]["_id"]

        unique_email = f"deletetest-{uuid4().hex[:8]}@example.com"
        response2 = client.post(
            "/api/phrases/bookmarks",
            json={
                "phrase_id": phrase_id,
                "user_email": unique_email,
            },
        )
        bookmark_id = response2.json()["bookmark_id"]

        # Delete it
        response3 = client.delete(
            f"/api/phrases/bookmarks/{bookmark_id}",
            params={"user_email": unique_email},
        )
        assert response3.status_code == 200

        # Verify it's gone
        response4 = client.get(
            "/api/phrases/bookmarks",
            params={"user_email": unique_email},
        )
        data = response4.json()
        assert data["total"] == 0

    def test_delete_nonexistent_bookmark(self, client):
        """Test deleting a bookmark that doesn't exist"""
        fake_id = str(ObjectId())
        response = client.delete(
            f"/api/phrases/bookmarks/{fake_id}",
            params={"user_email": "user@example.com"},
        )
        assert response.status_code == 404


class TestPhraseDataIntegrity:
    """Tests for phrase data structure and content"""

    def test_phrase_has_required_fields(self, client):
        """Test that phrases have all required fields"""
        response = client.get("/api/phrases/?limit=1")
        phrase = response.json()["phrases"][0]

        required_fields = [
            "_id",
            "german_phrase",
            "english_translation",
            "pronunciation",
            "category",
            "register",
            "city_slugs",
            "difficulty_level",
        ]

        for field in required_fields:
            assert field in phrase, f"Missing field: {field}"

    def test_phrase_values_are_valid(self, client):
        """Test that phrase fields contain valid values"""
        response = client.get("/api/phrases/?limit=5")
        phrases = response.json()["phrases"]

        for phrase in phrases:
            # Check types
            assert isinstance(phrase["german_phrase"], str)
            assert isinstance(phrase["english_translation"], str)
            assert isinstance(phrase["category"], str)
            assert isinstance(phrase["register"], str)
            assert isinstance(phrase["city_slugs"], list)
            assert isinstance(phrase["difficulty_level"], int)

            # Check difficulty level is in valid range
            assert 1 <= phrase["difficulty_level"] <= 5

            # Check that city slugs are lowercase
            for slug in phrase["city_slugs"]:
                assert slug == slug.lower()

    def test_bookmark_includes_phrase_data(self, client):
        """Test that bookmarks include full phrase information"""
        # Create a bookmark
        response1 = client.get("/api/phrases/?limit=1&category=academic")
        phrase_id = response1.json()["phrases"][0]["_id"]

        unique_email = f"bookmarktest-{uuid4().hex[:8]}@example.com"
        client.post(
            "/api/phrases/bookmarks",
            json={
                "phrase_id": phrase_id,
                "user_email": unique_email,
            },
        )

        # Get bookmarks and verify phrase data
        response2 = client.get(
            "/api/phrases/bookmarks",
            params={"user_email": unique_email},
        )
        data = response2.json()

        assert len(data["bookmarks"]) > 0
        bookmark = data["bookmarks"][0]

        assert "phrase" in bookmark
        phrase = bookmark["phrase"]

        assert "german_phrase" in phrase
        assert "english_translation" in phrase
        assert phrase["category"] == "academic"


class TestPhraseManipulation:
    """Tests for creating, updating, and deleting phrases"""

    def test_create_phrase(self, client):
        token = uuid4().hex[:8]
        payload = {
            "german_phrase": f"Testphrase {token}",
            "english_translation": f"Test translation {token}",
            "pronunciation": "test-frah-zeh",
            "category": "social",
            "register": "neutral",
            "city_slugs": ["leipzig", "berlin"],
            "usage_context": "API test phrase creation",
            "difficulty_level": 2,
            "tags": ["test", "api"],
        }

        response = client.post("/api/phrases/", json=payload)
        assert response.status_code == 201
        data = response.json()

        assert data["message"] == "Phrase created successfully"
        assert data["phrase"]["german_phrase"] == payload["german_phrase"]
        assert "leipzig" in data["phrase"]["city_slugs"]

    def test_create_phrase_duplicate_conflict(self, client):
        token = uuid4().hex[:8]
        payload = {
            "german_phrase": f"Duplikat {token}",
            "english_translation": f"Duplicate {token}",
            "pronunciation": "doo-pli-kat",
            "category": "social",
            "register": "neutral",
            "city_slugs": ["berlin"],
            "usage_context": "duplicate creation test",
            "difficulty_level": 1,
            "tags": ["test"],
        }

        first = client.post("/api/phrases/", json=payload)
        assert first.status_code == 201

        second = client.post("/api/phrases/", json=payload)
        assert second.status_code == 409

    def test_patch_phrase(self, client):
        token = uuid4().hex[:8]
        create_payload = {
            "german_phrase": f"Update mich {token}",
            "english_translation": f"Update me {token}",
            "pronunciation": "oop-dayt",
            "category": "social",
            "register": "neutral",
            "city_slugs": ["berlin"],
            "usage_context": "patch target",
            "difficulty_level": 2,
            "tags": ["test"],
        }
        created = client.post("/api/phrases/", json=create_payload).json()["phrase"]

        response = client.patch(
            f"/api/phrases/{created['_id']}",
            json={"difficulty_level": 4, "city_slugs": ["leipzig", "vienna"]},
        )
        assert response.status_code == 200
        data = response.json()

        assert data["phrase"]["difficulty_level"] == 4
        assert data["phrase"]["city_slugs"] == ["leipzig", "vienna"]

    def test_patch_phrase_no_fields_fails(self, client):
        response1 = client.get("/api/phrases/?limit=1")
        phrase_id = response1.json()["phrases"][0]["_id"]

        response2 = client.patch(f"/api/phrases/{phrase_id}", json={})
        assert response2.status_code == 400

    def test_delete_phrase(self, client):
        token = uuid4().hex[:8]
        payload = {
            "german_phrase": f"Loesch mich {token}",
            "english_translation": f"Delete me {token}",
            "pronunciation": "lush",
            "category": "social",
            "register": "neutral",
            "city_slugs": ["berlin"],
            "usage_context": "delete target",
            "difficulty_level": 1,
            "tags": ["test"],
        }
        created = client.post("/api/phrases/", json=payload).json()["phrase"]

        response = client.delete(f"/api/phrases/{created['_id']}")
        assert response.status_code == 200
        assert response.json()["message"] == "Phrase deleted successfully"

        # Verify deleted
        check = client.get(f"/api/phrases/{created['_id']}")
        assert check.status_code == 404


class TestPhraseDataPoints:
    """Tests for phrase analytics/data-point routes"""

    def test_get_random_phrase(self, client):
        response = client.get("/api/phrases/random")
        assert response.status_code == 200
        data = response.json()
        assert "phrase" in data
        assert "german_phrase" in data["phrase"]

    def test_get_random_phrase_with_filter(self, client):
        response = client.get("/api/phrases/random?city_slug=leipzig&category=academic")
        # If that exact combo has no row, API can validly return 404
        assert response.status_code in [200, 404]
        if response.status_code == 200:
            phrase = response.json()["phrase"]
            assert "leipzig" in phrase["city_slugs"]
            assert phrase["category"] == "academic"

    def test_get_phrase_stats_overview(self, client):
        response = client.get("/api/phrases/stats/overview")
        assert response.status_code == 200
        data = response.json()

        assert "totals" in data
        assert "phrases" in data["totals"]
        assert "bookmarks" in data["totals"]
        assert data["totals"]["phrases"] > 0

        assert "by_category" in data
        assert "by_city" in data
        assert isinstance(data["by_category"], list)
        assert isinstance(data["by_city"], list)
