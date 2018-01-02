'use strict'

exports.badGateway = { errorCode: 500, message: 'Bad Gateway' };
exports.badRequest = { errorCode: 400, message: 'Validation Error' };
exports.player = {
  notFound: { errorCode: 404, message: 'Player Not Found' },
  alreadyExists: { errorCode: 409, message: 'Player Already Exists' }
};
exports.deck = {
  notFound: { errorCode: 404, message: 'Deck Not Found' }
};
exports.match = {
  notFound: { errorCode: 404, message: 'Match Not Found' }
};
