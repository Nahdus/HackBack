const logTicket = require('./Ticketing');

const nodeTicketIntervals = {}; 

function monitorCPUUsage(cpuUsage, nodeId) {
    // Define the ticketing conditions
    let intervalTime = null;
    let description = '';

    if (cpuUsage >= 90 && cpuUsage <= 100) {
        intervalTime = 5 * 1000; // Generate ticket every 5 seconds
        description = 'CPU usage 90-100%';
    } else if (cpuUsage >= 80 && cpuUsage < 90) {
        intervalTime = 60 * 1000; // Generate ticket every 1 minute
        description = 'CPU usage 80-90%';
    } else if (cpuUsage < 50) {
        intervalTime = 3 * 60 * 1000; // Generate ticket every 3 minutes
        description = 'CPU usage below 50%';
    } else {
        console.log(`No ticket needed for CPU usage: ${cpuUsage}% on Node ID: ${nodeId}`);
        return;
    }

    // Clear the existing ticket interval if it's different from the new one
    if (nodeTicketIntervals[nodeId] && nodeTicketIntervals[nodeId].intervalTime !== intervalTime) {
        clearInterval(nodeTicketIntervals[nodeId].interval);
        console.log(`Stopping previous ticket generation for Node ID: ${nodeId}`);
    }

    // Start a new ticket generation interval if none exists or the interval has changed
    if (!nodeTicketIntervals[nodeId] || nodeTicketIntervals[nodeId].intervalTime !== intervalTime) {
        console.log(`Starting new ticket generation for Node ID: ${nodeId} - ${description}`);

        const interval = setInterval(() => {
            logTicket('CPU Usage', cpuUsage, description, nodeId);
        }, intervalTime);

        // Store the interval and time in the tracking object
        nodeTicketIntervals[nodeId] = { interval, intervalTime };
    }
}

module.exports = monitorCPUUsage;
