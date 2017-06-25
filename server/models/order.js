import mongoose, {Schema} from 'mongoose';

const OrderSchema = new Schema({
    status: {type: String, required: true},
    dateCreation: {type: String, required: true},
    customerId: {type: Schema.ObjectId, required: true, ref: 'User'},
    courierId: {type: Schema.ObjectId, required: false, ref: 'User'},
    description: {type: String, required: true},
    maxPrice: {type: String, required: true},
    weight: {type: Schema.ObjectId, required: true, ref: 'Weight'},
    dateToSend: {type: String, required: true},
    timeToSend: {type: Schema.ObjectId, required: true, ref: 'Interval'},
    sendAddress: {type: {
        city: {type: Schema.ObjectId, required: true, ref: 'City'},
        area: {type: Schema.ObjectId, required: true, ref: 'Area'},
        street: {type: String, required: true},
        house: {type: String, required: true},
        apartament: {type: String, required: false}
    }, required: true},
    receiptAddress: {type: {
        city: {type: Schema.ObjectId, required: true, ref: 'City'},
        area: {type: Schema.ObjectId, required: true, ref: 'Area'},
        street: {type: String, required: true},
        house: {type: String, required: true},
        apartament: {type: String, required: false}
    }, required: true},
    recipientInfo: {type: {
        fio: {type: String, required: true},
        phone: {type: String, required: true}
    }, required: true},
    phoneCustomer: {type: String, required: true}
});

export default mongoose.model('Order', OrderSchema);
