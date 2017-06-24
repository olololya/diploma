import mongoose, {Schema} from 'mongoose';

const TransportTypesSchema = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true}
});

export default mongoose.model('TransportTypes', TransportTypesSchema);
