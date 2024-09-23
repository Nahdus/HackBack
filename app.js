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

app.post('/datainsights', async (req, res) => {
    const requestData = req.body;  // Extract data from the request body
    // const cpuUsage = 92; // Test for CPU usage
    // const packetCount = 105; // Test for traffic flow
    // const nodeCapacity = 100; // Node capacity is set to 100 packets
    const cpuUsage = req.body.cpuUsage; // Test for CPU usage
    const packetCount =  req.body.packetCount; // Test for traffic flow
    const nodeCapacity =  req.body.nodeCapacity; // Node capacity is set to 100 packets
    const nodeId = req.body.nodeId;
    resp = await datainsights(nodeId,cpuUsage,packetCount,nodeCapacity)
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
