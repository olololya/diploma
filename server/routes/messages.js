import * as queries from '../queries/messages';

export function getMessagesByUsers(req, res) {
    const {toId, fromId} = req.body;
    queries.getMessagesByUsers(toId, fromId).then(messages => {
        if (messages && messages.length) {
           // messages.map((elem) => { return { text: elem.message, date: elem.date }});
            res.send({ data: messages });
        } else {
            const message = 'Сообщений не найдено';
            throw {message};
        }
    }).catch((error) => {
        res.send({ error });
    });
}

export function getUsers(req, res) {
    const {id} = req.params;
    queries.getUsers(id).then(users => {
        if (users && users.length) {
            users.map((user) => user.fromId);
            res.send({ data: users });
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
        if (messages && messages.length) {
            res.send({ data: messages });
        } else {
            throw new Error();
        }
    }).catch(() => {
        res.send('Список пуст');
    });
}

export function createMessage(req, res) {
    queries.createMessage(req.body).then(message => {
        if (message) {
            res.send({ message });
        } else {
            throw new Error('ошибка при создании');
        }

    }).catch(error => {
        res.send(error);
    });
}

export function deleteAllMessages(req, res) {
    queries.deleteAllMessages().then(() => {
        res.send(`Сообщения успешно удалены`);
    }).catch(error => {
        res.send('Ошибка при удалении');
    });
}
