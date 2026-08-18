# Architectural Decision Records

## ADR-001 - Monorepo

Decisão:

Utilizar monorepo.

Estrutura:

apps/frontend
apps/backend

Motivação:

- Centralização
- Simplicidade de setup
- Facilidade para avaliação

---

## ADR-002 - Frontend Feature Based

Decisão:

Organização por domínio.

Motivação:

- Escalabilidade
- Baixo acoplamento

---

## ADR-003 - DDD Leve

Decisão:

Utilizar módulos do Nest organizados por domínio.

Motivação:

- Melhor separação de responsabilidades
- Maior clareza para o avaliador

---

## ADR-004 - Redis Separado

Decisão:

Dois containers Redis.

redis-cache
redis-lock

Motivação:

- Demonstrar arquitetura
- Separação de responsabilidades

---

## ADR-005 - Eventos com Assentos e Quantidade

Decisão:

Suportar:

- GENERAL_ADMISSION
- ASSIGNED_SEATS

Motivação:

Atender ambos os cenários exigidos pelo desafio.
