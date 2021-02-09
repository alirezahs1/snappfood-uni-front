/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { SideNav, LogoBar, TopBar } from './inc/layouts';
import { Card, Avatar, Title, Breadcrumbs } from 'components/elements';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from 'actions/auth';
import ProductList from './products/list';
import ProductNew from './products/new';
import Settings from './settings/profile';
import OrderList from './orders/list';
import {media} from 'components/shared/mixin';

const Dashboard = ({ className, auth, onLogout }) => {
  const cls = className;
  const [navOpen, setNavOpen] = useState(false);
  if (!auth.logged_in) {
    return <Redirect to="/auth/login/" />;
  }
  return (
    <div className={cls}>
      <div className={`${cls}__sidebar ${navOpen ? 'opened' : ''}`}>
        <LogoBar />
        <SideNav onLogout={onLogout} />
      </div>
      <div className={`${cls}__main`}>
          <div onClick={() => setNavOpen(x => !x)} className={`nav-overlay ${navOpen ? 'active' : ''}`}></div>
        <TopBar auth={auth} onHandlerClick={() => setNavOpen(x => !x)} />
        <div className={`${cls}__main__content`}>
          <Switch>
            <Route exact path="/products/" component={ProductList} />
            <Route exact path="/products/new/" component={ProductNew} />
            <Route exact path="/products/:id/edit/" component={props => <ProductNew edit {...props} />} />

            <Route exact path="/orders/" component={OrderList} />
            
            <Route exact path="/settings/" component={Settings} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
const StyledDashboard = styled(Dashboard)`
  display: flex;
  &__sidebar{
    width: 200px;
    background-color: #fff;
    height: 100vh;
    border-left: 1px solid rgba(0,0, 0, .06);
    box-shadow: 0px 0 15px rgba(0, 0, 0, .05);
    z-index: 12;
    ${media("tablet")`
        position: fixed;
        left: -100%;
        top: 0;
        bottom: 0;
        transition: left .25s;
        &.opened {
            left: 0;
        }
    `}
  }
  .nav-overlay {
      position: fixed;
      z-index: 10;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .5);
      opacity: 0;
      pointer-events:none;
      transition: opacity .25s;
      &.active {
        opacity: 1;
        pointer-events: all;
      }
  }
  &__main{
    background-color: rgba(0, 0, 0, .06);
    flex: 1;
    &__content{
      padding: 25px;
      height: calc( 100vh - 65px );
      overflow: auto;
      &::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #888;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
  }
`;

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logoutAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(StyledDashboard);