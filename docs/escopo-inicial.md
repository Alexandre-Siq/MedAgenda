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


## Evolucao aprovada: dominio inicial

Com a aprovacao para prosseguir apos a fundacao, o primeiro recorte de dominio
passa a cobrir:

- Pacientes, com dados cadastrais essenciais.
- Profissionais de saude, com registro de conselho e especialidade.
- Consultas, relacionando paciente, profissional, periodo, status e observacoes.

O modelo foi mantido deliberadamente enxuto para permitir validacao rapida antes
de adicionar regras mais complexas, como horarios de atendimento, unidades,
convenios, prontuario, recorrencia ou notificacoes.

Endpoints iniciais foram criados para listagem, busca por ID e criacao desses
recursos. A autenticacao JWT segue como proximo passo de seguranca antes de
expor fluxos sensiveis em ambientes reais.


## Evolucao aprovada: autenticacao inicial

A camada inicial de seguranca foi evoluida com:

- Entidade `Usuario` e enum `PapelUsuario`.
- Senhas armazenadas com hash BCrypt.
- Cadastro e login em `/api/auth/register` e `/api/auth/login`.
- Emissao de JWT assinado via JJWT.
- Filtro para autenticar requisicoes com `Authorization: Bearer <token>`.
- Protecao dos endpoints de pacientes, profissionais e consultas.

O `JWT_SECRET` deve ser definido por ambiente antes de qualquer uso fora de
desenvolvimento local.


## Evolucao aprovada: prototipo visual navegavel

A interface foi adaptada para apoiar apresentacao local do projeto, priorizando
clareza visual e fluxo de navegacao sobre integracao completa. A identidade usa
um tema clinico minimalista com fundo off-white, cards brancos, teal como cor
principal e bordas sutis em vez de sombras pesadas.

Telas disponiveis:

- Landing page com proposta de valor e CTAs para medico e paciente.
- Login visual do medico.
- Painel geral com cards estatisticos e agenda do dia.
- Agenda semanal com slots disponiveis e ocupados.
- Lista de pacientes com busca e acoes visuais.
- Chatbot do paciente com mensagens, chips e sugestoes de horario.
- Configuracoes do perfil medico e mensagem inicial do chatbot.

Os dados sao mockados para permitir demonstracao imediata ao professor. A
integracao com autenticao e APIs reais pode ser feita gradualmente apos a
validacao visual dos fluxos.
