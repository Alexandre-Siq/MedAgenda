# Execução local

Este guia prepara o MedAgenda para demonstração no notebook com frontend,
backend e PostgreSQL local.

## Pré-requisitos

- Java 21
- Maven
- Node.js 20 ou superior
- Docker Desktop

## 1. Atualizar o projeto

```bash
git pull origin cursor/bootstrap-medagenda-cedd
```

## 2. Subir o PostgreSQL

Na raiz do projeto:

```bash
docker compose up -d postgres
```

O banco ficará disponível em:

```text
Host: localhost
Porta: 5432
Banco: medagenda
Usuário: medagenda
Senha: medagenda
```

## 3. Rodar o backend com dados de demonstração

Em outro terminal:

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

No PowerShell, se o comando acima não reconhecer a propriedade `-D`, use:

```powershell
mvn spring-boot:run "-Dspring-boot.run.profiles=local"
```

O perfil `local`:

- conecta no PostgreSQL do Docker Compose;
- cria/atualiza as tabelas com `ddl-auto=update`;
- carrega dados de demonstração;
- cria o usuário médico abaixo.

Credenciais de demonstração:

```text
E-mail: dr.ricardo@medagenda.local
Senha: medagenda123
```

Teste rápido da API:

```text
GET http://localhost:8080/api/health
```

## 4. Rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra no navegador:

```text
http://localhost:5173/
```

## Rotas úteis para apresentação

```text
/                Página inicial
/login           Entrada do médico
/dashboard       Painel geral
/agenda          Agenda semanal
/pacientes       Lista de pacientes
/chatbot         Chatbot do paciente
/configuracoes   Configurações
```

## Parar os serviços

Para parar o frontend ou backend, use `Ctrl + C` no terminal correspondente.

Para parar o PostgreSQL:

```bash
docker compose down
```

Para remover também os dados do banco local:

```bash
docker compose down -v
```
