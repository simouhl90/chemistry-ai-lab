import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ChemicalElement, Reactant, ReactionResult, Discovery, NewsItem, ActivityLogEntry, VerificationResult } from '../types';
import { elements } from '../data/elements';
import { performSynthesis } from '../data/reactions';
import { newsItems } from '../data/reactions';
import { v4 as uuidv4 } from 'uuid';

export type BackgroundTheme = 'neural' | 'hexagonal' | 'gradient' | 'atoms' | 'starfield';

export const backgroundThemes: { id: BackgroundTheme; label: string; icon: string }[] = [
  { id: 'neural', label: 'Neural Network', icon: '🧠' },
  { id: 'hexagonal', label: 'Molecular Grid', icon: '⬡' },
  { id: 'gradient', label: 'Clean Gradient', icon: '✨' },
  { id: 'atoms', label: 'Floating Atoms', icon: '⚛️' },
  { id: 'starfield', label: 'Deep Space', icon: '🌌' },
];

interface LabContextType {
  selectedElement: ChemicalElement | null;
  setSelectedElement: (el: ChemicalElement | null) => void;
  reactants: Reactant[];
  addReactant: (element: ChemicalElement) => void;
  removeReactant: (id: string) => void;
  clearReactants: () => void;
  reactionResult: ReactionResult | null;
  isSynthesizing: boolean;
  isVerifying: boolean;
  verificationResult: VerificationResult | null;
  synthesize: (temperature?: number, pressure?: number) => void;
  discoveries: Discovery[];
  aiStatus: string;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  isFocusMode: boolean;
  setIsFocusMode: (mode: boolean) => void;
  news: NewsItem[];
  experimentCount: number;
  activityLog: ActivityLogEntry[];
  backgroundTheme: BackgroundTheme;
  setBackgroundTheme: (theme: BackgroundTheme) => void;
}

const LabContext = createContext<LabContextType | undefined>(undefined);

export function LabProvider({ children }: { children: ReactNode }) {
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(null);
  const [reactants, setReactants] = useState<Reactant[]>([]);
  const [reactionResult, setReactionResult] = useState<ReactionResult | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [discoveries, setDiscoveries] = useState<Discovery[]>([]);
  const [aiStatus, setAiStatus] = useState('System Ready — Select elements to begin');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [experimentCount, setExperimentCount] = useState(0);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>('neural');

  const addActivity = useCallback((action: string, status: ActivityLogEntry['status'] = 'info') => {
    setActivityLog(prev => [{
      id: uuidv4(),
      action,
      status,
      timestamp: new Date(),
    }, ...prev].slice(0, 50));
  }, []);

  const addReactant = useCallback((element: ChemicalElement) => {
    setReactants(prev => {
      if (prev.length >= 2) return prev;
      // Prevent adding same element twice
      if (prev.some(r => r.element.symbol === element.symbol)) {
        setAiStatus(`${element.symbol} is already in the chamber`);
        return prev;
      }
      const entry = { id: uuidv4(), element, quantity: 1 };
      setAiStatus(`Loaded ${element.name} (${element.symbol}) into chamber`);
      addActivity(`Selected ${element.name} (${element.symbol}, Z=${element.atomicNumber})`, 'info');
      return [...prev, entry];
    });
  }, [addActivity]);

  const removeReactant = useCallback((id: string) => {
    setReactants(prev => {
      const target = prev.find(r => r.id === id);
      if (target) {
        setAiStatus(`Removed ${target.element.name} (${target.element.symbol}) from chamber`);
        addActivity(`Removed ${target.element.name} (${target.element.symbol})`, 'info');
      }
      return prev.filter(r => r.id !== id);
    });
    setReactionResult(null);
    setVerificationResult(null);
  }, [addActivity]);

  const clearReactants = useCallback(() => {
    setReactants([]);
    setReactionResult(null);
    setVerificationResult(null);
    setAiStatus('Reaction chamber cleared — select new elements');
    addActivity('Cleared reaction chamber', 'info');
  }, [addActivity]);

  // Verify compound using PubChem API + web search
  const verifyCompound = useCallback(async (result: ReactionResult) => {
    setIsVerifying(true);
    setAiStatus(`Searching PubChem & chemical databases for ${result.name}...`);
    addActivity(`Verifying: ${result.formula} (${result.name})`, 'pending');

    try {
      const compoundName = encodeURIComponent(result.name);
      const formulaParam = encodeURIComponent(result.formula.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => '₀₁₂₃₄₅₆₇₈₉'.indexOf(c)));
      const res = await fetch(`/api/verify?compound=${compoundName}&formula=${result.formula}`);
      const data = await res.json();

      const verificationResult: VerificationResult = {
        isKnown: data.isKnown,
        searchQuery: data.searchQuery,
        summary: data.summary,
        sources: data.sources || [],
        verifiedAt: new Date(data.verifiedAt),
        pubchemData: data.pubchemData,
      };

      setVerificationResult(verificationResult);

      if (data.isKnown) {
        const pubchemInfo = data.pubchemData ? ` (CID: ${data.pubchemData.cid})` : '';
        setAiStatus(`Verified: ${result.name} exists in chemical databases${pubchemInfo}`);
        addActivity(`Verified: ${result.formula} — ${result.name} found in PubChem${pubchemInfo}`, 'success');
      } else {
        setAiStatus(`Unverified: ${result.name} may be novel or undocumented`);
        addActivity(`Unverified: ${result.formula} — ${result.name} not found in databases`, 'info');
      }
    } catch (err) {
      console.error('Verification failed:', err);
      setAiStatus(`Verification failed — could not reach search API`);
      addActivity(`Verification failed for ${result.formula}`, 'error');
      setVerificationResult({
        isKnown: false,
        searchQuery: result.name,
        summary: 'Could not verify — search service unavailable. The compound may or may not exist in chemical literature.',
        sources: [],
        verifiedAt: new Date(),
      });
    } finally {
      setIsVerifying(false);
    }
  }, [addActivity]);

  const synthesize = useCallback((temperature: number = 25, pressure: number = 1) => {
    if (reactants.length < 2) {
      setAiStatus('Need 2 elements to begin synthesis');
      addActivity('Synthesis failed: need 2 reactants', 'error');
      return;
    }

    setIsSynthesizing(true);
    setVerificationResult(null);
    setReactionResult(null);
    setAiStatus('Analyzing molecular properties...');

    setTimeout(() => {
      setAiStatus('Predicting reaction pathways...');
    }, 600);

    setTimeout(() => {
      setAiStatus('Calculating bond energies & enthalpy...');
    }, 1200);

    setTimeout(() => {
      setAiStatus('Determining product stability & yield...');
    }, 1800);

    setTimeout(() => {
      setAiStatus('Evaluating thermodynamic feasibility...');
    }, 2400);

    setTimeout(async () => {
      const [r1, r2] = reactants;
      const result = performSynthesis(r1.element, r2.element, temperature, pressure);

      setReactionResult(result);
      setExperimentCount(prev => prev + 1);

      if (result.stability === 'No Reaction') {
        setAiStatus(`No reaction: ${r1.element.symbol} + ${r2.element.symbol}`);
        addActivity(`No reaction between ${r1.element.name} and ${r2.element.name}`, 'info');
      } else {
        const yieldStr = result.yield.toFixed(1);
        const enthalpyStr = result.enthalpy ? ` | ΔH = ${result.enthalpy} kJ/mol` : '';
        const dGStr = result.deltaG ? ` | ΔG = ${result.deltaG.toFixed(1)} kJ/mol` : '';
        setAiStatus(`Synthesis complete: ${result.formula} — ${result.name} (${yieldStr}% yield)`);
        addActivity(`Synthesized ${result.formula} — ${result.name} (yield: ${yieldStr}%)${enthalpyStr}${dGStr}`, 'success');

        // Add to discoveries
        const discovery: Discovery = {
          id: uuidv4(),
          title: result.isKnown ? result.name : `Predicted ${result.name}`,
          formula: result.formula,
          name: result.name,
          confidence: result.confidence,
          timestamp: new Date(),
          category: result.category as Discovery['category'],
          isKnown: result.isKnown,
          isVerified: false,
        };
        setDiscoveries(prev => [discovery, ...prev].slice(0, 20));

        // Auto-verify all successful reactions
        if (result.yield > 5 && result.stability !== 'No Reaction') {
          await verifyCompound(result);
        }
      }

      setIsSynthesizing(false);
    }, 3000);
  }, [reactants, addActivity, verifyCompound]);

  return (
    <LabContext.Provider value={{
      selectedElement,
      setSelectedElement,
      reactants,
      addReactant,
      removeReactant,
      clearReactants,
      reactionResult,
      isSynthesizing,
      isVerifying,
      verificationResult,
      synthesize,
      discoveries,
      aiStatus,
      activeCategory,
      setActiveCategory,
      isFocusMode,
      setIsFocusMode,
      news: newsItems,
      experimentCount,
      activityLog,
      backgroundTheme,
      setBackgroundTheme,
    }}>
      {children}
    </LabContext.Provider>
  );
}

export function useLab() {
  const context = useContext(LabContext);
  if (context === undefined) {
    throw new Error('useLab must be used within a LabProvider');
  }
  return context;
}
