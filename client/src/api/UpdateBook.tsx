import { gql } from "@apollo/client";

const UPDATE_BOOK = gql`
  mutation updateBook($book: BookInput) {
    updateBook(book: $book) {
      id
      title
      author
    }
  }
`;

export default UPDATE_BOOK;
