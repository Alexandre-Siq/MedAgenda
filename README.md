# MedAgenda

Fundacao inicial do MedAgenda, uma plataforma para organizar agendas medicas,
pacientes e fluxos operacionais de atendimento em clinicas.

## Estrutura

```text
backend/   API Java Spring Boot
frontend/  Landing page React com Vite
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
- `JWT_SECRET` (segredo HMAC para assinar tokens; altere fora de desenvolvimento)
- `JWT_EXPIRATION_MINUTES` (`120`)

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

## Documentacao

O escopo inicial esta em [`docs/escopo-inicial.md`](docs/escopo-inicial.md).


## Dominio inicial

Apos aprovacao da fundacao, o backend recebeu um modelo JPA inicial com:

- `Paciente`
- `ProfissionalSaude`
- `Consulta`
- `StatusConsulta`

Endpoints REST iniciais:

```text
GET  /api/pacientes
GET  /api/pacientes/{id}
POST /api/pacientes

GET  /api/profissionais-saude
GET  /api/profissionais-saude/{id}
POST /api/profissionais-saude

GET  /api/consultas
GET  /api/consultas/{id}
POST /api/consultas
```

Enquanto a autenticacao JWT nao estiver implementada, esses endpoints ficam liberados
na configuracao de seguranca para facilitar validacao local do dominio.


## Autenticacao JWT

A API possui um fluxo inicial de autenticacao com BCrypt e JWT:

```text
POST /api/auth/register
POST /api/auth/login
```

O cadastro retorna um token Bearer para uso no header:

```text
Authorization: Bearer <accessToken>
```

Os endpoints de dominio (`/api/pacientes`, `/api/profissionais-saude` e
`/api/consultas`) agora exigem autenticacao. O endpoint `GET /api/health`
permanece publico.

Papeis iniciais de usuario:

- `ADMIN`
- `PROFISSIONAL`
- `RECEPCAO`
