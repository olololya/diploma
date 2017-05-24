import mongoose from 'mongoose';
import '../models/Users';

const Users = mongoose.model('Users');

export function setUpConnection() {
    mongoose.connect(`mongodb://localhost/users`);
}

export function listUsers() {
    return Users.find();
}

export function createUser(data) {
    const user = new Users({
        login: data.login,
        password: data.password
    });
    return user.save();
}

export function deleteUser(id) {
    return Users.findById(id).remove();
    //return Users.remove({});
}

export function getUserByLogin(login) {
    return Users.findOne({ login });
}

