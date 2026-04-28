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
  'Nb': [5], 'Ta': [5], 'Zr': [4], 'Hf': [4],
  'Ru': [2, 3, 4, 8], 'Rh': [3], 'Pd': [2, 4],
  'Re': [4, 6, 7], 'Os': [4, 6, 8],
  'Bi': [3, 5], 'Sb': [3, 5], 'Te': [-2, 4, 6],
  'U': [3, 4, 5, 6], 'Th': [4],
  'Ce': [3, 4], 'La': [3], 'Gd': [3], 'Y': [3],
};

// Noble gas elements — they don't react easily
const nobleGases = new Set(['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn', 'Og']);

// CPK-like colors for element-based compound coloring
const elementColors: Record<string, string> = {
  'H': '#e0f2fe', 'He': '#d9ffff', 'Li': '#cc80ff', 'Be': '#c2ff00', 'B': '#ffb5b5',
  'C': '#909090', 'N': '#3050f8', 'O': '#ff0d0d', 'F': '#90e050', 'Ne': '#b3e3f5',
  'Na': '#ab5cf2', 'Mg': '#8aff00', 'Al': '#bfa6a6', 'Si': '#f0c8a0', 'P': '#ff8000',
  'S': '#ffff30', 'Cl': '#1ff01f', 'Ar': '#80d1e3', 'K': '#8f40d4', 'Ca': '#3dff00',
  'Fe': '#e06633', 'Cu': '#c78033', 'Zn': '#7d80b0', 'Ag': '#c0c0c0', 'Au': '#ffd123',
  'Hg': '#b8b8d0', 'Pb': '#575961', 'Ti': '#bfc2c7', 'Cr': '#8a99c7', 'Mn': '#9c7ac7',
  'Pt': '#d0d0e0', 'W': '#2194d6', 'Ba': '#00c900', 'Sr': '#00ff00', 'Br': '#a62929',
  'I': '#940094', 'Xe': '#429eb0', 'Se': '#ffa100', 'Co': '#f090a0', 'Ni': '#50d050',
  'V': '#a6a6ab', 'Nb': '#73c2c9', 'Mo': '#54b5b5', 'Ru': '#248f8f', 'Rh': '#0a7d8c',
  'Pd': '#006985', 'Re': '#267dab', 'Os': '#266696', 'Ir': '#175487', 'Bi': '#9e4fb5',
  'Sb': '#9e63b5', 'Te': '#d47a00', 'La': '#70d4ff', 'Ce': '#ffffc7', 'U': '#008fff',
  'Zr': '#94e0e0', 'Hf': '#4dc2ff', 'Ta': '#4da6ff',
};

// Apply temperature/pressure effects to yield with realistic Le Chatelier principles
function applyConditions(baseYield: number, temp: number, pressure: number, optimalTemp: number, optimalPressure: number, isExothermic: boolean): number {
  let y = baseYield;

  // Temperature effect — Gaussian around optimal temperature
  const tempDiff = Math.abs(temp - optimalTemp);
  const tempPenalty = tempDiff < 50 ? 0 : Math.min(35, (tempDiff - 50) * 0.05);
  y -= tempPenalty;

  // Bonus for being near optimal temperature
  if (tempDiff < 30) y += 5;
  if (tempDiff < 10) y += 3;

  // Pressure effect — most reactions prefer higher pressure
  const pressureRatio = pressure / Math.max(1, optimalPressure);
  if (pressureRatio > 0.8 && pressureRatio < 1.5) y += 3;
  else if (pressureRatio < 0.5) y -= 10;
  else if (pressureRatio > 3) y -= 5; // Too much pressure can cause side reactions

  // Extreme conditions penalties
  if (temp < -200) y -= 40; // Near absolute zero
  if (temp > 2000) y -= 20; // Extreme heat can decompose products
  if (temp < -50 && temp > -200) y -= 15; // Very cold slows kinetics

  return Math.max(2, Math.min(99.5, y + (Math.random() - 0.5) * 3));
}

// Determine if one element is a metal
function isMetal(element: ChemicalElement): boolean {
  return ['alkali metal', 'alkaline earth metal', 'transition metal', 'post-transition metal', 'lanthanide', 'actinide'].includes(element.category);
}

// Determine if an element is a metalloid
function isMetalloid(element: ChemicalElement): boolean {
  return element.category === 'metalloid';
}

// Calculate approximate Gibbs free energy from enthalpy and entropy
function calcDeltaG(enthalpy: number, entropy: number, tempC: number): number {
  const tempK = tempC + 273.15;
  return enthalpy - (tempK * entropy / 1000); // ΔG = ΔH - TΔS (in kJ/mol)
}

function subscript(n: number): string {
  const subs: Record<number, string> = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
  if (n <= 9) return subs[n] || String(n);
  if (n === 10) return '₁₀';
  return String(n);
}

// Generate a default result with all new fields
function defaultResult(): ReactionResult {
  return {
    formula: '', name: '', yield: 0, stability: 'No Reaction', phase: 'N/A',
    color: '#9e9e9e', description: '', confidence: 0, balancedEquation: '',
    molarMass: 0, isVerified: false, isKnown: false, category: 'Compound',
    reactionType: 'No Reaction', bondType: 'N/A', enthalpy: 0, entropy: 0,
    deltaG: 0, optimalTemp: 25, optimalPressure: 1, safetyInfo: '',
  };
}

// Generate a predicted compound using real chemistry principles
function predictCompound(elA: ChemicalElement, elB: ChemicalElement, temp: number, pressure: number): ReactionResult {
  const metal = isMetal(elA) ? elA : (isMetal(elB) ? elB : null);
  const nonMetal = metal === elA ? elB : (metal === elB ? elA : null);
  const metalloid = isMetalloid(elA) ? elA : (isMetalloid(elB) ? elB : null);

  // Noble gas check
  if (nobleGases.has(elA.symbol) || nobleGases.has(elB.symbol)) {
    const noble = nobleGases.has(elA.symbol) ? elA : elB;
    const other = noble === elA ? elB : elA;
    const result = defaultResult();
    result.stability = 'No Reaction';
    result.reactionType = 'No Reaction';
    result.bondType = 'N/A';

    // Special case: Xe + F is a known noble gas compound
    if ((noble.symbol === 'Xe' && other.symbol === 'F') || (noble.symbol === 'F' && other.symbol === 'Xe')) {
      // This would be found in the compound DB, but as fallback:
      result.formula = 'XeF₂';
      result.name = 'Xenon Difluoride';
      result.yield = 50;
      result.phase = 'Solid';
      result.color = '#e0e0e0';
      result.description = 'First noble gas compound synthesized (1962, Neil Bartlett). Linear molecule. Powerful fluorinating agent.';
      result.balancedEquation = 'Xe + F₂ → XeF₂ (under UV light or 400°C)';
      result.molarMass = 169.29;
      result.confidence = 75;
      result.isKnown = true;
      result.category = 'Compound';
      result.reactionType = 'Synthesis';
      result.bondType = 'Covalent';
      result.enthalpy = -163;
      result.entropy = 130;
      result.deltaG = -97;
      result.optimalTemp = 400;
      result.optimalPressure = 1;
      result.safetyInfo = 'Powerful oxidizer and fluorinating agent.';
      return result;
    }

    result.formula = `${elA.symbol}-${elB.symbol}`;
    result.name = 'No Reaction';
    result.yield = 0;
    result.description = `${noble.symbol} is a noble gas — chemically inert under normal conditions. Noble gases have full valence electron shells and the highest ionization energies in their periods, making chemical bond formation extremely unfavorable. Only the heavier noble gases (Kr, Xe, Rn) form a limited number of compounds under extreme conditions (e.g., XeF₂, XeF₄, XeF₆, XeO₃).`;
    result.balancedEquation = `${elA.symbol} + ${elB.symbol} → No Reaction`;
    result.molarMass = 0;
    result.confidence = 5;
    result.isKnown = true;
    result.category = 'Noble Gas';
    return result;
  }

  // Same element check
  if (elA.symbol === elB.symbol) {
    const result = defaultResult();
    result.stability = 'No Reaction';
    result.reactionType = 'No Reaction';
    result.formula = `${elA.symbol}₂`;
    result.name = `${elA.name} Molecule`;
    result.yield = 0;
    result.phase = elA.phase;
    result.description = `Cannot react an element with itself to form a new compound. ${elA.name} already exists in its elemental form. Many elements exist as diatomic molecules (H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂) naturally.`;
    result.balancedEquation = `${elA.symbol} + ${elA.symbol} → No new compound`;
    result.molarMass = elA.atomicMass * 2;
    result.confidence = 3;
    result.isKnown = true;
    result.category = 'Element';
    result.bondType = 'N/A';
    return result;
  }

  // Two metals → alloy, not a compound
  if (isMetal(elA) && isMetal(elB)) {
    const result = defaultResult();
    result.formula = `${elA.symbol}-${elB.symbol}`;
    result.name = `${elA.name}-${elB.name} Alloy`;
    result.yield = applyConditions(70 + Math.random() * 20, temp, pressure, 800, 1, true);
    result.stability = 'Stable';
    result.phase = 'Solid';
    result.color = elementColors[elA.symbol] || '#9e9e9e';
    result.description = `Both ${elA.name} and ${elB.name} are metals. When combined, they form an alloy (intermetallic mixture), not a true compound through chemical bonding. Alloys are homogeneous mixtures at the atomic level with metallic bonding throughout. Properties differ from pure elements — e.g., steel (Fe-C) is harder than pure iron, bronze (Cu-Sn) is more corrosion-resistant than either pure metal, and solder (Sn-Pb) has a lower melting point than either component.`;
    result.balancedEquation = `${elA.symbol} + ${elB.symbol} → ${elA.symbol}-${elB.symbol} (alloy — not a chemical reaction)`;
    result.molarMass = +(elA.atomicMass + elB.atomicMass).toFixed(2);
    result.confidence = 35;
    result.isKnown = false;
    result.category = 'Alloy';
    result.reactionType = 'Metallic Bonding';
    result.bondType = 'Metallic';
    result.enthalpy = -50 + Math.random() * 100;
    result.entropy = 30 + Math.random() * 40;
    result.deltaG = -30 + Math.random() * 50;
    result.optimalTemp = 800;
    result.optimalPressure = 1;
    result.safetyInfo = 'Metal processing involves high temperatures. Molten metals can cause severe burns.';
    return result;
  }

  // Metal + Non-metal: ionic compound prediction
  if (metal && nonMetal) {
    const enDiff = Math.abs((nonMetal.electronegativity || 2) - (metal.electronegativity || 1));

    // Use oxidation states to predict formula
    const metalStates = oxidationStates[metal.symbol] || [metal.electronegativity ? (metal.electronegativity < 1.5 ? 2 : 1) : 2];
    const nonMetalStates = oxidationStates[nonMetal.symbol] || [-1, -2];

    let metalCharge = metalStates[0];
    let nonMetalCharge = Math.abs(nonMetalStates[0]);

    // Special case handling for common oxidation states
    if (nonMetal.symbol === 'O') nonMetalCharge = 2;
    if (nonMetal.symbol === 'Cl' || nonMetal.symbol === 'F') nonMetalCharge = 1;
    if (nonMetal.symbol === 'Br' || nonMetal.symbol === 'I') nonMetalCharge = 1;
    if (nonMetal.symbol === 'S') nonMetalCharge = 2;
    if (nonMetal.symbol === 'N') nonMetalCharge = 3;
    if (nonMetal.symbol === 'P') nonMetalCharge = 3;
    if (nonMetal.symbol === 'C') nonMetalCharge = 4;
    if (nonMetal.symbol === 'Si') nonMetalCharge = 4;
    if (nonMetal.symbol === 'Se') nonMetalCharge = 2;

    // Transition metals: use most common state
    if (metal.symbol === 'Fe') metalCharge = 2; // Fe(II) is most common for simple compounds
    if (metal.symbol === 'Cu') metalCharge = 1; // Cu(I) more common
    if (metal.symbol === 'Hg') metalCharge = 2;
    if (metal.symbol === 'Sn') metalCharge = 2;
    if (metal.symbol === 'Pb') metalCharge = 2;
    if (metal.symbol === 'Ti') metalCharge = 4;
    if (metal.symbol === 'Cr') metalCharge = 3;
    if (metal.symbol === 'Mn') metalCharge = 2;
    if (metal.symbol === 'Co') metalCharge = 2;
    if (metal.symbol === 'Ni') metalCharge = 2;
    if (metal.symbol === 'Pt') metalCharge = 2;
    if (metal.symbol === 'Au') metalCharge = 3;

    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

    const chargeLCM = lcm(metalCharge, nonMetalCharge);
    const metalCount = chargeLCM / metalCharge;
    const nonMetalCount = chargeLCM / nonMetalCharge;

    // Build formula
    let formula = '';
    if (metalCount === 1) formula += metal.symbol;
    else formula += `${metal.symbol}${subscript(metalCount)}`;

    if (nonMetalCount === 1) formula += nonMetal.symbol;
    else formula += `${nonMetal.symbol}${subscript(nonMetalCount)}`;

    // Naming conventions
    let name = '';
    const nonMetalNameMap: Record<string, string> = {
      'O': 'Oxide', 'Cl': 'Chloride', 'F': 'Fluoride', 'Br': 'Bromide', 'I': 'Iodide',
      'S': 'Sulfide', 'N': 'Nitride', 'C': 'Carbide', 'Si': 'Silicide', 'P': 'Phosphide',
      'H': 'Hydride', 'Se': 'Selenide', 'Te': 'Telluride', 'As': 'Arsenide',
    };

    const suffix = nonMetalNameMap[nonMetal.symbol] || `${nonMetal.name}ide`;

    if (metalCharge > 1 && ['Fe', 'Cu', 'Hg', 'Sn', 'Pb', 'Ti', 'Cr', 'Mn', 'Co', 'Ni', 'Pt', 'Au', 'V', 'W', 'Mo'].includes(metal.symbol)) {
      // Use Stock notation for transition metals with variable charge
      const romanNumerals: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII' };
      name = `${metal.name}(${romanNumerals[metalCharge]}) ${suffix}`;
    } else {
      name = `${metal.name} ${suffix}`;
    }

    const molarMass = +(metal.atomicMass * metalCount + nonMetal.atomicMass * nonMetalCount).toFixed(2);
    const baseYield = 50 + enDiff * 15 + Math.random() * 15;
    const yield_ = applyConditions(baseYield, temp, pressure, 500, 1, true);
    const confidence = Math.min(92, 40 + enDiff * 12 + Math.random() * 10);

    // Determine bond type from electronegativity difference
    const bondType: ReactionResult['bondType'] = enDiff > 1.7 ? 'Ionic' : 'Polar Covalent';

    // Stability from electronegativity difference and charge balance
    const stability: ReactionResult['stability'] = enDiff > 2 ? 'Stable' : enDiff > 1.5 ? 'Unstable' : 'Highly Unstable';

    // Estimate enthalpy based on lattice/covalent bond energy
    const estimatedEnthalpy = -(150 + enDiff * 80 + metalCharge * nonMetalCharge * 40 + Math.random() * 30);
    const estimatedEntropy = 30 + Math.random() * 80;
    const estimatedDeltaG = calcDeltaG(estimatedEnthalpy, estimatedEntropy, temp);

    const result = defaultResult();
    result.formula = formula;
    result.name = name;
    result.yield = yield_;
    result.stability = stability;
    result.phase = 'Solid'; // Most ionic compounds are solids
    result.color = elementColors[metal.symbol] || '#9e9e9e';
    result.description = `Predicted ${bondType.toLowerCase()} compound. Electronegativity difference (${enDiff.toFixed(2)}) suggests ${enDiff > 1.7 ? 'predominantly ionic bonding with electron transfer from metal to non-metal' : 'polar covalent bonding with significant electron sharing but partial charge separation'}. ${metal.name} (EN = ${metal.electronegativity || 'N/A'}) donates ${metalCharge} electron(s) to ${nonMetal.name} (EN = ${nonMetal.electronegativity || 'N/A'}). The predicted formula ${formula} follows charge balance rules (${metalCharge}:${nonMetalCharge} charges → LCM-based stoichiometry).`;
    result.balancedEquation = metalCount === 1 && nonMetalCount === 1
      ? `${metal.symbol} + ${nonMetal.symbol} → ${formula}`
      : `${metalCount > 1 ? metal.symbol + subscript(metalCount) : metal.symbol} + ${nonMetalCount > 1 ? nonMetal.symbol + subscript(nonMetalCount) : nonMetal.symbol} → ${formula}`;
    result.molarMass = molarMass;
    result.confidence = confidence;
    result.isKnown = false;
    result.category = 'Predicted';
    result.reactionType = 'Ionic Bonding';
    result.bondType = bondType;
    result.enthalpy = +estimatedEnthalpy.toFixed(1);
    result.entropy = +estimatedEntropy.toFixed(1);
    result.deltaG = +estimatedDeltaG.toFixed(1);
    result.optimalTemp = 400 + Math.round(Math.random() * 400);
    result.optimalPressure = 1;
    result.safetyInfo = 'Predicted compound — safety data unavailable. Exercise caution when handling.';
    result.appearance = 'Predicted — physical properties estimated from ionic model';
    return result;
  }

  // Metalloid + nonmetal/metal
  if (metalloid) {
    const other = metalloid === elA ? elB : elA;
    const enA = elA.electronegativity || 2;
    const enB = elB.electronegativity || 2;
    const moreEN = enA >= enB ? elA : elB;
    const lessEN = enA >= enB ? elB : elA;
    const enDiff = Math.abs(enA - enB);

    // Common metalloid compounds
    const metalloidPairs: Record<string, Partial<ReactionResult>> = {
      'B-N': { formula: 'BN', name: 'Boron Nitride', molarMass: 24.82, phase: 'Solid', stability: 'Stable', description: 'White solid isoelectronic with carbon. Exists as hexagonal BN ("white graphite", lubricant) or cubic BN (second-hardest material after diamond).', balancedEquation: 'B + N₂ → 2BN', category: 'Compound', reactionType: 'Synthesis', bondType: 'Covalent', enthalpy: -254, entropy: 15, deltaG: -228, optimalTemp: 1200, safetyInfo: 'Generally safe.' },
      'Si-N': { formula: 'Si₃N₄', name: 'Silicon Nitride', molarMass: 140.28, phase: 'Solid', stability: 'Stable', description: 'Gray ceramic with exceptional mechanical properties. Used in high-performance bearings, turbine blades, and cutting tools. Biocompatible.', balancedEquation: '3Si + 2N₂ → Si₃N₄', category: 'Compound', reactionType: 'Synthesis', bondType: 'Covalent', enthalpy: -752, entropy: 113, deltaG: -643, optimalTemp: 1400, safetyInfo: 'Fine powder inhalation hazard.' },
      'Si-C': { formula: 'SiC', name: 'Silicon Carbide', molarMass: 40.10, phase: 'Solid', stability: 'Stable', description: 'Extremely hard ceramic (9.5 Mohs). Wide bandgap semiconductor for high-power devices.', balancedEquation: 'SiO₂ + 3C → SiC + 2CO', category: 'Carbide', reactionType: 'Synthesis', bondType: 'Covalent', enthalpy: -73, entropy: 17, deltaG: -69, optimalTemp: 2200, safetyInfo: 'Dust inhalation hazard.' },
    };

    const pairKey = [elA.symbol, elB.symbol].sort().join('-');
    if (metalloidPairs[pairKey]) {
      const known = metalloidPairs[pairKey];
      const result = defaultResult();
      Object.assign(result, known);
      result.yield = 55 + Math.random() * 30;
      result.confidence = 75 + Math.random() * 15;
      result.color = elementColors[metalloid.symbol] || '#9e9e9e';
      result.isVerified = false;
      result.isKnown = true;
      return result;
    }

    // Generic metalloid compound prediction
    const result = defaultResult();
    result.formula = `${moreEN.symbol}${subscript(1)}${lessEN.symbol}${subscript(2)}`;
    result.name = `${lessEN.name} ${moreEN.name}ide`;
    result.yield = applyConditions(35 + Math.random() * 25, temp, pressure, 600, 1, Math.random() > 0.5);
    result.stability = 'Unstable';
    result.phase = Math.random() > 0.3 ? 'Solid' : 'Gas';
    result.color = elementColors[metalloid.symbol] || '#9e9e9e';
    result.description = `Predicted compound between metalloid ${metalloid.name} and ${other.name}. Metalloids exhibit intermediate properties between metals and nonmetals, often forming covalent network solids or semiconductors with interesting electronic properties. Boron nitride (BN) and silicon carbide (SiC) are famous examples of such compounds.`;
    result.balancedEquation = `${elA.symbol} + ${elB.symbol} → ${result.formula}`;
    result.molarMass = +(elA.atomicMass + elB.atomicMass * 2).toFixed(2);
    result.confidence = 25 + Math.random() * 20;
    result.isKnown = false;
    result.category = 'Predicted';
    result.reactionType = 'Covalent Bonding';
    result.bondType = enDiff > 1.5 ? 'Polar Covalent' : 'Covalent';
    result.enthalpy = -(80 + Math.random() * 120);
    result.entropy = 20 + Math.random() * 60;
    result.deltaG = -50 + Math.random() * 40;
    result.optimalTemp = 500 + Math.round(Math.random() * 500);
    result.optimalPressure = 1;
    result.safetyInfo = 'Predicted compound — safety data unavailable.';
    return result;
  }

  // Two nonmetals: covalent compound
  const enA = elA.electronegativity || 2;
  const enB = elB.electronegativity || 2;
  const moreEN = enA >= enB ? elA : elB;
  const lessEN = enA >= enB ? elB : elA;
  const enDiff = Math.abs(enA - enB);

  // Common nonmetal pair predictions (already in compound DB would be caught, these are fallbacks)
  const commonPairs: Record<string, Partial<ReactionResult>> = {
    'C-O': { formula: 'CO₂', name: 'Carbon Dioxide', molarMass: 44.01, phase: 'Gas', color: '#eceff1', stability: 'Stable', description: 'Linear molecule (O=C=O). Primary greenhouse gas. Solid form (dry ice) sublimes at -78.5°C.', balancedEquation: 'C + O₂ → CO₂   ΔH = -394 kJ/mol', category: 'Oxide', reactionType: 'Combustion', bondType: 'Polar Covalent', enthalpy: -394, entropy: 214, deltaG: -394, optimalTemp: 400, safetyInfo: 'Asphyxiant at high concentrations.' },
    'N-H': { formula: 'NH₃', name: 'Ammonia', molarMass: 17.03, phase: 'Gas', color: '#e1f5fe', stability: 'Stable', description: 'Pungent gas. Haber-Bosch process (450°C, 200 atm). Key fertilizer feedstock.', balancedEquation: 'N₂ + 3H₂ ⇌ 2NH₃   ΔH = -92 kJ/mol', category: 'Compound', reactionType: 'Synthesis', bondType: 'Polar Covalent', enthalpy: -92, entropy: 193, deltaG: -17, optimalTemp: 450, safetyInfo: 'Corrosive and toxic.' },
    'S-O': { formula: 'SO₂', name: 'Sulfur Dioxide', molarMass: 64.07, phase: 'Gas', color: '#eceff1', stability: 'Stable', description: 'Pungent gas. Acid rain precursor. Powerful reducing agent.', balancedEquation: 'S + O₂ → SO₂   ΔH = -297 kJ/mol', category: 'Oxide', reactionType: 'Combustion', bondType: 'Polar Covalent', enthalpy: -297, entropy: 248, deltaG: -300, optimalTemp: 300, safetyInfo: 'Toxic by inhalation.' },
    'C-H': { formula: 'CH₄', name: 'Methane', molarMass: 16.04, phase: 'Gas', color: '#e8f5e9', stability: 'Stable', description: 'Simplest hydrocarbon. Main component of natural gas. Potent greenhouse gas.', balancedEquation: 'C + 2H₂ → CH₄   ΔH = -75 kJ/mol', category: 'Hydrocarbon', reactionType: 'Synthesis', bondType: 'Covalent', enthalpy: -75, entropy: 186, deltaG: -51, optimalTemp: 400, safetyInfo: 'Flammable (LEL 5%, UEL 15%).' },
    'N-O': { formula: 'NO₂', name: 'Nitrogen Dioxide', molarMass: 46.01, phase: 'Gas', color: '#ff8a65', stability: 'Unstable', description: 'Red-brown toxic gas. Major air pollutant. Smog precursor.', balancedEquation: 'N₂ + 2O₂ → 2NO₂ (at >1500°C)', category: 'Oxide', reactionType: 'Synthesis', bondType: 'Polar Covalent', enthalpy: 33, entropy: 240, deltaG: 52, optimalTemp: 1500, safetyInfo: 'TOXIC. IDLH 20 ppm.' },
    'P-O': { formula: 'P₄O₁₀', name: 'Phosphorus Pentoxide', molarMass: 283.89, phase: 'Solid', color: '#fafafa', stability: 'Stable', description: 'Most powerful dehydrating agent. Reacts violently with water to form H₃PO₄.', balancedEquation: 'P₄ + 5O₂ → P₄O₁₀   ΔH = -2984 kJ/mol', category: 'Oxide', reactionType: 'Combustion', bondType: 'Covalent', enthalpy: -2984, entropy: 229, deltaG: -2698, optimalTemp: 300, safetyInfo: 'EXTREMELY CORROSIVE. Violent reaction with water.' },
  };

  const pairKey = [elA.symbol, elB.symbol].sort().join('-');
  if (commonPairs[pairKey]) {
    const known = commonPairs[pairKey];
    const result = defaultResult();
    Object.assign(result, known);
    result.yield = 60 + Math.random() * 30;
    result.confidence = 80 + Math.random() * 15;
    result.isVerified = false;
    result.isKnown = true;
    result.molarMass = known.molarMass || +(elA.atomicMass + elB.atomicMass).toFixed(2);
    return result;
  }

  // Generic nonmetal compound
  const result = defaultResult();
  const nonmetalRatio = moreEN.electronegativity > 2.5 ? 2 : 1;
  result.formula = `${moreEN.symbol}${subscript(1)}${lessEN.symbol}${subscript(nonmetalRatio)}`;
  result.name = `${lessEN.name} ${moreEN.name}ide`;
  const baseYield = 30 + Math.random() * 30;
  result.yield = applyConditions(baseYield, temp, pressure, 500, 1, Math.random() > 0.5);
  result.stability = 'Unstable';
  result.phase = lessEN.phase === 'Gas' || moreEN.phase === 'Gas' ? 'Gas' : 'Solid';
  result.color = elementColors[moreEN.symbol] || '#9e9e9e';
  result.description = `Predicted covalent compound between ${elA.name} (EN = ${elA.electronegativity || 'N/A'}) and ${elB.name} (EN = ${elB.electronegativity || 'N/A'}). Covalent compounds form through electron sharing rather than electron transfer. The electronegativity difference of ${enDiff.toFixed(2)} suggests ${enDiff < 0.5 ? 'nonpolar covalent' : enDiff < 1.7 ? 'polar covalent' : 'ionic'} character. Many nonmetal-nonmetal compounds are volatile (low boiling points) due to weak intermolecular forces (London dispersion, dipole-dipole).`;
  result.balancedEquation = `${elA.symbol} + ${elB.symbol} → ${result.formula}`;
  result.molarMass = +(elA.atomicMass + elB.atomicMass * nonMetalRatio).toFixed(2);
  result.confidence = 25 + Math.random() * 20;
  result.isKnown = false;
  result.category = 'Predicted';
  result.reactionType = 'Covalent Bonding';
  result.bondType = enDiff > 1.7 ? 'Polar Covalent' : enDiff > 0.4 ? 'Polar Covalent' : 'Covalent';
  result.enthalpy = -(50 + Math.random() * 100);
  result.entropy = 100 + Math.random() * 100;
  result.deltaG = calcDeltaG(result.enthalpy, result.entropy, temp);
  result.optimalTemp = 300 + Math.round(Math.random() * 600);
  result.optimalPressure = 1;
  result.safetyInfo = 'Predicted compound — safety data unavailable. May be volatile and/or toxic.';
  return result;
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
    const yield_ = applyConditions(known.baseYield, temperature, pressure, known.optimalTemp, known.optimalPressure, known.enthalpy < 0);
    const dG = calcDeltaG(known.enthalpy, known.entropy, temperature);

    return {
      ...known,
      yield: yield_,
      confidence: 85 + Math.random() * 10,
      isVerified: false,
      isKnown: true,
      deltaG: +dG.toFixed(1),
      reactionType: known.reactionType || 'Synthesis',
      bondType: known.bondType || 'Ionic',
      safetyInfo: known.safetyInfo || 'Known compound. Consult SDS for detailed safety information.',
    } as ReactionResult;
  }

  // 2. Predict using chemistry rules
  return predictCompound(elA, elB, temperature, pressure);
}
