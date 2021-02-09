import React, { useState } from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';

const Pagination = ({ count, current, className, onChange, pageSize = 20, ...others }) => {
  const handleClick = (e, i) => {
    e.preventDefault();
    if (onChange) onChange(i);
  };
  const pages = Math.ceil(count / pageSize);
  const range = [...Array(pages).keys()];
  const begin = range.slice(0, 2);
  let middle;
  if (range.length - current < 4) {
    middle = range.slice(Math.max(range.length - 5, 2), Math.max(range.length - 2, 5));

  } else {
    middle = range.slice(Math.max(current - 2, 2), Math.max(current + 1, 5));
  }

  const end = (range.length > 5) ? range.slice(range.length - 2, range.length) : [];

  const _ = (i) => {
    let cls = current == (i + 1) ? 'active' : ''
    return (
      <a onClick={e => handleClick(e, i + 1)} className={cls} href="#">{i + 1}</a>
    );
  };

  if (pages < 2) return <></>;
  return (
    <div className={className}>
      {/* <a href="#">&laquo;</a> */}
      {begin.map((i, j) => _(i))}
      {(middle[0] > 2) &&
        <a className="disabled">...</a>
      }
      {middle.map((i, j) => _(i))}
      {(middle[middle.length - 1] + 1 < end[0]) &&
        <a className="disabled">...</a>
      }
      {end.map((i, j) => _(i))}
      {/* <a href="#">&raquo;</a> */}
    </div>
  );
};

const StyledPagination = styled(Pagination)`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 10px 0 15px;
    a{
        color: ${CONSTS.colors.greyDarker};
        margin: 0 5px;
        padding: 5px 10px;
        border-radius: 5px;
        text-decoration : none;
        transition: background-color .25s, color .25s;
        &.disabled{
            
        }
        &.active{
            color: #fff;
            background-color: ${CONSTS.colors.primary};
        }
        &:not(.active, .disabled):hover{
            background-color: ${CONSTS.colors.greyLighter};
            color: ${CONSTS.colors.primary};
        }
    }
`

export default StyledPagination;