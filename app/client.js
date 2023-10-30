const dgram = require('node:dgram');
const readline = require('readline');

const client = dgram.createSocket('udp4');

const roomId = "room1";

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

// interface for reading user input
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

/*
client.connect(3000, 'localhost', async(err) => {
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
*/

/*
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
*/