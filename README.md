---
title: MultiAgent Marketing ENV
emoji: 🤖
colorFrom: purple
colorTo: blue
sdk: docker
pinned: false
---

# Multi-Agent Marketing Workflow OpenEnv Environment

This project is a fully compliant OpenEnv environment that simulates a real-world marketing team workflow. An RL agent must decide which simulated tools to use at each step to complete a marketing task successfully.

## Architecture

- **`env/`**: Contains the core `MarketingWorkflowEnv` and reward systems.
- **`tools/`**: Simulated toolkit (generate_image, write_caption, etc.) that the agent can interact with.
- **`tasks/`**: Handlers for the 5 different tasks spanning `easy`, `medium`, and `hard` difficulties.
- **`graders/`**: Deterministic scoring functions for task completion.
- **`models/`**: Pydantic models to ensure strict typing of OpenEnv objects (`Observation`, `Action`, `Reward`).
- **`server/`**: A FastAPI web server exposing `/reset`, `/step`, and `/state`.
- **`baseline/`**: A baseline Gemini inference script mimicking an RL policy.
- **`openenv.yaml`**: The configuration file exposing the tasks and details.

## Running the API Server

The server serves as the interactive core for the environment. You can start it locally or via docker.

### Local (Python)

1. `pip install -r requirements.txt`
2. `python -m server.app`

### Docker

1. `docker build -t marketing-openenv .`
2. `docker run -p 8000:8000 marketing-openenv`

## Expected API Endpoints

- **POST `/reset`**: Resets the environment and loads a specified task name.
- **POST `/step`**: Takes an `Action` JSON and advances the environment. Returns `Observation, Reward, Done, Info`.
- **GET `/state`**: Debugging endpoint to get the hidden environment dictionary state.

## Run Gemini Baseline

This baseline expects the server to be running on `localhost:8000`.

1. Specify `GEMINI_API_KEY` in the `.env` file.
2. Run standard baseline:
   `python baseline/run_baseline.py`
