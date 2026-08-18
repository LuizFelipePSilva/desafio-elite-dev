# Domain Model

## User

- id
- name
- email
- password
- role

---

## Event

- id
- title
- description
- location
- eventDate
- capacity
- eventType
- status

---

## Sector

- id
- eventId
- name
- price
- capacity

Exemplos:

- Pista
- VIP
- Camarote

---

## Seat

- id
- sectorId
- row
- column
- status

---

## Reservation

- id
- userId
- eventId
- status
- expiresAt

---

## Ticket

- id
- reservationId
- ticketCode
- qrCode
- status
- validatedAt

---

## ShareLink

- id
- ticketId
- token
- expiresAt
