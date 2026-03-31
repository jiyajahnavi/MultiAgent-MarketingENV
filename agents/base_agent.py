import json
from models.action import Action
from utils.llm_client import get_llm_response

class BaseAgent:
    def __init__(self, name: str, tool: str):
        self.name = name
        self.tool = tool

    def decide_action(self, observation: dict) -> Action:
        """
        Uses LLM context to determine parameters for the assigned tool.
        """
        prompt = f"""
        You are the {self.name} acting in a marketing campaign team.
        Your assigned tool is strictly: '{self.tool}'.
        
        Current environment observation:
        {json.dumps(observation, indent=2)}

        Determine the best parameters for your tool to progress the task.
        Return ONLY a raw JSON object string mapping param_name to param_value.
        Example: {{"prompt": "A modern futuristic coffee cup"}}
        If no parameters are required, return: {{}}
        """
        
        raw_resp = get_llm_response(prompt)
        
        try:
            start_idx = raw_resp.find("{")
            end_idx = raw_resp.rfind("}") + 1
            if start_idx != -1 and end_idx != 0:
                params = json.loads(raw_resp[start_idx:end_idx])
            else:
                params = {}
        except Exception as e:
            print(f"[{self.name}] Failed to parse JSON params: {e}")
            params = {}
            
        return Action(tool=self.tool, parameters=params)
