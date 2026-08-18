# Verzel Ticket

Leia este documento antes de sugerir qualquer implementação.

## Objetivo

Plataforma de eventos e ingressos para o desafio Elite Dev Verzel.

Papéis:

- Organizer
- Customer
- Gatekeeper

Fluxos principais:

- Criação de eventos
- Reserva de ingressos
- Pagamento simulado
- Geração de QR Code
- Compartilhamento de ingressos
- Validação na portaria

## Stack

### Frontend

- React
- Vite
- TypeScript
- React Query
- Zustand
- Styled Components
- React Hook Form
- Yup

### Backend

- NestJS
- TypeORM
- PostgreSQL
- Redis
- JWT

## Arquitetura

DDD Leve.

Não utilizar:

- CQRS
- Event Sourcing
- Hexagonal completa
- Domain Events

Fluxo esperado:

Controller
↓
Application Service
↓
Repository
↓
Database

## Regras

- Não criar código excessivamente complexo.
- Priorizar clareza.
- Explicar decisões arquiteturais.
- Seguir SOLID quando fizer sentido.
- Evitar abstrações desnecessárias.

## Domínio

EventType:

- GENERAL_ADMISSION
- ASSIGNED_SEATS

UserRole:

- ORGANIZER
- CUSTOMER
- GATEKEEPER

## Redis

redis-cache:

- Cache de catálogo
- Cache de eventos

redis-lock:

- Reservas temporárias
- Locks de concorrência

## Objetivo do desafio

Fluxo completo funcionando vale mais que arquitetura excessiva.
