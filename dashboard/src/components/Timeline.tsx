import React, { useEffect, useRef } from 'react';
import { useEnvironmentStore } from '../store/useEnvironmentStore';
import { BookOpen, Lightbulb, FlaskConical, PlayCircle, BarChart } from 'lucide-react';
import clsx from 'clsx';

const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case 'read_paper': return <BookOpen size={16} />;
    case 'propose_hypothesis': return <Lightbulb size={16} />;
    case 'design_experiment': return <FlaskConical size={16} />;
    case 'run_experiment': return <PlayCircle size={16} />;
    case 'analyze_result': return <BarChart size={16} />;
    default: return <BookOpen size={16} />;
  }
};

const getActionColor = (actionType: string) => {
  switch (actionType) {
    case 'read_paper': return 'bg-blue-100 text-blue-600';
    case 'propose_hypothesis': return 'bg-purple-100 text-purple-600';
    case 'design_experiment': return 'bg-orange-100 text-orange-600';
    case 'run_experiment': return 'bg-pink-100 text-pink-600';
    case 'analyze_result': return 'bg-success/20 text-success';
    default: return 'bg-slate-100 text-slate-600';
  }
};

export const Timeline: React.FC = () => {
  const steps = useEnvironmentStore((state) => state.steps);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [steps]);

  return (
    <div className="flex flex-col h-full bg-panel rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Research Timeline</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {steps.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-400 italic">
            Waiting for simulation to start...
          </div>
        ) : (
          <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <div key={step.id} className={clsx("relative", isLast ? "opacity-100" : "opacity-70")}>
                  <div className={clsx(
                    "absolute -left-[25px] flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white",
                    getActionColor(step.actionType)
                  )}>
                    {getActionIcon(step.actionType)}
                  </div>
                  <div className="pl-2">
                    <span className="text-xs font-semibold text-slate-400">Step {step.stepNumber}</span>
                    <h3 className="text-sm font-medium text-slate-800 capitalize mt-0.5">
                      {step.actionType.replace('_', ' ')}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
