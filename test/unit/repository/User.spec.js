const User = use('App/Models/User');
const UserRepository = use('App/repository/User');

{
  const { test, afterEach, beforeEach } = use('Test/Suite')(' User crud operations');
  const repository = new UserRepository(User);
  let userTest = null;

  beforeEach(() => {
    userTest = {
      email: 'alfred@gmail.com',
      lastName: 'alfred',
      firstName: 'di',
      password: '123456',
      userName: 'alfred'
    };
  });

  afterEach(async () => {
    await User.query().delete();
  });

  test(' add user', async ({ assert }) => {
    const user = await repository.insert(userTest);

    assert.equal(user.email, userTest.email);
    assert.isDefined(user._id);
  });

  test(' get users', async ({ assert }) => {
    await repository.insert(userTest);
    const users = await repository.getAll();

    assert.equal(users.length, 1);
    assert.equal(users[0].email, userTest.email);
  });

  test(' get user by id', async ({ assert }) => {
    const user = await repository.insert(userTest);
    const response = await repository.getById(user._id);

    assert.equal(user.email, response.email);
  });

  test(' delete user', async ({ assert }) => {
    const user = await repository.insert(userTest);
    await repository.delete(user._id);
    const users = await repository.getAll();

    assert.equal(users.length, 0);
  });

  test(' find or create user', async ({ assert }) => {
    const user = await repository.findOrCreate(userTest);
    const sameUser = await repository.findOrCreate(userTest);

    assert.equal(user._id, sameUser._id);
  });

  test(' update user', async ({ assert }) => {
    let user = await repository.insert(userTest);
    assert.equal(user.lastName, userTest.lastName);
    user.lastName = 'update';
    user = await repository.update(user._id, user);

    assert.equal(user.lastName, 'update');
  });
}
