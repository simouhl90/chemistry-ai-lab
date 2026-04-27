import { motion, AnimatePresence } from 'framer-motion';
import { useLab } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import { Atom, BrainCircuit, Zap, Microscope, FlaskConical, Radio, Database, Search } from 'lucide-react';

export function TopBar() {
  const { aiStatus } = useLab();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="h-16 border-b border-slate-700/50 flex items-center justify-between px-6 relative z-50"
      style={{ background: 'rgba(5, 11, 20, 0.8)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <BrainCircuit className="w-8 h-8 text-cyan-400" />
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-400/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            CHEMISTRY <span className="text-cyan-400">AI BRAIN</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Experimental Laboratory v2.0.4</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search elements, compounds, reactions..."
            className="bg-transparent border-none outline-none text-sm text-slate-300 w-64 placeholder:text-slate-600"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-slate-400 font-mono">{aiStatus}</span>
        </div>
      </div>
    </motion.header>
  );
}
