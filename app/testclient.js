const dgram = require('dgram');

// Create a UDP client
const client = dgram.createSocket('udp4');

const serverPort = 12345;
const serverAddress = '0.0.0.0'; // Replace with the actual IP address or hostname of the server

// Message to send to the server
const message = Buffer.from('Hello, UDP Server!');

// Send the message to the server
client.send(message, 0, message.length, serverPort, serverAddress, (err) => {
  if (err) {
    console.error('Error sending message: ' + err);
    client.close();
  } else {
    console.log('Message sent to server');
  }
});

// Close the client socket after sending the message
client.close();
