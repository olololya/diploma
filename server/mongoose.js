import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/diploma');
const db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});

db.once('open', function callback () {
    console.log("Connected to DB!");
});
