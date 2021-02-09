import React, {useState} from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
import Icon from './icon';
import Button from './button';

const Overlay = styled.div`
    position: fixed;
    z-index:1000;
    left:0;
    right:0;
    bottom:0;
    top:0;
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, .3);
    opacity: 0;
    transition: opacity .2s;
    pointer-events: none;
    &.active{
        opacity: 1;
        pointer-events: all;
    }
`;


const Modal = ({className, title, footer, children, active, onToggle, style}) => {
    
    return (
        <>
            <Overlay className={active && "active"} onClick={onToggle}/>
            <div className={`${className} ${active && "active"}`} style={style}>
                <div className="_overlay"></div>
                {title && 
                    <div className="_header">
                        <div className="_title">{title}</div>
                        <div className="_close" onClick={onToggle}>
                            <Icon icon="times" fa />
                        </div>
                    </div>
                }
                <div className="_body">
                    {children}
                </div>
                {footer && 
                    <div className="_footer">
                        {footer}
                    </div>
                }
            </div>
            
        </>
    )
}
const StyledModal = styled(Modal)`
    position: fixed;
    left: 50%;
    top:50%;
    transform:translate(-50%, 50%) scale(0);
    width: 400px;
    max-height: 90vh;
    opacity:0;
    background: #fff;
    border-radius: ${CONSTS.border.radius}px;
    z-index:1001;
    transition: opacity .2s, transform .3s;
    transition-timing-function:ease-out;
    overflow: hidden;
    pointer-events: none;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, .21);
    > ._header{
        height: 40px;
        background-color: rgba(100, 100, 100, .1);
        color: #333;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        > ._title{
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            padding: 0 20px;
            font-size: 14px;
            font-weight: bold;
            color: #555;
        }
        > ._close{
            flex-basis: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            position: relative;
            color: ${CONSTS.colors.greyDark};
            transition: color .2s;
            text-align: center;
            &:hover{
                color: ${CONSTS.colors.greyDarker};
            }
        }
    }
    
    > ._body{
        padding: 15px;
        max-height: calc(90vh - 40px);
        overflow: auto;
        position: relative;
        font-size: 14px;
    }
    > ._footer{
        height: 40px;
        background-color: rgba(100, 100, 100, .1);
        color: #333;
        display: flex;
        align-items: center;
        padding: 0 15px;
        font-size: 14px;
        font-weight: bold;
    }
    &.active{
        opacity: 1;
        transform:translate(-50%, -50%) scale(1);
        pointer-events: all;
    }
`;



const Message = ({title, meta, success, error, onClick, children, className, ...others}) => {
    const cls = success ? 'success' : error ? 'error' : '';
    if(!title){
        title = success ? 'Congratulations!' : error ? 'Oops!' : '';
    }
    const handleClick = () =>{
        if(onClick){
            onClick();
        }
        others.onToggle();
    }
    return (
        <StyledModal {...others} className={`${className} ${className}--${cls}`}>
            <div className='__icon'>
                {success && <Icon fa icon="check" />}
                {error && <Icon fa icon="times" />}
            </div>
            <h4 className="__title">{title}</h4>
            <div className="__subtitle">{meta}</div>
            <div className="__footer">
                <Button small onClick={handleClick}>OK</Button>
            </div>
        </StyledModal>
    )
}
const StyledMessage = styled(Message)`
    text-align: center;
    .__icon{
        text-align: center;
        padding-top: 25px;
        font-size: 40px;
        .fa{
            border: 3px solid;
            padding: 15px;
            border-radius: 100%;
            width: 70px;
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
        }
    }
    .__title{
        margin-bottom: 10px;
        color: #666;
    }
    .__footer{
        padding-top: 20px;
        button{
            margin-left: auto;
            padding-left: 45px;
            padding-right: 45px;
        }
    }
    &--success{
        .__icon{
            color: ${CONSTS.colors.success};
            .fa{
                border-color: ${CONSTS.colors.successLight};
            }
        }
    }
    &--error{
        .__icon{
            color: ${CONSTS.colors.error};
            .fa{
                border-color: ${CONSTS.colors.errorLight};
            }
        }
    }
`;

StyledModal.Message = StyledMessage;

export default StyledModal;