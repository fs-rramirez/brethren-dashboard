import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'brethren.db');

const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS condos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT    NOT NULL,
    price      INTEGER NOT NULL,
    location   TEXT,
    source     TEXT,
    created_at TEXT,
    score      INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS trends (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT NOT NULL,
    url        TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS news (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    title   TEXT NOT NULL,
    link    TEXT,
    pubDate TEXT
  );
`);

export default db;
