import {Schema} from 'mongoose';
import UserModel from '../models/user';
import ProfileModel from '../models/profile';
import TransportTypes from '../models/transportTypes';

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

export function getPersonalProfileById(_id) {
    return ProfileModel.findOne({ _id });
}

export function getTransportTypes() {
    return TransportTypes.find();
}


export function addTransportTypes(data) {
    const types = new TransportTypes({
        code: data.code,
        name: data.name
    });
    return types.save();
}

export function createPersonalProfile() {
    const profile = new ProfileModel();
    return profile.save();
}

export function updateAreas(_id, areas) {
    return ProfileModel.update({ _id }, {$set: { areas }});
}

export function updateTransports(_id, transport) {
    return ProfileModel.update({ _id }, {$set: { transport }});
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


