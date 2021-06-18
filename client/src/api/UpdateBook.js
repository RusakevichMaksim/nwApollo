import { gql } from "@apollo/client";

const UPDATE_BOOK = gql`
  mutation updateBook($book: BookInput) {
    updateBook(book: $book)
  }
`;

export default UPDATE_BOOK;
