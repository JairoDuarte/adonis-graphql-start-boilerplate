const register = {
  email: 'email|unique:users',
  password: 'required|min:8|max:256',
  userName: 'min:4|unique:users',
  lastName: 'min:4',
  firstName: 'min:4'
};
const login = {
  email: 'required|email|exist:users',
  password: 'required|min:8|max:256'
};

module.exports = {
  register,
  login
};
