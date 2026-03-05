-- Migration 001: Initial security schema
-- Run this before deploying

-- Schema migrations tracker
CREATE TABLE IF NOT EXISTS schema_migrations (
  version INTEGER PRIMARY KEY,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
  email TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  reset_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (email)
);

-- Payment tracking table
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  amount_cents INTEGER,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP,
  expires_at TIMESTAMP
);

-- Product prices table (replaces hardcoded values)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Session attempt tracking (brute-force protection)
CREATE TABLE IF NOT EXISTS session_attempts (
  ip TEXT NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  blocked_until TIMESTAMP,
  last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ip)
);

-- Insert initial product data
INSERT OR IGNORE INTO products (id, name, description, price_cents, active)
VALUES (
  'complete-openclaw-os',
  'Complete OpenClaw Operating System',
  '66-page guide with all 6 guides + templates + email support',
  2900,
  1
);

-- Mark migrations as applied
INSERT OR IGNORE INTO schema_migrations (version) VALUES (1);
INSERT OR IGNORE INTO schema_migrations (version) VALUES (2);
