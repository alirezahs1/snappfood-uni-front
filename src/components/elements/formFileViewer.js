import React,{useState} from 'react';
import styled from "styled-components";
import CONSTS from './_constants';
import IconAttach from '../../static/img/attach.png';
import IconRemove from '../../static/img/close.png';
import { Avatar } from '.';
import { Link } from '.';

const FormFile = (props) => {
    const {value, onDelete} = props;
    const filename = value.split('/')[value.split('/').length - 1];
    return (
        // porps.value
        // props.onDelete
        <div className={props.className}>
            <div className="attach">
                <img src={IconAttach}/>
            </div>
            <div className="filename">
                <Link target="_blank" href={value}>
                    {filename}
                </Link>
                <span onClick={onDelete} className="_remove">
                    [remove]
                </span>
            </div>
        </div>
    )
}
const StyledFormFile = styled(FormFile)`
    display: flex;
    color: ${CONSTS.colors.primary};
    .attach{
        width: 25px;
        img{
            max-width: 100%;
        }
    }
    .filename{
        margin-top: 8px;
        margin-left: 10px;
        ._remove{
            color: ${CONSTS.colors.greyDarker};
            text-decoration: none;
            margin-left: 10px;
            cursor: pointer;
            &:hover{
                color: #333;
            }
        }
    }
`
export default StyledFormFile;