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

export type ReactionType =
  | 'Synthesis'
  | 'Combination'
  | 'Decomposition'
  | 'Single Displacement'
  | 'Double Displacement'
  | 'Combustion'
  | 'Redox'
  | 'Acid-Base'
  | 'Precipitation'
  | 'Oxidation'
  | 'Ionic Bonding'
  | 'Covalent Bonding'
  | 'Metallic Bonding'
  | 'Complexation'
  | 'No Reaction'
  | 'Predicted';

export type BondType =
  | 'Ionic'
  | 'Covalent'
  | 'Metallic'
  | 'Polar Covalent'
  | 'Coordinate Covalent'
  | 'Van der Waals'
  | 'N/A';

export interface ReactionResult {
  formula: string;
  name: string;
  yield: number;
  stability: 'Stable' | 'Unstable' | 'Highly Unstable' | 'No Reaction';
  phase: string;
  color: string;
  description: string;
  confidence: number;
  balancedEquation: string;
  molarMass: number;
  isVerified: boolean;
  isKnown: boolean;
  category: string;
  reactionType: ReactionType;
  bondType: BondType;
  enthalpy: number;
  entropy: number;
  deltaG: number;
  optimalTemp: number;
  optimalPressure: number;
  safetyInfo: string;
  boilingPoint?: number;
  meltingPoint?: number;
  solubility?: string;
  appearance?: string;
  crystalStructure?: string;
  uses?: string;
}

export interface Compound extends Omit<ReactionResult, 'isVerified' | 'confidence' | 'yield'> {
  baseYield: number;
  uses?: string;
}

export interface Discovery {
  id: string;
  title: string;
  formula: string;
  name: string;
  confidence: number;
  timestamp: Date;
  category: 'Catalyst' | 'Material' | 'Compound' | 'Reaction' | 'Predicted' | 'Alloy' | 'Noble Gas' | 'Oxide' | 'Salt' | 'Sulfide' | 'Acid' | 'Mineral' | 'Hydrocarbon' | 'Carbide';
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
  pubchemData?: {
    cid: string;
    iupacName: string;
    molecularFormula: string;
    molecularWeight: number;
    exactMass: number;
  };
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
