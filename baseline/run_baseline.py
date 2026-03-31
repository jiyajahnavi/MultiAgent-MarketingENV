import os
import sys
import time
import httpx
import json
from dotenv import load_dotenv

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.action import Action

load_dotenv()

# Google Generative AI
try:
    import google.generativeai as genai
    gemini_installed = True
except ImportError:
    gemini_installed = False
    print("google-generativeai is not installed.")

API_URL = "http://localhost:8000"

def parse_action(text: str) -> Action:
    try:
        start_idx = text.find("{")
        end_idx = text.rfind("}") + 1
        if start_idx == -1 or end_idx == 0:
            raise ValueError("No JSON found")
        json_str = text[start_idx:end_idx]
        data = json.loads(json_str)
        return Action(tool=data.get("tool"), parameters=data.get("parameters", {}))
    except Exception as e:
        print(f"Failed to parse action from text: {text}")
        return Action(tool="invalid", parameters={})

def main():
    if not gemini_installed:
        return
        
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Please set GEMINI_API_KEY in .env file.")
        return

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    task_name = "social_post"
    print(f"Starting episode for task: {task_name}")
    try:
        resp = httpx.post(f"{API_URL}/reset", json={"task_name": task_name})
        resp.raise_for_status()
        obs = resp.json()
    except httpx.ConnectError:
        print("Failed to connect to the environment server. Is it running?")
        return
    
    done = False
    total_reward = 0.0
    
    while not done:
        prompt = f"""
Current observation:
{json.dumps(obs, indent=2)}

You are an AI agent in a marketing workflow environment.
Choose the best next tool to progress the task.
Available tools:
- generate_image(prompt: str)
- write_caption(tone: str)
- add_hashtags(topic: str)
- review_content()
- schedule_post(time: str)
- publish_post()

Respond ONLY with a JSON object in this exact format:
{{
  "tool": "tool_name",
  "parameters": {{
    "param_name": "param_value"
  }}
}}
"""
        try:
            response = model.generate_content(prompt)
            text = response.text
        except Exception as e:
            print(f"Error calling Gemini API: {e}")
            break
            
        action = parse_action(text)
        print(f"=> Agent chose action: {action.model_dump()}")
        
        step_resp = httpx.post(f"{API_URL}/step", json=action.model_dump())
        step_data = step_resp.json()
        
        obs = step_data["observation"]
        reward = step_data["reward"]
        done = step_data["done"]
        info = step_data["info"]
        
        total_reward += reward
        print(f"   Reward: {reward}, Done: {done}, Total Reward: {total_reward}\n")
        time.sleep(1)

    print(f"Episode finished. Final Total Reward: {total_reward}")

if __name__ == "__main__":
    main()
