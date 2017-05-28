import UserModel from '../models/user';

export function getAllUsers() {
    return UserModel.find();
}

export function getUserByLogin(login) {
    return UserModel.findOne({ login });
}

export function getUserById(id) {
    return UserModel.findById(id);
}

export function createUser(data) {
        const user = new UserModel({
        login: data.login,
        password: data.password
    });
    return user.save();
}

export function deleteUser(id) {
    return UserModel.findById(id).remove();
}


