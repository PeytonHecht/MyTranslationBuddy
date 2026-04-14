"""
Authentication routes for MyTranslationBuddy
Handles user registration, login, logout, JWT tokens, and account deletion.
Enforces UFL email requirement (@ufl.edu).
"""

from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta, timezone
from typing import Optional, List
import bcrypt
import re
import jwt
import httpx
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.database import db
from app.config import settings

router = APIRouter(prefix="/api", tags=["auth"])

# Rate limiter instance (shared with main.py)
limiter = Limiter(key_func=get_remote_address)

# Optional bearer — won't 403 if missing, just returns None
_bearer = HTTPBearer(auto_error=False)


# ── JWT Helpers ────────────────────────────────────────────────────

def _create_token(email: str) -> str:
    """Create a JWT with 72-hour expiry."""
    payload = {
        "sub": email,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(hours=settings.jwt_expire_hours),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def _decode_token(token: str) -> str:
    """Decode and return the email from a JWT. Raises HTTPException on failure."""
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token.")
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired. Please sign in again.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token.")


async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(_bearer)):
    """Dependency: extract the current user email from the Authorization header.
    Falls back to X-User-Email header for backward compatibility."""
    if creds and creds.credentials:
        return _decode_token(creds.credentials)
    return None


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
    vocab_cards: Optional[List[dict]] = None
    study_stats: Optional[dict] = None
    reservations: Optional[List[dict]] = None

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
@limiter.limit("5/minute")
async def register(req: RegisterRequest, request: Request):
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
        "vocab_cards": [],
        "study_stats": {},
        "reservations": [],
        "is_active": True,
        "role": "user",
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }

    result = await db.users_auth.users.insert_one(user_doc)
    return {
        "message": "Account created successfully!",
        "user_id": str(result.inserted_id),
        "email": req.email,
    }


@router.post("/login")
@limiter.limit("10/minute")
async def login(req: LoginRequest, request: Request):
    """Authenticate a user. Only @ufl.edu emails are allowed."""

    if not UFL_REGEX.match(req.email):
        raise HTTPException(status_code=400, detail="Only @ufl.edu email addresses are allowed.")

    user = await db.users_auth.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    # Block password login for Google-authenticated users
    if user.get("auth_provider") == "google":
        raise HTTPException(
            status_code=400,
            detail="This account uses Google Sign-In. Please log in with Google instead."
        )

    if not _verify_password(req.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    if not user.get("is_active", True):
        raise HTTPException(status_code=403, detail="Account is deactivated.")

    # Return user profile data + JWT
    return {
        "message": "Login successful",
        "token": _create_token(user["email"]),
        "email": user["email"],
        "full_name": user.get("full_name", ""),
        "study_abroad_city": user.get("study_abroad_city", ""),
        "major": user.get("major", ""),
        "graduation_year": user.get("graduation_year"),
        "interests": user.get("interests", []),
        "saved_cities": user.get("saved_cities", []),
        "saved_events": user.get("saved_events", []),
        "vocab_cards": user.get("vocab_cards", []),
        "study_stats": user.get("study_stats", {}),
        "reservations": user.get("reservations", []),
    }


@router.post("/logout")
async def logout(req: LogoutRequest):
    """Log out a user. Records logout timestamp and instructs client to clear local state."""
    # Record the logout event on the user document
    user = await db.users_auth.users.find_one({"email": req.email})
    if user:
        await db.users_auth.users.update_one(
            {"email": req.email},
            {"$set": {"last_logout": datetime.now(timezone.utc), "updated_at": datetime.now(timezone.utc)}}
        )
    return {
        "message": "Logged out successfully",
        "clear": ["email", "full_name", "study_abroad_city", "myCities"],
    }


@router.post("/delete")
async def delete_account(req: DeleteRequest, request: Request):
    """Delete a user account and all associated data. Requires X-User-Email header to match."""

    # Simple auth check: the requesting user must match
    caller_email = request.headers.get("X-User-Email", "")
    if caller_email != req.email:
        raise HTTPException(status_code=403, detail="You can only delete your own account.")

    user = await db.users_auth.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Delete user's bookmarks
    await db.phrases_vocabulary.db["phrase_bookmarks"].delete_many({"user_email": req.email})

    # Delete user document
    await db.users_auth.users.delete_one({"email": req.email})

    return {"message": "Account and associated data deleted successfully."}


@router.get("/user/profile")
async def get_profile(email: str, request: Request):
    """Get user profile by email. Requires X-User-Email header to match."""
    caller_email = request.headers.get("X-User-Email", "")
    if caller_email != email:
        raise HTTPException(status_code=403, detail="You can only view your own profile.")

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
        "vocab_cards": user.get("vocab_cards", []),
        "study_stats": user.get("study_stats", {}),
        "reservations": user.get("reservations", []),
        "created_at": user.get("created_at"),
    }


@router.put("/user/profile")
async def update_profile(req: UpdatePreferencesRequest, request: Request):
    """Update user preferences / profile info. Requires X-User-Email header to match."""

    caller_email = request.headers.get("X-User-Email", "")
    if caller_email != req.email:
        raise HTTPException(status_code=403, detail="You can only update your own profile.")

    user = await db.users_auth.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    update_fields = {"updated_at": datetime.now(timezone.utc)}
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
    if req.vocab_cards is not None:
        update_fields["vocab_cards"] = req.vocab_cards
    if req.study_stats is not None:
        update_fields["study_stats"] = req.study_stats
    if req.reservations is not None:
        update_fields["reservations"] = req.reservations

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

    # Block password changes for Google-authenticated users
    if user.get("auth_provider") == "google":
        raise HTTPException(
            status_code=400,
            detail="Google accounts cannot change passwords. Manage your password through Google."
        )

    if not _verify_password(req.current_password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Current password is incorrect.")

    _validate_password(req.new_password)

    await db.users_auth.users.update_one(
        {"email": req.email},
        {"$set": {
            "hashed_password": _hash_password(req.new_password),
            "updated_at": datetime.now(timezone.utc),
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
    is_new_user = False
    if not user:
        is_new_user = True
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
            "vocab_cards": [],
            "study_stats": {},
            "reservations": [],
            "is_active": True,
            "role": "user",
            "auth_provider": "google",
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
        }
        await db.users_auth.users.insert_one(user_doc)
        user = user_doc

    # If user has no study_abroad_city set, flag them for setup
    needs_setup = not user.get("study_abroad_city", "")

    return {
        "message": "Google login successful",
        "token": _create_token(email),
        "email": user["email"],
        "full_name": user.get("full_name", full_name),
        "study_abroad_city": user.get("study_abroad_city", ""),
        "major": user.get("major", ""),
        "graduation_year": user.get("graduation_year"),
        "interests": user.get("interests", []),
        "saved_cities": user.get("saved_cities", []),
        "saved_events": user.get("saved_events", []),
        "vocab_cards": user.get("vocab_cards", []),
        "study_stats": user.get("study_stats", {}),
        "reservations": user.get("reservations", []),
        "needs_setup": needs_setup,
        "is_new_user": is_new_user,
    }


# ── Session restore via JWT ─────────────────────────────────────

@router.get("/me")
async def me(email: str = Depends(get_current_user)):
    """Return the current user's full profile from a JWT.
    Used by the frontend to restore sessions on page reload."""

    if not email:
        raise HTTPException(status_code=401, detail="Not authenticated.")

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
        "vocab_cards": user.get("vocab_cards", []),
        "study_stats": user.get("study_stats", {}),
        "reservations": user.get("reservations", []),
        "auth_provider": user.get("auth_provider", "local"),
        "token": _create_token(email),  # refresh the token
    }
