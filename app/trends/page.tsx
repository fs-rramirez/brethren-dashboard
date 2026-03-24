export default function TrendsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Trends & Opportunities
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover trending topics from HackerNews and Reddit, and find the best product ideas.
        </p>
      </div>

      {/* Best Product Idea */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg shadow p-8 mb-8 border border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-4">
          <div className="text-5xl">💡</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Best Product Idea</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Based on trending topics from HackerNews and Reddit, here's the most promising product idea:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded p-4 border-l-4 border-purple-500">
              <p className="text-gray-600 dark:text-gray-400 italic">
                Product ideas will appear here once trends are analyzed. Coming in Phase 3.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* HackerNews Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">📰</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">HackerNews Trends</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 border border-gray-200 dark:border-gray-600">
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                No trends yet. Will be fetched from HackerNews API in Phase 3.
              </p>
            </div>
          </div>
        </div>

        {/* Reddit Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">🔗</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reddit Trends</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 border border-gray-200 dark:border-gray-600">
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                No trends yet. Will be fetched from Reddit API in Phase 3.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Coming in Phase 3:</strong> Trends will be automatically fetched from HackerNews and Reddit APIs. The system will analyze trending topics and suggest the best product ideas based on market demand.
        </p>
      </div>
    </div>
  );
}
