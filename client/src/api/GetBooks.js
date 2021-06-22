import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBook($id: ID) {
    getBook(id: $id) {
      id
      title
      author
      Concat @client
    }
  }
`;

export default GET_BOOKS;
