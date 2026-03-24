import axios from 'axios';
import * as cheerio from 'cheerio';
import db from '@/lib/db/sqlite';
import { computeScore } from '@/lib/scoring';

interface CondoListing {
  title: string;
  price: number;
  location: string;
  source: string;
  created_at: string;
}

async function scrapeLamudi(): Promise<CondoListing[]> {
  const listings: CondoListing[] = [];

  const url =
    'https://www.lamudi.com.ph/buy/metro-manila/manila/taft-4/condo/?bathrooms=1&max-price=2000000&priceCurrency=PHP';

  const response = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    timeout: 15000,
  });

  const $ = cheerio.load(response.data);

  $('.snippet__content').each((_, element) => {
    const title = $(element).find('.snippet__content__title').text().trim();
    const rawPrice = $(element).find('.snippet__content__price').text().trim();
    const location = $(element).find('.snippet__content__location span').text().trim();

    if (!title || !rawPrice) return;

    const price = parseFloat(rawPrice.replace(/[₱,]/g, '').trim()) || 0;

    listings.push({
      title,
      price,
      location,
      source: 'lamudi',
      created_at: new Date().toISOString(),
    });
  });

  return listings;
}

export async function fetchAndSaveCondos(): Promise<unknown[]> {
  console.log('[condos] Refreshing condos...');

  const scraped = await scrapeLamudi();

    const insert = db.prepare(`
    INSERT INTO condos (title, price, location, source, created_at, score)
    SELECT ?, ?, ?, ?, ?, ?
    WHERE NOT EXISTS (
      SELECT 1 FROM condos WHERE title = ? AND price = ?
    )
  `);

    for (const item of scraped) {
    const score = computeScore(item);
    insert.run(
      item.title, item.price, item.location, item.source, item.created_at, score,
      item.title, item.price
    );
  }

  const rows = db.prepare('SELECT * FROM condos ORDER BY score DESC').all();
  console.log(`[condos] Done. ${rows.length} total listings in DB.`);
  return rows;
}

export function getStoredCondos(): unknown[] {
  return db.prepare('SELECT * FROM condos ORDER BY score DESC').all();
}
