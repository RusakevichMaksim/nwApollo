import { gql } from "@apollo/client";

const COMMENTS_SUBSCRIPTION = gql`
  subscription numberIncremented {
    messageCreated {
      id
      content
    }
  }
`;
export default COMMENTS_SUBSCRIPTION;
