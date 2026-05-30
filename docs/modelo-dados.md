# Modelo de dados inicial - MedAgenda

## 1. Objetivo

Este documento descreve as entidades iniciais do domínio do MedAgenda e seus
principais relacionamentos.

## 2. Entidades

## 2.1 Paciente

Representa uma pessoa atendida pela clínica ou profissional.

| Campo | Tipo | Obrigatório | Observação |
| --- | --- | --- | --- |
| id | Long | Sim | Identificador gerado pelo banco. |
| nome | String | Sim | Nome completo do paciente. |
| email | String | Não | Deve ter formato de e-mail quando informado. |
| telefone | String | Não | Telefone de contato. |
| cpf | String | Não | Deve ser válido e único quando informado. |
| dataNascimento | LocalDate | Não | Não pode estar no futuro. |
| criadoEm | Instant | Sim | Data de criação do registro. |
| atualizadoEm | Instant | Sim | Data da última alteração. |

## 2.2 ProfissionalSaude

Representa o profissional que realiza atendimentos.

| Campo | Tipo | Obrigatório | Observação |
| --- | --- | --- | --- |
| id | Long | Sim | Identificador gerado pelo banco. |
| nome | String | Sim | Nome do profissional. |
| email | String | Não | E-mail de contato. |
| telefone | String | Não | Telefone de contato. |
| registroConselho | String | Sim | Exemplo: CRM. Deve ser único. |
| especialidade | String | Sim | Área de atuação. |
| criadoEm | Instant | Sim | Data de criação. |
| atualizadoEm | Instant | Sim | Data da última alteração. |

## 2.3 Consulta

Representa um atendimento agendado.

| Campo | Tipo | Obrigatório | Observação |
| --- | --- | --- | --- |
| id | Long | Sim | Identificador gerado pelo banco. |
| paciente | Paciente | Sim | Paciente vinculado. |
| profissionalSaude | ProfissionalSaude | Sim | Profissional responsável. |
| inicioEm | LocalDateTime | Sim | Data e hora de início. |
| fimEm | LocalDateTime | Sim | Deve ser posterior ao início. |
| status | StatusConsulta | Sim | Estado da consulta. |
| observacoes | String | Não | Observações livres. |
| criadoEm | Instant | Sim | Data de criação. |
| atualizadoEm | Instant | Sim | Data da última alteração. |

## 2.4 Usuario

Representa um usuário autenticável do sistema.

| Campo | Tipo | Obrigatório | Observação |
| --- | --- | --- | --- |
| id | Long | Sim | Identificador gerado pelo banco. |
| nome | String | Sim | Nome do usuário. |
| email | String | Sim | Usado como login. Deve ser único. |
| senhaHash | String | Sim | Senha criptografada com BCrypt. |
| papel | PapelUsuario | Sim | Perfil de acesso. |
| ativo | boolean | Sim | Indica se o usuário pode acessar. |
| criadoEm | Instant | Sim | Data de criação. |
| atualizadoEm | Instant | Sim | Data da última alteração. |

## 3. Enums

## 3.1 StatusConsulta

Valores:

- `AGENDADA`
- `CONFIRMADA`
- `CANCELADA`
- `REALIZADA`

## 3.2 PapelUsuario

Valores:

- `ADMIN`
- `PROFISSIONAL`
- `RECEPCAO`

## 4. Relacionamentos

```text
Paciente 1 ----- N Consulta
ProfissionalSaude 1 ----- N Consulta
Usuario independente para autenticação
```

Uma consulta pertence a um paciente e a um profissional de saúde. Um paciente
pode ter várias consultas, e um profissional também pode atender várias
consultas.

## 5. Regras de integridade

- CPF de paciente deve ser único quando informado.
- CPF deve ser válido quando informado.
- Data de nascimento não pode ser futura.
- Registro de conselho do profissional deve ser único.
- E-mail de usuário deve ser único.
- Senha de usuário não deve ser armazenada em texto puro.
- Consulta deve possuir paciente e profissional.
- Horário final da consulta deve ser posterior ao horário inicial.

## 6. Observação sobre evolução

O modelo atual é intencionalmente enxuto. Em versões futuras, podem ser
adicionadas entidades como:

- unidade clínica;
- convênio;
- disponibilidade do profissional;
- prontuário;
- notificações;
- mensagens do chatbot;
- histórico de alteração de consultas.
