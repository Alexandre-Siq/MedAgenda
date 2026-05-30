# Decisões técnicas - MedAgenda

## 1. Objetivo

Registrar decisões tomadas durante o desenvolvimento do MedAgenda e suas
justificativas. Esse documento ajuda a comprovar que o projeto possui critérios
técnicos e não foi construído de forma aleatória.

## 2. Frontend com React e Vite

React foi escolhido por permitir criação de interfaces componentizadas e por ser
amplamente usado no mercado. Vite foi escolhido por oferecer um ambiente de
desenvolvimento simples, rápido e adequado para projetos acadêmicos.

## 3. CSS puro em vez de framework visual pesado

A interface usa CSS puro para manter o projeto mais compreensível e evitar
dependência excessiva de bibliotecas visuais. Isso facilita explicar o design e
ajustar a identidade visual.

## 4. Backend com Spring Boot

Spring Boot foi escolhido por simplificar a criação de APIs REST em Java,
oferecendo integração com validação, segurança, banco de dados e configuração por
perfis.

## 5. Banco PostgreSQL

PostgreSQL foi escolhido por ser um banco relacional robusto, gratuito e muito
usado em aplicações reais. O domínio do projeto possui entidades relacionais,
como pacientes, profissionais e consultas, o que torna um banco relacional uma
boa escolha.

## 6. Docker Compose para banco local

Docker Compose foi adicionado para padronizar o ambiente local do PostgreSQL.
Assim, o banco pode ser iniciado com um comando e manter o mesmo usuário, senha e
nome de banco em diferentes máquinas.

## 7. Maven Wrapper

Maven Wrapper foi adicionado para evitar que o usuário precise instalar Maven
manualmente. No Windows, o backend pode ser executado com `mvnw.cmd`, desde que o
Java esteja instalado.

## 8. JWT para autenticação

JWT foi escolhido por permitir autenticação stateless. O backend gera um token no
login e o frontend envia esse token nas requisições protegidas.

## 9. Validações no frontend e backend

Algumas regras, como CPF válido e data de nascimento não futura, foram
implementadas tanto no frontend quanto no backend.

Motivo:

- no frontend, a validação melhora a experiência do usuário;
- no backend, a validação garante a integridade dos dados mesmo se a API for
  chamada por outro cliente.

## 10. Protótipo visual com dados mockados

Algumas telas ainda usam dados mockados porque o objetivo inicial é demonstrar o
fluxo completo do produto antes de integrar todos os módulos. Isso permite
validar a experiência visual sem bloquear a evolução por dependências de backend.

## 11. Integração gradual

O projeto está sendo integrado por partes:

1. Login real.
2. Pacientes reais.
3. Agenda real.
4. Chatbot integrado.

Essa abordagem reduz risco e facilita apresentar evolução contínua.
