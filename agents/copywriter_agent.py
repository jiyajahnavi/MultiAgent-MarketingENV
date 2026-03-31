from agents.base_agent import BaseAgent

class CopywriterAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="CopywriterAgent", tool="write_caption")
