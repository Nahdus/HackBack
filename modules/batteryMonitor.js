const logTicket = require('./Ticketing');
const genran = require('./randomx')
const getRandomDescription = require('./Issueset');
const nodeTicketIntervals = {};

async function monitorBatteryLevel(batteryLevel, priority, nodeId) {
    let ticketInterval = null;
    let description = '';
    let tickettype = '';
    let p = '';  // define p properly for scope

    // Clear any existing ticket intervals for the node
    if (nodeTicketIntervals[nodeId]) {
        clearInterval(nodeTicketIntervals[nodeId].interval);
        console.log(`Stopping previous ticket generation for Node ID: ${nodeId}`);
    }

    // Check the battery level and create tickets based on thresholds
    if (batteryLevel < 50) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.5);
            ticketInterval = each * 1000;
            description = 'Critical';
            p = 'P1';
            tickettype = 'Battery Usage';
        }
    } else if (batteryLevel >= 50 && batteryLevel < 70) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.33);
            ticketInterval = each * 6000;
            description = 'Elevated';
            p = 'P2';
            tickettype = 'Battery Usage';
        }
    } else if (batteryLevel >= 70 && batteryLevel < 80) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.2);
            ticketInterval = each * 12000;
            description = 'Moderate';
            p = 'P3';
            tickettype = 'Battery Usage';
        }
    } else if (batteryLevel >= 80 && batteryLevel < 100) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.2);
            ticketInterval = each * 18000;
            description = await getRandomDescription();
            p = 'P5';
            tickettype = 'User Ticket';
        }
    } else {
        // Battery level is above 100%, no ticket generation needed
        console.log(`Node ${nodeId} has sufficient battery (${batteryLevel}%)`);
        return;
    }

    // Start a new ticket generation interval
    console.log(`Starting new ticket generation for Node ID: ${nodeId} - ${description}`);
    const interval = setInterval(async () => {
        logTicket(tickettype, batteryLevel, p, `${p} ${description}`, nodeId);
        if (tickettype === 'User Ticket') {
            logTicket('User Ticket', 'User ticket', 'P5', 'P5 ' + await getRandomDescription());
        }
    }, ticketInterval);

    // Store the new interval in the tracking object
    nodeTicketIntervals[nodeId] = { interval, ticketInterval };
}

module.exports = monitorBatteryLevel;
