import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { initDatabase, insertTransaction } from '../database/database';
import { fetchQuote } from '../services/brapi';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatCurrency(value) {
  if (!Number.isFinite(value)) {
    return '--';
  }

  return currencyFormatter.format(value);
}

function parseQuantity(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function TradeScreen() {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const normalizedTicker = ticker.trim().toUpperCase();
  const parsedQuantity = parseQuantity(quantity);
  const hasValidQuote =
    quote && quote.ticker.toUpperCase() === normalizedTicker && quote.price > 0;
  const canSubmit = hasValidQuote && parsedQuantity > 0 && !saving;

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleTickerChange = (value) => {
    setTicker(value.toUpperCase());
    setQuote(null);
    clearMessages();
  };

  const handleQuantityChange = (value) => {
    setQuantity(value.replace(/[^0-9]/g, ''));
    clearMessages();
  };

  const handleSearch = async () => {
    clearMessages();

    if (!normalizedTicker) {
      setError('Informe um ticker, por exemplo BOVA11.');
      return;
    }

    setLoadingQuote(true);

    try {
      const result = await fetchQuote(normalizedTicker);
      setQuote(result);
      setTicker(result.ticker);
    } catch (searchError) {
      setQuote(null);
      setError(searchError.message || 'Nao foi possivel buscar a cotacao.');
    } finally {
      setLoadingQuote(false);
    }
  };

  const handleTrade = async (type) => {
    clearMessages();

    if (!canSubmit) {
      setError('Busque uma cotacao valida e informe a quantidade.');
      return;
    }

    setSaving(true);

    try {
      await initDatabase();
      await insertTransaction({
        type,
        ticker: quote.ticker.toUpperCase(),
        quantity: parsedQuantity,
        price: quote.price,
        date: new Date().toISOString(),
      });

      setSuccess(
        type === 'BUY'
          ? 'Compra registrada com sucesso.'
          : 'Venda registrada com sucesso.'
      );
      setTicker('');
      setQuantity('');
      setQuote(null);
    } catch (saveError) {
      setError('Nao foi possivel gravar a operacao.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.eyebrow}>Comprar e Vender</Text>
          <Text style={styles.title}>Registre suas operacoes</Text>
          <Text style={styles.subtitle}>
            Consulte a cotacao atual pela Brapi e salve compras ou vendas no
            banco local SQLite.
          </Text>

          <View style={styles.formCard}>
            <Text style={styles.label}>Ticker</Text>
            <TextInput
              autoCapitalize="characters"
              autoCorrect={false}
              placeholder="Ex: BOVA11, PETR4, KNCR11"
              placeholderTextColor="#6F7682"
              style={styles.input}
              value={ticker}
              onChangeText={handleTickerChange}
            />

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Ex: 10"
              placeholderTextColor="#6F7682"
              style={styles.input}
              value={quantity}
              onChangeText={handleQuantityChange}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              disabled={loadingQuote}
              onPress={handleSearch}
              style={[styles.searchButton, loadingQuote && styles.disabled]}
            >
              {loadingQuote ? (
                <ActivityIndicator color="#0F1115" />
              ) : (
                <Text style={styles.searchButtonText}>Buscar cotacao</Text>
              )}
            </TouchableOpacity>

            {quote ? (
              <View style={styles.quoteCard}>
                <View>
                  <Text style={styles.quoteLabel}>Cotacao encontrada</Text>
                  <Text style={styles.quoteTicker}>{quote.ticker}</Text>
                  <Text style={styles.quoteName}>{quote.name}</Text>
                </View>
                <Text style={styles.quotePrice}>
                  {formatCurrency(quote.price)}
                </Text>
              </View>
            ) : null}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}

            <View style={styles.actionsRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={!canSubmit}
                onPress={() => handleTrade('BUY')}
                style={[
                  styles.actionButton,
                  styles.buyButton,
                  !canSubmit && styles.disabled,
                ]}
              >
                <Text style={styles.actionText}>
                  {saving ? 'Salvando...' : 'Comprar'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                disabled={!canSubmit}
                onPress={() => handleTrade('SELL')}
                style={[
                  styles.actionButton,
                  styles.sellButton,
                  !canSubmit && styles.disabled,
                ]}
              >
                <Text style={styles.actionText}>
                  {saving ? 'Salvando...' : 'Vender'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  eyebrow: {
    color: '#8FB3FF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    color: '#A8ADB7',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
  },
  formCard: {
    backgroundColor: '#181A20',
    borderColor: '#2A2D35',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  label: {
    color: '#E8EAED',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#101216',
    borderColor: '#2A2D35',
    borderRadius: 16,
    borderWidth: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: '#8FB3FF',
    borderRadius: 16,
    justifyContent: 'center',
    marginBottom: 18,
    minHeight: 52,
  },
  searchButtonText: {
    color: '#0F1115',
    fontSize: 15,
    fontWeight: '800',
  },
  quoteCard: {
    alignItems: 'center',
    backgroundColor: '#101216',
    borderColor: '#2A2D35',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
  },
  quoteLabel: {
    color: '#8A8F98',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  quoteTicker: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  quoteName: {
    color: '#A8ADB7',
    fontSize: 12,
    marginTop: 4,
    maxWidth: 160,
  },
  quotePrice: {
    color: '#B8C7FF',
    fontSize: 18,
    fontWeight: '800',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
    minHeight: 54,
  },
  buyButton: {
    backgroundColor: '#3BAA77',
  },
  sellButton: {
    backgroundColor: '#C65F64',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  disabled: {
    opacity: 0.55,
  },
  errorText: {
    backgroundColor: '#2A171A',
    borderColor: '#6D2A31',
    borderRadius: 14,
    borderWidth: 1,
    color: '#FF9A9A',
    marginBottom: 12,
    padding: 12,
  },
  successText: {
    backgroundColor: '#13241D',
    borderColor: '#2C6B4D',
    borderRadius: 14,
    borderWidth: 1,
    color: '#8BE0B1',
    marginBottom: 12,
    padding: 12,
  },
});
