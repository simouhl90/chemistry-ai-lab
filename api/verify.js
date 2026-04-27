// Vercel Serverless Function for compound verification
// Uses PubChem REST API (free, no API key needed) + z-ai-web-dev-sdk web search as bonus

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { compound, formula } = req.query;

  if (!compound && !formula) {
    return res.status(400).json({ error: 'Missing compound or formula parameter' });
  }

  const searchTerm = compound || formula;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  let pubchemData = null;
  let isKnown = false;
  let summary = '';
  let sources = [];

  try {
    // === Step 1: Check PubChem database (reliable, free, no API key) ===
    try {
      // Try searching by name first
      const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(searchTerm)}/property/IUPACName,MolecularFormula,MolecularWeight,ExactMass,IsomericSMILES,CanonicalSMILES/JSON`;

      const pubchemRes = await fetch(pubchemUrl, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(8000),
      });

      if (pubchemRes.ok) {
        const pubchemJson = await pubchemRes.json();
        const props = pubchemJson?.PropertyTable?.Properties?.[0];

        if (props) {
          pubchemData = {
            cid: String(props.CID || ''),
            iupacName: props.IUPACName || '',
            molecularFormula: props.MolecularFormula || '',
            molecularWeight: props.MolecularWeight || 0,
            exactMass: props.ExactMass || 0,
          };

          isKnown = true;
          summary = `${searchTerm} is a known chemical compound registered in PubChem (CID: ${pubchemData.cid}). IUPAC name: ${pubchemData.iupacName || 'N/A'}. Molecular formula: ${pubchemData.molecularFormula || 'N/A'}. Molecular weight: ${(pubchemData.molecularWeight || 0).toFixed(2)} g/mol. This compound has been characterized in the scientific literature and its properties are well-documented in chemical databases worldwide.`;

          sources = [{
            title: `PubChem CID ${pubchemData.cid}: ${pubchemData.iupacName || searchTerm}`,
            url: `https://pubchem.ncbi.nlm.nih.gov/compound/${pubchemData.cid}`,
            snippet: `${pubchemData.molecularFormula} | MW: ${(pubchemData.molecularWeight || 0).toFixed(2)} g/mol | IUPAC: ${pubchemData.iupacName || 'N/A'}`,
          }];
        }
      }
    } catch (pubchemErr) {
      console.log('PubChem lookup failed, trying formula search...', pubchemErr?.message);
    }

    // If name search failed, try formula search
    if (!isKnown && formula) {
      try {
        const formulaUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastidentity/${encodeURIComponent(formula)}/property/IUPACName,MolecularFormula,MolecularWeight/JSON`;
        const formulaRes = await fetch(formulaUrl, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(8000),
        });

        if (formulaRes.ok) {
          const formulaJson = await formulaRes.json();
          const firstResult = formulaJson?.PropertyTable?.Properties?.[0];
          if (firstResult) {
            pubchemData = {
              cid: String(firstResult.CID || ''),
              iupacName: firstResult.IUPACName || '',
              molecularFormula: firstResult.MolecularFormula || formula,
              molecularWeight: firstResult.MolecularWeight || 0,
              exactMass: 0,
            };
            isKnown = true;
            summary = `A compound with formula "${formula}" exists in PubChem (CID: ${pubchemData.cid}). ${pubchemData.iupacName ? `IUPAC name: ${pubchemData.iupacName}.` : ''} Molecular weight: ${(pubchemData.molecularWeight || 0).toFixed(2)} g/mol. The formula matches known chemical entries in the PubChem database.`;
            sources = [{
              title: `PubChem CID ${pubchemData.cid}`,
              url: `https://pubchem.ncbi.nlm.nih.gov/compound/${pubchemData.cid}`,
              snippet: `${pubchemData.molecularFormula} | MW: ${(pubchemData.molecularWeight || 0).toFixed(2)} g/mol`,
            }];
          }
        }
      } catch (formulaErr) {
        console.log('PubChem formula search failed:', formulaErr?.message);
      }
    }

    // === Step 2: Try web search for additional context (using z-ai-web-dev-sdk if available) ===
    if (!isKnown) {
      try {
        // Dynamic import to avoid build errors if SDK is not available
        const ZAI = (await import('z-ai-web-dev-sdk')).default;
        const zai = await ZAI.create();

        const searchResult = await zai.functions.invoke('web_search', {
          query: `${searchTerm} chemical compound properties synthesis`,
          num: 6,
        });

        const searchSources = (searchResult || []).slice(0, 4).map((item) => ({
          title: item.name || item.title || '',
          url: item.host_name ? `https://${item.host_name}` : (item.url || ''),
          snippet: item.snippet || item.description || '',
        }));

        if (searchSources.length > 0) {
          sources = searchSources;
          const queryLower = searchTerm.toLowerCase();
          const anyMatch = searchSources.some((s) =>
            s.title.toLowerCase().includes(queryLower) ||
            s.snippet.toLowerCase().includes(queryLower)
          );

          isKnown = searchSources.length >= 2 || anyMatch;

          if (isKnown) {
            const snippets = searchSources
              .filter((s) => s.snippet)
              .map((s) => s.snippet)
              .slice(0, 2);
            summary = `Web search found ${searchSources.length} results related to "${searchTerm}". ${anyMatch ? 'Direct matches found in search results.' : 'Related results found in chemical literature.'} ${snippets.join(' ')}`.substring(0, 600);
          } else {
            summary = `Web search found ${searchSources.length} potentially related results for "${searchTerm}", but no direct matches were found. The compound may be novel, uncommon, or described using a different naming convention in the literature.`;
          }
        }
      } catch (sdkErr) {
        console.log('Web search SDK not available:', sdkErr?.message);
        // SDK not available on Vercel — that's fine, we already tried PubChem
      }
    }

    // If still unknown, provide a helpful message
    if (!isKnown) {
      summary = `"${searchTerm}" was not found in chemical databases (PubChem) or web search results. This could mean: (1) the compound is genuinely novel and has not been reported in scientific literature, (2) it may exist but is extremely rare or poorly documented, (3) the predicted formula or name may not correspond to a stable real compound, or (4) the compound may be described in literature using a different name or formula notation.`;
    }

    return res.status(200).json({
      isKnown,
      searchQuery: searchTerm,
      summary,
      sources,
      verifiedAt: new Date().toISOString(),
      pubchemData,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({
      isKnown: false,
      searchQuery: searchTerm,
      summary: 'Verification search encountered an error. The compound could not be verified at this time. Please try again later.',
      sources: [],
      verifiedAt: new Date().toISOString(),
      error: error?.message || 'Unknown error',
    });
  }
}
