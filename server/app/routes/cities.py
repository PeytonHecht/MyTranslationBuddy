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


@router.get("/{city_slug}/full", response_model=dict)
async def get_city_full_details(city_slug: str):
    """
    Get complete city details with organized tips.
    
    Returns city information plus:
    - general_tips: Applicable to all students studying in this city
    - program_tips: Specific advice for different programs/universities
    
    This is the comprehensive endpoint for the city details page.
    """
    city_slug = city_slug.strip().lower()
    
    city = await db.cities_info.cities.find_one({"slug": city_slug})
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City not found: {city_slug}",
        )

    # Fetch ALL tips for the city
    all_tips = (
        await db.cities_info.city_tips.find({"city_slug": city_slug})
        .sort("priority", -1)
        .to_list(None)
    )

    # Separate general tips from program-specific tips
    general_tips = []
    program_tips_map = {}

    for tip in all_tips:
        program = tip.get("program")
        if not program or program.strip() == "":
            # No program = general tip for all students
            general_tips.append(_serialize_doc(tip))
        else:
            # Program-specific tip
            if program not in program_tips_map:
                program_tips_map[program] = []
            program_tips_map[program].append(_serialize_doc(tip))

    # Sort program tips by priority within each program
    for program in program_tips_map:
        program_tips_map[program].sort(key=lambda t: t.get("priority", 0), reverse=True)

    # Format program tips as a list of objects with program name and tips
    program_tips_list = [
        {
            "program": program_name,
            "tips": tips,
            "count": len(tips)
        }
        for program_name, tips in sorted(program_tips_map.items())
    ]

    city_with_serialization = _serialize_doc(city)

    return {
        "city": city_with_serialization,
        "general_tips": {
            "count": len(general_tips),
            "description": "Tips applicable to all students studying in this city",
            "data": general_tips,
        },
        "program_tips": {
            "count": len(program_tips_list),
            "description": "Tips specific to different programs and universities",
            "data": program_tips_list,
        },
        "total_tips": len(all_tips),
    }


@router.get("/{city_slug}/complete", response_model=dict)
async def get_city_complete_details(city_slug: str):
    """
    Get COMPLETE city details: city info + organized tips + relevant phrases.
    
    Returns:
    - city: Full city information with geographic/cultural data
    - tips: Organized by general + program-specific
    - phrases: 
      - country_phrases: Phrases for the country (e.g., all Germany-wide phrases)
      - region_phrases: Phrases for the region (e.g., Bavaria, Austria, etc.)
      - city_phrases: Phrases specific to this city
    
    This is the ALL-IN-ONE endpoint for complete city page with learning materials.
    """
    city_slug = city_slug.strip().lower()
    
    # Get city
    city = await db.cities_info.cities.find_one({"slug": city_slug})
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City not found: {city_slug}",
        )

    # Get city tips (general + program-specific)
    all_tips = (
        await db.cities_info.city_tips.find({"city_slug": city_slug})
        .sort("priority", -1)
        .to_list(None)
    )

    general_tips = []
    program_tips_map = {}

    for tip in all_tips:
        program = tip.get("program")
        if not program or program.strip() == "":
            general_tips.append(_serialize_doc(tip))
        else:
            if program not in program_tips_map:
                program_tips_map[program] = []
            program_tips_map[program].append(_serialize_doc(tip))

    for program in program_tips_map:
        program_tips_map[program].sort(key=lambda t: t.get("priority", 0), reverse=True)

    program_tips_list = [
        {
            "program": program_name,
            "tips": tips,
            "count": len(tips)
        }
        for program_name, tips in sorted(program_tips_map.items())
    ]

    # Get phrases: city-specific, region-specific, and country-wide
    country = city.get("country", "").lower()
    region = city.get("region", "").lower()
    
    # Phrases specific to this city
    city_phrases = (
        await db.phrases_vocabulary.phrases.find({
            "city_slugs": city_slug
        }).sort("difficulty_level", 1).to_list(None)
    )
    
    # Phrases for the region (e.g., Bavaria, Austria)
    # Filter by region name in dialect_name or region tags
    region_phrases = (
        await db.phrases_vocabulary.phrases.find({
            "$or": [
                {"dialect_name": {"$regex": region, "$options": "i"}},
                {"tags": {"$in": [region]}}
            ]
        }).sort("difficulty_level", 1).to_list(None)
    )
    
    # Phrases for the country (all general phrases) - these are phrases without city_slugs
    # or phrases that apply broadly to the country
    country_phrases = (
        await db.phrases_vocabulary.phrases.find({
            "city_slugs": {"$size": 0}
        }).sort("difficulty_level", 1).to_list(None)
    )

    def serialize_phrase(p):
        if p and "_id" in p:
            p["_id"] = str(p["_id"])
        return p

    city_with_serialization = _serialize_doc(city)

    return {
        "city": city_with_serialization,
        "tips": {
            "general": {
                "count": len(general_tips),
                "description": "Tips applicable to all students in this city",
                "data": general_tips,
            },
            "by_program": {
                "count": len(program_tips_list),
                "description": "Tips specific to programs and universities in this city",
                "data": program_tips_list,
            },
            "total": len(all_tips),
        },
        "phrases": {
            "city_specific": {
                "count": len(city_phrases),
                "description": f"Phrases specifically useful in {city.get('name')}",
                "data": [serialize_phrase(p) for p in city_phrases[:20]],  # Limit to top 20
            },
            "region_relevant": {
                "count": len(region_phrases),
                "description": f"Phrases from {region} region/dialect",
                "data": [serialize_phrase(p) for p in region_phrases[:20]],
            },
            "country_general": {
                "count": len(country_phrases),
                "description": f"General German phrases for all {country}",
                "data": [serialize_phrase(p) for p in country_phrases[:20]],
            },
            "total_available": len(city_phrases) + len(region_phrases) + len(country_phrases),
        },
        "metadata": {
            "country": city.get("country"),
            "region": city.get("region"),
            "region_type": city.get("region_type"),
        }
    }


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


@router.get("/{city_slug}/tips-organized", response_model=dict)
async def get_city_tips_organized_by_program(
    city_slug: str,
    category: Optional[str] = None,
):
    """
    Get city tips organized by program type.
    
    Returns:
    - general_tips: Tips with no program specified (applicable to all students)
    - program_tips: Tips grouped by specific program name
    
    This allows students to see both general city info AND program-specific advice.
    """
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

    # Fetch ALL tips for the city (no skip/limit for organized view)
    all_tips = (
        await db.cities_info.city_tips.find(query_filter)
        .sort("priority", -1)
        .to_list(None)
    )

    # Separate general tips from program-specific tips
    general_tips = []
    program_tips_map = {}

    for tip in all_tips:
        program = tip.get("program")
        if not program or program.strip() == "":
            # No program = general tip for all students
            general_tips.append(_serialize_doc(tip))
        else:
            # Program-specific tip
            if program not in program_tips_map:
                program_tips_map[program] = []
            program_tips_map[program].append(_serialize_doc(tip))

    # Sort program tips by priority within each program
    for program in program_tips_map:
        program_tips_map[program].sort(key=lambda t: t.get("priority", 0), reverse=True)

    # Format program tips as a list of objects with program name and tips
    program_tips_list = [
        {
            "program": program_name,
            "tips": tips,
            "count": len(tips)
        }
        for program_name, tips in sorted(program_tips_map.items())
    ]

    return {
        "city_slug": city_slug,
        "city": {"slug": city["slug"], "name": city.get("name")},
        "general_tips": {
            "count": len(general_tips),
            "data": general_tips,
        },
        "program_tips": {
            "count": len(program_tips_list),
            "data": program_tips_list,
        },
        "total_tips": len(all_tips),
        "category_filter": category if category else None,
    }
