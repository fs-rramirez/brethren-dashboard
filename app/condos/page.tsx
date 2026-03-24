interface CondoRow {
  id: number;
  title: string;
  price: number;
  location: string;
  source: string;
  created_at: string;
  score: number;
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

export default async function CondosPage() {
  const condos = await fetchCondos();
  const sorted = [...condos].sort((a, b) => a.price - b.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Condo Listings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {sorted.length} listing{sorted.length !== 1 ? 's' : ''} found · sorted by price (low to high)
        </p>
      </div>

      {/* Listings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Location</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No listings yet. Hit <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">/api/condos</code> to fetch.
                  </td>
                </tr>
              ) : (
                sorted.map((c, i) => (
                  <tr key={c.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{i + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{c.title}</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600 dark:text-green-400">
                      ₱{c.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{c.location || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
