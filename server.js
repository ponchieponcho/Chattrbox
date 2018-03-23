const WS = require('ws')

let ws = new WS.Server({port:3001})

ws.on('connection', (client, req) => {
    // RegExp to get the IP from the format "::<forwarded:><IP>"
    let address = /::(.*:)?([0-9.]+)/.exec(req.connection.remoteAddress)[2];
    const ip = req.connection.remoteAddress;
    console.log(`Connection from: ${address}`);

    ws.clients.forEach(client => {
      client.send(`${address} has joined the channel!`);
    })

    client.on('message', message => {
        console.log(message)
    })

    client.on('close', function close() {
        console.log(`${address} has disconnected from the server`);
      });

    
});

