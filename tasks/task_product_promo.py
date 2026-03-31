from graders.medium_grader import grade_medium_task

class TaskProductPromo:
    name = "product_promotion"
    description = "Create a product promotion post. Requires an image, a caption, hashtags, and then publishing."
    difficulty = "medium"
    
    def grade(self, state: dict) -> float:
        return grade_medium_task(state, requires_review=False)
        
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
