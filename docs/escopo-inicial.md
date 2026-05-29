# Escopo inicial - MedAgenda

## Objetivo

Criar a fundação técnica e visual do MedAgenda para evolução posterior do
produto. Nesta etapa, o foco é preparar a estrutura do backend, frontend,
documentação e identidade visual inicial, sem definir ainda o modelo de dados
JPA.

## Backend

Base criada em Jáva Spring Boot com:

- Spring Web para APIs REST.
- Spring Data JPA para persistência futura.
- Spring Security para a camada de autenticação/autorização.
- Spring Validation para validação de entradas.
- Driver PostgreSQL para banco de dados relacional.
- JJWT para suporte futuro a tokens JWT.

Estrutura de pacotes:

- `controller`: endpoints HTTP.
- `service`: regras de negócio e orquestração.
- `repository`: repositories Spring Data JPA futuros.
- `entity`: entidades JPA futuras.
- `security`: configurações de seguranca.

### Restrição desta etapa

Nenhuma entidade JPA deve ser criada até aprovação do modelo de domínio.

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

## Próximos pontos de decisão

- Aprovar entidades e relacionamentos do domínio.
- Definir estratégia de autenticação JWT e perfis de acesso.
- Definir contratos REST iniciais.
- Definir configuração de ambientes para banco PostgreSQL.
- Evoluir a landing page para fluxo de cadastro/interesse quando o produto exigir.


## Evolucao aprovada: domínio inicial

Com a aprovação para prosseguir após a fundação, o primeiro recorte de domínio
passa a cobrir:

- Pacientes, com dados cadastrais essenciais.
- Profissionais de saúde, com registro de conselho e especialidade.
- Consultas, relacionando paciente, profissional, periodo, status e observacoes.

O modelo foi mantido deliberadamente enxuto para permitir validação rápida antes
de adicionar regras mais complexas, como horários de aténdimento, unidades,
convênios, prontuário, recorrência ou notificações.

Endpoints iniciais foram criados para listagem, busca por ID e criacao desses
recursos. A autenticação JWT segue como proximo passo de seguranca antes de
expor fluxos sensíveis em ambientes reais.


## Evolucao aprovada: autenticação inicial

A camada inicial de seguranca foi evoluida com:

- Entidade `Usuário` e enum `PapelUsuário`.
- Senhas armazenadas com hash BCrypt.
- Cadastro e login em `/api/auth/register` e `/api/auth/login`.
- Emissão de JWT assinado via JJWT.
- Filtro para autenticar requisições com `Authorization: Bearer <token>`.
- Protecao dos endpoints de pacientes, profissionais e consultas.

O `JWT_SECRET` deve ser definido por ambiente antes de qualquer uso fora de
desenvolvimento local.


## Evolucao aprovada: protótipo visual navegável

A interface foi adaptada para apoiar apresentação local do projeto, priorizando
clareza visual e fluxo de navegacao sobre integração completa. A identidade usa
um tema clínico minimalista com fundo off-white, cards brancos, teal como cor
principal e bordas sutis em vez de sombras pesadas.

Telas disponíveis:

- Landing page com proposta de valor e CTAs para médico e paciente.
- Login visual do médico.
- Painel geral com cards estátisticos e agenda do dia.
- Agenda semanal com slots disponíveis e ocupados.
- Lista de pacientes com busca e acoes visuais.
- Chatbot do paciente com mensagens, chips e sugestões de horário.
- Configurações do perfil médico e mensagem inicial do chatbot.

Os dados são mockados para permitir demonstração imediata ao professor. A
integração com autenticação e APIs reais pode ser feita gradualmente após a
validação visual dos fluxos.
