export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          News
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with the latest news from around the world and the tech industry.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* World News */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <h2 className="text-2xl font-bold text-white">World News</h2>
            </div>
            <p className="text-blue-100 text-sm mt-1">From BBC</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  No news yet. Will be fetched from BBC RSS feed in Phase 3.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech News */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💻</span>
              <h2 className="text-2xl font-bold text-white">Tech News</h2>
            </div>
            <p className="text-orange-100 text-sm mt-1">From TechCrunch & The Verge</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  No news yet. Will be fetched from TechCrunch and The Verge RSS feeds in Phase 3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Sources */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">News Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 dark:border-gray-600 rounded p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌍 BBC News</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              World news and current events from BBC.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-600 rounded p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📱 TechCrunch</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Technology news and startup coverage.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-600 rounded p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔌 The Verge</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Technology, science, and culture news.
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Coming in Phase 3:</strong> News will be automatically fetched from BBC RSS, TechCrunch RSS, and The Verge RSS feeds. Articles will be displayed in a clean, organized format.
        </p>
      </div>
    </div>
  );
}
