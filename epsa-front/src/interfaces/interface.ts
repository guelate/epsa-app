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

export interface KpiCardProps {
  label: string
  value: number | string
  sublabel: string
  alert?: boolean
}

export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  position: string
}

export interface Accident {
  id: number
  employeeId: number
  accidentDate: string
  accidentTime: string
  type: 'Lieu de travail' | 'Trajet'
  location: string
  description: string
  witness: string | null
  status: 'En attente' | 'Envoyé CPAM' | 'Reconnu' | 'Contesté'
  employee: Employee
}