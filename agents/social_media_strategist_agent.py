from agents.base_agent import BaseAgent

class SocialMediaStrategistAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="SocialMediaStrategistAgent", tool="add_hashtags")
