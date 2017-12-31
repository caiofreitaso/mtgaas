'use strict';

const express = require('express');

let app = new express.Router();

app.get('/', home);
app.post('/', postPlayer);

app.get('/:id', getPlayer);
app.put('/:id', putPlayer);

function home(req, res, next) {
  let list = [
    {
       'id': 'meu-id',
       'name': 'player'
    }
  ];

  res.json(list);
}

function getPlayer(req, res, next) {
  let player = {
     'id': req.params.id,
     'name': 'player'
  };

  res.json(player);
}

function postPlayer(req, res, next) {
  let player = {
     'id': 'meu-id',
     'name': 'player'
  };

  res.json(player);
}

function putPlayer(req, res, next) {
  let player = {
     'id': req.params.id,
     'name': 'player'
  };

  res.json(player);
}

module.exports = app;
