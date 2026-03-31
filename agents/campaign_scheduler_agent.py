from agents.base_agent import BaseAgent

class CampaignSchedulerAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="CampaignSchedulerAgent", tool="schedule_post")

