const express = require("express");
const { createServer } = require("http");
const { PubSub } = require("apollo-server");
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();

const pubsub = new PubSub();
const MESSAGE_CREATED = "MESSAGE_CREATED";

const typeDefs = gql`
  type Message {
    id: String
    content: String
  }
  type Author {
    name: String
    books: [Book]
  }
  type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]
    authors: [Author]
    getBook(id: ID): Book
    messages: [Message!]!
  }
  input BookInput {
    id: ID
    title: String
    author: String
  }
  type Mutation {
    addBook(onebook: BookInput): Book
    deleteBook(id: ID): String
  }

  type Subscription {
    messageCreated: Message
  }
`;
const books = [
  {
    id: 1,
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: 2,
    title: "City of Glass",
    author: "Paul Auster",
  },
  {
    id: 3,
    title: "test3",
    author: "auth3",
  },
  {
    id: 4,
    title: "test4",
    author: "auth4",
  },
  {
    id: 5,
    title: "test5",
    author: "auth5",
  },
  {
    id: 6,
    title: "test6",
    author: "auth6",
  },
  {
    id: 7,
    title: "test7",
    author: "auth7",
  },
  {
    id: 8,
    title: "test8",
    author: "auth8",
  },
  {
    id: 9,
    title: "test9",
    author: "auth9",
  },
  {
    id: 10,
    title: "test10",
    author: "auth10",
  },
];
const resolvers = {
  Query: {
    messages: () => [
      { id: 0, content: "Hello!" },
      { id: 1, content: "Bye!" },
    ],
    books: () => books,
    getBook: (parent, arg) => {
      books.find(({ id }) => console.log(arg.id == id, "aaa"));
      return books.find(({ id }) => arg.id == id);
    },
  },
  Mutation: {
    addBook: (parent, arg) => {
      console.log(arg);
      return books.push(arg.onebook);
    },
    deleteBook: (parent, arg) => {
      let someBooks = books.filter((item) => item.id < arg.id);
      books.splice(someBooks.length, 1);
      return "book deleted";
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 3005 }, () => {
  console.log("Apollo Server on http://localhost:3005/graphql");
});

let id = 2;

setInterval(() => {
  pubsub.publish(MESSAGE_CREATED, {
    messageCreated: { id, content: new Date().toString() },
  });

  id++;
}, 1000);
