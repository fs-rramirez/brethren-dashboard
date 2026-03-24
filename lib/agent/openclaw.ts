/**
 * OpenClaw Agent Layer
 * Autonomous agent that analyzes data and generates actionable insights
 */

import db from '@/lib/db/sqlite';

interface BestDeal {
  title: string;
  price: number;
  location: string;
  score: number;
  label: 'Hot Deal' | 'Undervalued' | 'Fair';
}

interface Trend {
  title: string;
  url: string;
}

interface AgentOutput {
  bestDeals: BestDeal[];
  idea: string;
  topTrends: string[];
}

/**
 * Get top 3 best deals (score >= 80)
 */
function getBestDeals(): BestDeal[] {
  console.log('[agent] Fetching best deals...');

  const deals = db
    .prepare(
      `
    SELECT title, price, location, score
    FROM condos
    WHERE score >= 80
    ORDER BY score DESC
    LIMIT 3
  `
    )
    .all() as Array<{
    title: string;
    price: number;
    location: string;
    score: number;
  }>;

  // Add labels
  const labeled: BestDeal[] = deals.map((deal) => ({
    ...deal,
    label: deal.score >= 80 ? 'Hot Deal' : 'Undervalued',
  }));

  console.log(`[agent] Best deals found: ${labeled.length}`);
  return labeled;
}

/**
 * Get top 10 trends
 */
function getTopTrends(): string[] {
  console.log('[agent] Fetching top trends...');

  const trends = db
    .prepare(
      `
    SELECT title
    FROM trends
    ORDER BY id DESC
    LIMIT 10
  `
    )
    .all() as Array<{ title: string }>;

  return trends.map((t) => t.title);
}

/**
 * Generate product idea based on trends
 * Basic logic (no external AI)
 */
function generateBasicIdea(trends: string[]): string {
  const trendsText = trends.join(' ').toLowerCase();

  if (trendsText.includes('ai')) {
    return 'Build an AI-powered tool for real estate deal analysis';
  }

  if (trendsText.includes('startup')) {
    return 'Build a micro SaaS around trending startup tools';
  }

  return 'Explore niche SaaS opportunities based on emerging trends';
}

/**
 * Generate product idea using Claude API (if available)
 */
async function generateAIIdea(
  bestDeals: BestDeal[],
  trends: string[]
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.log('[agent] No ANTHROPIC_API_KEY found, using basic idea generation');
    return generateBasicIdea(trends);
  }

  try {
    console.log('[agent] Calling Claude API for idea generation...');

    const dealsText = bestDeals
      .map((d) => `${d.title} (₱${d.price}, ${d.location}, score: ${d.score})`)
      .join('; ');

    const trendsText = trends.join(', ');

    const prompt = `Given these real estate deals and trends, suggest one high-value product idea.

Best Deals:
${dealsText}

Trending Topics:
${trendsText}

Provide a concise, actionable product idea (1-2 sentences).`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 150,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('[agent] Claude API error:', response.statusText);
      return generateBasicIdea(trends);
    }

    const data = (await response.json()) as {
      content: Array<{ type: string; text: string }>;
    };
    const idea = data.content[0]?.text || generateBasicIdea(trends);

    console.log('[agent] Idea generated via Claude');
    return idea;
  } catch (error) {
    console.error('[agent] Error calling Claude API:', error);
    return generateBasicIdea(trends);
  }
}

/**
 * Main agent function
 * Analyzes data and generates insights
 */
export async function runAgent(): Promise<AgentOutput> {
  console.log('[agent] Running OpenClaw agent...');

  try {
    // Fetch data
    const bestDeals = getBestDeals();
    const topTrends = getTopTrends();

    // Generate idea (with optional AI enhancement)
    const idea = await generateAIIdea(bestDeals, topTrends);

    const output: AgentOutput = {
      bestDeals,
      idea,
      topTrends,
    };

    console.log('[agent] Agent run complete');
    return output;
  } catch (error) {
    console.error('[agent] Error running agent:', error);
    throw error;
  }
}
