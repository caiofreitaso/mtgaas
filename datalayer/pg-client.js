`use strict`;

const { Pool } = require('pg');
const dbConfig = require('../config').database;
const logger = require('../utils/logger');

const tag = 'PostgreSQL';

class pgClient {
  constructor(client) {
    logger.out(tag, 'client acquired');
    this.client = client;
  }

  query(text, values) {
    let object = { text, values };

    logger.out(tag, { query: object});

    return this.client.query(object)
      .catch(err => {
        logger.err(tag, { err });
        return Promise.reject(err);
      });
  }

  release() {
    logger.out(tag, 'client released');
    this.client.release();
  }

  begin() {
    logger.out(tag, 'begining transaction');
    return this.client.query('BEGIN')
      .catch(err => {
        logger.err(tag, { err });
        Promise.reject(err);
      });
  }

  commit() {
    let error;

    logger.out(tag, 'committing');

    return this.client.query('COMMIT')
      .catch(errC => {
        logger.err(tag, { err: errC });
        logger.out(out, 'rolling back');

        error = errC;

        return this.client.query(`ROLLBACK`);
      })
      .catch(errR => {
        logger.err(tag, { err: errR });
        error = errR;
      })
      .then(() => this.release())
      .then(() => {
        if (error != undefined) return Promise.reject(error);
        return Promise.resolve();
      });
  }

  rollback(err) {
    let error;

    logger.err(tag, { err });
    logger.out(tag, 'rolling out');

    return this.client.query(`ROLLBACK`)
      .catch(errR => {
        error = errR;

        logger.err(tag, { err: errR });
      })
      .then(() => this.release())
      .then(() => {
        if (error != undefined) return Promise.reject(error);
        return Promise.reject(err);
      });
  }

}

async function getClient() {
  try {
    return new pgClient(await (new Pool(dbConfig).connect()));
  } catch(err) {
    logger.err(tag, { err });
    throw err;
  }
}

async function query(text, values) {
  let client;
  let result;
  let error;

  try {
    client = await getClient();
    result = await client.query(text, values);
  } catch (err) {
    error = err;
  } finally {
    if (client) client.release();
  }

  if (error) throw error;
  return result;
}

module.exports.getClient = getClient;
module.exports.query = query;
