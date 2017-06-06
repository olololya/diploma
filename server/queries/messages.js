import MessageModel from '../models/message';

export function getUsersFrom(id) {
    return MessageModel.distinct('fromId', { toId: id });
}

export function getUsersTo(id) {
    return MessageModel.distinct('toId', { fromId: id });
}

export function getMessagesByUsers(toId, fromId) {
    return MessageModel.find({ toId, fromId });
}

export function getAllMessages() {
    return MessageModel.find();
}

export function createMessage(data) {
    const message = new MessageModel({
        fromId: data.fromId,
        toId: data.toId,
        message: data.message,
        date: data.date
    });
    return message.save();
}

export function deleteAllMessages() {
    return MessageModel.remove({});
}
