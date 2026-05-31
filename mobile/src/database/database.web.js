const STORAGE_KEY = 'portfolio_wallet_transactions';

function readTransactions() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }

  const rawTransactions = window.localStorage.getItem(STORAGE_KEY);

  if (!rawTransactions) {
    return [];
  }

  try {
    const transactions = JSON.parse(rawTransactions);
    return Array.isArray(transactions) ? transactions : [];
  } catch (error) {
    return [];
  }
}

function writeTransactions(transactions) {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }
}

export async function initDatabase() {
  const transactions = readTransactions();
  writeTransactions(transactions);
}

export async function insertTransaction({ type, ticker, quantity, price, date }) {
  const transactions = readTransactions();
  const nextId =
    transactions.reduce((largestId, item) => Math.max(largestId, item.id), 0) +
    1;
  const transaction = {
    id: nextId,
    type,
    ticker,
    quantity,
    price,
    date,
  };

  transactions.push(transaction);
  writeTransactions(transactions);

  return {
    lastInsertRowId: nextId,
    changes: 1,
  };
}

export async function getTransactions() {
  return readTransactions().sort((a, b) => {
    const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return a.id - b.id;
  });
}
