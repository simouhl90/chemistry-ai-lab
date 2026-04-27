import type { Compound } from '../types';

// Comprehensive real compound database
// Key: sorted element symbols joined with "-" (e.g., "Cl-Na" for NaCl)
export const compoundDB: Record<string, Compound> = {

  // === WATER & HYDROGEN COMPOUNDS ===
  'H-O': {
    formula: 'H₂O', name: 'Water', molarMass: 18.015, phase: 'Liquid',
    color: '#b3d9ff', stability: 'Stable',
    description: 'Essential solvent for life. Universal solvent with high specific heat capacity (4.18 J/g·K), high surface tension (72.8 mN/m), and unique density anomaly (ice floats at 0.917 g/cm³). Formed by highly exothermic combustion of hydrogen in oxygen.',
    balancedEquation: '2H₂ + O₂ → 2H₂O   ΔH = -286 kJ/mol',
    category: 'Compound', baseYield: 95, reactionType: 'Synthesis', bondType: 'Polar Covalent',
    enthalpy: -286, entropy: 70, deltaG: -237, optimalTemp: 25, optimalPressure: 1,
    safetyInfo: 'Non-toxic. Essential for life. Steam can cause severe burns.',
    boilingPoint: 100, meltingPoint: 0, solubility: 'Miscible', appearance: 'Colorless liquid', crystalStructure: 'Hexagonal (ice Ih)',
    uses: 'Drinking, industrial solvent, cooling systems, biological processes, hydroelectric power'
  },
  'H-Cl': {
    formula: 'HCl', name: 'Hydrochloric Acid', molarMass: 36.46, phase: 'Liquid',
    color: '#e8f5e9', stability: 'Stable',
    description: 'Strong monoprotic acid found in gastric juice (~0.1M concentration). Fully dissociates in water (pKa = -7). Major industrial chemical for steel pickling, pH control, and chemical synthesis. Fumes in moist air.',
    balancedEquation: 'H₂ + Cl₂ → 2HCl   ΔH = -185 kJ/mol',
    category: 'Acid', baseYield: 90, reactionType: 'Synthesis', bondType: 'Polar Covalent',
    enthalpy: -185, entropy: 56, deltaG: -95, optimalTemp: 200, optimalPressure: 1,
    safetyInfo: 'Corrosive. Causes severe skin burns and eye damage. Toxic by inhalation (pungent fumes). Use in fume hood with PPE.',
    boilingPoint: -85, meltingPoint: -114, solubility: 'Completely miscible', appearance: 'Colorless fuming liquid',
    uses: 'Steel pickling, food additive (E507), pH control, chemical manufacturing, ore processing'
  },
  'H-F': {
    formula: 'HF', name: 'Hydrofluoric Acid', molarMass: 20.01, phase: 'Liquid',
    color: '#f3e5f5', stability: 'Stable',
    description: 'Extremely corrosive weak acid (pKa = 3.17) that etches glass by reacting with SiO₂. Unique in being both a weak acid and extremely dangerous — penetrates tissue and binds calcium/magnesium, causing deep tissue damage and cardiac arrest.',
    balancedEquation: 'H₂ + F₂ → 2HF   ΔH = -271 kJ/mol',
    category: 'Acid', baseYield: 85, reactionType: 'Synthesis', bondType: 'Polar Covalent',
    enthalpy: -271, entropy: 46, deltaG: -273, optimalTemp: 25, optimalPressure: 1,
    safetyInfo: 'EXTREMELY DANGEROUS. Causes severe deep tissue burns, bone decalcification, and potentially fatal cardiac effects. Antidote: calcium gluconate gel. Use only with specialized training.',
    boilingPoint: 20, meltingPoint: -84, solubility: 'Completely miscible', appearance: 'Colorless fuming liquid',
    uses: 'Glass etching, semiconductor manufacturing, uranium processing, Teflon production'
  },
  'H-S': {
    formula: 'H₂S', name: 'Hydrogen Sulfide', molarMass: 34.08, phase: 'Gas',
    color: '#fff9c4', stability: 'Unstable',
    description: 'Toxic gas with characteristic rotten egg odor detectable at 0.005 ppm. Flammable (LEL 4.3%, UEL 46%). Produced by anaerobic bacteria in swamps, sewers, and volcanic activity. Paralyzes olfactory nerve at high concentrations, making it even more lethal.',
    balancedEquation: 'FeS + 2HCl → FeCl₂ + H₂S↑',
    category: 'Compound', baseYield: 65, reactionType: 'Acid-Base', bondType: 'Polar Covalent',
    enthalpy: -20, entropy: 206, deltaG: -34, optimalTemp: 25, optimalPressure: 1,
    safetyInfo: 'Highly toxic (IDLH 100 ppm). Causes respiratory paralysis. Olfactory fatigue at >100 ppm. Use gas detectors.',
    boilingPoint: -60, meltingPoint: -86, solubility: '4 g/L (20°C)', appearance: 'Colorless gas with rotten egg odor',
    uses: 'Sulfuric acid production, metallurgy, chemical synthesis, heavy water production'
  },
  'H-N': {
    formula: 'NH₃', name: 'Ammonia', molarMass: 17.03, phase: 'Gas',
    color: '#e1f5fe', stability: 'Stable',
    description: 'Pungent gas, cornerstone of the fertilizer industry via the Haber-Bosch process (450°C, 200 atm, Fe catalyst). Strong base in solution (pKb = 4.75). Used in refrigeration (R-717) and as a nitrogen source for amino acid synthesis in living organisms.',
    balancedEquation: 'N₂ + 3H₂ ⇌ 2NH₃   ΔH = -92 kJ/mol (Haber process, 450°C, 200 atm)',
    category: 'Compound', baseYield: 55, reactionType: 'Synthesis', bondType: 'Polar Covalent',
    enthalpy: -92, entropy: 193, deltaG: -17, optimalTemp: 450, optimalPressure: 200,
    safetyInfo: 'Corrosive and toxic. Causes severe burns and respiratory damage. TLV 25 ppm. Use in well-ventilated areas.',
    boilingPoint: -33, meltingPoint: -78, solubility: '530 g/L (20°C)', appearance: 'Colorless pungent gas',
    uses: 'Fertilizer production (90% of total), refrigeration, cleaning agent, explosives (NH₄NO₃), nylon synthesis'
  },

  // === ALKALI METAL HALIDES ===
  'Cl-Li': {
    formula: 'LiCl', name: 'Lithium Chloride', molarMass: 42.39, phase: 'Solid',
    color: '#ffffff', stability: 'Stable',
    description: 'Highly hygroscopic ionic salt (deliquescent in moist air). Deliquesces at ~15% relative humidity. Major industrial source of lithium. Crystallizes in NaCl-type face-centered cubic lattice. Used in Li-ion battery electrolytes.',
    balancedEquation: '2Li + Cl₂ → 2LiCl   ΔH = -408 kJ/mol',
    category: 'Salt', baseYield: 92, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -408, entropy: 59, deltaG: -384, optimalTemp: 600, optimalPressure: 1,
    safetyInfo: 'Irritating to skin and eyes. Large doses affect the central nervous system.',
    boilingPoint: 1382, meltingPoint: 605, solubility: '830 g/L (20°C)', appearance: 'White crystalline solid', crystalStructure: 'Face-centered cubic',
    uses: 'Battery electrolytes, air conditioning (absorption chillers), flux for welding aluminum, mood stabilizer (Li⁺)'
  },
  'Cl-Na': {
    formula: 'NaCl', name: 'Sodium Chloride (Table Salt)', molarMass: 58.44, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Table salt. Most abundant dissolved salt in seawater (~35 g/L). Essential electrolyte for nerve impulse transmission. Crystallizes in face-centered cubic lattice with 6:6 coordination (rock salt structure). Melting point 801°C. Historically used as currency and food preservative.',
    balancedEquation: '2Na + Cl₂ → 2NaCl   ΔH = -411 kJ/mol',
    category: 'Salt', baseYield: 95, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -411, entropy: 72, deltaG: -384, optimalTemp: 800, optimalPressure: 1,
    safetyInfo: 'Generally safe. Excessive intake linked to hypertension. LD50 3000 mg/kg (oral, rat).',
    boilingPoint: 1465, meltingPoint: 801, solubility: '360 g/L (25°C)', appearance: 'White crystalline solid', crystalStructure: 'Face-centered cubic (rock salt)',
    uses: 'Food seasoning, de-icing roads, chemical feedstock (Cl₂, NaOH), water softening, physiological saline (0.9%)'
  },
  'Cl-K': {
    formula: 'KCl', name: 'Potassium Chloride', molarMass: 74.55, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'Major potassium fertilizer source (muriate of potash, MOP). Occurs naturally as sylvite mineral. Essential plant nutrient (K⁺ regulates stomatal opening). Used in medical IV solutions. Has a bitter-salty taste used in low-sodium salt substitutes.',
    balancedEquation: '2K + Cl₂ → 2KCl   ΔH = -436 kJ/mol',
    category: 'Salt', baseYield: 93, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -436, entropy: 83, deltaG: -408, optimalTemp: 770, optimalPressure: 1,
    safetyInfo: 'Generally safe in food amounts. Large IV doses can cause cardiac arrhythmia (hyperkalemia).',
    boilingPoint: 1420, meltingPoint: 770, solubility: '340 g/L (20°C)', appearance: 'White crystalline solid', crystalStructure: 'Face-centered cubic',
    uses: 'Fertilizer (95% of production), medical IV solutions, food processing (salt substitute), fire extinguishers'
  },
  'F-Na': {
    formula: 'NaF', name: 'Sodium Fluoride', molarMass: 41.99, phase: 'Solid',
    color: '#e8eaf6', stability: 'Stable',
    description: 'Colorless crystalline solid used in toothpaste for dental caries prevention. Incorporates into hydroxyapatite [Ca₅(PO₄)₃OH] to form more acid-resistant fluorapatite [Ca₅(PO₄)₃F]. Crystallizes in NaCl-type structure. LD50 = 52 mg/kg (oral, rat).',
    balancedEquation: '2Na + F₂ → 2NaF',
    category: 'Salt', baseYield: 88, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -574, entropy: 51, deltaG: -546, optimalTemp: 400, optimalPressure: 1,
    safetyInfo: 'Toxic if ingested in large amounts. Causes skeletal fluorosis with chronic exposure. Use as directed in dental products.',
    boilingPoint: 1704, meltingPoint: 993, solubility: '42 g/L (20°C)', appearance: 'White crystalline powder', crystalStructure: 'Face-centered cubic',
    uses: 'Toothpaste additive (1450 ppm F⁻), water fluoridation, insecticide, nuclear reactor coolant chemistry'
  },
  'Br-Na': {
    formula: 'NaBr', name: 'Sodium Bromide', molarMass: 102.89, phase: 'Solid',
    color: '#fce4ec', stability: 'Stable',
    description: 'White crystalline salt with slightly bitter taste. Used as a sedative in early 20th century medicine (bromides). Now primarily used in oil drilling fluids and as a precursor in organic synthesis. Also used in photographic processing.',
    balancedEquation: '2Na + Br₂ → 2NaBr   ΔH = -361 kJ/mol',
    category: 'Salt', baseYield: 90, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -361, entropy: 87, deltaG: -349, optimalTemp: 600, optimalPressure: 1,
    safetyInfo: 'Irritating. Chronic exposure may cause neurological effects (bromism).',
    boilingPoint: 1390, meltingPoint: 747, solubility: '940 g/L (20°C)', appearance: 'White crystalline powder', crystalStructure: 'Face-centered cubic',
    uses: 'Oil drilling fluids, photography, pharmaceuticals, chemical synthesis, flame retardant precursor'
  },
  'I-Na': {
    formula: 'NaI', name: 'Sodium Iodide', molarMass: 149.89, phase: 'Solid',
    color: '#fff8e1', stability: 'Stable',
    description: 'White crystalline salt. Used as a source of iodine in thyroid treatment (I⁻ is concentrated by the thyroid gland). Key component in Finkelstein reaction for organic synthesis (NaI + R-Cl → R-I + NaCl). Radioactive I-131 NaI used in nuclear medicine imaging and thyroid ablation.',
    balancedEquation: '2Na + I₂ → 2NaI   ΔH = -287 kJ/mol',
    category: 'Salt', baseYield: 88, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -287, entropy: 100, deltaG: -284, optimalTemp: 500, optimalPressure: 1,
    safetyInfo: 'Mild irritant. Radioactive isotopes require specialized handling and shielding.',
    boilingPoint: 1304, meltingPoint: 661, solubility: '1840 g/L (25°C)', appearance: 'White crystalline solid', crystalStructure: 'Face-centered cubic',
    uses: 'Thyroid treatment, medical imaging (scintigraphy), Finkelstein reaction, nutritional supplement (iodized salt)'
  },

  // === ALKALINE EARTH COMPOUNDS ===
  'Ca-Cl': {
    formula: 'CaCl₂', name: 'Calcium Chloride', molarMass: 110.98, phase: 'Solid',
    color: '#e3f2fd', stability: 'Stable',
    description: 'Highly hygroscopic salt (deliquescent). Dissolves exothermically (-82.8 kJ/mol), reaching temperatures of 60°C. Major de-icing agent effective to -32°C. Essential nutrient in cheese making (CaCl₂ helps casein coagulate). Occurs naturally as the mineral antarcticite.',
    balancedEquation: 'Ca + Cl₂ → CaCl₂   ΔH = -795 kJ/mol',
    category: 'Salt', baseYield: 94, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -795, entropy: 113, deltaG: -748, optimalTemp: 600, optimalPressure: 1,
    safetyInfo: 'Irritating to skin and eyes. Hygroscopic — can cause skin drying. Generally recognized as safe (GRAS) for food use.',
    boilingPoint: 1935, meltingPoint: 772, solubility: '745 g/L (20°C)', appearance: 'White hygroscopic solid', crystalStructure: 'Orthorhombic',
    uses: 'De-icing roads (effective to -32°C), cheese making, desiccant, calcium supplement, concrete accelerator'
  },
  'Ca-O': {
    formula: 'CaO', name: 'Calcium Oxide (Quicklime)', molarMass: 56.08, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'White caustic solid produced by thermal decomposition of limestone at 825°C (calcination). Reacts vigorously with water (slaking) to produce Ca(OH)₂, releasing 63.7 kJ/mol of heat — enough to ignite paper. Used since antiquity in Roman mortar and concrete.',
    balancedEquation: 'CaCO₃ → CaO + CO₂↑   (calcination at 825°C)',
    category: 'Oxide', baseYield: 85, reactionType: 'Decomposition', bondType: 'Ionic',
    enthalpy: -635, entropy: 40, deltaG: -604, optimalTemp: 825, optimalPressure: 1,
    safetyInfo: 'Corrosive. Reacts violently with water, producing heat and Ca(OH)₂. Causes severe skin and eye burns.',
    boilingPoint: 2850, meltingPoint: 2613, solubility: '1.3 g/L (20°C)', appearance: 'White caustic powder', crystalStructure: 'Face-centered cubic',
    uses: 'Cement production, steelmaking (flux), soil pH correction, water treatment, flue gas desulfurization'
  },
  'Ca-C': {
    formula: 'CaCO₃', name: 'Calcium Carbonate', molarMass: 100.09, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Most abundant mineral on Earth. Forms limestone, marble, chalk, and travertine. Major component of shells, pearls, and eggshells. Dissolves in acid with CO₂ effervescence. Used in the Solvay process for Na₂CO₃ production. Decomposes at 825°C to CaO + CO₂.',
    balancedEquation: 'CaO + CO₂ → CaCO₃',
    category: 'Mineral', baseYield: 80, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -1207, entropy: 93, deltaG: -1129, optimalTemp: 25, optimalPressure: 1,
    safetyInfo: 'Non-toxic. Dust inhalation may cause respiratory irritation. Generally safe.',
    boilingPoint: 1339, meltingPoint: 825, solubility: '0.014 g/L (25°C)', appearance: 'White powder or crystalline solid', crystalStructure: 'Trigonal (calcite)',
    uses: 'Building material (limestone), antacid (Tums), toothpaste filler, paper coating, plastics, cement'
  },
  'Mg-O': {
    formula: 'MgO', name: 'Magnesium Oxide', molarMass: 40.30, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'White refractory solid with extremely high melting point (2852°C). Excellent electrical insulator. Formed when magnesium burns with a brilliant white flame (used in pyrotechnics and incendiary weapons). Refractive index 1.74. Found naturally as periclase mineral.',
    balancedEquation: '2Mg + O₂ → 2MgO   ΔH = -1204 kJ/mol',
    category: 'Oxide', baseYield: 92, reactionType: 'Combustion', bondType: 'Ionic',
    enthalpy: -1204, entropy: 27, deltaG: -1130, optimalTemp: 600, optimalPressure: 1,
    safetyInfo: 'Dust is irritating to respiratory tract. Generally low toxicity.',
    boilingPoint: 3600, meltingPoint: 2852, solubility: '0.009 g/L (30°C)', appearance: 'White powder', crystalStructure: 'Face-centered cubic (rock salt)',
    uses: 'Refractory bricks, electrical insulation, antacid (milk of magnesia), crucibles, fiber optic production'
  },
  'Mg-Cl': {
    formula: 'MgCl₂', name: 'Magnesium Chloride', molarMass: 95.21, phase: 'Solid',
    color: '#e8eaf6', stability: 'Stable',
    description: 'Deliquescent salt found abundantly in seawater (12.7 g/L) and mineral brines. Obtained from Dead Sea evaporation (2% MgCl₂). Essential cofactor for many enzymes including DNA polymerase. Hexahydrate form (MgCl₂·6H₂O) is the common commercial form.',
    balancedEquation: 'Mg + Cl₂ → MgCl₂',
    category: 'Salt', baseYield: 90, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -641, entropy: 90, deltaG: -592, optimalTemp: 500, optimalPressure: 1,
    safetyInfo: 'Irritating. Generally safe at dietary levels. Hygroscopic — keep sealed.',
    boilingPoint: 1412, meltingPoint: 714, solubility: '540 g/L (20°C)', appearance: 'White hygroscopic crystals', crystalStructure: 'Layered (CdCl₂-type)',
    uses: 'De-icing, tofu production (nigari coagulant), dust control, magnesium supplements, PCR buffer component'
  },

  // === TRANSITION METAL COMPOUNDS ===
  'Fe-O': {
    formula: 'Fe₂O₃', name: 'Iron(III) Oxide (Hematite/Rust)', molarMass: 159.69, phase: 'Solid',
    color: '#8b4513', stability: 'Stable',
    description: 'Red-brown solid. Most thermodynamically stable iron oxide under ambient conditions. Core of the blast furnace for iron extraction (reduced by CO at ~1500°C). Used as pigment (red ochre) since prehistoric cave paintings at Lascaux (~17,000 years ago). Antiferromagnetic below 955 K (Néel temperature).',
    balancedEquation: '4Fe + 3O₂ → 2Fe₂O₃   ΔH = -1648 kJ/mol',
    category: 'Oxide', baseYield: 88, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -1648, entropy: 87, deltaG: -1489, optimalTemp: 500, optimalPressure: 1,
    safetyInfo: 'Non-toxic. Dust inhalation may cause siderosis. Generally safe.',
    boilingPoint: 1565, meltingPoint: 1565, solubility: 'Insoluble in water', appearance: 'Red-brown powder', crystalStructure: 'Rhombohedral (corundum-type)',
    uses: 'Pigment (red ochre), iron ore, magnetic storage media, polishing compound, catalyst (Haber process)'
  },
  'Fe-S': {
    formula: 'FeS', name: 'Iron(II) Sulfide (Pyrrhotite)', molarMass: 87.91, phase: 'Solid',
    color: '#424242', stability: 'Stable',
    description: 'Dark metallic mineral. Precursor to sulfuric acid via the contact process. Black powder form reacts readily with HCl to produce H₂S gas (test for sulfide ions). Found in meteorites as troilite (FeS stoichiometric). Nickel-iron meteorites contain troilite inclusions.',
    balancedEquation: 'Fe + S → FeS   ΔH = -100 kJ/mol',
    category: 'Sulfide', baseYield: 85, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -100, entropy: 60, deltaG: -100, optimalTemp: 700, optimalPressure: 1,
    safetyInfo: 'Low toxicity. Reacts with acid to release toxic H₂S gas.',
    boilingPoint: 1193, meltingPoint: 1193, solubility: 'Insoluble', appearance: 'Dark bronze/black metallic solid', crystalStructure: 'Hexagonal (nickel arsenide-type)',
    uses: 'Sulfuric acid production (contact process), lab H₂S generation, meteorite identification, steel production'
  },
  'Fe-Cl': {
    formula: 'FeCl₃', name: 'Iron(III) Chloride', molarMass: 162.20, phase: 'Solid',
    color: '#7b1fa2', stability: 'Stable',
    description: 'Dark green crystalline solid, highly hygroscopic (deliquescent). Powerful Lewis acid catalyst. Used in PCB etching (ferric chloride etchant dissolves copper: 2FeCl₃ + Cu → 2FeCl₂ + CuCl₂). Effective flocculant in wastewater treatment for phosphate removal.',
    balancedEquation: '2Fe + 3Cl₂ → 2FeCl₃   ΔH = -399 kJ/mol',
    category: 'Salt', baseYield: 87, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -399, entropy: 142, deltaG: -334, optimalTemp: 300, optimalPressure: 1,
    safetyInfo: 'Corrosive. Causes severe skin and eye burns. Stains skin and clothing brown.',
    boilingPoint: 316, meltingPoint: 306, solubility: '440 g/L (20°C)', appearance: 'Dark green/brown crystalline solid', crystalStructure: 'Hexagonal layered structure',
    uses: 'PCB etching, water purification (flocculant), catalyst (Friedel-Crafts), medicine (anemia treatment), dye manufacture'
  },
  'Cu-O': {
    formula: 'CuO', name: 'Copper(II) Oxide', molarMass: 79.55, phase: 'Solid',
    color: '#1a1a1a', stability: 'Stable',
    description: 'Black powder formed by heating copper metal in air above 300°C. Basic oxide, dissolves in acids to form Cu²⁺ salts (blue solutions). Used in thermite welding with aluminum (CuO + Al → Al₂O₃ + Cu, ΔH = -202 kJ/g). p-type semiconductor with bandgap 1.2 eV.',
    balancedEquation: '2Cu + O₂ → 2CuO   ΔH = -314 kJ/mol',
    category: 'Oxide', baseYield: 88, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -314, entropy: 43, deltaG: -260, optimalTemp: 400, optimalPressure: 1,
    safetyInfo: 'Irritating to eyes and respiratory system. Harmful if swallowed.',
    boilingPoint: 1326, meltingPoint: 1326, solubility: 'Insoluble in water', appearance: 'Black powder', crystalStructure: 'Monoclinic',
    uses: 'Ceramics, thermite reactions, gas sensors (H₂ detection), pigments (tenorite), catalyst, lithium battery cathode'
  },
  'Cu-S': {
    formula: 'CuS', name: 'Copper(II) Sulfide (Covellite)', molarMass: 95.61, phase: 'Solid',
    color: '#0d47a1', stability: 'Stable',
    description: 'Indigo-blue crystalline mineral. Semiconductor (n-type) with bandgap ~2 eV. Found in copper ore deposits as a secondary mineral. Used in solar cells and lithium-sulfur battery research as cathode material. Exhibits interesting electrical properties due to mixed Cu⁺/Cu²⁺ valence states.',
    balancedEquation: 'Cu + S → CuS',
    category: 'Sulfide', baseYield: 82, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -53, entropy: 66, deltaG: -54, optimalTemp: 500, optimalPressure: 1,
    safetyInfo: 'Low toxicity. Copper compounds can be toxic in large amounts.',
    boilingPoint: 220, meltingPoint: 220, solubility: 'Insoluble in water', appearance: 'Dark blue/black indigo crystalline solid', crystalStructure: 'Hexagonal',
    uses: 'Solar cells, lithium-sulfur batteries, semiconductor research, pigment, mineral specimen'
  },
  'Cu-Cl': {
    formula: 'CuCl₂', name: 'Copper(II) Chloride', molarMass: 134.45, phase: 'Solid',
    color: '#26a69a', stability: 'Stable',
    description: 'Yellow-brown deliquescent solid. Forms beautiful blue-green aqueous solutions ([Cu(H₂O)₆]²⁺ complex). Lewis acid catalyst for organic reactions (e.g., Sandmeyer reaction). Fungicide and algaecide. Dihydrate form is blue-green crystals.',
    balancedEquation: 'Cu + Cl₂ → CuCl₂',
    category: 'Salt', baseYield: 86, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -206, entropy: 108, deltaG: -150, optimalTemp: 300, optimalPressure: 1,
    safetyInfo: 'Toxic if ingested. Irritating to skin and eyes. Environmental hazard to aquatic life.',
    boilingPoint: 993, meltingPoint: 498, solubility: '700 g/L (20°C)', appearance: 'Yellow-brown deliquescent solid', crystalStructure: 'Monoclinic (distorted CdCl₂)',
    uses: 'Organic chemistry catalyst (Sandmeyer), pyrotechnics (blue/green flames), fungicide, wood preservative, battery electrolyte'
  },
  'Zn-O': {
    formula: 'ZnO', name: 'Zinc Oxide', molarMass: 81.38, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'White powder, amphoteric (dissolves in both acids and bases). Blocks UV light effectively (broadband UVA/UVB absorber — active ingredient in sunscreen). Wide direct bandgap semiconductor (3.37 eV). Strong piezoelectric effect. Zn-deficient crystals are n-type conductors.',
    balancedEquation: '2Zn + O₂ → 2ZnO   ΔH = -698 kJ/mol',
    category: 'Oxide', baseYield: 93, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -698, entropy: 44, deltaG: -643, optimalTemp: 500, optimalPressure: 1,
    safetyInfo: 'Generally safe. Inhalation of fumes causes metal fume fever (flu-like symptoms). GRAS status for food use.',
    boilingPoint: 2360, meltingPoint: 1975, solubility: '0.016 g/L (30°C)', appearance: 'White powder', crystalStructure: 'Hexagonal wurtzite / cubic zincblende',
    uses: 'Sunscreen (SPF), rubber vulcanization, varistors (surge protectors), LED technology, paints, dietary supplement'
  },
  'Zn-S': {
    formula: 'ZnS', name: 'Zinc Sulfide', molarMass: 97.47, phase: 'Solid',
    color: '#fff9c4', stability: 'Stable',
    description: 'Found as sphalerite (cubic zincblende) and wurtzite (hexagonal) polymorphs. Direct wide bandgap semiconductor (3.54 eV). Core material of cathode ray tubes and X-ray screens. When doped with activators (Cu, Ag, Mn), exhibits strong phosphorescence — the basis of luminous paints and glow-in-the-dark materials.',
    balancedEquation: 'Zn + S → ZnS',
    category: 'Sulfide', baseYield: 90, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -206, entropy: 58, deltaG: -201, optimalTemp: 600, optimalPressure: 1,
    safetyInfo: 'Low toxicity. Cadmium-doped ZnS phosphors contain toxic Cd.',
    boilingPoint: 1720, meltingPoint: 1700 (sublimes), solubility: 'Insoluble in water', appearance: 'White to yellowish powder', crystalStructure: 'Cubic (sphalerite) / Hexagonal (wurtzite)',
    uses: 'Luminescent paints, X-ray screens, optical coatings, phosphors (CRT), electroluminescent panels'
  },
  'Zn-Cl': {
    formula: 'ZnCl₂', name: 'Zinc Chloride', molarMass: 136.29, phase: 'Solid',
    color: '#e0e0e0', stability: 'Stable',
    description: 'Extremely hygroscopic white solid. Dissolves in water with vigorous exothermic reaction. Used in dry cell batteries (Leclanché cell, 1866). Powerful Lewis acid catalyst (Friedel-Crafts acylation). Solutions corrode cellulose — used in textile processing and wood preservation.',
    balancedEquation: 'Zn + Cl₂ → ZnCl₂',
    category: 'Salt', baseYield: 90, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -416, entropy: 111, deltaG: -369, optimalTemp: 400, optimalPressure: 1,
    safetyInfo: 'Corrosive. Causes skin and eye burns. Toxic if ingested. Environmental hazard.',
    boilingPoint: 732, meltingPoint: 290, solubility: '4320 g/L (25°C)', appearance: 'White hygroscopic crystals', crystalStructure: 'Tetragonal (layered)',
    uses: 'Batteries (Leclanché cell), textile processing, wood preservative, dental cement, galvanizing flux'
  },
  'Ag-Cl': {
    formula: 'AgCl', name: 'Silver Chloride', molarMass: 143.32, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'White precipitate that darkens on exposure to light (photochemical decomposition: 2AgCl → 2Ag + Cl₂). Extremely insoluble in water (Ksp = 1.8 × 10⁻¹⁰). Foundation of photographic film (Talbot, 1839). Ag/AgCl electrode is the standard reference electrode in electrochemistry (E° = +0.222 V).',
    balancedEquation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    category: 'Salt', baseYield: 95, reactionType: 'Precipitation', bondType: 'Ionic',
    enthalpy: -127, entropy: 96, deltaG: -110, optimalTemp: 25, optimalPressure: 1,
    safetyInfo: 'Low toxicity. Can cause argyria (blue-gray skin) with chronic silver exposure. Light-sensitive.',
    boilingPoint: 1547, meltingPoint: 455, solubility: '0.0019 g/L (25°C)', appearance: 'White crystalline solid (darkens with light)', crystalStructure: 'Face-centered cubic (NaCl-type)',
    uses: 'Photography (film/prints), antiseptic (silver nitrate), reference electrodes, wound dressings, cloud seeding'
  },
  'Ti-O': {
    formula: 'TiO₂', name: 'Titanium Dioxide', molarMass: 79.87, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Most widely produced white pigment globally (Pigment White 6, ~9 million tonnes/year). Extremely high refractive index (2.61 for rutile), making it an excellent opacifier. Used in photocatalytic water splitting research (Fujishima-Honda effect, 1972). Exists in three polymorphs: rutile, anatase, and brookite.',
    balancedEquation: 'Ti + O₂ → TiO₂   ΔH = -944 kJ/mol',
    category: 'Oxide', baseYield: 90, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -944, entropy: 51, deltaG: -889, optimalTemp: 700, optimalPressure: 1,
    safetyInfo: 'Generally safe. IARC Group 2B (possibly carcinogenic by inhalation of TiO₂ nanoparticles). Non-toxic in food.',
    boilingPoint: 2972, meltingPoint: 1843, solubility: 'Insoluble in water', appearance: 'White powder', crystalStructure: 'Tetragonal (rutile) / Tetragonal (anatase)',
    uses: 'Paint pigment (60% of production), sunscreen (UV blocker), photocatalysis, food coloring (E171), coatings, cosmetics'
  },
  'Al-O': {
    formula: 'Al₂O₃', name: 'Aluminum Oxide (Alumina)', molarMass: 101.96, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Extremely hard (9 Mohs, just below diamond at 10). Electrical insulator but excellent thermal conductor (30 W/m·K). Amphoteric — dissolves in both acid and base. Natural forms: corundum (colorless), ruby (Cr-doped), sapphire (Fe/Ti-doped). Widely used as abrasive and refractory material.',
    balancedEquation: '4Al + 3O₂ → 2Al₂O₃   ΔH = -3352 kJ/mol',
    category: 'Oxide', baseYield: 92, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -3352, entropy: 51, deltaG: -3160, optimalTemp: 800, optimalPressure: 1,
    safetyInfo: 'Dust inhalation may cause respiratory irritation (bauxite lung). Generally low toxicity.',
    boilingPoint: 2977, meltingPoint: 2072, solubility: 'Insoluble in water (amphoteric)', appearance: 'White powder', crystalStructure: 'Trigonal (corundum)',
    uses: 'Abrasives (sandpaper), aluminum smelting (Hall-Héroult process), ceramics, gemstones (ruby/sapphire), catalyst support'
  },
  'Al-Cl': {
    formula: 'AlCl₃', name: 'Aluminum Chloride', molarMass: 133.34, phase: 'Solid',
    color: '#ffe0b2', stability: 'Stable',
    description: 'Powerful Lewis acid (electron pair acceptor). Key catalyst in Friedel-Crafts alkylation and acylation reactions — the backbone of aromatic chemistry. Forms Al₂Cl₆ dimers in solid and liquid state. Hygroscopic — fumes in moist air releasing HCl. Used in ethylene polymerization (Ziegler-Natta type catalysts).',
    balancedEquation: '2Al + 3Cl₂ → 2AlCl₃',
    category: 'Salt', baseYield: 88, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -704, entropy: 110, deltaG: -629, optimalTemp: 300, optimalPressure: 1,
    safetyInfo: 'Corrosive. Reacts violently with water releasing HCl gas. Causes severe burns.',
    boilingPoint: 180 (sublimes), meltingPoint: 193, solubility: '460 g/L (25°C, exothermic)', appearance: 'White/yellow crystalline solid', crystalStructure: 'Layered cubic (close-packed Cl, Al in octahedral holes)',
    uses: 'Friedel-Crafts reactions, polymerization catalyst, antiperspirant (aluminum chlorohydrate), petroleum refining'
  },
  'Si-O': {
    formula: 'SiO₂', name: 'Silicon Dioxide (Silica)', molarMass: 60.08, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Most abundant compound in Earth\'s crust (~59% by mass). Forms quartz, sand, opal, and glass. 3D network covalent solid (each Si bonded to 4 O atoms in SiO₄ tetrahedra, each O shared by 2 Si). Melting point 1713°C. Piezoelectric in crystalline form. Basis of optical fiber technology.',
    balancedEquation: 'Si + O₂ → SiO₂   ΔH = -911 kJ/mol',
    category: 'Oxide', baseYield: 91, reactionType: 'Oxidation', bondType: 'Covalent',
    enthalpy: -911, entropy: 41, deltaG: -857, optimalTemp: 800, optimalPressure: 1,
    safetyInfo: 'Silica dust causes silicosis (lung disease) with chronic inhalation. Wear respiratory protection when handling dust.',
    boilingPoint: 2230, meltingPoint: 1713, solubility: 'Insoluble in water', appearance: 'White/colorless crystals or powder', crystalStructure: 'Trigonal (α-quartz)',
    uses: 'Glass manufacturing (70% SiO₂), semiconductor wafers, concrete aggregate, fiber optics, silica gel desiccant'
  },
  'Pb-O': {
    formula: 'PbO', name: 'Lead(II) Oxide (Litharge)', molarMass: 223.20, phase: 'Solid',
    color: '#ffd600', stability: 'Stable',
    description: 'Yellow or red crystalline solid (two polymorphs: yellow litharge β-PbO, red massicot α-PbO). Amphoteric. Major component of lead-acid batteries (positive plate). Historically used in paint (now banned in many countries due to lead toxicity). Melts at 886°C.',
    balancedEquation: '2Pb + O₂ → 2PbO   ΔH = -437 kJ/mol',
    category: 'Oxide', baseYield: 85, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -437, entropy: 68, deltaG: -389, optimalTemp: 400, optimalPressure: 1,
    safetyInfo: 'TOXIC. Lead compounds cause cumulative poisoning (affects nervous system, kidneys, blood). Banned in paint in many countries. Use with extreme caution.',
    boilingPoint: 1477, meltingPoint: 886, solubility: '0.017 g/L (20°C)', appearance: 'Yellow or red crystalline powder', crystalStructure: 'Tetragonal (litharge)',
    uses: 'Lead-acid batteries, ceramics glazes, glass (lead crystal), historically in paint (now banned), radiation shielding'
  },

  // === NONMETAL COMPOUNDS ===
  'C-O': {
    formula: 'CO₂', name: 'Carbon Dioxide', molarMass: 44.01, phase: 'Gas',
    color: '#eceff1', stability: 'Stable',
    description: 'Primary greenhouse gas (424 ppm atmospheric concentration, 2024). Linear molecule (O=C=O, 180° bond angle). Soluble in water forming weak carbonic acid (H₂CO₃, pKa = 6.35). Solid form (dry ice) sublimes at -78.5°C. Used in supercritical CO₂ extraction (31°C, 73 atm) — eco-friendly solvent.',
    balancedEquation: 'C + O₂ → CO₂   ΔH = -394 kJ/mol',
    category: 'Compound', baseYield: 92, reactionType: 'Combustion', bondType: 'Polar Covalent',
    enthalpy: -394, entropy: 214, deltaG: -394, optimalTemp: 400, optimalPressure: 1,
    safetyInfo: 'Asphyxiant at high concentrations (>5%). Heavier than air, accumulates in low areas. Not toxic at normal levels.',
    boilingPoint: -78, meltingPoint: -56.6, solubility: '1.45 g/L (25°C)', appearance: 'Colorless, odorless gas',
    uses: 'Carbonated beverages, fire extinguishers, supercritical extraction, welding shielding gas, enhanced oil recovery'
  },
  'C-H': {
    formula: 'CH₄', name: 'Methane', molarMass: 16.04, phase: 'Gas',
    color: '#e8f5e9', stability: 'Stable',
    description: 'Simplest hydrocarbon and simplest alkane. Tetrahedral geometry (109.5° bond angles). Main component of natural gas (70-90%). Potent greenhouse gas (80× CO₂ warming potential over 20 years). Produced by methanogenic archaea in wetlands, rice paddies, and animal digestive systems (cow burps).',
    balancedEquation: 'C + 2H₂ → CH₄   ΔH = -75 kJ/mol',
    category: 'Hydrocarbon', baseYield: 70, reactionType: 'Synthesis', bondType: 'Covalent',
    enthalpy: -75, entropy: 186, deltaG: -51, optimalTemp: 400, optimalPressure: 50,
    safetyInfo: 'Flammable (LEL 5%, UEL 15%). Asphyxiant. Forms explosive mixtures with air. Odorless — mercaptan added for leak detection.',
    boilingPoint: -162, meltingPoint: -183, solubility: '0.022 g/L (25°C)', appearance: 'Colorless, odorless gas',
    uses: 'Natural gas fuel (heating/electricity), hydrogen production (steam reforming), chemical feedstock, LNG transport'
  },
  'N-O': {
    formula: 'NO₂', name: 'Nitrogen Dioxide', molarMass: 46.01, phase: 'Gas',
    color: '#ff8a65', stability: 'Unstable',
    description: 'Red-brown toxic gas with characteristic sharp, biting odor. Major air pollutant from vehicle exhaust and power plants. Precursor to photochemical smog and acid rain (forms HNO₃). Equilibrium with colorless dimer N₂O₄ at low temperatures. Strong oxidizing agent.',
    balancedEquation: 'N₂ + 2O₂ → 2NO₂ (at high temperature, >1500°C)',
    category: 'Oxide', baseYield: 45, reactionType: 'Synthesis', bondType: 'Covalent',
    enthalpy: 33, entropy: 240, deltaG: 52, optimalTemp: 1500, optimalPressure: 1,
    safetyInfo: 'TOXIC. Causes severe lung damage, pulmonary edema. IDLH 20 ppm. Respiratory irritant at 0.1 ppm.',
    boilingPoint: 21, meltingPoint: -12, solubility: 'Reacts with water (forms HNO₃ + NO)', appearance: 'Red-brown paramagnetic gas',
    uses: 'Nitric acid production (Ostwald process), rocket propellant oxidizer, chemical intermediate'
  },
  'S-O': {
    formula: 'SO₂', name: 'Sulfur Dioxide', molarMass: 64.07, phase: 'Gas',
    color: '#eceff1', stability: 'Stable',
    description: 'Pungent, colorless gas with choking odor. Primary anthropogenic cause of acid rain (atmospheric oxidation to H₂SO₄). Powerful reducing agent and bleaching agent. Used as food preservative E220 in wine and dried fruit. Major atmospheric pollutant from coal combustion and volcanic eruptions.',
    balancedEquation: 'S + O₂ → SO₂   ΔH = -297 kJ/mol',
    category: 'Oxide', baseYield: 88, reactionType: 'Combustion', bondType: 'Covalent',
    enthalpy: -297, entropy: 248, deltaG: -300, optimalTemp: 300, optimalPressure: 1,
    safetyInfo: 'Toxic by inhalation. Causes severe respiratory irritation. IDLH 100 ppm. Environmental pollutant.',
    boilingPoint: -10, meltingPoint: -73, solubility: '94 g/L (25°C)', appearance: 'Colorless gas with pungent odor',
    uses: 'Sulfuric acid production (contact process), wine preservation (E220), bleaching agent, refrigerant, chemical intermediate'
  },
  'N-Cl': {
    formula: 'NCl₃', name: 'Nitrogen Trichloride', molarMass: 120.36, phase: 'Liquid',
    color: '#fff9c4', stability: 'Highly Unstable',
    description: 'Dense, oily, explosive yellow liquid. Extremely shock-sensitive — can detonate from the slightest vibration, heat, or ultraviolet light. The compound that made Pierre Curie\'s notebook dangerously radioactive to this day (he carried NCl₃-contaminated radium samples). One of the most explosive simple compounds known.',
    balancedEquation: 'NH₃ + 3HOCl → NCl₃ + 3H₂O (DANGEROUS — do not attempt)',
    category: 'Compound', baseYield: 15, reactionType: 'Synthesis', bondType: 'Polar Covalent',
    enthalpy: 230, entropy: 0, deltaG: 0, optimalTemp: -20, optimalPressure: 1,
    safetyInfo: 'EXTREMELY DANGEROUS. Explosive — sensitive to shock, heat, light, and organic compounds. Detonates unpredictably. DO NOT attempt synthesis outside professional lab.',
    boilingPoint: 71, meltingPoint: -40, solubility: 'Reacts with water', appearance: 'Dense oily yellow liquid',
    uses: 'Historically used in flour bleaching (discontinued due to explosions). No practical modern uses. Laboratory curiosity only.'
  },
  'O-S': {
    formula: 'SO₃', name: 'Sulfur Trioxide', molarMass: 80.06, phase: 'Solid',
    color: '#e0e0e0', stability: 'Stable',
    description: 'Corrosive, highly reactive oxide. Exists as polymeric solid (γ-SO₃), liquid, or gas depending on temperature. Reacts violently with water to form sulfuric acid (extremely exothermic). Key intermediate in the contact process for H₂SO₄ production — the world\'s most produced chemical (~260 million tonnes/year).',
    balancedEquation: '2SO₂ + O₂ → 2SO₃   ΔH = -198 kJ/mol (V₂O₅ catalyst, 400-600°C)',
    category: 'Oxide', baseYield: 82, reactionType: 'Oxidation', bondType: 'Covalent',
    enthalpy: -456, entropy: 257, deltaG: -370, optimalTemp: 450, optimalPressure: 2,
    safetyInfo: 'EXTREMELY CORROSIVE. Reacts violently with water (causes severe thermal burns). Strong oxidizer.',
    boilingPoint: 45, meltingPoint: 17, solubility: 'Reacts violently with water (forms H₂SO₄)', appearance: 'White crystalline solid / colorless liquid / gas',
    uses: 'Sulfuric acid production (>95%), sulfonation reactions, oleum manufacturing, detergents'
  },

  // === MORE METAL COMPOUNDS ===
  'Ba-S': {
    formula: 'BaSO₄', name: 'Barium Sulfate', molarMass: 233.39, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Extremely insoluble white solid (Ksp = 1.1 × 10⁻¹⁰). Radiopaque — oral suspension used as X-ray contrast medium for gastrointestinal imaging (barium meal/enema). Inert and non-toxic due to extremely low solubility (unlike soluble Ba²⁺ salts which are highly toxic). "Baryte meal" used in oil drilling.',
    balancedEquation: 'Ba²⁺ + SO₄²⁻ → BaSO₄↓',
    category: 'Salt', baseYield: 96, reactionType: 'Precipitation', bondType: 'Ionic',
    enthalpy: -1473, entropy: 132, deltaG: -1362, optimalTemp: 25, optimalPressure: 1,
    safetyInfo: 'Safe when insoluble. Soluble barium salts are highly toxic (Ba²⁺ blocks K⁺ channels).',
    boilingPoint: 1600, meltingPoint: 1580, solubility: '0.0024 g/L (25°C)', appearance: 'White crystalline powder', crystalStructure: 'Orthorhombic (barite)',
    uses: 'X-ray contrast agent (barium swallow), oil drilling mud, paint pigment (blanc fixe), paper coating, radiation shielding'
  },
  'Ag-S': {
    formula: 'Ag₂S', name: 'Silver Sulfide', molarMass: 247.80, phase: 'Solid',
    color: '#424242', stability: 'Stable',
    description: 'Black solid responsible for silver tarnish (reaction with trace H₂S in air: 4Ag + 2H₂S + O₂ → 2Ag₂S + 2H₂O). Forms naturally as acanthite mineral. Extremely insoluble in all solvents except concentrated nitric acid (aqua regia). The tarnish can be removed with aluminum in baking soda solution.',
    balancedEquation: '4Ag + 2H₂S + O₂ → 2Ag₂S + 2H₂O (tarnishing reaction)',
    category: 'Sulfide', baseYield: 78, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -32, entropy: 144, deltaG: -40, optimalTemp: 25, optimalPressure: 1,
    safetyInfo: 'Low toxicity. Silver compounds can cause argyria with chronic exposure.',
    boilingPoint: 825, meltingPoint: 825, solubility: 'Insoluble in all common solvents', appearance: 'Black metallic luster solid', crystalStructure: 'Monoclinic (acanthite)',
    uses: 'Tarnish on silverware (unwanted), inlays in metalwork, solar cells (Ag₂S thin films), photographic film'
  },
  'Hg-S': {
    formula: 'HgS', name: 'Mercury(II) Sulfide', molarMass: 232.66, phase: 'Solid',
    color: '#b71c1c', stability: 'Stable',
    description: 'Brilliant red mineral (cinnabar) — the primary ore of mercury since ancient times. Insoluble in water and dilute acids. Used as red pigment (vermilion) since 7000 BCE in Çatalhöyük cave paintings. Interestingly, cinnabar is insoluble and non-toxic, unlike elemental mercury which is highly toxic.',
    balancedEquation: 'Hg + S → HgS   ΔH = -58.2 kJ/mol',
    category: 'Sulfide', baseYield: 80, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -58, entropy: 82, deltaG: -49, optimalTemp: 300, optimalPressure: 1,
    safetyInfo: 'Insoluble form is relatively safe. Do NOT heat — releases toxic mercury vapor.',
    boilingPoint: 580, meltingPoint: 580, solubility: 'Insoluble in water and dilute acids', appearance: 'Brilliant red crystals (cinnabar) or black powder (metacinnabar)', crystalStructure: 'Trigonal (cinnabar)',
    uses: 'Mercury extraction (roasting to Hg vapor), red pigment (vermilion), traditional Chinese medicine (caution), mineral specimens'
  },
  'Hg-O': {
    formula: 'HgO', name: 'Mercury(II) Oxide', molarMass: 216.59, phase: 'Solid',
    color: '#ff6f00', stability: 'Unstable',
    description: 'Red or yellow solid (two polymorphs — color depends on particle size, not chemistry). Decomposes to mercury and oxygen at 500°C — the reaction Joseph Priestley used to discover oxygen in 1774. Used historically as antiseptic in eye drops and skin ointments. Primary electrode in mercury oxide batteries.',
    balancedEquation: '2HgO → 2Hg + O₂↑  (at 500°C, Priestley\'s oxygen discovery)',
    category: 'Oxide', baseYield: 60, reactionType: 'Decomposition', bondType: 'Ionic',
    enthalpy: -91, entropy: 70, deltaG: -58, optimalTemp: 25, optimalPressure: 1,
    safetyInfo: 'TOXIC. Contains mercury. Decomposes to toxic Hg vapor at elevated temperatures. Handle with gloves.',
    boilingPoint: 500, meltingPoint: 500, solubility: '0.005 g/L (25°C)', appearance: 'Red or yellow powder', crystalStructure: 'Orthorhombic (red) / Tetragonal (yellow)',
    uses: 'Mercury production, antiseptic (historical), skin ointments, mercury oxide batteries (1.35V), chemical reagent'
  },
  'Au-Cl': {
    formula: 'AuCl₃', name: 'Gold(III) Chloride', molarMass: 303.33, phase: 'Solid',
    color: '#ff6f00', stability: 'Stable',
    description: 'Dark red crystalline solid. One of the few gold compounds stable enough to handle in a standard lab. Dissolves in water to form deep yellow/cherry-red solutions of [AuCl₄]⁻ (tetrachloroaurate). Used in gold plating baths and as a homogeneous catalyst for organic reactions. Starting material for gold nanoparticle synthesis.',
    balancedEquation: '2Au + 3Cl₂ → 2AuCl₃',
    category: 'Salt', baseYield: 82, reactionType: 'Synthesis', bondType: 'Covalent',
    enthalpy: -118, entropy: 148, deltaG: -48, optimalTemp: 250, optimalPressure: 1,
    safetyInfo: 'Corrosive. Gold compounds can cause allergic reactions. Environmental hazard.',
    boilingPoint: 254, meltingPoint: 254, solubility: '680 g/L (20°C)', appearance: 'Dark red crystalline solid', crystalStructure: 'Monoclinic (planar AuCl₄ units)',
    uses: 'Gold plating, photography, catalysis, gold nanoparticle synthesis, organic chemistry reagent'
  },
  'Pt-Cl': {
    formula: 'PtCl₂', name: 'Platinum(II) Chloride', molarMass: 265.99, phase: 'Solid',
    color: '#4a148c', stability: 'Stable',
    description: 'Dark green or brown crystalline solid. Precursor to cisplatin [PtCl₂(NH₃)₂] — one of the most successful chemotherapy drugs (discovered by Barnett Rosenberg, 1965, approved by FDA in 1978). Catalyst for the Wacker process (oxidation of ethylene to acetaldehyde). Occurs as cooperite mineral (PtS, not PtCl₂).',
    balancedEquation: 'Pt + Cl₂ → PtCl₂',
    category: 'Salt', baseYield: 78, reactionType: 'Synthesis', bondType: 'Covalent',
    enthalpy: -78, entropy: 105, deltaG: -65, optimalTemp: 500, optimalPressure: 1,
    safetyInfo: 'Platinum compounds can be toxic and allergenic. Handle with care.',
    boilingPoint: 583, meltingPoint: 583, solubility: 'Slightly soluble in HCl', appearance: 'Dark green/brown crystalline solid', crystalStructure: 'Square planar',
    uses: 'Cisplatin chemotherapy production, Wacker process catalyst, electroplating, jewelry manufacturing'
  },
  'K-S': {
    formula: 'K₂S', name: 'Potassium Sulfide', molarMass: 110.26, phase: 'Solid',
    color: '#ffccbc', stability: 'Stable',
    description: 'Brownish-red crystalline solid. Strongly alkaline in solution (hydrolysis produces KOH and H₂S). Reacts vigorously with acids to release H₂S gas. Used in leather tanning (hair removal from hides) and historically as a depilatory. Hygroscopic — must be stored dry.',
    balancedEquation: '2K + S → K₂S',
    category: 'Sulfide', baseYield: 84, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -406, entropy: 102, deltaG: -371, optimalTemp: 300, optimalPressure: 1,
    safetyInfo: 'Toxic. Reacts with moisture and acids to release H₂S gas. Corrosive to skin and eyes.',
    boilingPoint: 912, meltingPoint: 840, solubility: 'Reacts with water', appearance: 'Brownish-red crystalline solid', crystalStructure: 'Anti-fluorite',
    uses: 'Leather tanning (depilatory), chemical synthesis, photography (developer), dye manufacturing'
  },
  'Li-O': {
    formula: 'Li₂O', name: 'Lithium Oxide', molarMass: 29.88, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'White solid with the highest melting point of all alkali metal oxides (1432°C). Strongly basic. Used in ceramic glazes and glasses. Absorbs CO₂ from air to form Li₂CO₃ (carbon capture application). Studied for tritium breeding in nuclear fusion reactor blankets (6Li + n → 4He + 3H).',
    balancedEquation: '4Li + O₂ → 2Li₂O   ΔH = -598 kJ/mol',
    category: 'Oxide', baseYield: 88, reactionType: 'Combustion', bondType: 'Ionic',
    enthalpy: -598, entropy: 38, deltaG: -562, optimalTemp: 500, optimalPressure: 1,
    safetyInfo: 'Corrosive. Reacts vigorously with water producing LiOH. Strong base.',
    boilingPoint: 2600, meltingPoint: 1432, solubility: 'React with water (exothermic)', appearance: 'White solid', crystalStructure: 'Face-centered cubic (antifluorite)',
    uses: 'Ceramics, CO₂ scrubbing (spacecraft/submarines), nuclear fusion tritium breeding, specialty glasses'
  },

  // === CARBON COMPOUNDS ===
  'C-Ca': {
    formula: 'CaC₂', name: 'Calcium Carbide', molarMass: 64.10, phase: 'Solid',
    color: '#424242', stability: 'Stable',
    description: 'Greyish-black solid that reacts with water to produce acetylene gas (CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂). Discovered by Wöhler in 1862. Essential for producing acetylene for welding (before electric arc welding became common). Produced in electric arc furnace at 2000°C from lime and coke.',
    balancedEquation: 'CaO + 3C → CaC₂ + CO   (electric arc furnace at ~2000°C)',
    category: 'Carbide', baseYield: 75, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -60, entropy: 70, deltaG: -65, optimalTemp: 2000, optimalPressure: 1,
    safetyInfo: 'Reacts violently with water producing flammable acetylene gas. Contact with moisture can cause fire/explosion.',
    boilingPoint: 2300, meltingPoint: 2300, solubility: 'Reacts with water', appearance: 'Greyish-black crystalline solid', crystalStructure: 'Tetragonal',
    uses: 'Acetylene production (welding/cutting), calcium cyanamide fertilizer, steel desulfurization, fruit ripening (C₂H₂)'
  },
  'C-Si': {
    formula: 'SiC', name: 'Silicon Carbide', molarMass: 40.10, phase: 'Solid',
    color: '#37474f', stability: 'Stable',
    description: 'Extremely hard synthetic mineral (9.5 Mohs, second only to diamond and boron carbide). Excellent thermal conductor (120 W/m·K). Wide bandgap semiconductor (3.26 eV) for high-power, high-frequency, and high-temperature devices. Known as carborundum (Edward Acheson, 1891). Exists in ~250 polytypes.',
    balancedEquation: 'SiO₂ + 3C → SiC + 2CO   (Acheson process, 1700-2500°C)',
    category: 'Carbide', baseYield: 70, reactionType: 'Synthesis', bondType: 'Covalent',
    enthalpy: -73, entropy: 17, deltaG: -69, optimalTemp: 2200, optimalPressure: 1,
    safetyInfo: 'Dust is irritating. Fine particles (nanoparticles) may cause respiratory issues.',
    boilingPoint: 2730, meltingPoint: 2730, solubility: 'Insoluble in all solvents', appearance: 'Black/green/blue iridescent crystals', crystalStructure: 'Hexagonal (α-SiC) / Cubic (β-SiC)',
    uses: 'Abrasives (grinding wheels), semiconductor power devices (MOSFETs, diodes), armor (ceramic plates), LED substrates, brake discs'
  },

  // === NOBLE GAS COMPOUNDS ===
  'F-Xe': {
    formula: 'XeF₂', name: 'Xenon Difluoride', molarMass: 169.29, phase: 'Solid',
    color: '#e0e0e0', stability: 'Stable',
    description: 'First noble gas compound ever synthesized (1962, Neil Bartlett, UBC). Colorless crystalline solid. Linear molecule (F-Xe-F, 180°). Powerful fluorinating agent. Paradoxically, XeF₂ is one of the most stable xenon fluorides. Sublimes readily at room temperature. Bartlett noticed Xe\'s ionization energy (1170 kJ) matched O₂⁺.',
    balancedEquation: 'Xe + F₂ → XeF₂   (under UV light or 400°C, excess Xe)',
    category: 'Compound', baseYield: 55, reactionType: 'Synthesis', bondType: 'Covalent',
    enthalpy: -163, entropy: 130, deltaG: -97, optimalTemp: 400, optimalPressure: 1,
    safetyInfo: 'Powerful oxidizer and fluorinating agent. Contact with organic materials may cause fire.',
    boilingPoint: 114, meltingPoint: 129, solubility: 'Reacts with water (slow hydrolysis)', appearance: 'Colorless crystalline solid', crystalStructure: 'Body-centered tetragonal',
    uses: 'Etching agent for silicon (microelectronics), organic synthesis fluorination, analytical chemistry reagent'
  },

  // === NITROGEN OXIDES ===
  'H-N': {
    formula: 'NO', name: 'Nitric Oxide', molarMass: 30.01, phase: 'Gas',
    color: '#e8eaf6', stability: 'Unstable',
    description: 'Colorless gas, free radical with one unpaired electron. Crucial signaling molecule in the human body (endothelium-derived relaxing factor, vasodilation). Nobel Prize in Medicine 1998 (Furchgott, Ignarro, Murad) for its discovery as a signaling molecule. Reacts rapidly with O₂ to form NO₂.',
    balancedEquation: 'N₂ + O₂ → 2NO   ΔH = +181 kJ/mol (endothermic, at >2000°C)',
    category: 'Compound', baseYield: 35, reactionType: 'Synthesis', bondType: 'Covalent',
    enthalpy: 91, entropy: 211, deltaG: 87, optimalTemp: 2500, optimalPressure: 1,
    safetyInfo: 'Toxic at high concentrations. Reacts rapidly with O₂ to form toxic NO₂. Short biological half-life (~2 seconds).',
    boilingPoint: -152, meltingPoint: -164, solubility: '0.06 g/L (25°C)', appearance: 'Colorless gas (oxidizes to brown NO₂ in air)',
    uses: 'Vasodilation drug (Viagra pathway, nitroglycerin), industrial nitric acid production (Ostwald process), biological signaling'
  },
  'N-S': {
    formula: 'N₂O', name: 'Nitrous Oxide (Laughing Gas)', molarMass: 44.01, phase: 'Gas',
    color: '#e8f5e9', stability: 'Stable',
    description: 'Colorless, sweet-smelling gas. First used as anesthetic by Horace Wells in 1844 (tooth extraction). Oxidizer in rocket engines (decomposes exothermically at 570°C: 2N₂O → 2N₂ + O₂, ΔH = -163 kJ/mol). Major greenhouse gas (298× CO₂ warming potential over 100 years). Increasing atmospheric concentration (~332 ppb, 2024).',
    balancedEquation: 'NH₄NO₃ → N₂O + 2H₂O   (at 240°C, thermal decomposition)',
    category: 'Compound', baseYield: 70, reactionType: 'Decomposition', bondType: 'Covalent',
    enthalpy: 82, entropy: 220, deltaG: 104, optimalTemp: 250, optimalPressure: 1,
    safetyInfo: 'Can cause dissociative anesthesia and euphoria. Prolonged exposure causes vitamin B12 deficiency. Asphyxiation risk in high concentrations.',
    boilingPoint: -88, meltingPoint: -91, solubility: '1.5 g/L (25°C)', appearance: 'Colorless sweet-smelling gas',
    uses: 'Dental anesthesia, food propellant (whipped cream), rocket oxidizer, automotive performance enhancement (NOS)'
  },

  // === ADDITIONAL TRANSITION METAL OXIDES ===
  'Fe-O-S': {
    formula: 'Fe₃O₄', name: 'Iron(II,III) Oxide (Magnetite)', molarMass: 231.53, phase: 'Solid',
    color: '#212121', stability: 'Stable',
    description: 'Black ferromagnetic mineral — naturally magnetic lodestone was humanity\'s first compass. Mixed-valence compound containing both Fe²⁺ and Fe³⁺ (inverse spinel structure). Used in MRI contrast agents (superparamagnetic iron oxide nanoparticles, SPIONs). Thermite burns at 2500°C.',
    balancedEquation: '3Fe + 2O₂ → Fe₃O₄  (controlled oxidation)',
    category: 'Oxide', baseYield: 86, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -1121, entropy: 146, deltaG: -1015, optimalTemp: 400, optimalPressure: 1,
    safetyInfo: 'Low toxicity. Fine powder is flammable and can cause dust explosions.',
    boilingPoint: 1597, meltingPoint: 1597, solubility: 'Insoluble in water', appearance: 'Black crystalline solid', crystalStructure: 'Inverse spinel cubic',
    uses: 'MRI contrast agents, ferrofluids, catalysts, magnetic storage media, thermite, iron ore (magnetite)'
  },
  'Mn-O': {
    formula: 'MnO₂', name: 'Manganese Dioxide', molarMass: 86.94, phase: 'Solid',
    color: '#212121', stability: 'Stable',
    description: 'Black-brown solid. Major component of alkaline batteries (cathode material: MnO₂ + Zn → ZnO + Mn₂O₃). Excellent catalyst for decomposition of hydrogen peroxide (classic lab demo). Occurs naturally as pyrolusite mineral. Used in dry cell batteries since 1866 (Leclanché cell).',
    balancedEquation: 'Mn + O₂ → MnO₂',
    category: 'Oxide', baseYield: 85, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -521, entropy: 53, deltaG: -466, optimalTemp: 500, optimalPressure: 1,
    safetyInfo: 'Dust inhalation can cause manganism (neurological disorder similar to Parkinson\'s). Use respiratory protection.',
    boilingPoint: 535, meltingPoint: 535, solubility: 'Insoluble in water', appearance: 'Black-brown powder', crystalStructure: 'Tetragonal (rutile-type)',
    uses: 'Alkaline batteries (cathode), H₂O₂ decomposition catalyst, ceramics, glass decolorizer, water treatment'
  },
  'Cr-O': {
    formula: 'Cr₂O₃', name: 'Chromium(III) Oxide', molarMass: 151.99, phase: 'Solid',
    color: '#2e7d32', stability: 'Stable',
    description: 'Dark green crystalline solid. Amphoteric oxide — dissolves in both acid (forms Cr³⁺) and base (forms [Cr(OH)₄]⁻). Basis of chrome green pigment. Key intermediate in stainless steel production (chromium extracted from chromite ore). Used as green pigment since antiquity.',
    balancedEquation: '4Cr + 3O₂ → 2Cr₂O₃',
    category: 'Oxide', baseYield: 87, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -1140, entropy: 81, deltaG: -1058, optimalTemp: 600, optimalPressure: 1,
    safetyInfo: 'Cr(III) compounds have low toxicity (unlike highly toxic Cr(VI) compounds). Dust irritant.',
    boilingPoint: 2435, meltingPoint: 2435, solubility: 'Insoluble in water (amphoteric)', appearance: 'Dark green crystalline powder', crystalStructure: 'Rhombohedral (corundum-type)',
    uses: 'Pigment (chrome green), refractory material, stainless steel alloy production, magnetic tape coating, polishing compound'
  },
  'Co-O': {
    formula: 'Co₃O₄', name: 'Cobalt(II,III) Oxide', molarMass: 240.80, phase: 'Solid',
    color: '#1a237e', stability: 'Stable',
    description: 'Black mixed-valence oxide containing both Co²⁺ and Co³⁺ (normal spinel structure). Major precursor to cobalt blue pigment (CoAl₂O₄) used in ceramics and glass since ancient times. Increasingly important as cathode material in lithium-ion batteries (NMC: LiNiMnCoO₂).',
    balancedEquation: '6Co + 4O₂ → 2Co₃O₄',
    category: 'Oxide', baseYield: 84, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -905, entropy: 90, deltaG: -795, optimalTemp: 600, optimalPressure: 1,
    safetyInfo: 'Cobalt compounds can be toxic and allergenic. Suspected carcinogen (IARC Group 2B).',
    boilingPoint: 900, meltingPoint: 900, solubility: 'Insoluble in water', appearance: 'Black powder', crystalStructure: 'Normal spinel cubic',
    uses: 'Ceramic pigments (cobalt blue), Li-ion battery cathodes, catalysts, glass coloring, enamel coatings'
  },
  'Ni-O': {
    formula: 'NiO', name: 'Nickel(II) Oxide', molarMass: 74.69, phase: 'Solid',
    color: '#4e342e', stability: 'Stable',
    description: 'Greenish-black solid with rock salt structure. Antiferromagnetic below 523 K (Néel temperature). Major component in ceramic glazes (green tints). Important p-type semiconductor (bandgap 3.6-4.0 eV). Used in nickel-metal hydride (NiMH) batteries and fuel cell electrodes.',
    balancedEquation: '2Ni + O₂ → 2NiO',
    category: 'Oxide', baseYield: 86, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -240, entropy: 38, deltaG: -212, optimalTemp: 500, optimalPressure: 1,
    safetyInfo: 'Nickel compounds are carcinogenic (IARC Group 1). Skin sensitizer. Use gloves and respirator.',
    boilingPoint: 1955, meltingPoint: 1955, solubility: 'Insoluble in water', appearance: 'Greenish-black powder', crystalStructure: 'Face-centered cubic (rock salt)',
    uses: 'Ceramic glazes, NiMH batteries, fuel cell electrodes, catalyst, electroplating, glass coloring'
  },

  // === ADDITIONAL HALIDES ===
  'Cl-Cu': {
    formula: 'CuCl', name: 'Copper(I) Chloride', molarMass: 98.99, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'White solid (pure) but often green due to oxidation to CuCl₂. Catalyst for the Wacker process (PdCl₂/CuCl₂ system oxidizes ethylene to acetaldehyde). Key intermediate in organic synthesis (Ullmann coupling, Sandmeyer reaction). Used in mercury removal from natural gas streams.',
    balancedEquation: '2Cu + Cl₂ → 2CuCl',
    category: 'Salt', baseYield: 80, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -137, entropy: 87, deltaG: -120, optimalTemp: 300, optimalPressure: 1,
    safetyInfo: 'Irritating to skin, eyes, and respiratory tract. Environmental hazard to aquatic life.',
    boilingPoint: 1490, meltingPoint: 423, solubility: '0.06 g/L (25°C)', appearance: 'White solid (often green-tinted)', crystalStructure: 'Zinc blende (cubic)',
    uses: 'Wacker process catalyst, organic synthesis (Ullmann, Sandmeyer), mercury removal from gas, fungicide, pigment'
  },
  'I-K': {
    formula: 'KI', name: 'Potassium Iodide', molarMass: 166.00, phase: 'Solid',
    color: '#fff8e1', stability: 'Stable',
    description: 'White crystalline solid. Most commercially important iodide salt. Used medicinally as potassium iodide supplement (thyroid protection during radiation emergencies — saturates thyroid with stable I-127, preventing I-131 uptake). In photography, forms silver iodide (light-sensitive). Classic test for oxidizing agents.',
    balancedEquation: '2K + I₂ → 2KI   (or 2KOH + HI → KI + H₂O)',
    category: 'Salt', baseYield: 92, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -328, entropy: 106, deltaG: -323, optimalTemp: 400, optimalPressure: 1,
    safetyInfo: 'Generally safe. Large doses can cause thyroid dysfunction. Use only as directed for radiation protection.',
    boilingPoint: 1330, meltingPoint: 681, solubility: '1400 g/L (20°C)', appearance: 'White crystalline solid', crystalStructure: 'Face-centered cubic (NaCl-type)',
    uses: 'Radiation protection (thyroid blocking), iodized salt, photographic film (AgI), expectorant, chemical reagent'
  },

  // === MORE OXIDES ===
  'Na-O': {
    formula: 'Na₂O', name: 'Sodium Oxide', molarMass: 61.98, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'White crystalline solid with antifluorite structure. Strongly basic oxide — reacts violently with water to form NaOH (caustic soda). Major component of glass manufacturing (combined with SiO₂ and CaO to form soda-lime glass, which is ~75% SiO₂, 15% Na₂O, 10% CaO).',
    balancedEquation: '4Na + O₂ → 2Na₂O',
    category: 'Oxide', baseYield: 85, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -414, entropy: 75, deltaG: -376, optimalTemp: 400, optimalPressure: 1,
    safetyInfo: 'Reacts violently with water. Forms corrosive NaOH. Causes severe skin and eye burns.',
    boilingPoint: 1950, meltingPoint: 1132, solubility: 'Reacts violently with water', appearance: 'White powder', crystalStructure: 'Antifluorite cubic',
    uses: 'Glass manufacturing (soda-lime glass), ceramics, NaOH production, chemical reagent'
  },
  'K-O': {
    formula: 'K₂O', name: 'Potassium Oxide', molarMass: 94.20, phase: 'Solid',
    color: '#f5f5f5', stability: 'Stable',
    description: 'Pale yellow solid. Strongly basic — reacts violently with water to form KOH (caustic potash). Used in fertilizer production (K₂O content is the standard measure of potassium in fertilizers). Component of certain glass formulations (potash glass). Antifluorite structure.',
    balancedEquation: '4K + O₂ → 2K₂O',
    category: 'Oxide', baseYield: 82, reactionType: 'Oxidation', bondType: 'Ionic',
    enthalpy: -363, entropy: 94, deltaG: -324, optimalTemp: 350, optimalPressure: 1,
    safetyInfo: 'Reacts violently with water forming corrosive KOH. Causes severe burns. Flammable.',
    boilingPoint: 1320, meltingPoint: 740, solubility: 'Reacts violently with water', appearance: 'Pale yellow solid', crystalStructure: 'Antifluorite cubic',
    uses: 'Fertilizer production, glass manufacturing (potash glass), KOH production, chemical reagent'
  },
  'C-Mg': {
    formula: 'MgC₂', name: 'Magnesium Acetylide', molarMass: 40.32, phase: 'Solid',
    color: '#424242', stability: 'Stable',
    description: 'Grey solid formed when magnesium carbide reacts with water to produce acetylene. Less common than calcium carbide. Relatively stable at room temperature. Reacts with acids to release acetylene gas. Exists as MgC₂ with C₂²⁻ acetylide ion.',
    balancedEquation: 'Mg + 2C → MgC₂  (at high temperature)',
    category: 'Carbide', baseYield: 50, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: 0, entropy: 0, deltaG: 0, optimalTemp: 1500, optimalPressure: 1,
    safetyInfo: 'Reacts with water/acid to produce flammable acetylene. Keep dry.',
    boilingPoint: 0, meltingPoint: 0, solubility: 'Reacts with water', appearance: 'Grey solid',
    uses: 'Acetylene production (minor), laboratory reagent'
  },
  'P-O': {
    formula: 'P₄O₁₀', name: 'Phosphorus Pentoxide', molarMass: 283.89, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'White crystalline solid. Most powerful known dehydrating agent — can dehydrate concentrated H₂SO₄ to SO₃. Reacts violently with water: P₄O₁₀ + 6H₂O → 4H₃PO₄ (phosphoric acid). Exists as P₄O₁₀ molecules with tetrahedral P₄ structure. Major industrial chemical for H₃PO₄ production.',
    balancedEquation: 'P₄ + 5O₂ → P₄O₁₀   ΔH = -2984 kJ/mol',
    category: 'Oxide', baseYield: 90, reactionType: 'Combustion', bondType: 'Covalent',
    enthalpy: -2984, entropy: 229, deltaG: -2698, optimalTemp: 300, optimalPressure: 1,
    safetyInfo: 'EXTREMELY CORROSIVE. Violent reaction with water releasing heat. Causes severe burns. Strong dehydrating agent.',
    boilingPoint: 360, meltingPoint: 340, solubility: 'Reacts violently with water', appearance: 'White crystalline powder/hygroscopic solid',
    uses: 'Phosphoric acid production, desiccant, dehydrating agent, flame retardant, optical glass manufacturing'
  },
  'N-Si': {
    formula: 'Si₃N₄', name: 'Silicon Nitride', molarMass: 140.28, phase: 'Solid',
    color: '#e0e0e0', stability: 'Stable',
    description: 'Gray ceramic material with exceptional mechanical properties. One of the hardest known materials (Vickers hardness ~2000). Excellent thermal shock resistance (low thermal expansion coefficient). Used in high-performance ceramic bearings, turbine blades, and cutting tools. Biocompatible — used in spinal implants.',
    balancedEquation: '3Si + 2N₂ → Si₃N₄',
    category: 'Compound', baseYield: 70, reactionType: 'Synthesis', bondType: 'Covalent',
    enthalpy: -752, entropy: 113, deltaG: -643, optimalTemp: 1400, optimalPressure: 1,
    safetyInfo: 'Fine powder is an inhalation hazard. Generally inert bulk material.',
    boilingPoint: 1900, meltingPoint: 1900, solubility: 'Insoluble in water', appearance: 'Gray ceramic solid', crystalStructure: 'Hexagonal (α) / Cubic (β)',
    uses: 'Ceramic bearings, turbine engine components, cutting tools, ball bearings, spinal fusion implants, glow plugs'
  },
  'Al-S': {
    formula: 'Al₂S₃', name: 'Aluminum Sulfide', molarMass: 150.16, phase: 'Solid',
    color: '#f5f5f5', stability: 'Unstable',
    description: 'Gray-yellow solid that hydrolyzes readily in moist air to release H₂S gas (characteristic rotten egg smell). This makes it a convenient laboratory source of H₂S. Must be stored under dry conditions. Forms at high temperatures in the direct combination of elements.',
    balancedEquation: '2Al + 3S → Al₂S₃',
    category: 'Sulfide', baseYield: 60, reactionType: 'Synthesis', bondType: 'Ionic',
    enthalpy: -724, entropy: 0, deltaG: 0, optimalTemp: 700, optimalPressure: 1,
    safetyInfo: 'Hydrolyzes releasing toxic H₂S gas. Must be stored in dry conditions. Corrosive.',
    boilingPoint: 1100, meltingPoint: 1100, solubility: 'Reacts with water (H₂S released)', appearance: 'Gray-yellow powder',
    uses: 'Laboratory H₂S source, chemical intermediate, hydrogen sulfide generation'
  },
  'B-N': {
    formula: 'BN', name: 'Boron Nitride', molarMass: 24.82, phase: 'Solid',
    color: '#fafafa', stability: 'Stable',
    description: 'Compound isoelectronic with carbon. Exists in multiple polymorphs: hexagonal BN (h-BN, "white graphite") is a lubricant; cubic BN (c-BN) is the second-hardest known material after diamond (9.5 Mohs). h-BN is used as a dielectric in 2D electronics (analogous to graphene). c-BN is synthesized at high pressure/temperature.',
    balancedEquation: 'B + N₂ → 2BN  (or B₂O₃ + 2NH₃ → 2BN + 3H₂O)',
    category: 'Compound', baseYield: 65, reactionType: 'Synthesis', bondType: 'Covalent',
    enthalpy: -254, entropy: 15, deltaG: -228, optimalTemp: 1200, optimalPressure: 1,
    safetyInfo: 'Generally safe. Fine powder inhalation may cause respiratory irritation.',
    boilingPoint: 3000, meltingPoint: 3000, solubility: 'Insoluble', appearance: 'White powder (h-BN)', crystalStructure: 'Hexagonal (h-BN) / Cubic zincblende (c-BN)',
    uses: 'Lubricant (h-BN), abrasives and cutting tools (c-BN), cosmetics, cosmetics, dielectric in electronics, crucibles'
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
