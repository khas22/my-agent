import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSeverityColor(severity: 'info' | 'warning' | 'critical') {
  switch (severity) {
    case 'info':
      return 'bg-green-100 border-green-300 text-green-800'
    case 'warning':
      return 'bg-yellow-100 border-yellow-300 text-yellow-800'
    case 'critical':
      return 'bg-red-100 border-red-300 text-red-800'
    default:
      return 'bg-gray-100 border-gray-300 text-gray-800'
  }
}

export function getSeverityIcon(severity: 'info' | 'warning' | 'critical') {
  switch (severity) {
    case 'info':
      return '💡'
    case 'warning':
      return '⚠️'
    case 'critical':
      return '🚨'
    default:
      return 'ℹ️'
  }
}