const User = require('../../businessLogics/User');
const Auth = require('../../businessLogics/Auth');
const { login, register } = require('../../Validators/User');
const { validator } = require('../../Validators');
const { check } = require('../../Middleware/Authentication');
const { internalServer, unauthenticated, addMessageError } = require('../../Validators/Errors');

module.exports = {
  Mutation: {
    login: async (__, body, { auth }) => {
      await validator(body, login);
      try {
        const token = await Auth.login(body, auth);
        return token;
      } catch (error) {
        throw addMessageError(unauthenticated, error.message);
      }
    },
    logout: async (_, __, { auth, request }) => (await check(auth, request, Auth.logout))(request, auth),
    createUser: async (_, body) => {
      await validator(body, register);
      try {
        const user = await User.addUser(body);
        return user;
      } catch (error) {
        throw internalServer();
      }
    }
  }
};
