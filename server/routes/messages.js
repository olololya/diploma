import * as queries from '../queries/messages';

export function getMessagesByUsers(req, res) {
    const {toId: currentUser, fromId: companionUser} = req.body;

    function getMessagesFromUser(messagesToCurrUser) {
        queries.getMessagesByUsers(companionUser, currentUser).then(messagesFromCurrUser => {
            let messages = [];
            if (messagesToCurrUser && messagesToCurrUser.length) {
                messages = messages.concat(messagesToCurrUser);
            }
            if (messagesFromCurrUser && messagesFromCurrUser.length) {
                messages = messages.concat(messagesFromCurrUser);
            }

            messages.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            res.send({data: messages});
        }).catch(() => {
            res.send({data: []});
        });
    }

    queries.getMessagesByUsers(currentUser, companionUser).then(messagesToCurrUser => {
        getMessagesFromUser(messagesToCurrUser);
    }).catch(() => {
        getMessagesFromUser([]);
    });
}

export function getUsers(req, res) {
    const {id} = req.params;

    function getUsersTo(usersFrom) {
        queries.getUsersTo(id).then(usersTo => {
            let users = [];
            if (usersFrom && usersFrom.length) {
                users = users.concat(usersFrom);
            }
            if (usersTo && usersTo.length) {
                users = users.concat(usersTo);
            }

            if (users.length) {
                const obj = {};
                for(let i = 0; i < users.length; i++) {
                    const user = users[i];
                    obj[user] = true;
                }
                users = Object.keys(obj);
            }

            res.send({data: users});
        }).catch(() => {
            res.send({data: []});
        });

    }

    queries.getUsersFrom(id).then(usersFrom => {
        getUsersTo(usersFrom);
    }).catch(() => {
        getUsersTo([]);
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
