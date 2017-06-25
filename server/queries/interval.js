import IntervalModel from '../models/interval';
import {Schema} from 'mongoose';

export function getAllIntervals() {
    return IntervalModel.find();
}

export function addInterval(data) {
    const interval = new IntervalModel(data);
    return interval.save();
}

export function deleteAllIntervals() {
    return IntervalModel.remove({});
}
