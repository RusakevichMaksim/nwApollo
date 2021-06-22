import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  query Book {
    books {
      id
      title
      author
    }
  }
`;
