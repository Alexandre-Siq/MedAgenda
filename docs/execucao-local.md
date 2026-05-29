# Execução local

Este guia prepara o MedAgenda para demonstração no notebook com frontend,
backend e PostgreSQL local.

## Pré-requisitos

- Java 21
- Maven ou Maven Wrapper, já versionado em `backend/`
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
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

### No Windows PowerShell

Se você não tem Maven instalado, use o Maven Wrapper que vem no projeto:

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=local"
```

Na primeira execução ele baixa o Maven automaticamente. O pré-requisito é ter Java instalado.

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

## Login real

Com o PostgreSQL e o backend rodando, acesse `/login` e use:

```text
E-mail: dr.ricardo@medagenda.local
Senha: medagenda123
```

O frontend chama `POST http://localhost:8080/api/auth/login`, salva o JWT no navegador e libera as telas do médico. Se o backend estiver desligado, a tela de login exibirá erro de conexão.

## Listagem, visualização, edição e cadastro real de pacientes

Após entrar no painel, acesse `/pacientes`. Essa tela chama `GET http://localhost:8080/api/pacientes` usando o token JWT salvo no login. O botão **Novo paciente** abre um formulário que envia `POST http://localhost:8080/api/pacientes` e atualiza a tabela após o cadastro. Os ícones da coluna **Ações** permitem visualizar detalhes e editar um cadastro existente via `PUT http://localhost:8080/api/pacientes/{id}`. A tela valida CPF e impede data de nascimento futura antes de enviar. O backend repete essas validações para proteger a API. Com o perfil `local`, o backend também carrega pacientes de demonstração automaticamente no PostgreSQL.

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
