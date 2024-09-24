const monitorCPUUsage = require('./modules/cpuMonitor');
const monitorTemperature = require('./modules/temperatureMonitor');
const monitorTrafficFlow = require('./modules/trafficMonitor');
const monitorBatteryLevel = require('./modules/batteryMonitor');
const determinePriority = require('./modules/priorityDecider');

// // Example usage:
// const cpuUsage = 92; // Test for CPU usage
// const packetCount = 105; // Test for traffic flow
// const nodeCapacity = 100; // Node capacity is set to 100 packets



const datainsights = async (nodeId,tempValue,packetCount,nodeCapacity,batteryLevel)=>{
    let priority = await determinePriority(tempValue,packetCount,nodeCapacity,batteryLevel)
    // if(cpuUsage){
    //     await monitorCPUUsage(cpuUsage,priority,nodeId);
    // }
    if(batteryLevel){
        await monitorBatteryLevel(batteryLevel,priority,nodeId);
    }
    if(tempValue){
        await monitorTemperature(tempValue,priority, nodeId)
    }
    if(packetCount && nodeCapacity){
        await monitorTrafficFlow(packetCount,priority, nodeCapacity, nodeId);
    }
   
    }

module.exports = datainsights
