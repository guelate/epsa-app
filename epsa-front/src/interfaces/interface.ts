import type { AccidentType } from "@/types/type"

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

export interface AccidentsTableProps {
  accidents: Accident[]
}

export interface BadgeStyle {
  bg: string
  color: string
}

export interface BadgeProps {
  label: string
  styles: BadgeStyle
}

export interface InitialsProps {
  name: string
}

export interface EmployeeSelectProps {
  employees: Employee[]
  value: string
  onChange: (value: string) => void
}


export interface DateTimeFieldsProps {
  date: string
  time: string
  onDateChange: (value: string) => void
  onTimeChange: (value: string) => void
}


export interface TypeLocationFieldsProps {
  type: AccidentType
  location: string
  onTypeChange: (value: AccidentType) => void
  onLocationChange: (value: string) => void
}

export interface DeclareModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (accident: Accident) => void
}

export interface DashboardHeaderProps {
  onDeclare: () => void
}