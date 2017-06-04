import * as queries from '../queries/messages';

export function getMessages(req, res) {
    const {id} = req.params;
    queries.getMessagesForId(id).then(messagesArray => {
        if (messagesArray && messagesArray.length) {
            const messages = {};
            for (let i = 0; i < messagesArray.length; i++) {
                const {fromId, message, date} = messagesArray[i];
                if (!messages[fromId]) {
                    messages[fromId] = [];
                }
                messages[fromId].push({ message, date });
            }
            res.send({ data: messages });
        } else {
            const message = 'Сообщений не найдено';
            throw {message};
        }
    }).catch((error) => {
        res.send({ error });
    });
}

export function getAllMessages(req, res) {
    queries.getAllMessages().then(messages => {
        if (!messages.length) {
            throw new Error();
        } else {
            res.send(messages);
        }
    }).catch(() => {
        res.send('Список пуст');
    });
}

export function createMessage(req, res) {
    queries.createMessage(req.body).then(message => {
        if (message) {
            res.send('Сообщение создано');
        } else {
            throw new Error('ошибка при создании');
        }

    }).catch(error => {
        res.send(error);
    });
}
