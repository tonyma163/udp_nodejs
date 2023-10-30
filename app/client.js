const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

const prompt = require('prompt-sync')();

//const msg = Buffer.from('test');
const client = dgram.createSocket('udp4');

client.connect(3000, 'localhost', (err) => {
    var exit = 0;
    while (exit == 0) {
        let msg = prompt("Enter ur message: ");
        // send msg
        client.send(msg, (err) => {
            client.close();
        })
}
})