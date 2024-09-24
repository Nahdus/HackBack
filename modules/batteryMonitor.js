const logTicket = require('./Ticketing');
const genran = require('./randomx')
const getRandomDescription = require('./Issueset');
const nodeTicketIntervals = {};

async function monitorBatteryLevel(batteryLevel, priority, nodeId) {
    let ticketInterval = null;
    let description =''
    tickettype=''
    // Clear any existing ticket intervals for the same node
    clearInterval(ticketInterval);

    // Check the battery level and create tickets based on thresholds
    if (batteryLevel < 50) {
            for (let index = 0; index < 1; index++) {
            let each = genran(0.5)
            ticketInterval = each * 1000
            description = 'Critical'
            p = 'P1'
            tickettype='Battery Usage'
            }
    } else if (batteryLevel >= 50 && batteryLevel < 70) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.33)
            ticketInterval = each * 6000
            description = 'Elevated'
            p = 'P2'
            tickettype='Battery Usage'
            //logTicket('User Ticket','User ticket', 'P4', 'P4 '+ await getRandomDescription());
            }
        // Elevated battery level, create ticket at a random interval based on a rate of 1 ticket every 3 minutes
        // ticketInterval = setInterval(() => {
        //     logTicket('Battery Usage', batteryLevel, priority, priority && priority ? priority : 'P2 Elevated', nodeId);
        // }, genran(0.33) * 6000); // Random interval for 3 minutes
    } else if (batteryLevel >= 70 && batteryLevel < 80) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.2)
            ticketInterval = each * 12000
            description = 'Moderate'
            p = 'P3'
            tickettype='Battery Usage'
            }
    } else if (batteryLevel >= 80 && batteryLevel < 100) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.2)
            ticketInterval = each * 18000
            description = await getRandomDescription()//description[Math.floor(Math.random() * description.length)]
            p = 'P5'
            tickettype='User Ticket'
            }
    } else {
        // Battery level is above 80%, no ticket generation needed
        console.log(`Node ${nodeId} has sufficient battery (${batteryLevel}%)`);
        return;
    }

    // Clear the existing ticket interval if it's different from the new one
    if (nodeTicketIntervals[nodeId] && nodeTicketIntervals[nodeId].ticketInterval !== ticketInterval) {
        clearInterval(nodeTicketIntervals[nodeId].interval);
        console.log(`Stopping previous ticket generation for Node ID: ${nodeId}`);
    }

    // Start a new ticket generation interval if none exists or the interval has changed
    if (!nodeTicketIntervals[nodeId] || nodeTicketIntervals[nodeId].ticketInterval !== ticketInterval) {
        console.log(`Starting new ticket generation for Node ID: ${nodeId} - ${description}`);

        const interval = setInterval(async() => {
            logTicket('Battery Usage', batteryLevel, priority, priority && priority ? priority :p+' '+ description, nodeId);
            logTicket('User Ticket','User ticket', 'P5', 'P5 '+ await getRandomDescription());
            //logTicket('CPU Usage', cpuUsage, priority + ' ' + description, nodeId);
        }, ticketInterval);

        // Store the interval and time in the tracking object
        nodeTicketIntervals[nodeId] = { interval, ticketInterval };
    }
    // Return the interval so it can be cleared later if needed
    //return ticketInterval;
}

module.exports = monitorBatteryLevel;
