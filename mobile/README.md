# Carteira de Investimentos Mobile

Aplicativo academico em React Native com Expo para registrar compras e vendas
de acoes, FIIs e ETFs, persistir as operacoes em SQLite local e consultar
cotacoes reais pela API publica da Brapi.

## Tecnologias

- Expo + React Native
- React Navigation com Bottom Tabs
- expo-sqlite para persistencia local
- fetch API nativo com async/await

## Estrutura

```text
App.js
src/
  database/
    database.js
  screens/
    HomeScreen.js
    TradeScreen.js
  services/
    brapi.js
```

## Banco SQLite

A tabela `transactions` e criada automaticamente na inicializacao:

```sql
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK (type IN ('BUY', 'SELL')),
  ticker TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  date TEXT NOT NULL
);
```

## API de cotacoes

As cotacoes sao buscadas em:

```text
https://brapi.dev/api/quote/{ticker}
```

## Executar

```bash
npm install
npm run android
```

Para Expo Web:

```bash
npm run web
```
