const { internalServer, addMessageError } = require('../../Validators/Errors');
const { check } = require('../../Middleware/Authentication');

const User = use('App/businessLogics/User');

module.exports = {
  Query: {
    allUsers: async (_, __, { auth, request }) => {
      await check(auth, request);
      try {
        const users = await User.getAllUsers();
        return users;
      } catch (e) {
        throw addMessageError(internalServer, e.message);
      }
    }
  }
};
