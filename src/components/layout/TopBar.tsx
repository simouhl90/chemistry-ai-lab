import { motion, AnimatePresence } from 'framer-motion';
import { useLab, backgroundThemes, type BackgroundTheme } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import { Atom, BrainCircuit, Zap, Microscope, FlaskConical, Radio, Database, Search, Palette } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function TopBar() {
  const { aiStatus, backgroundTheme, setBackgroundTheme } = useLab();
  const [showThemes, setShowThemes] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowThemes(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

      <div className="flex items-center gap-4">
        {/* Theme selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowThemes(!showThemes)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              'border',
              showThemes
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            )}
          >
            <Palette className="w-4 h-4" />
            <span>Theme</span>
            <span className="text-[10px] opacity-60">{backgroundThemes.find(t => t.id === backgroundTheme)?.icon}</span>
          </button>

          <AnimatePresence>
            {showThemes && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-700/50 overflow-hidden"
                style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)' }}
              >
                <div className="p-1.5">
                  {backgroundThemes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => { setBackgroundTheme(theme.id); setShowThemes(false); }}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
                        backgroundTheme === theme.id
                          ? 'bg-cyan-500/15 text-cyan-400'
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                      )}
                    >
                      <span className="text-base w-6 text-center">{theme.icon}</span>
                      <span className="flex-1 text-left text-xs font-medium">{theme.label}</span>
                      {backgroundTheme === theme.id && (
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search elements..."
            className="bg-transparent border-none outline-none text-sm text-slate-300 w-48 placeholder:text-slate-600"
          />
        </div>
        
        {/* Status */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-slate-400 font-mono max-w-48 truncate">{aiStatus}</span>
        </div>
      </div>
    </motion.header>
  );
}
