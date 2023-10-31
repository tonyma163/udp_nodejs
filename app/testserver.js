const dgram = require('dgram');

// Create a UDP server
const server = dgram.createSocket('udp4');

// Listen on a specific port and IP address
const serverAddress = '0.0.0.0'; // Listen on all available network interfaces
const serverPort = 12345;

server.on('message', (message, remote) => {
  console.log(`Received message from ${remote.address}:${remote.port}: ${message}`);
});

server.bind(serverPort, serverAddress);

console.log(`UDP server listening on ${serverAddress}:${serverPort}`);
