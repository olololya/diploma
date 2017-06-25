import * as queries from '../queries/orders';

export function getAllOrders(req, res) {
    queries.getAllOrders().then(orders => {
        if (orders.length) {
            res.send(orders);
        }
    }).catch(error => {
        console.log(error);
        res.send([]);
    });
}

export function getOrdersByUser(req, res) {
    const {id, type} = req.params;
    queries.getOrdersByUser(id, type).then(orders => {
        res.send(orders);
    }).catch(error => {
        console.log(error);
        res.send([]);
    });
}

export function addOrder(req, res) {
    queries.addOrder(req.body).then(order => {
        res.send({ data: order });
    }).catch(error => {
        console.log(error);
        res.send({ data: [] });
    });
}

export function updateOrder(req, res) {
    const {id} = req.params;

    queries.updateOrder(id, req.body).then(order => {
        res.send(order);
    }).catch(error => {
        console.log(error);
        res.send([]);
    });
}

export function deleteOrder(req, res) {
    const {id} = req.params;
    queries.deleteOrder(id).then(user => {
        res.send(`Заказ успешно удален`);
    }).catch(error => {
        console.log(error);
        res.send('Ошибка при удалении');
    });
}

export function deleteAllOrders(req, res) {
    queries.deleteAllOrders().then(() => {
        res.send(`Заказы успешно удалены`);
    }).catch(error => {
        res.send('Ошибка при удалении');
    });
}

