"""
Events proxy route for Ticketmaster API.
Proxies requests to the Ticketmaster Discovery API to avoid CORS issues.
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import httpx

from app.config import settings

router = APIRouter(prefix="/api", tags=["events"])

# Ticketmaster API key from settings (loaded from .env)
TICKETMASTER_API_KEY = settings.ticketmaster_api_key
TICKETMASTER_BASE = "https://app.ticketmaster.com/discovery/v2/events.json"
TICKETMASTER_EVENT_BASE = "https://app.ticketmaster.com/discovery/v2/events"


@router.get("/tm-events")
async def proxy_ticketmaster_events(
    countryCode: str = Query("DE", description="Country code (DE, AT, CH)"),
    keyword: Optional[str] = Query("", description="Search keyword"),
    city: Optional[str] = Query(None, description="City name"),
    size: int = Query(20, description="Number of results"),
    page: int = Query(0, description="Page number"),
    startDateTime: Optional[str] = Query(None, description="Start date/time in ISO 8601 format"),
    endDateTime: Optional[str] = Query(None, description="End date/time in ISO 8601 format"),
    segmentId: Optional[str] = Query(None, description="Ticketmaster segment ID(s) for category filtering"),
    sort: Optional[str] = Query("date,asc", description="Sort order (date,asc | date,desc | relevance,desc | name,asc)"),
):
    """
    Proxy endpoint for Ticketmaster Discovery API.
    Forwards requests to avoid CORS issues from the frontend.
    """
    params = {
        "apikey": TICKETMASTER_API_KEY,
        "countryCode": countryCode,
        "size": size,
        "page": page,
        "sort": sort or "date,asc",
    }

    if keyword:
        params["keyword"] = keyword
    if city:
        params["city"] = city
    if startDateTime:
        params["startDateTime"] = startDateTime
    if endDateTime:
        params["endDateTime"] = endDateTime
    if segmentId:
        params["segmentId"] = segmentId

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(TICKETMASTER_BASE, params=params)
            data = response.json()

            # If Ticketmaster returned an auth error, return empty events
            if response.status_code == 401 or "fault" in data:
                return {
                    "_embedded": {"events": []},
                    "page": {"number": 0, "totalPages": 0, "totalElements": 0, "size": size},
                    "_info": "Ticketmaster API key may be expired or invalid. Events are temporarily unavailable."
                }

            return data
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Ticketmaster API timed out")
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to fetch events: {str(e)}"
        )


@router.get("/event-details/{event_id}")
async def proxy_ticketmaster_event_details(event_id: str):
    """
    Proxy endpoint for fetching a single Ticketmaster event by ID.
    """
    url = f"{TICKETMASTER_EVENT_BASE}/{event_id}.json"
    params = {"apikey": TICKETMASTER_API_KEY}

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(url, params=params)

            if response.status_code == 404:
                raise HTTPException(status_code=404, detail="Event not found")

            data = response.json()

            if response.status_code == 401 or "fault" in data:
                raise HTTPException(
                    status_code=502,
                    detail="Ticketmaster API key may be expired or invalid."
                )

            return data
    except HTTPException:
        raise
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Ticketmaster API timed out")
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to fetch event details: {str(e)}"
        )