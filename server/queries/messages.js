import MessageModel from '../models/message';

export function getMessagesForId(id) {
    return MessageModel.find({ toId: id });
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
