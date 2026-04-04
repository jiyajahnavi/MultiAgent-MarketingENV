import React from 'react';
import { useEnvironmentStore } from '../store/useEnvironmentStore';
import { Brain, Target, Beaker, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-500 bg-red-50 rounded-md">Error rendering AgentState. Please refresh.</div>;
    }
    return this.props.children;
  }
}

const AgentStateContent: React.FC = () => {
  const steps = useEnvironmentStore((state) => state.steps);
  const status = useEnvironmentStore((state) => state.envState.status);
  
  const currentStep = steps.length > 0 ? steps[steps.length - 1] : null;

  if (!currentStep) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-panel rounded-2xl shadow-soft border border-slate-100 p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
          <Brain size={32} />
        </div>
        <h2 className="text-xl font-semibold text-slate-700">Agent Idle</h2>
        <p className="text-slate-500 mt-2 max-w-sm">Press "Run Next Step" to observe the agent's thought process and reasoning.</p>
      </div>
    );
  }

  // Find the last known hypothesis, experiment, result from history
  const lastHypothesis = [...steps].reverse().find(s => s.hypothesis)?.hypothesis;
  const lastExperiment = [...steps].reverse().find(s => s.experiment)?.experiment;
  const lastResult = [...steps].reverse().find(s => s.result)?.result;

  return (
    <div className="flex-1 flex flex-col bg-panel rounded-2xl shadow-soft border border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600" />
      
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider bg-primary-50 px-2 py-1 rounded-md">
            Step {currentStep.stepNumber}
          </span>
          <h2 className="text-xl font-semibold text-slate-800 mt-2 capitalize flex items-center gap-2">
            {currentStep.actionType.replace(/_/g, ' ')}
            {status === 'running' && (
              <span className="flex h-3 w-3 relative ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
              </span>
            )}
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* REASONING CARD (CRITICAL) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`reasoning-${currentStep.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5"
          >
            <div className="flex gap-3 mb-2">
              <Brain className="text-indigo-500" size={20} />
              <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Why this decision?</h3>
            </div>
            <p className="text-indigo-800/80 pl-8 leading-relaxed text-sm">
              {currentStep.reasoning}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-4">
          {/* HYPOTHESIS */}
          <div className="col-span-2 sm:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-purple-500" />
              <h4 className="text-xs font-bold text-slate-500 uppercase">Active Hypothesis</h4>
            </div>
            <p className="text-sm text-slate-700 italic">
              {lastHypothesis ? `"${lastHypothesis}"` : "Waiting for hypothesis..."}
            </p>
          </div>

          {/* EXPERIMENT */}
          <div className="col-span-2 sm:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Beaker size={16} className="text-orange-500" />
              <h4 className="text-xs font-bold text-slate-500 uppercase">Current Experiment</h4>
            </div>
            {lastExperiment ? (
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Method:</span>
                  <span className="font-medium text-right">{lastExperiment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dataset:</span>
                  <span className="font-medium">{lastExperiment.dataset}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">No active experiment.</p>
            )}
          </div>
        </div>

        {/* RESULTS */}
        <AnimatePresence>
          {lastResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border text-center border-success/20 rounded-xl p-5 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-bl-full -z-10" />
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap size={18} className="text-success" />
                <h4 className="text-sm font-bold text-success uppercase tracking-widest">Latest Result</h4>
              </div>
              <div className="flex items-end justify-center gap-4 mt-4">
                <div className="text-3xl font-black text-slate-800">
                  {(lastResult.accuracy * 100).toFixed(1)}%
                </div>
                {lastResult.improvement > 0 && (
                  <div className="text-sm font-bold text-success bg-success/10 px-2 py-1 rounded-md mb-1">
                    +{ (lastResult.improvement * 100).toFixed(2) }%
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const AgentState: React.FC = () => (
  <ErrorBoundary>
    <AgentStateContent />
  </ErrorBoundary>
);
