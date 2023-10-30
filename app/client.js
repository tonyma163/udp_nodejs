const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

const msg = Buffer.from('test');
const client = dgram.createSocket('udp4');
client.connect(3000, 'localhost', (err) => {
    client.send(msg, (err) => {
        client.close();
    })
})