import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

import './webSocketServer';
import './mongoose';


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
    console.log('We are live on ' + port);
});


