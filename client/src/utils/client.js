import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
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

const test = {
  typePolicies: {
    books: {
      keyFields: ["code"],
    },
  },
};

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Book: {
        fields: {
          Concat: {
            read: (_, { readField }) => {
              console.log("asdds");
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
