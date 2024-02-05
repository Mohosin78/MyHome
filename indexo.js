const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

io.on('connection', (socket) => {
    console.log('a user connected');

    io.emit("Welcome");

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat', (msg) => {
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
