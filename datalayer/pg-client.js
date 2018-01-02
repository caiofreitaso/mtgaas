'use strict';

const { Pool } = require('pg');
const dbConfig = require('../config').database;

class pgClient {
  constructor(client) {
    console.log('PostgreSQL: client acquired');
    this.client = client;
  }

  query(text, values) {
    let object = { text, values };

    console.log(`PostgreSQL query: ${JSON.stringify(object)}`);

    return this.client.query(object)
      .catch(err => {
        console.error(`PostgreSQL error: ${JSON.stringify({ err })}`);
        return Promise.reject(err);
      });
  }

  release() {
    console.log('PostgreSQL: client released');
    this.client.release();
  }

  begin() {
    console.log('PostgreSQL: begining transaction');
    return this.client.query('BEGIN')
      .catch(err => {
        console.error(`PostgreSQL error: ${JSON.stringify({ err })}`);
        Promise.reject(err);
      });
  }

  commit() {
    let error;

    console.log('PostgreSQL: commiting');

    return this.client.query('COMMIT')
      .catch(errC => {
        console.error(`PostgreSQL error: ${JSON.stringify({ err: errC })}`);
        console.log('PostgreSQL: rolling back');

        error = errC;

        return this.client.query('ROLLBACK');
      })
      .catch(errR => {
        console.error(`PostgreSQL error: ${JSON.stringify({ err: errR })}`);
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

    console.error(`PostgreSQL error: ${JSON.stringify({ err })}`);
    console.log('PostgreSQL: rolling back');

    return this.client.query('ROLLBACK')
      .catch(errR => {
        error = errR;

        console.error(`PostgreSQL error: ${JSON.stringify({ err: errR })}`);
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
    console.error(`PostgreSQL error: ${JSON.stringify({ err })}`);
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
