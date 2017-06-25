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
    let promise = new Promise();
    switch(type) {
        case 'customer':
            promise = queries.getOrdersForCustomer(id);
            break;
        case 'courier':
            promise = queries.getOrdersForCourier(id);
            break;
    }
    promise.then(orders => {
        res.send(orders);
    }).catch(error => {
        console.log(error);
        res.send([]);
    });
}

export function addOrder(req, res) {
    queries.addOrder(req.body).then(order => {
        res.send(order);
    }).catch(error => {
        console.log(error);
        res.send([]);
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

