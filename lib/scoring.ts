/**
 * Deal Scoring Engine
 * Scores condo listings from 0-100 based on:
 * - Price Score (50%)
 * - Location Score (20%)
 * - Freshness Score (20%)
 * - Completeness Score (10%)
 */

interface ScoringInput {
  title?: string;
  price?: number;
  location?: string;
  created_at?: string;
}

interface ScoredListing extends ScoringInput {
  score: number;
  label: 'Hot Deal' | 'Undervalued' | 'Fair';
}

/**
 * Price Score (50% weight)
 * - price < 1,500,000 → +50
 * - price < 2,000,000 → +35
 * - otherwise → +10
 */
function computePriceScore(price?: number): number {
  if (!price) return 0;
  if (price < 1_500_000) return 50;
  if (price < 2_000_000) return 35;
  return 10;
}

/**
 * Location Score (20% weight)
 * - includes "Pasig" → +20
 * - includes "Manila" or "Taft" → +15
 * - includes "Bacoor" → +10
 * - otherwise → +5
 */
function computeLocationScore(location?: string): number {
  if (!location) return 5;
  const loc = location.toLowerCase();
  if (loc.includes('pasig')) return 20;
  if (loc.includes('manila') || loc.includes('taft')) return 15;
  if (loc.includes('bacoor')) return 10;
  return 5;
}

/**
 * Freshness Score (20% weight)
 * - < 3 days → +20
 * - < 7 days → +10
 * - otherwise → +5
 */
function computeFreshnessScore(createdAt?: string): number {
  if (!createdAt) return 5;

  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 3) return 20;
  if (diffDays < 7) return 10;
  return 5;
}

/**
 * Completeness Score (10% weight)
 * - has title AND price AND location → +10
 * - otherwise → +5
 */
function computeCompletenessScore(
  title?: string,
  price?: number,
  location?: string
): number {
  if (title && price && location) return 10;
  return 5;
}

/**
 * Compute final score (0-100)
 * Final Score = (Price × 0.5) + (Location × 0.2) + (Freshness × 0.2) + (Completeness × 0.1)
 */
export function computeScore(listing: ScoringInput): number {
  const priceScore = computePriceScore(listing.price);
  const locationScore = computeLocationScore(listing.location);
  const freshnessScore = computeFreshnessScore(listing.created_at);
  const completenessScore = computeCompletenessScore(
    listing.title,
    listing.price,
    listing.location
  );

  const finalScore =
    priceScore * 0.5 +
    locationScore * 0.2 +
    freshnessScore * 0.2 +
    completenessScore * 0.1;

  // Cap at 100
  return Math.min(Math.round(finalScore), 100);
}

/**
 * Get label based on score
 */
export function getLabel(
  score: number
): 'Hot Deal' | 'Undervalued' | 'Fair' {
  if (score >= 80) return 'Hot Deal';
  if (score >= 60) return 'Undervalued';
  return 'Fair';
}

/**
 * Score a listing and add label
 */
export function scoreAndLabel(listing: ScoringInput): ScoredListing {
  const score = computeScore(listing);
  const label = getLabel(score);
  return {
    ...listing,
    score,
    label,
  };
}