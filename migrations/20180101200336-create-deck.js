'use strict';

exports.up = function(db) {
  return db.createTable('deck', {
    id: { type: 'uuid', primaryKey: true, notNull: true },
    name: { type: 'string', length: '50', notNull: true },
    player_name: { type: 'string', length: '50', notNull: true },
    archtype_name: { type: 'string', length: '50' },
    time_created: { type: 'timestamp', notNull: true, defaultValue: new String('current_timestamp') }
  })
  .then(result => db.runSql('\
    ALTER TABLE "deck"\
    ADD CONSTRAINT "fk__deck__player_name__player__name"\
    FOREIGN KEY ("player_name")\
    REFERENCES "player" (name)\
    DEFERRABLE INITIALLY DEFERRED')
  )
  .then(result => db.runSql('\
    ALTER TABLE "deck"\
    ADD CONSTRAINT "fk__deck__archtype_name__archtype__name"\
    FOREIGN KEY ("archtype_name")\
    REFERENCES "archtype" (name)\
    DEFERRABLE INITIALLY DEFERRED')
  );
};

exports.down = function(db) {
  return db.removeForeignKey('deck', 'fk__deck__player_name__player__name')
  .then(result => db.removeForeignKey('deck', 'fk__deck__archtype_name__archtype__name'))
  .then(result => db.dropTable('deck'));
};

exports._meta = {
  "version": 1
};
