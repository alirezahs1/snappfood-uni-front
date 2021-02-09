import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import {Card} from 'components/elements';
import './static/css/styles.css';
import Dashboard from './scenes/dashboard/root';
import Auth from './scenes/auth/root';

const App = ({ className }) => {
  return (
    <div className="App" lang="en" dir="ltr">
      <div id="main" className={className}>
        <Router>
          <Switch>
            <Route path="/auth/" component={Auth} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

const StyledApp = styled(App)`

`;

export default StyledApp;
