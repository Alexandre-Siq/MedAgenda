# Casos de uso - MedAgenda

## 1. Objetivo

Este documento descreve os principais casos de uso do MedAgenda, indicando como
os atores interagem com o sistema.

## UC01 - Realizar login

| Campo | Descrição |
| --- | --- |
| Ator principal | Médico |
| Objetivo | Acessar o painel interno do sistema. |
| Pré-condição | Usuário deve existir no banco de dados. |
| Pós-condição | Usuário autenticado recebe um token JWT. |

### Fluxo principal

1. O médico acessa a tela de login.
2. O médico informa e-mail e senha.
3. O frontend envia os dados para `POST /api/auth/login`.
4. O backend valida as credenciais.
5. O backend retorna um token JWT.
6. O frontend salva o token no navegador.
7. O médico é redirecionado para o painel.

### Fluxo alternativo

- Se as credenciais forem inválidas, o sistema exibe mensagem de erro.
- Se o backend estiver desligado, o sistema informa falha de conexão/operação.

## UC02 - Listar pacientes

| Campo | Descrição |
| --- | --- |
| Ator principal | Médico |
| Objetivo | Visualizar pacientes cadastrados. |
| Pré-condição | Médico deve estar autenticado. |
| Pós-condição | Lista de pacientes é exibida. |

### Fluxo principal

1. O médico acessa a tela de pacientes.
2. O frontend envia requisição `GET /api/pacientes` com token JWT.
3. O backend valida o token.
4. O backend retorna os pacientes cadastrados.
5. O frontend exibe os pacientes em tabela.

## UC03 - Cadastrar paciente

| Campo | Descrição |
| --- | --- |
| Ator principal | Médico |
| Objetivo | Inserir um novo paciente no sistema. |
| Pré-condição | Médico deve estar autenticado. |
| Pós-condição | Paciente é salvo no banco de dados. |

### Fluxo principal

1. O médico clica em Novo paciente.
2. O sistema abre o formulário de cadastro.
3. O médico informa os dados do paciente.
4. O frontend valida nome, CPF e data de nascimento.
5. O frontend envia `POST /api/pacientes`.
6. O backend valida as regras de negócio.
7. O backend salva o paciente.
8. O frontend atualiza a tabela.

### Fluxos alternativos

- CPF inválido: o sistema informa que o CPF é inválido.
- CPF duplicado: o backend recusa a operação.
- Data futura: o sistema impede o cadastro.

## UC04 - Visualizar paciente

| Campo | Descrição |
| --- | --- |
| Ator principal | Médico |
| Objetivo | Consultar os dados completos de um paciente. |
| Pré-condição | Médico deve estar autenticado e paciente deve existir. |
| Pós-condição | Dados do paciente são exibidos. |

### Fluxo principal

1. O médico acessa a lista de pacientes.
2. O médico clica no ícone de visualização.
3. O sistema abre um modal com os dados do paciente em modo leitura.

## UC05 - Editar paciente

| Campo | Descrição |
| --- | --- |
| Ator principal | Médico |
| Objetivo | Atualizar dados cadastrais do paciente. |
| Pré-condição | Médico deve estar autenticado e paciente deve existir. |
| Pós-condição | Dados do paciente são atualizados no banco. |

### Fluxo principal

1. O médico acessa a lista de pacientes.
2. O médico clica no ícone de edição.
3. O sistema abre o formulário preenchido.
4. O médico altera os dados necessários.
5. O frontend valida os campos.
6. O frontend envia `PUT /api/pacientes/{id}`.
7. O backend valida e salva as alterações.
8. O frontend atualiza a tabela.

## UC06 - Consultar painel do médico

| Campo | Descrição |
| --- | --- |
| Ator principal | Médico |
| Objetivo | Visualizar resumo da agenda e indicadores. |
| Situação atual | Protótipo visual com dados mockados. |

## UC07 - Consultar agenda semanal

| Campo | Descrição |
| --- | --- |
| Ator principal | Médico |
| Objetivo | Visualizar horários disponíveis e ocupados. |
| Situação atual | Protótipo visual com dados mockados. |

## UC08 - Interagir com chatbot

| Campo | Descrição |
| --- | --- |
| Ator principal | Paciente |
| Objetivo | Simular uma marcação de consulta por conversa. |
| Situação atual | Protótipo visual com mensagens mockadas. |

## 2. Casos de uso planejados

- Criar consulta pela agenda.
- Editar consulta existente.
- Cancelar consulta.
- Integrar chatbot com criação real de consulta.
- Vincular consulta ao paciente e profissional autenticado.
