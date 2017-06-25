import * as queries from '../queries/respond';

export function getAllResponds(req, res) {
   queries.getAllResponds().then(responds => {
       res.send(responds);
   }).catch(error => {
       res.send([]);
   })
}

export function getRespondsByCourier(req, res) {
    const {courierId} = req.params;
    queries.getRespondsByCourier(courierId).then(responds => {
        res.send(responds);
    }).catch(error => {
        res.send([]);
    })
}

export function getRespondsByOrder(req, res) {
    const {orderId} = req.params;
    queries.getRespondsByOrder(orderId).then(responds => {
        res.send(responds);
    }).catch(error => {
        res.send([]);
    })
}

export function createRespond(req, res) {
    queries.createRespond(req.body).then(respond => {
        res.send({ data: respond });
    }).catch((error) => {
        res.send(error);
    })
}

export function deleteAllResponds(req, res) {
    queries.deleteAllResponds().then(() => {
        res.send(`Отклики успешно удалены`);
    }).catch(error => {
        res.send({ error });
    });
}
