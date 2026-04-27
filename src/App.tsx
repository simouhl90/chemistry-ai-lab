import { LabProvider, useLab } from './context/LabContext';
import { NeuralCanvas } from './components/canvas/NeuralCanvas';
import { TopBar } from './components/layout/TopBar';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { PeriodicTable } from './components/ui/PeriodicTable';
import { ReactionChamber } from './components/ui/ReactionChamber';
import { ElementPropertiesPanel } from './components/data-display/ElementPropertiesPanel';
import { motion } from 'framer-motion';

function MainContent() {
  const { isFocusMode, selectedElement, reactants, experimentCount, discoveries, activityLog } = useLab();

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 5) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="flex-1 flex flex-col gap-5 p-5 overflow-y-auto relative z-10">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <PeriodicTable />
          <ReactionChamber />
        </div>
        
        <div className="space-y-5">
          <ElementPropertiesPanel />
          
          {/* Quick Stats - now real data */}
          <div className="glass-panel rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Quick Stats
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Elements in Chamber</span>
                <span className="font-mono text-cyan-400">{reactants.length}/2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Experiments Run</span>
                <span className="font-mono text-fuchsia-400">{experimentCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Discoveries</span>
                <span className="font-mono text-green-400">{discoveries.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Element</span>
                <span className="font-mono text-yellow-400">{selectedElement ? selectedElement.symbol : 'None'}</span>
              </div>
            </div>
          </div>
          
          {/* Recent Activity - now real data from activity log */}
          <div className="glass-panel rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Recent Activity
            </h3>
            <div className="space-y-2.5 max-h-52 overflow-y-auto">
              {activityLog.length === 0 ? (
                <p className="text-[11px] text-slate-600 italic">No activity yet. Select elements from the periodic table to start experimenting.</p>
              ) : (
                activityLog.slice(0, 8).map((entry) => (
                  <div key={entry.id} className="flex items-center gap-2.5 text-xs">
                    <div className={
                      entry.status === 'success' ? 'w-2 h-2 rounded-full bg-green-400 shrink-0' :
                      entry.status === 'error' ? 'w-2 h-2 rounded-full bg-red-400 shrink-0' :
                      entry.status === 'pending' ? 'w-2 h-2 rounded-full bg-yellow-400 animate-pulse shrink-0' :
                      'w-2 h-2 rounded-full bg-blue-400 shrink-0'
                    } />
                    <span className="text-slate-500 w-14 shrink-0 font-mono text-[10px]">{formatTimeAgo(entry.timestamp)}</span>
                    <span className="text-slate-300">{entry.action}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <LabProvider>
      <div className="h-screen w-screen flex flex-col relative overflow-hidden" style={{ background: '#050b14' }}>
        <NeuralCanvas />
        
        <TopBar />
        
        <div className="flex-1 flex overflow-hidden relative z-10">
          <LeftSidebar />
          <MainContent />
          <RightSidebar />
        </div>
      </div>
    </LabProvider>
  );
}

export default App;
