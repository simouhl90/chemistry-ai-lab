import { motion, AnimatePresence } from 'framer-motion';
import { useLab } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import { FlaskConical, Zap, Beaker, X, RotateCcw, Thermometer, Gauge, Trash2, RefreshCw, Plus } from 'lucide-react';
import { useState } from 'react';

function ReactionFlask({ reactant, position, onRemove, onReplace }: { reactant: any; position: 'left' | 'right'; onRemove: () => void; onReplace: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      className="relative flex flex-col items-center gap-2"
    >
      <div className={cn(
        'w-36 h-44 relative flex flex-col items-center justify-end pb-4 rounded-xl border-2',
        position === 'left' ? 'border-blue-300 bg-blue-50' : 'border-purple-300 bg-purple-50'
      )}>
        <motion.div
          animate={{ 
            height: ['55%', '60%', '55%'],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className={cn(
            'absolute bottom-0 left-0 right-0 rounded-b-xl',
            position === 'left' ? 'bg-blue-200' : 'bg-purple-200'
          )}
        />
        
        <div className="relative z-10 text-center">
          <div className="text-3xl font-bold text-gray-800">{reactant.element.symbol}</div>
          <div className="text-xs text-gray-600 mt-1">{reactant.element.name}</div>
          <div className="text-[10px] text-gray-400 font-mono mt-1">
            EN: {reactant.element.electronegativity || 'N/A'}
          </div>
          <div className="text-[10px] text-gray-400 font-mono">
            Mass: {reactant.element.atomicMass}
          </div>
        </div>
        
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
          title="Remove element"
        >
          <X className="w-3 h-3 text-gray-500" />
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-400 font-mono uppercase">
          {position === 'left' ? 'Reactant A' : 'Reactant B'}
        </span>
        <button
          onClick={onReplace}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors text-gray-600"
          title="Replace with another element"
        >
          <RefreshCw className="w-3 h-3" />
          Replace
        </button>
      </div>
    </motion.div>
  );
}

function EmptyFlask({ position }: { position: 'left' | 'right' }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        'w-36 h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center',
        position === 'left' ? 'border-blue-200 bg-blue-50/50' : 'border-purple-200 bg-purple-50/50'
      )}>
        <FlaskConical className={cn(
          'w-10 h-10 mb-3',
          position === 'left' ? 'text-blue-300' : 'text-purple-300'
        )} />
        <span className="text-xs text-gray-400 font-mono">
          Click element to add
        </span>
        <Plus className={cn(
          'w-5 h-5 mt-2 rounded-full border',
          position === 'left' ? 'text-blue-300 border-blue-200' : 'text-purple-300 border-purple-200'
        )} />
      </div>
      <span className="text-[10px] text-gray-400 font-mono uppercase">
        {position === 'left' ? 'Reactant A' : 'Reactant B'}
      </span>
    </div>
  );
}

function SynthesizeButton() {
  const { synthesize, isSynthesizing, reactants } = useLab();
  const canSynthesize = reactants.length === 2;

  return (
    <motion.button
      whileHover={{ scale: canSynthesize ? 1.08 : 1 }}
      whileTap={{ scale: canSynthesize ? 0.92 : 1 }}
      onClick={synthesize}
      disabled={!canSynthesize || isSynthesizing}
      className={cn(
        'w-20 h-20 rounded-full flex items-center justify-center relative transition-all duration-300',
        canSynthesize 
          ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white cursor-pointer shadow-lg shadow-blue-200'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      )}
      title={canSynthesize ? 'Run synthesis' : 'Add 2 elements first'}
    >
      {isSynthesizing ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Zap className="w-8 h-8" />
        </motion.div>
      ) : (
        <Zap className="w-8 h-8" />
      )}
      
      {canSynthesize && !isSynthesizing && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}

function ReactionOutput() {
  const { reactionResult, isSynthesizing, clearReactants } = useLab();

  return (
    <AnimatePresence>
      {reactionResult && !isSynthesizing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20 }}
          className="glass-panel rounded-xl p-5 w-72"
          style={{ perspective: 1000 }}
        >
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Beaker className="w-4 h-4 text-emerald-600" />
            Synthesis Result
          </div>
          
          <div className="text-center mb-4">
            <div 
              className="w-18 h-18 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-white px-4 py-3"
              style={{ backgroundColor: reactionResult.color, boxShadow: `0 4px 20px ${reactionResult.color}40` }}
            >
              {reactionResult.formula}
            </div>
            <div className="text-sm font-bold text-gray-900">{reactionResult.name}</div>
            <div className="text-xs text-gray-500">{reactionResult.phase} at STP</div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Predicted Yield</span>
              <span className="font-mono text-blue-700">{reactionResult.yield.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Stability</span>
              <span className={cn(
                'font-mono',
                reactionResult.stability === 'Stable' ? 'text-emerald-600' :
                reactionResult.stability === 'Unstable' ? 'text-amber-600' :
                'text-red-600'
              )}>
                {reactionResult.stability}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Confidence</span>
              <span className="font-mono text-blue-700">{reactionResult.confidence.toFixed(1)}%</span>
            </div>
          </div>
          
          <div className="mt-3 text-[11px] text-gray-500 leading-relaxed">
            {reactionResult.description}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={clearReactants}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors text-gray-600"
            >
              <Trash2 className="w-3 h-3" />
              Clear & New Experiment
            </button>
          </div>
        </motion.div>
      )}
      
      {isSynthesizing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-64 h-44 glass-panel rounded-xl flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FlaskConical className="w-12 h-12 text-blue-600" />
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xs text-blue-600 mt-3 font-mono"
          >
            Synthesizing...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ReactionChamber() {
  const { reactants, clearReactants, removeReactant } = useLab();
  const [temperature, setTemperature] = useState(25);
  const [pressure, setPressure] = useState(1);
  const hasElements = reactants.length > 0;

  return (
    <div className="glass-panel rounded-xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-purple-600" />
          Reaction Chamber
          {hasElements && (
            <span className="text-[10px] text-blue-600 font-mono normal-case tracking-normal ml-2">
              ({reactants.length}/2 elements)
            </span>
          )}
        </h2>
        
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <Thermometer className="w-3 h-3" />
            <input
              type="range"
              min="-273"
              max="1000"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-16 accent-blue-500"
            />
            <span className="font-mono w-12">{temperature}°C</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <Gauge className="w-3 h-3" />
            <input
              type="range"
              min="0"
              max="100"
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="w-16 accent-blue-500"
            />
            <span className="font-mono w-10">{pressure}atm</span>
          </div>
          
          {hasElements ? (
            <button
              onClick={clearReactants}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 border border-red-200 hover:bg-red-100 transition-colors text-red-600"
              title="Clear all elements from chamber"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          ) : (
            <button
              disabled
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 border border-gray-200 text-gray-300 cursor-not-allowed"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
      </div>
      
      {/* Main chamber */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-8 py-2">
          <AnimatePresence mode="wait">
            {reactants[0] ? (
              <ReactionFlask 
                key={reactants[0].id}
                reactant={reactants[0]} 
                position="left" 
                onRemove={() => removeReactant(reactants[0].id)} 
                onReplace={() => removeReactant(reactants[0].id)}
              />
            ) : (
              <EmptyFlask position="left" />
            )}
          </AnimatePresence>
          
          <div className="flex flex-col items-center gap-2">
            <SynthesizeButton />
          </div>
          
          <AnimatePresence mode="wait">
            {reactants[1] ? (
              <ReactionFlask 
                key={reactants[1].id}
                reactant={reactants[1]} 
                position="right" 
                onRemove={() => removeReactant(reactants[1].id)} 
                onReplace={() => removeReactant(reactants[1].id)}
              />
            ) : (
              <EmptyFlask position="right" />
            )}
          </AnimatePresence>
        </div>

        <ReactionOutput />
      </div>
      
      {/* Instructions */}
      <div className="flex justify-center gap-4 text-[10px] text-gray-400 font-mono">
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[8px] text-blue-600 font-bold border border-blue-200">1</span>
          Select 2 elements from periodic table
        </span>
        <span className="text-gray-300">→</span>
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[8px] text-blue-600 font-bold border border-blue-200">2</span>
          Adjust conditions (optional)
        </span>
        <span className="text-gray-300">→</span>
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[8px] text-blue-600 font-bold border border-blue-200">3</span>
          Click synthesize to run
        </span>
      </div>
    </div>
  );
}
