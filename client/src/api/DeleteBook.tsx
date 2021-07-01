import { gql } from "@apollo/client";

export const DELETE_BOOKS = gql`
  mutation deleteBook($id: ID) {
    deleteBook(id: $id)
  }
`;
