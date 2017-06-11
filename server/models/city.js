import mongoose, {Schema} from 'mongoose';

const CitySchema = new Schema({
    name: {type: String, required: true},
    utc: {type: String, required: true},
    country: {type: String, required: true}
});

export default mongoose.model('City', CitySchema);
