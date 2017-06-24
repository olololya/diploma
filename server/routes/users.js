import * as queries from '../queries/users';

export function getAllUsers(req, res) {
    queries.getAllUsers().then(users => {
        if (!users.length) {
            throw new Error();
        } else {
            res.send(users);
        }
    }).catch(() => {
        res.send([]);
    });
}

export function getTransportTypes(req, res) {
    queries.getTransportTypes().then(data => {
        res.send(data);
    }).catch(error => {
        res.send(error);
    });
}

export function addTransportTypes(req, res) {
    queries.addTransportTypes(req.body).then(() => {
        res.send('Тип автомобиля добавлен');
    }).catch(error => {
        res.send(error);
    });
}

export function getUserByLoginAndPassword(req, res) {
    const {login, password} = req.body;

    queries.getUserByLogin(login).then(user => {
        if (user && user.password === password) {
            res.send({
                data: {
                    id: user._id,
                    type: user.type
                }
            });
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

    function getPersonalProfileById(user) {
        queries.getPersonalProfileById(user.personalProfile).then(profile => {
            if (profile) {
                res.send({ user, profile });
            } else {
                res.send({ user });
            }
        }).catch(error => {
            res.send(error);
        });
    }

    queries.getUserById(id).then(user => {
        if (user) {
            user.password = null;
            getPersonalProfileById(user);
        } else {
            throw new Error('Пользователь не найден');
        }
    }).catch(error => {
        res.send(error);
    });
}

export function createUser(req, res) {
    const {login, password, passwordConfirm, lengthPassword, email} = req.body;
    const configLengthPassword = 3;
    queries.getUserByLogin(login).then(user => {
        if (user) {
            throw {message: 'Логин занят', type: 'login'};
        }

        const emailRegExp = /^\w+@\w+\.\w{2,4}$/i;
        if (!emailRegExp.test(email)) {
            throw {message: 'Неправильно введен email', type: 'email'};
        }

        if (lengthPassword < configLengthPassword) {
            throw {message: `Минимальная длина пароля ${configLengthPassword}`, type: 'password'};
        }

        if (password !== passwordConfirm) {
            throw {message: 'Пароли не совпадают', type: 'password'};
        }
        return queries.getUserByEmail(email);
    }).then(user => {
        if (user) {
            throw {message: 'Пользователь с таким email уже зарегистрирован', type: 'email'};
        } else {
            return queries.createPersonalProfile();
        }
    }).then(profile => {
        return queries.createUser({...req.body, personalProfile: profile._id});
    }).then((user) => res.send({
        data: {
            id: user._id,
            type: user.type
        }
    })).catch(error => {
        res.send({ error });
    });
}

export function updateAreasByUser(req, res) {
    const {areas, id} = req.body;

    queries.getUserById(id).then(user => {
        return queries.updateAreas(user.personalProfile, areas);
    }).then(profile => {
        res.send(profile.areas);
    }).catch(error => {
       res.send(error);
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

export function deleteAllUser(req, res) {
    queries.deleteAllUser().then(() => {
        res.send(`Пользователи успешно удалены`);
    }).catch(error => {
        res.send('Ошибка при удалении');
    });
}

