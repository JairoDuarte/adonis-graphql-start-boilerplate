/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
  connection: 'redis',

  redis: {
    port: Env.get('REDIS_PORT'), // Redis port
    host: Env.get('REDIS_HOST'), // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: Env.get('REDIS_PASSWORD'),
    db: 0
  },

  redisAlternate: {
    port: 6380, // Redis port
    host: '127.0.0.1', // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: 'auth',
    db: 0
  }
};
