const logTicket = require('./Ticketing');
const genran = require('./randomx')
const nodeTempIntervals = {}; // Object to track active ticket intervals for each Node

function monitorTemperature(temp, priority, nodeId) {
    let intervalTime = null;
    let description = '';

    if (temp >= 70 && temp <= 100) {
        for (let index = 0; index < 1000; index++) {
            let each = genran(0.5);
            intervalTime = each * 1000;
            description = 'High-Risk';
        }
    } else if (temp >= 50 && temp < 70) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.05);
            intervalTime = each * 6000;
            description = 'Overheated';
        }
    } else if (temp >= 35 && temp < 50) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.05);
            intervalTime = each * 12000;
            description = 'Moderate';
        }
    } else {
        description = 'Normal';
        console.log(`No ticket needed for temperature: ${temp}°C on Node ID: ${nodeId} - ${description}`);
        return;
    }

    // Clear the existing ticket interval if it's different from the new one or temperature has changed
    if (nodeTempIntervals[nodeId] && 
        (nodeTempIntervals[nodeId].intervalTime !== intervalTime || nodeTempIntervals[nodeId].temp !== temp)) {
        clearInterval(nodeTempIntervals[nodeId].interval);
        console.log(`Stopping previous temperature ticket generation for Node ID: ${nodeId}`);
    }

    // Start a new ticket generation interval if none exists, or the interval or temperature has changed
    if (!nodeTempIntervals[nodeId] || 
        nodeTempIntervals[nodeId].intervalTime !== intervalTime || 
        nodeTempIntervals[nodeId].temp !== temp) {
        
        console.log(`Starting new temperature ticket generation for Node ID: ${nodeId} - ${description}`);

        const interval = setInterval(() => {
            logTicket('Temperature', temp + '°C', priority, priority + ' ' + description, nodeId);
        }, intervalTime);

        // Store the interval, time, and temp in the tracking object
        nodeTempIntervals[nodeId] = { interval, intervalTime, temp };
    }
}

module.exports = monitorTemperature;
