import React from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';

const Avatar = (props) => (
    <div className={props.className} {...props}>
        <img src={props.src}/>
    </div>
)

const StyledAvatar = styled(Avatar)`
    width: ${props => props.size ? props.size : 40}px;
    height: ${props => props.size ? props.size : 40}px;
    border-radius: ${props => props.rounded ? '100%' : 0};
    margin: 0;
    overflow:hidden;
    display: inline-block;
    vertical-align: middle;
    ${props => props.bg && `
        background-color: #eee;
    `}
    
    text-align: center;
    > img{
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        /* background-color: #eee; */
        /* vertical-align: middle; */
    }
`

export default StyledAvatar;