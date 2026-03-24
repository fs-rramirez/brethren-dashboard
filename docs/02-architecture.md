# Architecture

## Stack

* Next.js (App Router, TypeScript)
* Tailwind CSS
* SQLite (better-sqlite3)
* Node.js API routes

## Folder Structure

/app
/page.tsx
/condos/page.tsx
/trends/page.tsx
/news/page.tsx

/app/api
/condos/route.ts
/trends/route.ts
/news/route.ts

/lib
/db

## Data Flow

External Sources → API Routes → SQLite Cache → Scoring Engine → UI

## Logic Layer

* Deal scoring engine for condo listings
* Runs during data ingestion

## Principles

* Local-first
* Fast loading
* Simple architecture
