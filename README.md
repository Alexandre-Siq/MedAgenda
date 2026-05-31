# MedAgenda

Fundacao inicial do MedAgenda, uma plataforma para organizar agendas medicas,
pacientes e fluxos operacionais de atendimento em clinicas.

## Estrutura

```text
backend/   API Java Spring Boot
frontend/  Landing page React com Vite
mobile/    App Expo React Native para carteira de investimentos
docs/      Documentacao inicial do produto
```

## Backend

Stack inicial:

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Validation
- PostgreSQL
- JJWT

Pacotes criados:

- `controller`
- `service`
- `repository`
- `entity`
- `security`

> Observacao: nenhuma entidade JPA foi criada nesta etapa. O pacote `entity`
> esta reservado para a modelagem futura apos aprovacao.

### Executar localmente

```bash
cd backend
mvn spring-boot:run
```

Por padrao, a API usa as variaveis:

- `DATABASE_URL` (`jdbc:postgresql://localhost:5432/medagenda`)
- `DATABASE_USERNAME` (`medagenda`)
- `DATABASE_PASSWORD` (`medagenda`)
- `SERVER_PORT` (`8080`)

Endpoint publico inicial:

```text
GET /api/health
```

## Frontend

Stack inicial:

- React
- Vite
- CSS puro com identidade visual branca, teal `#009E96`, texto `#111111` e cinza `#555555`

Componentes criados:

- `Header`
- `HeroSection`
- `FeatureCard`

### Executar localmente

```bash
cd frontend
npm install
npm run dev
```

### Build

```bash
cd frontend
npm run build
```

## Mobile

Stack adicionada para apresentacao academica de uma carteira de investimentos:

- Expo + React Native
- React Navigation com Bottom Tabs
- expo-sqlite para registrar compras e vendas
- fetch API nativo consumindo `https://brapi.dev/api/quote/{ticker}`
- Dark theme minimalista

Principais arquivos:

- `mobile/App.js`
- `mobile/src/database/database.js`
- `mobile/src/services/brapi.js`
- `mobile/src/screens/HomeScreen.js`
- `mobile/src/screens/TradeScreen.js`

### Executar localmente

```bash
cd mobile
npm install
npm run android
```

Para Expo Web:

```bash
cd mobile
npm run web
```

## Documentacao

O escopo inicial esta em [`docs/escopo-inicial.md`](docs/escopo-inicial.md).
