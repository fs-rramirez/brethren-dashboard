# Phase 9 - Agent Layer (OpenClaw) - Sample Output

## Implementation Complete ✅

### Files Created:

1. **lib/agent/openclaw.ts** - NEW
   - Core agent module with autonomous analysis
   - `runAgent()` - Main function
   - `getBestDeals()` - Fetch top 3 deals with score ≥ 80
   - `getTopTrends()` - Extract top 10 trends
   - `generateBasicIdea()` - Rule-based idea generation
   - `generateAIIdea()` - Optional Claude API enhancement

2. **app/api/agent/route.ts** - NEW
   - GET endpoint for agent analysis
   - Calls `runAgent()` and returns JSON
   - Error handling and logging

---

## Agent Architecture

### Data Flow:
```
Database (condos, trends, news)
    ↓
OpenClaw Agent
    ├─ getBestDeals() → Top 3 deals (score ≥ 80)
    ├─ getTopTrends() → Top 10 trends
    └─ generateAIIdea() → Product idea
    ↓
API Response (JSON)
```

### Core Functions:

#### 1. getBestDeals()
- Queries condos table
- Filters: `score >= 80`
- Sorts: `score DESC`
- Limit: 3
- Adds label: "Hot Deal" (all will be ≥80)

#### 2. getTopTrends()
- Queries trends table
- Sorts: `id DESC` (newest first)
- Limit: 10
- Returns: array of trend titles

#### 3. generateBasicIdea()
- Rule-based logic (no external API)
- Rules:
  - If trends contain "AI" → "Build an AI-powered tool for real estate deal analysis"
  - If trends contain "startup" → "Build a micro SaaS around trending startup tools"
  - Else → "Explore niche SaaS opportunities based on emerging trends"

#### 4. generateAIIdea() (Optional)
- Checks for `ANTHROPIC_API_KEY` env variable
- If exists: calls Claude API
- Prompt: "Given these real estate deals and trends, suggest one high-value product idea"
- Falls back to basic idea if API fails

---

## Sample API Response

### Endpoint: `GET /api/agent`

### Response (with data):
```json
{
  "bestDeals": [
    {
      "title": "Luxury Condo in Pasig",
      "price": 1200000,
      "location": "Pasig",
      "score": 95,
      "label": "Hot Deal"
    },
    {
      "title": "Modern Studio in Taft",
      "price": 1400000,
      "location": "Taft, Manila",
      "score": 88,
      "label": "Hot Deal"
    },
    {
      "title": "Affordable Unit in Bacoor",
      "price": 1100000,
      "location": "Bacoor",
      "score": 82,
      "label": "Hot Deal"
    }
  ],
  "idea": "Build an AI-powered tool for real estate deal analysis",
  "topTrends": [
    "AI Breakthroughs in 2024",
    "Startup Funding Trends",
    "Machine Learning Applications",
    "Real Estate Tech Innovation",
    "Emerging AI Startups",
    "Property Market Analysis",
    "Smart Home Technology",
    "Data-Driven Real Estate",
    "AI Investment Opportunities",
    "Tech Startup Ecosystem"
  ]
}
```

### Response (no deals):
```json
{
  "bestDeals": [],
  "idea": "Explore niche SaaS opportunities based on emerging trends",
  "topTrends": [
    "Trending Topic 1",
    "Trending Topic 2",
    "..."
  ]
}
```

---

## Logging Output

When agent runs, console logs:
```
[agent] Running OpenClaw agent...
[agent] Fetching best deals...
[agent] Best deals found: 3
[agent] Fetching top trends...
[agent] No ANTHROPIC_API_KEY found, using basic idea generation
[agent] Agent run complete
```

With Claude API:
```
[agent] Running OpenClaw agent...
[agent] Fetching best deals...
[agent] Best deals found: 3
[agent] Fetching top trends...
[agent] Calling Claude API for idea generation...
[agent] Idea generated via Claude
[agent] Agent run complete
```

---

## Idea Generation Logic

### Basic Mode (Default):
```typescript
if (trends.includes('ai')) {
  return 'Build an AI-powered tool for real estate deal analysis';
}
if (trends.includes('startup')) {
  return 'Build a micro SaaS around trending startup tools';
}
return 'Explore niche SaaS opportunities based on emerging trends';
```

### AI Mode (with ANTHROPIC_API_KEY):
```
Prompt to Claude:
"Given these real estate deals and trends, suggest one high-value product idea.

Best Deals:
[deal 1], [deal 2], [deal 3]

Trending Topics:
[trend 1], [trend 2], ...

Provide a concise, actionable product idea (1-2 sentences)."
```

---

## Database Queries

### Query 1: Best Deals
```sql
SELECT title, price, location, score
FROM condos
WHERE score >= 80
ORDER BY score DESC
LIMIT 3
```

### Query 2: Top Trends
```sql
SELECT title
FROM trends
ORDER BY id DESC
LIMIT 10
```

---

## Key Features

✅ Autonomous agent layer (OpenClaw)
✅ Best deals extraction (score ≥ 80)
✅ Trend analysis (top 10)
✅ Rule-based idea generation
✅ Optional Claude API enhancement
✅ Graceful fallback (no external API required)
✅ Comprehensive logging
✅ Error handling
✅ No new dependencies
✅ Simple, modular design

---

## Integration Points

### Data Sources:
- `condos` table (from Phase 7 scoring)
- `trends` table (from Phase 3 API)

### Dependencies:
- `lib/db/sqlite.ts` - Database connection
- No external libraries required
- Optional: `ANTHROPIC_API_KEY` env variable

### API Endpoint:
- `GET /api/agent` - Returns agent analysis

---

## Environment Variables (Optional)

```bash
# For AI-enhanced idea generation
ANTHROPIC_API_KEY=sk-ant-...
```

If not set, agent uses basic rule-based idea generation.

---

## Next Steps (Phase 8 - UI Highlight)

UI Integration:
- Display top 3 deals on homepage
- Show "Best product idea" section
- Add labels with emojis (🔥 Hot Deal)
- Display trending topics

---

## Testing

### Manual Test:
```bash
curl http://localhost:3000/api/agent
```

### Expected Response:
JSON with `bestDeals`, `idea`, and `topTrends`

---

## Constraints Met

✅ Logic is simple and modular
✅ No new dependencies added
✅ Uses existing DB and services
✅ No overengineering
✅ TypeScript throughout
✅ Graceful degradation (works without Claude API)
✅ No UI modifications
✅ Fully functional and ready to use
