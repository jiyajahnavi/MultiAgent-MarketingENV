from agents.base_agent import BaseAgent

class CreativeDesignerAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="CreativeDesignerAgent", tool="generate_image")
