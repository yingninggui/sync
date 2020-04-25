const LOCAL_GRAPHQL_ENDPOINT = 'http://localhost:8080/v1/graphql';
const LOCAL_BACKEND_ENDPOINT = 'http://localhost:8081';

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'development' ? LOCAL_GRAPHQL_ENDPOINT : '/graphql';

export const BACKEND_ENDPOINT =
  process.env.NODE_ENV === 'development' ? LOCAL_BACKEND_ENDPOINT : '/api';
