const User = require('../../businessLogics/User');
const Auth = require('../../businessLogics/Auth');
const { login, register } = require('../../Validators/User');

const { validator } = require('../../Validators');
const { check } = require('../../Middleware/Authentication');

module.exports = {
  Mutation: {
    login: async (__, body, { auth }) => (await validator(body, login, Auth.login))(body, auth),

    logout: async (_, __, { auth, request }) => (await check(auth, request, Auth.logout))(request, auth),
    createUser: async (_, body) => (await validator(body, register, User.addUser))(body)
  }
};
