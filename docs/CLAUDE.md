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

## Arquitetura Backend

DDD com camadas (domain / application / infrastructure).

Não utilizar:

- CQRS
- Event Sourcing
- Hexagonal completa (ports/adapters genéricos, múltiplos adapters por porta)
- Domain Events

Fluxo esperado:

Controller (infrastructure)
↓
Use Case (application)
↓
Repository Interface (domain)
↓
Repository Implementation TypeORM (infrastructure)
↓
Database

Cada módulo de domínio expõe:

- **domain**: entidade (TypeORM) e interface de repositório.
- **application**: um Use Case por operação de negócio (`CreateUserUseCase`, `FindUserByEmailUseCase`...) e DTOs.
- **infrastructure**: implementação do repositório (TypeORM) e o Controller.

Use Case depende só da interface de repositório (token via `@Inject`). Controller depende só dos Use Cases, nunca do repositório direto.

Estrutura por módulo:

```
src/modules/<dominio>/
  domain/
    entities/<dominio>.entity.ts
    repositories/<dominio>.repository.interface.ts
  application/
    dto/
    use-cases/
      create-<dominio>.use-case.ts
      find-<dominio>-by-x.use-case.ts
  infrastructure/
    repositories/<dominio>.repository.ts
    <dominio>.controller.ts
  <dominio>.module.ts
```

Código compartilhado entre módulos (guards, decorators): `src/shared/`.

Um Use Case = uma ação de negócio. Não criar Use Case genérico tipo `CrudUseCase`.

## Arquitetura Frontend

Feature Based.

Estrutura de referência:

```
src/
  app/
    index.tsx
    providers/
      QueryProvider.tsx
      ThemeProvider.tsx
    router/
      index.tsx
      RequireAuth.tsx
    store/
      hooks.ts
      index.ts
      uiSlice.ts
      useUiStore.ts
  assets/
  features/
    auth/
      api/
        login.ts
        token.ts
      components/
      hooks/
      index.ts
      types/
    users/
      api/
        users.service.ts
      components/
        UserForm/
          index.tsx
          styles.ts
          UserForm.test.tsx
      hooks/
        useCreateUser.ts
        useUsers.ts
        useUsers.test.tsx
      mappers/
        user.mapper.ts
        user.mapper.test.ts
      pages/
        UsersList.tsx
      types/
        index.ts
      validations/
        user.schema.ts
  main.tsx
  pages/
    Home/
      index.tsx
    Login/
      index.tsx
  shared/
    api/
      query-client.ts
    components/
      Button/
        index.tsx
        styles.ts
      Card/
        index.tsx
        styles.ts
      ErrorBoundary.tsx
      Input/
        index.tsx
        styles.ts
      Modal/
        index.tsx
        styles.ts
    constants/
    hooks/
      useSessionStorage.ts
      useSyncTheme.ts
    lib/
      AppError.ts
      httpClient.ts
    theme/
      style.d.ts
      theme.ts
    types/
      status.ts
    utils/
    validations/
  styles/
  tests/
    setupTests.ts
```

Regras:

- Página (`pages/`) monta features, não contém lógica de negócio. Cada feature também pode ter suas próprias `pages/` internas (ex: `features/users/pages/UsersList.tsx`) quando a tela pertence só àquele domínio.
- Feature é autocontida: `api/`, `components/`, `hooks/`, `mappers/`, `types/`, `validations/` próprios; exporta API pública via `index.ts` (barrel). Import entre features só via barrel, nunca arquivo interno de outra feature.
- `api/` = chamadas HTTP da feature, usando `shared/lib/httpClient.ts`.
- `mappers/` = conversão entre resposta da API e tipo de domínio do frontend, quando necessário.
- `validations/` = schema Yup da feature.
- Estado global de UI/cliente (não servidor) fica em `app/store/` — padrão slice (`xSlice.ts` + `useXStore.ts`) com Zustand.
- React Query para estado de servidor, configurado em `shared/api/query-client.ts` e provido via `app/providers/QueryProvider.tsx`.
- Testes ficam ao lado do arquivo testado (`Component.test.tsx`, `hook.test.tsx`, `mapper.test.ts`), setup global em `tests/setupTests.ts`.
- Erros de API tratados via `shared/lib/AppError.ts`, lançados pelo `httpClient.ts`.

### Identidade visual

Paleta derivada do logo (triângulos roxo-azul / verde-limão / verde-oliva sobre fundo escuro). Sem gradiente, sem `border-radius`, sem sombra suave — flat, angular.

| Token                        | Valor     |
| ---------------------------- | --------- |
| bg                           | `#0A0C10` |
| surface                      | `#14171E` |
| surfaceAlt                   | `#1B1F28` |
| border                       | `#262B35` |
| text                         | `#F2F3F5` |
| textMuted                    | `#8D93A0` |
| purple (primária secundária) | `#6E5EF5` |
| lime (ação primária)         | `#C6F135` |
| olive (acento escuro)        | `#2E3B1E` |
| danger                       | `#FF5C5C` |

Tipografia: **Space Grotesk** (display), **Inter** (corpo), **JetBrains Mono** (códigos de ticket, preços, IDs).

Elemento assinatura: recorte triangular (`clip-path`) no botão primário e em marcadores de destaque — único elemento decorativo, moderado.

## Regras

- Não criar código excessivamente complexo.
- Priorizar clareza.
- Explicar decisões arquiteturais.
- Seguir SOLID quando fizer sentido.
- Evitar abstrações desnecessárias além do Repository Abstract definido acima.

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

## Testes

Unitários obrigatórios para todo Use Case (`application/use-cases/*.use-case.ts`).

Regras:

- Um arquivo `*.use-case.spec.ts` ao lado do use case.
- Mockar a interface de repositório (`IUserRepository`, etc), nunca o TypeORM/Repository diretamente — é a vantagem de ter Repository Abstract.
- Cobrir: caminho feliz + cada exceção de negócio lançada pelo use case.
- Não testar Controller isoladamente (fina camada, baixo valor).
- E2E opcional, só para o fluxo crítico completo (registro → login → reserva → pagamento simulado → emissão de ticket), se sobrar tempo.

## Objetivo do desafio

Fluxo completo funcionando vale mais que arquitetura excessiva.
