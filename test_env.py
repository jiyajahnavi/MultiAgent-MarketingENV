from environment import ResearchEnvironment
from models import ResearchAction

env = ResearchEnvironment()

obs = env.reset(task_id="task_easy_image_classification")
print(obs.message)

obs = env.step(ResearchAction("read_paper", "all"))
print(obs.reward, obs.score)

obs = env.step(ResearchAction("propose_hypothesis", "CNN works best"))
print(obs.reward, obs.score)

obs = env.step(ResearchAction("design_experiment", "cnn:dataset1"))
print(obs.reward)

obs = env.step(ResearchAction("run_experiment", "exp_0"))
print(obs.reward, obs.data)

obs = env.step(ResearchAction("final_answer", "CNN is best"))
print(obs.reward, obs.score)