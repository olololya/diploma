import mongoose, {Schema} from 'mongoose';

const AreaSchema = new Schema({
    name: {type: String, required: true},
    city: {type: Schema.ObjectId, required: true, ref: 'City'}
});

export default mongoose.model('Area', AreaSchema);
