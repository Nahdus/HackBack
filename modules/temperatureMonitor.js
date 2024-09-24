const logTicket = require('./Ticketing');
const genran = require('./randomx')
const getRandomDescription = require('./Issueset');
const nodeTempIntervals = {}; // Object to track active ticket intervals for each Node

async function monitorTemperature(temp, priority, nodeId) {
    let intervalTime = null;
    //let description = ['No signal', 'Continues voice break', 'Is there any tower in my area','VoIP is not working for me'];

    if (temp >= 70 && temp <= 100) {
        for (let index = 0; index < 100; index++) {
            let each = genran(0.5);
            intervalTime = each * 1000;
            description = 'High-Risk';
            p='P1';
            tickettype='Temperature'
            
        }
    } else if (temp >= 50 && temp < 70) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.5);
            intervalTime = each * 6000;
            description = 'Overheated';
            p='P2';
            tickettype='Temperature'
            //logTicket('User Ticket','User ticket', 'P5', 'P5 '+ await getRandomDescription());
        }
    } else if (temp >= 35 && temp < 50) {
        for (let index = 0; index < 1; index++) {
            let each = genran(0.2);
            intervalTime = each * 12000;
            description = 'Moderate';
            p='P3';
            tickettype='Temperature'
        }
    } else {
        // description = 'Normal';
        for (let index = 0; index < 1; index++) {
            let each = genran(0.2);
            intervalTime = each * 18000;
            description = await getRandomDescription()
            p= 'P5'
            tickettype='User Ticket'
            //logTicket('User Ticket','User Ticket', 'P5', 'P5' +' '+await getRandomDescription(), nodeId);
        }
        console.log(`No ticket needed for temperature: ${temp}°C on Node ID: ${nodeId} - ${description}`);
        return;
    }

    // Clear the existing ticket interval if it's different from the new one or temperature has changed
    if (nodeTempIntervals[nodeId] && 
        nodeTempIntervals[nodeId].intervalTime !== intervalTime) {
        clearInterval(nodeTempIntervals[nodeId].interval);
        console.log(`Stopping previous temperature ticket generation for Node ID: ${nodeId}`);
    }

    // Start a new ticket generation interval if none exists, or the interval or temperature has changed
    if (!nodeTempIntervals[nodeId] || 
        nodeTempIntervals[nodeId].intervalTime !== intervalTime ) {
        
        console.log(`Starting new temperature ticket generation for Node ID: ${nodeId} - ${description}`);

        const interval = setInterval(async () => {
            logTicket('Temperature', temp + '°C', priority, priority && priority ? priority :p+' '+ description, nodeId);
            logTicket('User Ticket','User ticket', 'P4', 'P4 '+ await getRandomDescription());
        }, intervalTime);

        // Store the interval, time, and temp in the tracking object
        nodeTempIntervals[nodeId] = { interval, intervalTime, temp };
    }
}

module.exports = monitorTemperature;
