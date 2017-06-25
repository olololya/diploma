import * as queries from '../queries/areas';

export function getAllAreas(req, res) {
   queries.getAllAreas().then((areas) => {
       res.send(areas);
   }).catch((error) => {
       res.send({ error });
   })
}

export function getAllCities(req, res) {
    queries.getAllCities().then((cities) => {
        res.send(cities);
    }).catch((error) => {
        res.send({ error });
    })
}

export function getAreasByCity(req, res) {
    queries.getCityByName(req.body.cityName).then((city) => {
        if (!city) {
            throw new Error('Город не найден');
        } else {
            return queries.getAreasByCity(city._id);
        }
    }).then(areas => {
        res.send({ data: areas });
    }).catch(error => {
        res.send(error);
    });
}

export function addArea(req, res) {
    const {name, cityName} = req.body;
    queries.getCityIdByName(cityName).then((city) => {
        if (!city) {
            throw Error('Страна не найдена');
        } else {
            return queries.createArea(name, city._id);
        }
    }).then((areas) => {
        res.send(areas);
    }).catch((error) => {
        res.send(error);
    })
}

export function addCity(req, res) {
    queries.createCity(req.body).then((city) => {
        res.send(city);
    }).catch((error) => {
        res.send({ error });
    })
}

export function deleteAllAreas(req, res) {
    queries.deleteAllAreas().then(() => {
        res.send(`Районы успешно удалены`);
    }).catch(error => {
        res.send({ error });
    });
}

export function deleteAllCities(req, res) {
    queries.deleteAllCities().then(() => {
        res.send(`Города успешно удалены`);
    }).catch(error => {
        res.send({ error });
    });
}
