// Vercel Serverless Function for compound verification
// Uses PubChem REST API (free, no API key needed) + DuckDuckGo search as fallback

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

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
      const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(searchTerm)}/property/IUPACName,MolecularFormula,MolecularWeight,ExactMass/JSON`;

      const pubchemRes = await fetch(pubchemUrl, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000),
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
          signal: AbortSignal.timeout(10000),
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

    // === Step 2: Try DuckDuckGo Instant Answer API as web search fallback ===
    if (!isKnown) {
      try {
        const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(searchTerm + ' chemical compound')}&format=json&no_html=1`;
        const ddgRes = await fetch(ddgUrl, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(8000),
        });

        if (ddgRes.ok) {
          const ddgJson = await ddgRes.json();
          const abstract = ddgJson?.Abstract;
          const abstractUrl = ddgJson?.AbstractURL;
          const relatedTopics = ddgJson?.RelatedTopics || [];

          if (abstract && abstract.length > 50) {
            sources = [{
              title: ddgJson?.Heading || searchTerm,
              url: abstractUrl || `https://en.wikipedia.org/wiki/${encodeURIComponent(searchTerm)}`,
              snippet: abstract.substring(0, 300),
            }];
            isKnown = true;
            summary = `Web search found information about "${searchTerm}": ${abstract.substring(0, 400)}`;
          } else if (relatedTopics.length > 2) {
            const relevantTopics = relatedTopics
              .filter(t => t.Text && t.Text.length > 30)
              .slice(0, 3);
            if (relevantTopics.length > 0) {
              sources = relevantTopics.map(t => ({
                title: t.Text?.substring(0, 80) || searchTerm,
                url: t.FirstURL || '#',
                snippet: t.Text?.substring(0, 200) || '',
              }));
              isKnown = relevantTopics.length >= 2;
              summary = isKnown
                ? `Web search found ${relevantTopics.length} relevant results for "${searchTerm}", suggesting this compound or related chemistry is documented in the literature.`
                : `Limited web search results for "${searchTerm}". The compound may be novel or poorly documented.`;
            }
          }
        }
      } catch (ddgErr) {
        console.log('DuckDuckGo search failed:', ddgErr?.message);
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
};
