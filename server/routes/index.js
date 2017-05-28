import express from 'express';
import * as usersRouters from './users';

const router = express.Router();

router.get('/users', usersRouters.getAllUsers);

router.get('/users/:login', usersRouters.getUserByLogin);

router.post('/users', usersRouters.createUser);

router.delete('/users/:id', usersRouters.deleteUser);

export default router;
