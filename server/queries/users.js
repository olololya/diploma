import UserModel from '../models/user';
import ProfileModel from '../models/profile';

export function getAllUsers() {
    return UserModel.find().exec();
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

export function createPersonalProfile() {
    const profile = new ProfileModel();
    return profile.save();
}

export function createUser(data) {
    const user = new UserModel({
        login: data.login,
        password: data.password,
        email: data.email,
        type: data.type,
        dateRegistration: data.dateRegistration,
        firstName: data.firstName,
        secondName: data.secondName,
        personalProfile: data.personalProfile
    });
    return user.save();
}

export function deleteUser(id) {
    return UserModel.findById(id).remove();
}

export function deleteAllUser() {
    return UserModel.remove({});
}


