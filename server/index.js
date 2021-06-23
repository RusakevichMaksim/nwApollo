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
    updateBook(book: BookInput): String
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
  {
    id: 11,
    title: "test11",
    author: "auth11",
  },
  {
    id: 12,
    title: "test12",
    author: "auth12",
  },
  {
    id: 13,
    title: "test13",
    author: "auth13",
  },
  {
    id: 14,
    title: "test14",
    author: "auth14",
  },
  {
    id: 15,
    title: "test15",
    author: "auth15",
  },
  {
    id: 16,
    title: "test16",
    author: "auth16",
  },
  {
    id: 17,
    title: "test17",
    author: "auth17",
  },
  {
    id: 18,
    title: "test18",
    author: "auth18",
  },
  {
    id: 19,
    title: "test19",
    author: "auth19",
  },
  {
    id: 20,
    title: "test20",
    author: "auth20",
  },
  {
    id: 21,
    title: "test21",
    author: "auth21",
  },
  {
    id: 22,
    title: "test22",
    author: "auth22",
  },
  {
    id: 23,
    title: "test23",
    author: "auth23",
  },
  {
    id: 24,
    title: "test24",
    author: "auth24",
  },
  {
    id: 25,
    title: "test25",
    author: "auth25",
  },
  {
    id: 26,
    title: "test26",
    author: "auth26",
  },
  {
    id: 27,
    title: "test27",
    author: "auth27",
  },
  {
    id: 28,
    title: "test28",
    author: "auth28",
  },
  {
    id: 29,
    title: "test29",
    author: "auth29",
  },
  {
    id: 30,
    title: "test30",
    author: "auth30",
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
      // books.find(({ id }) => console.log(arg.id == id, "aaa"));
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
    updateBook: (parent, arg) => {
      objIndex = books.findIndex((obj) => obj.id == arg.book.id);
      books[objIndex] = arg.book;
      console.log(books);
      return "update";
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
