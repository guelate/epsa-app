import type { AuthContextType, User } from '@/interfaces/interface'
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

const AuthContext = createContext<AuthContextType | null>(null)


//Authentification provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  //User login  
  function login(user: User, token: string) {
    setUser(user)
    setToken(token) //Store token in state 
    localStorage.setItem('token', token)
  }

 //User logout
  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

//Use context 
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}