import os
import sys
import json

from fastapi import FastAPI, HTTPException, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional
import uvicorn

# Ensure root path works correctly in container environments
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from env.environment import MarketingWorkflowEnv
from models.action import Action
from models.observation import Observation
from agents.orchestrator import Orchestrator
from utils.trajectory_logger import log_trajectory

app = FastAPI(title="Multi-agent Marketing ENV Server")

# Mount Static Files and Templates (container safe paths)
app.mount(
    "/static",
    StaticFiles(directory=os.path.join(BASE_DIR, "frontend", "static")),
    name="static"
)

templates = Jinja2Templates(
    directory=os.path.join(BASE_DIR, "frontend", "templates")
)

# Initialize environment and orchestrator
env = MarketingWorkflowEnv("social_post")
orchestrator = Orchestrator()

class ResetRequest(BaseModel):
    task_name: str = "social_post"


@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        name="index.html",
        request=request,
        context={}
    )


@app.post("/reset", response_model=Observation)
def reset(request: Optional[ResetRequest] = None):
    try:
        task_name = request.task_name if request else "social_post"
        env.task_name = task_name
        env._load_task()  # Reload the task class
        obs = env.reset()
        return obs
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/step")
def step(action: Action):
    # Determine step count before executing (for logging)
    step_num = env._current_state.get("step_count", 0) + 1
    task_id = env._current_state.get("task_id", "unknown")

    # Standard OpenEnv API endpoint
    obs, reward, done, info = env.step(action)

    # In manual mode, we also want to log these steps.
    info["agent_name"] = "Manual User"

    log_trajectory(
        task_id=task_id,
        step_number=step_num,
        agent_name="Manual User",
        action=action.model_dump(),
        reward=reward,
        done=done
    )

    return {
        "observation": obs,
        "reward": reward,
        "done": done,
        "info": info
    }


@app.post("/run_next_agent")
def run_next_agent():
    """
    Office-OS style endpoint.
    Orchestrator picks the next agent, the agent queries Gemini, and executes the action.
    """
    state_dict = env.state()
    step_num = state_dict.get("step_count", 0) + 1

    # 1. Orchestrator picks agent
    agent = orchestrator.determine_next_agent(state_dict)

    # 2. Agent decides action via LLM wrapper
    action = agent.decide_action(state_dict)

    # 3. Step environment
    obs, reward, done, info_dict = env.step(action)

    # 4. Inject agent info for UI
    info_dict["agent_name"] = agent.name

    # 5. Log Trajectory
    log_trajectory(
        task_id=state_dict.get("task_id", "unknown"),
        step_number=step_num,
        agent_name=agent.name,
        action=action.model_dump(),
        reward=reward,
        done=done
    )

    return {
        "observation": obs,
        "reward": reward,
        "done": done,
        "info": info_dict
    }


@app.get("/state")
def state():
    return env.state()


@app.get("/history")
def history():
    """
    Parses local JSONL log files to return the trace of the most recent episode's tools and rewards.
    """
    logs_dir = os.path.join(BASE_DIR, "logs", "trajectories")

    # Default return structure
    res = {
        "task": env._current_state.get("task_id", "unknown"),
        "steps": []
    }

    if not os.path.exists(logs_dir):
        return res

    files = sorted(os.listdir(logs_dir))
    if not files:
        return res

    latest_file = os.path.join(logs_dir, files[-1])
    parsed_lines = []

    try:
        with open(latest_file, "r") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                parsed_lines.append(json.loads(line))
    except Exception as e:
        print(f"Failed to read logs: {e}")
        return res

    # Extract current episode by reading backward until step_number resets
    episode_sequence = []
    for data in reversed(parsed_lines):
        if data.get("task_id") == res["task"]:
            episode_sequence.insert(0, {
                "step": data.get("step_number", 0),
                "agent": data.get("agent_name", "Unknown"),
                "action": data.get("action", {}).get("tool", "unknown"),
                "reward": data.get("reward", 0.0),
                "timestamp": data.get("timestamp")
            })
            if data.get("step_number", 0) <= 1:
                break

    res["steps"] = episode_sequence
    return res


def start():
    uvicorn.run("server.app:app", host="0.0.0.0", port=7860, reload=True)


if __name__ == "__main__":
    start()