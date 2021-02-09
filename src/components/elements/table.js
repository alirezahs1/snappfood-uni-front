import React, { useState } from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
import { Link, Avatar } from '.'
import { getEntityURLParams } from '../../inc/functions';
import CheckIcon from 'static/img/icons/check.svg';
import Icon from './icon';

const Table = ({ columns, dataSource, selectable, onSelect, selectIndex = 'id', className, style }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const handleRender = (col, record) => {
    if (col.render) {
      if (typeof (col.render) == 'function') {
        return col.render(record[col.dataIndex], record);
      } else if (typeof (col.render) == 'string') {
        switch (col.render) {
          case 'image':
            return <Avatar src={record[col.dataIndex]} size={30} />
          case 'link':
            return <Link to={col.linkURL}>{col.linkLabel ? col.linkLabel : "View"}</Link>
          default:
            return record[col.dataIndex] ? record[col.dataIndex] : "";
        }
      }
    }
    return record[col.dataIndex]
  }

  const handleRowClick = (event, index) => {
    if (!selectable) return;

    var copy_of_rows;
    if (selectedRows.includes(index)) { //should be removed
      var index_index = selectedRows.indexOf(index);
      copy_of_rows = [...selectedRows];
      copy_of_rows.splice(index_index, 1);
      setSelectedRows(copy_of_rows);
    } else { // should be added
      copy_of_rows = [...selectedRows, index];
      console.log(selectedRows);
    }
    setSelectedRows(copy_of_rows);
    if (onSelect) {
      var ids = [];
      var objs = [];
      copy_of_rows.forEach(rowIndex => {
        objs.push(
          dataSource[rowIndex]
        );
        ids.push(
          dataSource[rowIndex][selectIndex]
        );
      });
      onSelect(ids, objs);
    }
  }

  return (
    <table style={style} className={`${className} ${selectable ? className + '--selectable' : ''}`} border="0" cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          {selectable && <th></th>}
          {columns.map((col, i) => <th key={i} style={col.style}>{col.title}</th>)}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((record, i) => (
          <tr key={i} className={selectedRows.includes(i) ? 'selected' : ''}>
            {selectable && <td onClick={e => handleRowClick(e, i)}>
              <Icon fa icon={selectedRows.includes(i) ? 'check-circle' : 'circle'} />
            </td>}
            {columns.map((col, j) => {
              return (
                <td key={j}>{handleRender(col, record)}</td>
              )
            })}

          </tr>
        ))}
      </tbody>
    </table>
  );
};

const StyledTable = styled(Table)`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
    & > thead{
        font-size: 14px;
        font-weight: 100;
        text-transform: uppercase;
        color: #333;
        > tr{
            > th{
                text-align: center;
                padding-top: 5px;
                padding-bottom: 5px;
            }
        }
    }
    & > tbody{
        color: #666;
        font-size: 14px;
        font-weight: normal;
        > tr{
            > td{
              border-top: 1px solid #eee;
              padding: 10px;
              line-height: 30px;
            }
        }
    }
    &--selectable{
        & > tbody > tr{
            transition: background .15s;
            & > td:first-child{
                position: relative;
                cursor: pointer;
                color: #ccc;
            }
            &.selected{
                background-color: #F7FCFF;
                & > td:first-child{
                    color: ${CONSTS.colors.primary};
                }
            }
            
        }
    }
    ${props => (props.small && (`
            > thead {
                font-size: 13px;
                > tr{
                    > td{

                    }
                }
            }
            > tbody{
                font-size: 13px;
                > tr{
                    > td{
                        padding: 5px;
                        border-left: none;
                        border-right: none;
                        border-radius: 0 !important
                        font-weight: normal;
                    }
                }
            }
        `)
  )}
  ${CONSTS.selectors.rtl}{
  }
`;

export default StyledTable;