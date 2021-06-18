import { gql } from "@apollo/client";

const updateBook = gql`
  mutation updateBook($book: BookInput) {
    updateBook(book: $book)
  }
`;

export default updateBook;
