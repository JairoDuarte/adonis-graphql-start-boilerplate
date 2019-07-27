const { unauthenticated } = require('../../Validators/Errors');
const { check } = require('../../Middleware/Authentication');

const User = use('App/businessLogic/User');

//const userBusiness = new User();

module.exports = {
  Query: {
    allUsers: async (_, __, { auth, request }) => {
      try {
        await check(auth, request);

        const users = await User.getAllUsers();
        return users;
      } catch (e) {
        throw unauthenticated('Missing or invalid jwt token');
      }
    }
  }
};
