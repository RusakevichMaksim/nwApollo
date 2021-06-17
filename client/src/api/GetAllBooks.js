import { gql } from "@apollo/client";

export const GetAllBooks = gql`
  query Book {
    books {
      id
      title
      author
    }
  }
`;
