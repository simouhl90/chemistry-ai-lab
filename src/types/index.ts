export interface ChemicalElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  electronConfiguration: string;
  electronegativity?: number;
  phase: 'Solid' | 'Liquid' | 'Gas' | 'Unknown';
  xpos: number;
  ypos: number;
  cpkHex?: string;
}

export type ElementCategory =
  | 'alkali metal'
  | 'alkaline earth metal'
  | 'lanthanide'
  | 'actinide'
  | 'transition metal'
  | 'post-transition metal'
  | 'metalloid'
  | 'diatomic nonmetal'
  | 'polyatomic nonmetal'
  | 'noble gas'
  | 'unknown';

export interface Reactant {
  id: string;
  element: ChemicalElement;
  quantity: number;
}

export interface ReactionResult {
  formula: string;
  name: string;
  yield: number;
  stability: 'Stable' | 'Unstable' | 'Highly Unstable';
  phase: string;
  color: string;
  description: string;
  confidence: number;
  balancedEquation: string;
  molarMass: number;
  isVerified: boolean;
  isKnown: boolean;
  category: string;
}

export interface Compound extends Omit<ReactionResult, 'isVerified' | 'confidence'> {
  uses?: string;
}

export interface Discovery {
  id: string;
  title: string;
  formula: string;
  name: string;
  confidence: number;
  timestamp: Date;
  category: 'Catalyst' | 'Material' | 'Compound' | 'Reaction' | 'Predicted' | 'Alloy' | 'Noble Gas';
  isKnown: boolean;
  isVerified: boolean;
  verificationResult?: VerificationResult;
}

export interface VerificationResult {
  isKnown: boolean;
  searchQuery: string;
  summary: string;
  sources: { title: string; url: string; snippet: string }[];
  verifiedAt: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  summary: string;
  date: string;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  status: 'success' | 'pending' | 'info' | 'error';
  timestamp: Date;
}
