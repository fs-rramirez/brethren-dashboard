import Parser from 'rss-parser';
import db from '@/lib/db/sqlite';

const parser = new Parser();

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
}

async function fetchFromRSS(): Promise<NewsItem[]> {
  const [bbcFeed, techCrunchFeed] = await Promise.all([
    parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml'),
    parser.parseURL('https://techcrunch.com/feed/'),
  ]);

  const items: NewsItem[] = [];

  for (const feed of [bbcFeed, techCrunchFeed]) {
    (feed.items || []).slice(0, 5).forEach((item) => {
      if (item.title && item.link) {
        items.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || new Date().toISOString(),
        });
      }
    });
  }

  return items;
}

export async function fetchAndSaveNews(): Promise<unknown[]> {
  console.log('[news] Refreshing news...');

  const fetched = await fetchFromRSS();

  const insert = db.prepare(`
    INSERT INTO news (title, link, pubDate)
    SELECT ?, ?, ?
    WHERE NOT EXISTS (
      SELECT 1 FROM news WHERE link = ?
    )
  `);

  for (const item of fetched) {
    insert.run(item.title, item.link, item.pubDate, item.link);
  }

  const rows = db.prepare('SELECT * FROM news ORDER BY id DESC').all();
  console.log(`[news] Done. ${rows.length} total articles in DB.`);
  return rows;
}

export function getStoredNews(): unknown[] {
  return db.prepare('SELECT * FROM news ORDER BY id DESC').all();
}
