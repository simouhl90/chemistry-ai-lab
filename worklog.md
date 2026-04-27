---
Task ID: 1
Agent: main
Task: Review and improve Reaction Chamber — professional chemistry engine + AI verification

Work Log:
- Read all source files to understand existing codebase structure
- Identified critical bug: `removeReactants` (plural) called in ReactionChamber.tsx but only `removeReactant` (singular) exported from LabContext
- Identified verification failure: `/api/verify.js` uses `z-ai-web-dev-sdk` which is only available in dev environment, not on Vercel
- Updated types/index.ts: Added ReactionType, BondType enums, new fields (enthalpy, entropy, deltaG, optimalTemp, optimalPressure, safetyInfo, boilingPoint, meltingPoint, solubility, appearance, crystalStructure, uses)
- Expanded compounds.ts database from 25 to 40+ real compounds with comprehensive data (thermodynamic, safety, physical properties)
- Rewrote reactions.ts: Better chemistry engine with oxidation state-based formula prediction, Stock notation for transition metals, Le Chatelier principle for yield, Gibbs free energy calculations, metalloid handling, noble gas special cases
- Rewrote api/verify.js: PubChem REST API as primary verification (works on Vercel without SDK), z-ai-web-dev-sdk web search as fallback when available
- Updated LabContext.tsx: Fixed removeReactant bug, prevented duplicate elements in chamber, improved status messages with thermodynamic data, always verify successful reactions (not just yield > 30%)
- Rewrote ReactionChamber.tsx: Professional UI with thermodynamic data panel (ΔH, ΔS, ΔG), safety warning box, yield progress bars, reaction type/bond type badges, PubChem database record display, AI status bar, physical properties (boiling/melting points, solubility, crystal structure, appearance)
- Fixed all build errors (parenthetical notes in numeric TypeScript fields)
- Built successfully and pushed to GitHub for Vercel auto-deploy

Stage Summary:
- 6 files modified, 1283 insertions, 378 deletions
- Pushed to GitHub: commit 4bfadea
- Vercel auto-deploying from https://github.com/simouhl90/chemistry-ai-lab
- Key improvements: Real PubChem verification, 40+ compounds with full data, professional thermodynamic display, safety warnings
