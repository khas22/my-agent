'use client'

import React, { useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { ReviewComment } from '@/types/review'
import { getSeverityColor } from '@/lib/utils'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  comments: ReviewComment[]
  language?: string
  height?: string
}

export function CodeEditor({ 
  value, 
  onChange, 
  comments, 
  language = 'typescript',
  height = '400px' 
}: CodeEditorProps) {
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<any>(null)

  useEffect(() => {
    if (editorRef.current && monacoRef.current && comments.length > 0) {
      const editor = editorRef.current
      const monaco = monacoRef.current

      // Clear existing decorations
      const model = editor.getModel()
      if (model) {
        // Add line decorations for comments
        const decorations = comments.map(comment => ({
          range: new monaco.Range(comment.line, 1, comment.line, 1),
          options: {
            isWholeLine: true,
            className: comment.severity === 'critical' ? 'bg-red-50 border-l-4 border-red-500' :
                      comment.severity === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                      'bg-green-50 border-l-4 border-green-500',
            glyphMarginClassName: comment.severity === 'critical' ? 'text-red-500' :
                                comment.severity === 'warning' ? 'text-yellow-500' :
                                'text-green-500',
            hoverMessage: {
              value: `**${comment.severity.toUpperCase()}**: ${comment.comment}`
            }
          }
        }))

        editor.deltaDecorations([], decorations)
      }
    }
  }, [comments])

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    monacoRef.current = monaco

    // Configure editor theme and options
    monaco.editor.defineTheme('reviewTheme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.lineHighlightBackground': '#f8f9fa'
      }
    })

    monaco.editor.setTheme('reviewTheme')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Code Editor</h3>
      </div>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(val) => onChange(val || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          glyphMargin: true,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          fontSize: 14,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
        }}
      />
    </div>
  )
}