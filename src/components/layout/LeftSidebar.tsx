import { motion } from 'framer-motion';
import { useLab } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import { elements } from '../../data/elements';
import { Atom, FlaskConical, Zap, Radio, Database, Beaker, CircleDot, Hexagon, Diamond, Square, Triangle, Star, Circle } from 'lucide-react';

const categories = [
  { name: 'alkali metal', label: 'Alkali Metals', color: '#ef4444', icon: Zap },
  { name: 'alkaline earth metal', label: 'Alkaline Earth', color: '#f97316', icon: Flame },
  { name: 'transition metal', label: 'Transition Metals', color: '#eab308', icon: Hexagon },
  { name: 'post-transition metal', label: 'Post-Transition', color: '#06b6d4', icon: Square },
  { name: 'metalloid', label: 'Metalloids', color: '#10b981', icon: Diamond },
  { name: 'diatomic nonmetal', label: 'Diatomic Nonmetals', color: '#6366f1', icon: CircleDot },
  { name: 'polyatomic nonmetal', label: 'Polyatomic Nonmetals', color: '#3b82f6', icon: Triangle },
  { name: 'noble gas', label: 'Noble Gases', color: '#14b8a6', icon: Circle },
  { name: 'lanthanide', label: 'Lanthanides', color: '#ec4899', icon: Star },
  { name: 'actinide', label: 'Actinides', color: '#d946ef', icon: Atom },
];

function Flame(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 0-7 4-7 11 0 3.86 3.14 7 7 7s7-3.14 7-7c0-7-7-11-7-11z"/>
      <path d="M12 14c-1.1 0-2-.9-2-2"/>
    </svg>
  );
}

export function LeftSidebar() {
  const { activeCategory, setActiveCategory } = useLab();

  return (
    <aside
      className="w-60 border-r border-gray-200 flex flex-col bg-white/60"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <Database className="w-4 h-4" />
          Element Groups
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3',
            activeCategory === null
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          )}
        >
          <Atom className="w-4 h-4" />
          All Elements
        </button>
        
        {categories.map((cat) => {
          const Icon = cat.icon;
          const count = elements.filter(e => e.category === cat.name).length;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 border-l-2',
                activeCategory === cat.name
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 border-l-transparent'
              )}
            >
              <Icon className="w-4 h-4" style={{ color: cat.color }} />
              <span className="flex-1">{cat.label}</span>
              <span className="text-xs text-gray-400 font-mono">{count}</span>
            </button>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="text-[10px] text-gray-400 font-mono space-y-1.5">
          <div className="flex justify-between">
            <span>Total Elements</span>
            <span className="text-blue-600 font-medium">{elements.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Element Groups</span>
            <span className="text-blue-600 font-medium">{categories.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Data Source</span>
            <span className="text-emerald-600 font-medium">Local DB</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
