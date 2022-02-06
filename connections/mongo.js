var mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', false);

var db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.info('MongoDB connection is established.');
});

db.on('disconnected', (error) => {
    console.error('MongoDB disconencted!');
    console.error('ERROR: ', error);
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, { server: { auto_reconnect: true } });
});

db.on('reconnected', () => {
    console.info('MongoDB reconnected!');
});

