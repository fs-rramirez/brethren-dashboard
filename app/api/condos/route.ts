import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

interface CondoListing {
  title: string;
  price: string | null;
  location: string | null;
  url: string;
  source: string;
}

export async function GET() {
  try {
    const listings: CondoListing[] = [];

    // Fetch from Lamudi
    try {
      const lamudiListings = await fetchLamudiListings();
      listings.push(...lamudiListings);
    } catch (error) {
      console.error("Error fetching Lamudi listings:", error);
    }

    return NextResponse.json({
      success: true,
      count: listings.length,
      data: listings,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch condo listings",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function fetchLamudiListings(): Promise<CondoListing[]> {
  const listings: CondoListing[] = [];

  try {
    const url = "https://www.lamudi.com.ph/buy/condominium,apartment/?price_to=2000000";

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
      timeout: 10000,
    });

    console.log("Lamudi response status:", response.status);
    const $ = cheerio.load(response.data);

    // Parse listings from Lamudi
    $(
      'div[data-qa="listing-item"], .ListingCell-AllInfo, .snippet__content'
    ).each((index, element) => {
      if (index >= 10) return;

      const titleElement = $(element).find(
        "h2, h3, .ListingCell-KeyInfo-title, .snippet__content__title"
      );
      const priceElement = $(element).find(
        ".PriceSection-FirstPrice, .snippet__content__price"
      );
      const locationElement = $(element).find(
        ".ListingCell-KeyInfo-address, .snippet__content__location"
      );
      const linkElement = $(element).find("a");

      const title = titleElement.text().trim();
      const price = priceElement.text().trim();
      const location = locationElement.text().trim();
      const url = linkElement.attr("href") || "";

      if (title && price) {
        listings.push({
          title,
          price: price || null,
          location: location || null,
          url: url.startsWith("http")
            ? url
            : `https://www.lamudi.com.ph${url}`,
          source: "Lamudi",
        });
      }
    });

    if (listings.length === 0) {
      // Print the first 2000 characters of the raw HTML for debugging
      console.log("Lamudi RAW HTML (first 2000 chars):", response.data.slice(0, 2000));
    }
  } catch (error) {
    console.error("Lamudi scraping error:", error);
    throw error;
  }

  return listings;
}