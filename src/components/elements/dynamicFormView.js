import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {Input, Button, Label, List, Table, Modal, Text} from '.';
import { getAPIDefaultHeaders } from '../../inc/functions';
import CONSTS from './_constants';

const DynamicFormView = ({className, fields, entities, params, onReload}) => {
    const [tableModalActive, setTableModalAcive] = useState(false);
    

    const [tableCreateModalActive, setTableCreateModalActive] = useState(false);
    const [tableUpdateModalActive, setTableUpdateModalActive] = useState(false);
    const [tableUpdateParams, setTableUpdateParams] = useState({});
    const [isDeleted, setIsDeleted] = useState(false);
    /**
     * `fields` prop has array of:
     * {type, name, placeholder, defaultValue, defaultChecked, disabled, required, value}
     * 
     */
  
    const getFieldValue = (field) => {
        if(field.value === undefined) return;
        var val;
        if(field.render){
            return field.render(field.value);
        }
        var type = field.type ? field.type : "text";
        switch (type) {
            case 'image':
                var url = field.value;
                val = <a target="_blank" href={url}><img className="_image" src={url} /></a>
                break;
            case 'table':
                if(!field.value.columns || !field.value.dataSource) return;
                if(field.value.dataSource.length > 0)
                    val = <Table small columns={field.value.columns} dataSource={field.value.dataSource} />
                else
                    val = <Text muted>Empty</Text>
                break;
            default:
                val = field.value;
                break;
        }
        return val;
    }
  return (
        <figure className={className}>
            {fields && fields.map((field, i) => (
                <div className="_row">
                    <div className="_label">{field.label}</div>
                    <div className="_value">{getFieldValue(field)}</div>
                </div>
            ))}
        </figure>
  );
}
// export const flatMediaArray = (arr) => {
//     let tempArr = [];
//     arr.map((v)=>tempArr.push(v.file));
//     return tempArr;
// }
const StyledDynamicFormView = styled(DynamicFormView)`
    ._row{
        display: flex;
        flex-direction: row;
        padding: 15px 0;
        ._label{
            width: 30%;
            color: #999;
            /* display: flex;
            flex-direction: column;
            justify-content: center; */
        }
        ._value{
            width: 100%;
            padding-left: 15px;
            font-weight: bold;
            ._image{
                max-width: 200px;
                border-radius: 5px;
                transition: opacity .25s, filter .25s;
                border: 1px solid #ccc;
                &:hover{
                    opacity: .8;
                    /* filter: grayscale(100%); */
                }
            }
        }
    }
    @media (max-width: ${CONSTS.resp.lg}px) {
        ._row{
            padding :0px;
            flex-direction :column;
            ._label{
                padding-bottom:10px;
                padding-top:10px;
                width :100%;
            }
            ._value{
                padding-bottom: 25px;
            }
        }  
    }
`
export default StyledDynamicFormView;