import ApolloClient, {
  InMemoryCache,
  defaultDataIdFromObject,
  Operation,
} from 'apollo-boost';

import { GraphQLError } from 'graphql';
import { GRAPHQL_ENDPOINT } from '../constants/Api';
import { logOut } from '../utils/Auth';

const request = (operation: Operation): void => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

const onError = ({ graphQLErrors, networkError }: any): void => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }: GraphQLError) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
      // handle JWT error from Hasura
      if (message.includes('JWT')) {
        logOut();
        document.location.reload();
      }
      return null;
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
};

const cache = new InMemoryCache({
  dataIdFromObject: (object: any) => {
    switch (object.__typename) {
      default:
        return defaultDataIdFromObject(object);
    }
  },
});

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  request,
  onError,
  cache,
});

export default client;
