/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import backgroundImage from 'static/img/login-bg.jpg';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './login';
import { connect } from 'react-redux';

const Auth = ({ className, auth }) => {
  if (auth.logged_in) {
    return <Redirect to="/" />;
  }
    
  return (
    <div className={className}>
      <div className={`${className}__container`}>
        <Switch>
          <Route path="/auth/login/" exact component={Login} />
        </Switch>
      </div>
    </div>
  );
};

const StyledAuth = styled(Auth)`
  background: #eee;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__container{
    max-width: 400px;
    width: 100%;
    
  }
`;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(StyledAuth);
