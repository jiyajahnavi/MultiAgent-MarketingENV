import os
import json
from datetime import datetime

LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs", "trajectories")

# Ensure directory exists on boot
os.makedirs(LOGS_DIR, exist_ok=True)

def log_trajectory(task_id: str, step_number: int, agent_name: str, action: dict, reward: float, done: bool):
    """
    Appends a JSONL trajectory record to logs/trajectories/
    Organized by task_timestamp.jsonl.
    """
    today_str = datetime.now().strftime("%Y-%m-%d")
    log_file = os.path.join(LOGS_DIR, f"{today_str}_trajectories.jsonl")
    
    record = {
        "timestamp": datetime.now().isoformat(),
        "task_id": task_id,
        "step_number": step_number,
        "agent_name": agent_name,
        "action": action,
        "reward": round(reward, 4),
        "done": done
    }
    
    with open(log_file, "a") as f:
        f.write(json.dumps(record) + "\n")
