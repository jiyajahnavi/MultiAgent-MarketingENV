import { useCallback } from 'react';
import { useEnvironmentStore } from '../store/useEnvironmentStore';
import { api } from '../services/api';

export const useEnvironment = () => {
  const store = useEnvironmentStore();

  const resetEnvironment = useCallback(async () => {
    try {
      store.setEnvState({ status: 'running' });
      const responseData = await api.reset();
      
      const obs = responseData;
      const payload = obs.data || {};
      
      store.reset();
      store.setEnvState({ 
          status: 'idle',
          available_methods: payload.available_methods || ['cnn'],
          available_datasets: payload.available_datasets || ['digits_full'],
          baselineAccuracy: payload.baseline_accuracy || 0.62,
          currentBestAccuracy: payload.baseline_accuracy || 0.62,
      });
    } catch (error) {
      console.error(error);
      store.setEnvState({ status: 'idle' });
    }
  }, [store]);

  const runNextStep = useCallback(async () => {
    // Access direct latest state bypassing closure staleness
    const { envState, steps, isAutoRunning, toggleAutoRun, setEnvState, addStep } = useEnvironmentStore.getState();

    if (envState.status === 'running' || envState.status === 'done') {
        if (isAutoRunning && envState.status === 'done') {
            toggleAutoRun(); // Stop early
        }
        return;
    }
    
    try {
      setEnvState({ status: 'running' });
      
      const stepCount = envState.stepCount;
      const history = steps;

      // Decide next action structurally to feed to API (acting as a basic baseline agent)
      let actionType = 'read_paper';
      let content = 'all';
      
      const successfulExperiments = history.filter(s => s.actionType === 'run_experiment' && s.reward > 0).length;
      const ranExperiments = history.filter(s => s.actionType === 'run_experiment').length;

      if (stepCount === 0) {
          actionType = 'read_paper';
          content = 'all';
      } else if (stepCount === 1) {
          actionType = 'propose_hypothesis';
          content = 'Hypothesis: The methods will yield optimal accuracy if properly evaluated across multiple experiments.';
      } else if (successfulExperiments < 3 && stepCount < 10) {
          const lastAction = history[history.length - 1];
          const isDesigning = lastAction?.actionType !== 'design_experiment';
          
          if (isDesigning) {
              actionType = 'design_experiment';
              
              const validMethods = envState.available_methods || ['cnn'];
              const validDatasets = envState.available_datasets || ['digits_full'];
              
              const method = validMethods[successfulExperiments % validMethods.length];
              const dataset = validDatasets[successfulExperiments % validDatasets.length];
              
              content = `${method}:${dataset}`;
          } else {
              actionType = 'run_experiment';
              // Backend returns "experiment_id" AND "exp_id" alias now
              const previousExpId = lastAction.experiment?.expId || 'exp_' + (ranExperiments + 1);
              content = previousExpId; 
          }
      } else if (history[history.length - 1]?.actionType === 'run_experiment' || history[history.length - 1]?.actionType === 'design_experiment') {
          actionType = 'analyze_results';
          content = 'all';
      } else {
          actionType = 'final_answer';
          // Try to give the actual optimal method from analysis
          content = `Final Decision: Based on the experiments, the selected method achieves high accuracy.`;
      }

      // Execute Real Backend Step
      const responseData = await api.step(actionType, content);
      
      // obs is the TOP level response: { message, data, reward, score, done, ... }
      const obs = responseData;
      // payload is the inner meta dict: { experiment_id, method_id, dataset_id, ... }
      const payload = obs.data || {};
      
      const isFinal = actionType === 'final_answer';
      const isHypothesis = actionType === 'propose_hypothesis';
      const isExperiment = actionType === 'run_experiment';
      const isDesign = actionType === 'design_experiment';
      
      let newBestAcc = envState.currentBestAccuracy;
      let expResult = undefined;
      
      if (isExperiment && payload.accuracy !== undefined) {
         expResult = { 
             accuracy: payload.accuracy, 
             improvement: payload.accuracy - envState.currentBestAccuracy 
         };
         if (payload.accuracy > envState.currentBestAccuracy) {
             newBestAcc = payload.accuracy;
         }
      }

      const newStep = {
        id: crypto.randomUUID(),
        stepNumber: obs.step_number || (envState.stepCount + 1),
        actionType,
        content,
        reasoning: obs.message,
        hypothesis: isHypothesis ? content : undefined,
        experiment: (isDesign || isExperiment) && payload ? { 
            expId: payload.experiment_id || payload.exp_id, 
            method: payload.method_id, 
            dataset: payload.dataset_id 
        } : undefined,
        result: expResult,
        reward: obs.reward || 0,
      };

      addStep(newStep);
      
      setEnvState({
        stepCount: envState.stepCount + 1,
        lastReward: obs.reward || 0,
        currentScore: obs.score || 0,
        currentBestAccuracy: newBestAcc, 
        status: (isFinal || obs.done) ? 'done' : 'idle',
      });

      if ((isFinal || obs.done) && isAutoRunning) {
          toggleAutoRun(); // Gracefully stop
      }

    } catch (error) {
      console.error(error);
      useEnvironmentStore.getState().setEnvState({ status: 'idle' });
    }
  }, []);

  return {
    ...store,
    resetEnvironment,
    runNextStep
  };
};
