def add_hashtags(state: dict, topic: str) -> dict:
    """Simulates adding hashtags to a post."""
    if state["hashtags_added"]:
        return {"success": False, "message": "Hashtags already added."}
    
    state["hashtags_added"] = True
    return {"success": True, "message": f"Hashtags added for topic: {topic}"}
