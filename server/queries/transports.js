import TransportModel from '../models/transport';
import {Schema} from 'mongoose';

export function getAllTransports() {
    return TransportModel.find();
}

export function getTransportsById(_id) {
    return TransportModel.findOne({ _id });
}

export function createTransport(data) {
    const transport = new TransportModel(data);
    return transport.save();
}

export function deleteTransportById(id) {
    return TransportModel.findById(id).remove();
}

export function deleteAllTransports() {
    return TransportModel.remove({});
}
