import express from 'express';
import * as usersRouters from './users';
import * as messagesRouters from './messages';
import * as areasRouters from './areas';

const router = express.Router();

// USERS
router.get('/users', usersRouters.getAllUsers);
router.post('/users/authorization', usersRouters.getUserByLoginAndPassword);
router.post('/users/registration', usersRouters.createUser);
router.post('/users/areas', usersRouters.updateAreasByUser);
router.get('/users/profile/:id', usersRouters.getUserById);
router.delete('/users/:id', usersRouters.deleteUser);
router.delete('/users', usersRouters.deleteAllUser);

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

export default router;
