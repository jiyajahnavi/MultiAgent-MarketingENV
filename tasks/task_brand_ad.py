from graders.medium_grader import grade_medium_task

class TaskBrandAd:
    name = "brand_ad"
    description = "Create a brand-compliant advertisement. Requires image, caption with keyword, adding hashtags, passing review, and publishing."
    difficulty = "medium"
    
    def grade(self, state: dict) -> float:
        return grade_medium_task(state, requires_review=True)
        
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
