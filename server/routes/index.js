import express from 'express';
import * as usersRouters from './users';

const router = express.Router();

router.get('/users', usersRouters.getAllUsers);

router.get('/users/login=:login&password=:password', usersRouters.getUserByLoginAndPassword);

router.post('/users/registration', usersRouters.createUser);

router.delete('/users/:id', usersRouters.deleteUser);
router.delete('/users', usersRouters.deleteAllUser);

export default router;
