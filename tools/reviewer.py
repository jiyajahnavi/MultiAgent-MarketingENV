def review_content(state: dict) -> dict:
    """Simulates reviewing the content. For this environment, we usually auto-pass if prerequisite content is there."""
    if state["review_passed"]:
        return {"success": False, "message": "Content already reviewed."}
    
    # We enforce a simple dependency: image and caption must exist
    if not state["image_generated"] or not state["caption_written"]:
        return {"success": False, "message": "Review failed: Missing image or caption."}
        
    state["review_passed"] = True
    return {"success": True, "message": "Content review passed."}
