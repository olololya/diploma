import mongoose, {Schema} from 'mongoose';

const MessageSchema = new Schema({
    fromId: {type: String, required: true},
    toId: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: String, required: true},
    status: {type: String, required: true}
});

export default mongoose.model('Message', MessageSchema);
