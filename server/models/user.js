import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    type: {type: String, required: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    dateRegistration: {type: String, required: false},
    lastName: {type: String, required: false},
    bDate: {type: String, required: false},
    place: {type: String, required: false},
    numOrders: {type: String, required: false},
    rating: {type: String, required: false}
});

export default mongoose.model('User', UserSchema);
