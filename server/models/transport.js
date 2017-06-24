import mongoose, {Schema} from 'mongoose';

const TransportSchema = new Schema({
    type: {type: Schema.ObjectId, required: true, ref: 'TransportTypes'},
    number: {type: String, required: true},
    model: {type: String, required: true},
    color: {type: String, required: true},
    date: {type: String, required: true},
    capacity: {type: String, required: true},
    maxDimensions: {type: {
        width: String,
        height: String,
        length: String
    }, required: true}
});

export default mongoose.model('Transport', TransportSchema);
