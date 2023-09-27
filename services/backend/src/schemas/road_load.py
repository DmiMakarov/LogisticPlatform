from typing import Optional

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import RoadLoad


RoadLoadInSchema = pydantic_model_creator(
    RoadLoad, name="RoadLoadIn")
RoadLoadOutSchema = pydantic_model_creator(
    RoadLoad, name="RoadLoadOut"
)
