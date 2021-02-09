import React, {useState} from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
import {Link as RLink} from 'react-router-dom';

const Heading = (props) => {
    var h = props.h ? props.h : 1;
    return (
    <>
        {h===1 && <h1 {...props}>{props.children}</h1>}
        {h===2 && <h2 {...props}>{props.children}</h2>}
        {h===3 && <h3 {...props}>{props.children}</h3>}
        {h===4 && <h4 {...props}>{props.children}</h4>}
        {h===5 && <h5 {...props}>{props.children}</h5>}
        {h===6 && <h6 {...props}>{props.children}</h6>}
    </>
    )
}
export const Title = styled(Heading)`
    color: rgba(77, 76, 101, 1);
    ${props => props.primary && `color: ${CONSTS.colors.primary};`}
    ${props => props.light && `color: #fff;`}
    ${props => props.center && `text-align: center;`}
    ${props => props.left && `text-align: left;`}
    ${props => props.right && `text-align: right;`}
    ${props => props.m0 && `margin: 0`}
`

const Anchor = ({className, to=null, href=null, onClick, children, style, target}) => {
    const props = {
        className,
        style,
        onClick,
        target
    }
    return(
        <>
            {to && <RLink {...props} to={to}>{children}</RLink>}
            {href && <a {...props} href={href}>{children}</a>}
        </>
    )
};
export const Link = styled(Anchor)`
    font-size: 14px;
    font-weight: 600;
    transition: color .2s;
    display: inline-block;
    ${
        props => 
            props.light && `
                font-weight: lighter;
            `
    }
    ${
        props =>
            props.small && `
                font-size: 11px;
            `
    }
    ${
        props =>
            props.large && `
                font-size: 16px;
            `
    }
    ${props =>
        props.underline ? `` : `
            text-decoration: none;
        `
    }
    color: #333;
    &:hover{
        color: #000;
    }
    ${ props => 
        props.primary &&
        `
            color: ${CONSTS.colors.primary};
            &:hover{
                color: ${CONSTS.colors.primaryDark};
            }
        ` 
    }
    ${ props => 
        props.muted &&
        `
            color: rgba(211, 212, 218, 1);
            &:hover{
                color: #999;
            }
        ` 
    }
    ${ props => 
        props.white &&
        `
            color: #eee;
            &:hover{
                color: #fff;
            }
        ` 
    }
`;

export const Text = styled.p`
    margin: 0;
    color: #333;    
    ${props => {
        return (`
            ${props.muted ? `color: #ccc;` : ""}
            ${props.small ? `
                font-size: 12px;
                line-height: 15px;
            ` : `
                font-size: 14px;
                line-height: 20px;
            `}
            ${props.justify ? `
                text-align: justify;
            ` : ``}
            ${props.left ? `
                text-align: left;
            ` : ``}
            ${props.right ? `
                text-align: right;
            ` : ``}
            ${props.light ? `
                font-weight: lighter;
            ` : ``}
        `)
    }}
`;

export const Span = styled.span`
    ${props => props.error ? `
        color: ${CONSTS.colors.error}
    ` : ``}
    ${props => props.primary ? `
        color: ${CONSTS.colors.primary}
    ` : ``}
`;

export const Label = styled.label`
    margin: 10px 0 5px 5px;
    display: inline-block;
    font-size: 15px
    ${ props => 
        props.muted &&
        `
            color: rgba(211, 212, 218, 1);
        ` 
    }
`;