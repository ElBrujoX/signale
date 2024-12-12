import express from 'express';
import { Server } from 'ws';
import { createServer } from 'http';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const server = createServer(app);
const wss = new Server({ server });

// Store connected clients
const clients = new Map();

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      
      switch (data.type) {
        case 'init':
          // Store client with their agentId
          clients.set(data.agentId, ws);
          console.log(`Client registered for agent: ${data.agentId}`);
          break;
          
        case 'offer':
        case 'answer':
        case 'ice-candidate':
          // Forward the message to the intended recipient
          const targetClient = clients.get(data.agentId);
          if (targetClient && targetClient.readyState === ws.OPEN) {
            targetClient.send(JSON.stringify(data));
          }
          break;

        default:
          console.warn(`Unknown message type: ${data.type}`);
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    // Remove client from stored connections
    for (const [agentId, client] of clients.entries()) {
      if (client === ws) {
        clients.delete(agentId);
        console.log(`Client disconnected: ${agentId}`);
        break;
      }
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Signaling server running on port ${port}`);
});