const User = use('App/Models/User');
const { addUser } = use('App/businessLogic/User');

{
  const { test, afterEach, trait, beforeEach } = use('Test/Suite')('User register');

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
    const CREATE_USER = ` mutation createUser($userName: String!, $email: String!, $password: String!, $lastName: String!, $firstName: String!) {
    createUser(userName: $userName, email: $email, password: $password, lastName: $lastName, firstName: $firstName){
      _id
    }}`;
    userTest.email = 'test';
    const response = await client
      .post('api/v1/graphql')
      .send({ variables: { ...userTest }, query: CREATE_USER })
      .accept('json')
      .end();

    response.assertJSONSubset({ errors: [{ message: 'email validation failed on email' }] });
    response.assertJSONSubset({ errors: [{ extensions: { code: 400 } }] });
  });

  test('should return code 400, fields validation user password not valid', async ({ client }) => {
    const CREATE_USER = ` mutation createUser($userName: String!, $email: String!, $password: String!, $lastName: String!, $firstName: String!) {
    createUser(userName: $userName, email: $email, password: $password, lastName: $lastName, firstName: $firstName){
      _id
    }}`;
    userTest.password = 'test';
    const response = await client
      .post('api/v1/graphql')
      .send({ variables: { ...userTest }, query: CREATE_USER })
      .accept('json')
      .end();

    response.assertJSONSubset({ errors: [{ message: 'min validation failed on password' }] });
    response.assertJSONSubset({ errors: [{ extensions: { code: 400 } }] });
  });

  test('should return code 400, fields validation user email is not unique', async ({ client }) => {
    await addUser(userTest);

    const CREATE_USER = ` mutation createUser($userName: String!, $email: String!, $password: String!, $lastName: String!, $firstName: String!) {
    createUser(userName: $userName, email: $email, password: $password, lastName: $lastName, firstName: $firstName){
      _id
    }}`;
    const response = await client
      .post('api/v1/graphql')
      .send({ variables: { ...userTest }, query: CREATE_USER })
      .accept('json')
      .end();

    response.assertJSONSubset({ errors: [{ message: 'unique validation failed on email' }] });
    response.assertJSONSubset({ errors: [{ extensions: { code: 400 } }] });
  });

  test('should return code 200, user created with success', async ({ client }) => {
    const CREATE_USER = ` mutation createUser($userName: String!, $email: String!, $password: String!, $lastName: String!, $firstName: String!) {
    createUser(userName: $userName, email: $email, password: $password, lastName: $lastName, firstName: $firstName){
      email
    }}`;
    const response = await client
      .post('api/v1/graphql')
      .send({ variables: { ...userTest }, query: CREATE_USER })
      .accept('json')
      .end();

    response.assertStatus(200);
    response.assertJSONSubset({ data: { createUser: { email: userTest.email } } });
  });
}

{
  const { test, afterEach, trait, beforeEach } = use('Test/Suite')('User crud');

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

  test('should return code 200, get all users', async ({ client }) => {
    const user = await addUser(userTest);
    const ALL_USERS = ` query allUsers {  allUsers{ userName email firstName lastName _id }}`;
    const response = await client
      .post('api/v1/graphql')
      .loginVia(user)
      .send({ query: ALL_USERS })
      .accept('json')
      .end();
    response.assertStatus(200);
    response.assertJSONSubset({ data: { allUsers: [{ email: userTest.email }] } });
  });
}
