import os
import importlib
import inspect
from pydantic import BaseModel
from typing import Tuple, Dict, Any, Optional

try:
    from openenv import BaseEnv
except ImportError:
    class BaseEnv:
        pass

from models.action import Action
from models.observation import Observation
from models.reward import Reward

from tools.image_generator import generate_image
from tools.caption_writer import write_caption
from tools.hashtag_tool import add_hashtags
from tools.reviewer import review_content
from tools.scheduler import schedule_post
from tools.publisher import publish_post
from env.reward_system import get_incremental_reward

import yaml

class MarketingWorkflowEnv(BaseEnv):
    def __init__(self, task_name: str = "social_post"):
        self.max_steps = 10
        self._current_state = {}
        self.task_name = task_name
        self._load_task()

    def _load_task(self):
        """Dynamically load task definition from tasks/ directory."""
        tasks_dir = os.path.join(os.path.dirname(__file__), "..", "tasks")
        for filename in os.listdir(tasks_dir):
            if filename.startswith("task_") and filename.endswith(".py"):
                module_name = f"tasks.{filename[:-3]}"
                module = importlib.import_module(module_name)
                for name, obj in inspect.getmembers(module, inspect.isclass):
                    if hasattr(obj, "name") and getattr(obj, "name") == self.task_name:
                        self.task_class = obj()
                        return
        raise ValueError(f"Task {self.task_name} not found in tasks folder.")

    def reset(self) -> Observation:
        self._current_state = self.task_class.get_initial_state()
        return Observation(**self._current_state)

    def state(self) -> dict:
        return self._current_state

    def step(self, action: Action) -> Tuple[Observation, float, bool, dict]:
        if self._current_state.get("step_count", 0) >= self.max_steps or self._current_state.get("post_published", False):
            return Observation(**self._current_state), 0.0, True, {"reason": "Episode already finished"}

        self._current_state["step_count"] += 1
        
        tool = action.tool
        params = action.parameters
        
        # Execute tool
        success = False
        message = ""
        if tool == "generate_image":
            res = generate_image(self._current_state, params.get("prompt", ""))
            success, message = res["success"], res["message"]
        elif tool == "write_caption":
            res = write_caption(self._current_state, params.get("tone", "neutral"))
            success, message = res["success"], res["message"]
        elif tool == "add_hashtags":
            res = add_hashtags(self._current_state, params.get("topic", "general"))
            success, message = res["success"], res["message"]
        elif tool == "review_content":
            res = review_content(self._current_state)
            success, message = res["success"], res["message"]
        elif tool == "schedule_post":
            res = schedule_post(self._current_state, params.get("time", "now"))
            success, message = res["success"], res["message"]
        elif tool == "publish_post":
            res = publish_post(self._current_state)
            success, message = res["success"], res["message"]
        else:
            success = False
            message = f"Unknown tool: {tool}"
            
        step_reward = get_incremental_reward(tool, success)
        
        # Check termination
        done = self._current_state["post_published"] or self._current_state["step_count"] >= self.max_steps
        
        if done:
            # Add final grade to score
            final_score = self.task_class.grade(self._current_state)
            step_reward += final_score
            
            # Penalty for exceeding steps without finishing
            if not self._current_state["post_published"] and self._current_state["step_count"] >= self.max_steps:
                step_reward -= 0.2
        
        info = {
            "success": success,
            "message": message,
            "grade": self.task_class.grade(self._current_state) if done else 0.0
        }
        
        return Observation(**self._current_state), step_reward, done, info
