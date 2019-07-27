const { ApolloError } = require('apollo-server');

function notFound(message = 'Ressource not found') {
  return new ApolloError(message, 404);
}

function unauthenticated(message = 'Unauthenticated user') {
  return new ApolloError(message, 401);
}

function badRequest(message = 'Bad Request') {
  return new ApolloError(message, 400);
}

function unprocessableEntity(message = 'Unprocessable entity') {
  return new ApolloError(message, 422);
}

function internalServer(message = 'Internal Server Error') {
  return new ApolloError(message, 500);
}

module.exports = {
  notFound,
  unauthenticated,
  badRequest,
  unprocessableEntity,
  internalServer
};
