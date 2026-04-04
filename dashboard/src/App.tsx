
import { Controls } from './components/Controls';
import { Timeline } from './components/Timeline';
import { AgentState } from './components/AgentState';
import { MetricsPanel } from './components/MetricsPanel';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100/50">
      <Controls />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto w-full h-[calc(100vh-8rem)]">
          {/* Main 3-column Layout */}
          <div className="flex gap-6 h-full">
            
            {/* Left Column: Timeline */}
            <div className="w-[300px] shrink-0">
              <Timeline />
            </div>

            {/* Center Column: Live Agent State */}
            <div className="flex-1 min-w-0">
              <AgentState />
            </div>

            {/* Right Column: Score & Metrics */}
            <div className="w-[300px] shrink-0">
              <MetricsPanel />
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
