from graders.hard_grader import grade_hard_task

class TaskCampaignBundle:
    name = "campaign_bundle"
    description = "Create a multi-platform campaign. Requires image, caption, hashtags, passing review, scheduling, and publishing."
    difficulty = "hard"
    
    def grade(self, state: dict) -> float:
        return grade_hard_task(state, is_campaign=True)
        
    def get_initial_state(self) -> dict:
        return {
            "task_id": self.name,
            "task_description": self.description,
            "image_generated": False,
            "caption_written": False,
            "review_passed": False,
            "hashtags_added": False,
            "post_scheduled": False,
            "post_published": False,
            "step_count": 0
        }
