import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import * as SWRTC from '@andyet/simplewebrtc';

import apolloClient from './graphql/Apollo';
import App from './App';
import Theme from './constants/Theme';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = SWRTC.createStore();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
