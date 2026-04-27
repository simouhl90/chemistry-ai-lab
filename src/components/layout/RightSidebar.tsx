import { motion, AnimatePresence } from 'framer-motion';
import { useLab } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import { BrainCircuit, FlaskConical, Activity, Clock, Star, FileText, Zap } from 'lucide-react';
import { useState } from 'react';

function AIStatusPanel() {
  const { aiStatus, isSynthesizing } = useLab();
  
  const statusHistory = [
    'System initialized...',
    'Loading element database...',
    'Periodic table synced (118 elements)',
    'Reaction engine ready',
    aiStatus,
  ];

  return (
    <div className="glass-panel rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
        <BrainCircuit className="w-4 h-4 text-blue-600" />
        AI Cortex Status
      </div>
      
      <div className="font-mono text-xs space-y-1 max-h-32 overflow-y-auto">
        {statusHistory.map((status, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center gap-2',
              i === statusHistory.length - 1 ? 'text-blue-700 font-medium' : 'text-gray-400'
            )}
          >
            <span className="text-[10px]">{new Date().toLocaleTimeString()}</span>
            <span>&gt; {status}</span>
            {i === statusHistory.length - 1 && isSynthesizing && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-blue-600"
              >
                _
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscoveryLog() {
  const { discoveries } = useLab();
  
  return (
    <div className="glass-panel rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <Star className="w-4 h-4 text-amber-500" />
          Discovery Log
        </div>
        <span className="text-[10px] text-gray-400 font-mono">{discoveries.length} entries</span>
      </div>
      
      {discoveries.length === 0 ? (
        <div className="text-[11px] text-gray-400 italic py-4 text-center">
          No discoveries yet. Run experiments to discover new compounds.
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <AnimatePresence>
            {discoveries.map((discovery, index) => (
              <motion.div
                key={discovery.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg p-3 border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900">{discovery.title}</span>
                  <span className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded font-mono',
                    discovery.confidence > 80 ? 'bg-emerald-50 text-emerald-700' :
                    discovery.confidence > 50 ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-600'
                  )}>
                    {discovery.confidence.toFixed(1)}%
                  </span>
                </div>
                <div className="font-mono text-sm text-blue-700 mb-1">{discovery.formula}</div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <Clock className="w-3 h-3" />
                  {discovery.timestamp.toLocaleTimeString()}
                  <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{discovery.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function NewsFeed() {
  const { news } = useLab();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="glass-panel rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
        <FileText className="w-4 h-4 text-emerald-600" />
        Research Feed
      </div>
      
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {news.map((item, index) => (
          <div
            key={item.id}
            className="border-l-2 border-gray-200 pl-3 py-1 cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <div className="text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors">
              {item.title}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
              <FileText className="w-3 h-3" />
              {item.source}
              <span>{item.date}</span>
            </div>
            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="text-xs text-gray-500 mt-1 overflow-hidden"
                >
                  {item.summary}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RightSidebar() {
  const { experimentCount, discoveries } = useLab();

  const avgConfidence = discoveries.length > 0
    ? (discoveries.reduce((sum, d) => sum + d.confidence, 0) / discoveries.length).toFixed(1)
    : '0.0';

  const successRate = experimentCount > 0
    ? ((discoveries.length / experimentCount) * 100).toFixed(0)
    : '0';

  return (
    <aside className="w-72 border-l border-gray-200 flex flex-col gap-4 p-4 overflow-y-auto bg-white/60" style={{ backdropFilter: 'blur(8px)' }}>
      <AIStatusPanel />
      <DiscoveryLog />
      <NewsFeed />
      
      {/* Session Stats */}
      <div className="glass-panel rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <Activity className="w-4 h-4 text-purple-600" />
          Session Stats
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-blue-700 font-mono">{experimentCount}</div>
            <div className="text-[10px] text-gray-500">Experiments</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-emerald-700 font-mono">{discoveries.length}</div>
            <div className="text-[10px] text-gray-500">Discoveries</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-amber-700 font-mono">{avgConfidence}%</div>
            <div className="text-[10px] text-gray-500">Avg Confidence</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-purple-700 font-mono">{successRate}%</div>
            <div className="text-[10px] text-gray-500">Discovery Rate</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
