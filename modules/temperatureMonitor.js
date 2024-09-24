const logTicket = require('./Ticketing');
const genran = require('./randomx');
const getRandomDescription = require('./Issueset');
const nodeTempIntervals = {}; // Object to track active ticket intervals for each Node

async function monitorTemperature(temp, priority, nodeId) {
    let intervalTime = null;
    let description = '';
    let p = '';  // Priority
    let tickettype = '';  // Ticket type

    // Clear any existing ticket intervals if the temperature has changed or the interval is different
    if (nodeTempIntervals[nodeId] && 
        (nodeTempIntervals[nodeId].temp !== temp || 
        nodeTempIntervals[nodeId].intervalTime !== intervalTime)) {
        clearInterval(nodeTempIntervals[nodeId].interval);
        console.log(`Stopping previous temperature ticket generation for Node ID: ${nodeId}`);
    }

    // Check temperature ranges and set the appropriate ticket details
    if (temp >= 70 && temp <= 100) {
        let each = genran(0.5);
        intervalTime = each * 1000;
        description = 'High-Risk';
        p = 'P1';
        tickettype = 'Temperature';
    } else if (temp >= 50 && temp < 70) {
        let each = genran(0.5);
        intervalTime = each * 6000;
        description = 'Overheated';
        p = 'P2';
        tickettype = 'Temperature';
    } else if (temp >= 35 && temp < 50) {
        let each = genran(0.2);
        intervalTime = each * 12000;
        description = 'Moderate';
        p = 'P3';
        tickettype = 'Temperature';
    } else {
        let each = genran(0.2);
        intervalTime = each * 18000;
        description = await getRandomDescription();
        p = 'P5';
        tickettype = 'User Ticket';
        console.log(`No ticket needed for temperature: ${temp}°C on Node ID: ${nodeId} - ${description}`);
        return;
    }

    // Start a new ticket generation interval if the interval or temperature has changed
    if (!nodeTempIntervals[nodeId] || 
        nodeTempIntervals[nodeId].intervalTime !== intervalTime || 
        nodeTempIntervals[nodeId].temp !== temp) {

        console.log(`Starting new temperature ticket generation for Node ID: ${nodeId} - ${description}`);

        const interval = setInterval(async () => {
            logTicket('Temperature', `${temp}°C`, priority, `${p} ${description}`, nodeId);
            logTicket('User Ticket', 'User ticket', 'P4', 'P4 ' + await getRandomDescription());
        }, intervalTime);

        // Store the interval, time, and temperature in the tracking object
        nodeTempIntervals[nodeId] = { interval, intervalTime, temp };
    }
}

module.exports = monitorTemperature;
