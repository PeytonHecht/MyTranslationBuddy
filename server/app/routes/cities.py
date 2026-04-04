"""City data API routes."""

import re

from fastapi import APIRouter, HTTPException, Query, status
from typing import Optional
from app.database import db

router = APIRouter(prefix="/api/cities", tags=["cities"])


CITY_DISPLAY_NAME_OVERRIDES = {
    "bonn": "Bonn",
    "ebs": "Wiesbaden / Oestrich-Winkel",
}


def _apply_city_display_name_overrides(doc: dict) -> dict:
    """Normalize known records where the city name was stored as a university/program name."""
    if not doc:
        return doc

    slug = (doc.get("slug") or "").strip().lower()
    display_name = CITY_DISPLAY_NAME_OVERRIDES.get(slug)
    if not display_name:
        return doc

    doc["name"] = display_name
    local_name = (doc.get("local_name") or "").strip()
    if not local_name or "universit" in local_name.lower() or "university" in local_name.lower():
        doc["local_name"] = display_name

    return doc


def _serialize_doc(doc: dict) -> dict:
    doc = _apply_city_display_name_overrides(doc)
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


def _normalize_optional(value: Optional[str]) -> Optional[str]:
    if value is None:
        return None
    normalized = value.strip()
    return normalized if normalized else None


@router.get("/", response_model=dict)
async def get_cities(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    country: Optional[str] = None,
    tag: Optional[str] = None,
):
    country = _normalize_optional(country)
    tag = _normalize_optional(tag)

    query_filter: dict = {}
    if country:
        query_filter["country"] = country
    if tag:
        safe_tag = re.escape(tag)
        query_filter["tags"] = {"$regex": f"^{safe_tag}$", "$options": "i"}

    total = await db.cities_info.cities.count_documents(query_filter)
    cities = (
        await db.cities_info.cities.find(query_filter)
        .sort("priority", -1)
        .sort("slug", 1)
        .skip(skip)
        .limit(limit)
        .to_list(None)
    )

    return {
        "data": [_serialize_doc(c) for c in cities],
        "total": total,
        "skip": skip,
        "limit": limit,
    }


@router.get("/search/by-country/{country}", response_model=dict)
async def search_cities_by_country(
    country: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    country = country.strip()
    query_filter = {"country": country}
    total = await db.cities_info.cities.count_documents(query_filter)
    if total == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No cities found for country: {country}",
        )

    cities = (
        await db.cities_info.cities.find(query_filter)
        .sort("priority", -1)
        .sort("slug", 1)
        .skip(skip)
        .limit(limit)
        .to_list(None)
    )

    return {
        "country": country,
        "data": [_serialize_doc(c) for c in cities],
        "total": total,
        "skip": skip,
        "limit": limit,
    }


@router.get("/search/by-tag/{tag}", response_model=dict)
async def search_cities_by_tag(
    tag: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    tag = tag.strip()
    safe_tag = re.escape(tag)
    query_filter = {"tags": {"$regex": f"^{safe_tag}$", "$options": "i"}}
    total = await db.cities_info.cities.count_documents(query_filter)
    if total == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No cities found for tag: {tag}",
        )

    cities = (
        await db.cities_info.cities.find(query_filter)
        .sort("priority", -1)
        .sort("slug", 1)
        .skip(skip)
        .limit(limit)
        .to_list(None)
    )

    return {
        "tag": tag,
        "data": [_serialize_doc(c) for c in cities],
        "total": total,
        "skip": skip,
        "limit": limit,
    }


@router.get("/search/featured", response_model=dict)
async def get_featured_cities(
    min_priority: int = Query(8, ge=0),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    query_filter = {"priority": {"$gte": min_priority}}
    total = await db.cities_info.cities.count_documents(query_filter)

    cities = (
        await db.cities_info.cities.find(query_filter)
        .sort("priority", -1)
        .sort("slug", 1)
        .skip(skip)
        .limit(limit)
        .to_list(None)
    )

    return {
        "featured": True,
        "min_priority": min_priority,
        "data": [_serialize_doc(c) for c in cities],
        "total": total,
        "skip": skip,
        "limit": limit,
    }


@router.get("/{city_slug}", response_model=dict)
async def get_city_by_slug(city_slug: str):
    city_slug = city_slug.strip().lower()
    city = await db.cities_info.cities.find_one({"slug": city_slug})
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City not found: {city_slug}",
        )
    return _serialize_doc(city)


@router.get("/{city_slug}/tips", response_model=dict)
async def get_city_tips(
    city_slug: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
):
    city_slug = city_slug.strip().lower()
    category = _normalize_optional(category)

    city = await db.cities_info.cities.find_one({"slug": city_slug})
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City not found: {city_slug}",
        )

    query_filter: dict = {"city_slug": city_slug}
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
        "city_slug": city_slug,
        "city": {"slug": city["slug"], "name": city.get("name")},
        "data": [_serialize_doc(t) for t in tips],
        "total": total,
        "skip": skip,
        "limit": limit,
    }
