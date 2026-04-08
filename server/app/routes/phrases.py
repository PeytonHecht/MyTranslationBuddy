"""
FastAPI routes for the German phrase library system.
Handles phrase retrieval, searching, and bookmarking functionality.
"""

from fastapi import APIRouter, Query, HTTPException, status
from typing import List, Optional
from bson import ObjectId
import logging
import re

from app.database import db
from app.schemas.phrase import (
    PhraseBase,
    PhraseCreate,
    PhraseUpdate,
    PhraseCategory,
    PhraseRegister,
    PhraseBookmark,
    PhraseSearchRequest,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/phrases", tags=["phrases"])


def _serialize_phrase_doc(phrase: dict) -> dict:
    """Convert Mongo-specific fields to JSON-safe values."""
    if phrase and "_id" in phrase:
        phrase["_id"] = str(phrase["_id"])
    return phrase


def _normalize_optional(value: Optional[str]) -> Optional[str]:
    if value is None:
        return None
    normalized = value.strip()
    return normalized if normalized else None


# ============================================================================
# PHRASE RETRIEVAL ENDPOINTS
# ============================================================================


@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_phrase(phrase: PhraseCreate):
    """Create a new phrase entry in the phrase library."""
    try:
        phrases_db = db.phrases_vocabulary

        phrase_data = phrase.model_dump()
        phrase_data["city_slugs"] = [slug.lower() for slug in phrase_data.get("city_slugs", [])]
        phrase_data["created_at"] = phrase_data.get("created_at") or None
        phrase_data["updated_at"] = phrase_data.get("updated_at") or None

        existing = await phrases_db.phrases.find_one(
            {
                "german_phrase": phrase_data["german_phrase"],
                "english_translation": phrase_data["english_translation"],
            }
        )
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Phrase already exists with same German and English text",
            )

        result = await phrases_db.phrases.insert_one(phrase_data)
        created = await phrases_db.phrases.find_one({"_id": result.inserted_id})
        return {
            "message": "Phrase created successfully",
            "phrase": _serialize_phrase_doc(created),
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating phrase: {str(e)}",
        )


@router.get("/", response_model=dict)
async def get_all_phrases(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    city_slug: Optional[str] = None,
    difficulty: Optional[int] = Query(None, ge=1, le=5),
    register: Optional[str] = None,
    - phrase_type: Filter by type (standard, regional, slang)

    Returns:
        {
            "phrases": [...],
            "total": int,
            "skip": int,
            "limit": int
        }
    """
    try:
        logger.info(f"Getting phrases: skip={skip}, limit={limit}, category={category}")

        category = _normalize_optional(category)
        city_slug = _normalize_optional(city_slug)
        register = _normalize_optional(register)
        if phrase_type:
            query_filter["phrase_type"] = phrase_type.lower()

        # Get total count
        total = await phrases_db.phrases.count_documents(query_filter)

        # Get paginated results
        phrases = await phrases_db.phrases.find(query_filter).skip(skip).limit(limit).to_list(None)

        # Convert ObjectId to string for JSON serialization
        for phrase in phrases:
            phrase["_id"] = str(phrase["_id"])

        return {
            "phrases": phrases,
            "total": total,
            "skip": skip,
            "limit": limit,
        }

    except Exception as e:
        logger.exception(f"Error retrieving phrases: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving phrases: {str(e)}",
        )


@router.get("/categories", response_model=dict)
async def get_phrase_categories():
    """
    Get all available phrase categories and their phrase counts.

    Returns:
        {
            "categories": [
                {"name": "academic", "count": 5},
                ...
            ]
        }
    """
    try:
        phrases_db = db.phrases_vocabulary
        
        categories = await phrases_db.phrases.aggregate(
            [
                {"$group": {"_id": "$category", "count": {"$sum": 1}}},
                {"$sort": {"_id": 1}},
            ]
        ).to_list(None)

        return {
            "categories": [
                {"name": cat["_id"], "count": cat["count"]} for cat in categories
            ]
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving categories: {str(e)}",
        )


@router.get("/cities", response_model=dict)
async def get_phrase_cities():
    """
    Get all cities that have associated phrases.

    Returns:
        {
            "cities": [
                {"slug": "berlin", "phrase_count": 25},
                ...
            ]
        }
    """
    try:
        phrases_db = db.phrases_vocabulary
        
        # Find all city slugs with phrase counts
        city_data = await phrases_db.phrases.aggregate(
            [
                {"$unwind": "$city_slugs"},
                {"$group": {"_id": "$city_slugs", "count": {"$sum": 1}}},
                {"$sort": {"_id": 1}},
            ]
        ).to_list(None)

        return {
            "cities": [
                {"slug": city["_id"], "phrase_count": city["count"]}
                for city in city_data
            ]
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving cities: {str(e)}",
        )


@router.get("/random", response_model=dict)
async def get_random_phrase(
    category: Optional[str] = None,
    city_slug: Optional[str] = None,
):
    """Return one random phrase, optionally filtered by category and city slug."""
    try:
        phrases_db = db.phrases_vocabulary
        match_filter = {}
        category = _normalize_optional(category)
        city_slug = _normalize_optional(city_slug)

        if category:
            match_filter["category"] = category.lower()
        if city_slug:
            match_filter["city_slugs"] = city_slug.lower()

        pipeline = []
        if match_filter:
            pipeline.append({"$match": match_filter})
        pipeline.append({"$sample": {"size": 1}})

        sampled = await phrases_db.phrases.aggregate(pipeline).to_list(1)
        if not sampled:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No phrase found for provided filters",
            )

        return {"phrase": _serialize_phrase_doc(sampled[0])}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving random phrase: {str(e)}",
        )


@router.get("/stats/overview", response_model=dict)
async def get_phrase_stats_overview():
    """Get phrase-library analytics for UI dashboards and admin insights."""
    try:
        phrases_db = db.phrases_vocabulary

        total_phrases = await phrases_db.phrases.count_documents({})
        total_bookmarks = await phrases_db.phrase_bookmarks.count_documents({})

        categories = await phrases_db.phrases.aggregate(
            [
                {"$group": {"_id": "$category", "count": {"$sum": 1}}},
                {"$sort": {"count": -1, "_id": 1}},
            ]
        ).to_list(None)

        registers = await phrases_db.phrases.aggregate(
            [
                {"$group": {"_id": "$register", "count": {"$sum": 1}}},
                {"$sort": {"_id": 1}},
            ]
        ).to_list(None)

        difficulties = await phrases_db.phrases.aggregate(
            [
                {"$group": {"_id": "$difficulty_level", "count": {"$sum": 1}}},
                {"$sort": {"_id": 1}},
            ]
        ).to_list(None)

        cities = await phrases_db.phrases.aggregate(
            [
                {"$unwind": "$city_slugs"},
                {"$group": {"_id": "$city_slugs", "count": {"$sum": 1}}},
                {"$sort": {"count": -1, "_id": 1}},
            ]
        ).to_list(None)

        return {
            "totals": {
                "phrases": total_phrases,
                "bookmarks": total_bookmarks,
            },
            "by_category": [
                {"name": row["_id"], "count": row["count"]} for row in categories
            ],
            "by_register": [
                {"name": row["_id"], "count": row["count"]} for row in registers
            ],
            "by_difficulty": [
                {"level": row["_id"], "count": row["count"]} for row in difficulties
            ],
            "by_city": [
                {"slug": row["_id"], "count": row["count"]} for row in cities
            ],
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving phrase stats: {str(e)}",
        )


# ============================================================================
# PHRASE SEARCH ENDPOINT
# ============================================================================


@router.post("/search", response_model=dict)
async def search_phrases(
    request: PhraseSearchRequest,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    """
    Search phrases by English or German text.
    Supports full-text search and filtering.

    Request body:
        {
            "query": "help",  # Search term (English or German)
            "search_type": "english",  # "english", "german", or "all"
            "category": "academic",  # optional
            "city_slug": "berlin",  # optional
            "difficulty_min": 1,  # optional
            "difficulty_max": 5,  # optional
            "register": "formal"  # optional
        }

    Returns:
        {
            "results": [...matched phrases...],
            "total": int,
            "query": str,
            "search_type": str
        }
    """
    try:
        phrases_db = db.phrases_vocabulary
        
        if not request.query or len(request.query.strip()) < 2:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Search query must be at least 2 characters",
            )

        # Build search filter
        search_filter = {}

        # Search in specified fields based on search_type
        search_query = re.escape(request.query.strip().lower())

        if request.search_type == "english":
            search_filter["english_translation"] = {"$regex": search_query, "$options": "i"}
        elif request.search_type == "german":
            search_filter["german_phrase"] = {"$regex": search_query, "$options": "i"}
        else:  # "all" - search in both
            search_filter["$or"] = [
                {"english_translation": {"$regex": search_query, "$options": "i"}},
                {"german_phrase": {"$regex": search_query, "$options": "i"}},
            ]

        # Apply optional filters
        if request.category:
            search_filter["category"] = request.category.lower()

        if request.city_slug:
            search_filter["city_slugs"] = request.city_slug.lower()

        if request.difficulty_min or request.difficulty_max:
            difficulty_filter = {}
            if request.difficulty_min:
                difficulty_filter["$gte"] = request.difficulty_min
            if request.difficulty_max:
                difficulty_filter["$lte"] = request.difficulty_max
            if difficulty_filter:
                search_filter["difficulty_level"] = difficulty_filter

        if request.register:
            search_filter["register"] = request.register.lower()

        # Execute search
        total = await phrases_db.phrases.count_documents(search_filter)
        results = (
            await phrases_db.phrases.find(search_filter)
            .skip(skip)
            .limit(limit)
            .to_list(None)
        )

        # Convert ObjectId to string
        for phrase in results:
            phrase["_id"] = str(phrase["_id"])

        return {
            "results": results,
            "total": total,
            "query": request.query,
            "search_type": request.search_type,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error searching phrases: {str(e)}",
        )


# ============================================================================
# BOOKMARK ENDPOINTS
# ============================================================================


@router.post("/bookmarks", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_bookmark(bookmark: PhraseBookmark):
    """
    Add a phrase to user's bookmarks (favorites).

    Request body:
        {
            "phrase_id": "507f1f77bcf86cd799439011",
            "user_email": "student@example.com",
            "personal_notes": "Remember this for the exam"  # optional
        }

    Returns bookmark info with creation timestamp
    """
    try:
        phrases_db = db.phrases_vocabulary

        if not ObjectId.is_valid(bookmark.phrase_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid phrase ID format",
            )
        
        # Verify the phrase exists
        phrase = await phrases_db.phrases.find_one(
            {"_id": ObjectId(bookmark.phrase_id)}
        )
        if not phrase:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Phrase with ID {bookmark.phrase_id} not found",
            )

        # Check if bookmark already exists
        existing = await phrases_db.phrase_bookmarks.find_one(
            {
                "phrase_id": bookmark.phrase_id,
                "user_email": bookmark.user_email,
            }
        )
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This phrase is already bookmarked",
            )

        # Create bookmark
        bookmark_dict = bookmark.model_dump()
        bookmark_dict["created_at"] = bookmark_dict.get("created_at") or None
        bookmark_dict["updated_at"] = bookmark_dict.get("updated_at") or None

        result = await phrases_db.phrase_bookmarks.insert_one(bookmark_dict)

        return {
            "bookmark_id": str(result.inserted_id),
            "phrase_id": bookmark.phrase_id,
            "user_email": bookmark.user_email,
            "message": "Bookmark created successfully",
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating bookmark: {str(e)}",
        )


@router.get("/bookmarks", response_model=dict)
async def get_user_bookmarks(user_email: str):
    """
    Get all bookmarks for a specific user.

    Query Parameters:
    - user_email: Email of the user

    Returns:
        {
            "bookmarks": [
                {
                    "phrase_id": "...",
                    "phrase": {...full phrase data...},
                    "personal_notes": "...",
                    "created_at": "..."
                }
            ],
            "total": int
        }
    """
    try:
        phrases_db = db.phrases_vocabulary
        
        if not user_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="user_email parameter is required",
            )

        # Get bookmarks with full phrase details
        # Use a try/except approach: first try with $lookup, fall back to manual join
        try:
            bookmarks = await phrases_db.phrase_bookmarks.aggregate(
                [
                    {"$match": {"user_email": user_email}},
                    {"$addFields": {"phrase_object_id": {"$toObjectId": "$phrase_id"}}},
                    {
                        "$lookup": {
                            "from": "phrases",
                            "localField": "phrase_object_id",
                            "foreignField": "_id",
                            "as": "phrase",
                        }
                    },
                    {"$unwind": {"path": "$phrase", "preserveNullAndEmptyArrays": True}},
                    {"$project": {"phrase_object_id": 0}},
                    {"$sort": {"created_at": -1}},
                ]
            ).to_list(None)
        except Exception:
            # Fallback: get bookmarks without join
            raw_bookmarks = await phrases_db.phrase_bookmarks.find(
                {"user_email": user_email}
            ).sort("created_at", -1).to_list(None)
            bookmarks = []
            for bm in raw_bookmarks:
                phrase = None
                if ObjectId.is_valid(bm.get("phrase_id", "")):
                    phrase = await phrases_db.phrases.find_one({"_id": ObjectId(bm["phrase_id"])})
                if phrase:
                    bm["phrase"] = phrase
                bookmarks.append(bm)

        # Convert ObjectIds to strings
        for bookmark in bookmarks:
            bookmark["_id"] = str(bookmark["_id"])
            if "phrase" in bookmark and "_id" in bookmark["phrase"]:
                bookmark["phrase"]["_id"] = str(bookmark["phrase"]["_id"])

        return {
            "bookmarks": bookmarks,
            "total": len(bookmarks),
            "user_email": user_email,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving bookmarks: {str(e)}",
        )


@router.delete("/bookmarks/{bookmark_id}")
async def delete_bookmark(bookmark_id: str, user_email: str):
    """
    Remove a phrase from user's bookmarks.

    The bookmark_id can be either the bookmark document _id OR the phrase_id.
    The endpoint will try both approaches for maximum compatibility.

    Path Parameters:
    - bookmark_id: ID of the bookmark (or phrase) to delete

    Query Parameters:
    - user_email: Email of the user (for verification)

    Returns:
        {"message": "Bookmark deleted successfully"}
    """
    try:
        phrases_db = db.phrases_vocabulary

        result = None

        # First try to delete by bookmark _id
        if ObjectId.is_valid(bookmark_id):
            result = await phrases_db.phrase_bookmarks.delete_one(
                {"_id": ObjectId(bookmark_id), "user_email": user_email}
            )

        # If not found, try to delete by phrase_id (string match)
        if not result or result.deleted_count == 0:
            result = await phrases_db.phrase_bookmarks.delete_one(
                {"phrase_id": bookmark_id, "user_email": user_email}
            )

        if not result or result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bookmark not found",
            )

        return {"message": "Bookmark deleted successfully"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting bookmark: {str(e)}",
        )


@router.patch("/{phrase_id}", response_model=dict)
async def update_phrase(phrase_id: str, phrase_update: PhraseUpdate):
    """Partially update a phrase by ID."""
    try:
        phrases_db = db.phrases_vocabulary

        if not ObjectId.is_valid(phrase_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid phrase ID format",
            )

        update_data = phrase_update.model_dump(exclude_unset=True)
        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No update fields provided",
            )

        if "city_slugs" in update_data:
            update_data["city_slugs"] = [slug.lower() for slug in update_data["city_slugs"]]

        result = await phrases_db.phrases.update_one(
            {"_id": ObjectId(phrase_id)},
            {"$set": update_data},
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Phrase with ID {phrase_id} not found",
            )

        updated = await phrases_db.phrases.find_one({"_id": ObjectId(phrase_id)})
        return {
            "message": "Phrase updated successfully",
            "phrase": _serialize_phrase_doc(updated),
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating phrase: {str(e)}",
        )


@router.delete("/{phrase_id}", response_model=dict)
async def delete_phrase(phrase_id: str):
    """Delete a phrase by ID and any related bookmarks."""
    try:
        phrases_db = db.phrases_vocabulary

        if not ObjectId.is_valid(phrase_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid phrase ID format",
            )

        phrase_object_id = ObjectId(phrase_id)
        phrase = await phrases_db.phrases.find_one({"_id": phrase_object_id})
        if not phrase:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Phrase with ID {phrase_id} not found",
            )

        await phrases_db.phrase_bookmarks.delete_many({"phrase_id": phrase_id})
        await phrases_db.phrases.delete_one({"_id": phrase_object_id})

        return {
            "message": "Phrase deleted successfully",
            "phrase_id": phrase_id,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting phrase: {str(e)}",
        )


# ============================================================================
# SINGLE PHRASE ENDPOINT
# ============================================================================


@router.get("/{phrase_id}", response_model=dict)
async def get_phrase(phrase_id: str):
    """
    Get a single phrase by ID.

    Path Parameters:
    - phrase_id: MongoDB ObjectId of the phrase

    Returns the full phrase object
    """
    try:
        phrases_db = db.phrases_vocabulary
        
        if not ObjectId.is_valid(phrase_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid phrase ID format",
            )

        phrase = await phrases_db.phrases.find_one({"_id": ObjectId(phrase_id)})

        if not phrase:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Phrase with ID {phrase_id} not found",
            )

        phrase["_id"] = str(phrase["_id"])
        return phrase

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving phrase: {str(e)}",
        )
