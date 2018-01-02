'use strict';

exports.out = (tag, str) => {
  console.log(`${(new Date()).toISOString()} [${tag}] ${JSON.stringify(str)}`);
}

exports.err = (tag, str) => {
  console.error(`${(new Date()).toISOString()} [${tag}] ${JSON.stringify(str)}`);
}
