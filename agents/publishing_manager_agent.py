from agents.base_agent import BaseAgent

class PublishingManagerAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="PublishingManagerAgent", tool="publish_post")
