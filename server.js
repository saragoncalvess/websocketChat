const express = require('express');
const app = express();
const http = require('http');
const webSocket = require('ws');

app.use(express.static('./public'));

const server = http.createServer(app);

const wss = new webSocket.Server({
    clientTracking: true,
    server,
});

wss.on('connection', function connection(ws){
    console.log('Client connected');

    ws.on('message', function (message){
        message = JSON.parse(message);
        console.log('msg:', message)
        const time = new Date();
        wss.clients.forEach(client => {
            client.send(`[${time.toLocaleString()}] ${message.name} diz: ${message.text}`)
            console.log('fununcia')
        });
    });
});


server.listen(process.env.PORT || 3000, function() {
    console.log('webserver listening on port 3000')
})

console.log('websocket server listening on port 3002')