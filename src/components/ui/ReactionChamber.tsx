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
        position === 'left' ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-fuchsia-500/50 bg-fuchsia-500/5'
      )}>
        <div className={cn(
          'absolute inset-0 opacity-10 rounded-xl',
          position === 'left' ? 'bg-cyan-500' : 'bg-fuchsia-500'
        )} />
        
        <motion.div
          animate={{ 
            height: ['55%', '60%', '55%'],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className={cn(
            'absolute bottom-0 left-0 right-0 rounded-b-xl',
            position === 'left' ? 'bg-cyan-500/30' : 'bg-fuchsia-500/30'
          )}
        />
        
        <div className="relative z-10 text-center">
          <div className="text-3xl font-bold text-white">{reactant.element.symbol}</div>
          <div className="text-xs text-slate-300 mt-1">{reactant.element.name}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">
            EN: {reactant.element.electronegativity || 'N/A'}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Mass: {reactant.element.atomicMass}
          </div>
        </div>
        
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-800/80 border border-slate-600/50 flex items-center justify-center hover:bg-red-500/80 hover:border-red-500 transition-colors"
          title="Remove element"
        >
          <X className="w-3 h-3 text-white" />
        </button>
      </div>
      
      {/* Action buttons below flask */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-500 font-mono uppercase">
          {position === 'left' ? 'Reactant A' : 'Reactant B'}
        </span>
        <button
          onClick={onReplace}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-slate-700/60 border border-slate-600/50 hover:bg-slate-600 hover:border-cyan-500/50 transition-colors text-slate-300"
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
        position === 'left' ? 'border-cyan-500/20 bg-cyan-500/5' : 'border-fuchsia-500/20 bg-fuchsia-500/5'
      )}>
        <FlaskConical className={cn(
          'w-10 h-10 mb-3',
          position === 'left' ? 'text-cyan-500/30' : 'text-fuchsia-500/30'
        )} />
        <span className="text-xs text-slate-600 font-mono">
          Click element to add
        </span>
        <Plus className={cn(
          'w-5 h-5 mt-2 rounded-full border',
          position === 'left' ? 'text-cyan-500/30 border-cyan-500/20' : 'text-fuchsia-500/30 border-fuchsia-500/20'
        )} />
      </div>
      <span className="text-[10px] text-slate-600 font-mono uppercase">
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
          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse-glow cursor-pointer'
          : 'bg-slate-800 cursor-not-allowed opacity-50'
      )}
      title={canSynthesize ? 'Run synthesis' : 'Add 2 elements first'}
    >
      {isSynthesizing ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>
      ) : (
        <Zap className="w-8 h-8 text-white" />
      )}
      
      {canSynthesize && !isSynthesizing && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400"
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
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Beaker className="w-4 h-4 text-green-400" />
            Synthesis Result
          </div>
          
          <div className="text-center mb-4">
            <div 
              className="w-18 h-18 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-white px-4 py-3"
              style={{ backgroundColor: reactionResult.color, boxShadow: `0 0 20px ${reactionResult.color}80` }}
            >
              {reactionResult.formula}
            </div>
            <div className="text-sm font-bold text-white">{reactionResult.name}</div>
            <div className="text-xs text-slate-400">{reactionResult.phase} at STP</div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Predicted Yield</span>
              <span className="font-mono text-cyan-400">{reactionResult.yield.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Stability</span>
              <span className={cn(
                'font-mono',
                reactionResult.stability === 'Stable' ? 'text-green-400' :
                reactionResult.stability === 'Unstable' ? 'text-yellow-400' :
                'text-red-400'
              )}>
                {reactionResult.stability}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Confidence</span>
              <span className="font-mono text-cyan-400">{reactionResult.confidence.toFixed(1)}%</span>
            </div>
          </div>
          
          <div className="mt-3 text-[11px] text-slate-500 leading-relaxed">
            {reactionResult.description}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={clearReactants}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-700/60 border border-slate-600/50 hover:bg-slate-600 hover:border-red-500/50 transition-colors text-slate-300"
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
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FlaskConical className="w-12 h-12 text-cyan-400" />
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xs text-cyan-400 mt-3 font-mono"
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
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-fuchsia-400" />
          Reaction Chamber
          {hasElements && (
            <span className="text-[10px] text-cyan-400 font-mono normal-case tracking-normal ml-2">
              ({reactants.length}/2 elements)
            </span>
          )}
        </h2>
        
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Thermometer className="w-3 h-3" />
            <input
              type="range"
              min="-273"
              max="1000"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-16 accent-cyan-400"
            />
            <span className="font-mono w-12">{temperature}°C</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Gauge className="w-3 h-3" />
            <input
              type="range"
              min="0"
              max="100"
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="w-16 accent-cyan-400"
            />
            <span className="font-mono w-10">{pressure}atm</span>
          </div>
          
          {hasElements && (
            <button
              onClick={clearReactants}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 transition-colors text-red-400"
              title="Clear all elements from chamber"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}

          {!hasElements && (
            <button
              disabled
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/50 border border-slate-700/50 text-slate-600 cursor-not-allowed"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
      </div>
      
      {/* Main chamber area - flasks + synthesize + output */}
      <div className="flex flex-col items-center gap-6">
        {/* Flask row */}
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

        {/* Result output below flasks */}
        <ReactionOutput />
      </div>
      
      {/* Instructions */}
      <div className="flex justify-center gap-4 text-[10px] text-slate-600 font-mono">
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-slate-700/60 flex items-center justify-center text-[8px] text-slate-400 font-bold">1</span>
          Select 2 elements from periodic table
        </span>
        <span className="text-slate-700">→</span>
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-slate-700/60 flex items-center justify-center text-[8px] text-slate-400 font-bold">2</span>
          Adjust conditions (optional)
        </span>
        <span className="text-slate-700">→</span>
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-slate-700/60 flex items-center justify-center text-[8px] text-slate-400 font-bold">3</span>
          Click synthesize to run
        </span>
      </div>
    </div>
  );
}
