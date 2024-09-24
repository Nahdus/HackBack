function determinePriority(tempValue, packetCount, nodeCapacity, batteryLevel) {

    // Normalizing values
    const normTemperature = (100 - tempValue) / 100; // Assuming max safe temperature is 100
    const normBattery = batteryLevel / 100; // Assuming max battery is 100%
    const normPacketCount = packetCount / nodeCapacity; // Normalizing packet count

    // Weights for each parameter
    const w1 = 0.85; // Weight for temperature
    const w2 = 0.55; // Weight for battery
    const w3 = 0.15; // Weight for packet count
    const w4 = 0.3; // Weight for node capacity

    // Calculating the priority score
    const P = (w1 * normTemperature) +
              (w2 * normBattery) +
              (w3 * normPacketCount) +
              (w4 * 1); // Assuming node capacity is fully utilized

    // Selecting priority level from P1 to P5 based on the score
    let priorityLevel;
    if (P >= 0.6) {
        priorityLevel = 'P1'; // Highest priority
    } else if (P >= 0.5) {
        priorityLevel = 'P2';
    } else if (P >= 0.4) {
        priorityLevel = 'P3';
    } else if (P >= 0.2) {
        priorityLevel = 'P4';
    } else {
        priorityLevel = 'P5'; // Lowest priority
    }
console.log({priorityScore: P, priorityLevel})
    return priorityLevel ;
}

module.exports = determinePriority;
