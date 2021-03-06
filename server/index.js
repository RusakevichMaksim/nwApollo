const express = require("express");
const { createServer } = require("http");
const { PubSub } = require("apollo-server");
const { ApolloServer, gql } = require("apollo-server-express");
const { books } = require("./booksArray");
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
  type autorBookList {
    title: String
  }
  type Book {
    id: ID
    title: String
    author: String
    autorBookList: [autorBookList]
  }

  type Query {
    books(offset: Int!, limit: Int!): [Book]
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
    addBook(onebook: BookInput): String
    updateBook(book: BookInput): Book
    deleteBook(id: ID): String
  }

  type Subscription {
    messageCreated: Message
  }
`;

const resolvers = {
  Query: {
    messages: () => [
      { id: 0, content: "Hello!" },
      { id: 1, content: "Bye!" },
    ],
    books: (parent, arg) => {
      return books.slice(arg.offset, arg.offset + arg.limit);
    },
    getBook: (parent, arg) => {
      let findBook = books.find(({ id }) => arg.id == id);
      var allAutorsBook = books
        .filter((obj) => obj.author === findBook.author)
        .map((obj) => {
          return {
            title: obj.title,
          };
        });
      if (allAutorsBook.length !== 1) {
        findBook.autorBookList = allAutorsBook;
      } else {
        findBook.autorBookList = [];
      }

      return findBook;
    },
  },
  Mutation: {
    addBook: (parent, arg) => {
      books.push(arg.onebook);
      return "book added";
    },
    deleteBook: (parent, arg) => {
      let someBooks = books.filter((item) => item.id < arg.id);
      books.splice(someBooks.length, 1);
      return "book deleted";
    },
    updateBook: (parent, arg) => {
      objIndex = books.findIndex((obj) => obj.id == arg.book.id);
      books[objIndex] = arg.book;
      return books[objIndex];
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
  // console.log("Apollo Server on http://localhost:3005/graphql");
});

let id = 2;

setInterval(() => {
  pubsub.publish(MESSAGE_CREATED, {
    messageCreated: { id, content: new Date().toString() },
  });

  id++;
}, 1000);
