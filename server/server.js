import express from 'express';
import bodyParser from 'body-parser';
import './mongoose';
import router from './routes/index';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
    console.log('We are live on ' + port);
});


