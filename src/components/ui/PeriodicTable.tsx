import { motion } from 'framer-motion';
import { useLab } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import { elements } from '../../data/elements';
import type { ChemicalElement } from '../../types';

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  'alkali metal': { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
  'alkaline earth metal': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
  'transition metal': { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
  'post-transition metal': { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700' },
  'metalloid': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
  'diatomic nonmetal': { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
  'polyatomic nonmetal': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  'noble gas': { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700' },
  'lanthanide': { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700' },
  'actinide': { bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-700' },
  'unknown': { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600' },
};

function ElementTile({ element, index }: { element: ChemicalElement; index: number }) {
  const { selectedElement, setSelectedElement, addReactant, activeCategory, reactants } = useLab();
  const isSelected = selectedElement?.atomicNumber === element.atomicNumber;
  const isInChamber = reactants.some(r => r.element.atomicNumber === element.atomicNumber);
  const isFiltered = activeCategory && element.category !== activeCategory;
  const colors = categoryColors[element.category] || categoryColors['unknown'];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isFiltered ? 0.15 : 1, 
        scale: 1,
        filter: isFiltered ? 'blur(1px)' : 'blur(0px)'
      }}
      transition={{ delay: index * 0.003, duration: 0.3 }}
      whileHover={{ scale: 1.15, zIndex: 50 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => {
        setSelectedElement(element);
        addReactant(element);
      }}
      className={cn(
        'relative w-full aspect-square rounded-md border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer',
        colors.bg, colors.border,
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50 scale-110 z-10 border-blue-400' : 'hover:bg-blue-50/50',
        isInChamber && !isSelected ? 'ring-2 ring-purple-400 bg-purple-50 border-purple-300' : '',
      )}
      style={{
        gridColumn: element.xpos,
        gridRow: element.ypos > 7 ? element.ypos - 2 : element.ypos,
      }}
      title={`${element.name} (${element.symbol}) - ${element.category}`}
    >
      <span className="text-[7px] text-gray-400 font-mono absolute top-0 left-0.5">{element.atomicNumber}</span>
      <span className="text-[11px] font-bold text-gray-800 leading-tight">{element.symbol}</span>
      <span className="text-[6px] text-gray-500 truncate w-full text-center px-0.5 leading-tight">{element.name}</span>
      <span className="text-[5px] text-gray-400 font-mono">{element.atomicMass.toFixed(1)}</span>
    </motion.button>
  );
}

export function PeriodicTable() {
  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"/>
          </svg>
          Periodic Table of Elements
        </h2>
        <span className="text-[10px] text-gray-400 font-mono">{elements.length} Elements | Click to select</span>
      </div>
      
      <div 
        className="grid gap-[3px]"
        style={{ 
          gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(7, minmax(0, 1fr))'
        }}
      >
        {elements.map((element, index) => (
          <ElementTile key={element.atomicNumber} element={element} index={index} />
        ))}
      </div>
    </div>
  );
}
