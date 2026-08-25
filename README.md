# Desafio Técnico Elite Dev - Verzel

**Powered:** Luiz Felipe

## Stack Escolhida

- **Backend:** NestJS
- **Frontend:** React (Vite)
- **Banco de Dados Relacional:** PostgreSQL
- **Banco de Dados não relacional:** Redis

### Por que escolhi cada um

**NestJS** — Velocidade, escalabilidade e manutenção, porém é um canhão para uma mosca, poderia ter feito o uso do Express que é mais simples, porém a escolha de uma ferramenta moderna me levou a decidir usar o NestJS.

**Frontend com Vite** — Leve, rápido, escala e entrega o melhor do React, ainda que será uma SPA simples, não um SEO completo que leve a usar o Next.js.

**Banco de Dados: PostgreSQL** — Gratuito, forte, otimizado e com documentação boa.

**Redis** — Utilizado para garantir fila para o sistema e cache para acesso a informações.

---

Bem, com tudo isso, começar modelando pelo banco de dados é o ideal.

## Como Executar

1. Popular o `.env` com base no `.env.example`.
2. `docker-compose up -d`
3. Entrar em `apps/backend` e `apps/frontend`, rodar `npm i` em cada um.
4. Backend: `npm start`
5. Frontend: `npm run dev`

## Seeds

Ao subir a aplicação, o `SeedService` popula automaticamente o banco (idempotente — verifica existência antes de criar).

### Usuários

| Nome               | Email                     | Senha           | Role       |
| ------------------ | ------------------------- | --------------- | ---------- |
| Organizador Padrão | <organizador@example.com> | Organizador@123 | ORGANIZER  |
| Cliente Um         | <cliente1@example.com>    | Cliente1@123    | CUSTOMER   |
| Cliente Dois       | <cliente2@example.com>    | Cliente2@123    | CUSTOMER   |
| Vendedor Um        | <vendedor@example.com>    | Vendedor@123    | GATEKEEPER |

### Eventos

| Título                                | External ID      | Local                        | Status |
| ------------------------------------- | ---------------- | ---------------------------- | ------ |
| aespa LIVE TOUR - SYNK : COMPLæXITY - | ZFIMVHtnMZ17FA-s | Mercado Livre Arena Pacaembu | OPEN   |
| Rock in Rio 2026                      | ZFIMVHtnMZ17A6x7 | Cidade do Rock               | OPEN   |

> A seed roda automaticamente no `onModuleInit`. Não é necessário comando manual.

## Uso de IA

O uso da IA foi basicamente assim:

Primeiro eu pensei em toda a estrutura, como seria, se seria assentos, li e reli várias vezes os requisitos não funcionais e funcionais. Após isso, defini estruturas que eu poderia usar, como a feature based no front e usar React e Vite para isso. E usar o NestJS para o backend eu até iria de Express, porque queria fazer um DDD leve e o NestJS não suporta nativamente, mas fui de NestJS mesmo assim.

Após definir as entidades, como seria o projeto, como seria a estrutura e tudo mais, se iria usar alguns frameworks, estruturei uma sequência de "sprints". Aí comecei a fazer, e algo como CRUD, generates e coisas mais simples eu delegava para IA de primeira mão e revisava se estava correto, mas se a lógica estava certa, como definição de aceitação de status e tudo mais.

Funções mais complexas eu estruturava o pensamento e fazia um escopo, nunca deixava a IA pensar por mim ou fazer as funções, eu sempre fazia e pensava no que eu queria.

Não utilizei spec ou métodos por não ter Claude Code ou Codex. Utilizei IA web. No projeto tem `/docs`, onde tem o `CLAUDE.md`, que era basicamente o código de agente que eu determinava que ele seguisse e estruturasse aquilo — nunca deixava decidir arquitetura, inventar nada e arquivos, sempre mandava ele fazer do jeito que eu propus.

Fiz isso por dois motivos:

1. Reduzir uso de tokens por mensagem e reduzir contexto de pensamento.
2. Centrar os pesos dela e gerar respostas mais corretas para o meu uso, restringir como ela vai gerar o código.

## Decisões

Alguns pontos a serem considerados em algumas escolhas foram:

- Não optei pelo assento numerado, pois iria levar a muito débito técnico, que possivelmente não seria entregue. Então optei por entregar o sistema completo e simples, mas funcionando.
- Cores foram baseadas na logo da Verzel.
- Link de compartilhamento é apenas para acesso, não transferência de usuários, pois entendi que a decisão era dessa forma.
- Leitura de QR Code admito que não sabia 100%, pedi ajuda para a IA.
- Criação de reserva: o cliente nunca mexe com Ticket diretamente. Isso reduz a carga cognitiva do cliente, perpetua segurança e garante integridade, pois aqueles dados só podem ser acessados via reservation.
- Criação de um módulo de Ticketmaster, para não ter dependência externa dentro do frontend, o backend assegura isso.
- E ademais foram pontos que fui conectando pela similaridade de desenvolver sistemas.
