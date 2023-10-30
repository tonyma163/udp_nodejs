const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log('Server error: ', err.stack);
    server.close();
})

server.on('message', (_msg, _sender) => {
    console.log(`Received from ${_sender.address}: ${_sender.port}: ${_msg}`);
})

server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on : ${address.address}:${address.port}`);
})

server.bind(3000);