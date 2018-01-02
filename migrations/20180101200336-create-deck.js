'use strict';

exports.up = function(db) {
  return db.createTable('deck', {
    id: { type: 'uuid', primaryKey: true, notNull: true },
    name: { type: 'string', length: '50', notNull: true },
    player_id: { type: 'uuid', notNull: true },
    archtype_id: { type: 'uuid' },
    time_created: { type: 'timestamp', notNull: true, defaultValue: new String('current_timestamp') }
  })
  .then(result => db.runSql('\
    ALTER TABLE "deck"\
    ADD CONSTRAINT "fk__deck__player_id__player__id"\
    FOREIGN KEY ("player_id")\
    REFERENCES "player" (id)\
    DEFERRABLE INITIALLY DEFERRED')
  )
  .then(result => db.runSql('\
    ALTER TABLE "deck"\
    ADD CONSTRAINT "fk__deck__archtype_id__archtype__id"\
    FOREIGN KEY ("archtype_id")\
    REFERENCES "archtype" (id)\
    DEFERRABLE INITIALLY DEFERRED')
  );
};

exports.down = function(db) {
  return db.removeForeignKey('deck', 'fk__deck__player_id__player__id')
  .then(result => db.removeForeignKey('deck', 'fk__deck__archtype_id__archtype__id'))
  .then(result => db.dropTable('deck'));
};

exports._meta = {
  "version": 1
};
