'use strict';

const pg = require('./pg-client');
const Player = require('../models/player');

exports.addPlayer = async function(player) {
  let sql = '\
    INSERT INTO player\
    (\
      id,\
      name\
    )\
    VALUES\
    (\
      $1\
      $2\
    )\
    RETURNING *';
  let values = [ player.id, player.name ];

  let result;
  try {
    result = await pg.query(sql, values);
    result = result.rows.map(row => new Player(row))[0];
  } catch(err) {
    console.error(`addPlayer error: ${JSON.stringify({ err })}`);
    result = { errorCode: 500 };
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
    result = await pg.query(sql, values);
    result = result.rows.map(row => new Player(row))[0];
  } catch(err) {
    console.error(`updatePlayer error: ${JSON.stringify({ err })}`);
    result = { errorCode: 500 };
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
    console.error(`deletePlayer error: ${JSON.stringify({ err })}`);
    result = { errorCode: 500 };
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
    result = await pg.query(sql, values);
    result = result.rows.map(row => new Player(row))[0];
  } catch(err) {
    console.error(`getPlayer error: ${JSON.stringify({ err })}`);
    result = { errorCode: 500 };
  }

  return result;
};

exports.getPlayers = async function() {
  let sql = 'SELECT * FROM player';

  let result;
  try {
    result = await pg.query(sql);
    result = result.rows.map(row => new Player(row));
  } catch(err) {
    console.error(`getPlayers error: ${JSON.stringify({ err })}`);
    result = { errorCode: 500 };
  }

  return result;
};
