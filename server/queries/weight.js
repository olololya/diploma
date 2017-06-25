import WeightModel from '../models/weight';
import {Schema} from 'mongoose';

export function getAllWeights() {
    return WeightModel.find();
}

export function addWeight(data) {
    const weight = new WeightModel(data);
    return weight.save();
}

export function deleteAllWeights() {
    return WeightModel.remove({});
}
