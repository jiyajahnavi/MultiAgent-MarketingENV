from graders.easy_grader import grade_easy_task

class TaskEasyPost:
    name = "social_post"
    description = "Create a basic social media post. Requires generating an image, writing a caption, and publishing."
    difficulty = "easy"
    
    def grade(self, state: dict) -> float:
        return grade_easy_task(state)
        
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
