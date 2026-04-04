import React from 'react';
import { useEnvironmentStore } from '../store/useEnvironmentStore';
import { Trophy, Activity, Hash, Layers } from 'lucide-react';
import clsx from 'clsx';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export const MetricsPanel: React.FC = () => {
  const envState = useEnvironmentStore((state) => state.envState);
  const steps = useEnvironmentStore((state) => state.steps);

  const chartData = steps.map(s => ({
    step: s.stepNumber,
    score: s.reward
  }));

  const accProgress = Math.min(100, Math.max(0, ((envState.currentBestAccuracy - envState.baselineAccuracy) / 0.15) * 100));

  return (
    <div className="flex flex-col h-full bg-panel rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Metrics & Score</h2>
        <div className={clsx(
          "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
          envState.status === 'running' ? "bg-primary-100 text-primary-700" :
          envState.status === 'idle' ? "bg-slate-100 text-slate-600" :
          "bg-success/20 text-success"
        )}>
          {envState.status}
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        
        {/* TOTAL SCORE */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-lg shadow-indigo-500/20">
          <div className="flex items-center gap-2 text-indigo-100 mb-1">
            <Trophy size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Total Score</span>
          </div>
          <div className="text-4xl font-black">
            {envState.currentScore.toLocaleString()}
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-1 text-slate-400 mb-1">
              <Hash size={14} />
              <span className="text-[10px] font-bold uppercase">Step Count</span>
            </div>
            <div className="text-lg font-bold text-slate-700">{envState.stepCount}</div>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-1 text-slate-400 mb-1">
              <Activity size={14} />
              <span className="text-[10px] font-bold uppercase">Last Reward</span>
            </div>
            <div className={clsx(
              "text-lg font-bold", 
              envState.lastReward > 0 ? "text-success" : "text-slate-700"
            )}>
              {envState.lastReward > 0 ? '+' : ''}{envState.lastReward.toFixed(1)}
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>Accuracy Prog.</span>
            <span>{(envState.baselineAccuracy * 100).toFixed(0)}% base</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-500 ease-out rounded-full relative"
              style={{ width: `${accProgress}%`, minWidth: '5%' }}
            >
               <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <div className="w-[200%] h-full bg-white/20 animate-[slide_2s_linear_infinite]" 
                       style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'}}/>
               </div>
            </div>
          </div>
        </div>

        {/* REWARD BREAKDOWN */}
        {envState.rewardBreakdown && (
          <div className="border border-slate-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2 text-slate-800">
              <Layers size={14} />
              <span className="text-xs font-bold uppercase">Reward Breakdown</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Hypothesis Quality</span>
                <span className="font-semibold text-purple-600">+{envState.rewardBreakdown.hypothesis_quality}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Exp. Improvement</span>
                <span className="font-semibold text-success">+{envState.rewardBreakdown.experiment_improvement}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Penalties</span>
                <span className="font-semibold text-warning">{envState.rewardBreakdown.penalties}</span>
              </div>
            </div>
          </div>
        )}

        {/* MINI CHART */}
        {steps.length > 1 && (
          <div className="h-24 mt-4 w-full opacity-70">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <YAxis domain={['auto', 'auto']} hide />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#6366f1" 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
