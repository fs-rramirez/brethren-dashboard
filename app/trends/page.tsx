interface TrendRow {
  id: number;
  title: string;
  url: string;
  created_at: string;
}

async function fetchTrends(): Promise<TrendRow[]> {
  try {
    const res = await fetch('http://localhost:3000/api/trends', { cache: 'no-store' });
    const json = await res.json();
    return json.trends ?? [];
  } catch {
    return [];
  }
}

function getSuggestedIdea(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('ai') || t.includes('llm') || t.includes('gpt') || t.includes('machine learning')) {
    return '🤖 Build an AI-powered tool';
  }
  if (t.includes('rust') || t.includes('performance') || t.includes('compiler')) {
    return '⚡ Build a high-performance systems utility';
  }
  if (t.includes('open source') || t.includes('github')) {
    return '🔓 Launch an open-source SaaS product';
  }
  if (t.includes('security') || t.includes('vulnerability') || t.includes('hack')) {
    return '🔐 Build a developer security audit tool';
  }
  if (t.includes('database') || t.includes('sql') || t.includes('postgres')) {
    return '🗄️ Build a database visualization or migration tool';
  }
  return '🚀 Explore a niche SaaS idea in this space';
}

export default async function TrendsPage() {
  const trends = await fetchTrends();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Trends & Opportunities
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Top stories from HackerNews with suggested product ideas.
        </p>
      </div>

      {/* Suggested Product Ideas */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg shadow p-8 mb-8 border border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-4">
          <div className="text-5xl">💡</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Suggested Product Ideas</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Based on trending story titles from HackerNews.
            </p>
            {trends.length === 0 ? (
              <p className="text-gray-500 italic text-sm">No trends yet.</p>
            ) : (
              <ul className="space-y-2">
                {trends.slice(0, 5).map((t) => (
                  <li key={t.id} className="bg-white dark:bg-gray-800 rounded p-3 border-l-4 border-purple-500 text-sm">
                    <span className="font-medium text-purple-700 dark:text-purple-300">
                      {getSuggestedIdea(t.title)}
                    </span>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-xs">↳ inspired by: {t.title}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Top Stories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>�</span> HackerNews Top Stories
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">({trends.length} stored)</span>
        </h2>

        {trends.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8 text-sm">
            No trends yet. Hit <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">/api/trends</code> to fetch.
          </p>
        ) : (
          <ol className="space-y-3">
            {trends.map((t, i) => (
              <li key={t.id} className="flex items-start gap-3 border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0">
                <span className="text-gray-400 dark:text-gray-500 font-mono text-sm w-6 shrink-0 pt-0.5">
                  {i + 1}.
                </span>
                <div>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t.title}
                  </a>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {getSuggestedIdea(t.title)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
