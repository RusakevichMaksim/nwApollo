const { gql } = require("apollo-server-express");

const typeDefs = gql`
  directive @auth(requires: Role!) on FIELD_DEFINITION
  enum Role {
    ADMIN
    OWNER
    USER
  }

  type Message {
    id: ID
    receiverId: ID
    senderId: ID
    text: String
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    roles: [Role] @auth(requires: ADMIN)
    message(id: ID!): Message @auth(requires: OWNER)
  }

  type MessageWS {
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
    messages: [MessageWS!]!
    currentUser: User @auth(requires: USER)
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
    messageCreated: MessageWS
  }
`;
module.exports = { typeDefs };
