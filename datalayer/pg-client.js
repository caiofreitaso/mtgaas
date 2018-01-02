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

function getClient() {
  return (new Pool(dbConfig)).connect()
    .then(client => new pgClient(client))
    .catch(err => {
      console.error(`PostgreSQL error: ${JSON.stringify({ err })}`);
      Promise.reject(err);
    });
}

function query(text, values) {
  let client;
  return getClient()
    .then(newClient => { client = newClient; })
    .then(() => client.query(text, values))
    .then(result => {
      client.release();
      return result;
    })
    .catch(err => {
       client.release();
       Promise.reject(err);
    });
}

module.exports.getClient = getClient;
module.exports.query = query;
