# Escopo inicial - MedAgenda

## Objetivo

Criar a fundação técnica e visual do MedAgenda para demonstrar a evolução do
produto. O projeto parte de uma base navegável, com backend estruturado,
frontend apresentável e documentação suficiente para execução local.

## Backend

Base criada em Java Spring Boot com:

- Spring Web para APIs REST.
- Spring Data JPA para persistência.
- Spring Security para autenticação e autorização.
- Spring Validation para validação de entradas.
- PostgreSQL como banco relacional.
- JJWT para emissão e validação de tokens JWT.

Estrutura principal de pacotes:

- `controller`: endpoints HTTP.
- `service`: regras de negócio e orquestração.
- `repository`: repositories Spring Data JPA.
- `entity`: entidades JPA.
- `security`: configuração de segurança e JWT.
- `config`: configurações auxiliares, incluindo dados de demonstração.

## Domínio inicial

O primeiro recorte de domínio cobre:

- Pacientes, com dados cadastrais essenciais.
- Profissionais de saúde, com registro de conselho e especialidade.
- Consultas, relacionando paciente, profissional, período, status e observações.
- Usuários do sistema, com papéis e senha criptografada.

Entidades principais:

- `Paciente`
- `ProfissionalSaude`
- `Consulta`
- `StatusConsulta`
- `Usuario`
- `PapelUsuario`

O modelo foi mantido deliberadamente enxuto para permitir validação rápida antes
de adicionar regras mais complexas, como horários recorrentes, unidades,
convênios, prontuário e notificações.

## Autenticação inicial

A camada inicial de segurança inclui:

- Cadastro e login em `/api/auth/register` e `/api/auth/login`.
- Senhas armazenadas com BCrypt.
- Emissão de JWT assinado via JJWT.
- Filtro para autenticar requisições com `Authorization: Bearer <token>`.
- Proteção dos endpoints de pacientes, profissionais e consultas.

O `JWT_SECRET` deve ser definido por ambiente antes de qualquer uso fora de
desenvolvimento local.

## Frontend

A interface foi adaptada para apoiar apresentação local do projeto, priorizando
clareza visual e fluxo de navegação sobre integração completa. A identidade usa
um tema clínico minimalista com fundo off-white, cards brancos, teal como cor
principal e bordas sutis em vez de sombras pesadas.

Telas disponíveis:

- Página inicial com proposta de valor e CTAs para médico e paciente.
- Entrada visual do médico.
- Painel geral com cards estatísticos e agenda do dia.
- Agenda semanal com slots disponíveis e ocupados.
- Lista de pacientes com busca e ações visuais.
- Chatbot do paciente com mensagens, chips e sugestões de horário.
- Configurações do perfil médico e mensagem inicial do chatbot.

Os dados do frontend são mockados para permitir demonstração imediata ao
professor. A integração com autenticação e APIs reais pode ser feita
gradualmente após a validação visual dos fluxos.

## Execução local

A execução local foi preparada com:

- `docker-compose.yml` para subir PostgreSQL.
- Perfil Spring `local` para conectar no banco e carregar dados de demonstração.
- `backend/.env.example` como referência de variáveis.
- Guia dedicado em `docs/execucao-local.md`.

Credenciais de demonstração do perfil local:

```text
E-mail: dr.ricardo@medagenda.local
Senha: medagenda123
```

## Próximos pontos de evolução

- Integrar as telas do frontend aos endpoints reais do backend.
- Adicionar atualização e exclusão para pacientes, profissionais e consultas.
- Validar conflito de horários de consulta.
- Evoluir o chatbot para criar consultas reais.
- Criar migrations com Flyway ou Liquibase.
- Adicionar testes automatizados para serviços e controllers.
