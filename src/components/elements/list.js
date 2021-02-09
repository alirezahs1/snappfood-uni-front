import React from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';

const List = ({items, className}) => (
    <ul className={className}>
        {items.map( item => <li>{item}</li>)}
    </ul>
)

const StyledList = styled(List)`
    list-style-type: none;
    padding: 0;
    margin: 0 0 15px 10px;
    li{
        font-size: 16px;
        margin: 10px 0;
    }
    ${props => (`
        ${props.small ? `
            li{
                font-size: 13px;
                margin: 5px 0;
            }
        ` : ``}
        ${props.error ? `
            li{
                color: ${CONSTS.colors.error}
            }
        ` : ``}

    `)}
`
export default StyledList;