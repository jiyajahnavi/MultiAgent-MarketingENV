"""
Deterministic graders for the AI Research Scientist Environment.

Each grader:
    - Takes the full episode state (ResearchState) as input
    - Returns a float score in [0.0, 1.0]
    - Is deterministic (same state → same score)
    - Uses multi-factor scoring (not binary)
    - Rewards partial correctness

Score components:
    1. Hypothesis quality (keyword match + coherence)
    2. Experiment efficiency (how well the agent used its budget)
    3. Result improvement (accuracy gain over baseline)
    4. Reasoning consistency (logical progression of actions)
    5. Final answer quality (closeness to ground truth)
"""

import re
from typing import Optional

from tasks import get_task


def _keyword_overlap_score(text: str, keywords: list) -> float:
    """
    Compute fraction of ground-truth keywords present in `text`.
    Case-insensitive, supports multi-word keywords.
    Returns value in [0.0, 1.0].
    """
    if not text or not keywords:
        return 0.0
    text_lower = text.lower()
    matches = sum(1 for kw in keywords if kw.lower() in text_lower)
    return min(matches / max(len(keywords), 1), 1.0)


def _text_similarity_score(text: str, reference: str) -> float:
    """
    Simple word-overlap Jaccard similarity between text and reference.
    Returns value in [0.0, 1.0].
    """
    if not text or not reference:
        return 0.0
    words_a = set(re.findall(r'\w+', text.lower()))
    words_b = set(re.findall(r'\w+', reference.lower()))
    if not words_a or not words_b:
        return 0.0
    intersection = words_a & words_b
    union = words_a | words_b
    return len(intersection) / len(union)


def _accuracy_improvement_score(
    baseline: float,
    achieved: float,
    optimal: float,
) -> float:
    """
    Score the accuracy improvement relative to the possible range.
    Returns value in [0.0, 1.0].
    """
    possible_gain = optimal - baseline
    if possible_gain <= 0:
        return 1.0 if achieved >= optimal else 0.0
    actual_gain = max(achieved - baseline, 0.0)
    return min(actual_gain / possible_gain, 1.0)


def _experiment_efficiency_score(
    experiments_run: list,
    task_config: dict,
    difficulty: str,
) -> float:
    """
    Score how efficiently the agent used experiments.
    Penalizes:
        - Repeated identical experiments
        - Running too many without improvement
        - Not trying the optimal approach
    Rewards:
        - Diverse method/dataset combinations
        - Finding optimal quickly
    """
    if not experiments_run:
        return 0.0

    # Count unique experiment configurations
    unique_configs = set()
    for exp in experiments_run:
        config = (exp.get("method_id", ""), exp.get("dataset_id", ""))
        unique_configs.add(config)

    # Diversity score: ratio of unique to total experiments
    diversity = len(unique_configs) / max(len(experiments_run), 1)

    # Did the agent find the optimal method?
    optimal_method = task_config.get("optimal_method", "")
    found_optimal = any(
        exp.get("method_id") == optimal_method
        for exp in experiments_run
    )

    # Budget adherence (for hard tasks with experiment budgets)
    budget = task_config.get("experiment_budget", float("inf"))
    over_budget_penalty = 0.0
    if len(experiments_run) > budget:
        over_budget_penalty = 0.3 * min(
            (len(experiments_run) - budget) / budget, 1.0
        )

    score = 0.0
    score += 0.4 * diversity
    score += 0.4 * (1.0 if found_optimal else 0.0)
    score += 0.2 * min(len(experiments_run) / 3, 1.0)  # tried at least 3
    score -= over_budget_penalty

    return max(min(score, 1.0), 0.0)


def _reasoning_consistency_score(state_dict: dict) -> float:
    """
    Score the logical consistency of the agent's research process.
    Checks for:
        - Reading papers before proposing hypotheses
        - Designing experiments before running them
        - Analyzing results after experiments
        - Refining hypothesis based on evidence
    """
    action_sequence = state_dict.get("action_history", [])
    if not action_sequence:
        return 0.0

    action_types = [a.get("action_type", "") for a in action_sequence]

    score = 0.0
    total_checks = 5

    # Check 1: Did the agent read papers at some point?
    if "read_paper" in action_types:
        score += 1.0

    # Check 2: Did the agent propose a hypothesis?
    if "propose_hypothesis" in action_types:
        score += 1.0

    # Check 3: Read papers before first hypothesis?
    if "read_paper" in action_types and "propose_hypothesis" in action_types:
        read_idx = action_types.index("read_paper")
        hyp_idx = action_types.index("propose_hypothesis")
        if read_idx < hyp_idx:
            score += 1.0

    # Check 4: Designed experiment before running one?
    if "design_experiment" in action_types and "run_experiment" in action_types:
        design_idx = action_types.index("design_experiment")
        run_idx = action_types.index("run_experiment")
        if design_idx < run_idx:
            score += 1.0

    # Check 5: Analyzed results after running experiments?
    if "run_experiment" in action_types and "analyze_results" in action_types:
        run_indices = [
            i for i, a in enumerate(action_types) if a == "run_experiment"
        ]
        analyze_indices = [
            i for i, a in enumerate(action_types) if a == "analyze_results"
        ]
        if analyze_indices and run_indices:
            if max(run_indices) < max(analyze_indices):
                score += 1.0

    return score / total_checks


def grade_episode(state_dict: dict) -> float:
    """
    Master grading function. Deterministic, multi-factor, returns [0.0, 1.0].

    Weights (difficulty-dependent):
        Easy:   hypothesis=0.25, experiment=0.15, improvement=0.30, reasoning=0.15, final=0.15
        Medium: hypothesis=0.20, experiment=0.20, improvement=0.25, reasoning=0.15, final=0.20
        Hard:   hypothesis=0.15, experiment=0.25, improvement=0.20, reasoning=0.15, final=0.25
    """
    task_id = state_dict.get("task_id", "")
    try:
        task_config = get_task(task_id)
    except KeyError:
        return 0.0

    difficulty = task_config["difficulty"]

    # ── Component scores ──
    hypothesis_score = _keyword_overlap_score(
        state_dict.get("current_hypothesis", ""),
        task_config.get("ground_truth_keywords", []),
    )

    experiment_score = _experiment_efficiency_score(
        state_dict.get("experiments_run", []),
        task_config,
        difficulty,
    )

    improvement_score = _accuracy_improvement_score(
        task_config.get("baseline_accuracy", 0.0),
        state_dict.get("best_accuracy", 0.0),
        task_config.get("optimal_accuracy", 1.0),
    )

    reasoning_score = _reasoning_consistency_score(state_dict)

    final_answer_score = 0.0
    if state_dict.get("final_answer"):
        final_answer_score = (
            0.5 * _keyword_overlap_score(
                state_dict["final_answer"],
                task_config.get("ground_truth_keywords", []),
            )
            + 0.5 * _text_similarity_score(
                state_dict["final_answer"],
                task_config.get("ground_truth_hypothesis", ""),
            )
        )

    # ── Difficulty-dependent weights ──
    weights = {
        "easy":   (0.25, 0.15, 0.30, 0.15, 0.15),
        "medium": (0.20, 0.20, 0.25, 0.15, 0.20),
        "hard":   (0.15, 0.25, 0.20, 0.15, 0.25),
    }
    w = weights.get(difficulty, weights["medium"])

    total = (
        w[0] * hypothesis_score
        + w[1] * experiment_score
        + w[2] * improvement_score
        + w[3] * reasoning_score
        + w[4] * final_answer_score
    )

    # ── Penalty for not finishing (no final_answer) ──
    if not state_dict.get("final_answer"):
        total *= 0.6  # 40% penalty for incomplete episode

    return round(max(min(total, 1.0), 0.0), 4)


def grade_task(state_dict: dict) -> dict:
    """
    Full grading breakdown for debugging and transparency.
    Returns dict with overall score and component scores.
    """
    task_id = state_dict.get("task_id", "")
    try:
        task_config = get_task(task_id)
    except KeyError:
        return {"score": 0.0, "error": f"Unknown task: {task_id}"}

    hypothesis_score = _keyword_overlap_score(
        state_dict.get("current_hypothesis", ""),
        task_config.get("ground_truth_keywords", []),
    )
    experiment_score = _experiment_efficiency_score(
        state_dict.get("experiments_run", []),
        task_config,
        task_config["difficulty"],
    )
    improvement_score = _accuracy_improvement_score(
        task_config.get("baseline_accuracy", 0.0),
        state_dict.get("best_accuracy", 0.0),
        task_config.get("optimal_accuracy", 1.0),
    )
    reasoning_score = _reasoning_consistency_score(state_dict)

    final_answer_score = 0.0
    if state_dict.get("final_answer"):
        final_answer_score = (
            0.5 * _keyword_overlap_score(
                state_dict["final_answer"],
                task_config.get("ground_truth_keywords", []),
            )
            + 0.5 * _text_similarity_score(
                state_dict["final_answer"],
                task_config.get("ground_truth_hypothesis", ""),
            )
        )

    overall = grade_episode(state_dict)

    return {
        "score": overall,
        "components": {
            "hypothesis_quality": round(hypothesis_score, 4),
            "experiment_efficiency": round(experiment_score, 4),
            "accuracy_improvement": round(improvement_score, 4),
            "reasoning_consistency": round(reasoning_score, 4),
            "final_answer_quality": round(final_answer_score, 4),
        },
        "task_id": task_id,
        "difficulty": task_config["difficulty"],
    }
