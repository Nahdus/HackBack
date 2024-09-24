function determinePriority(tempValue, packetCount, nodeCapacity, batteryLevel) {
    // Normalizing values
    const normTemperature = (50 - Math.min(tempValue, 50)) / 50; // Cap tempValue at 50, normalize in reverse
    const normBattery = batteryLevel / 100; // Assuming max battery is 100%
    const normPacketCount = Math.min(packetCount / nodeCapacity, 1); // Cap packet count normalization at 1
    const normNodeCapacity = Math.min(nodeCapacity / 100, 1); // Cap node capacity at 1

    // Adjusted weights with higher emphasis on temperature and battery
    const w1 = 0.5; // Weight for temperature (increased)
    const w2 = 0.4; // Weight for battery (increased)
    const w3 = 0.2; // Weight for packet count
    const w4 = 0.1; // Weight for node capacity utilization

    // Calculating the priority score
    let P = (w1 * normTemperature) +
            (w2 * normBattery) +
            (w3 * normPacketCount) +
            (w4 * normNodeCapacity); // Adjusting node capacity dynamically

    // Hard rule for critical battery threshold
    if (batteryLevel <= 20) {
        P += 0.3; // Escalate priority for critically low battery
    }

    // Hard rule for critical temperature above 50
    if (tempValue > 50) {
        P += 0.4; // Escalate priority for critically high temperature
    }

    // Selecting priority level from P1 to P5 based on the score
    let priorityLevel;
    if (P >= 0.75) {
        priorityLevel = 'P1'; // Highest priority
    } else if (P >= 0.5) {
        priorityLevel = 'P2';
    } else if (P >= 0.35) {
        priorityLevel = 'P3';
    } else if (P >= 0.2) {
        priorityLevel = 'P4';
    } else {
        priorityLevel = 'P5'; // Lowest priority
    }

    console.log({ priorityScore: P, priorityLevel });
    return priorityLevel;
}


module.exports = determinePriority;
