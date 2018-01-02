'use strict';

exports.up = function(db) {
  return db.createTable('match', {
    id: { type: 'uuid', primaryKey: true, notNull: true },
    deck1: { type: 'uuid', notNull: true },
    deck2: { type: 'uuid', notNull: true },
    wins1: { type: 'smallint', notNull: true },
    wins2: { type: 'smallint', notNull: true }
  })
  .then(result => db.runSql('\
    ALTER TABLE "match"\
    ADD CONSTRAINT "fk__match__deck1__deck__id"\
    FOREIGN KEY ("deck1")\
    REFERENCES "deck" (id)\
    DEFERRABLE INITIALLY DEFERRED')
  )
  .then(result => db.runSql('\
    ALTER TABLE "match"\
    ADD CONSTRAINT "fk__match__deck2__deck__id"\
    FOREIGN KEY ("deck2")\
    REFERENCES "deck" (id)\
    DEFERRABLE INITIALLY DEFERRED')
  );
};

exports.down = function(db) {
  return db.removeForeignKey('match', 'fk__match__deck1__deck__id')
  .then(result => db.removeForeignKey('match', 'fk__match__deck2__deck__id'))
  .then(result => db.dropTable('match'));
};

exports._meta = {
  "version": 1
};
