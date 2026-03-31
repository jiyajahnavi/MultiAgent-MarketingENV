def schedule_post(state: dict, time: str) -> dict:
    """Simulates scheduling a post for a specific time."""
    if state["post_scheduled"]:
        return {"success": False, "message": "Post already scheduled."}
        
    state["post_scheduled"] = True
    return {"success": True, "message": f"Post scheduled for: {time}"}
