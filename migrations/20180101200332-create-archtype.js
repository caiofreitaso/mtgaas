'use strict';

exports.up = function(db) {
  return db.createTable('archtype', {
    name: { type: 'string', length: '50', primaryKey: true, notNull: true }
  });
};

exports.down = function(db) {
  return db.dropTable('archtype');
};

exports._meta = {
  "version": 1
};
