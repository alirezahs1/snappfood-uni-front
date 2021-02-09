import React from 'react';
import styled from "styled-components"
import Icon from './icon';
import CONSTS from './_constants';

const Spin = ({className, children, active}) => (
    <div className={`${className} ${active ? 'active' : ''}`}>
        <Icon className="_icon" icon="spinner" />
        {children}
    </div>
)

const StyledSpin = styled(Spin)`
    position: relative;
    @keyframes spin { 100% {transform:rotate(360deg); } }
    & > ._icon{
        position: absolute;
        left: calc(50% - 12.5px);
        top: calc(50% - 12.5px);
        font-size: 20px;
        width: 25px;
        height: 25px;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        color: ${CONSTS.colors.primary};
        transform: rotate(0) ;
        animation:spin 2s linear infinite;
        z-index: 1;
        display: none;
    }
    &::after{
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(255, 255, 255, .8);
        opacity:0;
        pointer-events: none;
        
    }
    &.active{
        &::after{
            opacity: 1;
            pointer-events: all;
        }
        ._icon{
            display: flex;
        }
    }
`

export default StyledSpin;