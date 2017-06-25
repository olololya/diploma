import mongoose, {Schema} from 'mongoose';

const RespondSchema = new Schema({
    courierId: {type: Schema.ObjectId, required: true, ref: 'User'},
    orderId: {type: Schema.ObjectId, required: true, ref: 'Order'}
});

export default mongoose.model('Respond', RespondSchema);
