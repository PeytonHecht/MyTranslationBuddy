"""
Cities API routes for MyTranslationBuddy
Provides endpoints for retrieving city data, filtering, and searching
"""

from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from bson import ObjectId
from app.database import db
from app.schemas.city import CityCreate


def convert_id(doc):
    """Convert MongoDB ObjectId to string for JSON serialization"""
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

router = APIRouter(prefix="/api/cities", tags=["cities"])


@router.get("")
async def get_all_cities(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    country: Optional[str] = None,
    tag: Optional[str] = None,
    min_priority: Optional[int] = None,
):
    """
    Get all cities with optional filtering.
    
    Parameters:
    - skip: Number of cities to skip (pagination)
    - limit: Maximum number of cities to return (default 100)
    - country: Filter by country (e.g., 'Germany', 'Austria', 'Switzerland')
    - tag: Filter by tag (e.g., 'engineering', 'culture', 'Alps')
    - min_priority: Filter by minimum priority level
    """
    try:
        query = {}
        
        if country:
            query["country"] = country
        
        if tag:
            query["tags"] = {"$in": [tag]}
        
        if min_priority is not None:
            query["priority"] = {"$gte": min_priority}
        
        cities = await db.cities_info.cities.find(query).skip(skip).limit(limit).to_list(length=None)
        total = await db.cities_info.cities.count_documents(query)
        
        # Convert ObjectId to string for JSON serialization
        cities = [convert_id(city) for city in cities]
        
        return {
            "data": cities,
            "total": total,
            "skip": skip,
            "limit": limit
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{city_slug}")
async def get_city_by_slug(city_slug: str):
    """
    Get a specific city by slug.
    
    Example: /api/cities/berlin
    """
    try:
        city = await db.cities_info.cities.find_one({"slug": city_slug})
        
        if not city:
            raise HTTPException(status_code=404, detail=f"City with slug '{city_slug}' not found")
        
        return convert_id(city)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{city_slug}/tips")
async def get_city_tips(
    city_slug: str,
    program: Optional[str] = None,
    category: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100)
):
    """
    Get all tips for a specific city with optional filtering.
    
    Parameters:
    - city_slug: The city identifier (e.g., 'berlin')
    - program: Filter by UF program name
    - category: Filter by tip category (e.g., 'housing', 'transport')
    - skip: Pagination offset
    - limit: Maximum number of tips to return
    
    Example: /api/cities/berlin/tips?program=UF in Berlin - MIB GIE
    """
    try:
        # Verify city exists
        city = await db.cities_info.cities.find_one({"slug": city_slug})
        if not city:
            raise HTTPException(status_code=404, detail=f"City '{city_slug}' not found")
        
        # Build query
        query = {"city_slug": city_slug}
        
        if program:
            query["program"] = program
        
        if category:
            query["category"] = category
        
        # Get tips
        tips = await db.cities_info.city_tips.find(query).skip(skip).limit(limit).to_list(length=None)
        total = await db.cities_info.city_tips.count_documents(query)
        
        # Convert ObjectIds to strings
        tips = [convert_id(tip) for tip in tips]
        
        return {
            "city": city.get("name"),
            "city_slug": city_slug,
            "data": tips,
            "total": total,
            "skip": skip,
            "limit": limit
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search/by-country/{country}")
async def get_cities_by_country(
    country: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100)
):
    """
    Get all cities in a specific country.
    
    Example: /api/cities/search/by-country/Germany
    """
    try:
        cities = await db.cities_info.cities.find({"country": country}).skip(skip).limit(limit).to_list(length=None)
        total = await db.cities_info.cities.count_documents({"country": country})
        
        if not cities:
            raise HTTPException(status_code=404, detail=f"No cities found for country '{country}'")
        
        # Convert ObjectIds to strings
        cities = [convert_id(city) for city in cities]
        
        return {
            "country": country,
            "data": cities,
            "total": total,
            "skip": skip,
            "limit": limit
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search/by-tag/{tag}")
async def get_cities_by_tag(
    tag: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100)
):
    """
    Get all cities with a specific tag.
    
    Examples: /api/cities/search/by-tag/engineering
              /api/cities/search/by-tag/culture
    """
    try:
        cities = await db.cities_info.cities.find({"tags": tag}).skip(skip).limit(limit).to_list(length=None)
        total = await db.cities_info.cities.count_documents({"tags": tag})
        
        if not cities:
            raise HTTPException(status_code=404, detail=f"No cities found with tag '{tag}'")
        
        # Convert ObjectIds to strings
        cities = [convert_id(city) for city in cities]
        
        return {
            "tag": tag,
            "data": cities,
            "total": total,
            "skip": skip,
            "limit": limit
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search/featured")
async def get_featured_cities(
    min_priority: int = Query(8, ge=1, le=10),
    limit: int = Query(10, ge=1, le=100)
):
    """
    Get featured/popular cities based on priority level.
    Default returns cities with priority >= 8
    
    Example: /api/cities/search/featured?min_priority=9
    """
    try:
        cities = await db.cities_info.cities.find(
            {"priority": {"$gte": min_priority}}
        ).sort("priority", -1).limit(limit).to_list(length=None)
        
        if not cities:
            raise HTTPException(status_code=404, detail="No featured cities found")
        
        # Convert ObjectIds to strings
        cities = [convert_id(city) for city in cities]
        
        return {
            "featured": True,
            "min_priority": min_priority,
            "data": cities,
            "total": len(cities)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
