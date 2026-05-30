# Visão e motivação do projeto - MedAgenda

## 1. Contextualização

Clínicas, consultórios e profissionais de saúde lidam diariamente com uma rotina
intensa de marcação, remarcação e acompanhamento de consultas. Em muitos casos,
essas atividades ainda dependem de processos manuais, mensagens em aplicativos,
planilhas ou anotações descentralizadas. Esse cenário pode gerar atrasos,
conflitos de agenda, falhas de comunicação e dificuldade para acompanhar o
histórico básico dos pacientes.

O MedAgenda surge como uma proposta de sistema web para apoiar a organização da
agenda médica e a comunicação inicial entre paciente e clínica. A proposta não é
substituir sistemas hospitalares complexos, mas criar uma solução acadêmica
enxuta, evolutiva e demonstrável, com foco em agendamento, pacientes e fluxo de
atendimento.

## 2. Problema identificado

O problema central é a dificuldade de organizar consultas médicas de forma clara,
rastreável e acessível, especialmente em ambientes pequenos ou médios que ainda
não utilizam uma ferramenta integrada.

Problemas observados:

- agendamentos feitos de forma manual ou dispersa;
- dificuldade para visualizar horários disponíveis;
- risco de conflito de horários;
- falta de centralização dos dados básicos dos pacientes;
- necessidade de responder perguntas simples e repetitivas de pacientes;
- baixa rastreabilidade entre cadastro, agendamento e atendimento.

## 3. Justificativa

A escolha desse tema se justifica por unir uma necessidade prática da área da
saúde com conceitos relevantes para um projeto acadêmico de desenvolvimento de
sistemas, como:

- construção de frontend web responsivo;
- desenvolvimento de API REST;
- autenticação com JWT;
- persistência com banco relacional;
- modelagem de entidades;
- validação de regras de negócio;
- documentação de requisitos e arquitetura;
- evolução incremental de funcionalidades.

Além disso, o domínio de agendamento médico é compreensível para avaliação
acadêmica, pois permite demonstrar fluxos reais de usuário, como login, cadastro
de paciente, edição de informações e futura marcação de consultas.

## 4. Objetivo geral

Desenvolver uma aplicação web chamada MedAgenda para apoiar a gestão de agenda
médica, cadastro de pacientes e evolução futura de marcação de consultas via
interface web e chatbot.

## 5. Objetivos específicos

- Criar uma interface visual clara e profissional para demonstração do produto.
- Implementar autenticação de usuário médico com backend real.
- Permitir listagem, cadastro, visualização e edição de pacientes.
- Validar dados importantes, como CPF e data de nascimento.
- Estruturar backend em camadas: controller, service, repository, entity e
  security.
- Utilizar PostgreSQL como banco de dados local para demonstração.
- Documentar requisitos, casos de uso, arquitetura e próximos passos.
- Preparar o projeto para evolução gradual de agenda, consultas e chatbot.

## 6. Público-alvo

O público-alvo inicial é composto por:

- médicos autônomos;
- pequenos consultórios;
- clínicas de pequeno e médio porte;
- recepcionistas ou responsáveis por marcação de consultas;
- pacientes que desejam solicitar horários de atendimento.

## 7. Escopo atual

Nesta etapa, o projeto possui:

- frontend React/Vite com telas navegáveis;
- backend Spring Boot com autenticação JWT;
- banco PostgreSQL via Docker Compose;
- login real integrado ao backend;
- listagem, cadastro, visualização e edição real de pacientes;
- validação de CPF e data de nascimento;
- telas de agenda, dashboard, chatbot e configurações ainda parcialmente
  demonstrativas.

## 8. Fora do escopo atual

Ainda não fazem parte da entrega atual:

- prontuário médico completo;
- integração com convênios;
- envio real de mensagens por WhatsApp, SMS ou e-mail;
- chatbot com inteligência artificial real;
- controle financeiro;
- múltiplas unidades clínicas;
- confirmação automática de consulta por canal externo;
- deploy em produção.

## 9. Motivação acadêmica

O MedAgenda foi escolhido por permitir demonstrar uma evolução técnica completa,
partindo de uma interface navegável até integrações reais com backend e banco de
dados. O projeto permite aplicar conhecimentos de programação, banco de dados,
engenharia de software, segurança e documentação, mantendo um escopo viável para
uma apresentação acadêmica.
