const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();


wss.on('connection', (ws) => {
    clients.add(ws);


    ws.on('close', () => {
        clients.delete(ws);
    });
});


function broadcastLog(logMessage) {
    // Ensure logMessage is a JSON string
    const messageString = JSON.stringify(logMessage);
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageString);
        }
    });
}


module.exports = broadcastLog;