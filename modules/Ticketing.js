const fs = require('fs');
const path = require('path');
const broadcastLog = require('./websocketServer');


const logFilePath = path.join(__dirname, '../ticket_logs.txt');


function logTicket(ticketType, value, priority, description, nodeId) {
    const ticketId = Math.floor(Math.random() * 100000);
    const logMessageObj = {
        Node_ID: nodeId,
        Ticket_created: ticketType,
        Priority: priority,
        Description: `${description} with value ${value}`,
        Ticket_ID: `INC${ticketId}`,
        Time: new Date().toISOString()
    };


    // Convert the log message object to a JSON string for logging
    const logMessage = JSON.stringify(logMessageObj) + '\n'; // Append a newline for better readability


    // Log the message to the file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        } else {
            console.log(`Log saved: ${logMessage.trim()}`);
        }
    });


    // Send the log message object to WebSocket clients as JSON
    broadcastLog(logMessageObj); // Send the object to the WebSocket
}


module.exports = logTicket;

