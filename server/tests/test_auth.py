"""
Tests for authentication and profile API endpoints
"""
import pytest
from uuid import uuid4


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
