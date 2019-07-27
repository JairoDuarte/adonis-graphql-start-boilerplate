const Env = use('Env');
const Redis = use('Redis');

async function logout({ token, auth }) {
  const user = await auth.getUser();
  await Redis.set(token, user.email, 'EX', Env.get('TOKEN_EXPIRE'));
}

module.exports = {
  logout
};
