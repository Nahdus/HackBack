// modules/webSocketServer.js
const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Handle client messages (optional)
    ws.on('message', (message) => {
        console.log('Received from client: ', message);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Broadcast message to all connected clients
function broadcastLog(logMessage) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(logMessage);
        }
    });
}

module.exports = broadcastLog;
