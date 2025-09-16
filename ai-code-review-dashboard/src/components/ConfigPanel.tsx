import React from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Settings, Eye, EyeOff } from 'lucide-react'

interface ConfigPanelProps {
  apiKey: string
  onApiKeyChange: (key: string) => void
  useStreaming: boolean
  onStreamingToggle: (enabled: boolean) => void
  language: string
  onLanguageChange: (language: string) => void
}

export function ConfigPanel({
  apiKey,
  onApiKeyChange,
  useStreaming,
  onStreamingToggle,
  language,
  onLanguageChange
}: ConfigPanelProps) {
  const [showApiKey, setShowApiKey] = React.useState(false)

  const languages = [
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' }
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
      </div>

      <div className="space-y-4">
        {/* API Key Input */}
        <div className="relative">
          <Input
            label="API Key"
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="Enter your API key"
            className="pr-10"
            aria-describedby="api-key-help"
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
            onClick={() => setShowApiKey(!showApiKey)}
            aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
          >
            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <p id="api-key-help" className="text-xs text-gray-500 mt-1">
            Your API key is used to authenticate with the AI review service
          </p>
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Programming Language
          </label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Select programming language"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Streaming Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Streaming Mode
            </label>
            <p className="text-xs text-gray-500">
              Show results as they arrive
            </p>
          </div>
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              useStreaming ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onClick={() => onStreamingToggle(!useStreaming)}
            role="switch"
            aria-checked={useStreaming}
            aria-label="Toggle streaming mode"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                useStreaming ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* API Endpoint Info */}
        <div className="bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-1">API Endpoint</h4>
          <p className="text-xs text-gray-600 font-mono">
            {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}
            {process.env.NEXT_PUBLIC_REVIEW_ENDPOINT || '/api/review'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Configure in your .env.local file
          </p>
        </div>
      </div>
    </div>
  )
}