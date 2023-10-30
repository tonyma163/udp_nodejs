const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const dgram = require('node:dgram');
//const readline = require('readline');

const PORT = 3000;
const HOST = '127.0.0.1';

const client = dgram.createSocket('udp4');
const roomId = "room1";

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
})

// Send join room message
const msg_join = roomId+" join";
client.send(msg_join, PORT, HOST, (err) => {
    if (err) {
        console.error("Error sending message: ", err);
    }
})

// WebSocket connection for real-time communication with the HTML page
io.on('connection', (socket) => {
    
    // Send button
    socket.on('chat message', (msg) => {
        // Send message to the UDP server
        const message = roomId+" "+msg;
        client.send(message, PORT, HOST, (err) => {
            if (err) {
                console.error("Error sending message: ", err);
            }
        })
    })

    // Receive message from the UDP server and send them to the client
    client.on('message', (msg, sender) => {
        const messageText = msg.toString();
        io.emit('chat message', messageText);
    })
})

http.listen(3002, () => {
    console.log('Web server is running on localhost: 3002');
})


/* Useless for having HTML page 
// Receive message from another clients through the server
client.on("message", (msg, _server) => {
    console.log(`Received ${msg}`);
})

// Send join room message
const msg_join = roomId+" join";
client.send(msg_join, 3000, 'localhost', (err) => {
    if (err) {
        console.err("Error sending message: ", err);
    }
})

// Interface for reading user input
const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function userinput() {
    input.question("Enter ur message: ", (_msg) => {
        if (_msg === 'exit') {
            input.close();
            client.close();
        } else {
            // Send msg
            let msg = roomId+" "+_msg;
            client.send(msg, 3000, 'localhost', (err) => {
                if (err) {
                    console.err("Error sending message: ", err);
                }
            })
            userinput(); // Continue
        }
    })
}

userinput();
*/