'use strict';

const express = require('express');
const Player = require('../models/player');
const data = require('../datalayer/player');

module.exports.home = async function home(req, res, next) {
  let result = await data.getPlayers();
  let status = result.errorCode ? result.errorCode : 200;

  res.status(status).json(result);
}

module.exports.getPlayer = async function getPlayer(req, res, next) {
  let result = await data.getPlayer(req.params.id);
  let status = result.errorCode ? result.errorCode : 200;

  res.status(status).json(result);
}

module.exports.postPlayer = async function postPlayer(req, res, next) {
  let player = {
     'id': 'meu-id',
     'name': 'player'
  };

  res.json(player);
}
  
module.exports.putPlayer = async function putPlayer(req, res, next) {
  let player = {
     'id': req.params.id,
     'name': 'player'
  };

  res.json(player);
}

