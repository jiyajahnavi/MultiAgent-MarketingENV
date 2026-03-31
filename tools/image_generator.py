def generate_image(state: dict, prompt: str) -> dict:
    """Simulates generating an image."""
    if state["image_generated"]:
        return {"success": False, "message": "Image already generated."}
    
    state["image_generated"] = True
    return {"success": True, "message": f"Image generated with prompt: {prompt}"}
