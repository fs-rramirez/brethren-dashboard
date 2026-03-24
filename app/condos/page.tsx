export default function CondosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Condo Listings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse and track condo listings with deal scoring.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>All Locations</option>
              <option>Manila</option>
              <option>Makati</option>
              <option>BGC</option>
              <option>Quezon City</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Price
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>All Prices</option>
              <option>≤ ₱1M</option>
              <option>≤ ₱2M</option>
              <option>≤ ₱5M</option>
              <option>≤ ₱10M</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Score (High to Low)</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Label</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td colSpan={5} className="px-6 py-8 text-center text-gray-600 dark:text-gray-400">
                  No listings yet. Condos will be fetched from Lamudi, DotProperty, and Carousell in Phase 3.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Coming in Phase 3:</strong> Listings will be automatically fetched from Lamudi, DotProperty, and Carousell. Each listing will be scored based on price, location, freshness, and completeness.
        </p>
      </div>
    </div>
  );
}
