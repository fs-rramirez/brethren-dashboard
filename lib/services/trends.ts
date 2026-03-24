import db from '@/lib/db/sqlite';

interface TrendItem {
  title: string;
  url: string;
}

async function fetchFromHackerNews(): Promise<TrendItem[]> {
  const topStoriesRes = await fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  );
  const ids: number[] = await topStoriesRes.json();
  const top10 = ids.slice(0, 10);

  const results = await Promise.all(
    top10.map(async (id) => {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      const story = await res.json();
      return {
        title: story.title as string,
        url: (story.url as string) || `https://news.ycombinator.com/item?id=${story.id}`,
      };
    })
  );

  return results.filter((s) => s.title);
}

export async function fetchAndSaveTrends(): Promise<unknown[]> {
  console.log('[trends] Refreshing trends...');

  const fetched = await fetchFromHackerNews();

  const insert = db.prepare(`
    INSERT INTO trends (title, url, created_at)
    SELECT ?, ?, ?
    WHERE NOT EXISTS (
      SELECT 1 FROM trends WHERE title = ?
    )
  `);

  const now = new Date().toISOString();
  for (const item of fetched) {
    insert.run(item.title, item.url, now, item.title);
  }

  const rows = db.prepare('SELECT * FROM trends ORDER BY id DESC').all();
  console.log(`[trends] Done. ${rows.length} total trends in DB.`);
  return rows;
}

export function getStoredTrends(): unknown[] {
  return db.prepare('SELECT * FROM trends ORDER BY id DESC').all();
}
