# AI Code Review Dashboard

A modern, responsive web dashboard for interacting with AI-powered code review agents. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Monaco Editor Integration**: Full-featured code editor with syntax highlighting and line numbers
- **Real-time Streaming**: Support for both streaming and JSON API responses
- **Interactive Feedback**: Click on issues in the summary to jump to specific lines
- **Multi-language Support**: Syntax highlighting for 10+ programming languages
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Accessibility**: ARIA labels and keyboard navigation support
- **Severity-based Highlighting**: Visual indicators for info, warning, and critical issues

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   NEXT_PUBLIC_DEFAULT_API_KEY=your-api-key-here
   NEXT_PUBLIC_REVIEW_ENDPOINT=/api/review
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Integration

The dashboard expects your AI agent to accept POST requests with this format:

```json
{
  "code": "function example() { ... }",
  "streaming": true
}
```

### Streaming Response Format
For streaming responses, send newline-delimited JSON:
```
{"line": 5, "comment": "Consider using const instead of let", "severity": "info"}
{"line": 12, "comment": "Missing error handling", "severity": "warning"}
{"line": 18, "comment": "Potential null pointer exception", "severity": "critical"}
```

### JSON Response Format
For standard JSON responses:
```json
[
  {"line": 5, "comment": "Consider using const instead of let", "severity": "info"},
  {"line": 12, "comment": "Missing error handling", "severity": "warning"},
  {"line": 18, "comment": "Potential null pointer exception", "severity": "critical"}
]
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for your AI agent API | `http://localhost:3001` |
| `NEXT_PUBLIC_DEFAULT_API_KEY` | Default API key (optional) | - |
| `NEXT_PUBLIC_REVIEW_ENDPOINT` | API endpoint path | `/api/review` |

### Supported Languages

- TypeScript
- JavaScript
- Python
- Java
- C#
- C++
- Go
- Rust
- PHP
- Ruby

## Components

### Core Components

- **`CodeEditor`**: Monaco-based editor with comment highlighting
- **`ReviewSummary`**: Sidebar showing issue statistics and details
- **`ConfigPanel`**: Settings for API key, language, and streaming mode
- **`Header`**: Top navigation with branding

### UI Components

- **`Button`**: Reusable button with loading states
- **`Input`**: Form input with validation styling

## Hooks

- **`useCodeReview`**: Manages review state and API communication

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

For static hosting:

```bash
npm run build
npm run export
```

## Customization

### Themes

Modify `src/app/globals.css` to customize the appearance:

```css
@layer components {
  .monaco-editor .margin {
    background-color: #your-color !important;
  }
}
```

### Adding New Languages

Update the language list in `src/components/ConfigPanel.tsx`:

```typescript
const languages = [
  // ... existing languages
  { value: 'kotlin', label: 'Kotlin' },
]
```

## Troubleshooting

### Common Issues

1. **Monaco Editor not loading**: Ensure you're running in a browser environment
2. **API connection failed**: Check your environment variables and CORS settings
3. **Streaming not working**: Verify your API returns proper content-type headers

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the example API integration