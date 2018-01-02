'use strict';

const express = require('express');

class Players {
  static home(req, res, next) {
    let list = [
      {
         'id': 'meu-id',
         'name': 'player'
      }
    ];
  
    res.json(list);
  }
  
  static getPlayer(req, res, next) {
    let player = {
       'id': req.params.id,
       'name': 'player'
    };
  
    res.json(player);
  }
  
  static postPlayer(req, res, next) {
    let player = {
       'id': 'meu-id',
       'name': 'player'
    };
  
    res.json(player);
  }
  
  static putPlayer(req, res, next) {
    let player = {
       'id': req.params.id,
       'name': 'player'
    };
  
    res.json(player);
  }
}

module.exports = Players;
