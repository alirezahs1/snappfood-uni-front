import React, { useState } from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
import {_}  from './../../inc/functions';
import {Icon, Label, Modal} from '.';
import Button from './button';
// import {DynamicCreateInner} from '../../scenes/dashboard/dynamic-create';
import DateTimePicker from 'react-datetime-picker';
import { Text } from './typography';

const commonStyles = (props, selector) => (`
    position: relative;
    ${props.small && `
        margin-left: 4px;
        margin-right: 4px;
    `}
    > ._icon{}
    > ._icon{
        position: absolute;
        left: ${props.small ? '8' : '15'}px;
        top: 50%;
        transform: translateY(-50%);
        color: ${CONSTS.colors.secondary};
        font-size: 14px;
    }
    > ${selector}{
        background: transparent;
        ${
            props.small ? `
                padding: 8px 15px;
                font-size: 14px;
            ` : `
                padding: 8px 15px;
                width: 100%;
                font-size: 14px;
            `
        }
        ${
            props.icon ? `padding-left: ${props.small ? '25' : '45'}px;` : ''
        }
        border: 1px solid rgba(100, 100, 100, .2);
        color: #666;
        border-radius: ${CONSTS.border.radius}px;
        box-sizing: border-box;
        margin-top:5px;
        margin-bottom:5px;

        &:focus ~ ._icon{
            color: ${CONSTS.colors.secondaryDark};
        }
        &:focus{
            outline: none;
            border-color: rgba(100, 100, 100, .4);
            color: #333;
            
        }
        ::placeholder{
            color:#999;
        }
    }
    ${props.error ? `
        > ${selector}, > ._icon{
            border-color: ${CONSTS.colors.error} !important;
            color: ${CONSTS.colors.error} !important;
            ::placeholder{
                color: ${CONSTS.colors.error};
            }
        }
    ` : ``}
`)

const Input = (props) => (
    <div className={props.className}>
        <input {...props} className=""/>
        {props.icon && <Icon className="_icon" icon={props.icon} fa />}
    </div>
)
const StyledInput = styled(Input)`
    ${props => commonStyles(props, "input")}
`;

const HiddenInput = (props) => (
    <input {...props} className=""/>
)
StyledInput.Hidden = HiddenInput;

const Textarea = (props) => (
    <div className={props.className}>
        <textarea {...props} className="" >{props.value}</textarea>
    </div>
)
const StyledTextarea = styled(Textarea)`
    ${props => commonStyles(props, "textarea")}
    > textarea{
        resize: vertical;
        min-height: 100px;
    }
`
StyledInput.Textarea = StyledTextarea;


const Select = props => (
    <div className={props.className}>
        <select {...props} className="">
            <option selected hidden>{props.placeholder ? props.placeholder : 'انتخاب کنید'}</option>
            {props.options && props.options.map((opt, i)=>(
                <option key={i} value={opt.value }>{opt.label}</option>
            ))}
        </select>
    </div>
)
const StyledSelect = styled(Select)`
    ${props => commonStyles(props, "select")}
`
StyledInput.Select = StyledSelect;


const Radio = props => {
    const def = props.value ? props.value : (props.defaultValue ? props.defaultValue : "");
    return(
        <div className={props.className}>
            {props.options && props.options.map((opt, i) => (
                <Label className="_item">
                    <input {...props} value={opt.value} className="" type="radio" checked={opt.value==def}/>
                    {opt.label}
                </Label>
            ))}
        </div>
    )
}
const StyledRadio = styled(Radio)`
    ${props => commonStyles(props, "label")}
    > label{
        padding: 10px 15px;
        cursor: pointer;
        input{
            margin-right: 10px;
            position: relative;
            width: 12px;
            height: 0;
            &::after{
                position: absolute;
                content: '';
                right: 0;
                bottom: 0;
                border-radius: 2px;
                width: 10px;
                height: 10px;
                background-color: transparent;
                border: 1px solid #999;
                transition: background .25s, border-color .25s;
            }
            &:checked{
                &::after{
                    background-color: ${CONSTS.colors.primaryDark};
                    border-color: ${CONSTS.colors.primaryDark};
                }

            }
        }
    }
`
StyledInput.Radio = StyledRadio;

const Checkbox = props => {
    // const def = props.value ? props.value : (props.defaultValue ? props.defaultValue : "");
    return(
        <div className={props.className}>
            <Label className="_item">
                <input {...props} type="checkbox" checked={props.field.value} value={props.field.value}/>
                {props.field.label}
            </Label>
        </div>
    )
}
const StyledCheckbox = styled(Checkbox)`
    ${props => commonStyles(props, "label")}
    margin-top: 10px;
    margin-bottom: 10px;
    > label{
        padding: 10px 15px;
        cursor: pointer;
        input{
            margin-right: 10px;
            position: relative;
            width: 12px;
            height: 0;
            &::after{
                position: absolute;
                content: '';
                right: 0;
                bottom: 0;
                border-radius: 2px;
                width: 10px;
                height: 10px;
                background-color: transparent;
                border: 1px solid #999;
                transition: background .25s, border-color .25s;
            }
            &:checked{
                &::after{
                    background-color: ${CONSTS.colors.primaryDark};
                    border-color: ${CONSTS.colors.primaryDark};
                }

            }
        }
    }
`
StyledInput.Checkbox = StyledCheckbox;

const DateTime = (props) => (
    <div className={props.className}>
        <DateTimePicker {...props} className="_picker" />
    </div>
)

const StyledDateTime = styled(DateTime)`
    .react-datetime-picker__wrapper{
        background: transparent;
        padding: 15px 25px;
        border: 1px solid rgba(100, 100, 100, .2);
        color: #666;
        border-radius: ${CONSTS.border.radius};
        text-align: left;
        font-size: 15px;
        box-sizing: border-box;
        margin-top:5px;
        margin-bottom:5px;
        :focus{
            outline: none;
            border-color: rgba(100, 100, 100, .4);
            color: #333;
        }
        ::placeholder{
            color:#999;
        }
    }
`
StyledInput.DateTime = StyledDateTime

export default StyledInput;