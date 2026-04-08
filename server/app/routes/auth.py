"""
Authentication routes for MyTranslationBuddy
Handles user registration, login, logout, and account deletion.
Enforces UFL email requirement (@ufl.edu).
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
import bcrypt
import re
import httpx

from app.database import db

router = APIRouter(prefix="/api", tags=["auth"])


# ── Request / Response Models ──────────────────────────────────────

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = ""
    study_abroad_city: Optional[str] = ""
    major: Optional[str] = ""
    graduation_year: Optional[int] = None
    interests: Optional[List[str]] = []

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LogoutRequest(BaseModel):
    email: EmailStr

class DeleteRequest(BaseModel):
    email: EmailStr

class UpdatePreferencesRequest(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    study_abroad_city: Optional[str] = None
    major: Optional[str] = None
    graduation_year: Optional[int] = None
    interests: Optional[List[str]] = None
    saved_cities: Optional[List[str]] = None
    saved_events: Optional[List[dict]] = None

class ChangePasswordRequest(BaseModel):
    email: EmailStr
    current_password: str
    new_password: str

class GoogleAuthRequest(BaseModel):
    credential: str  # Google ID token from frontend


# ── Helpers ────────────────────────────────────────────────────────

UFL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@ufl\.edu$", re.IGNORECASE)

def _hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def _verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def _validate_password(password: str):
    errors = []
    if len(password) < 8 or len(password) > 24:
        errors.append("8-24 characters")
    if not re.search(r"[A-Z]", password):
        errors.append("one uppercase letter")
    if not re.search(r"[a-z]", password):
        errors.append("one lowercase letter")
    if not re.search(r"[0-9]", password):
        errors.append("one number")
    if errors:
        raise HTTPException(status_code=400, detail=f"Password must contain: {', '.join(errors)}")


# ── Routes ─────────────────────────────────────────────────────────

@router.post("/register")
async def register(req: RegisterRequest):
    """Register a new user. Only @ufl.edu emails are allowed."""

    # Enforce UFL email
    if not UFL_REGEX.match(req.email):
        raise HTTPException(status_code=400, detail="Only @ufl.edu email addresses are allowed.")

    _validate_password(req.password)

    # Check for existing user
    existing = await db.users_auth.users.find_one({"email": req.email})
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")

    user_doc = {
        "email": req.email,
        "hashed_password": _hash_password(req.password),
        "full_name": req.full_name or "",
        "study_abroad_city": req.study_abroad_city or "",
        "major": req.major or "",
        "graduation_year": req.graduation_year,
        "interests": req.interests or [],
        "saved_cities": [],
        "saved_events": [],
        "is_active": True,
        "role": "user",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

    result = await db.users_auth.users.insert_one(user_doc)
    return {
        "message": "Account created successfully!",
        "user_id": str(result.inserted_id),
        "email": req.email,
    }


@router.post("/login")
async def login(req: LoginRequest):
    """Authenticate a user. Only @ufl.edu emails are allowed."""

    if not UFL_REGEX.match(req.email):
        raise HTTPException(status_code=400, detail="Only @ufl.edu email addresses are allowed.")

    user = await db.users_auth.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    if not _verify_password(req.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    if not user.get("is_active", True):
        raise HTTPException(status_code=403, detail="Account is deactivated.")

    # Return user profile data
    return {
        "message": "Login successful",
        "email": user["email"],
        "full_name": user.get("full_name", ""),
        "study_abroad_city": user.get("study_abroad_city", ""),
        "major": user.get("major", ""),
        "graduation_year": user.get("graduation_year"),
        "interests": user.get("interests", []),
        "saved_cities": user.get("saved_cities", []),
        "saved_events": user.get("saved_events", []),
    }


@router.post("/logout")
async def logout(req: LogoutRequest):
    """Log out a user (clears server-side session marker if any)."""
    return {"message": "Logged out successfully"}


@router.post("/delete")
async def delete_account(req: DeleteRequest):
    """Delete a user account and all associated data."""

    user = await db.users_auth.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Delete user's bookmarks
    await db.phrases_vocabulary.db["phrase_bookmarks"].delete_many({"user_email": req.email})

    # Delete user document
    await db.users_auth.users.delete_one({"email": req.email})

    return {"message": "Account and associated data deleted successfully."}


@router.get("/user/profile")
async def get_profile(email: str):
    """Get user profile by email."""
    user = await db.users_auth.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    return {
        "email": user["email"],
        "full_name": user.get("full_name", ""),
        "study_abroad_city": user.get("study_abroad_city", ""),
        "major": user.get("major", ""),
        "graduation_year": user.get("graduation_year"),
        "interests": user.get("interests", []),
        "saved_cities": user.get("saved_cities", []),
        "saved_events": user.get("saved_events", []),
        "created_at": user.get("created_at"),
    }


@router.put("/user/profile")
async def update_profile(req: UpdatePreferencesRequest):
    """Update user preferences / profile info."""

    user = await db.users_auth.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    update_fields = {"updated_at": datetime.utcnow()}
    if req.full_name is not None:
        update_fields["full_name"] = req.full_name
    if req.study_abroad_city is not None:
        update_fields["study_abroad_city"] = req.study_abroad_city
    if req.major is not None:
        update_fields["major"] = req.major
    if req.graduation_year is not None:
        update_fields["graduation_year"] = req.graduation_year
    if req.interests is not None:
        update_fields["interests"] = req.interests
    if req.saved_cities is not None:
        update_fields["saved_cities"] = req.saved_cities
    if req.saved_events is not None:
        update_fields["saved_events"] = req.saved_events

    await db.users_auth.users.update_one(
        {"email": req.email},
        {"$set": update_fields}
    )

    return {"message": "Profile updated successfully."}


@router.post("/user/change-password")
async def change_password(req: ChangePasswordRequest):
    """Change user password."""

    user = await db.users_auth.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if not _verify_password(req.current_password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Current password is incorrect.")

    _validate_password(req.new_password)

    await db.users_auth.users.update_one(
        {"email": req.email},
        {"$set": {
            "hashed_password": _hash_password(req.new_password),
            "updated_at": datetime.utcnow(),
        }}
    )

    return {"message": "Password changed successfully."}


@router.post("/auth/google")
async def google_auth(req: GoogleAuthRequest):
    """Authenticate via Google. Only @ufl.edu Google accounts are allowed.
    Verifies the token with Google, checks the email domain,
    and creates an account if it doesn't exist yet."""

    # Verify token with Google
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={req.credential}"
        )

    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid Google credential.")

    payload = resp.json()
    email = payload.get("email", "")
    email_verified = payload.get("email_verified", "false")

    if str(email_verified).lower() != "true":
        raise HTTPException(status_code=401, detail="Google email is not verified.")

    if not UFL_REGEX.match(email):
        raise HTTPException(
            status_code=400,
            detail="Only @ufl.edu Google accounts are allowed. Please sign in with your UF email."
        )

    full_name = payload.get("name", "")

    # Find or create user
    user = await db.users_auth.users.find_one({"email": email})
    if not user:
        user_doc = {
            "email": email,
            "hashed_password": "",  # Google users don't need a password
            "full_name": full_name,
            "study_abroad_city": "",
            "major": "",
            "graduation_year": None,
            "interests": [],
            "saved_cities": [],
            "saved_events": [],
            "is_active": True,
            "role": "user",
            "auth_provider": "google",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        await db.users_auth.users.insert_one(user_doc)
        user = user_doc

    return {
        "message": "Google login successful",
        "email": user["email"],
        "full_name": user.get("full_name", full_name),
        "study_abroad_city": user.get("study_abroad_city", ""),
        "major": user.get("major", ""),
        "graduation_year": user.get("graduation_year"),
        "interests": user.get("interests", []),
        "saved_cities": user.get("saved_cities", []),
        "saved_events": user.get("saved_events", []),
    }
