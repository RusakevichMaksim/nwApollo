import { gql } from "@apollo/client";
export const ADD_BOOK = gql`
  mutation addBook($onebook: BookInput) {
    addBook(onebook: $onebook) {
      id
      title
      author
    }
  }
`;
