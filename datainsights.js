const monitorCPUUsage = require('./modules/cpuMonitor');
const monitorTrafficFlow = require('./modules/trafficMonitor');

// // Example usage:
// const cpuUsage = 92; // Test for CPU usage
// const packetCount = 105; // Test for traffic flow
// const nodeCapacity = 100; // Node capacity is set to 100 packets

const datainsights = async (nodeId, cpuUsage,packetCount,nodeCapacity)=>{
    if(cpuUsage){
        await monitorCPUUsage(cpuUsage,nodeId);
    }
   if(packetCount && nodeCapacity){
       await monitorTrafficFlow(packetCount, nodeCapacity, nodeId);
   }
   
    }

module.exports = datainsights
