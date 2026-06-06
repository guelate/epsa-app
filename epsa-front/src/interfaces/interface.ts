export interface User {
  id: number
  email: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}