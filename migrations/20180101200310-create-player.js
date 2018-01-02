'use strict';

exports.up = function(db) {
  return db.createTable('player', {
    name: { type: 'string', length: '50', primaryKey: true, notNull: true }
  });
};

exports.down = function(db) {
  return db.dropTable('player');
};

exports._meta = {
  "version": 1
};
