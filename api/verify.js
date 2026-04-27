import ZAI from 'z-ai-web-dev-sdk';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { compound, formula } = req.query;

  if (!compound && !formula) {
    return res.status(400).json({ error: 'Missing compound or formula parameter' });
  }

  const searchTerm = compound || formula;
  
  try {
    const zai = await ZAI.create();
    
    const searchResult = await zai.functions.invoke('web_search', {
      query: `${searchTerm} chemical compound properties synthesis reaction`,
      num: 8,
    });

    const sources = (searchResult || []).slice(0, 5).map((item: any) => ({
      title: item.name || item.title || '',
      url: item.host_name ? `https://${item.host_name}` : (item.url || ''),
      snippet: item.snippet || item.description || '',
    }));

    // Determine if compound is known based on search results
    const queryLower = searchTerm.toLowerCase();
    const hasResults = sources.length > 0;
    const anyTitleMatch = sources.some((s: any) => 
      s.title.toLowerCase().includes(queryLower) || 
      s.snippet.toLowerCase().includes(queryLower)
    );

    const isKnown = hasResults && (anyTitleMatch || sources.length >= 2);

    // Build summary from search snippets
    let summary = '';
    if (hasResults) {
      const snippets = sources
        .filter((s: any) => s.snippet)
        .map((s: any) => s.snippet)
        .slice(0, 3);
      summary = snippets.join(' ');
      if (summary.length > 500) summary = summary.substring(0, 500) + '...';
    }

    return res.status(200).json({
      isKnown,
      searchQuery: searchTerm,
      summary: summary || 'No information found.',
      sources,
      verifiedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({
      isKnown: false,
      searchQuery: searchTerm,
      summary: 'Verification search failed. The compound may or may not exist.',
      sources: [],
      verifiedAt: new Date().toISOString(),
      error: error.message || 'Unknown error',
    });
  }
}
