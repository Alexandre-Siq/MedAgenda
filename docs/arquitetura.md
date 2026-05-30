# Arquitetura do projeto - MedAgenda

## 1. Visão geral

O MedAgenda segue uma arquitetura web em camadas, separando interface,
processamento de regras de negócio e persistência de dados.

```text
Navegador
   |
   | HTTP/JSON
   v
Frontend React/Vite
   |
   | HTTP/JSON + JWT
   v
Backend Spring Boot
   |
   | JPA/Hibernate
   v
PostgreSQL
```

## 2. Frontend

O frontend está localizado em `frontend/` e utiliza React com Vite.

Responsabilidades:

- apresentar as telas ao usuário;
- controlar navegação com React Router;
- armazenar token JWT no navegador;
- chamar endpoints do backend;
- validar campos para melhorar a experiência do usuário;
- exibir mensagens de erro e estados de carregamento.

Arquivos relevantes:

- `src/App.jsx`: rotas da aplicação;
- `src/auth/AuthContext.jsx`: estado de autenticação;
- `src/auth/ProtectedRoute.jsx`: proteção de rotas internas;
- `src/api/client.js`: cliente HTTP;
- `src/pages/LoginPage.jsx`: login real;
- `src/pages/PacientesPage.jsx`: CRUD parcial real de pacientes;
- `src/styles.css`: design system e estilos globais.

## 3. Backend

O backend está localizado em `backend/` e utiliza Java Spring Boot.

Responsabilidades:

- expor API REST;
- autenticar usuários;
- gerar e validar JWT;
- aplicar regras de negócio;
- persistir dados com JPA;
- proteger endpoints internos.

Camadas principais:

```text
controller -> service -> repository -> entity -> banco
```

### Controller

Recebe requisições HTTP e retorna respostas JSON.

Exemplo:

- `PacienteController`
- `AuthController`

### Service

Concentra regras de negócio.

Exemplo:

- validação de CPF;
- bloqueio de CPF duplicado;
- bloqueio de data de nascimento futura;
- normalização de dados antes de salvar.

### Repository

Interface com o banco de dados por meio do Spring Data JPA.

### Entity

Classes que representam tabelas do banco de dados.

## 4. Banco de dados

O banco utilizado é PostgreSQL. Para execução local, o projeto possui
`docker-compose.yml`, que sobe um container com:

```text
Banco: medagenda
Usuário: medagenda
Senha: medagenda
Porta: 5432
```

## 5. Autenticação

A autenticação usa JWT.

Fluxo:

1. Usuário envia e-mail e senha.
2. Backend valida as credenciais.
3. Backend retorna token JWT.
4. Frontend salva o token.
5. Frontend envia o token no header:

```text
Authorization: Bearer <token>
```

Rotas públicas:

```text
GET /api/health
/api/auth/**
```

Rotas protegidas:

```text
/api/pacientes/**
/api/profissionais-saude/**
/api/consultas/**
```

## 6. CORS

O backend permite requisições do frontend local:

```text
http://localhost:5173
http://127.0.0.1:5173
```

Isso é necessário porque frontend e backend rodam em portas diferentes durante o
desenvolvimento local.

## 7. Ambiente local

Para facilitar demonstração, o projeto possui:

- Docker Compose para PostgreSQL;
- Maven Wrapper para rodar backend sem Maven global;
- perfil Spring `local`;
- dados de demonstração automáticos.

## 8. Decisões arquiteturais

| Decisão | Justificativa |
| --- | --- |
| React no frontend | Facilita construção de telas em componentes. |
| Vite | Ambiente leve e rápido para desenvolvimento. |
| Spring Boot | Facilita criação de APIs REST em Java. |
| JPA/Hibernate | Reduz código manual de persistência. |
| PostgreSQL | Banco relacional robusto e comum em aplicações reais. |
| JWT | Permite autenticação stateless para API. |
| Docker Compose | Padroniza o banco local. |
| Maven Wrapper | Evita depender de Maven instalado manualmente. |

## 9. Limitações atuais

- Dashboard, agenda e chatbot ainda usam dados mockados.
- Não há testes automatizados completos.
- Não há controle refinado de permissões por papel.
- Não há deploy em ambiente público.
- O chatbot ainda não cria consultas reais.
