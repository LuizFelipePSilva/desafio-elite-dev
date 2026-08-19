export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirm_password: string
}

export interface RegisterResponse {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}
