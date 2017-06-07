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
    queries.getUsersFrom(id).then(users => {
        if (users && users.length) {
            users.map((user) => user.fromId);

            queries.getUsersTo(id).then(usersTo => {
                if (usersTo && usersTo.length) {
                    usersTo.map((user) => user.toId);

                    let usersAll = users.concat(usersTo);
                    const obj = {};
                    for(let i = 0; i < usersAll.length; i++) {
                        const user = usersAll[i];
                        obj[user] = true;
                    }
                    usersAll = Object.keys(obj);

                    res.send({ data: usersAll });
                } else {
                    res.send({ data: users });
                }
            });
        } else {
            res.send({ data: [] });
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
