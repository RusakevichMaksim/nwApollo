const { gql } = require("apollo-server-express");

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
    addBook(onebook: BookInput): Book
    updateBook(book: BookInput): Book
    deleteBook(id: ID): String
  }

  type Subscription {
    messageCreated: Message
  }
`;
module.exports = { typeDefs };
