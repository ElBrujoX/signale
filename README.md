# Serenity Signaling Server

WebRTC signaling server for Serenity VM connections.

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run clean` - Clean build directory

## Production

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment mode (development/production)

## API Endpoints

- `GET /health` - Health check endpoint

## WebSocket Events

- `init` - Register client with agentId
- `offer` - WebRTC offer
- `answer` - WebRTC answer
- `ice-candidate` - ICE candidate

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
