import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface HackerNewsStory {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  source: string;
}

interface RedditPost {
  title: string;
  url: string;
  score: number;
  author: string;
  created_utc: number;
  source: string;
}

type Trend = HackerNewsStory | RedditPost;

export async function GET(req: NextRequest) {
  try {
    const trends: Trend[] = [];

    // Fetch HackerNews trends
    try {
      const hnTrends = await fetchHackerNewsTrends();
      trends.push(...hnTrends);
    } catch (error) {
      console.error('Error fetching HackerNews trends:', error);
    }

    // Fetch Reddit trends
    try {
      const redditTrends = await fetchRedditTrends();
      trends.push(...redditTrends);
    } catch (error) {
      console.error('Error fetching Reddit trends:', error);
    }

    // If no real trends, return mock data for development
    if (trends.length === 0) {
      trends.push(
        {
          id: 1,
          title: 'AI-Powered Code Generation Tools Gain Traction',
          url: 'https://news.ycombinator.com/item?id=1',
          score: 1250,
          by: 'user1',
          time: Math.floor(Date.now() / 1000),
          source: 'HackerNews',
        },
        {
          id: 2,
          title: 'New Rust Framework for Web Development',
          url: 'https://news.ycombinator.com/item?id=2',
          score: 980,
          by: 'user2',
          time: Math.floor(Date.now() / 1000),
          source: 'HackerNews',
        },
        {
          id: 3,
          title: 'Kubernetes Optimization Best Practices',
          url: 'https://news.ycombinator.com/item?id=3',
          score: 850,
          by: 'user3',
          time: Math.floor(Date.now() / 1000),
          source: 'HackerNews',
        },
        {
          title: 'Machine Learning in Production: Lessons Learned',
          url: 'https://reddit.com/r/programming/comments/1',
          score: 2100,
          author: 'redditor1',
          created_utc: Math.floor(Date.now() / 1000),
          source: 'Reddit',
        },
        {
          title: 'Open Source Database Performance Comparison',
          url: 'https://reddit.com/r/programming/comments/2',
          score: 1850,
          author: 'redditor2',
          created_utc: Math.floor(Date.now() / 1000),
          source: 'Reddit',
        }
      );
    }

    return NextResponse.json({
      success: true,
      count: trends.length,
      data: trends,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch trends',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function fetchHackerNewsTrends(): Promise<HackerNewsStory[]> {
  const stories: HackerNewsStory[] = [];

  try {
    const topStoriesRes = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json',
      { next: { revalidate: 300 } }
    );
    const ids: number[] = await topStoriesRes.json();
    const top10 = ids.slice(0, 10);

    const storyPromises = top10.map(async (id) => {
      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          { next: { revalidate: 300 } }
        );
        const story = await res.json();
        if (story && story.title && story.url) {
          return {
            id: story.id,
            title: story.title,
            url: story.url,
            score: story.score || 0,
            by: story.by || 'unknown',
            time: story.time || 0,
            source: 'HackerNews',
          };
        }
      } catch (error) {
        console.error(`Error fetching HN story ${id}:`, error);
      }
      return null;
    });

    const results = await Promise.all(storyPromises);
    results.forEach((story) => {
      if (story) stories.push(story);
    });
  } catch (error) {
    console.error('HackerNews API error:', error);
    throw error;
  }

  return stories;
}

async function fetchRedditTrends(): Promise<RedditPost[]> {
  const posts: RedditPost[] = [];

  try {
    const response = await fetch(
      'https://www.reddit.com/r/programming.json?limit=10',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        next: { revalidate: 300 },
      }
    );
    const data = await response.json();

    if (data.data && data.data.children) {
      data.data.children.forEach((child: any) => {
        const post = child.data;
        if (post && post.title && post.url) {
          posts.push({
            title: post.title,
            url: post.url,
            score: post.score || 0,
            author: post.author || 'unknown',
            created_utc: post.created_utc || 0,
            source: 'Reddit',
          });
        }
      });
    }
  } catch (error) {
    console.error('Reddit API error:', error);
    throw error;
  }

  return posts;
}
