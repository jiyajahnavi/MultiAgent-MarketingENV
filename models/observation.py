from pydantic import BaseModel

class Observation(BaseModel):
    task_id: str
    task_description: str
    image_generated: bool
    caption_written: bool
    review_passed: bool
    hashtags_added: bool
    post_scheduled: bool
    post_published: bool
    step_count: int
