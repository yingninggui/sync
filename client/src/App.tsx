import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  HOME_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  SYNC_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
} from './constants/Routes';

import Navbar from './components/navigation/Navbar';

// TODO: Lazy load page components
import HomePage from './components/pages/homePage/HomePage';
import ProfilePage from './components/pages/profilePage/ProfilePage';
import SyncPage from './components/pages/syncPage/SyncPage';
import LoginPage from './components/pages/loginPage/LoginPage';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path={LOGIN_PAGE_ROUTE} component={() => null} />
      <Route component={Navbar} />
    </Switch>
    <Switch>
      <Route path={SYNC_PAGE_ROUTE} component={SyncPage} />
      <Route path={PROFILE_PAGE_ROUTE} component={ProfilePage} />
      <Route path={LOGIN_PAGE_ROUTE} component={LoginPage} />
      <Route exact path={HOME_PAGE_ROUTE} component={HomePage} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
  </Router>
);

export default App;
