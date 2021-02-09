import React from 'react';
import styled from 'styled-components';
import { Nav, Link, Icon } from 'components/elements';
import LogoImage from 'static/img/logo.png';
import CONSTS from 'components/elements/_constants';
import {media} from 'components/shared/mixin';

const LogoBarComp = ({className}) => (
  <div className={className}>
    SnappFood
  </div>
);
export const LogoBar = styled(LogoBarComp)`
  /* height: 50px; */
  padding: 15px 25px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, .03);
  font-weight: 900;
  letter-spacing: 4px;
  color: #999;
`;

const TopBarComp = ({className, auth, onHandlerClick}) => (
  <div className={className}>
      <div className="handler" onClick={onHandlerClick}><Icon fa icon="bars" /></div>
    <div>{auth?.user?.first_name} {auth?.user?.last_name}</div>
  </div>
);
export const TopBar = styled(TopBarComp)`
  height: 65px;
  background-color: #fff;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 25px;
  border-bottom: 1px solid rgba(0,0, 0, .06);
  box-shadow: 0px 0 15px rgba(0, 0, 0, .05);
  text-align: left;
  .handler {
      display: none;
      ${media("tablet")`
        display: block
      `}
  }
  &__messages{
    a{
      color: ${CONSTS.colors.greyDark};
    }
  }
`;

const SideNavComp = ({ className, onLogout }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure to log out of your account?')) {
      return;
    }
    onLogout();
  };
  return (
    <Nav style={{ border: '1px solid' }}>
      <Nav.Item icon="dashboard" to="/">Dashboard</Nav.Item>
      <Nav.Item icon="th-large" to="/products/">Products</Nav.Item>
      <Nav.Item icon="list" to="/orders/">Orders</Nav.Item>
      <Nav.Item icon="cogs" to="/settings/">Settings</Nav.Item>
      <Nav.Item href="#" icon="angle-right" onClick={handleLogout}>Logout</Nav.Item>
    </Nav>
  );
};
export const SideNav = styled(SideNavComp)``;
