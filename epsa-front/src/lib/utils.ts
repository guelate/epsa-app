import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

// Merges Tailwind classes without conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}