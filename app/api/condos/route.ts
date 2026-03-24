import { NextResponse } from 'next/server';
import db from '@/lib/db/sqlite';
import { isDataFresh } from '@/lib/cache';
import { fetchAndSaveCondos, getStoredCondos } from '@/lib/services/condos';
import { getLabel } from '@/lib/scoring';

export const dynamic = 'force-dynamic';

const CACHE_MINUTES = 30;

export async function GET() {
  try {
    // Check the most recent row's created_at
    const latest = db.prepare('SELECT created_at FROM condos ORDER BY id DESC LIMIT 1').get() as
      | { created_at: string }
      | undefined;

    let listings: any[] = [];

    if (latest && isDataFresh(latest.created_at, CACHE_MINUTES)) {
      console.log('[condos] Using cached data...');
      listings = getStoredCondos() as any[];
    } else {
      console.log('[condos] Fetching fresh data...');
      listings = (await fetchAndSaveCondos()) as any[];
    }

    // Add labels based on score
    const scoredListings = listings.map((listing) => ({
      title: listing.title,
      price: listing.price,
      location: listing.location,
      score: listing.score,
      label: getLabel(listing.score),
    }));

    return NextResponse.json({ count: scoredListings.length, listings: scoredListings });
  } catch (error) {
    console.error('[condos] API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch condo listings' },
      { status: 500 }
    );
  }
}