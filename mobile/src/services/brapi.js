const BRAPI_BASE_URL = 'https://brapi.dev/api/quote';

export async function fetchQuote(ticker) {
  const normalizedTicker = ticker.trim().toUpperCase();

  if (!normalizedTicker) {
    throw new Error('Informe um ticker valido.');
  }

  const response = await fetch(
    `${BRAPI_BASE_URL}/${encodeURIComponent(normalizedTicker)}`
  );

  if (!response.ok) {
    throw new Error('Nao foi possivel consultar a cotacao.');
  }

  const data = await response.json();
  const result = data?.results?.[0];
  const currentPrice = Number(result?.regularMarketPrice);

  if (!result || !Number.isFinite(currentPrice)) {
    throw new Error('Ticker nao encontrado na Brapi.');
  }

  return {
    ticker: result.symbol || normalizedTicker,
    name: result.shortName || result.longName || normalizedTicker,
    price: currentPrice,
    currency: result.currency || 'BRL',
    updatedAt: result.regularMarketTime || null,
  };
}
