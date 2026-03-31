from pydantic import BaseModel
from typing import Dict, Any, Optional

class Action(BaseModel):
    tool: str
    parameters: Dict[str, Any] = {}
