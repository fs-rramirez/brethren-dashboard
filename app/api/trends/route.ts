import { NextResponse } from 'next/server';
import db from '@/lib/db/sqlite';
import { isDataFresh } from '@/lib/cache';
import { fetchAndSaveTrends, getStoredTrends } from '@/lib/services/trends';

export const dynamic = 'force-dynamic';

const CACHE_MINUTES = 15;

export async function GET() {
  try {
    // Check the most recent row's created_at
    const latest = db.prepare('SELECT created_at FROM trends ORDER BY id DESC LIMIT 1').get() as
      | { created_at: string }
      | undefined;

    if (latest && isDataFresh(latest.created_at, CACHE_MINUTES)) {
      console.log('[trends] Using cached data...');
      const trends = getStoredTrends();
      return NextResponse.json({ count: trends.length, trends });
    }

    console.log('[trends] Fetching fresh data...');
    const trends = await fetchAndSaveTrends();
    return NextResponse.json({ count: trends.length, trends });
  } catch (error) {
    console.error('[trends] API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trends' },
      { status: 500 }
    );
  }
}