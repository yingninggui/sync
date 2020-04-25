import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HOME_PAGE_ROUTE, PROFILE_PAGE_ROUTE, SYNC_PAGE_ROUTE } from './constants/Routes';
import { PAGE_CONTENT_WIDTH } from './constants/Styles';

import HomePage from './components/pages/HomePage';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';

const App = () => (
  <Router>
    <Navbar />
    <PageWrapper>
      <Switch>
        <Route exact path={HOME_PAGE_ROUTE} component={() => <HomePage />} />
        <Route path={PROFILE_PAGE_ROUTE} component={() => <div />} />
        <Route path={SYNC_PAGE_ROUTE} component={() => <div />} />
        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </PageWrapper>
    <Footer />
  </Router>
);

export default App;

const PageWrapper = styled.div`
  padding: 24px;
  margin: auto;
  max-width: ${PAGE_CONTENT_WIDTH}px;
  width: 100%;
`;
