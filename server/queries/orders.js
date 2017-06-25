import {Schema} from 'mongoose';
import OrderModel from '../models/order';

export function getAllOrders() {
    return OrderModel.find().exec();
}

export function getOrdersForCustomer(id) {
    return OrderModel.find({ customerId: id });
}

export function getOrdersForCourier(id) {
    return OrderModel.find({ courierId: id });
}

export function addOrder(data) {
    const orders = new OrderModel(data);
    return orders.save();
}

export function updateOrder(_id, data) {
    return OrderModel.update({ _id }, {$set: data});
}

export function deleteOrder(id) {
    return OrderModel.findById(id).remove();
}

export function deleteAllOrders() {
    return OrderModel.remove({});
}


