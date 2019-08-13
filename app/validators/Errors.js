const { ApolloError } = require('apollo-server');

const Logger = use('Logger');

const notFound = (message = 'Ressource not found') => new ApolloError(message, 404);

const unauthenticated = (message = 'Missing or invalid jwt token') => new ApolloError(message, 401);

const badRequest = (message = 'Bad Request') => new ApolloError(message, 400);

const unprocessableEntity = (message = 'Unprocessable entity') => new ApolloError(message, 422);

const internalServer = (message = 'Internal Server Error') => new ApolloError(message, 500);

function addMessageError(error, message) {
  if (message.includes('PasswordMisMatchException')) {
    Logger.error(message);
    return error('invalid password');
  }
  if (message.includes('Topology was destroyed') || message.includes('failed to connect to server')) {
    Logger.error(message);
    return internalServer();
  }
  if (message.includes('validation')) {
    return error(message);
  }

  return error();
}

module.exports = {
  addMessageError,
  notFound,
  unauthenticated,
  badRequest,
  unprocessableEntity,
  internalServer
};
