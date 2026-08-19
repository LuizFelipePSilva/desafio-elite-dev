export type UserRole = 'ORGANIZER' | 'CUSTOMER' | 'GATEKEEPER'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface CreateUserInput {
  name: string
  email: string
  password: string
  confirm_password: string
}
