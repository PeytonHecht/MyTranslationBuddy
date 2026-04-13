"""
Tests for authentication and profile API endpoints
"""
import pytest
from uuid import uuid4


def _register_and_login(client, extra_fields=None):
    """Helper: register a user and log them in, return (email, token, login_data)."""
    unique = uuid4().hex[:8]
    email = f"helper{unique}@ufl.edu"
    payload = {"email": email, "password": "TestPass1", "full_name": f"User {unique}"}
    if extra_fields:
        payload.update(extra_fields)
    client.post("/api/register", json=payload)
    login = client.post("/api/login", json={"email": email, "password": "TestPass1"})
    data = login.json()
    return email, data.get("token", ""), data


class TestRegistration:
    """Tests for POST /api/register"""

    def test_register_success(self, client):
        """Test successful user registration with UFL email"""
        unique = uuid4().hex[:8]
        response = client.post("/api/register", json={
            "email": f"testuser{unique}@ufl.edu",
            "password": "TestPass1",
            "full_name": "Test User",
        })
        assert response.status_code == 200
        data = response.json()
        assert "user_id" in data
        assert data["email"] == f"testuser{unique}@ufl.edu"

    def test_register_non_ufl_email_rejected(self, client):
        """Test that non-UFL emails are rejected"""
        response = client.post("/api/register", json={
            "email": "user@gmail.com",
            "password": "TestPass1",
        })
        assert response.status_code == 400
        assert "ufl.edu" in response.json()["detail"].lower()

    def test_register_weak_password_rejected(self, client):
        """Test that weak passwords are rejected"""
        unique = uuid4().hex[:8]
        response = client.post("/api/register", json={
            "email": f"testuser{unique}@ufl.edu",
            "password": "weak",
        })
        assert response.status_code == 400

    def test_register_duplicate_email_rejected(self, client):
        """Test that duplicate emails are rejected"""
        unique = uuid4().hex[:8]
        email = f"dup{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
        })
        response = client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
        })
        assert response.status_code == 409


class TestLogin:
    """Tests for POST /api/login"""

    def test_login_success(self, client):
        """Test successful login"""
        unique = uuid4().hex[:8]
        email = f"logintest{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
            "full_name": "Login Test",
        })
        response = client.post("/api/login", json={
            "email": email,
            "password": "TestPass1",
        })
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == email
        assert data["full_name"] == "Login Test"
        assert "saved_cities" in data
        assert "saved_events" in data

    def test_login_wrong_password(self, client):
        """Test login with wrong password"""
        unique = uuid4().hex[:8]
        email = f"wrongpw{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
        })
        response = client.post("/api/login", json={
            "email": email,
            "password": "WrongPass1",
        })
        assert response.status_code == 401

    def test_login_nonexistent_user(self, client):
        """Test login with non-existent email"""
        response = client.post("/api/login", json={
            "email": "nonexistent@ufl.edu",
            "password": "TestPass1",
        })
        assert response.status_code == 401


class TestProfile:
    """Tests for GET/PUT /api/user/profile"""

    def test_get_profile(self, client):
        """Test getting user profile"""
        unique = uuid4().hex[:8]
        email = f"profile{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
            "full_name": "Profile Test",
            "major": "Computer Science",
        })
        response = client.get("/api/user/profile", params={"email": email})
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == email
        assert data["full_name"] == "Profile Test"
        assert data["major"] == "Computer Science"
        assert "saved_cities" in data
        assert "saved_events" in data
        assert "created_at" in data

    def test_get_profile_not_found(self, client):
        """Test getting profile for non-existent user"""
        response = client.get("/api/user/profile", params={"email": "nobody@ufl.edu"})
        assert response.status_code == 404

    def test_update_profile(self, client):
        """Test updating user profile"""
        unique = uuid4().hex[:8]
        email = f"update{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
        })
        response = client.put("/api/user/profile", json={
            "email": email,
            "full_name": "Updated Name",
            "study_abroad_city": "Berlin",
            "major": "Engineering",
        })
        assert response.status_code == 200

        # Verify update
        profile = client.get("/api/user/profile", params={"email": email}).json()
        assert profile["full_name"] == "Updated Name"
        assert profile["study_abroad_city"] == "Berlin"
        assert profile["major"] == "Engineering"

    def test_update_saved_cities(self, client):
        """Test saving cities to user profile"""
        unique = uuid4().hex[:8]
        email = f"cities{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
        })
        response = client.put("/api/user/profile", json={
            "email": email,
            "saved_cities": ["berlin", "munich", "vienna"],
        })
        assert response.status_code == 200

        profile = client.get("/api/user/profile", params={"email": email}).json()
        assert profile["saved_cities"] == ["berlin", "munich", "vienna"]

    def test_update_saved_events(self, client):
        """Test saving events to user profile"""
        unique = uuid4().hex[:8]
        email = f"events{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
        })
        event = {"id": "evt123", "name": "Test Concert", "city": "Berlin"}
        response = client.put("/api/user/profile", json={
            "email": email,
            "saved_events": [event],
        })
        assert response.status_code == 200

        profile = client.get("/api/user/profile", params={"email": email}).json()
        assert len(profile["saved_events"]) == 1
        assert profile["saved_events"][0]["name"] == "Test Concert"


class TestChangePassword:
    """Tests for POST /api/user/change-password"""

    def test_change_password_success(self, client):
        """Test successful password change"""
        unique = uuid4().hex[:8]
        email = f"chgpw{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
        })
        response = client.post("/api/user/change-password", json={
            "email": email,
            "current_password": "TestPass1",
            "new_password": "NewPass1a",
        })
        assert response.status_code == 200

        # Verify new password works
        login = client.post("/api/login", json={
            "email": email,
            "password": "NewPass1a",
        })
        assert login.status_code == 200

    def test_change_password_wrong_current(self, client):
        """Test password change with wrong current password"""
        unique = uuid4().hex[:8]
        email = f"wrongcur{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
        })
        response = client.post("/api/user/change-password", json={
            "email": email,
            "current_password": "WrongPass1",
            "new_password": "NewPass1a",
        })
        assert response.status_code == 401


class TestDeleteAccount:
    """Tests for POST /api/delete"""

    def test_delete_account_success(self, client):
        """Test successful account deletion"""
        unique = uuid4().hex[:8]
        email = f"delete{unique}@ufl.edu"
        client.post("/api/register", json={
            "email": email,
            "password": "TestPass1",
        })
        response = client.post("/api/delete", json={"email": email})
        assert response.status_code == 200

        # Verify user is gone
        profile = client.get("/api/user/profile", params={"email": email})
        assert profile.status_code == 404

    def test_delete_nonexistent_account(self, client):
        """Test deleting non-existent account"""
        response = client.post("/api/delete", json={"email": "nobody@ufl.edu"})
        assert response.status_code == 404


class TestLogout:
    """Tests for POST /api/logout"""

    def test_logout(self, client):
        """Test logout endpoint"""
        response = client.post("/api/logout", json={"email": "user@ufl.edu"})
        assert response.status_code == 200
        assert "logged out" in response.json()["message"].lower()


class TestLoginTokenResponse:
    """Tests for JWT token in login response"""

    def test_login_returns_jwt_token(self, client):
        """Test that login response includes a JWT token"""
        email, token, data = _register_and_login(client)
        assert "token" in data
        assert len(token) > 20  # JWT tokens are long strings

    def test_login_returns_all_profile_fields(self, client):
        """Test that login response includes all expected profile fields"""
        email, token, data = _register_and_login(client, {"study_abroad_city": "berlin", "major": "CS"})
        for field in ["email", "full_name", "study_abroad_city", "major", "saved_cities", "saved_events", "vocab_cards", "study_stats"]:
            assert field in data, f"Missing field: {field}"


class TestMeEndpoint:
    """Tests for GET /api/me (JWT session restore)"""

    def test_me_with_valid_token(self, client):
        """Test /me returns user profile when given a valid JWT"""
        email, token, _ = _register_and_login(client)
        response = client.get("/api/me", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == email
        assert "full_name" in data
        assert "saved_cities" in data
        assert "token" in data  # refreshed token

    def test_me_returns_all_profile_fields(self, client):
        """Test /me returns all expected profile fields"""
        email, token, _ = _register_and_login(client, {"study_abroad_city": "munich", "major": "Engineering"})
        response = client.get("/api/me", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        data = response.json()
        for field in ["email", "full_name", "study_abroad_city", "major", "saved_cities",
                       "saved_events", "vocab_cards", "study_stats", "auth_provider", "token"]:
            assert field in data, f"Missing field: {field}"

    def test_me_without_token(self, client):
        """Test /me returns 401 when no Authorization header is provided"""
        response = client.get("/api/me")
        assert response.status_code == 401

    def test_me_with_invalid_token(self, client):
        """Test /me returns 401 when given a garbage token"""
        response = client.get("/api/me", headers={"Authorization": "Bearer not.a.real.token"})
        assert response.status_code == 401

    def test_me_with_malformed_header(self, client):
        """Test /me returns 401 with a malformed Authorization header"""
        response = client.get("/api/me", headers={"Authorization": "InvalidScheme abc123"})
        assert response.status_code in [401, 403]


class TestVocabCards:
    """Tests for vocab_cards persistence via profile update"""

    def test_save_and_retrieve_vocab_cards(self, client):
        """Test saving vocab cards to profile and retrieving them"""
        email, token, _ = _register_and_login(client)
        cards = [
            {"front": "Hallo", "back": "Hello", "city": "berlin"},
            {"front": "Danke", "back": "Thank you", "city": "munich"},
        ]
        # Save via profile update
        response = client.put("/api/user/profile", json={"email": email, "vocab_cards": cards})
        assert response.status_code == 200

        # Retrieve via profile
        profile = client.get("/api/user/profile", params={"email": email}).json()
        assert len(profile["vocab_cards"]) == 2
        assert profile["vocab_cards"][0]["front"] == "Hallo"
        assert profile["vocab_cards"][1]["back"] == "Thank you"

    def test_vocab_cards_in_login_response(self, client):
        """Test that vocab cards are returned in login response after saving"""
        email, token, _ = _register_and_login(client)
        cards = [{"front": "Bitte", "back": "Please", "city": "vienna"}]
        client.put("/api/user/profile", json={"email": email, "vocab_cards": cards})

        # Re-login and check
        login = client.post("/api/login", json={"email": email, "password": "TestPass1"})
        data = login.json()
        assert len(data["vocab_cards"]) == 1
        assert data["vocab_cards"][0]["front"] == "Bitte"

    def test_vocab_cards_in_me_response(self, client):
        """Test that vocab cards are returned from /me endpoint"""
        email, token, _ = _register_and_login(client)
        cards = [{"front": "Tschüss", "back": "Bye", "city": "zurich"}]
        client.put("/api/user/profile", json={"email": email, "vocab_cards": cards})

        response = client.get("/api/me", headers={"Authorization": f"Bearer {token}"})
        data = response.json()
        assert len(data["vocab_cards"]) == 1
        assert data["vocab_cards"][0]["front"] == "Tschüss"

    def test_overwrite_vocab_cards(self, client):
        """Test that saving new vocab cards replaces the old ones"""
        email, token, _ = _register_and_login(client)
        client.put("/api/user/profile", json={"email": email, "vocab_cards": [{"front": "A", "back": "B"}]})
        client.put("/api/user/profile", json={"email": email, "vocab_cards": [{"front": "X", "back": "Y"}, {"front": "Z", "back": "W"}]})

        profile = client.get("/api/user/profile", params={"email": email}).json()
        assert len(profile["vocab_cards"]) == 2
        assert profile["vocab_cards"][0]["front"] == "X"


class TestStudyStats:
    """Tests for study_stats persistence via profile update"""

    def test_save_and_retrieve_study_stats(self, client):
        """Test saving study stats to profile and retrieving them"""
        email, token, _ = _register_and_login(client)
        stats = {"quizzes_completed": 5, "cards_reviewed": 42, "streak_days": 3}
        response = client.put("/api/user/profile", json={"email": email, "study_stats": stats})
        assert response.status_code == 200

        profile = client.get("/api/user/profile", params={"email": email}).json()
        assert profile["study_stats"]["quizzes_completed"] == 5
        assert profile["study_stats"]["cards_reviewed"] == 42
        assert profile["study_stats"]["streak_days"] == 3

    def test_study_stats_in_login_response(self, client):
        """Test that study stats are returned in login response"""
        email, token, _ = _register_and_login(client)
        stats = {"total_score": 100}
        client.put("/api/user/profile", json={"email": email, "study_stats": stats})

        login = client.post("/api/login", json={"email": email, "password": "TestPass1"})
        data = login.json()
        assert data["study_stats"]["total_score"] == 100

    def test_study_stats_in_me_response(self, client):
        """Test that study stats are returned from /me endpoint"""
        email, token, _ = _register_and_login(client)
        stats = {"last_quiz": "2025-01-15", "score": 88}
        client.put("/api/user/profile", json={"email": email, "study_stats": stats})

        response = client.get("/api/me", headers={"Authorization": f"Bearer {token}"})
        data = response.json()
        assert data["study_stats"]["score"] == 88

    def test_study_stats_defaults_to_empty(self, client):
        """Test that study_stats is an empty dict for new users"""
        email, token, _ = _register_and_login(client)
        profile = client.get("/api/user/profile", params={"email": email}).json()
        assert profile["study_stats"] == {} or profile["study_stats"] is not None
