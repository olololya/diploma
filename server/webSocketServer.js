import * as queries from './queries/messages';

import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 9000 });

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(data) {
        queries.createMessage(JSON.parse(data)).then(message => {
            if (!message) {
                throw new Error('ошибка при создании');
            }
        }).catch(error => {
            console.log(error);
        });
    });


});
