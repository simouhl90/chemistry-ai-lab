import { motion, AnimatePresence } from 'framer-motion';
import { useLab } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import { Atom, Zap, ArrowRight } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'alkali metal': '#ef4444',
  'alkaline earth metal': '#f97316',
  'transition metal': '#eab308',
  'post-transition metal': '#06b6d4',
  'metalloid': '#10b981',
  'diatomic nonmetal': '#6366f1',
  'polyatomic nonmetal': '#3b82f6',
  'noble gas': '#14b8a6',
  'lanthanide': '#ec4899',
  'actinide': '#d946ef',
  'unknown': '#9ca3af',
};

export function ElementPropertiesPanel() {
  const { selectedElement, setSelectedElement, addReactant } = useLab();

  return (
    <AnimatePresence>
      {selectedElement && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25 }}
          className="glass-panel rounded-xl p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-gray-800"
                style={{ 
                  backgroundColor: categoryColors[selectedElement.category] + '20',
                  border: `2px solid ${categoryColors[selectedElement.category]}`,
                }}
              >
                {selectedElement.symbol}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{selectedElement.name}</h3>
                <p className="text-[10px] text-gray-500 capitalize">{selectedElement.category}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedElement(null)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-gray-400 rotate-45" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-[10px] text-gray-500 uppercase">Atomic Number</div>
              <div className="text-lg font-mono text-blue-700">{selectedElement.atomicNumber}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-[10px] text-gray-500 uppercase">Atomic Mass</div>
              <div className="text-lg font-mono text-blue-700">{selectedElement.atomicMass}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-[10px] text-gray-500 uppercase">Electronegativity</div>
              <div className="text-lg font-mono text-blue-700">
                {selectedElement.electronegativity || 'N/A'}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-[10px] text-gray-500 uppercase">Phase at STP</div>
              <div className={cn(
                'text-lg font-mono',
                selectedElement.phase === 'Gas' ? 'text-indigo-600' :
                selectedElement.phase === 'Liquid' ? 'text-emerald-600' :
                selectedElement.phase === 'Solid' ? 'text-amber-600' :
                'text-gray-600'
              )}>
                {selectedElement.phase}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-2 mb-3">
            <div className="text-[10px] text-gray-500 uppercase mb-1">Electron Configuration</div>
            <div className="text-sm font-mono text-blue-700">{selectedElement.electronConfiguration}</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => addReactant(selectedElement)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-xs text-white font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-3 h-3" />
              Add to Reaction
            </button>
            <button
              onClick={() => setSelectedElement(null)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
