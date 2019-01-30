import express from 'express';
import bodyParser from 'body-parser';
// import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { ApolloServer } from 'apollo-server-express';

import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';


import schema from './schema/root-schema';
import resolvers from './resolvers/root-resolver';
import models from './models/root-model';

const app = express();

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    return {
      models
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// mongoose.connect('mongodb://localhost/test');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// const ICO = mongoose.model('ICO', { address: String, currency: String, value: Number, txid: String });

const port = process.env.PORT || 8000;



// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { ICO } }));

// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
