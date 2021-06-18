import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query oneBoks($id: ID) {
    getBook(id: $id) {
      id
      title
      author
    }
  }
`;

export default GET_BOOKS;
