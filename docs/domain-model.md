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
- availableQuantity

Exemplos:

- Pista
- VIP
- Camarote

---

## Payment

- id
- reservationId
- status
- amount
- method
- createdAt

## Reservation

- id
- userId
- eventId
- sectorId
- quantity
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
- validateByUserId

---

## ShareLink

- id
- ticketId
- token
- expiresAt
