import AreaModel from '../models/area';
import CityModel from '../models/city';
import {DBRef, Schema} from 'mongoose';

export function getAllAreas() {
    return AreaModel.find();
}

export function getAreasByCity(city) {
    return AreaModel.find({ city });
}

export function getCityByName(name) {
    return CityModel.findOne({ name });
}

export function getAllCities() {
    return CityModel.find();
}

export function getCityIdByName(name) {
    return CityModel.findOne({ name });
}

export function createArea(name, city) {
    const area = new AreaModel({
        name,
        city
    });
    return area.save();
}

export function createCity(data) {
    const city = new CityModel({
        name: data.name,
        utc: data.utc,
        country: data.country
    });
    return city.save();
}

export function deleteAllAreas() {
    return AreaModel.remove({});
}

export function deleteAllCities() {
    return CityModel.remove({});
}
