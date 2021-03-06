const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const PubSub = require('graphql-subscriptions').PubSub;
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server is running on port ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
