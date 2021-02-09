import React from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
import Icon from './icon';

const Button = ({className, children, icon, ...props}) => {
    return(
        <button className={`${className} ${icon ? className + '--icon' : ''}`} {...props}>
            {icon ? <Icon fa icon={icon} /> :
                children}
        </button>
    )
}


const StyledButton = styled(Button)`
    padding: 8px 20px;
    background-color: ${CONSTS.colors.primary};
    border: none;
    border-radius: ${CONSTS.border.radius}px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-family:inherit;
    font-weight: normal;
    cursor: pointer;
    transition: background-color .2s, color .2s;
    margin: ${props => props.block ? "5px 0" : "5px"};
    ${props => props.block ? `
        display: block;
        width: 100%;
    ` : ""}
    
    &:hover{
        background-color: ${CONSTS.colors.primaryDark};
    }
    &:focus{
        outline: none;
    }
    [class*="icon"]{
        margin-top: 1px;
        margin-right: 5px;
    }
    &--icon{
        [class*="icon"]{
            margin-top: 0px;
            margin-right: 0px;
        }
        padding: 10px 15px;
        font-size: 20px;
    }
    
    ${props => (`
        ${props.success ? `
            background: ${CONSTS.colors.success};
            &:hover{
                background: ${CONSTS.colors.successDark};
            }
        ` : ``}
        ${props.error ? `
            background: ${CONSTS.colors.error};
            &:hover{
                background: ${CONSTS.colors.errorDark};
            }
        ` : ``}
        ${props.secondary ? `
            background: ${CONSTS.colors.secondary};
            &:hover{
                background: ${CONSTS.colors.secondaryDark};
            }
        ` : ``}
        ${props.outline ? `
            background: transparent;
            border:2px solid ${CONSTS.colors.primary};
            color: ${CONSTS.colors.primary};
            &:hover{
                color: #fff;
            }
        ` : ``}
        ${props.link ? `
            border: none;
            display: inline-block;
            background: transparent;
            padding: 5px 10px;
            color: ${CONSTS.colors.primary};
            &:hover{
                color: ${CONSTS.colors.primaryDark};
                background: transparent;
            }
        ` : ``}
        ${props.small ? `
            padding: 5px 10px;
            font-size: 14px;
            &--icon{
                font-size: 14px;
                padding: 5px 8px;
            }
        ` : `
        `}
    `)}
`;

export default StyledButton;