module.exports = `
type Query {
  "A simple type for getting started!"
  hello(Id: Int): String
  allUsers: [User]
  user(id: String!): User
}

type User {
  _id: String!
  userName: String!
  email: String!
  firstName: String!
  lastName: String!
}
type Mutation {
  login (email: String!, password: String!): String
  logout (token: String): String
  createUser (userName: String!, email: String!, password: String!, lastName: String!, firstName: String!): User
}
`;
