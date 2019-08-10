// flow
const { merge } = use('lodash');

const { makeExecutableSchema } = use('graphql-tools');
const { schemas } = use('./schemas');
const { userResolver } = use('./resolvers');
const { userMutation } = use('./mutations');

module.exports = makeExecutableSchema({ typeDefs: [...schemas], resolvers: merge(userResolver, userMutation) });
