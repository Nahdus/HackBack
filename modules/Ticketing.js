const fs = require('fs');
const path = require('path');
const broadcastLog = require('./websocketServer');

const logFilePath = path.join(__dirname, '../ticket_logs.txt');

function logTicket(ticketType, value, description, nodeId) {
    const ticketId = Math.floor(Math.random() * 100000);
    const logMessage = `Ticket created for Node ID: ${nodeId} - ${ticketType} (${description}) with value: ${value} (Ticket ID: ${ticketId}) at ${new Date().toISOString()}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        } else {
            console.log(`Log saved: ${logMessage.trim()}`);
        }
    });

    // Send the log message to WebSocket clients
    broadcastLog(logMessage);
}

module.exports = logTicket;
