def write_caption(state: dict, tone: str) -> dict:
    """Simulates writing a caption."""
    if state["caption_written"]:
        return {"success": False, "message": "Caption already written."}
        
    state["caption_written"] = True
    # We could simulate content inclusion by storing it in state, e.g. state['caption_tone'] = tone
    return {"success": True, "message": f"Caption written in tone: {tone}"}
