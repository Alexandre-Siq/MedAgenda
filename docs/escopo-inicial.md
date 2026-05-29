# Escopo inicial - MedAgenda

## Objetivo

Criar a fundacao tecnica e visual do MedAgenda para evolucao posterior do
produto. Nesta etapa, o foco e preparar a estrutura do backend, frontend,
documentacao e identidade visual inicial, sem definir ainda o modelo de dados
JPA.

## Backend

Base criada em Java Spring Boot com:

- Spring Web para APIs REST.
- Spring Data JPA para persistencia futura.
- Spring Security para a camada de autenticacao/autorizacao.
- Spring Validation para validacao de entradas.
- Driver PostgreSQL para banco de dados relacional.
- JJWT para suporte futuro a tokens JWT.

Estrutura de pacotes:

- `controller`: endpoints HTTP.
- `service`: regras de negocio e orquestracao.
- `repository`: repositories Spring Data JPA futuros.
- `entity`: entidades JPA futuras.
- `security`: configuracoes de seguranca.

### Restricao desta etapa

Nenhuma entidade JPA deve ser criada ate aprovacao do modelo de dominio.

## Frontend

Base criada com React e Vite para uma landing page minimalista.

Identidade visual inicial:

- Fundo principal: branco.
- Cor primaria: teal `#009E96`.
- Texto principal: `#111111`.
- Texto secundario: `#555555`.

Componentes iniciais:

- `Header`: marca e navegacao basica.
- `HeroSection`: proposta de valor e painel visual de agenda.
- `FeatureCard`: cards reutilizaveis para beneficios do produto.

## Proximos pontos de decisao

- Aprovar entidades e relacionamentos do dominio.
- Definir estrategia de autenticacao JWT e perfis de acesso.
- Definir contratos REST iniciais.
- Definir configuracao de ambientes para banco PostgreSQL.
- Evoluir a landing page para fluxo de cadastro/interesse quando o produto exigir.
