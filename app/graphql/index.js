// flow
const { merge } = use('lodash');

const { makeExecutableSchema } = use('graphql-tools');
const { schemas } = use('./schema');
const { userResolver } = use('./resolver');
const { userMutation } = use('./mutation');

module.exports = makeExecutableSchema({ typeDefs: [...schemas], resolvers: merge(userResolver, userMutation) });
