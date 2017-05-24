import express from 'express';
import bodyParser from 'body-parser';
import * as db from './Utils/dataBaseUtil.js';

db.setUpConnection();
const app = express();

app.use(bodyParser.json());

app.param('login', function (req, res, next, id) {
    console.log('CALLED user/:login');
    next();
});

app.get('/users/:login', (req, res) => {
    console.log('LOGIN:', req.params.login);
    db.getUserByLogin(req.params.login).then(data => {
        console.log('USER BY LOGIN: : ', data);
        res.send(data);
    }).catch(() => {
        res.send('Список пуст');
    });
});

app.get('/users', (req, res) => {
    db.listUsers().then(data => {
        console.log('data: ', data);
        res.send(data);
    }).catch(() => {
        res.send('Список пуст');
    });
});

app.post('/users', (req, res) => {
    console.log('USER_REQ:', req.body);
    db.createUser(req.body).then(data => {
        res.send(data);
    }).catch(() => {
        res.send('При добавлении возникла ошибка');
    });
});

app.delete('/users/:id', (req, res) => {
    db.deleteUser(req.body).then(data => {
        res.send(data);
    }).catch(
        res.send('При удалении возникла ошибка')
    );
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
