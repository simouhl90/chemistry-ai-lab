import type { ReactionResult, ChemicalElement, NewsItem } from '../types';
import { lookupCompound } from './compounds';

// News items
export const newsItems: NewsItem[] = [
  { id: '1', title: 'MIT FlowER Model Predicts Novel Reaction Pathways', source: 'MIT News', summary: 'New generative AI approach uses bond-electron matrices to predict chemical reactions with 95% accuracy on USPTO dataset.', date: '2026-04-21' },
  { id: '2', title: 'AI Discovers Catalyst for CO2 Electroreduction', source: 'Nature Chemistry', summary: 'Machine-learned interatomic potentials identify stable Cu-Co surface alloy with 40% efficiency improvement.', date: '2026-04-18' },
  { id: '3', title: 'Robotic Self-Driving Lab Synthesizes 1000 New Compounds', source: 'Science', summary: 'ANU SDL system achieves 3-week discovery cycle, compressing traditional 3-year timeline.', date: '2026-04-15' },
  { id: '4', title: 'Quantum Chemistry on NISQ Devices: First Atmospheric Reaction', source: 'Quantinuum', summary: 'InQuanto platform simulates NO2 formation on trapped-ion quantum computer.', date: '2026-04-10' },
  { id: '5', title: 'GPT-4 Extracts Structured Chemistry Data at Scale', source: 'J. Chem. Inf.', summary: 'LLM pipeline generates ML-ready datasets from 176 publications with 0.86 R² for titer prediction.', date: '2026-04-05' },
];

// Real oxidation states for common elements
const oxidationStates: Record<string, number[]> = {
  'H': [1, -1], 'Li': [1], 'Na': [1], 'K': [1], 'Rb': [1], 'Cs': [1], 'Fr': [1],
  'Be': [2], 'Mg': [2], 'Ca': [2], 'Sr': [2], 'Ba': [2], 'Ra': [2],
  'B': [3], 'Al': [3], 'Ga': [3], 'In': [3], 'Tl': [1, 3],
  'C': [-4, -2, 2, 4], 'Si': [-4, 4], 'Ge': [2, 4], 'Sn': [2, 4], 'Pb': [2, 4],
  'N': [-3, -2, -1, 1, 2, 3, 4, 5], 'P': [-3, 1, 3, 5], 'As': [-3, 3, 5],
  'O': [-2, -1, 0], 'S': [-2, 2, 4, 6], 'Se': [-2, 4, 6],
  'F': [-1], 'Cl': [-1, 1, 3, 5, 7], 'Br': [-1, 1, 3, 5], 'I': [-1, 1, 3, 5, 7],
  'Fe': [2, 3], 'Cu': [1, 2], 'Zn': [2], 'Ag': [1], 'Au': [1, 3],
  'Ti': [2, 3, 4], 'Cr': [2, 3, 6], 'Mn': [2, 3, 4, 7], 'Co': [2, 3],
  'Ni': [2, 3], 'Pt': [2, 4], 'Hg': [1, 2], 'Pb': [2, 4],
  'W': [4, 6], 'Mo': [4, 6], 'V': [2, 3, 4, 5],
};

// Noble gas elements — they don't react easily
const nobleGases = new Set(['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn', 'Og']);

// CPK-like colors for element-based compound coloring
const elementColors: Record<string, string> = {
  'H': '#ffffff', 'He': '#d9ffff', 'Li': '#cc80ff', 'Be': '#c2ff00', 'B': '#ffb5b5',
  'C': '#909090', 'N': '#3050f8', 'O': '#ff0d0d', 'F': '#90e050', 'Ne': '#b3e3f5',
  'Na': '#ab5cf2', 'Mg': '#8aff00', 'Al': '#bfa6a6', 'Si': '#f0c8a0', 'P': '#ff8000',
  'S': '#ffff30', 'Cl': '#1ff01f', 'Ar': '#80d1e3', 'K': '#8f40d4', 'Ca': '#3dff00',
  'Fe': '#e06633', 'Cu': '#c78033', 'Zn': '#7d80b0', 'Ag': '#c0c0c0', 'Au': '#ffd123',
  'Hg': '#b8b8d0', 'Pb': '#575961', 'Ti': '#bfc2c7', 'Cr': '#8a99c7', 'Mn': '#9c7ac7',
  'Pt': '#d0d0e0', 'W': '#2194d6', 'Ba': '#00c900', 'Sr': '#00ff00', 'Br': '#a62929',
  'I': '#940094', 'Xe': '#429eb0', 'Se': '#ffa100', 'Si': '#f0c8a0', 'Al': '#bfa6a6',
};

// Apply temperature/pressure effects to yield
function applyConditions(baseYield: number, temp: number, pressure: number, isExothermic: boolean): number {
  let y = baseYield;

  // Temperature effect
  // Exothermic reactions: moderate temps good, very high temps reduce yield (Le Chatelier)
  // Endothermic reactions: higher temps increase yield
  if (isExothermic) {
    if (temp > 500) y -= Math.min(25, (temp - 500) * 0.03);
    else if (temp > 200) y += 5; // Optimal range
    if (temp < 0) y -= 20; // Too cold
    if (temp < -100) y -= 30; // Way too cold
  } else {
    y += Math.min(30, temp * 0.03);
  }

  // Pressure effect (mainly for gas reactions)
  if (pressure > 10) y += Math.min(15, (pressure - 10) * 0.2);
  if (pressure < 1) y -= (1 - pressure) * 5;

  return Math.max(2, Math.min(99.9, y + (Math.random() - 0.5) * 4));
}

// Determine if one element is a metal
function isMetal(element: ChemicalElement): boolean {
  return ['alkali metal', 'alkaline earth metal', 'transition metal', 'post-transition metal', 'lanthanide', 'actinide'].includes(element.category);
}

// Generate a predicted compound using real chemistry principles
function predictCompound(elA: ChemicalElement, elB: ChemicalElement, temp: number, pressure: number): ReactionResult {
  const metal = isMetal(elA) ? elA : (isMetal(elB) ? elB : null);
  const nonMetal = metal === elA ? elB : (metal === elB ? elA : null);

  // Noble gas check
  if (nobleGases.has(elA.symbol) || nobleGases.has(elB.symbol)) {
    return {
      formula: `${elA.symbol}-${elB.symbol}`,
      name: 'No Reaction',
      yield: 0,
      stability: 'Stable' as const,
      phase: 'N/A',
      color: '#9e9e9e',
      description: `${elA.symbol} or ${elB.symbol} is a noble gas — these are chemically inert under normal conditions. Noble gases have full valence shells and extremely high ionization energies, making reactions extremely difficult without extreme conditions.`,
      balancedEquation: `${elA.symbol} + ${elB.symbol} → No Reaction`,
      molarMass: 0,
      confidence: 5,
      isVerified: false,
      isKnown: true,
      category: 'Noble Gas',
    };
  }

  // Two metals → alloy, not a compound
  if (isMetal(elA) && isMetal(elB)) {
    return {
      formula: `${elA.symbol}-${elB.symbol}`,
      name: `${elA.name}-${elB.name} Alloy (Mixture)`,
      yield: 60 + Math.random() * 30,
      stability: 'Stable' as const,
      phase: 'Solid',
      color: elementColors[elA.symbol] || '#9e9e9e',
      description: `Both ${elA.name} and ${elB.name} are metals. When combined they form an alloy (intermetallic mixture), not a compound through chemical bonding. Alloys have different properties than their pure elements — e.g., bronze (Cu-Sn) is harder than either pure metal.`,
      balancedEquation: `${elA.symbol} + ${elB.symbol} → ${elA.symbol}-${elB.symbol} (alloy, not a chemical reaction)`,
      molarMass: +(elA.atomicMass + elB.atomicMass).toFixed(2),
      confidence: 30,
      isVerified: false,
      isKnown: false,
      category: 'Alloy',
    };
  }

  // Metal + Non-metal: ionic compound prediction
  if (metal && nonMetal) {
    const enDiff = Math.abs((nonMetal.electronegativity || 2) - (metal.electronegativity || 1));

    // Use oxidation states to predict formula
    const metalStates = oxidationStates[metal.symbol] || [1, 2];
    const nonMetalStates = oxidationStates[nonMetal.symbol] || [-1, -2];

    // Find LCM to balance charges
    let metalCharge = metalStates[0]; // Use most common oxidation state
    let nonMetalCharge = Math.abs(nonMetalStates[0]);

    // Special cases
    if (nonMetal.symbol === 'O') nonMetalCharge = 2;
    if (nonMetal.symbol === 'Cl' || nonMetal.symbol === 'F') nonMetalCharge = 1;
    if (nonMetal.symbol === 'S') nonMetalCharge = 2;

    const lcm = (a: number, b: number) => {
      const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
      return (a * b) / gcd(a, b);
    };

    const chargeLCM = lcm(metalCharge, nonMetalCharge);
    const metalCount = chargeLCM / metalCharge;
    const nonMetalCount = chargeLCM / nonMetalCharge;

    // Build formula
    let formula = '';
    let name = '';
    if (metalCount === 1) formula += metal.symbol;
    else formula += `${metal.symbol}${subscript(metalCount)}`;

    if (nonMetalCount === 1) formula += nonMetal.symbol;
    else formula += `${nonMetal.symbol}${subscript(nonMetalCount)}`;

    // Naming
    if (nonMetal.symbol === 'O') name = `${metal.name} Oxide`;
    else if (nonMetal.symbol === 'Cl') name = `${metal.name} Chloride`;
    else if (nonMetal.symbol === 'F') name = `${metal.name} Fluoride`;
    else if (nonMetal.symbol === 'Br') name = `${metal.name} Bromide`;
    else if (nonMetal.symbol === 'I') name = `${metal.name} Iodide`;
    else if (nonMetal.symbol === 'S') name = `${metal.name} Sulfide`;
    else if (nonMetal.symbol === 'N') name = `${metal.name} Nitride`;
    else if (nonMetal.symbol === 'C') name = `${metal.name} Carbide`;
    else if (nonMetal.symbol === 'Si') name = `${metal.name} Silicide`;
    else if (nonMetal.symbol === 'P') name = `${metal.name} Phosphide`;
    else if (nonMetal.symbol === 'H') name = `${metal.name} Hydride`;
    else name = `${metal.name} ${nonMetal.name}ide`;

    const molarMass = +(metal.atomicMass * metalCount + nonMetal.atomicMass * nonMetalCount).toFixed(2);
    const baseYield = 50 + enDiff * 15 + Math.random() * 15;
    const yield_ = applyConditions(baseYield, temp, pressure, true);
    const confidence = Math.min(95, 40 + enDiff * 12 + Math.random() * 10);

    return {
      formula,
      name,
      yield: yield_,
      stability: enDiff > 2 ? 'Stable' as const : enDiff > 1 ? 'Unstable' as const : 'Highly Unstable' as const,
      phase: 'Solid',
      color: elementColors[metal.symbol] || '#9e9e9e',
      description: `Predicted ionic compound. Electronegativity difference (${enDiff.toFixed(2)}) suggests ${enDiff > 1.7 ? 'predominantly ionic' : 'polar covalent'} bonding. ${metal.name} (EN=${metal.electronegativity || 'N/A'}) donates ${metalCharge} electron(s) to ${nonMetal.name} (EN=${nonMetal.electronegativity || 'N/A'}).`,
      balancedEquation: `${metalCount === 1 ? metal.symbol + ' ' : metal.symbol + metalCount} + ${nonMetalCount === 1 ? nonMetal.symbol : nonMetal.symbol + nonMetalCount} → ${formula}`,
      molarMass,
      confidence,
      isVerified: false,
      isKnown: false,
      category: 'Predicted',
    };
  }

  // Two nonmetals: covalent compound
  const enA = elA.electronegativity || 2;
  const enB = elB.electronegativity || 2;
  const moreEN = enA >= enB ? elA : elB;
  const lessEN = enA >= enB ? elB : elA;

  // Common nonmetal pair predictions
  const commonPairs: Record<string, Partial<ReactionResult>> = {
    'C-O': { formula: 'CO₂', name: 'Carbon Dioxide', molarMass: 44.01, phase: 'Gas', color: '#eceff1', stability: 'Stable' as const, description: 'Linear molecule. Primary greenhouse gas.', balancedEquation: 'C + O₂ → CO₂', category: 'Oxide' },
    'N-H': { formula: 'NH₃', name: 'Ammonia', molarMass: 17.03, phase: 'Gas', color: '#e1f5fe', stability: 'Stable' as const, description: 'Pungent gas, key fertilizer.', balancedEquation: 'N₂ + 3H₂ → 2NH₃', category: 'Compound' },
    'S-O': { formula: 'SO₂', name: 'Sulfur Dioxide', molarMass: 64.07, phase: 'Gas', color: '#eceff1', stability: 'Stable' as const, description: 'Acid rain precursor.', balancedEquation: 'S + O₂ → SO₂', category: 'Oxide' },
    'C-H': { formula: 'CH₄', name: 'Methane', molarMass: 16.04, phase: 'Gas', color: '#e8f5e9', stability: 'Stable' as const, description: 'Simplest hydrocarbon, natural gas.', balancedEquation: 'C + 2H₂ → CH₄', category: 'Hydrocarbon' },
    'N-O': { formula: 'NO₂', name: 'Nitrogen Dioxide', molarMass: 46.01, phase: 'Gas', color: '#ff8a65', stability: 'Unstable' as const, description: 'Brown gas, smog component.', balancedEquation: 'N₂ + 2O₂ → 2NO₂', category: 'Oxide' },
  };

  const pairKey = [elA.symbol, elB.symbol].sort().join('-');
  if (commonPairs[pairKey]) {
    const known = commonPairs[pairKey];
    return {
      ...known,
      yield: 60 + Math.random() * 30,
      confidence: 80 + Math.random() * 15,
      isVerified: false,
      isKnown: true,
      molarMass: known.molarMass || +(elA.atomicMass + elB.atomicMass).toFixed(2),
    } as ReactionResult;
  }

  // Generic nonmetal compound
  const formula = `${moreEN.symbol}${subscript(1)}${lessEN.symbol}${subscript(2)}`;
  const name = `${lessEN.name} ${moreEN.name}ide`;
  const baseYield = 30 + Math.random() * 30;
  const yield_ = applyConditions(baseYield, temp, pressure, Math.random() > 0.5);

  return {
    formula,
    name,
    yield: yield_,
    stability: 'Unstable' as const,
    phase: Math.random() > 0.5 ? 'Gas' : 'Solid',
    color: elementColors[moreEN.symbol] || '#9e9e9e',
    description: `Predicted covalent compound between ${elA.name} and ${elB.name}. Covalent compounds share electrons rather than transferring them. May be volatile and require specific synthesis conditions.`,
    balancedEquation: `${elA.symbol} + ${elB.symbol} → ${formula}`,
    molarMass: +(elA.atomicMass + elB.atomicMass * 2).toFixed(2),
    confidence: 25 + Math.random() * 20,
    isVerified: false,
    isKnown: false,
    category: 'Predicted',
  };
}

function subscript(n: number): string {
  const subs: Record<number, string> = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
  if (n <= 9) return subs[n] || String(n);
  return String(n);
}

// Main synthesis function
export function performSynthesis(
  elA: ChemicalElement,
  elB: ChemicalElement,
  temperature: number = 25,
  pressure: number = 1
): ReactionResult {
  // 1. Check if we have a real compound in our database
  const known = lookupCompound(elA.symbol, elB.symbol);
  if (known) {
    const yield_ = applyConditions(known.yield, temperature, pressure, true);
    return {
      ...known,
      yield: yield_,
      confidence: 85 + Math.random() * 10,
      isVerified: false,
      isKnown: true,
      balancedEquation: known.balancedEquation,
      molarMass: known.molarMass,
    };
  }

  // 2. Predict using chemistry rules
  return predictCompound(elA, elB, temperature, pressure);
}
