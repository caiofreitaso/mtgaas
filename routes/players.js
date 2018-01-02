'use strict';

const express = require('express');
const players = require('../controllers/players');

let app = new express.Router();

app.get('/', players.home);
app.post('/', players.postPlayer);

app.get('/:id', players.getPlayer);
app.put('/:id', players.putPlayer);

module.exports = app;
