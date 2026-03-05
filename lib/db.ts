import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'spinmyagent.db');

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    runMigrations(db);
  }
  return db;
}

function runMigrations(database: Database.Database): void {
  // Create migrations tracking table
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const appliedVersions = database
    .prepare('SELECT version FROM schema_migrations')
    .all()
    .map((row: any) => row.version);

  const migrations: { version: number; sql: string }[] = [
    {
      version: 1,
      sql: `
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

        -- Product prices table
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          price_cents INTEGER NOT NULL,
          active INTEGER NOT NULL DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Session attempt tracking for brute-force protection
        CREATE TABLE IF NOT EXISTS session_attempts (
          ip TEXT NOT NULL,
          attempt_count INTEGER NOT NULL DEFAULT 1,
          blocked_until TIMESTAMP,
          last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (ip)
        );
      `,
    },
    {
      version: 2,
      sql: `
        -- Seed product data (move hardcoded prices to DB)
        INSERT OR IGNORE INTO products (id, name, description, price_cents, active)
        VALUES (
          'complete-openclaw-os',
          'Complete OpenClaw Operating System',
          '66-page guide with all 6 guides + templates + email support',
          2900,
          1
        );
      `,
    },
  ];

  for (const migration of migrations) {
    if (!appliedVersions.includes(migration.version)) {
      const runMigration = database.transaction(() => {
        database.exec(migration.sql);
        database
          .prepare('INSERT INTO schema_migrations (version) VALUES (?)')
          .run(migration.version);
      });
      runMigration();
      console.log(`[DB] Applied migration v${migration.version}`);
    }
  }
}

// ─── Rate Limiting ──────────────────────────────────────────────────────────

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5');
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_HOURS || '1') * 60 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export function checkRateLimit(email: string): RateLimitResult {
  const database = getDb();
  const now = new Date();

  // Clean up old entries (>24h)
  database
    .prepare("DELETE FROM rate_limits WHERE reset_at < datetime('now', '-24 hours')")
    .run();

  const existing = database
    .prepare('SELECT * FROM rate_limits WHERE email = ?')
    .get(email) as any;

  if (!existing) {
    // First request
    const resetAt = new Date(now.getTime() + RATE_LIMIT_WINDOW_MS);
    database
      .prepare(
        'INSERT INTO rate_limits (email, request_count, reset_at) VALUES (?, 1, ?)'
      )
      .run(email, resetAt.toISOString());
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt };
  }

  const resetAt = new Date(existing.reset_at);

  if (now > resetAt) {
    // Window expired → reset
    const newResetAt = new Date(now.getTime() + RATE_LIMIT_WINDOW_MS);
    database
      .prepare(
        'UPDATE rate_limits SET request_count = 1, reset_at = ? WHERE email = ?'
      )
      .run(newResetAt.toISOString(), email);
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: newResetAt };
  }

  if (existing.request_count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt };
  }

  // Increment count
  database
    .prepare('UPDATE rate_limits SET request_count = request_count + 1 WHERE email = ?')
    .run(email);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - existing.request_count - 1,
    resetAt,
  };
}

// ─── Payments ────────────────────────────────────────────────────────────────

export interface Payment {
  id: string;
  session_id: string;
  email: string;
  amount_cents: number;
  status: string;
  created_at: string;
  verified_at: string | null;
  expires_at: string | null;
}

export function recordPayment(
  sessionId: string,
  email: string,
  amountCents: number,
  status: string = 'completed'
): void {
  const database = getDb();
  const id = crypto.randomUUID();
  const now = new Date();
  // Payment links valid for 30 minutes after completion
  const expiresAt = new Date(now.getTime() + 30 * 60 * 1000);

  database
    .prepare(
      `INSERT OR IGNORE INTO payments (id, session_id, email, amount_cents, status, verified_at, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      id,
      sessionId,
      email.toLowerCase().trim(),
      amountCents,
      status,
      now.toISOString(),
      expiresAt.toISOString()
    );
}

export function getPayment(sessionId: string): Payment | null {
  const database = getDb();
  return (
    (database
      .prepare('SELECT * FROM payments WHERE session_id = ?')
      .get(sessionId) as Payment) || null
  );
}

export function isPaymentValid(sessionId: string): { valid: boolean; reason?: string } {
  const payment = getPayment(sessionId);
  if (!payment) {
    return { valid: false, reason: 'Payment not found' };
  }
  if (payment.status !== 'completed') {
    return { valid: false, reason: 'Payment not completed' };
  }
  if (payment.expires_at && new Date() > new Date(payment.expires_at)) {
    return { valid: false, reason: 'Payment link expired' };
  }
  return { valid: true };
}

// ─── Products ────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  active: number;
}

export function getProduct(id: string): Product | null {
  const database = getDb();
  return (
    (database
      .prepare('SELECT * FROM products WHERE id = ? AND active = 1')
      .get(id) as Product) || null
  );
}

// ─── Session Attempt Tracking ────────────────────────────────────────────────

const MAX_FAILED_ATTEMPTS = 3;
const BLOCK_DURATION_MS = 60 * 60 * 1000; // 1 hour

export interface AttemptResult {
  allowed: boolean;
  blockedUntil?: Date;
}

export function checkSessionAttempt(ip: string): AttemptResult {
  const database = getDb();
  const now = new Date();

  const existing = database
    .prepare('SELECT * FROM session_attempts WHERE ip = ?')
    .get(ip) as any;

  if (!existing) {
    return { allowed: true };
  }

  if (existing.blocked_until && new Date(existing.blocked_until) > now) {
    return { allowed: false, blockedUntil: new Date(existing.blocked_until) };
  }

  return { allowed: true };
}

export function recordFailedAttempt(ip: string): void {
  const database = getDb();
  const now = new Date();

  const existing = database
    .prepare('SELECT * FROM session_attempts WHERE ip = ?')
    .get(ip) as any;

  if (!existing) {
    database
      .prepare(
        'INSERT INTO session_attempts (ip, attempt_count, last_attempt) VALUES (?, 1, ?)'
      )
      .run(ip, now.toISOString());
    return;
  }

  const newCount = (existing.attempt_count || 0) + 1;
  let blockedUntil = null;

  if (newCount >= MAX_FAILED_ATTEMPTS) {
    blockedUntil = new Date(now.getTime() + BLOCK_DURATION_MS).toISOString();
    console.warn(`[Security] IP ${ip} blocked for too many failed attempts`);
  }

  database
    .prepare(
      'UPDATE session_attempts SET attempt_count = ?, blocked_until = ?, last_attempt = ? WHERE ip = ?'
    )
    .run(newCount, blockedUntil, now.toISOString(), ip);
}

export function resetAttempts(ip: string): void {
  const database = getDb();
  database.prepare('DELETE FROM session_attempts WHERE ip = ?').run(ip);
}

export default getDb;
