const User = use('App/Models/User');
const { addUser } = use('App/businessLogic/User');

{
  const { test, afterEach, trait, beforeEach } = use('Test/Suite')('User login');

  trait('Test/ApiClient');
  let userTest = null;

  beforeEach(() => {
    userTest = {
      email: 'alfred@gmail.com',
      lastName: 'alfred',
      firstName: 'duarte',
      password: '12345678',
      userName: 'alfred'
    };
  });

  afterEach(async () => {
    await User.query().delete();
  });

  test('should return code 400, fields validation user email not valid', async ({ client }) => {
    const LOGIN = ` mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password)}`;
    userTest.email = 'test';
    const response = await client
      .post('api/v1/graphql')
      .send({ variables: { email: userTest.email, password: userTest.password }, query: LOGIN })
      .accept('json')
      .end();
    response.assertJSONSubset({ errors: [{ message: 'email validation failed on email' }] });
    response.assertJSONSubset({ errors: [{ extensions: { code: 400 } }] });
  });

  test('should return code 400, fields validation user email not exist', async ({ client }) => {
    const LOGIN = ` mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)}`;
    const response = await client
      .post('api/v1/graphql')
      .send({ variables: { email: userTest.email, password: userTest.password }, query: LOGIN })
      .accept('json')
      .end();

    response.assertJSONSubset({ errors: [{ message: 'exist validation failed on email' }] });
    response.assertJSONSubset({ errors: [{ extensions: { code: 400 } }] });
  });

  test('should return code 400, fields validation user password not valid', async ({ client }) => {
    await addUser(userTest);
    const LOGIN = ` mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)}`;
    userTest.password = 'test';
    const response = await client
      .post('api/v1/graphql')
      .send({ variables: { email: userTest.email, password: userTest.password }, query: LOGIN })
      .accept('json')
      .end();

    response.assertJSONSubset({ errors: [{ message: 'min validation failed on password' }] });
    response.assertJSONSubset({ errors: [{ extensions: { code: 400 } }] });
  });

  test('should return code 200, user login with success', async ({ client, assert }) => {
    await addUser(userTest);
    const LOGIN = ` mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)}`;

    const response = await client
      .post('api/v1/graphql')
      .send({ variables: { email: userTest.email, password: userTest.password }, query: LOGIN })
      .accept('json')
      .end();
    response.assertStatus(200);
    assert.isDefined(response.body.data.login);
  });
}

{
  const { test, afterEach, trait, beforeEach } = use('Test/Suite')('User logout');

  trait('Test/ApiClient');
  trait('Auth/Client');
  let userTest = null;

  beforeEach(() => {
    userTest = {
      email: 'alfred@gmail.com',
      lastName: 'alfred',
      firstName: 'duarte',
      password: '12345678',
      userName: 'alfred'
    };
  });

  afterEach(async () => {
    await User.query().delete();
  });

  test('should return code 401, authentication required or token is missing', async ({ client }) => {
    const LOGOUT = ` mutation logout{logout}`;
    userTest.email = 'test';
    const response = await client
      .post('api/v1/graphql')
      .send({ query: LOGOUT })
      .accept('json')
      .end();
    response.assertJSONSubset({ errors: [{ message: 'Missing or invalid jwt token' }] });
    response.assertJSONSubset({ errors: [{ extensions: { code: 401 } }] });
  });

  test('should return code 200, user logout with success', async ({ client, assert }) => {
    const user = await addUser(userTest);
    const LOGOUT = ` mutation logout{logout}`;

    const response = await client
      .post('api/v1/graphql')
      .loginVia(user)
      .send({ query: LOGOUT })
      .accept('json')
      .end();
    response.assertStatus(200);
    assert.isDefined(response.body.data);
    response.assertJSONSubset({ data: { logout: 'user logout with success' } });
  });
}
