'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const player = require('./routes/players');

let app = new express();

app.use(bodyParser.json());
app.enable('json escape');

app.use('/players', player);
//app.use('/players', player);
//app.use('/players', player);
//app.use('/players', player);

app.listen(8080, () => { console.log('listening'); });

