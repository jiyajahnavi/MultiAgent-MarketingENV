from agents.base_agent import BaseAgent

class ContentReviewerAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="ContentReviewerAgent", tool="review_content")
