# Roadmap de evolução - MedAgenda

## 1. Objetivo

Este documento organiza os próximos passos do MedAgenda em etapas incrementais,
permitindo demonstrar evolução contínua do projeto.

## 2. Etapa atual

Funcionalidades já implementadas:

- frontend navegável;
- autenticação real com JWT;
- proteção de rotas internas;
- listagem real de pacientes;
- cadastro real de pacientes;
- visualização de pacientes;
- edição real de pacientes;
- validação de CPF;
- bloqueio de CPF duplicado;
- bloqueio de data de nascimento futura;
- PostgreSQL local com Docker Compose;
- Maven Wrapper;
- seed de dados para demonstração.

## 3. Próxima etapa recomendada

### Integração da agenda com o backend

Objetivo:

- listar consultas reais em `/agenda`;
- criar consulta pela interface;
- relacionar consulta com paciente e profissional;
- impedir conflito de horário para o mesmo profissional.

Endpoints envolvidos:

```text
GET  /api/consultas
POST /api/consultas
```

Possíveis melhorias no backend:

- filtro por data;
- filtro por profissional;
- validação de conflito de horários;
- alteração de status de consulta.

## 4. Etapas futuras

## 4.1 Profissionais de saúde

- Tela de listagem de profissionais.
- Cadastro de profissional.
- Edição de profissional.
- Validação de registro de conselho único.

## 4.2 Dashboard real

- Total de consultas do dia vindo do backend.
- Total de pacientes cadastrados.
- Consultas pendentes/confirmadas.
- Próximas consultas.

## 4.3 Chatbot integrado

- Fluxo guiado para selecionar especialidade.
- Escolha de paciente ou identificação inicial.
- Sugestão de horários disponíveis.
- Criação real de consulta no backend.

## 4.4 Segurança e permissões

- Diferenciar permissões entre `ADMIN`, `PROFISSIONAL` e `RECEPCAO`.
- Bloquear ações específicas por papel.
- Renovação ou expiração controlada de token.

## 4.5 Qualidade

- Testes unitários nos services.
- Testes de controller.
- Testes de fluxo do frontend.
- Configuração de pipeline de CI.

## 4.6 Deploy

- Configuração de ambiente de produção.
- Banco PostgreSQL gerenciado.
- Variáveis de ambiente seguras.
- Hospedagem do frontend.
- Hospedagem do backend.

## 5. Critérios para apresentação acadêmica

Para uma apresentação parcial, recomenda-se demonstrar:

1. Login real.
2. Proteção de rotas.
3. Listagem de pacientes do banco.
4. Cadastro de paciente.
5. Edição de paciente.
6. Validações de CPF e data de nascimento.
7. Protótipo visual da agenda e chatbot.
8. Explicação do roadmap de evolução.

## 6. Riscos e mitigação

| Risco | Mitigação |
| --- | --- |
| Ambiente da faculdade sem Docker | Levar prints ou rodar apenas frontend no notebook. |
| Backend não iniciar por falta de Java | Validar ambiente antes da apresentação. |
| Banco local vazio | Usar perfil `local`, que carrega dados de demonstração. |
| Falha de internet para baixar dependências | Rodar tudo uma vez antes da apresentação. |
| Escopo crescer demais | Evoluir por etapas e documentar o que é protótipo. |
