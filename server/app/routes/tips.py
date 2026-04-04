"""General city tips API routes."""

from urllib.parse import unquote
from typing import Optional

from fastapi import APIRouter, HTTPException, Query, status
from app.database import db

router = APIRouter(prefix="/api/tips", tags=["tips"])


def _serialize_doc(doc: dict) -> dict:
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


def _normalize_optional(value: Optional[str]) -> Optional[str]:
    if value is None:
        return None
    normalized = value.strip()
    return normalized if normalized else None


@router.get("/", response_model=dict)
async def get_all_tips(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    city_slug: Optional[str] = None,
    category: Optional[str] = None,
):
    city_slug = _normalize_optional(city_slug)
    category = _normalize_optional(category)

    query_filter: dict = {}
    if city_slug:
        query_filter["city_slug"] = city_slug.lower()
    if category:
        query_filter["category"] = category.lower()

    total = await db.cities_info.city_tips.count_documents(query_filter)
    tips = (
        await db.cities_info.city_tips.find(query_filter)
        .sort("priority", -1)
        .skip(skip)
        .limit(limit)
        .to_list(None)
    )

    return {
        "data": [_serialize_doc(t) for t in tips],
        "total": total,
        "skip": skip,
        "limit": limit,
    }


@router.get("/by-category/{category}", response_model=dict)
async def get_tips_by_category(
    category: str,
    city_slug: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    category = category.strip().lower()
    city_slug = _normalize_optional(city_slug)

    query_filter: dict = {"category": category}
    if city_slug:
        query_filter["city_slug"] = city_slug.lower()

    total = await db.cities_info.city_tips.count_documents(query_filter)
    if total == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No tips found for category: {category}",
        )

    tips = (
        await db.cities_info.city_tips.find(query_filter)
        .sort("priority", -1)
        .skip(skip)
        .limit(limit)
        .to_list(None)
    )

    return {
        "category": category.lower(),
        "data": [_serialize_doc(t) for t in tips],
        "total": total,
        "skip": skip,
        "limit": limit,
    }


@router.get("/by-program/{program_name}", response_model=dict)
async def get_tips_by_program(
    program_name: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    decoded_program = unquote(program_name).strip()
    query_filter = {"program": decoded_program}

    total = await db.cities_info.city_tips.count_documents(query_filter)
    if total == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No tips found for program: {decoded_program}",
        )

    tips = (
        await db.cities_info.city_tips.find(query_filter)
        .sort("priority", -1)
        .skip(skip)
        .limit(limit)
        .to_list(None)
    )

    return {
        "program": decoded_program,
        "data": [_serialize_doc(t) for t in tips],
        "total": total,
        "skip": skip,
        "limit": limit,
    }
