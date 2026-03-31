def grade_easy_task(state: dict) -> float:
    """
    Grader for the Easy task: Create a basic social media post
    Requirements:
    - image generated
    - caption written
    - publish
    Return score between 0.0 and 1.0. 
    Publishing should probably be heavily weighted as the final step.
    For this deterministic grader, we just aggregate the boolean state flags.
    """
    score = 0.0
    if state.get("image_generated"):
        score += 0.3
    if state.get("caption_written"):
        score += 0.3
    if state.get("post_published"):
        score += 0.4
    return round(score, 2)
