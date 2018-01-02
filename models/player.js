'use strict';

class Player {
  constructor(id, name) {
    if (id instanceof Object) {
      name = id.name;
      id = id.id;
    }

    this.id = id;
    this.name = name;
  }
}

exports = Player;
