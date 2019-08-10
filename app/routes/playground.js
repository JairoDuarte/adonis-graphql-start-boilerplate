// flow
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route');
const Env = use('Env');
const { renderPlaygroundPage } = use('graphql-playground-html');

const graphQLPlayground = function graphQLPlayground(options) {
  const graphqlPlaygroundHandler = ctx => {
    const middlewareOptions = {
      ...options,
      version: 1.0
    };
    const { response, params } = ctx;
    if (params.secret !== Env.get('DOC_SECRET')) {
      return response.status(401).json({ message: 'token is required to see docs' });
    }
    const playground = renderPlaygroundPage(middlewareOptions);
    return response.type('text/html').send(playground);
  };
  return graphqlPlaygroundHandler;
};

Route.get('/api/v1/doc/:secret', graphQLPlayground({ endpoint: '/api/v1/graphql' }));
