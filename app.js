const express = require('express');
const app = express();
const datainsights = require('./datainsights');
const WebSocket = require('ws');
require('./modules/websocketServer');
const ws = new WebSocket('ws://localhost:8080');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});


nodeset=[{'nodeId': 'N1402',
  'temperature': 50,
  'battery': 13,
  'packetCount': 157,
  'nodeCapacity': 69},
 {'nodeId': 'N6973',
  'temperature': 70,
  'battery': 49,
  'packetCount': 71,
  'nodeCapacity': 50},
 {'nodeId': 'N2655',
  'temperature': 51,
  'battery': 23,
  'packetCount': 83,
  'nodeCapacity': 99},
 {'nodeId': 'N5195',
  'temperature': 53,
  'battery': 92,
  'packetCount': 101,
  'nodeCapacity': 53},
 {'nodeId': 'N5055',
  'temperature': 56,
  'battery': 84,
  'packetCount': 186,
  'nodeCapacity': 125},
 {'nodeId': 'N8618',
  'temperature': 84,
  'battery': 79,
  'packetCount': 177,
  'nodeCapacity': 148},
 {'nodeId': 'N9628',
  'temperature': 76,
  'battery': 50,
  'packetCount': 58,
  'nodeCapacity': 111}]

app.post('/datainsights', async (req, res) => {

    const requestData = nodeset[Math.random(length(nodeset))];  // Extract data from the request body
    const packetCount =  req.body.packetCount; // Test for traffic flow
    const nodeCapacity =  req.body.nodeCapacity; // Node capacity is set to 100 packets
    const tempValue = req.body.temperature;
    const batteryLevel = req.body.battery;
    const nodeId = req.body.nodeId;
    // const requestData = req.body;  // Extract data from the request body
    // const packetCount =  req.body.packetCount; // Test for traffic flow
    // const nodeCapacity =  req.body.nodeCapacity; // Node capacity is set to 100 packets
    // const tempValue = req.body.temperature;
    // const batteryLevel = req.body.battery;
    // const nodeId = req.body.nodeId;
    resp = await datainsights(nodeId,tempValue,packetCount,nodeCapacity,batteryLevel)
    console.log('Received data:', requestData);

    // Respond to the client
    res.json({ message: 'Data received successfully' });
});



ws.onopen = () => {
    console.log('Connected to WebSocket server');
};

ws.onmessage = (message) => {
    console.log('Received log message: ', message.data);
};

ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
};


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
