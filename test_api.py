import requests

# Test reset
r = requests.post("http://localhost:7860/reset")
print("RESET:", r.json())

# Test step
r = requests.post(
    "http://localhost:7860/step",
    json={"action_type": "read_paper", "content": "all"}
)
print("STEP:", r.json())