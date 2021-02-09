import React, { useState } from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
// import {Link} from 'react-router-dom';
import { Link } from './typography';
import Icon from './icon';

const NavItem = ({ children, icon, href = null, to = null, onClick = null }) => {
  const path = to ? to : href;
  // const active = window.location.pathname.startsWith(path);
  const active = window.location.pathname == (path);
  const content = <>
    {icon && <Icon className='_icon' fa icon={icon} />}
    <span className="_label">{children}</span>
  </>
  return (
    <li className={active ? "active" : ""} onClick={onClick}>
      {(to || href) ? <Link to={to} href={href}>
        {content}
      </Link> : content}
    </li>
  )
}
const Nav = ({ className, children }) => (
  <div className={className}>
    <ul>
      {children}
    </ul>
  </div>
)
Nav.Item = NavItem;

const StyledNav = styled(Nav)`
    > ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        border: 1px solid rgba(0, 0, 0, .05);
        li{
            cursor: pointer;
            background-color: #fff;
            transition: background-color .25s;
            &:hover{
                background-color:rgba(0, 0, 0, .02);
                ._label, ._icon{
                    color:#666;
                }    
            }
            a{
                text-decoration: none;
                display: block;
                padding: 15px 20px;
            }
            ._label, ._icon{
                font-size: 14px;
                font-weight: 400;
                transition: color .2s;
                transition: color .25s;
                color: #777;
            }
            ._label{
                margin-left: 7px;
            }
            &.active{
                background-color: #EAF0F4;
                ._label, ._icon{
                    font-weight: bold;
                }
            }
        }
    }
    ${CONSTS.selectors.rtl}{
        ._label{
            margin-left: 0;
            margin-right : 7px;
        }
    }
`

export default StyledNav;