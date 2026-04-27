import type { Compound } from '../types';

// Comprehensive real compound database
// Key: sorted element symbols joined with "-" (e.g., "Cl-Na" for NaCl)
export const compoundDB: Record<string, Compound> = {

  // === WATER & HYDROGEN COMPOUNDS ===
  'H-O': {
    formula: 'H₂O', name: 'Water', molarMass: 18.015, phase: 'Liquid',
    color: '#b3d9ff', stability: 'Stable',
    description: 'Essential solvent for life. Universal solvent with high specific heat capacity (4.18 J/g·K), high surface tension, and unique density anomaly (ice floats). Formed by highly exothermic combustion of hydrogen.',
    balancedEquation: '2H₂ + O₂ → 2H₂O  ΔH = -286 kJ/mol',
    category: 'Compound', uses: 'Drinking, industrial solvent, cooling systems, biological processes'
  },
  'H-Cl': {
    formula: 'HCl', name: 'Hydrochloric Acid', molarMass: 36.46, phase: 'Liquid',
    color: '#e8f5e9', stability: 'Stable',
    description: 'Strong monoprotic acid found in gastric juice (~0.1M). Fully dissociates in water. Major industrial chemical for steel pickling, pH control, and chemical synthesis.',
    balancedEquation: 'H₂ + Cl₂ → 2HCl  ΔH = -185 kJ/mol',
    category: 'Acid', uses: 'Steel pickling, food additive (E507), pH control, chemical manufacturing'
  },
  'H-F': {
    formula: 'HF', name: 'Hydrofluoric Acid', molarMass: 20.01, phase: 'Liquid',
    color: '#f3e5f5', stability: 'Stable',
    description: 'Extremely corrosive weak acid (pKa=3.17) that etches glass. Reacts with SiO₂ to form SiF₄. Used in semiconductor manufacturing and petroleum refining.',
    balancedEquation: 'H₂ + F₂ → 2HF  ΔH = -271 kJ/mol',
    category: 'Acid', uses: 'Glass etching, semiconductor manufacturing, uranium processing'
  },
  'H-S': {
    formula: 'H₂S', name: 'Hydrogen Sulfide', molarMass: 34.08, phase: 'Gas',
    color: '#fff9c4', stability: 'Unstable',
    description: 'Toxic gas with characteristic rotten egg odor. Flammable, forms explosive mixtures with air. Produced by anaerobic bacteria and volcanic activity.',
    balancedEquation: 'FeS + 2HCl → FeCl₂ + H₂S↑',
    category: 'Compound', uses: 'Sulfuric acid production, metallurgy, chemical synthesis'
  },
  'H-N': {
    formula: 'NH₃', name: 'Ammonia', molarMass: 17.03, phase: 'Gas',
    color: '#e1f5fe', stability: 'Stable',
    description: 'Pungent gas, cornerstone of fertilizer industry (Haber-Bosch process). Strong base in solution. Used in refrigeration and as a nitrogen source for amino acid synthesis.',
    balancedEquation: 'N₂ + 3H₂ ⇌ 2NH₃  ΔH = -92 kJ/mol (Haber process)',
    category: 'Compound', uses: 'Fertilizer (90% of production), refrigeration, cleaning agent, explosives'
  },

  // === ALKALI METAL HALIDES (salts) ===
  'Cl-Li': {
    formula: 'LiCl', name: 'Lithium Chloride', molarMass: 42.39, phase: 'Solid',
    color: '#ffffff', stability: 'Stable',
    description: 'Highly hygroscopic ionic salt. Deliquescent in moist air. Major industrial source of lithium. Used in Li-ion battery electrolytes and air conditioning.',
    balancedEquation: '2Li + Cl₂ → 2LiCl  ΔH = -408 kJ/mol',
    category: 'Salt', uses: 'Battery electrolytes, air conditioning, flux for welding aluminum'
  },
  'Cl-Na': {
    formula: 'NaCl', name: 'Sodium Chloride (Salt)', molarMass: 58.44, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Table salt. Most abundant dissolved salt in seawater (35 g/L). Essential electrolyte for nerve function. Cubic crystal lattice with 6:6 coordination. Melting point 801°C.',
    balancedEquation: '2Na + Cl₂ → 2NaCl  ΔH = -411 kJ/mol',
    category: 'Salt', uses: 'Food seasoning, de-icing roads, chemical feedstock, water treatment'
  },
  'Cl-K': {
    formula: 'KCl', name: 'Potassium Chloride', molarMass: 74.55, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'Major potassium fertilizer source (muriate of potash). Occurs naturally as sylvite. Essential plant nutrient. Also used in medical IV solutions.',
    balancedEquation: '2K + Cl₂ → 2KCl  ΔH = -436 kJ/mol',
    category: 'Salt', uses: 'Fertilizer (95% of production), medical injections, food processing'
  },
  'F-Na': {
    formula: 'NaF', name: 'Sodium Fluoride', molarMass: 41.99, phase: 'Solid',
    color: '#e8eaf6', stability: 'Stable',
    description: 'Colorless crystalline solid used in toothpaste for dental caries prevention. Incorporates into hydroxyapatite to form more acid-resistant fluorapatite. LD50 = 52 mg/kg.',
    balancedEquation: '2Na + F₂ → 2NaF',
    category: 'Salt', uses: 'Toothpaste additive, water fluoridation, insecticide, nuclear applications'
  },
  'Br-Na': {
    formula: 'NaBr', name: 'Sodium Bromide', molarMass: 102.89, phase: 'Solid',
    color: '#fce4ec', stability: 'Stable',
    description: 'White crystalline salt with slightly bitter taste. Used as a sedative in early medicine. Now primarily used in oil drilling fluids and photography.',
    balancedEquation: '2Na + Br₂ → 2NaBr  ΔH = -361 kJ/mol',
    category: 'Salt', uses: 'Oil drilling fluids, photography, pharmaceuticals, chemical synthesis'
  },
  'I-Na': {
    formula: 'NaI', name: 'Sodium Iodide', molarMass: 149.89, phase: 'Solid',
    color: '#fff8e1', stability: 'Stable',
    description: 'White crystalline salt. Used as a source of iodine in thyroid treatment. Key component in Finkelstein reaction for organic synthesis. Radioactive I-131 used in medical imaging.',
    balancedEquation: '2Na + I₂ → 2NaI  ΔH = -287 kJ/mol',
    category: 'Salt', uses: 'Thyroid treatment, medical imaging, Finkelstein reaction, nutritional supplement'
  },

  // === ALKALINE EARTH COMPOUNDS ===
  'Ca-Cl': {
    formula: 'CaCl₂', name: 'Calcium Chloride', molarMass: 110.98, phase: 'Solid',
    color: '#e3f2fd', stability: 'Stable',
    description: 'Highly hygroscopic salt. Exothermic dissolution (-82.8 kJ/mol). Major de-icing agent. Essential nutrient for cheese making (calcium chloride helps milk coagulate).',
    balancedEquation: 'Ca + Cl₂ → CaCl₂  ΔH = -795 kJ/mol',
    category: 'Salt', uses: 'De-icing roads, cheese making, desiccant, calcium supplement'
  },
  'Ca-O': {
    formula: 'CaO', name: 'Calcium Oxide (Quicklime)', molarMass: 56.08, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'White caustic solid produced by thermal decomposition of limestone at 825°C. Reacts vigorously with water (slaking) to produce Ca(OH)₂, releasing 63.7 kJ/mol. Used since antiquity in mortar.',
    balancedEquation: 'CaCO₃ → CaO + CO₂↑  (calcination at 825°C)',
    category: 'Oxide', uses: 'Cement production, steelmaking, soil pH correction, water treatment'
  },
  'Ca-C': {
    formula: 'CaCO₃', name: 'Calcium Carbonate', molarMass: 100.09, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Most abundant mineral on Earth. Forms limestone, marble, chalk, and travertine. Major component of shells, pearls, and eggshells. Dissolves in acid with CO₂ effervescence.',
    balancedEquation: 'CaO + CO₂ → CaCO₃',
    category: 'Mineral', uses: 'Building material, antacid (Tums), toothpaste filler, paper coating, plastics'
  },
  'Mg-O': {
    formula: 'MgO', name: 'Magnesium Oxide', molarMass: 40.30, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'White refractory solid with extremely high melting point (2852°C). Electrical insulator. Formed when magnesium burns with brilliant white flame. Refractive index 1.74.',
    balancedEquation: '2Mg + O₂ → 2MgO  ΔH = -1204 kJ/mol',
    category: 'Oxide', uses: 'Refractory bricks, electrical insulation, antacid (milk of magnesia), crucibles'
  },
  'Mg-Cl': {
    formula: 'MgCl₂', name: 'Magnesium Chloride', molarMass: 95.21, phase: 'Solid',
    color: '#e8eaf6', stability: 'Stable',
    description: 'Deliquescent salt found in seawater and mineral brines. Obtained from Dead Sea evaporation. Essential cofactor for many enzymes including DNA polymerase.',
    balancedEquation: 'Mg + Cl₂ → MgCl₂',
    category: 'Salt', uses: 'De-icing, tofu production (nigari), dust control, magnesium supplements'
  },

  // === TRANSITION METAL COMPOUNDS ===
  'Fe-O': {
    formula: 'Fe₂O₃', name: 'Iron(III) Oxide (Hematite/Rust)', molarMass: 159.69, phase: 'Solid',
    color: '#8b4513', stability: 'Stable',
    description: 'Red-brown solid. Most stable iron oxide under ambient conditions. Core of the Blast furnace for iron extraction (via CO reduction). Used as pigment since prehistoric cave paintings.',
    balancedEquation: '4Fe + 3O₂ → 2Fe₂O₃  ΔH = -1648 kJ/mol',
    category: 'Oxide', uses: 'Pigment (red ochre), iron ore, magnetic storage media, polishing compound'
  },
  'Fe-S': {
    formula: 'FeS', name: 'Iron(II) Sulfide (Pyrrhotite)', molarMass: 87.91, phase: 'Solid',
    color: '#424242', stability: 'Stable',
    description: 'Dark metallic mineral. Precursor to sulfuric acid via contact process. Black powder form reacts with HCl to produce H₂S gas. Found in meteorites.',
    balancedEquation: 'Fe + S → FeS  ΔH = -100 kJ/mol',
    category: 'Sulfide', uses: 'Sulfuric acid production, lab H₂S generation, meteorite identification'
  },
  'Fe-Cl': {
    formula: 'FeCl₃', name: 'Iron(III) Chloride', molarMass: 162.20, phase: 'Solid',
    color: '#7b1fa2', stability: 'Stable',
    description: 'Dark green crystalline solid, highly hygroscopic. Lewis acid catalyst. Used in PCB etching (ferric chloride etchant) and wastewater treatment as a flocculant.',
    balancedEquation: '2Fe + 3Cl₂ → 2FeCl₃',
    category: 'Salt', uses: 'PCB etching, water purification, catalyst, medicine (anemia treatment)'
  },
  'Cu-O': {
    formula: 'CuO', name: 'Copper(II) Oxide', molarMass: 79.55, phase: 'Solid',
    color: '#1a1a1a', stability: 'Stable',
    description: 'Black powder formed by heating copper in air above 300°C. Basic oxide, dissolves in acids to form Cu²⁺ salts. Used in thermite welding with aluminum powder.',
    balancedEquation: '2Cu + O₂ → 2CuO  ΔH = -314 kJ/mol',
    category: 'Oxide', uses: 'Ceramics, thermite reactions, gas sensors, pigments, catalyst'
  },
  'Cu-S': {
    formula: 'CuS', name: 'Copper(II) Sulfide (Covellite)', molarMass: 95.61, phase: 'Solid',
    color: '#0d47a1', stability: 'Stable',
    description: 'Indigo-blue crystalline mineral. Semiconductor (n-type). Found in copper ore deposits. Used in solar cells and lithium-sulfur battery research.',
    balancedEquation: 'Cu + S → CuS',
    category: 'Sulfide', uses: 'Solar cells, lithium-sulfur batteries, semiconductor research, pigment'
  },
  'Cu-Cl': {
    formula: 'CuCl₂', name: 'Copper(II) Chloride', molarMass: 134.45, phase: 'Solid',
    color: '#26a69a', stability: 'Stable',
    description: 'Yellow-brown deliquescent solid. Forms beautiful blue-green aqueous solutions. Lewis acid catalyst for organic reactions. Fungicide and algaecide.',
    balancedEquation: 'Cu + Cl₂ → CuCl₂',
    category: 'Salt', uses: 'Organic chemistry catalyst, pyrotechnics (blue/green flames), fungicide'
  },
  'Zn-O': {
    formula: 'ZnO', name: 'Zinc Oxide', molarMass: 81.38, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'White powder, amphoteric. Blocks UV light (SPF sunscreen). Wide bandgap semiconductor (3.37 eV). Piezoelectric. Zinc-deficient crystals are n-type conductors.',
    balancedEquation: '2Zn + O₂ → 2ZnO  ΔH = -698 kJ/mol',
    category: 'Oxide', uses: 'Sunscreen, rubber vulcanization, varistors, LED technology, coatings'
  },
  'Zn-S': {
    formula: 'ZnS', name: 'Zinc Sulfide', molarMass: 97.47, phase: 'Solid',
    color: '#fff9c4', stability: 'Stable',
    description: 'Found as sphalerite (cubic) and wurtzite (hexagonal). Direct bandgap semiconductor (3.54 eV). Core of cathode ray tubes and X-ray screens. Bioluminescent in some organisms.',
    balancedEquation: 'Zn + S → ZnS',
    category: 'Sulfide', uses: 'Luminescent paints, X-ray screens, optical coatings, phosphors'
  },
  'Zn-Cl': {
    formula: 'ZnCl₂', name: 'Zinc Chloride', molarMass: 136.29, phase: 'Solid',
    color: '#e0e0e0', stability: 'Stable',
    description: 'Extremely hygroscopic white solid. Dissolves in water with vigorous exothermic reaction. Used in dry cell batteries (Leclanché cell). Lewis acid catalyst.',
    balancedEquation: 'Zn + Cl₂ → ZnCl₂',
    category: 'Salt', uses: 'Batteries, textile processing, wood preservative, dental cement'
  },
  'Ag-Cl': {
    formula: 'AgCl', name: 'Silver Chloride', molarMass: 143.32, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'White precipitate that darkens on exposure to light (photochemical decomposition to Ag⁰). Extremely insoluble in water (Ksp = 1.8×10⁻¹⁰). Foundation of photographic film.',
    balancedEquation: 'Ag + Cl₂ → AgCl (photosensitive)',
    category: 'Salt', uses: 'Photography, antiseptic (silver nitrate), electrodes, wound dressings'
  },
  'Ti-O': {
    formula: 'TiO₂', name: 'Titanium Dioxide', molarMass: 79.87, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Most widely used white pigment (Pigment White 6). Extremely high refractive index (2.61). Used in photocatalytic water splitting research. Annual production exceeds 9 million tonnes.',
    balancedEquation: 'Ti + O₂ → TiO₂  ΔH = -944 kJ/mol',
    category: 'Oxide', uses: 'Paint pigment, sunscreen, photocatalysis, food coloring (E171), coatings'
  },
  'Al-O': {
    formula: 'Al₂O₃', name: 'Aluminum Oxide (Alumina)', molarMass: 101.96, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Extremely hard (9 Mohs, just below diamond). Electrical insulator but thermal conductor. Amphoteric — dissolves in both acid and base. Natural form: corundum (sapphire, ruby).',
    balancedEquation: '4Al + 3O₂ → 2Al₂O₃  ΔH = -3352 kJ/mol',
    category: 'Oxide', uses: 'Abrasives, aluminum smelting (Hall-Héroult), ceramics, gemstones, catalyst support'
  },
  'Al-Cl': {
    formula: 'AlCl₃', name: 'Aluminum Chloride', molarMass: 133.34, phase: 'Solid',
    color: '#ffe0b2', stability: 'Stable',
    description: 'Powerful Lewis acid. Key catalyst in Friedel-Crafts alkylation/acylation. Forms Al₂Cl₆ dimers in solid and liquid state. Hygroscopic — fumes in moist air.',
    balancedEquation: '2Al + 3Cl₂ → 2AlCl₃',
    category: 'Salt', uses: 'Friedel-Crafts reactions, polymerization catalyst, antiperspirant, petroleum refining'
  },
  'Si-O': {
    formula: 'SiO₂', name: 'Silicon Dioxide (Silica)', molarMass: 60.08, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Most abundant compound in Earth\'s crust. Forms quartz, sand, glass. 3D network covalent solid with each Si bonded to 4 O atoms (SiO₄ tetrahedra). Melting point 1713°C.',
    balancedEquation: 'Si + O₂ → SiO₂  ΔH = -911 kJ/mol',
    category: 'Oxide', uses: 'Glass manufacturing, semiconductor wafers, concrete aggregate, fiber optics'
  },
  'Pb-O': {
    formula: 'PbO', name: 'Lead(II) Oxide (Litharge)', molarMass: 223.20, phase: 'Solid',
    color: '#ffd600', stability: 'Stable',
    description: 'Yellow or red crystalline solid (two polymorphs). Amphoteric. Major component of lead-acid batteries. Historically used in paint (now banned in many countries due to toxicity).',
    balancedEquation: '2Pb + O₂ → 2PbO  ΔH = -437 kJ/mol',
    category: 'Oxide', uses: 'Lead-acid batteries, ceramics, glass, historically in paint (now banned)'
  },

  // === NONMETAL COMPOUNDS ===
  'C-O': {
    formula: 'CO₂', name: 'Carbon Dioxide', molarMass: 44.01, phase: 'Gas',
    color: '#eceff1', stability: 'Stable',
    description: 'Primary greenhouse gas (421 ppm in atmosphere, 2024). Linear molecule (O=C=O). Soluble in water forming carbonic acid. Solid form (dry ice) sublimes at -78.5°C.',
    balancedEquation: 'C + O₂ → CO₂  ΔH = -394 kJ/mol',
    category: 'Compound', uses: 'Carbonated beverages, fire extinguishers, supercritical extraction, welding shielding gas'
  },
  'C-H': {
    formula: 'CH₄', name: 'Methane', molarMass: 16.04, phase: 'Gas',
    color: '#e8f5e9', stability: 'Stable',
    description: 'Simplest hydrocarbon. Tetrahedral geometry. Main component of natural gas (70-90%). Potent greenhouse gas (80× CO₂ warming potential over 20 years). Produced by methanogenic archaea.',
    balancedEquation: 'C + 2H₂ → CH₄  ΔH = -75 kJ/mol',
    category: 'Hydrocarbon', uses: 'Natural gas fuel, hydrogen production (steam reforming), chemical feedstock'
  },
  'N-O': {
    formula: 'NO₂', name: 'Nitrogen Dioxide', molarMass: 46.01, phase: 'Gas',
    color: '#ff8a65', stability: 'Unstable',
    description: 'Red-brown toxic gas with characteristic sharp odor. Major air pollutant and precursor to photochemical smog and acid rain. Equilibrium with N₂O₄ (dimer). Strong oxidizing agent.',
    balancedEquation: 'N₂ + 2O₂ → 2NO₂ (at high temperature)',
    category: 'Oxide', uses: 'Nitric acid production (Ostwald process), rocket propellant oxidizer'
  },
  'S-O': {
    formula: 'SO₂', name: 'Sulfur Dioxide', molarMass: 64.07, phase: 'Gas',
    color: '#eceff1', stability: 'Stable',
    description: 'Pungent, colorless gas. Primary cause of acid rain (forms H₂SO₄ in atmosphere). Powerful reducing agent. Used as preservative (E220) in wine and dried fruit. Volcanic gas.',
    balancedEquation: 'S + O₂ → SO₂  ΔH = -297 kJ/mol',
    category: 'Oxide', uses: 'Sulfuric acid production, wine preservation (E220), bleaching agent, refrigerant'
  },
  'N-Cl': {
    formula: 'NCl₃', name: 'Nitrogen Trichloride', molarMass: 120.36, phase: 'Liquid',
    color: '#fff9c4', stability: 'Highly Unstable',
    description: 'Dense, oily, explosive yellow liquid. Extremely shock-sensitive — explodes with the slightest vibration. The compound that made Pierre Curie\'s notebook dangerously radioactive to this day.',
    balancedEquation: 'NH₃ + 3HOCl → NCl₃ + 3H₂O (DANGEROUS)',
    category: 'Compound', uses: 'Historically used in flour bleaching (discontinued due to explosions), small-scale synthesis only'
  },
  'O-S': {
    formula: 'SO₃', name: 'Sulfur Trioxide', molarMass: 80.06, phase: 'Solid',
    color: '#e0e0e0', stability: 'Stable',
    description: 'Corrosive, highly reactive oxide. Exists in polymeric solid form or as a gas. Reacts violently with water to form sulfuric acid. Key intermediate in contact process for H₂SO₄ production.',
    balancedEquation: '2SO₂ + O₂ → 2SO₃  ΔH = -198 kJ/mol (V₂O₅ catalyst)',
    category: 'Oxide', uses: 'Sulfuric acid production, sulfonation reactions, oleum manufacturing'
  },

  // === MORE METAL COMPOUNDS ===
  'Ba-S': {
    formula: 'BaSO₄', name: 'Barium Sulfate', molarMass: 233.39, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Extremely insoluble white solid (Ksp = 1.1×10⁻¹⁰). Radiopaque — used as X-ray contrast medium for GI imaging. "Baryte meal" was historically used in oil drilling.',
    balancedEquation: 'Ba²⁺ + SO₄²⁻ → BaSO₄↓',
    category: 'Salt', uses: 'X-ray contrast agent, oil drilling mud, paint pigment (blanc fixe)'
  },
  'Ag-S': {
    formula: 'Ag₂S', name: 'Silver Sulfide', molarMass: 247.80, phase: 'Solid',
    color: '#424242', stability: 'Stable',
    description: 'Black solid responsible for silver tarnish. Forms naturally as acanthite mineral. Insoluble in all solvents except concentrated nitric acid. Used in photographic development.',
    balancedEquation: '4Ag + 2H₂S + O₂ → 2Ag₂S + 2H₂O (tarnishing)',
    category: 'Sulfide', uses: 'Tarnish on silverware, inlays, solar cells, photographic film'
  },
  'Hg-S': {
    formula: 'HgS', name: 'Mercury(II) Sulfide', molarMass: 232.66, phase: 'Solid',
    color: '#b71c1c', stability: 'Stable',
    description: 'Brilliant red mineral (cinnabar). Primary ore of mercury since ancient times. Insoluble in water and acids. Used as red pigment (vermilion) since prehistoric cave art.',
    balancedEquation: 'Hg + S → HgS  ΔH = -58.2 kJ/mol',
    category: 'Sulfide', uses: 'Mercury extraction, red pigment (vermilion), traditional medicine'
  },
  'Hg-O': {
    formula: 'HgO', name: 'Mercury(II) Oxide', molarMass: 216.59, phase: 'Solid',
    color: '#ff6f00', stability: 'Unstable',
    description: 'Red or yellow solid. Decomposes to mercury and oxygen at 500°C (used by Priestley to discover oxygen in 1774). Antiseptic used in eye drops.',
    balancedEquation: '2HgO → 2Hg + O₂↑  (at 500°C)',
    category: 'Oxide', uses: 'Mercury production, antiseptic, skin ointments, battery cathodes'
  },
  'Au-Cl': {
    formula: 'AuCl₃', name: 'Gold(III) Chloride', molarMass: 303.33, phase: 'Solid',
    color: '#ff6f00', stability: 'Stable',
    description: 'Dark red crystalline solid. One of the few gold compounds stable enough to handle. Dissolves in water to form yellow solution. Used in gold plating and as a catalyst.',
    balancedEquation: '2Au + 3Cl₂ → 2AuCl₃',
    category: 'Salt', uses: 'Gold plating, photography, catalysis, gold nanoparticle synthesis'
  },
  'Pt-Cl': {
    formula: 'PtCl₂', name: 'Platinum(II) Chloride', molarMass: 265.99, phase: 'Solid',
    color: '#4a148c', stability: 'Stable',
    description: 'Dark green or brown crystalline solid. Precursor to cisplatin (chemotherapy drug). Catalyst for the Wacker process (ethylene to acetaldehyde).',
    balancedEquation: 'Pt + Cl₂ → PtCl₂',
    category: 'Salt', uses: 'Cisplatin chemotherapy production, Wacker process catalyst, electroplating'
  },
  'K-S': {
    formula: 'K₂S', name: 'Potassium Sulfide', molarMass: 110.26, phase: 'Solid',
    color: '#ffccbc', stability: 'Stable',
    description: 'Brownish-red crystalline solid. Strongly alkaline in solution. Reacts with water to produce KOH and H₂S. Used in leather tanning and as a depilatory.',
    balancedEquation: '2K + S → K₂S',
    category: 'Sulfide', uses: 'Leather tanning, depilatory, chemical synthesis, photography'
  },
  'Li-O': {
    formula: 'Li₂O', name: 'Lithium Oxide', molarMass: 29.88, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'White solid with the highest melting point of all alkali metal oxides (1432°C). Strongly basic. Absorbs CO₂ from air to form Li₂CO₃. Used in ceramics.',
    balancedEquation: '4Li + O₂ → 2Li₂O',
    category: 'Oxide', uses: 'Ceramics, CO₂ scrubbing on spacecraft, nuclear reactor coolant'
  },

  // === CARBON COMPOUNDS ===
  'Ca-C': {
    formula: 'CaC₂', name: 'Calcium Carbide', molarMass: 64.10, phase: 'Solid',
    color: '#424242', stability: 'Stable',
    description: 'Greyish-black solid that reacts with water to produce acetylene gas (C₂H₂). Discovered by Wöhler in 1862. Essential for producing acetylene for welding before electric arc welding.',
    balancedEquation: 'CaO + 3C → CaC₂ + CO  (electric arc furnace at 2000°C)',
    category: 'Carbide', uses: 'Acetylene production for welding, calcium cyanamide fertilizer, steel desulfurization'
  },
  'Si-C': {
    formula: 'SiC', name: 'Silicon Carbide', molarMass: 40.10, phase: 'Solid',
    color: '#37474f', stability: 'Stable',
    description: 'Extremely hard synthetic mineral (9.5 Mohs, near diamond). Excellent thermal conductor. Semiconductor used in high-power, high-frequency devices. Known as carborundum.',
    balancedEquation: 'SiO₂ + 3C → SiC + 2CO  (Acheson process at 1700°C)',
    category: 'Carbide', uses: 'Abrasives, semiconductor devices, armor, LED substrates, brake discs'
  },

  // === NOBLE GAS COMPOUNDS ===
  'Xe-F': {
    formula: 'XeF₂', name: 'Xenon Difluoride', molarMass: 169.29, phase: 'Solid',
    color: '#e0e0e0', stability: 'Stable',
    description: 'First noble gas compound synthesized (1962, Neil Bartlett). Colorless crystalline solid. Linear molecule. Powerful fluorinating agent. Paradoxically, one of the most stable xenon fluorides.',
    balancedEquation: 'Xe + F₂ → XeF₂  (under UV light or 400°C)',
    category: 'Compound', uses: 'Etching agent for silicon, organic synthesis fluorination, analytical chemistry'
  },

  // === ACID OXIDES ===
  'N-H': {
    formula: 'NO', name: 'Nitric Oxide', molarMass: 30.01, phase: 'Gas',
    color: '#e8eaf6', stability: 'Unstable',
    description: 'Colorless gas, free radical with one unpaired electron. Crucial signaling molecule in the human body (vasodilation). Nobel Prize in Medicine 1998 for its discovery. Reacts with O₂ to form NO₂.',
    balancedEquation: 'N₂ + O₂ → 2NO  ΔH = +181 kJ/mol (lightning/Birkeland-Eyde)',
    category: 'Compound', uses: 'Vasodilation drug (Viagra pathway), industrial nitric acid, biological signaling'
  },
  'N-S': {
    formula: 'N₂O', name: 'Nitrous Oxide (Laughing Gas)', molarMass: 44.01, phase: 'Gas',
    color: '#e8f5e9', stability: 'Stable',
    description: 'Colorless sweet-smelling gas. Used as anesthetic since 1844. Oxidizer in rocket engines (decomposes at 570°C to N₂ + O₂). Major greenhouse gas (298× CO₂ over 100 years).',
    balancedEquation: 'NH₄NO₃ → N₂O + 2H₂O  (at 240°C)',
    category: 'Compound', uses: 'Dental anesthesia, food propellant (whipped cream), rocket oxidizer'
  },

  // === MORE OXIDES ===
  'S-Fe': {
    formula: 'Fe₃O₄', name: 'Iron(II,III) Oxide (Magnetite)', molarMass: 231.53, phase: 'Solid',
    color: '#212121', stability: 'Stable',
    description: 'Black ferromagnetic mineral. Naturally magnetic lodestone. Mixed-valence compound with both Fe²⁺ and Fe³⁺. Used in MRI contrast agents and as a catalyst.',
    balancedEquation: '3Fe + 2O₂ → Fe₃O₄  (partial oxidation)',
    category: 'Oxide', uses: 'MRI contrast agents, ferrofluids, catalysts, magnetic storage media'
  },
  'Mn-O': {
    formula: 'MnO₂', name: 'Manganese Dioxide', molarMass: 86.94, phase: 'Solid',
    color: '#212121', stability: 'Stable',
    description: 'Black-brown solid. Major component of alkaline batteries (cathode). Catalyst for decomposition of hydrogen peroxide. Occurs naturally as pyrolusite mineral.',
    balancedEquation: 'Mn + O₂ → MnO₂',
    category: 'Oxide', uses: 'Alkaline batteries, H₂O₂ decomposition catalyst, ceramics, glass decolorizer'
  },
  'Cr-O': {
    formula: 'Cr₂O₃', name: 'Chromium(III) Oxide', molarMass: 151.99, phase: 'Solid',
    color: '#2e7d32', stability: 'Stable',
    description: 'Dark green crystalline solid. Amphoteric oxide. Basis of chrome green pigment. Used in stainless steel production (chromium metal extraction).耐火 refractory material.',
    balancedEquation: '4Cr + 3O₂ → 2Cr₂O₃',
    category: 'Oxide', uses: 'Pigment (chrome green), refractory material, stainless steel alloy, magnetic tape'
  },
};

// Helper: get compound key from two element symbols
export function getCompoundKey(symA: string, symB: string): string {
  return [symA, symB].sort().join('-');
}

// Lookup a compound by element pair
export function lookupCompound(symA: string, symB: string): Compound | null {
  const key = getCompoundKey(symA, symB);
  return compoundDB[key] || null;
}

// Check if a compound name/formula exists in database
export function compoundExists(symA: string, symB: string): boolean {
  return lookupCompound(symA, symB) !== null;
}
