import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  query Book($offset: Int!, $limit: Int!) {
    books(offset: $offset, limit: $limit) {
      id
      title
      author
    }
  }
`;
// export const GET_ALL_BOOKS = gql`
//   query Book {
//     books {
//       id
//       title
//       author
//     }
//   }
// `;
