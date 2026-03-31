def get_incremental_reward(action_name: str, success: bool) -> float:
    """
    Returns step-level rewards to provide signals before the episode ends.
    Reward logic:
      generate_image → +0.15
      write_caption → +0.15
      add_hashtags → +0.15
      review_content → +0.15
      schedule_post → +0.15
      publish_post → +0.25
    Penalties:
      invalid/failed tool usage → -0.1
    """
    if not success:
        return -0.1
        
    rewards = {
        "generate_image": 0.15,
        "write_caption": 0.15,
        "add_hashtags": 0.15,
        "review_content": 0.15,
        "schedule_post": 0.15,
        "publish_post": 0.25,
    }
    return rewards.get(action_name, 0.0)
