import ApolloClient, { InMemoryCache, defaultDataIdFromObject } from 'apollo-boost';

import { GRAPHQL_ENDPOINT } from '../constants/Api';
import { logOut } from '../utils/Auth';

const request = (operation: any) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
}

const onError = ({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors)
  graphQLErrors.map(({ message, locations, path }: any) => {
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

  if (networkError) console.log(`[Network error]: ${networkError}`);
}

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
