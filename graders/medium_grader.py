def grade_medium_task(state: dict, requires_review: bool = False) -> float:
    """
    Grader for the Medium tasks (Product Promotion / Brand Ad).
    If require_review is True (Brand Ad):
        image(0.2) + caption(0.2) + review(0.2) + hashtags(0.2) + publish(0.2) = 1.0
    If require_review is False (Product Promo):
        image(0.25) + caption(0.25) + hashtags(0.25) + publish(0.25) = 1.0
    """
    score = 0.0
    if requires_review:
        if state.get("image_generated"): score += 0.2
        if state.get("caption_written"): score += 0.2
        if state.get("hashtags_added"): score += 0.2
        if state.get("review_passed"): score += 0.2
        if state.get("post_published"): score += 0.2
    else:
        if state.get("image_generated"): score += 0.25
        if state.get("caption_written"): score += 0.25
        if state.get("hashtags_added"): score += 0.25
        if state.get("post_published"): score += 0.25
        
    return round(score, 2)
