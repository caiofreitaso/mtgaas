'use strict';

const exec = require('child_process').exec;
const { host, port, database, user, password } = require('./config').database;

let databaseUrl = `postgresql://${user}:${password}@${host}:${port}/${database}`;

process.env.DATABASE_URL = databaseUrl;

let parameters = process.argv.slice(2);
let dbMigrateParameters = parameters.map(p => ` ${p}`).join('');
let command = 'db-migrate'.concat(dbMigrateParameters);

console.log(command);

exec(command, (err, stdout, stderr) => {
  if (err) console.error(`error ${err}`);
  console.log(stdout);
  console.error(stderr);
});
