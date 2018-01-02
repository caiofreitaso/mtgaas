'use strict';

const pg = require('./pg-client');
const uuid = require('uuid');
const Player = require('../models/player');
const Errors = require('../models/errors');
const logger = require('../utils/logger');

exports.addPlayer = async function(player) {
  let sql = '\
    INSERT INTO player\
    (\
      id,\
      name\
    )\
    VALUES\
    (\
      $1,\
      $2\
    )\
    RETURNING *';
  let values = [ uuid(), player.name ];

  let result;
  try {
    result = (await pg.query(sql, values)).rows.map(row => new Player(row));
    result = result.length > 0 ? result[0] : Errors.badGateway;
  } catch(err) {
    logger.err('addPlayer', { err });
    result = Errors.badGateway;
  }

  return result;
};

exports.updatePlayer = async function(id, newName) {
  let sql = '\
    UPDATE player\
    SET\
      name = $1\
    WHERE\
      id = $2\
    RETURNING *';
  let values = [ newName, id ];

  let result;
  try {
    result = (await pg.query(sql, values)).rows.map(row => new Player(row));
    result = result.length > 0 ? result[0] : Errors.player.notFound;
  } catch(err) {
    logger.err('updatePlayer', { err });
    if (err.routine == 'string_to_uuid') result = Errors.player.notFound;
    else result = Errors.badGateway;
  }

  return result;
}

exports.deletePlayer = async function(id) {
  let sql = '\
    DELETE FROM player\
    WHERE\
      id = $1';
  let values = [ id ];

  try {
    await pg.query(sql, values);
  } catch(err) {
    logger.err('deletePlayer', { err });
    if (err.routine == 'string_to_uuid') result = Errors.player.notFound;
    else result = Errors.badGateway;
  }

  return result;
};

exports.getPlayer = async function(id) {
  let sql = '\
    SELECT * FROM player\
    WHERE\
      id = $1';
  let values = [ id ];

  let result;
  try {
    result = (await pg.query(sql, values)).rows.map(row => new Player(row));
    result = (result.length > 0) ? result [0] : Errors.player.notFound;
  } catch(err) {
    logger.err('getPlayer', { err });
    if (err.routine == 'string_to_uuid') result = Errors.player.notFound;
    else result = Errors.badGateway;
  }

  return result;
};

exports.getPlayers = async function() {
  let sql = 'SELECT * FROM player';

  let result;
  try {
    result = (await pg.query(sql)).rows.map(row => new Player(row));
  } catch(err) {
    logger.err('getPlayers', { err });
    result = Errors.badGateway;
  }

  return result;
};
