import logger from './config/winston';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import schema from './schema/root-schema';
import resolvers from './resolvers/root-resolver';
import models from './models/root-model';

const app = express();
app.use(cors());

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
  }),
});
server.applyMiddleware({ app, path: '/graphql' });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const port = process.env.PORT || 8000;
app.listen({ port }, () => logger.debug(`Server be jammin' on http://localhost:${port}${server.graphqlPath}`));
