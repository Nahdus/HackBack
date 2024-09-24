const fs = require('fs');
const path = require('path');
const broadcastLog = require('./websocketServer');

const logFilePath = path.join(__dirname, '../ticket_logs.txt');

function logTicket(ticketType, value,priority, description, nodeId) {
    const ticketId = Math.floor(Math.random() * 100000);
    const logMessage = `{'Node_ID': '${nodeId}', 'Ticket_created': '${ticketType}','Priority':'${priority}', 'Description':'${description} with value ${value}', 'Ticket_ID': 'INC${ticketId}', 'Time_of_generation': '${new Date().toISOString()}'\n}`;

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
