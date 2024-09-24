const logTicket = require('./Ticketing');

function monitorTrafficFlow(packetCount, priority, nodeCapacity, nodeId) {
    if (packetCount >= nodeCapacity) {
        console.log(`Node ID: ${nodeId} reached capacity with ${packetCount} packets. Logging ticket for traffic overflow.`);
        logTicket('Traffic Flow', packetCount, priority,`${priority} Node capacity ${nodeCapacity} exceeded`, nodeId);
        
    } else {
        console.log(`Traffic is normal with ${packetCount} packets for Node ID: ${nodeId}. No ticket needed.`);
    }
}

module.exports = monitorTrafficFlow;
