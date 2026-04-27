import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ChemicalElement, Reactant, ReactionResult, Discovery, NewsItem, ActivityLogEntry } from '../types';
import { elements } from '../data/elements';
import { reactionRules, getReactionType, newsItems } from '../data/reactions';
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
  synthesize: () => void;
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
  const [discoveries, setDiscoveries] = useState<Discovery[]>([]);
  const [aiStatus, setAiStatus] = useState('System Ready');
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
      const entry = { id: uuidv4(), element, quantity: 1 };
      setAiStatus(`Loaded ${element.symbol} into reaction chamber`);
      addActivity(`Selected ${element.name} (${element.symbol})`, 'info');
      return [...prev, entry];
    });
  }, [addActivity]);

  const removeReactant = useCallback((id: string) => {
    setReactants(prev => {
      const target = prev.find(r => r.id === id);
      if (target) {
        setAiStatus(`Removed ${target.element.symbol} from chamber`);
        addActivity(`Removed ${target.element.name} (${target.element.symbol})`, 'info');
      }
      return prev.filter(r => r.id !== id);
    });
    setReactionResult(null);
  }, [addActivity]);

  const clearReactants = useCallback(() => {
    setReactants([]);
    setReactionResult(null);
    setAiStatus('Reaction chamber cleared');
    addActivity('Cleared reaction chamber', 'info');
  }, [addActivity]);

  const synthesize = useCallback(() => {
    if (reactants.length < 2) {
      setAiStatus('Error: Need 2 reactants');
      addActivity('Synthesis failed: need 2 reactants', 'error');
      return;
    }

    setIsSynthesizing(true);
    setAiStatus('Analyzing quantum states...');
    setReactionResult(null);

    setTimeout(() => {
      setAiStatus('Predicting reaction pathways...');
    }, 1000);

    setTimeout(() => {
      setAiStatus('Calculating bond energies...');
    }, 2000);

    setTimeout(() => {
      const [r1, r2] = reactants;
      const type = getReactionType(r1.element.category, r2.element.category);
      const rule = reactionRules[type] || reactionRules['metal+nonmetal'];
      
      let result = rule(r1.element.symbol, r2.element.symbol);
      if (!result) {
        result = {
          formula: `${r1.element.symbol}${r2.element.symbol}`,
          name: 'Unknown Compound',
          yield: Math.random() * 30,
          stability: 'Highly Unstable',
          phase: 'Unknown',
          color: '#666666',
          description: 'Reaction thermodynamically unfavorable under standard conditions.',
          confidence: 15,
        };
      }

      setReactionResult(result);
      setAiStatus(`Synthesis complete: ${result.formula}`);
      setExperimentCount(prev => prev + 1);
      addActivity(`Synthesized ${result.formula} (${result.name})`, 'success');
      
      if (result.confidence > 70) {
        const newDiscovery: Discovery = {
          id: uuidv4(),
          title: `Novel ${result.name}`,
          formula: result.formula,
          confidence: result.confidence,
          timestamp: new Date(),
          category: result.stability === 'Stable' ? 'Compound' : 'Reaction',
        };
        setDiscoveries(prev => [newDiscovery, ...prev].slice(0, 20));
        addActivity(`New discovery: ${result.formula} (${result.confidence.toFixed(1)}% confidence)`, 'success');
      }
      
      setIsSynthesizing(false);
    }, 3500);
  }, [reactants, addActivity]);

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
