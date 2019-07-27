// flow
/** @type {typeof import('./node_modules/@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route');
const { graphqlAdonis } = use('apollo-server-adonis');
const schema = use('App/graphql/');

Route.group('api', () => {
  Route.route(
    '/graphql',
    ({ request, response, auth }) =>
      graphqlAdonis({
        schema,
        debug: false,
        context: { auth, request }
      })({ request, response }),
    ['GET', 'POST']
  );
}).prefix('/api/v1');
