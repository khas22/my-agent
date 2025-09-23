export interface ReviewComment {
  line: number
  comment: string
  severity: 'info' | 'warning' | 'critical'
  id?: string
}

export interface ReviewSummary {
  total: number
  info: number
  warning: number
  critical: number
}

export interface ReviewState {
  comments: ReviewComment[]
  isLoading: boolean
  error: string | null
  summary: ReviewSummary
}