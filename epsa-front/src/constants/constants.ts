import type { BadgeStyle } from "@/interfaces/interface";
import type { AccidentType } from "@/types/type";

export const STATUS_STYLES: Record<string, BadgeStyle> = {
  'En attente':  { bg: '#FAEEDA', color: '#854F0B' },
  'Envoyé CPAM': { bg: '#E6F1FB', color: '#185FA5' },
  'Reconnu':     { bg: '#EAF3DE', color: '#3B6D11' },
  'Contesté':    { bg: '#F1EFE8', color: '#5F5E5A' },
}

export const TYPE_STYLES: Record<string, BadgeStyle> = {
  'Lieu de travail': { bg: '#EEEDFE', color: '#3C3489' },
  'Trajet':          { bg: '#FAECE7', color: '#993C1D' },
}

export const COLUMNS: { label: string; width: string }[] = [
  { label: 'Employé', width: '28%' },
  { label: 'Date',    width: '16%' },
  { label: 'Type',    width: '18%' },
  { label: 'Lieu',    width: '22%' },
  { label: 'Statut',  width: '16%' },
]

export const ACCIDENT_TYPES: AccidentType[] = ['Lieu de travail', 'Trajet']

export const DEFAULT_FORM = {
  employeeId: '',
  accidentDate: '',
  accidentTime: '',
  type: 'Lieu de travail' as AccidentType,
  location: '',
  description: '',
  witness: '',
}

export const TOTAL_EMPLOYEES = 5

export const EXPORT_BUTTONS = [
  { format: 'excel' as const, label: 'Export Excel', borderColor: '#3B6D11', color: '#3B6D11' },
  { format: 'pdf' as const,   label: 'Export PDF',   borderColor: '#A32D2D', color: '#A32D2D' },
]

