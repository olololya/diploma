import express from 'express';
import * as usersRouters from './users';
import * as messagesRouters from './messages';
import * as areasRouters from './areas';
import * as transportRouters from './transports';
import * as ordersRouters from './orders';
import * as weightRouters from './weight';
import * as intervalRouters from './interval';
import * as respondsRouters from './respond';

const router = express.Router();

// USERS
router.get('/users', usersRouters.getAllUsers);
router.get('/transport_types', usersRouters.getTransportTypes);
router.post('/transport_types', usersRouters.addTransportTypes);
router.post('/users/authorization', usersRouters.getUserByLoginAndPassword);
router.post('/users/registration', usersRouters.createUser);
router.post('/users/areas', usersRouters.updateAreasByUser);
router.post('/users/price', usersRouters.updatePriceByUser);
router.get('/users/profile/:id', usersRouters.getUserById);
router.delete('/users/:id', usersRouters.deleteUser);
router.delete('/users', usersRouters.deleteAllUser);

// TRANSPORTS
router.get('/transports', transportRouters.getAllTransports);
router.get('/transport/:id', transportRouters.getTransportsById);
router.post('/transport', transportRouters.addTransport);
router.post('/transport/:id', transportRouters.deleteTransport);
router.delete('/transports', transportRouters.deleteAllTransports);

// MESSAGES
router.get('/messages', messagesRouters.getAllMessages);
router.post('/messages/send', messagesRouters.createMessage);
router.get('/messages/user/:idCurrentUser', messagesRouters.getUsers);
router.post('/messages/setToOld', messagesRouters.setMessageToOld);
router.post('/messages', messagesRouters.getMessagesByUsers);
router.delete('/messages', messagesRouters.deleteAllMessages);

// AREAS
router.get('/areas', areasRouters.getAllAreas);
router.get('/cities', areasRouters.getAllCities);
router.post('/cities/areas', areasRouters.getAreasByCity);
router.post('/areas', areasRouters.addArea);
router.post('/cities', areasRouters.addCity);
router.delete('/areas', areasRouters.deleteAllAreas);
router.delete('/cities', areasRouters.deleteAllCities);

// ORDERS
router.get('/orders', ordersRouters.getAllOrders);
router.get('/order/user/:type/:id', ordersRouters.getOrdersByUser);
router.post('/orders', ordersRouters.addOrder);
router.post('/order/:id', ordersRouters.updateOrder);
router.delete('/order/:id', ordersRouters.deleteOrder);
router.delete('/orders', ordersRouters.deleteAllOrders);

// WEIGHT
router.get('/weights', weightRouters.getAllWeights);
router.post('/weight', weightRouters.addWeight);
router.delete('/orders', weightRouters.deleteAllWeights);

// INTERVAL
router.get('/intervals', intervalRouters.getAllIntervals);
router.post('/interval', intervalRouters.addInterval);
router.delete('/intervals', intervalRouters.deleteAllIntervals);

// RESPONDS
router.get('/responds', respondsRouters.getAllResponds);
router.get('/responds/courier/:courierId', respondsRouters.getRespondsByCourier);
router.get('/responds/order/:orderId', respondsRouters.getRespondsByOrder);
router.post('/respond', respondsRouters.createRespond);
router.delete('/responds', respondsRouters.deleteAllResponds);


export default router;
