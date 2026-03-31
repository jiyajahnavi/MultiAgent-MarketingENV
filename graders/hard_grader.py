def grade_hard_task(state: dict, is_campaign: bool = False) -> float:
    """
    Grader for the Hard tasks.
    If is_campaign is False (Scheduled Post):
        image, caption, hashtags, schedule, publish -> +0.15 each (capped at 1.0, max is 0.75, actually let's adjust to 0.2 each)
        Wait, instruction says: +0.15 each component, Total reward capped at 1.0 (5 components = 0.75, maybe add a final completion bonus?). 
        Let's follow +0.2 each to reach 1.0 for the 5 components.
    If is_campaign is True:
        image, caption, hashtags, review, schedule, publish (6 components).
        +0.15 each milestone (0.9 total) +0.10 bonus for completing in under 5 steps.
        Wait, 6 components in under 5 steps is impossible unless a tool does two things, but let's say "under 8 steps" or simply apply bonus if steps <= 6.
    """
    score = 0.0
    
    if not is_campaign:
        if state.get("image_generated"): score += 0.2
        if state.get("caption_written"): score += 0.2
        if state.get("hashtags_added"): score += 0.2
        if state.get("post_scheduled"): score += 0.2
        if state.get("post_published"): score += 0.2
    else:
        if state.get("image_generated"): score += 0.15
        if state.get("caption_written"): score += 0.15
        if state.get("hashtags_added"): score += 0.15
        if state.get("review_passed"): score += 0.15
        if state.get("post_scheduled"): score += 0.15
        if state.get("post_published"): score += 0.15
        
        # Add early completion bonus
        if state.get("post_published") and state.get("step_count", 0) <= 6:
            score += 0.10
            
    return round(min(score, 1.0), 2)
