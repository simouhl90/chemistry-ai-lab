import { motion, AnimatePresence } from 'framer-motion';
import { useLab } from '../../context/LabContext';
import { cn } from '../../lib/utils';
import {
  FlaskConical, Zap, Beaker, X, RotateCcw, Thermometer, Gauge, Trash2,
  RefreshCw, Plus, Globe, CheckCircle2, AlertCircle, Shield, Loader2,
  AlertTriangle, Info, ExternalLink, Atom, TrendingUp, Activity
} from 'lucide-react';
import { useState } from 'react';

function ReactionFlask({ reactant, position, onRemove, onReplace }: {
  reactant: any; position: 'left' | 'right'; onRemove: () => void; onReplace: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      className="relative flex flex-col items-center gap-2"
    >
      <div className={cn(
        'w-36 h-44 relative flex flex-col items-center justify-end pb-4 rounded-xl border-2 overflow-hidden',
        position === 'left' ? 'border-blue-300 bg-blue-50' : 'border-purple-300 bg-purple-50'
      )}>
        <motion.div
          animate={{ height: ['55%', '60%', '55%'], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className={cn('absolute bottom-0 left-0 right-0 rounded-b-xl', position === 'left' ? 'bg-blue-200' : 'bg-purple-200')}
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
        <FlaskConical className={cn('w-10 h-10 mb-3', position === 'left' ? 'text-blue-300' : 'text-purple-300')} />
        <span className="text-xs text-gray-400 font-mono">Click element to add</span>
        <Plus className={cn('w-5 h-5 mt-2 rounded-full border', position === 'left' ? 'text-blue-300 border-blue-200' : 'text-purple-300 border-purple-200')} />
      </div>
      <span className="text-[10px] text-gray-400 font-mono uppercase">
        {position === 'left' ? 'Reactant A' : 'Reactant B'}
      </span>
    </div>
  );
}

function SynthesizeButton({ temperature, pressure }: { temperature: number; pressure: number }) {
  const { synthesize, isSynthesizing, reactants } = useLab();
  const canSynthesize = reactants.length === 2;

  return (
    <motion.button
      whileHover={{ scale: canSynthesize ? 1.08 : 1 }}
      whileTap={{ scale: canSynthesize ? 0.92 : 1 }}
      onClick={() => synthesize(temperature, pressure)}
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
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
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

function VerificationPanel({ result }: { result: any }) {
  const { isVerifying, verificationResult } = useLab();

  return (
    <div className={cn(
      'rounded-lg p-3 mt-3 border',
      verificationResult?.isKnown
        ? 'bg-emerald-50 border-emerald-200'
        : verificationResult
        ? 'bg-amber-50 border-amber-200'
        : 'bg-blue-50 border-blue-200'
    )}>
      <div className="flex items-center gap-2 text-xs font-bold mb-2">
        <Globe className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-gray-600">AI Verification (PubChem + Web Search)</span>
        {isVerifying && (
          <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
        )}
      </div>
      
      {isVerifying ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-[11px] text-blue-600 font-mono"
            >
              Searching PubChem database...
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
              className="text-[11px] text-blue-600 font-mono"
            >
              Cross-referencing chemical literature...
            </motion.div>
          </div>
        </div>
      ) : verificationResult ? (
        <div>
          <div className="flex items-center gap-2 mb-2">
            {verificationResult.isKnown ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            <span className={cn(
              'text-xs font-bold',
              verificationResult.isKnown ? 'text-emerald-700' : 'text-amber-700'
            )}>
              {verificationResult.isKnown
                ? `Known Compound — verified in chemical databases`
                : `Unverified — ${result.formula} may be novel or undocumented`}
            </span>
          </div>

          {/* PubChem data */}
          {verificationResult.pubchemData && (
            <div className="bg-white/60 rounded-md p-2 mb-2 border border-emerald-100">
              <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
                PubChem Database Record
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                <div className="text-gray-500">CID</div>
                <div className="font-mono text-gray-800">{verificationResult.pubchemData.cid}</div>
                {verificationResult.pubchemData.iupacName && (
                  <>
                    <div className="text-gray-500">IUPAC Name</div>
                    <div className="font-mono text-gray-800 text-[9px]">{verificationResult.pubchemData.iupacName}</div>
                  </>
                )}
                {verificationResult.pubchemData.molecularFormula && (
                  <>
                    <div className="text-gray-500">Formula</div>
                    <div className="font-mono text-gray-800">{verificationResult.pubchemData.molecularFormula}</div>
                  </>
                )}
                {verificationResult.pubchemData.molecularWeight && (
                  <>
                    <div className="text-gray-500">Mol. Weight</div>
                    <div className="font-mono text-gray-800">{verificationResult.pubchemData.molecularWeight.toFixed(2)} g/mol</div>
                  </>
                )}
              </div>
            </div>
          )}
          
          {verificationResult.summary && (
            <p className="text-[11px] text-gray-500 leading-relaxed mb-2">
              {verificationResult.summary}
            </p>
          )}
          
          {verificationResult.sources.length > 0 && (
            <div className="space-y-1.5">
              {verificationResult.sources.slice(0, 3).map((src: any, i: number) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-800 hover:underline"
                  title={src.snippet}
                >
                  <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate">{src.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
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
          className="glass-panel rounded-xl p-5 w-[340px]"
          style={{ perspective: 1000 }}
        >
          {reactionResult.stability === 'No Reaction' ? (
            <div className="text-center py-4">
              <Shield className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <div className="text-sm font-bold text-gray-700">No Reaction</div>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {reactionResult.description}
              </p>
              <button
                onClick={clearReactants}
                className="mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors text-gray-600"
              >
                <Trash2 className="w-3 h-3" />
                Try Different Elements
              </button>
            </div>
          ) : (
            <>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Beaker className="w-4 h-4 text-emerald-600" />
                Synthesis Result
                {reactionResult.isKnown && (
                  <span className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200 ml-1">
                    KNOWN COMPOUND
                  </span>
                )}
                {!reactionResult.isKnown && (
                  <span className="text-[9px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200 ml-1">
                    AI PREDICTED
                  </span>
                )}
              </div>
              
              <div className="text-center mb-4">
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold text-white px-3"
                  style={{ backgroundColor: reactionResult.color, boxShadow: `0 4px 20px ${reactionResult.color}40` }}
                >
                  {reactionResult.formula}
                </div>
                <div className="text-sm font-bold text-gray-900">{reactionResult.name}</div>
                <div className="text-xs text-gray-500">{reactionResult.phase} at STP</div>
                {reactionResult.uses && (
                  <div className="text-[10px] text-blue-600 mt-1 flex items-center justify-center gap-1">
                    <Info className="w-3 h-3" />
                    {reactionResult.uses.split(',')[0]}
                  </div>
                )}
              </div>

              {/* Reaction Type & Bond Type badges */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {reactionResult.reactionType}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  {reactionResult.bondType} Bond
                </span>
                {reactionResult.category && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                    {reactionResult.category}
                  </span>
                )}
              </div>

              {/* Balanced Equation */}
              <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Balanced Equation</div>
                <div className="text-[11px] font-mono text-gray-700 font-semibold leading-relaxed">
                  {reactionResult.balancedEquation}
                </div>
              </div>

              {/* Thermodynamic Data */}
              {(reactionResult.enthalpy !== 0 || reactionResult.deltaG !== 0) && (
                <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
                  <div className="text-[10px] text-gray-400 uppercase font-bold mb-1.5 flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Thermodynamic Data
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ΔH</span>
                      <span className={cn(
                        'font-mono',
                        reactionResult.enthalpy < 0 ? 'text-blue-700' : 'text-red-600'
                      )}>
                        {reactionResult.enthalpy} kJ/mol
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ΔS</span>
                      <span className="font-mono text-gray-700">{reactionResult.entropy} J/mol·K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ΔG</span>
                      <span className={cn(
                        'font-mono',
                        reactionResult.deltaG < 0 ? 'text-emerald-600' : 'text-red-600'
                      )}>
                        {reactionResult.deltaG.toFixed(1)} kJ/mol
                      </span>
                    </div>
                    {reactionResult.enthalpy < 0 && (
                      <div className="col-span-2 text-[10px] text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Exothermic — releases energy
                      </div>
                    )}
                    {reactionResult.enthalpy > 0 && (
                      <div className="col-span-2 text-[10px] text-red-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 rotate-180" />
                        Endothermic — absorbs energy
                      </div>
                    )}
                    {reactionResult.deltaG < 0 && (
                      <div className="col-span-2 text-[10px] text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Spontaneous under current conditions (ΔG &lt; 0)
                      </div>
                    )}
                    {reactionResult.deltaG > 0 && (
                      <div className="col-span-2 text-[10px] text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Non-spontaneous (ΔG &gt; 0) — requires energy input
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Properties Grid */}
              <div className="space-y-2 text-xs mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Molar Mass</span>
                  <span className="font-mono text-blue-700">{reactionResult.molarMass} g/mol</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Predicted Yield</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${reactionResult.yield}%`,
                          backgroundColor: reactionResult.yield > 70 ? '#10b981' : reactionResult.yield > 40 ? '#f59e0b' : '#ef4444',
                        }}
                      />
                    </div>
                    <span className="font-mono text-blue-700 w-10 text-right">{reactionResult.yield.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Stability</span>
                  <span className={cn(
                    'font-mono font-semibold',
                    reactionResult.stability === 'Stable' ? 'text-emerald-600' :
                    reactionResult.stability === 'Unstable' ? 'text-amber-600' : 'text-red-600'
                  )}>
                    {reactionResult.stability === 'Stable' ? '●' : reactionResult.stability === 'Unstable' ? '●' : '●'} {reactionResult.stability}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">AI Confidence</span>
                  <span className="font-mono text-blue-700">{reactionResult.confidence.toFixed(1)}%</span>
                </div>
                {reactionResult.optimalTemp && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Optimal Temp</span>
                    <span className="font-mono text-gray-700">{reactionResult.optimalTemp}°C</span>
                  </div>
                )}
                {reactionResult.boilingPoint && reactionResult.boilingPoint > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Boiling Point</span>
                    <span className="font-mono text-gray-700">{reactionResult.boilingPoint}°C</span>
                  </div>
                )}
                {reactionResult.meltingPoint && reactionResult.meltingPoint > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Melting Point</span>
                    <span className="font-mono text-gray-700">{reactionResult.meltingPoint}°C</span>
                  </div>
                )}
                {reactionResult.solubility && reactionResult.solubility !== 'N/A' && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Solubility</span>
                    <span className="font-mono text-gray-700 text-[11px]">{reactionResult.solubility}</span>
                  </div>
                )}
                {reactionResult.appearance && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Appearance</span>
                    <span className="font-mono text-gray-700 text-[11px] text-right max-w-[180px]">{reactionResult.appearance}</span>
                  </div>
                )}
                {reactionResult.crystalStructure && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Crystal</span>
                    <span className="font-mono text-gray-700 text-[11px]">{reactionResult.crystalStructure}</span>
                  </div>
                )}
              </div>
              
              {/* Description */}
              <div className="text-[11px] text-gray-500 leading-relaxed mb-3">
                {reactionResult.description}
              </div>

              {/* Safety Warning */}
              {reactionResult.safetyInfo && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-3 h-3" />
                    Safety
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    {reactionResult.safetyInfo}
                  </p>
                </div>
              )}

              <VerificationPanel result={reactionResult} />

              <div className="mt-4 flex gap-2">
                <button
                  onClick={clearReactants}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors text-gray-600"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear & New Experiment
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
      
      {isSynthesizing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-72 h-48 glass-panel rounded-xl flex flex-col items-center justify-center"
        >
          <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
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
  const { reactants, clearReactants, removeReactant, aiStatus } = useLab();
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
              max="2000"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-16 accent-blue-500"
            />
            <span className="font-mono w-14">{temperature}°C</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <Gauge className="w-3 h-3" />
            <input
              type="range"
              min="0"
              max="200"
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="w-16 accent-blue-500"
            />
            <span className="font-mono w-12">{pressure}atm</span>
          </div>
          
          {hasElements ? (
            <button
              onClick={clearReactants}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 border border-red-200 hover:bg-red-100 transition-colors text-red-600"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          ) : (
            <button disabled className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 border border-gray-200 text-gray-300 cursor-not-allowed">
              <RotateCcw className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
      </div>
      
      {/* AI Status bar */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5">
        <Atom className="w-3 h-3 text-blue-500 shrink-0" />
        <span className="text-[11px] text-blue-700 font-mono truncate">{aiStatus}</span>
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
            <SynthesizeButton temperature={temperature} pressure={pressure} />
            {hasElements && (
              <span className="text-[9px] text-gray-400 font-mono">
                {temperature}°C / {pressure}atm
              </span>
            )}
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
          Select 2 elements
        </span>
        <span className="text-gray-300">→</span>
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[8px] text-blue-600 font-bold border border-blue-200">2</span>
          Set temp/pressure
        </span>
        <span className="text-gray-300">→</span>
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[8px] text-blue-600 font-bold border border-blue-200">3</span>
          Synthesize
        </span>
        <span className="text-gray-300">→</span>
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-[8px] text-emerald-600 font-bold border border-emerald-200">4</span>
          AI verifies result
        </span>
      </div>
    </div>
  );
}
