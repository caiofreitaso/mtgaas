'use strict';

exports.up = function(db) {
  return db.createTable('player', {
    id: { type: 'uuid', primaryKey: true, notNull: true },
    name: { type: 'string', length: '50',  notNull: true }
  });
};

exports.down = function(db) {
  return db.dropTable('player');
};

exports._meta = {
  "version": 1
};
