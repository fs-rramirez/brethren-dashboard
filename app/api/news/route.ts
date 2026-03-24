import { NextResponse } from 'next/server';
import db from '@/lib/db/sqlite';
import { isDataFresh } from '@/lib/cache';
import { fetchAndSaveNews, getStoredNews } from '@/lib/services/news';

export const dynamic = 'force-dynamic';

const CACHE_MINUTES = 15;

export async function GET() {
  try {
    // Check the most recent row's created_at (use pubDate as proxy)
    const latest = db.prepare('SELECT pubDate FROM news ORDER BY id DESC LIMIT 1').get() as
      | { pubDate: string }
      | undefined;

    if (latest && isDataFresh(latest.pubDate, CACHE_MINUTES)) {
      console.log('[news] Using cached data...');
      const news = getStoredNews();
      return NextResponse.json({ count: news.length, news });
    }

    console.log('[news] Fetching fresh data...');
    const news = await fetchAndSaveNews();
    return NextResponse.json({ count: news.length, news });
  } catch (error) {
    console.error('[news] API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
