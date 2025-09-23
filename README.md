# Web Dashboard for API Key Management

A full-stack web application that allows users to sign up, view usage statistics, and manage API keys.

## Project Structure

```
├── frontend/          # React TypeScript frontend
├── backend/           # Node.js Express backend
├── index.ts           # Main agent entry point
├── prompts.ts         # AI agent prompts
├── tools.ts           # Agent tools
└── README.md          # Project documentation
```

## Features

- **User Authentication**: Secure signup and login system
- **API Key Management**: Generate, regenerate, and delete API keys
- **Usage Analytics**: View API usage statistics and metrics
- **Modern UI**: Responsive dashboard built with React and Tailwind CSS
- **Security**: JWT authentication, rate limiting, input validation

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- JWT for authentication
- SQLite/PostgreSQL for database
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

1. Install dependencies:
   ```bash
   bun install
   cd frontend && bun install
   cd ../backend && bun install
   ```

2. Set up environment variables:
   ```bash
   cp backend/.env.example backend/.env
   ```

3. Start development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend && bun run dev
   
   # Terminal 2 - Frontend
   cd frontend && bun run dev
   ```

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/keys` - List user's API keys
- `POST /api/keys` - Generate new API key
- `PUT /api/keys/:id/regenerate` - Regenerate API key
- `DELETE /api/keys/:id` - Delete API key
- `GET /api/usage` - Get usage statistics

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## Original Agent

To run the original AI agent:

```bash
bun run index.ts
```
