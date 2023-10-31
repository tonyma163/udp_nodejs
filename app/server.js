const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

const PORT = 3000;
const HOST = '127.0.0.1';

const clients = {}; // Store connected clients by room

server.on('error', (err) => {
    console.log('Server error: ', err.stack);
    server.close();
})

server.on('message', (_msg, _sender) => {
    console.log(`Received from ${_sender.address}:${_sender.port}: ${_msg}`);

    const msg = _msg.toString();
    const [roomId, content] = msg.split(" ");
    
    // Create a new room if it doesn't exist
    if (!(roomId in clients)) {
        clients[roomId] = [];
    }

    // Check if the sender is already in the room; if not, add them
    const senderKey = `${_sender.address}:${_sender.port}`;
    if (!clients[roomId].some(client => client === senderKey)) {
        clients[roomId].push(senderKey);
    }
    console.log("clients: ",clients)
    if (roomId in clients) {
        clients[roomId].forEach(client => {
            // Split the client string into address and port
            const [clientAddress, clientPort] = client.split(':');

            // Check port and address to find the recipient
            if (parseInt(clientPort) !== _sender.port) {
                server.send(`message from ${_sender.address}:${_sender.port}> `+_msg, parseInt(clientPort), clientAddress, (err) => {
                    if (err) {
                        console.error(`Error sending message to ${clientAddress}:${clientPort}`);
                    }
                })
                console.log(`Sent ${clientAddress}:${clientPort}`)
            }
        })
    }
})

server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on : ${address.address}:${address.port}`);
})

server.bind(PORT, HOST);