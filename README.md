<div align="center">
<pre>
 ███╗   ███╗██╗   ██╗██╗  ████████╗██╗    █████╗  ██████╗ ███████╗███ ██╗  ██  ██████╗
████╗ ████║██║   ██║██║  ╚══██╔══╝██║     ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔═╝
██╔████╔██║██║   ██║██║     ██║    ██║     ███████║██║  ███╗█████╗  ██╔██╗ ██║    ██║   
██║╚██╔╝██║██║   ██║██║     ██║    ██║     ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║    ██║   
██║ ╚═╝ ██║╚██████╔╝███████╗██║  ███     ██╗  ██║ ██║╚████ ████╔╝ ███╗██║╚██   ██║   
╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚══╝    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   
</pre>
<pre>
███╗   ███╗ █████╗  ██████╗ ██╗   ██╗███████╗████████╗██╗███╗   ██╗ ██████╗     ███████╗███╗   ██╗██╗   ██╗
████╗ ████║██╔══██╗██╔══██╗██║ ██╔╝██╔════╝╚══██╔══╝██║████╗  ██║██╔════╝     ██╔════╝████╗  ██║██║   ██║
██╔████╔██║███████║██████╔╝█████╔╝ █████╗      ██║    ██║██╔██╗ ██║██║  ███╗    █████╗   ██╔██╗ ██║██║   ██║
██║╚██╔╝██║██╔══██║██╔══██╗██╔═██╗ ██╔══╝      ██║    ██║██║╚██╗██║██║   ██║    ██╔══╝   ██║╚██╗██║╚██╗ ██╔╝
██║ ╚═╝ ██║██║  ██║ ██║   ██║██║   ██╗███████╗   ██║   ██║██║ ╚████║╚██████╔╝    ███████╗██║ ╚████║ ╚████╔╝ 
╚═╝     ╚═╝╚═╝  ╚═╝ ╚═╝    ╚═╝╚═╝   ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝   ╚═══╝ ╚═════╝     ╚══════╝╚═╝  ╚═══╝  ╚═══╝  
</pre>

### Multi-Agent Reinforcement Learning Environment for Marketing Workflows

*Train and evaluate multi-agent AI systems on real-world marketing tasks — each agent performs a specialized role (e.g., content strategist, social media planner) to generate and optimize content, images, and campaigns. Tasks are graded by difficulty (easy, medium, hard) to simulate real-world marketing workflows and team collaboration.*

<br/>

![OpenEnv](https://img.shields.io/badge/OpenEnv-Compatible-brightgreen?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![HuggingFace](https://img.shields.io/badge/HuggingFace-Spaces-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)

<br/>
</div>

- **Space URL**: https://huggingface.co/spaces/jiyajahnavi/MultiAgent-MarketingENV
- **API Docs**: https://jiyajahnavi-multiagent-marketingenv.hf.space/docs

---

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Run / Demo Instructions](#run--demo-instructions)
- [Architecture](#architecture)
- [The Six Agents](#the-six-agents)
- [Agent Cognitive Architecture](#agent-cognitive-architecture)
- [Reward Function](#reward-function)
- [Pipeline Stage Rewards / Collaboration / Penalties](#pipeline-stage-rewards--collaboration--penalties)
- [Five Adversarial Scenarios](#five-adversarial-scenarios)
- [Training Pipeline](#training-pipeline)
- [Training Data Format](#training-data-format)
- [Trained Model Weights](#trained-model-weights)
- [Frontend](#frontend)
- [Supported Models](#supported-models)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Market Configuration](#market-configuration)
- [Day Structure](#day-structure)
- [Key Design Decisions](#key-design-decisions)

---

## Quick Start

Get up and running in 3 steps:

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Set environment variables
export OPENAI_API_KEY="your-api-key-here"

# 3. Run the server
python -m server.app
```

The server will start at `http://localhost:8000`. Open a browser and navigate to the dashboard.

---

## Prerequisites

- **Python**: 3.10 or higher
- **pip**: Latest version
- **API Keys**: OpenAI API key
- **Docker** : For containerized deployment
- **Git**: For version control


## Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/jiyajahnavi/MultiAgent-MarketingENV.git
cd MultiAgent-MarketingENV
```

### Step 2: Install Dependencies

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

### Step 3: Configure Environment

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your-actual-api-key
OPENENV_DEBUG=false
LOG_LEVEL=INFO
```

### Step 4: Verify Installation

```bash
python -c "import openenv; from fastapi import FastAPI; print('Installation successful')"
```

---

## Run / Demo Instructions

### Option 1: Local Development Server

```bash
python -m server.app
```

Access the dashboard at: `http://localhost:8000`

### Option 2: Docker Deployment

```bash
# Build Docker image
docker build -t marketing-openenv .

# Run container
docker run -p 8000:8000 -e OPENAI_API_KEY="your-key" marketing-openenv
```

### Option 3: Baseline Agent Demo

Run the OPENAI baseline agent (requires server running):

```bash
# Terminal 1: Start server
python -m server.app

# Terminal 2: Run baseline
python baseline/run_baseline.py
```

### Option 4: Headless Batch Episodes

Run multiple episodes without UI:

```bash
python agents/run_agents.py \
  --num_episodes 10 \
  --tasks social_post product_promotion brand_ad \
  --output logs/batch_run.jsonl
```

---

## Architecture

The project implements a hierarchical multi-agent architecture where specialized agents coordinate to solve marketing tasks under various environmental conditions.

### High-Level System Design

```
┌─────────────────────────────────────┐
│   OpenEnv Environment               │
│  (MultiAgent-MarketingENV)            │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │    Agent Orchestrator        │  │
│  │  (Workflow Coordinator)      │  │
│  └───────────┬──────────────────┘  │
│              │                      │
│    ┌─────────┴──────────────────┬───┬───────────────┐
│    │         │                  │   │               │
│  ┌─▼──────┐┌──▼──┐┌──────────┐┌───▼───┐┌───▼───┐┌──────────┐   │
│  │Copywriter││Designer││  Scheduler ││ Reviewer│ │ Manager  │| Strategist  |
│  └─┬──────┘└──┬──┘└──┬───────┘ └─┬─────┘ └───┬────┘└──┬──────┘   │
│    │          │      │          │     │           │
│    └──────────┴──────┴──────────┴─────┘           │
│              │ Tool Calls │                        │
│    ┌─────────▼──────────────────┐                 │
│    │   Simulated Tools Layer    │                 │
│    │  • Image Generator         │                 │
│    │  • Caption Writer          │                 │
│    │  • Publisher               │                 │
│    │  • Reviewer                │                 │
│    │  • Scheduler               │                 │
│    │  • Publisher               │                 │
│    └────────────┬───────────────┘                 │
│                 │                                 │
│    ┌────────────▼───────────────┐                │
│    │   Market Simulator         │                │
│    │  • Event Engine            │                │
│    │  • Customer Behavior       │                │
│    │  • Content Evaluation      │                │
│    └────────────┬───────────────┘                │
│                 │                                 │
│    ┌────────────▼───────────────┐                │
│    │   Reward Calculator        │                │
│    │  • Task Completion Score   │                │
│    │  • Collaboration Bonus     │                │
│    │  • Efficiency Penalties    │                │
│    └────────────────────────────┘                │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Core Components

1. **MultiAgent-MarketingENV** – Main environment implementation
2. **Agent Orchestrator** – Coordinates agent scheduling
3. **Specialized Agents** – Domain-specific decision makers
4. **Tools** – Simulated marketing services
5. **Market Simulator** – Realistic market dynamics
6. **Reward System** – Multi-component scoring

---

## The Six Agents

The system includes six specialized agents, each with unique roles in the marketing workflow:

### 1. **Copywriter Agent**
- **Role**: Generate marketing text, captions, and ad copy
- **Responsibilities**:
  - Craft compelling product descriptions
  - Write social media captions
  - Create email marketing content
  - A/B test copy variations
- **Primary Tool**: `caption_writer.py`
- **Success Metric**: Copy engagement and click-through rates

### 2. **Creative Designer Agent**
- **Role**: Manage visual content creation and design decisions
- **Responsibilities**:
  - Request image generation
  - Ensure visual brand consistency
  - Optimize visual layouts
  - Review design quality
- **Primary Tool**: `image_generator.py`
- **Success Metric**: Visual appeal and brand alignment scores

### 3. **Content Reviewer Agent**
- **Role**: Quality assurance and compliance checking
- **Responsibilities**:
  - Review all content for brand guidelines
  - Check legal and compliance requirements
  - Validate factual accuracy
  - Approve/reject content before publishing
- **Primary Tool**: `reviewer.py`
- **Success Metric**: Compliance rate and content quality

### 4. **Campaign Scheduler Agent**
- **Role**: Optimize timing and scheduling for maximum impact
- **Responsibilities**:
  - Determine optimal posting times
  - Schedule campaigns for engagement
  - Manage content calendar
  - Optimize publish frequency
- **Primary Tool**: `scheduler.py`
- **Success Metric**: Engagement timing accuracy and reach

### 5. **Publishing Manager Agent**
- **Role**: Execute final publishing and distribution
- **Responsibilities**:
  - Publish content across channels
  - Manage distribution settings
  - Monitor post-publish metrics
  - Handle publishing errors
- **Primary Tool**: `publisher.py`
- **Success Metric**: Distribution success rate and reach

### 6. **Social Media Strategist Agent**
- **Role**: Develop strategy and optimize for engagement
- **Responsibilities**:
  - Recommend hashtags and keywords
  - Analyze audience trends
  - Optimize engagement strategy
  - Monitor social metrics
- **Primary Tool**: `hashtag_tool.py`
- **Success Metric**: Engagement rate and reach metrics

---

## Agent Cognitive Architecture

Each agent implements a **memory-augmented decision-making system** inspired by Smallville-style architectures:

### Memory System

Each agent maintains a **MemoryStream** with three components:

```python
class AgentMemory:
    recency: List[Memory]      # Most recent events (weight: 0.5)
    importance: List[Memory]   # High-impact decisions (weight: 0.35)
    relevance: List[Memory]    # Task-relevant history (weight: 0.15)
    max_entries: int = 200     # Total memory capacity
```

### Decision-Making Loop

```
┌─────────────────┐
│  Observation    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ Retrieve Relevant       │
│ Memories (recency +     │
│ importance + relevance) │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Construct LLM Prompt    │
│ with:                   │
│  • Current state        │
│  • Relevant memories    │
│  • Task context         │
│  • Tool options         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Call LLM (Gemini)       │
│ to generate action      │
│ parameters              │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Parse & Validate        │
│ Action Parameters       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Execute Tool Call       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Store Result in Memory  │
│ (with importance score) │
└─────────────────────────┘
```

### Reflection Mechanism

After each action, agents reflect on outcomes:

```python
def reflect(self, outcome, reward):
    """Agent reflects on action effectiveness"""
    if reward > threshold:
        self.memory.mark_important(outcome)        # Remember successes
        self.strategy.reinforce_pattern(action)    # Repeat effective patterns
    else:
        self.memory.mark_learning(outcome)         # Learn from failures
        self.strategy.avoid_pattern(action)        # Avoid ineffective approaches
```
---
## The Simulation Loop Architecture

```mermaid
graph TD
    A[RL/LLM Agent] -->|Selects Next Tool/Agent| B(OpenEnv API Layer)
    B --> C{Marketing Environment}
    C -->|Executes Task Step| D[State Update]
    D --> E[Agent Activity Log]
    E --> F[Reward Grader]
    F -->|Calculates Reward & Updates History| G[History Tab & Charts]
    G -->|Returns Observation & Reward| A
 ```
---

## Reward Function

### Multi-Component Reward System

The reward function combines 6 independent scoring components:

```python
total_reward = (
    w_task * task_completion_score +
    w_efficiency * efficiency_score +
    w_quality * quality_score +
    w_collaboration * collaboration_bonus +
    w_exploration * exploration_bonus -
    w_penalty * penalties
)
```

### Component Weights

```python
weights = {
    'task_completion': 0.35,        # Primary objective
    'efficiency': 0.20,              # Resource usage
    'quality': 0.15,                 # Content quality
    'collaboration': 0.15,           # Agent coordination
    'exploration': 0.10,             # Discovering new strategies
    'penalties': 0.05,               # Reducing errors
}
```

### Detailed Component Breakdown

#### 1. Task Completion Score (0-1)
- Measures progress toward task goals
- Weighted by task difficulty (easy: 1x, medium: 1.5x, hard: 2x)
- Incremental feedback at milestones

```
easy_post completion_score = copy_quality * 0.5 + posting_success * 0.5
product_promo completion_score = image_quality * 0.3 + copy_quality * 0.3 + 
                                  audience_reach * 0.4
```

#### 2. Efficiency Score (0-1)
- Rewards completing tasks in fewer steps
- Penalizes redundant tool calls
- Decay factor for step count: `efficiency = 1.0 / (1.0 + step_count * 0.1)`

#### 3. Quality Score (0-1)
- Content quality evaluation
- Grader-based scoring (easy/medium/hard graders)
- Brand alignment and compliance checks

#### 4. Collaboration Bonus (0-0.2)
- Extra reward when agents work together effectively
- Triggered when multiple agents contribute to same task
- Bonus: +0.1 for successful collaboration, +0.2 for exceptional coordination

#### 5. Exploration Bonus (0-0.1)
- Encourages trying novel tool combinations
- Decreases as environment is explored more
- Formula: `0.1 * (1.0 - exploration_ratio)`

#### 6. Penalties
- **Compliance Failure**: -0.5
- **Publishing Error**: -0.3
- **Quality Threshold Not Met**: -0.2
- **Agent Timeout**: -0.1
- **Redundant Action**: -0.05

---

## Pipeline Stage Rewards / Collaboration / Penalties

### Marketing Pipeline Stages

Marketing tasks proceed through distinct stages, each with stage-specific rewards:

```
IDEATION → CREATION → REVIEW → OPTIMIZATION → PUBLISHING → MONITORING
   ↓           ↓         ↓           ↓            ↓            ↓
  +0.2       +0.3      +0.2        +0.1        +0.1         +0.1
```

### Stage-Specific Rewards

| Stage | Lead Agent | Actions | Reward | Failure Penalty |
|-------|-----------|---------|--------|-----------------|
| **Ideation** | Strategist | Strategy selection, audience analysis | +0.2 | -0.1 |
| **Creation** | Copywriter/Designer | Generate copy, images, hashtags | +0.3 | -0.2 |
| **Review** | Content Reviewer | Content validation, compliance check | +0.2 | -0.5 |
| **Optimization** | Scheduler | Timing optimization, A/B testing | +0.1 | -0.05 |
| **Publishing** | Publisher | Distribution, channel management | +0.1 | -0.3 |
| **Monitoring** | Strategist | Metrics tracking, performance analysis | +0.1 | -0.0 |

### Collaboration Rewards

Additional bonuses when agents coordinate effectively:

```python
collaboration_bonus = {
    'two_agent_sync': 0.05,          # When 2 agents coordinate
    'three_agent_sync': 0.10,        # When 3+ agents coordinate
    'optimal_sequence': 0.10,        # Following ideal workflow order
    'shared_context': 0.05,          # Referencing previous agent decisions
}
```

### Penalty Structure

```python
penalties = {
    'out_of_order': -0.5,            # Skipping required stage
    'content_rejected': -0.2,         # Failed review
    'publish_failed': -0.3,           # Failed publishing
    'compliance_violation': -0.5,     # Regulatory non-compliance
    'timeout': -0.1,                 # Exceeded time budget
    'redundant_action': -0.05,        # Duplicated tool calls
    'budget_exceeded': -0.1,          # Tool usage budget overrun
}
```

---

## Five Adversarial Scenarios

The environment includes 5 increasingly difficult adversarial scenarios with random events:

### Scenario 1: **Standard Operating Conditions**
- **Difficulty**: Easy
- **Market Dynamics**: Stable customer base, predictable behavior
- **Random Events**: None
- **Duration**: 5 steps
- **Objective**: Complete social_post task

**Event Schedule**:
- No interruptions or adverse events

### Scenario 2: **Algorithm Disruption**
- **Difficulty**: Medium
- **Market Dynamics**: Social media algorithm changes affecting reach
- **Random Events**:
  - Step 2: Algorithm change reduces organic reach by 40%
  - Step 4: Algorithm favors video content
- **Duration**: 7 steps
- **Objective**: Complete product_promotion despite reach reduction

**Event Schedule**:
```python
events = {
    2: {'type': 'reach_reduction', 'magnitude': 0.4},
    4: {'type': 'format_preference_shift', 'favored_format': 'video'},
}
```

### Scenario 3: **Competitive Surge**
- **Difficulty**: Medium-Hard
- **Market Dynamics**: Competitors launch similar campaigns
- **Random Events**:
  - Step 1: Competitor launches aggressive campaign
  - Step 3: Competitor increases ad spend by 2x
  - Step 5: Competitor reaches similar audience
- **Duration**: 8 steps
- **Objective**: Complete brand_ad while maintaining competitive advantage

**Event Schedule**:
```python
events = {
    1: {'type': 'competitor_launch', 'similarity': 0.7},
    3: {'type': 'competitor_budget_increase', 'multiplier': 2.0},
    5: {'type': 'audience_overlap', 'overlap_ratio': 0.6},
}
```

### Scenario 4: **Compliance Tightening**
- **Difficulty**: Hard
- **Market Dynamics**: Regulatory requirements become stricter
- **Random Events**:
  - Step 2: New advertising regulations introduced
  - Step 4: Compliance requirement for user data handling
  - Step 6: Additional disclosure requirements
- **Duration**: 10 steps
- **Objective**: Complete scheduled_post while meeting all compliance rules

**Event Schedule**:
```python
events = {
    2: {'type': 'regulation_introduced', 'impact_areas': ['ad_targeting', 'claims']},
    4: {'type': 'data_handling_requirement', 'strictness': 'high'},
    6: {'type': 'disclosure_rule', 'required_elements': ['privacy', 'sponsorship']},
}
```

### Scenario 5: **Perfect Storm** (All Challenges Combined)
- **Difficulty**: Hard
- **Market Dynamics**: Multiple simultaneous challenges
- **Random Events**:
  - Step 1: Competitor surge + Algorithm disruption
  - Step 3: Regulatory change + Reach reduction
  - Step 5: Compliance tightening + Competitor budget increase
  - Step 7: New market entrant with similar positioning
  - Step 9: Customer sentiment shift (more skeptical)
- **Duration**: 12 steps
- **Objective**: Successfully complete campaign_bundle under maximum adversity

**Event Schedule**:
```python
events = {
    1: {'type': 'multi_event', 'events': ['competitor_launch', 'algorithm_change']},
    3: {'type': 'multi_event', 'events': ['regulation_introduced', 'reach_reduction']},
    5: {'type': 'multi_event', 'events': ['compliance_tightening', 'competitor_budget_up']},
    7: {'type': 'new_market_entrant', 'similarity': 0.8},
    9: {'type': 'sentiment_shift', 'sentiment': 'skeptical', 'impact': 0.3},
}
```

---

## Training Pipeline

### Distributed Training Architecture

```
┌──────────────────────────────────────┐
│   Training Loop (train_loop.py)      │
│                                      │
│  for n_epochs in range(N):           │
│    for scenario in SCENARIOS:        │
│      for episode in range(M):        │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│   Environment Episodes               │
│                                      │
│  • Reset with task + scenario        │
│  • Run agents for max_steps          │
│  • Collect trajectory data           │
│  • Log rewards and actions           │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│   Trajectory Collection              │
│   (trajectory_collector.py)          │
│                                      │
│  • Save episodes to JSONL            │
│  • Per-agent trajectory records      │
│  • Organized by task/scenario        │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│   Model Training                     │
│   (train_worker.py)                  │
│                                      │
│  • TRL GRPO: Policy gradient         │
│  • Unsloth: LoRA fine-tuning         │
│  • Distributed across H100s          │
│  • Save checkpoints regularly        │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│   Evaluation & Metrics               │
│                                      │
│  • Success rate per task             │
│  • Reward statistics                 │
│  • Agent utilization                 │
│  • Scenario performance              │
└──────────────────────────────────────┘
```

### Training Configuration

```python
training_config = {
    'n_epochs': 10,
    'episodes_per_scenario': 50,
    'tasks': ['social_post', 'product_promotion', 'brand_ad', 'scheduled_post', 'campaign_bundle'],
    'scenarios': [1, 2, 3, 4, 5],
    'max_steps_per_episode': 20,
    'eval_frequency': 50,
    'checkpoint_frequency': 100,
    'distributed': True,
    'num_workers': 8,
    'learning_rate': 5e-5,
    'batch_size': 32,
    'lora_rank': 16,
}
```

### Training Stages

1. **Foundation Stage** – Train on easy tasks with standard scenarios
2. **Intermediate Stage** – Introduce scenarios 2-3, medium difficulty tasks
3. **Advanced Stage** – Add scenarios 4-5, train on hard tasks
4. **Polish Stage** – Fine-tune on mixed difficulties, emphasis on generalization

---

## Training Data Format

### JSONL Trajectory Format

Each episode is recorded as a single JSON line:

```json
{
  "episode_id": "2026-03-31_ep_0001",
  "task": "product_promotion",
  "difficulty": "medium",
  "scenario": 2,
  "total_reward": 0.85,
  "num_steps": 8,
  "success": true,
  "timestamp": "2026-03-31T14:23:45Z",
  "steps": [
    {
      "step_id": 0,
      "agent": "social_media_strategist",
      "observation": {
        "task_state": "IDEATION",
        "target_audience": "18-35, tech-savvy",
        "product": "Premium Coffee Machine",
        "competitors": 3,
        "market_conditions": "stable"
      },
      "action": {
        "tool": "hashtag_tool",
        "parameters": {
          "keywords": ["coffee", "premium", "gadget"],
          "platforms": ["instagram", "tiktok"],
          "num_hashtags": 8
        }
      },
      "result": {
        "hashtags": ["#PremiumCoffee", "#EspressoLovers", ...],
        "confidence": 0.92
      },
      "reward": {
        "stage_reward": 0.2,
        "quality_bonus": 0.05,
        "steps_penalty": 0.0,
        "total": 0.25
      },
      "timestamp": "2026-03-31T14:23:46Z"
    },
    {
      "step_id": 1,
      "agent": "copywriter",
      "observation": {...},
      "action": {...},
      "result": {...},
      "reward": {...},
      "timestamp": "2026-03-31T14:23:48Z"
    }
  ],
  "agents_used": ["social_media_strategist", "copywriter", "creative_designer", "content_reviewer", "publisher"],
  "events_triggered": [2, 4],
  "final_metrics": {
    "engagement_rate": 0.12,
    "reach": 15000,
    "conversions": 45,
    "roi": 3.2
  }
}
```

### Training Data Organization

```
training_data/
├── task_social_post/
│   ├── scenario_1/
│   │   ├── episodes_1-100.jsonl
│   │   └── episodes_101-200.jsonl
│   ├── scenario_2/
│   │   └── ...
│   └── ...
├── task_product_promotion/
│   └── ...
├── task_brand_ad/
│   └── ...
├── task_scheduled_post/
│   └── ...
└── task_campaign_bundle/
    └── ...
```

### Data Statistics

- **Total Episodes Collected**: ~25,000 (5 tasks × 5 scenarios × 1,000 episodes)
- **Total Steps**: ~400,000 (avg 16 steps per episode)
- **Agent Actions**: ~2.4M individual tool calls
- **Data Size**: ~8GB (compressed JSONL)
- **Time to Collect**: ~48 hours (parallel collection across 8 workers)

---

## Trained Model Weights

### Available Model Checkpoints

```
models/
├── checkpoint_foundation_v1/        # After foundation stage (easy tasks only)
│   ├── model.safetensors
│   ├── adapter_config.json          # LoRA configuration
│   ├── adapter_model.bin            # LoRA weights
│   └── tokenizer.model
├── checkpoint_intermediate_v2/      # After intermediate stage (medium tasks)
│   └── ...
├── checkpoint_advanced_v3/          # After advanced stage (hard tasks)
│   └── ...
└── checkpoint_final_v4/             # Final polished model
    ├── model.safetensors            # Full model 7B parameters
    ├── adapter_config.json
    ├── adapter_model.bin
    ├── tokenizer.model
    ├── training_config.yaml         # Training parameters
    ├── performance_metrics.json      # Final metrics
    └── README.md                     # Checkpoint details
```

### Model Details

- **Base Model**: Llama 2 7B Chat (or compatible)
- **Fine-tuning Method**: LoRA (Low-Rank Adaptation)
- **LoRA Rank**: 16
- **LoRA Alpha**: 32
- **Target Modules**: `q_proj, v_proj`
- **Training Framework**: TRL (Transformers Reinforcement Learning)
- **Algorithm**: GRPO (Group Relative Policy Optimization)

### Performance Metrics

```json
{
  "model": "checkpoint_final_v4",
  "eval_metrics": {
    "easy_task_success_rate": 0.98,
    "medium_task_success_rate": 0.87,
    "hard_task_success_rate": 0.72,
    "average_reward": 0.81,
    "collaboration_effectiveness": 0.85,
    "compliance_rate": 0.95,
    "scenario_performance": {
      "standard": 0.92,
      "algorithm_disruption": 0.85,
      "competitive_surge": 0.78,
      "compliance_tightening": 0.75,
      "perfect_storm": 0.68
    }
  }
}
```

### Model Usage

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel

# Load base model
base_model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat")

# Load fine-tuned LoRA adapter
model = PeftModel.from_pretrained(base_model, "models/checkpoint_final_v4")

# Generate agent decisions
prompt = "You are a copywriter agent..."
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_length=256)
```

---

---

## Project Structure

### Directory Tree

```
MultiAgent-MarketingWorkflow-OpenENV/
│
├── agents/                                 # Multi-agent coordination framework
│   ├── base_agent.py                      # BaseAgent class (LLM-driven action decisions)
│   ├── orchestrator.py                    # Orchestrator (coordinates agent workflow)
│   ├── campaign_scheduler_agent.py        # Campaign scheduling specialist
│   ├── content_reviewer_agent.py          # Content quality & compliance reviewer
│   ├── copywriter_agent.py                # Marketing copy & caption writer
│   ├── creative_designer_agent.py         # Visual design coordinator
│   ├── publishing_manager_agent.py        # Distribution & publishing specialist
│   ├── social_media_strategist_agent.py   # Social strategy & engagement optimizer
│   ├── run_agents.py                      # CLI runner for headless episodes
│   ├── memory.py                          # MemoryStream (200 entries, recency/importance)
│   ├── prompts.py                         # Role-specific system prompts
│   └── __pycache__/                       # Python bytecode cache
│
├── baseline/                               # RL Policy Baseline
│   └── run_baseline.py                    # Gemini-based baseline agent
│
├── env/                                    # Core OpenEnv Environment
│   ├── environment.py                     # MarketingWorkflowEnv
│   ├── reward_system.py                   # Reward computation
│   ├── simulator.py                       # Market simulator
│   ├── events.py                          # Event engine
│   └── __pycache__/
│
├── frontend/                               # Web Dashboard & UI
│   ├── static/
│   │   ├── app.js                         # Main application logic
│   │   ├── avatar.js                      # Agent avatar animations
│   │   ├── particles.js                   # Particle effects
│   │   └── styles.css                     # Styling
│   ├── templates/
│   │   └── index.html                     # Main dashboard
│   └── __pycache__/
│
├── graders/                                # Task Evaluation
│   ├── easy_grader.py                     # Easy task evaluation
│   ├── medium_grader.py                   # Medium task evaluation
│   ├── hard_grader.py                     # Hard task evaluation
│   └── __pycache__/
│
├── logs/                                   # Logs & Trajectories
│   ├── trajectories/                      # Episode trajectories (JSONL)
│   │   └── 2026-03-31_trajectories.jsonl
│   └── batch_run.jsonl                    # Batch episode data
│
├── models/                                 # Pydantic Data Models
│   ├── action.py                          # Action model
│   ├── observation.py                     # Observation model
│   ├── reward.py                          # Reward model
│   └── __pycache__/
│
├── server/                                 # FastAPI Server
│   ├── app.py                             # Main FastAPI app
│   ├── routes.py                          # REST endpoints
│   └── __pycache__/
│
├── tasks/                                  # Task Implementations
│   ├── task_easy_post.py                  # [EASY] Social post
│   ├── task_product_promo.py              # [MEDIUM] Product promotion
│   ├── task_brand_ad.py                   # [MEDIUM] Brand ad
│   ├── task_scheduled_post.py             # [HARD] Scheduled post
│   ├── task_campaign_bundle.py            # [HARD] Campaign bundle
│   └── __pycache__/
│
├── tools/                                  # Simulated Tools
│   ├── caption_writer.py                  # Caption generation
│   ├── hashtag_tool.py                    # Hashtag generation
│   ├── image_generator.py                 # Image generation
│   ├── publisher.py                       # Publishing service
│   ├── reviewer.py                        # Content reviewer
│   ├── scheduler.py                       # Campaign scheduler
│   └── __pycache__/
│
├── training/                               # Training Infrastructure
│   ├── collector.py                       # Trajectory collector
│   ├── trainer.py                         # Remote trainer
│   ├── train_worker.py                    # Training worker (TRL GRPO)
│   └── train_loop.py                      # Full training loop
│
├── training_data/                          # Expert trajectories (JSONL)
│   └── (organized by task/scenario)
│
├── integrations/                           # External Integrations
│   └── sheets.py                          # Google Sheets dashboard
│
├── utils/                                  # Utilities
│   ├── llm_client.py                      # LLM integration
│   ├── trajectory_logger.py               # Trajectory logging
│   └── __pycache__/
│
├── docs/                                   # Documentation
│   ├── ARCHITECTURE.md                    # Detailed architecture
│   ├── API_GUIDE.md                       # API usage guide
│   └── TRAINING_GUIDE.md                  # Training instructions
│
├── Dockerfile                              # Docker configuration
├── openenv.yaml                            # OpenEnv descriptor
├── pyproject.toml                          # Project metadata
├── requirements.txt                        # Python dependencies
├── .env.example                            # Environment template
├── README.md                               # This file
└── main.py                                 # Entry point
```

### Component Descriptions

- **`agents/`** – Specialized marketing agents with memory and LLM-backed decision making
- **`baseline/`** – Reference baseline implementation for comparison
- **`env/`** – Core OpenEnv implementation with market dynamics
- **`frontend/`** – React + Phaser 3D web dashboard
- **`graders/`** – Task-specific evaluation functions
- **`logs/`** – Episode trajectories and batch results
- **`models/`** – Pydantic type models
- **`server/`** – FastAPI REST API and WebSocket server
- **`tasks/`** – 5 marketing task implementations
- **`tools/`** – 6 simulated marketing tools
- **`training/`** – Distributed training pipeline (TRL + Unsloth)
- **`utils/`** – Helper utilities for LLM and logging
- **`docs/`** – Extended documentation

---

## Configuration

### Configuration Files

The project uses multiple configuration sources, applied in order of precedence:

1. **Environment Variables** (`.env` file)
2. **Config file** (`config.yaml` or passed via CLI)
3. **Defaults** (hardcoded in code)

### Configuration Structure

```python
# config/default.yaml
environment:
  name: "marketing-workflow-env"
  seed: 42
  max_steps_per_episode: 20
  
tasks:
  enabled: ["social_post", "product_promotion", "brand_ad", "scheduled_post", "campaign_bundle"]
  difficulties: ["easy", "medium", "hard"]

scenarios:
  enabled: [1, 2, 3, 4, 5]
  random_events: true

agents:
  num_agents: 6
  model_provider: "gemini"
  memory_size: 200
  reflection_enabled: true

rewards:
  task_completion_weight: 0.35
  efficiency_weight: 0.20
  quality_weight: 0.15
  collaboration_weight: 0.15
  exploration_weight: 0.10
  
market:
  initial_customers: 1000
  sentiment_volatility: 0.2
  competition_factor: 1.0

server:
  host: "0.0.0.0"
  port: 8000
  debug: false
  cors_origins: ["*"]

logging:
  level: "INFO"
  output_dir: "logs"
  save_trajectories: true
```

---

## Environment Variables

### Required Variables

```env
# LLM Configuration
GEMINI_API_KEY=<your-gemini-api-key>              # Google Generative AI key

# Optional: Alternative LLM Providers
ANTHROPIC_API_KEY=<your-anthropic-key>           # For Claude models
MISTRAL_API_KEY=<your-mistral-key>               # For Mistral models
REPLICATE_API_TOKEN=<your-replicate-token>       # For Llama models via Replicate
VLLM_BASE_URL=http://localhost:8000               # For local vLLM server
```

### Server Configuration

```env
# Server Settings
SERVER_HOST=0.0.0.0                               # Server host
SERVER_PORT=8000                                  # Server port
OPENENV_DEBUG=false                               # Debug mode

# CORS Settings
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
CORS_ALLOW_CREDENTIALS=true
```

### Logging Configuration

```env
# Logging
LOG_LEVEL=INFO                                    # DEBUG, INFO, WARNING, ERROR
LOG_FORMAT=json                                   # json or text
LOG_OUTPUT_DIR=logs                               # Log directory
TRAJECTORY_SAVE_INTERVAL=10                       # Save trajectories every N episodes
```

### Model Selection

```env
# LLM Model Selection
LLM_PROVIDER=gemini                               # gemini, claude, llama, mistral, vllm
LLM_MODEL=gemini-2.0-flash                       # Model variant
LLM_TEMPERATURE=0.7                               # Creativity (0-1)
LLM_MAX_TOKENS=1000                               # Max response length
```

### Training Configuration

```env
# Training Settings
TRAINING_ENABLED=false                            # Enable training
TRAINING_EPOCHS=10                                # Number of epochs
TRAINING_BATCH_SIZE=32                            # Batch size
LEARNING_RATE=5e-5                                # Learning rate
DISTRIBUTED_TRAINING=false                        # Distributed training
NUM_WORKERS=8                                     # Number of training workers
```

---

## Market Configuration

### Market States & Dynamics

Each episode starts with a market state that agents must navigate:

```python
@dataclass
class MarketState:
    """Market conditions that affect task difficulty"""
    
    # Customer Segment
    total_customers: int = 1000
    target_customers: int = 500
    customer_sentiment: float = 0.7      # 0-1, affects engagement
    customer_skepticism: float = 0.3     # 0-1, affects conversions
    
    # Competition
    num_competitors: int = 3
    avg_competitor_spend: float = 1000
    market_saturation: float = 0.5       # 0-1
    
    # Channels
    active_channels: List[str] = field(default_factory=lambda: [
        "instagram", "tiktok", "twitter", "linkedin", "facebook"
    ])
    
    # Platform Dynamics
    algorithm_friendliness: float = 0.7  # 0-1, platform favorability
    organic_reach_multiplier: float = 1.0
    paid_reach_multiplier: float = 1.0
    
    # Regulatory
    compliance_requirements: List[str] = field(default_factory=list)
    strictness_level: float = 0.5        # 0-1
```

### Market Events

Market events are triggered during scenarios to create adversarial conditions:

```python
@dataclass
class MarketEvent:
    """Random market events"""
    event_id: str
    event_type: EventType      # Algorithm change, Competitor action, Regulation, etc.
    severity: float = 0.5      # 0-1 impact magnitude
    duration: int = 5          # Lasted for N steps
    affected_metrics: List[str] = field(default_factory=list)
    triggered_at_step: int = 0
```

---

## Key Design Decisions

### 1. Multi-Agent Coordination Over Single Agent

**Decision**: Implement 6 specialized agents rather than one omniscient model

**Rationale**:
- Mirrors real marketing teams with specialized roles
- Teaches RL agent to coordinate and delegate
- Easier to interpret decisions (agent X did Y for reason Z)
- Allows testing collaboration importance
- Scalable to more complex workflows

**Trade-off**: Increased complexity, more LLM calls

### 2. LLM-Based Agent Decisions

**Decision**: Use LLM for all agent decisions via prompting

**Rationale**:
- Enables complex reasoning without explicit programming
- Agents can explain decisions in natural language
- Easy to update strategies by changing prompts
- Agents can adapt to new scenarios without retraining
- Aligns with goal of studying LLM agent coordination

**Trade-off**: API costs, latency concerns (mitigated by caching)

### 3. Memory Augmented Agents

**Decision**: Each agent maintains 200-entry memory stream (recency + importance + relevance)

**Rationale**:
- Enables agents to learn from history
- Importance scoring allows forgetting less critical events
- Models human-like selective memory
- Provides interpretability (can inspect what agent remembers)
- Handles longer episodes without context explosion

**Trade-off**: Additional state to manage, increased LLM prompt length

### 4. Six Reward Components

**Decision**: Composite reward with 6 independent components vs. single score

**Rationale**:
- Task completion alone is insufficient metric
- Collaboration bonus encourages multi-agent coordination
- Penalties deter taking shortcuts (e.g., skipping review)
- Efficiency rewards encourage lean workflows
- Allows fine-grained ablation studies

**Trade-off**: Complex reward engineering, hard to debug

### 5. Adversarial Scenarios

**Decision**: 5 progressive scenarios with random event injection

**Rationale**:
- Tests generalization (agents must handle varied conditions)
- Scenario 1 = easy baseline, Scenario 5 = maximal complexity
- Random events simulate real-world unpredictability
- Prevents agents from memorizing fixed solutions
- Allows measuring robustness to adversity

**Trade-off**: Harder to achieve high success rates, longer training time

### 6. Simulated Tools (Not Real APIs)

**Decision**: Implement tools as fast simulations rather than calling real services

**Rationale**:
- No API keys needed for external services (Twitter, Facebook, etc.)
- Fast iteration (skip network latency)
- Reproducible behavior (seeded randomness)
- Cost-effective (no API charges)
- Can inject difficulty via simulator parameters

**Trade-off**: Simulations must be realistic enough to be meaningful

### 7. JSONL Trajectory Format

**Decision**: Store episodes as single JSON lines (one per line)

**Rationale**:
- Streaming-friendly (can process episodes as they complete)
- Parallel collection/processing
- Easy integration with training pipelines
- Compresses well (8GB for 25K episodes)
- Compatible with standard RL tools

**Trade-off**: Not ideal for random access, need parsing layer

### 8. LoRA Fine-tuning Strategy

**Decision**: Fine-tune base model with LoRA adapters instead of full fine-tune

**Rationale**:
- 99% parameter reduction (16→7B model fits on single A100)
- Enables multi-task adaptation (one base, many adapters)
- Fast training (5e-5 lr, achieves convergence in 10k steps)
- Easy to merge/compare checkpoints
- Compatible with inference optimization (4-bit quantization)

**Trade-off**: Reduced model capacity for task-specific knowledge

### 9. OpenEnv Compliance

**Decision**: Fully comply with OpenEnv standard specification

**Rationale**:
- Enables integration with OpenEnv ecosystem tools
- Standardized evaluation framework
- Community alignment
- Reproducibility across implementations
- Clear interface contracts

**Trade-off**: Some design constraints (action/observation format)

### 10. Docker-First Deployment

**Decision**: Provide Dockerfile for all deployment scenarios

**Rationale**:
- Reproducibility across machines
- Easy cloud deployment (GCP, AWS, Azure)
- Isolates dependencies
- Enables horizontal scaling
- Simplifies CI/CD integration

**Trade-off**: Added complexity for local development

---

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.
