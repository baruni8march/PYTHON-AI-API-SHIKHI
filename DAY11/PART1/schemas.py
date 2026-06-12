from pydantic import BaseModel  #from pydantic import BaseModel
#BaseModel is used to create data validation models.
from typing import Optional

class TriageRequest(BaseModel):
    symptoms: str
    age: Optional[int] = None
    gender: Optional[str] = None
    language: Optional[str] = None