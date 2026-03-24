interface CondoRow {
  id: number;
  title: string;
  price: number;
  location: string;
  source: string;
  created_at: string;
  score: number;
}

interface TrendRow {
  id: number;
  title: string;
  url: string;
  created_at: string;
}

interface NewsRow {
  id: number;
  title: string;
  link: string;
  pubDate: string;
}

async function fetchCondos(): Promise<CondoRow[]> {
  try {
    const res = await fetch('http://localhost:3000/api/condos', { cache: 'no-store' });
    const json = await res.json();
    return json.listings ?? [];
  } catch {
    return [];
  }
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

async function fetchNews(): Promise<NewsRow[]> {
  try {
    const res = await fetch('http://localhost:3000/api/news', { cache: 'no-store' });
    const json = await res.json();
    return json.news ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [condos, trends, news] = await Promise.all([
    fetchCondos(),
    fetchTrends(),
    fetchNews(),
  ]);

  const topDeals = [...condos].sort((a, b) => a.price - b.price).slice(0, 3);
  const topTrends = trends.slice(0, 5);
  const topNews = news.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Brethren Dashboard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Your local-first dashboard for condos, trends, and news.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Condo Deals</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{condos.length}</p>
            </div>
            <div className="text-4xl">🏢</div>
          </div>
          <a href="/condos" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block">
            View All →
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Trending Topics</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{trends.length}</p>
            </div>
            <div className="text-4xl">📈</div>
          </div>
          <a href="/trends" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block">
            View All →
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Top News</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{news.length}</p>
            </div>
            <div className="text-4xl">📰</div>
          </div>
          <a href="/news" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block">
            View All →
          </a>
        </div>
      </div>

      {/* Trends Summary + News Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Trends Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>📈</span> Trends Summary
          </h2>
          {topTrends.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No trends yet.</p>
          ) : (
            <ul className="space-y-2">
              {topTrends.map((t) => (
                <li key={t.id} className="text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                  <a href={t.url} target="_blank" rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <a href="/trends" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block">
            View All →
          </a>
        </div>

        {/* News Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>📰</span> News Summary
          </h2>
          {topNews.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No news yet.</p>
          ) : (
            <ul className="space-y-2">
              {topNews.map((n) => (
                <li key={n.id} className="text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                  <a href={n.link} target="_blank" rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {n.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <a href="/news" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block">
            View All →
          </a>
        </div>
      </div>

      {/* Top Deals Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-3xl">🔥</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Deals</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">— lowest price listings</span>
        </div>
        {topDeals.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No listings yet. Hit <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">/api/condos</code> to fetch data.
          </p>
        ) : (
          <div className="space-y-4">
            {topDeals.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{c.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{c.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 dark:text-green-400">
                    ₱{c.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
