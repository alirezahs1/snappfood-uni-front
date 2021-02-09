import React from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
import Icon from './icon';
import {Link} from './typography';


const BreadcrumbsItem = ({className, children, to, icon }) => {
    return(
        <li className={className}>
            <Link to={to}>
                {children}
            </Link>
        </li>
    )
}
const StyledBreadcrumbsItem = styled(BreadcrumbsItem)`
    display: inline-block;
    padding: 13px 20px;
    border-radius: 35px;
    box-shadow: 5px 0 5px 0px rgba(0, 0, 0, .08);
    a:hover{
        color: #000;
    }
`

const Breadcrumbs = ({className, children}) => {
    return(
        <ul className={className}>
            <StyledBreadcrumbsItem to="/">
                <Icon style={{marginRight:7}} fa icon="home" />
                Home
            </StyledBreadcrumbsItem>
            {children}
        </ul>
    )
}
const StyledBreadcrumbs = styled(Breadcrumbs)`
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    background-color: ${CONSTS.colors.primaryDark};
    color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    a{
        color: #fff;
    }
    width: fit-content;
    border-radius: 25px;
    overflow: hidden;
    li:first-child{
        border-radius: 25px;
        background-color: #fff;
        a{
            color: ${CONSTS.colors.secondary};
        }
    }
    
`
StyledBreadcrumbs.Item = StyledBreadcrumbsItem;

export default StyledBreadcrumbs;