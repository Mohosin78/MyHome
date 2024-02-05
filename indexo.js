const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 443 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Handle incoming signaling messages
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});


console.log("Running Web Socket");
