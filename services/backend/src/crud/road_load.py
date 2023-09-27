from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import RoadLoad
from src.schemas.notes import RoadLoadOutSchema
from src.schemas.token import Status


async def get_loads():
    return await RoadLoadOutSchema.from_queryset(RoadLoad.all())

async def get_load(road_name) -> RoadLoadOutSchema:
    return await RoadLoadOutSchema.from_queryset_single(RoadLoad.get(road_name=road_name).order_by('id').limit(1))
