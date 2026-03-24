import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic';

const parser = new Parser();

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  source: string;
  category: string;
}

export async function GET(req: NextRequest) {
  try {
    const newsItems: NewsItem[] = [];

    // Fetch BBC News (World News)
    try {
      const bbcNews = await fetchBBCNews();
      newsItems.push(...bbcNews);
    } catch (error) {
      console.error('Error fetching BBC News:', error);
    }

    // Fetch TechCrunch (Tech News)
    try {
      const techNews = await fetchTechCrunch();
      newsItems.push(...techNews);
    } catch (error) {
      console.error('Error fetching TechCrunch:', error);
    }

    // Fetch The Verge (Tech News)
    try {
      const vergeNews = await fetchTheVerge();
      newsItems.push(...vergeNews);
    } catch (error) {
      console.error('Error fetching The Verge:', error);
    }

    if (newsItems.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No news items found from any source.'
      }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      count: newsItems.length,
      data: newsItems,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch news',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function fetchBBCNews(): Promise<NewsItem[]> {
  const items: NewsItem[] = [];

  try {
    const feed = await parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml');
    (feed.items || []).slice(0, 5).forEach((item) => {
      if (item.title && item.link) {
        items.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || new Date().toISOString(),
          content: item.content || item.contentSnippet || '',
          source: 'BBC',
          category: 'World News',
        });
      }
    });
  } catch (error) {
    console.error('BBC News parsing error:', error);
    throw error;
  }

  return items;
}

async function fetchTechCrunch(): Promise<NewsItem[]> {
  const items: NewsItem[] = [];

  try {
    const feed = await parser.parseURL('https://techcrunch.com/feed/');
    (feed.items || []).slice(0, 5).forEach((item) => {
      if (item.title && item.link) {
        items.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || new Date().toISOString(),
          content: item.content || item.contentSnippet || '',
          source: 'TechCrunch',
          category: 'Tech News',
        });
      }
    });
  } catch (error) {
    console.error('TechCrunch parsing error:', error);
    throw error;
  }

  return items;
}

async function fetchTheVerge(): Promise<NewsItem[]> {
  const items: NewsItem[] = [];

  try {
    const feed = await parser.parseURL('https://www.theverge.com/rss/index.xml');
    (feed.items || []).slice(0, 5).forEach((item) => {
      if (item.title && item.link) {
        items.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || new Date().toISOString(),
          content: item.content || item.contentSnippet || '',
          source: 'The Verge',
          category: 'Tech News',
        });
      }
    });
  } catch (error) {
    console.error('The Verge parsing error:', error);
    throw error;
  }

  return items;
}
