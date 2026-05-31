import * as SQLite from 'expo-sqlite';

let database;

export async function getDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync('portfolio_wallet.db');
  }

  return database;
}

export async function initDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL CHECK (type IN ('BUY', 'SELL')),
      ticker TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      date TEXT NOT NULL
    );
  `);
}

export async function insertTransaction({ type, ticker, quantity, price, date }) {
  const db = await getDatabase();

  return db.runAsync(
    `INSERT INTO transactions (type, ticker, quantity, price, date)
     VALUES (?, ?, ?, ?, ?)`,
    type,
    ticker,
    quantity,
    price,
    date
  );
}

export async function getTransactions() {
  const db = await getDatabase();

  return db.getAllAsync(`
    SELECT id, type, ticker, quantity, price, date
    FROM transactions
    ORDER BY date ASC, id ASC
  `);
}
