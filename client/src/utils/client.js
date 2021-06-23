import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:3005/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:3005/graphql",
  options: {
    reconnect: true,
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getBook: {
            read: (existing, { toReference, args }) => {
              const bookRef = toReference({ __typename: "Book", id: args.id });
              return existing ?? bookRef;
            },
          },
        },
      },
      Book: {
        keyFields: ["id"],
        fields: {
          Concat: {
            read: (_, { readField }) => {
              const title = readField("title");
              const author = readField("author");
              return `${title} ${author}`;
            },
          },
        },
      },
    },
  }),
});

export default client;
