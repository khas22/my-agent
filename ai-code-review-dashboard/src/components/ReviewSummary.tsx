import React from 'react'
import { ReviewSummary as ReviewSummaryType, ReviewComment } from '@/types/review'
import { getSeverityColor, getSeverityIcon } from '@/lib/utils'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

interface ReviewSummaryProps {
  summary: ReviewSummaryType
  comments: ReviewComment[]
  onCommentClick?: (lineNumber: number) => void
}

export function ReviewSummary({ summary, comments, onCommentClick }: ReviewSummaryProps) {
  const getSeverityIconComponent = (severity: 'info' | 'warning' | 'critical') => {
    switch (severity) {
      case 'info':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-600" />
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Review Summary</h3>
        {summary.total > 0 && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {summary.total} issues found
          </span>
        )}
      </div>

      {summary.total === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-500">No issues found in your code!</p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{summary.info}</div>
              <div className="text-sm text-green-700">Info</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{summary.warning}</div>
              <div className="text-sm text-yellow-700">Warnings</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{summary.critical}</div>
              <div className="text-sm text-red-700">Critical</div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <h4 className="font-medium text-gray-900 mb-2">Issues Details</h4>
            {comments.map((comment, index) => (
              <div
                key={comment.id || index}
                className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow ${getSeverityColor(comment.severity)}`}
                onClick={() => onCommentClick?.(comment.line)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onCommentClick?.(comment.line)
                  }
                }}
                aria-label={`Go to line ${comment.line}: ${comment.comment}`}
              >
                <div className="flex items-start space-x-2">
                  {getSeverityIconComponent(comment.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium">
                        Line {comment.line}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        comment.severity === 'critical' ? 'bg-red-200 text-red-800' :
                        comment.severity === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {comment.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm break-words">{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}