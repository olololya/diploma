import mongoose, {Schema} from 'mongoose';

const ProfileSchema = new Schema({
    transport: {
        type: [{ type: Schema.ObjectId, required: true, ref: 'Transport'}],
        required: false
    },
    areas: {
        type: [{ type: Schema.ObjectId, required: true, ref: 'Area'}],
        required: false
    },
    price: {type: String, required: false}
});

export default mongoose.model('Profile', ProfileSchema);
