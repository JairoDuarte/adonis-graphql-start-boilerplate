const Logger = use('Logger');
const Event = use('Event');

const { unauthenticated } = require('../Validators/Errors');

async function login({ email, password }, auth) {
  try {
    const data = await auth.withRefreshToken().attempt(email, password);
    Logger.info('user %j loged', email);
    return data.token;
  } catch (e) {
    throw unauthenticated('Invalid user password or email');
  }
}

async function logout(request, auth) {
  let authorization = request.header('authorization');
  authorization = authorization.split(' ');
  const [, token] = authorization;

  Event.fire('user::logout', { auth, token });

  return 'user logout with success';
}

module.exports = { login, logout };
