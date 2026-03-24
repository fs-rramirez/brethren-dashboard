export default function Home() {
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
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">0</p>
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
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">0</p>
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
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">0</p>
            </div>
            <div className="text-4xl">📰</div>
          </div>
          <a href="/news" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block">
            View All →
          </a>
        </div>
      </div>

      {/* Best Product Idea Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow p-8 mb-12 border border-yellow-200 dark:border-gray-600">
        <div className="flex items-start gap-4">
          <div className="text-5xl">💡</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Best Product Idea</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Based on trending topics from HackerNews and Reddit, here's the most promising product idea:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-4 border-l-4 border-orange-500">
              <p className="text-gray-600 dark:text-gray-400 italic">
                Product ideas will appear here once trends are analyzed. Coming in Phase 3.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Deals Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-3xl">🔥</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Deals</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Top 3 scored condo listings with the best deals:
        </p>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 border border-gray-200 dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No deals yet. Condos will be fetched and scored in Phase 3.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
