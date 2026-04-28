import { motion, AnimatePresence } from 'framer-motion';
import { useLab, backgroundThemes } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import { Atom, BrainCircuit, Search, Palette } from 'lucide-react';
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
    <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 relative z-50 bg-white/80" style={{ backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center gap-3">
        <BrainCircuit className="w-7 h-7 text-blue-600" />
        <div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900">
            CHEMISTRY <span className="text-blue-600">AI BRAIN</span>
          </h1>
          <p className="text-[9px] text-gray-400 font-mono tracking-widest uppercase">Experimental Laboratory v2.0.4</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowThemes(!showThemes)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              'border',
              showThemes
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800'
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
                className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-200 overflow-hidden shadow-lg"
                style={{ background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(16px)' }}
              >
                <div className="p-1.5">
                  {backgroundThemes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => { setBackgroundTheme(theme.id); setShowThemes(false); }}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
                        backgroundTheme === theme.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      <span className="text-base w-6 text-center">{theme.icon}</span>
                      <span className="flex-1 text-left text-xs font-medium">{theme.label}</span>
                      {backgroundTheme === theme.id && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search elements..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 w-40 placeholder:text-gray-300"
          />
        </div>
        
        {/* Status */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-gray-500 font-mono max-w-48 truncate">{aiStatus}</span>
        </div>
      </div>
    </header>
  );
}
