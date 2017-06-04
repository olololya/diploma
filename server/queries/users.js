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

export function getUserByEmail(email) {
    return UserModel.findOne({ email });
}

export function createUser(data) {
    const user = new UserModel({
        login: data.login,
        password: data.password,
        email: data.email,
        type: data.type,
        dateRegistration: data.dateRegistration,
        firstName: data.firstName,
        secondName: data.secondName
    });
    return user.save();
}

export function deleteUser(id) {
    return UserModel.findById(id).remove();
}

export function deleteAllUser() {
    return UserModel.remove({});
}


