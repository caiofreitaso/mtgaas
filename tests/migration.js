'use strict';

/* global describe,it */

const exec = require('child_process').exec;

describe('DB: Migrations', () => {
  it('migrate up, then reset, and up again', (done) => {
    exec('npm run migrate up', (err, stdout, stderr) => {
      if (err) done(err);
    });
    exec('npm run migrate reset', (err, stdout, stderr) => {
      if (err) done(err);
    });
    exec('npm run migrate up', (err, stdout, stderr) => {
      if (err) done(err);
    });

    done();
  });
});
