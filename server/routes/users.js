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

export function getUserByLoginAndPassword(req, res) {
    const {login, password} = req.params;

    queries.getUserByLogin(login).then(user => {
        if (user && user.password === password) {
            res.send({ id: user._id});
        } else {
            const message = user ? 'Неверно введен пароль' : 'Пользователь не найден';
            const type = user ? 'password' : 'login';
            throw {message, type};
        }
    }).catch((error) => {
        res.send({ error });
    });
}

export function getUserById(req, res) {
    const {id} = req.params;

    queries.getUserById(id).then(user => {
        if (user) {
            res.send(user);
        } else {
            throw new Error('Пользователь не найден');
        }
    }).catch((error) => {
        res.send({errorMessage: error.message});
    });
}

export function createUser(req, res) {
    const {login, password, passwordConfirm, lengthPassword} = req.body;
    const configLengthPassword = 3;

    queries.getUserByLogin(login).then(user => {
        if (user) {
            throw {message: 'Логин занят', type: 'login'};
        }

        if (lengthPassword < configLengthPassword) {
            throw {message: `Минимальная длина пароля ${configLengthPassword} `, type: 'password'};
        }

        if (password !== passwordConfirm) {
            throw {message: 'Пароли не совпадают', type: 'password'};
        }

        return queries.createUser(req.body);
    }).then((user) => res.send({ id: user._id}))
      .catch(error => res.send({ error }));
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

export function deleteAllUser(req, res) {
    queries.deleteAllUser().then(() => {
        res.send(`Пользователи успешно удалены`);
    }).catch(error => {
        res.send('Ошибка при удалении');
    });
}

