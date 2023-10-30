const dgram = require('node:dgram');
const readline = require('readline');

const PORT = 3000;
const HOST = '0.0.0.0';

const client = dgram.createSocket('udp4');
const roomId = "room1";

// Receive message from another clients through the server
client.on("message", (msg, _server) => {
    console.log(`Received ${msg}`);
})

// Send join room message
const msg_join = roomId+" join";
client.send(msg_join, PORT, HOST, (err) => {
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
            client.send(msg, PORT, HOST, (err) => {
                if (err) {
                    console.err("Error sending message: ", err);
                }
            })
            userinput(); // Continue
        }
    })
}

userinput();