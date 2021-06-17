const express = require("express");
const { ApolloServer, gql, PubSub } = require("apollo-server-express");
const pubsub = new PubSub();
const PORT = 3005;
const typeDefs = gql`
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
    numberIncremented: {
      subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: "/subscriptions",
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Client connected");
    },
    onDisconnect: (webSocket, context) => {
      console.log("Client disconnected");
    },
  },
});

const app = express();
server.applyMiddleware({ app });

let currentNumber = 0;
function incrementNumber() {
  currentNumber++;
  pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
  setTimeout(incrementNumber, 1000);
}

app.listen({ port: 3005 }, () =>
  console.log("Now browse to http://localhost:3005" + server.graphqlPath)
);

incrementNumber();
