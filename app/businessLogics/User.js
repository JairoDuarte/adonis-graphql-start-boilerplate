const UserModel = use('App/Models/User');
const UserRepository = use('App/repositories/User');

const repository = new UserRepository(UserModel);

async function addUser(data) {
  const user = await repository.insert(data);
  return user;
}

async function getAllUsers() {
  const users = await repository.getAll();
  return users;
}

module.exports = {
  addUser,
  getAllUsers
};
