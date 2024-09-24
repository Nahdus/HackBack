const logTicket = require('./Ticketing');
const genran = require('./randomx')
const nodeTicketIntervals = {};

//description = ['Data is not loading', 'My Internet is too slow', 'Why Im not able to connect on this network']

function monitorCPUUsage(cpuUsage,priority, nodeId) {
        // Define the ticketing conditions
        let intervalTime = null;
        let description = ['Data is not loading', 'My Internet is too slow', 'Why Im not able to connect on this network'];
        let numberOfTimes = 1

        if (cpuUsage >= 90 && cpuUsage <= 100) {
            for (let index = 0; index < 1; index++) {
            let each = genran(5 / 1000)
            intervalTime = each * 100
            description = 'CPU usage 90-100%'
            // intervalTime = 5 * 1000; // Generate ticket every 5 seconds
            // description = 'CPU usage 90-100%';
            }
        } else if (cpuUsage >= 80 && cpuUsage <= 90) {
            for (let index = 0; index < 1000; index++) {
            let each = genran(5 / 1000)
            intervalTime = each * 600
            description = 'CPU usage 80-90%'
            // intervalTime = 60 * 1000; // Generate ticket every 1 minute
            // description = 'CPU usage 80-90%';
            }
        } else if (cpuUsage >= 50 && cpuUsage <= 80) {
            for (let index = 0; index < 1000; index++) {
            let each = genran(5 / 1000)
            intervalTime = each * 1200
            //intervalTime = 3 * 60 * 1000; // Generate ticket every 3 minutes
            description = 'CPU usage below 50-80%';
            }
        } else if (cpuUsage >= 30 && cpuUsage <=50) {
            for (let index = 0; index < 1000; index++) {
            let each = genran(5 / 1000)
            intervalTime = each * 1800
            //intervalTime = 3 * 60 * 1000; // Generate ticket every 3 minutes
            description = 'CPU usage below 30-50%';
            }
        } else if (cpuUsage < 10) {
            for (let index = 0; index < 1000; index++) {
            let each = genran(5 / 1000)
            intervalTime = each * 2100
            //intervalTime = 3 * 60 * 1000; // Generate ticket every 3 minutes
            description = description[Math.floor(Math.random() * description.length)];
            }
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
                logTicket('CPU Usage', cpuUsage, priority +' '+description, nodeId);
            }, intervalTime);

            // Store the interval and time in the tracking object
            nodeTicketIntervals[nodeId] = { interval, intervalTime };
        }
    
}
module.exports = monitorCPUUsage;
