import cron from 'node-cron';
import { fetchAndSaveCondos } from '@/lib/services/condos';
import { fetchAndSaveTrends } from '@/lib/services/trends';
import { fetchAndSaveNews } from '@/lib/services/news';

let started = false;

async function refreshAll() {
  console.log('[cron] Starting full data refresh...');

  try {
    await fetchAndSaveTrends();
  } catch (err) {
    console.error('[cron] Trends refresh failed:', err);
  }

  try {
    await fetchAndSaveNews();
  } catch (err) {
    console.error('[cron] News refresh failed:', err);
  }

  try {
    await fetchAndSaveCondos();
  } catch (err) {
    console.error('[cron] Condos refresh failed:', err);
  }

  console.log('[cron] Full refresh complete.');
}

export function startCron() {
  if (started) return;
  started = true;

  // Run every 30 minutes: "*/30 * * * *"
  cron.schedule('*/30 * * * *', () => {
    refreshAll();
  });

  console.log('[cron] Scheduler started. Runs every 30 minutes.');
}
