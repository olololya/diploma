import * as queries from '../queries/users';

export function getAllUsers(req, res) {
    queries.getAllUsers().then(users => {
        if (!users.length) {
            throw new Error();
        } else {
            res.send(users);
        }
    }).catch(() => {
        res.send('Список пуст');
    });
}

export function getUserByLogin(req, res) {
    const {login} = req.params;

    queries.getUserByLogin(login).then(user => {
        res.send(user);
    }).catch(() => {
        res.send('Пользователь не найден');
    });
}

export function getUserById(req, res) {
    const {id} = req.params;

    queries.getUserById(id).then(user => {
        res.send(user);
    }).catch(() => {
        res.send('Пользователь не найден');
    });
}

export function createUser(req, res) {
    const newUser = req.body;
    const lengthPassword = 3;

    queries.getUserByLogin(newUser.login).then(user => {
        if (user) {
            throw new Error('Логин занят');
        } else {
            if (newUser.password.length >= lengthPassword) {
                return queries.createUser(newUser);
            } else {
                throw new Error(`Минимальная длина пароля ${lengthPassword} `);
            }
        }
    }).then(() => {
        res.send('Регистрация завершена успешно');
    }).catch(error => {
        res.send(error.message);
    });
}

export function deleteUser(req, res) {
    const {id} = req.params;
    queries.getUserById(id).then(user => {
       if (user) {
           return queries.deleteUser(id);
       } else {
           throw new Error(`Пользователь не найден`);
       }
    }).then(() => {
        res.send(`Пользователь успешно удален`);
    }).catch(error => {
        res.send(error.message);
    });
}

