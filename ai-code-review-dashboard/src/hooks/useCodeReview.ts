import { useState, useCallback } from 'react'
import { ReviewComment, ReviewState } from '@/types/review'

export function useCodeReview() {
  const [reviewState, setReviewState] = useState<ReviewState>({
    comments: [],
    isLoading: false,
    error: null,
    summary: { total: 0, info: 0, warning: 0, critical: 0 }
  })

  const updateSummary = useCallback((comments: ReviewComment[]) => {
    const summary = comments.reduce(
      (acc, comment) => {
        acc.total++
        acc[comment.severity]++
        return acc
      },
      { total: 0, info: 0, warning: 0, critical: 0 }
    )
    return summary
  }, [])

  const addComment = useCallback((comment: ReviewComment) => {
    setReviewState(prev => {
      const newComments = [...prev.comments, { ...comment, id: Date.now().toString() }]
      return {
        ...prev,
        comments: newComments,
        summary: updateSummary(newComments)
      }
    })
  }, [updateSummary])

  const clearComments = useCallback(() => {
    setReviewState(prev => ({
      ...prev,
      comments: [],
      summary: { total: 0, info: 0, warning: 0, critical: 0 }
    }))
  }, [])

  const setLoading = useCallback((isLoading: boolean) => {
    setReviewState(prev => ({ ...prev, isLoading }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setReviewState(prev => ({ ...prev, error }))
  }, [])

  const reviewCode = useCallback(async (code: string, apiKey: string, useStreaming: boolean = true) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
    const endpoint = process.env.NEXT_PUBLIC_REVIEW_ENDPOINT || '/api/review'
    
    setLoading(true)
    setError(null)
    clearComments()

    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ 
          code, 
          streaming: useStreaming 
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (useStreaming && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (line.trim()) {
              try {
                const comment = JSON.parse(line) as ReviewComment
                if (comment.line && comment.comment && comment.severity) {
                  addComment(comment)
                }
              } catch (e) {
                // Skip invalid JSON lines
                console.warn('Failed to parse streaming response line:', line)
              }
            }
          }
        }

        // Process any remaining buffer
        if (buffer.trim()) {
          try {
            const comment = JSON.parse(buffer) as ReviewComment
            if (comment.line && comment.comment && comment.severity) {
              addComment(comment)
            }
          } catch (e) {
            console.warn('Failed to parse final buffer:', buffer)
          }
        }
      } else {
        // Handle JSON response
        const data = await response.json()
        if (Array.isArray(data)) {
          data.forEach(comment => {
            if (comment.line && comment.comment && comment.severity) {
              addComment(comment as ReviewComment)
            }
          })
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [addComment, clearComments, setLoading, setError])

  return {
    ...reviewState,
    reviewCode,
    clearComments,
    addComment
  }
}