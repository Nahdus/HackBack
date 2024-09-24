const logTicket = require('./Ticketing');
const genran = require('./randomx')
// const genran = (rate) => {
//     let u = Math.random();
//     let interval = -(1 / rate) * Math.log(u);
//     return interval;
// };

function monitorBatteryLevel(batteryLevel, priority, nodeId) {
    let ticketInterval = null;

    // Clear any existing ticket intervals for the same node
    clearInterval(ticketInterval);

    // Check the battery level and create tickets based on thresholds
    if (batteryLevel < 50) {
        // Critical battery level, create ticket at a random interval based on a rate of 1 ticket per minute
        ticketInterval = setInterval(() => {
            logTicket('Battery Usage', batteryLevel, priority, priority && priority ? priority : 'P1 Critical', nodeId);
        }, genran(0.5) * 1000); // Random interval for 1 minute
    } else if (batteryLevel >= 50 && batteryLevel < 70) {
        // Elevated battery level, create ticket at a random interval based on a rate of 1 ticket every 3 minutes
        ticketInterval = setInterval(() => {
            logTicket('Battery Usage', batteryLevel, priority, priority && priority ? priority : 'P2 Elevated', nodeId);
        }, genran(0.33) * 6000); // Random interval for 3 minutes
    } else if (batteryLevel >= 70 && batteryLevel < 80) {
        // Moderate battery level, create ticket at a random interval based on a rate of 1 ticket every 5 minutes
        ticketInterval = setInterval(() => {
            logTicket('Battery Usage', batteryLevel, priority, priority && priority ? priority : 'P3 Moderate', nodeId);
        }, genran(0.2) * 18000); // Random interval for 5 minutes
    } else {
        // Battery level is above 80%, no ticket generation needed
        console.log(`Node ${nodeId} has sufficient battery (${batteryLevel}%)`);
    }

    // Return the interval so it can be cleared later if needed
    return ticketInterval;
}

module.exports = monitorBatteryLevel;
