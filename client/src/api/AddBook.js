import { gql } from "@apollo/client";
export const AddBook = gql`
  mutation addBook($onebook: BookInput) {
    addBook(onebook: $onebook) {
      title
    }
  }
`;
