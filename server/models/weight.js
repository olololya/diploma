import mongoose, {Schema} from 'mongoose';

const WeightSchema = new Schema({
    name: {type: String, required: true},
    character: {type: String, required: true},
    code: {type: String, required: true}
});

export default mongoose.model('Weight', WeightSchema);
