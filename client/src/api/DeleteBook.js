import { gql } from "@apollo/client";

export const DeleteBooks = gql`
  mutation deleteBook($id: ID) {
    deleteBook(id: $id)
  }
`;
