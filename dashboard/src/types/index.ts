export interface EnvironmentState {
  stepCount: number;
  currentScore: number;
  status: 'idle' | 'running' | 'done';
  baselineAccuracy: number;
  currentBestAccuracy: number;
  lastReward: number;
  available_methods?: string[];
  available_datasets?: string[];
  rewardBreakdown?: {
    hypothesis_quality: number;
    experiment_improvement: number;
    penalties: number;
  };
}

export interface AgentStep {
  id: string;
  stepNumber: number;
  actionType: string;
  content: string;
  hypothesis?: string;
  experiment?: {
    expId?: string;
    method?: string;
    dataset?: string;
  };
  result?: {
    accuracy: number;
    improvement: number;
  };
  reasoning: string;
  reward: number;
}
