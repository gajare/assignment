const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const app = express();
const errorHandler = require('errorhandler');
const cors = require('cors');

require('./connections/mongo')

app.use(helmet());
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
    app.use(errorHandler());
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use('/doc', express.static(path.join(__dirname + '/apidoc')));

app.use(cors({
    "origin": "*",
    "methods": "GET,PUT",
    "exposedHeaders": "Content-Type, Authorization, X-Requested-With, Accept"
}));

//PROJECT
app.use(require('./controllers/client'));

module.exports.app = app;
