const { unauthenticated } = require('../Validators/Errors');

const Logger = use('Logger');
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
    Logger.error(e);
    throw unauthenticated('Missing or invalid jwt token');
  }

  return callback;
}

module.exports = {
  check
};
