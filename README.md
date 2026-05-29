# MedAgenda

MedAgenda é uma plataforma em evolução para organizar agendas médicas, pacientes
e fluxos operacionais de atendimento em clínicas. O projeto combina um backend
Spring Boot com um frontend React/Vite navegável para demonstração acadêmica.

## Estrutura

```text
backend/   API Java Spring Boot
frontend/  Interface React com Vite
docs/      Documentação inicial e guias de execução
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

Pacotes principais:

- `controller`
- `service`
- `repository`
- `entity`
- `security`
- `config`

### Domínio inicial

O backend possui um modelo JPA inicial com:

- `Paciente`
- `ProfissionalSaude`
- `Consulta`
- `StatusConsulta`
- `Usuario`
- `PapelUsuario`

Endpoints REST iniciais:

```text
GET  /api/health

POST /api/auth/register
POST /api/auth/login

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

Os endpoints de domínio exigem autenticação via Bearer token. O endpoint
`GET /api/health` e os endpoints `/api/auth/**` permanecem públicos.

### Autenticação JWT

A API possui um fluxo inicial de autenticação com BCrypt e JWT. O login retorna
um token para uso no header:

```text
Authorization: Bearer <accessToken>
```

Papéis iniciais de usuário:

- `ADMIN`
- `PROFISSIONAL`
- `RECEPCAO`

## Frontend

Stack inicial:

- React
- Vite
- React Router
- Lucide React
- CSS puro com tema clínico minimalista

Rotas navegáveis para demonstração:

```text
/                Página inicial
/login           Entrada do médico
/dashboard       Painel geral
/agenda          Agenda semanal
/pacientes       Lista de pacientes
/chatbot         Chatbot do paciente
/configuracoes   Configurações
```

O login do médico já usa o backend real em `/api/auth/login`, e a tela de pacientes lista dados reais de `/api/pacientes`. As demais telas ainda usam dados mockados para permitir apresentação imediata enquanto a integração completa evolui.

## Execução local recomendada

Para rodar com PostgreSQL local, backend e frontend, siga o guia:

[`docs/execucao-local.md`](docs/execucao-local.md)

Resumo rápido:

```bash
docker compose up -d postgres

cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=local

cd ../frontend
npm install
npm run dev
```

### Windows sem Maven instalado

Dentro da pasta `backend`, use o Maven Wrapper:

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=local"
```

Na primeira execução ele baixa o Maven automaticamente. Você só precisa ter Java instalado.

Login real no frontend:

- o backend deve estar rodando em `http://localhost:8080`;
- o frontend usa `VITE_API_URL=http://localhost:8080` por padrão;
- após entrar, o token JWT fica salvo no navegador e libera as rotas do médico.

Credenciais de demonstração criadas pelo perfil `local`:

```text
E-mail: dr.ricardo@medagenda.local
Senha: medagenda123
```

## Build

Backend:

```bash
cd backend
./mvnw -DskipTests package
```

Frontend:

```bash
cd frontend
npm run build
```

## Documentação

- [`docs/escopo-inicial.md`](docs/escopo-inicial.md)
- [`docs/execucao-local.md`](docs/execucao-local.md)
