const express = require("express");
const { createServer } = require("http");
const { PubSub } = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");
const { books } = require("./books");
const app = express();
const pubsub = new PubSub();
const MESSAGE_CREATED = "MESSAGE_CREATED";
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const User = require("./User");
const Message = require("./Message");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log(req.headers);
    const token = req.headers.authorization;
    const currentUser = User.getUserByToken(token);
    return { user: currentUser, User, Message };
  },
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 3005 }, () => {
  // console.log("Apollo Server on http://localhost:3005/graphql");
});

let id = 2;

setInterval(() => {
  pubsub.publish(MESSAGE_CREATED, {
    messageCreated: { id, content: new Date().toString() },
  });

  id++;
}, 1000);
