import { gql } from "@apollo/client";

const GetBooks = gql`
  query oneBoks($id: ID) {
    getBook(id: $id) {
      id
      title
      author
    }
  }
`;

export default GetBooks;
