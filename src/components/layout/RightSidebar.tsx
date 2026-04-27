import { motion, AnimatePresence } from 'framer-motion';
import { useLab } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import { BrainCircuit, FlaskConical, Zap, Microscope, Radio, Database, Activity, Clock, AlertCircle, Beaker, Star, FileText } from 'lucide-react';
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
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <BrainCircuit className="w-4 h-4 text-cyan-400" />
        AI Cortex Status
      </div>
      
      <div className="font-mono text-xs space-y-1 max-h-32 overflow-y-auto">
        {statusHistory.map((status, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              'flex items-center gap-2',
              i === statusHistory.length - 1 ? 'text-cyan-400' : 'text-slate-600'
            )}
          >
            <span className="text-[10px]">{new Date().toLocaleTimeString()}</span>
            <span>&gt; {status}</span>
            {i === statusHistory.length - 1 && isSynthesizing && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-cyan-400"
              >
                _
              </motion.span>
            )}
          </motion.div>
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
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Star className="w-4 h-4 text-yellow-400" />
          Discovery Log
        </div>
        <span className="text-[10px] text-slate-600 font-mono">{discoveries.length} entries</span>
      </div>
      
      {discoveries.length === 0 ? (
        <div className="text-[11px] text-slate-600 italic py-4 text-center">
          No discoveries yet. Run experiments to discover new compounds.
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <AnimatePresence>
            {discoveries.map((discovery, index) => (
              <motion.div
                key={discovery.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50 cursor-pointer hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{discovery.title}</span>
                  <span className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded font-mono',
                    discovery.confidence > 80 ? 'bg-green-500/20 text-green-400' :
                    discovery.confidence > 50 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  )}>
                    {discovery.confidence.toFixed(1)}%
                  </span>
                </div>
                <div className="font-mono text-sm text-cyan-400 mb-1">{discovery.formula}</div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Clock className="w-3 h-3" />
                  {discovery.timestamp.toLocaleTimeString()}
                  <span className="px-1.5 py-0.5 rounded bg-slate-700/50">{discovery.category}</span>
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
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <Radio className="w-4 h-4 text-green-400" />
        Research Feed
      </div>
      
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-l-2 border-slate-700 pl-3 py-1 cursor-pointer hover:border-cyan-400 transition-colors"
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <div className="text-xs font-medium text-slate-300 hover:text-white transition-colors">
              {item.title}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
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
                  className="text-xs text-slate-400 mt-1 overflow-hidden"
                >
                  {item.summary}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function RightSidebar() {
  const { experimentCount, discoveries, reactants, reactionResult } = useLab();

  const avgConfidence = discoveries.length > 0
    ? (discoveries.reduce((sum, d) => sum + d.confidence, 0) / discoveries.length).toFixed(1)
    : '0.0';

  const successRate = experimentCount > 0
    ? ((discoveries.length / experimentCount) * 100).toFixed(0)
    : '0';

  return (
    <motion.aside
      initial={{ x: 250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-80 border-l border-slate-700/50 flex flex-col gap-4 p-4 overflow-y-auto"
      style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}
    >
      <AIStatusPanel />
      <DiscoveryLog />
      <NewsFeed />
      
      {/* Session Stats - real data */}
      <div className="glass-panel rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Activity className="w-4 h-4 text-fuchsia-400" />
          Session Stats
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800/50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-cyan-400 font-mono">{experimentCount}</div>
            <div className="text-[10px] text-slate-500">Experiments</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-green-400 font-mono">{discoveries.length}</div>
            <div className="text-[10px] text-slate-500">Discoveries</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-yellow-400 font-mono">{avgConfidence}%</div>
            <div className="text-[10px] text-slate-500">Avg Confidence</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-fuchsia-400 font-mono">{successRate}%</div>
            <div className="text-[10px] text-slate-500">Discovery Rate</div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
