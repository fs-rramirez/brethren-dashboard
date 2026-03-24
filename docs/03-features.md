# Features

## Homepage

* Summary cards:

  * Condo deals count
  * Trending topics
  * Top news
* “Best product idea” section
* “🔥 Top Deals” section (Top 3 scored listings)

## Condos Page

* Filter by:

  * Location
  * Price ≤ ₱2M
* Display listings (title, price, score)

## Opportunity Scanner

Sources:

* HackerNews
* Reddit

Output:

* Trending topics
* Suggested product idea

## News Page

* World news (BBC)
* Tech news (TechCrunch, Verge)

## Deal Scoring Engine

* Compute score (0–100) for each condo listing

### Factors:

* Price vs threshold
* Location priority
* Freshness (new listings score higher)
* Completeness (has price + title)

### Labels:

* 🔥 Hot Deal (score ≥ 80)
* ⭐ Undervalued (score ≥ 60)
