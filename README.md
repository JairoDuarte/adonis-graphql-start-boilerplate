# AdonisJS GraphQL API Start Project
A boilerplate for Node.js web applications, project with opinionated architecture that is used as the basis for new projects.
This is the boilerplate for creating an API server in AdonisJ with GraphQL.

# Motivation
When we start a new api GraphQL with NODEJS is hard to organize the code (mutation, resolvers, schemas) to have a scalable and maintainable architecture, like with MVC or DDD pattern where we are mature. I read a medium posts , books, and GraphQl concept to understand the goal and the best way to structure a GraphQL api, i searched the boilerplate which respect the architecture in this [article](https://graphql.org/learn/thinking-in-graphs/).

> The basic scalable and maintainable architecture for web api

<img src="https://graphql.org/img/diagrams/business_layer.png">

After days searching the best architecture, i found many good architecture for NODEJS and GraphQL, but i was not convinced, well i decided do it, with the best parts of each architecture which i saw, and my opinions and skills 🥇 😎.

## Requirements
>Resources that must be installed for this project to work.

- [node v10+](https://nodejs.org/en/download/)
- [yarn v1.15+](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
- [docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)
  
## Stack
>Primary libs and resources used in this project

1. [Lucid Mongo](https://github.com/duyluonglc/lucid-mongo)
2. [Apollo Server](https://github.com/apollographql/apollo-server)
3. [MongoDB](https://mongodb.com)
4. [Redis](https://redis.io/)
5. [pm2](https://pm2.io/doc/en/runtime/overview/)
6. ESlint
7. Prettier


## Features
>Primary libs and resources used in this project

## Project structure

```
app
├── businessLogics // the single source of truth for enforcing business domain rules
│   ├── User.js
│   └── others logics ...
├── graphql
│   ├── index.js
│   ├── resolvers
│   │   ├── index.js
│   │   ├── User.js
│   │   └── others resolvers...
│   ├── mutations
│   │   ├── index.js
│   │   ├── User.js
│   │   └── others mutations...
│   ├── schemas
│   │   ├── index.js
│   │   ├── User.js
│   │   └── others schemas.....
│   │
├── listeners  // listeners for any events
├── middleware
│   ├── Authentication.js
│   └── others middlewares ...
├── models
│   ├── User.js
│   └── others models ...
├── repositories
│   ├── index.js
│   ├── User.js
│   └── others repositories ...
├── routes
│   ├── index.js
│   ├── playground.js
│   └── others routes ...
├── validators // for propreties validation
│   ├── Errors.js // graphql errors
│   ├── index.js
│   ├── User.js 
│   └── others repositories ...
test
│
config
│
providers
│
start
├── app.js  / server start
├── events.js / events
└── routes.js / global routes config

```

## Running project
This project uses docker-compose to upload all the services it depends on to work.

### dev mode
Up service with auto reload when change source files

```shell
yarn docker:dev
```

### test mode
Up service with auto reload when change source files

```shell
yarn docker:test
```

### prod mode
Up to 2 pm2 service in cluster mode.

```shell
yarn docker:prod
```

> Feel you free to make your pull request, Anyone and everyone is welcome to contribute.