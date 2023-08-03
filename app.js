const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const apiRouter = require('./routes/api');
const logger = require('./services/logger.service');
const cors = require('./middleware/cors.middleware');

app.use(logger());
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

module.exports = app;
