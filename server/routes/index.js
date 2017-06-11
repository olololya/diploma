import express from 'express';
import * as usersRouters from './users';
import * as messagesRouters from './messages';

const router = express.Router();

router.get('/users', usersRouters.getAllUsers);
router.post('/users/authorization', usersRouters.getUserByLoginAndPassword);
router.post('/users/registration', usersRouters.createUser);
router.post('/users/profile/:id', usersRouters.getUserById);
router.delete('/users/:id', usersRouters.deleteUser);
router.delete('/users', usersRouters.deleteAllUser);


router.get('/messages', messagesRouters.getAllMessages);
router.post('/messages/send', messagesRouters.createMessage);
router.get('/messages/user/:idCurrentUser', messagesRouters.getUsers);
router.post('/messages/setToOld', messagesRouters.setMessageToOld);
router.post('/messages', messagesRouters.getMessagesByUsers);
router.delete('/messages', messagesRouters.deleteAllMessages);

export default router;
