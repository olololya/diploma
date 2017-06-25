import RespondModel from '../models/respond';
import {Schema} from 'mongoose';

export function getAllResponds() {
    return RespondModel.find();
}

export function getRespondsByCourier(courierId) {
    return RespondModel.find({ courierId });
}

export function getRespondsByOrder(orderId) {
    return RespondModel.findOne({ orderId });
}

export function createRespond(data) {
    const respond = new RespondModel(data);
    return respond.save();
}

export function deleteAllResponds() {
    return RespondModel.remove({});
}
