'use strict';

exports.up = function(db) {
  return db.createTable('decklist', {
    id: { type: 'uuid', primaryKey: true, notNull: true },
    quantity: { type: 'smallint', notNull: true },
    card_name: { type: 'string', length: '100', notNull: true },
    deck_id: { type: 'uuid', notNull: true },
    time_created: { type: 'timestamp', notNull: true, defaultValue: new String('current_timestamp') }
  })
  .then(result => db.runSql('\
    ALTER TABLE "decklist"\
    ADD CONSTRAINT "fk__decklist__deck_id__deck__id"\
    FOREIGN KEY ("deck_id")\
    REFERENCES "deck" (id)\
    DEFERRABLE INITIALLY DEFERRED')
  );
};

exports.down = function(db) {
  return db.removeForeignKey('decklist', 'fk__decklist__deck_id__deck__id')
  .then(result => db.dropTable('decklist'));
};

exports._meta = {
  "version": 1
};
