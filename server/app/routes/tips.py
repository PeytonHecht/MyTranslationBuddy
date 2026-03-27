"""
Tips API routes for MyTranslationBuddy
Provides endpoints for retrieving study abroad tips, filtering by program, category, etc.
"""

from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from app.database import db


def convert_id(doc):
    """Convert MongoDB ObjectId to string for JSON serialization"""
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


router = APIRouter(prefix="/api/tips", tags=["tips"])


@router.get("")
async def get_all_tips(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    program: Optional[str] = None,
    category: Optional[str] = None,
    city_slug: Optional[str] = None,
):
    """
    Get all tips with optional filtering.
    
    Parameters:
    - skip: Number of tips to skip (pagination)
    - limit: Maximum number of tips to return
    - program: Filter by UF program name
    - category: Filter by tip category
    - city_slug: Filter by city slug
    
    Examples:
    - /api/tips?program=UF Exchange - University of Mannheim
    - /api/tips?city_slug=berlin&category=housing
    """
    try:
        query = {}
        
        if program:
            query["program"] = program
        
        if category:
            query["category"] = category
        
        if city_slug:
            query["city_slug"] = city_slug
        
        tips = await db.cities_info.city_tips.find(query).skip(skip).limit(limit).to_list(length=None)
        total = await db.cities_info.city_tips.count_documents(query)
        
        # Convert ObjectIds to strings
        tips = [convert_id(tip) for tip in tips]
        
        return {
            "data": tips,
            "total": total,
            "skip": skip,
            "limit": limit
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/by-program/{program_name}")
async def get_tips_by_program(
    program_name: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    category: Optional[str] = None
):
    """
    Get all tips for a specific UF program.
    
    Parameters:
    - program_name: The UF program name (URL encoded)
    - category: Optional category filter
    - skip: Pagination offset
    - limit: Maximum tips to return
    
    Examples:
    - /api/tips/by-program/UF%20Exchange%20-%20University%20of%20Mannheim
    - /api/tips/by-program/TASSEP%20-%20Technische%20Universit%C3%A4t%20Wien
    """
    try:
        query = {"program": program_name}
        
        if category:
            query["category"] = category
        
        tips = await db.cities_info.city_tips.find(query).skip(skip).limit(limit).to_list(length=None)
        total = await db.cities_info.city_tips.count_documents(query)
        
        if not tips:
            raise HTTPException(status_code=404, detail=f"No tips found for program '{program_name}'")
        
        # Convert ObjectIds to strings
        tips = [convert_id(tip) for tip in tips]
        
        return {
            "program": program_name,
            "data": tips,
            "total": total,
            "skip": skip,
            "limit": limit
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/by-category/{category}")
async def get_tips_by_category(
    category: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    city_slug: Optional[str] = None
):
    """
    Get all tips in a specific category.
    
    Parameters:
    - category: Tip category (e.g., housing, transport, culture, academics)
    - city_slug: Optional city filter
    - skip: Pagination offset
    - limit: Maximum tips to return
    
    Examples:
    - /api/tips/by-category/housing
    - /api/tips/by-category/transport?city_slug=vienna
    """
    try:
        query = {"category": category}
        
        if city_slug:
            query["city_slug"] = city_slug
        
        tips = await db.cities_info.city_tips.find(query).skip(skip).limit(limit).to_list(length=None)
        total = await db.cities_info.city_tips.count_documents(query)
        
        if not tips:
            raise HTTPException(status_code=404, detail=f"No tips found for category '{category}'")
        
        # Convert ObjectIds to strings
        tips = [convert_id(tip) for tip in tips]
        
        return {
            "category": category,
            "data": tips,
            "total": total,
            "skip": skip,
            "limit": limit
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/programs")
async def get_all_programs():
    """
    Get a list of all unique UF programs.
    
    Returns all 31 unique study abroad programs available.
    """
    try:
        programs = await db.cities_info.city_tips.distinct("program")
        programs = sorted([p for p in programs if p])  # Remove None values and sort
        
        return {
            "programs": programs,
            "total": len(programs)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/categories")
async def get_all_categories():
    """
    Get a list of all unique tip categories.
    
    Returns all unique categories used across tips.
    """
    try:
        categories = await db.cities_info.city_tips.distinct("category")
        categories = sorted([c for c in categories if c])  # Remove None values and sort
        
        return {
            "categories": categories,
            "total": len(categories)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/programs/{program_name}/cities")
async def get_cities_for_program(program_name: str):
    """
    Get all cities that offer a specific UF program.
    
    Parameters:
    - program_name: The UF program name (URL encoded)
    
    Returns: List of cities and their tips for this program
    
    Example: /api/tips/programs/UF%20Exchange%20-%20University%20of%20Mannheim/cities
    """
    try:
        tips = await db.cities_info.city_tips.find({"program": program_name}).to_list(length=None)
        
        if not tips:
            raise HTTPException(status_code=404, detail=f"No cities found for program '{program_name}'")
        
        # Extract unique cities
        city_slugs = set(tip["city_slug"] for tip in tips)
        cities = []
        for slug in sorted(city_slugs):
            city = await db.cities_info.cities.find_one({"slug": slug})
            if city:
                cities.append({
                    "slug": city["slug"],
                    "name": city["name"],
                    "tips_count": len([t for t in tips if t["city_slug"] == slug])
                })
        
        return {
            "program": program_name,
            "cities": cities,
            "total_cities": len(cities),
            "total_tips": len(tips)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search")
async def search_tips(
    q: str = Query(..., min_length=2),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Search tips by title or content.
    
    Parameters:
    - q: Search query (minimum 2 characters)
    - skip: Pagination offset
    - limit: Maximum results to return
    
    Searches in tip titles and content.
    
    Example: /api/tips/search?q=housing
    """
    try:
        query = {
            "$or": [
                {"title": {"$regex": q, "$options": "i"}},
                {"content": {"$regex": q, "$options": "i"}},
                {"short_description": {"$regex": q, "$options": "i"}}
            ]
        }
        
        tips = await db.cities_info.city_tips.find(query).skip(skip).limit(limit).to_list(length=None)
        total = await db.cities_info.city_tips.count_documents(query)
        
        if not tips:
            raise HTTPException(status_code=404, detail=f"No tips found matching '{q}'")
        
        # Convert ObjectIds to strings
        tips = [convert_id(tip) for tip in tips]
        
        return {
            "query": q,
            "data": tips,
            "total": total,
            "skip": skip,
            "limit": limit
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def get_tips_statistics():
    """
    Get statistics about all tips in the database.
    
    Returns: Total tips, unique programs, unique categories, distribution by city, etc.
    """
    try:
        total_tips = await db.cities_info.city_tips.count_documents({})
        programs = await db.cities_info.city_tips.distinct("program")
        categories = await db.cities_info.city_tips.distinct("category")
        cities = await db.cities_info.cities.distinct("slug")
        
        # Count tips per city
        tips_per_city = {}
        for city_slug in cities:
            count = await db.cities_info.city_tips.count_documents({"city_slug": city_slug})
            tips_per_city[city_slug] = count
        
        return {
            "total_tips": total_tips,
            "unique_programs": len([p for p in programs if p]),
            "unique_categories": len([c for c in categories if c]),
            "total_cities": len(cities),
            "tips_per_city": tips_per_city,
            "programs_list": sorted([p for p in programs if p])
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
