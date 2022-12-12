const express = require('express');
const app = express();
const http = require('http');
const { emit } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('new user connected!');
    io.emit('user_connect', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('user_disconnect', socket.id);
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3000');
});