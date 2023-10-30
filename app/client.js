const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

const prompt = require('prompt-sync')();

//const msg = Buffer.from('test');
const client = dgram.createSocket('udp4');

const roomId = "room1";

// receive message from another clients through the server
client.on("message", (msg, _sender) => {
    console.log("receive.");

    console.log(`Recevied message from: ${_sender.address}:${_sender.port}: ${msg}`);
})

client.connect(3000, 'localhost', async(err) => {
    if (err) {
        console.log('Error connecting to the server: ', err);
        return;
    }

    // send msg
    client.send(roomId+" join", (err) => {
        if (err) {
            console.err("Error sending message: ", err);
        }
    })

    while (true) {
        let msg = prompt("Enter ur message: ");
        
        if (msg == "exit") {
            client.close();
            break;
        }

        // send msg
        client.send(roomId+" "+msg, (err) => {
            if (err) {
                console.err("Error sending message: ", err);
            }
        })
    }
})