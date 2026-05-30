# Requisitos do sistema - MedAgenda

## 1. Objetivo do documento

Este documento descreve os requisitos funcionais e não funcionais do MedAgenda.
Ele serve como base para justificar o desenvolvimento, orientar a implementação e
facilitar a avaliação acadêmica do projeto.

## 2. Atores do sistema

| Ator | Descrição |
| --- | --- |
| Médico | Usuário principal que acessa o painel, consulta pacientes e gerencia agenda. |
| Recepção | Usuário futuro responsável por apoiar cadastros e marcações. |
| Paciente | Usuário externo que poderá interagir com o chatbot e solicitar consultas. |
| Sistema | Backend responsável por autenticação, validações e persistência de dados. |

## 3. Requisitos funcionais

| Código | Requisito | Situação |
| --- | --- | --- |
| RF01 | O sistema deve permitir login de usuário médico com e-mail e senha. | Implementado |
| RF02 | O sistema deve gerar token JWT após autenticação válida. | Implementado |
| RF03 | O sistema deve proteger as telas internas do médico contra acesso sem login. | Implementado |
| RF04 | O sistema deve permitir logout do usuário autenticado. | Implementado |
| RF05 | O sistema deve listar pacientes cadastrados no banco de dados. | Implementado |
| RF06 | O sistema deve permitir cadastrar novo paciente. | Implementado |
| RF07 | O sistema deve permitir visualizar detalhes de paciente existente. | Implementado |
| RF08 | O sistema deve permitir editar dados de paciente existente. | Implementado |
| RF09 | O sistema deve validar CPF informado no cadastro ou edição de paciente. | Implementado |
| RF10 | O sistema deve impedir cadastro ou edição com CPF duplicado. | Implementado |
| RF11 | O sistema deve impedir data de nascimento futura para paciente. | Implementado |
| RF12 | O sistema deve exibir mensagens de erro quando a API recusar uma operação. | Implementado |
| RF13 | O sistema deve possuir uma tela de painel geral do médico. | Parcial / mockado |
| RF14 | O sistema deve possuir uma tela de agenda semanal. | Parcial / mockado |
| RF15 | O sistema deve possuir uma interface de chatbot para paciente. | Parcial / mockado |
| RF16 | O sistema deve permitir cadastrar profissionais de saúde via API. | Implementado no backend |
| RF17 | O sistema deve permitir cadastrar consultas via API. | Implementado no backend |
| RF18 | O sistema deve futuramente exibir consultas reais na agenda semanal. | Planejado |
| RF19 | O sistema deve futuramente permitir criação de consulta pela agenda. | Planejado |
| RF20 | O sistema deve futuramente permitir que o chatbot crie solicitações de consulta. | Planejado |

## 4. Requisitos não funcionais

| Código | Requisito | Justificativa | Situação |
| --- | --- | --- | --- |
| RNF01 | A aplicação deve ser web e acessível por navegador. | Facilita uso em diferentes computadores. | Implementado |
| RNF02 | O frontend deve ter interface limpa, profissional e responsiva. | Melhora apresentação e usabilidade. | Implementado |
| RNF03 | O backend deve seguir arquitetura em camadas. | Facilita manutenção e evolução. | Implementado |
| RNF04 | A API deve utilizar autenticação JWT. | Protege endpoints internos. | Implementado |
| RNF05 | Senhas devem ser armazenadas com hash BCrypt. | Evita armazenamento de senha em texto puro. | Implementado |
| RNF06 | O sistema deve utilizar banco relacional. | Adequado para entidades e relacionamentos. | Implementado |
| RNF07 | O ambiente local deve ser reproduzível. | Facilita demonstração e avaliação. | Implementado com Docker Compose e Maven Wrapper |
| RNF08 | As regras de validação devem existir no backend. | Garante integridade mesmo fora do frontend. | Implementado |
| RNF09 | O frontend deve tratar erros de API de forma compreensível. | Melhora experiência do usuário. | Implementado parcialmente |
| RNF10 | O projeto deve ser documentado. | Necessário para avaliação acadêmica e manutenção. | Implementado |
| RNF11 | O código deve permitir evolução gradual. | O projeto ainda está em desenvolvimento. | Implementado |
| RNF12 | O sistema deve evitar dependências excessivamente complexas no frontend. | Mantém o projeto compreensível. | Implementado |

## 5. Regras de negócio iniciais

| Código | Regra |
| --- | --- |
| RN01 | Um paciente deve possuir nome obrigatório. |
| RN02 | CPF é opcional, mas, se informado, deve ser válido. |
| RN03 | Não pode haver dois pacientes com o mesmo CPF. |
| RN04 | A data de nascimento do paciente não pode estar no futuro. |
| RN05 | Para acessar telas internas, o usuário deve estar autenticado. |
| RN06 | O token JWT deve ser enviado nas requisições protegidas. |
| RN07 | O usuário de demonstração deve ser criado automaticamente no perfil local. |

## 6. Prioridade de requisitos

| Prioridade | Requisitos |
| --- | --- |
| Alta | RF01 a RF12, RNF03, RNF04, RNF05, RNF08 |
| Média | RF13 a RF17, RNF01, RNF02, RNF06, RNF07 |
| Baixa | RF18 a RF20 e futuras integrações externas |

## 7. Observações

O projeto foi planejado para evoluir de forma incremental. Por isso, algumas
telas existem como protótipo visual enquanto os fluxos mais importantes são
integrados gradualmente ao backend.
