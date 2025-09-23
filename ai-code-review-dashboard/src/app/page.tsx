'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { CodeEditor } from '@/components/CodeEditor'
import { ReviewSummary } from '@/components/ReviewSummary'
import { ConfigPanel } from '@/components/ConfigPanel'
import { Button } from '@/components/ui/Button'
import { useCodeReview } from '@/hooks/useCodeReview'
import { Play, RotateCcw, AlertCircle } from 'lucide-react'

const DEFAULT_CODE = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

// Usage example
const cartItems = [
  { price: 10.99, quantity: 2 },
  { price: 5.50, quantity: 1 },
  { price: 15.00, quantity: 3 }
];

console.log(calculateTotal(cartItems));`

export default function HomePage() {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_DEFAULT_API_KEY || '')
  const [useStreaming, setUseStreaming] = useState(true)
  const [language, setLanguage] = useState('javascript')
  
  const { comments, isLoading, error, summary, reviewCode, clearComments } = useCodeReview()

  const handleReviewCode = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your API key')
      return
    }
    
    if (!code.trim()) {
      alert('Please enter some code to review')
      return
    }

    await reviewCode(code, apiKey, useStreaming)
  }

  const handleClearResults = () => {
    clearComments()
  }

  const scrollToLine = (lineNumber: number) => {
    // This would scroll to the specific line in the editor
    // Monaco Editor provides methods to reveal specific lines
    console.log(`Scrolling to line ${lineNumber}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Code Editor */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Code Editor</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearResults}
                      disabled={isLoading || comments.length === 0}
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                    <Button
                      onClick={handleReviewCode}
                      loading={isLoading}
                      disabled={!apiKey.trim() || !code.trim()}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Review Code
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  comments={comments}
                  language={language}
                  height="500px"
                />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                </div>
                <p className="mt-2 text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <p className="text-sm text-blue-700">
                    {useStreaming ? 'Analyzing code and streaming results...' : 'Analyzing code...'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Configuration Panel */}
            <ConfigPanel
              apiKey={apiKey}
              onApiKeyChange={setApiKey}
              useStreaming={useStreaming}
              onStreamingToggle={setUseStreaming}
              language={language}
              onLanguageChange={setLanguage}
            />

            {/* Review Summary */}
            <ReviewSummary
              summary={summary}
              comments={comments}
              onCommentClick={scrollToLine}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>AI Code Review Dashboard - Built with Next.js and Tailwind CSS</p>
            <p className="mt-1">
              Configure your API endpoint in <code className="bg-gray-100 px-1 rounded">.env.local</code>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}