def publish_post(state: dict) -> dict:
    """Simulates publishing a post."""
    if state["post_published"]:
        return {"success": False, "message": "Post already published."}
        
    state["post_published"] = True
    return {"success": True, "message": "Post successfully published!"}
