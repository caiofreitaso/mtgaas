'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const player = require('./routes/players');

const config = require('./config');
const logger = require('./utils/logger');

let app = new express();

app.use(bodyParser.json());
app.enable('json escape');

app.use('/players', player);
//app.use('/players', player);
//app.use('/players', player);
//app.use('/players', player);

app.listen(config.port, () => { logger.out('MTGaaS', { port: config.port }); });

