import * as queries from './queries/messages';

import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 9000 });


wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        queries.createMessage(JSON.parse(data)).then(message => {
            if (!message) {
                throw new Error('ошибка при создании');
            }

            // Broadcast to everyone else.
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
        }).catch(error => {
            console.log(error);
        });
    });
});
