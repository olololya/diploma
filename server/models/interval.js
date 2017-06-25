import mongoose, {Schema} from 'mongoose';

const IntervalSchema = new Schema({
    start: {type: String, required: true},
    end: {type: String, required: true}
});

export default mongoose.model('Interval', IntervalSchema);
