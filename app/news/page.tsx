interface NewsRow {
  id: number;
  title: string;
  link: string;
  pubDate: string;
}

async function fetchNews(): Promise<NewsRow[]> {
  try {
    const res = await fetch('http://localhost:3000/api/news', { cache: 'no-store' });
    const json = await res.json();
    return json.news ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function isWorldNews(item: NewsRow): boolean {
  // BBC links contain bbc.co.uk or bbc.com
  return item.link.includes('bbc.co') || item.link.includes('bbc.com');
}

export default async function NewsPage() {
  const allNews = await fetchNews();

  const worldNews = allNews.filter(isWorldNews);
  const techNews = allNews.filter((n) => !isWorldNews(n));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">News</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {allNews.length} article{allNews.length !== 1 ? 's' : ''} · BBC World News & TechCrunch
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* World News */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <h2 className="text-xl font-bold text-white">World News</h2>
            </div>
            <p className="text-blue-100 text-xs mt-1">BBC · {worldNews.length} articles</p>
          </div>
          <div className="p-4">
            {worldNews.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8 text-sm">No world news yet.</p>
            ) : (
              <ul className="space-y-3">
                {worldNews.map((n) => (
                  <li key={n.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0">
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug block"
                    >
                      {n.title}
                    </a>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{formatDate(n.pubDate)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Tech News */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💻</span>
              <h2 className="text-xl font-bold text-white">Tech News</h2>
            </div>
            <p className="text-orange-100 text-xs mt-1">TechCrunch · {techNews.length} articles</p>
          </div>
          <div className="p-4">
            {techNews.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8 text-sm">No tech news yet.</p>
            ) : (
              <ul className="space-y-3">
                {techNews.map((n) => (
                  <li key={n.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0">
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors leading-snug block"
                    >
                      {n.title}
                    </a>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{formatDate(n.pubDate)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
