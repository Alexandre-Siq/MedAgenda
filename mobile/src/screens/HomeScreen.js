import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getTransactions, initDatabase } from '../database/database';
import { fetchQuote } from '../services/brapi';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const numberFormatter = new Intl.NumberFormat('pt-BR');

function formatCurrency(value) {
  if (!Number.isFinite(value)) {
    return '--';
  }

  return currencyFormatter.format(value);
}

function buildPortfolio(transactions) {
  const positions = new Map();

  transactions.forEach((transaction) => {
    const ticker = transaction.ticker.toUpperCase();
    const quantity = Number(transaction.quantity);
    const price = Number(transaction.price);

    if (!positions.has(ticker)) {
      positions.set(ticker, {
        ticker,
        quantity: 0,
        totalCost: 0,
      });
    }

    const position = positions.get(ticker);

    if (transaction.type === 'BUY') {
      position.quantity += quantity;
      position.totalCost += quantity * price;
      return;
    }

    const averagePrice =
      position.quantity > 0 ? position.totalCost / position.quantity : 0;
    const quantityToRemove = Math.min(position.quantity, quantity);

    position.quantity -= quantity;
    position.totalCost -= averagePrice * quantityToRemove;

    if (position.quantity <= 0) {
      position.quantity = 0;
      position.totalCost = 0;
    }
  });

  return Array.from(positions.values())
    .filter((position) => position.quantity > 0)
    .map((position) => ({
      ticker: position.ticker,
      quantity: position.quantity,
      averagePrice: position.totalCost / position.quantity,
    }))
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
}

export default function HomeScreen() {
  const [positions, setPositions] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadPortfolio = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }

    setError('');

    try {
      await initDatabase();
      const transactions = await getTransactions();
      const portfolio = buildPortfolio(transactions);

      const hydratedPortfolio = await Promise.all(
        portfolio.map(async (position) => {
          try {
            const quote = await fetchQuote(position.ticker);
            return {
              ...position,
              currentPrice: quote.price,
              currentValue: quote.price * position.quantity,
              quoteError: '',
            };
          } catch (quoteError) {
            return {
              ...position,
              currentPrice: null,
              currentValue: position.averagePrice * position.quantity,
              quoteError: 'Cotacao indisponivel',
            };
          }
        })
      );

      setPositions(hydratedPortfolio);
      setTotalValue(
        hydratedPortfolio.reduce(
          (total, item) => total + item.currentValue,
          0
        )
      );
    } catch (loadError) {
      setError('Nao foi possivel carregar sua carteira.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPortfolio();
    }, [loadPortfolio])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadPortfolio(false);
  };

  const renderPosition = ({ item }) => (
    <View style={styles.assetCard}>
      <View style={styles.assetHeader}>
        <Text style={styles.ticker}>{item.ticker}</Text>
        <Text style={styles.currentValue}>
          {formatCurrency(item.currentValue)}
        </Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Quantidade</Text>
          <Text style={styles.metricValue}>
            {numberFormatter.format(item.quantity)}
          </Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Preco medio</Text>
          <Text style={styles.metricValue}>
            {formatCurrency(item.averagePrice)}
          </Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Preco atual</Text>
          <Text style={styles.metricValue}>
            {item.currentPrice ? formatCurrency(item.currentPrice) : '--'}
          </Text>
        </View>
      </View>

      {item.quoteError ? (
        <Text style={styles.quoteError}>{item.quoteError}</Text>
      ) : null}
    </View>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Carteira de Investimentos</Text>
        <Text style={styles.title}>Patrimonio Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(totalValue)}</Text>
        <Text style={styles.subtitle}>
          Acoes, FIIs e ETFs consolidados com cotacao real da Brapi.
        </Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Ativos em carteira</Text>
        {loading ? <ActivityIndicator color="#8FB3FF" /> : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={positions}
        keyExtractor={(item) => item.ticker}
        renderItem={renderPosition}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#8FB3FF"
          />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Nenhum ativo cadastrado</Text>
              <Text style={styles.emptyText}>
                Use a aba Comprar/Vender para registrar sua primeira operacao.
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  listContent: {
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    backgroundColor: '#181A20',
    borderColor: '#2A2D35',
    borderRadius: 24,
    borderWidth: 1,
    padding: 22,
    marginBottom: 18,
  },
  eyebrow: {
    color: '#8FB3FF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  title: {
    color: '#E8EAED',
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    color: '#A8ADB7',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  errorText: {
    backgroundColor: '#2A171A',
    borderColor: '#6D2A31',
    borderRadius: 14,
    borderWidth: 1,
    color: '#FF9A9A',
    marginBottom: 16,
    padding: 12,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#E8EAED',
    fontSize: 18,
    fontWeight: '700',
  },
  assetCard: {
    backgroundColor: '#181A20',
    borderColor: '#2A2D35',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 14,
    padding: 18,
  },
  assetHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  ticker: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  currentValue: {
    color: '#B8C7FF',
    fontSize: 16,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricBox: {
    backgroundColor: '#101216',
    borderRadius: 14,
    flex: 1,
    padding: 12,
  },
  metricLabel: {
    color: '#8A8F98',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: '#E8EAED',
    fontSize: 14,
    fontWeight: '700',
  },
  quoteError: {
    color: '#FFCF8A',
    fontSize: 12,
    marginTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderColor: '#2A2D35',
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
  },
  emptyTitle: {
    color: '#E8EAED',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    color: '#A8ADB7',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
