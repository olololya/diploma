// import * as dbUsers from '../utils/dbUsersUtil.js';
// dbUsers.setUpConnection();
import User from '../models/User';
import mongoose from 'mongoose';

import '../models/User';


export function getUserById(req, res) {
    User.setUpConnection();
    User.getUserByLogin(req.params.login).then(data => {
        console.log('USER BY LOGIN: ', data);
        res.send(data);
    }).catch(() => {
        res.send('Пользователь с таким логином не найден');
    });
}

export function getAllUsers (req, res) {
    mongoose.connect(`mongodb://localhost/users`);
    User.getAllUsers().then(data => {
        console.log('ALL USERS: ', data);
        res.send(data);
    }).catch(() => {
        res.send('Пользователи не найдены');
    });
}

export function createUser (req, res) {
    console.log('CREATE USER:', req.body);
    User.createUser(req.body).then(data => {
        res.send(data);
    }).catch(() => {
        res.send('При добавлении возникла ошибка');
    });
}

export function deleteUser (req, res) {
    console.log('DELETE USER:', req.body);
    dbUsers.deleteUser(req.body).then(data => {
        res.send(data);
    }).catch(
        res.send('При удалении возникла ошибка')
    );
}
