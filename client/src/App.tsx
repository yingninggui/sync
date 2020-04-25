import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  HOME_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  SYNC_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
} from './constants/Routes';

import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';

// TODO: Lazy load page components
import HomePage from './components/pages/homePage/HomePage';
import ProfilePage from './components/pages/profilePage/ProfilePage';
import SyncPage from './components/pages/syncPage/SyncPage';
import LoginPage from './components/pages/loginPage/LoginPage';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} component={() => <HomePage />} />
      <Route path={PROFILE_PAGE_ROUTE} component={() => <ProfilePage />} />
      <Route path={SYNC_PAGE_ROUTE} component={() => <SyncPage />} />
      <Route path={LOGIN_PAGE_ROUTE} component={() => <LoginPage />} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
    <Footer />
  </Router>
);

export default App;
