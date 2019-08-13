const { unauthenticated, addMessageError } = require('../Validators/Errors');

const Redis = use('Redis');

async function check(auth, request, callback) {
  let token = null;
  try {
    await auth.check();
    let authorization = request.header('authorization');
    authorization = authorization.split(' ');
    [, token] = authorization;

    const isDeleted = await Redis.get(token);
    if (isDeleted !== null) {
      throw new Error('token in blacklist');
    }
  } catch (e) {
    throw addMessageError(unauthenticated, e.message);
  }

  return callback;
}

module.exports = {
  check
};
