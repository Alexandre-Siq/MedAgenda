# MedAgenda

Fundação inicial do MedAgenda, uma plataforma para organizar agendas médicas,
pacientes e fluxos operacionais de aténdimento em clínicas.

## Estrutura

```text
backend/   API Jáva Spring Boot
frontend/  Landing page React com Vite
docs/      Documentação inicial do produto
```

## Backend

Stack inicial:

- Jáva 21
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

> Observação: nenhuma entidade JPA foi criada nesta etapa. O pacote `entity`
> está reservado para a modelagem futura após aprovação.

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

## Documentação

O escopo inicial está em [`docs/escopo-inicial.md`](docs/escopo-inicial.md).


## Domínio inicial

Após aprovação da fundação, o backend recebeu um modelo JPA inicial com:

- `Paciente`
- `ProfissionalSaude`
- `Consulta`
- `StatusConsulta`

Endpoints REST iniciais:

```text
GET  /api/pacientes
GET  /api/pacientes/{id}
POST /api/pacientes

GET  /api/profissionais-saúde
GET  /api/profissionais-saúde/{id}
POST /api/profissionais-saúde

GET  /api/consultas
GET  /api/consultas/{id}
POST /api/consultas
```

Enquanto a autenticação JWT não estiver implementada, esses endpoints ficam liberados
na configuração de seguranca para facilitar validação local do domínio.


## Autenticação JWT

A API possui um fluxo inicial de autenticação com BCrypt e JWT:

```text
POST /api/auth/register
POST /api/auth/login
```

O cadastro retorna um token Bearer para uso no header:

```text
Authorization: Bearer <accessToken>
```

Os endpoints de domínio (`/api/pacientes`, `/api/profissionais-saúde` e
`/api/consultas`) agora exigem autenticação. O endpoint `GET /api/health`
permanece publico.

Papéis iniciais de usuário:

- `ADMIN`
- `PROFISSIONAL`
- `RECEPCAO`


## Protótipo visual local

O frontend possui fluxos navegáveis para demonstração acadêmica, com dados
mockados e sem depender de integração completa com a API:

```text
/                Landing page
/login           Login visual do médico
/dashboard       Painel geral do médico
/agenda          Agenda semanal
/pacientes       Lista de pacientes
/chatbot         Chatbot do paciente
/configurações   Configurações do médico e chatbot
```

Para demonstrar localmente:

```bash
cd frontend
npm install
npm run dev
```

Abra o endereço exibido pelo Vite e navegue pelos CTAs da landing page. O login
aceita qualquer envio e redireciona para o painel médico, pois nesta etapa o
objetivo e apresentar interface e fluxo de produto.
