import React, { useEffect } from 'react';
import { Play, RotateCcw, Power, Pause } from 'lucide-react';
import { useEnvironment } from '../hooks/useEnvironment';
import clsx from 'clsx';

export const Controls: React.FC = () => {
  const { runNextStep, resetEnvironment, toggleAutoRun, isAutoRunning, envState } = useEnvironment();
  const isRunning = envState.status === 'running';

  useEffect(() => {
    let interval: number;
    if (isAutoRunning && !isRunning) {
      interval = window.setInterval(() => {
        runNextStep();
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAutoRunning, isRunning, runNextStep]);

  return (
    <div className="flex items-center justify-between p-4 bg-panel shadow-sm border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
          <Power size={18} />
        </div>
        <h1 className="text-lg font-semibold text-slate-800">AI Research Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={resetEnvironment}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <RotateCcw size={16} />
          Reset Episode
        </button>

        <button
          onClick={runNextStep}
          disabled={isRunning || isAutoRunning}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm shadow-primary-500/20 transition-all disabled:opacity-50"
        >
          <Play size={16} />
          Run Next Step
        </button>

        <button
          onClick={toggleAutoRun}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
            isAutoRunning 
              ? "bg-warning/10 text-warning hover:bg-warning/20" 
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          )}
        >
          {isAutoRunning ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
          Auto Run
        </button>
      </div>
    </div>
  );
};
