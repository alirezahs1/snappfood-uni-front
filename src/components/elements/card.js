import React from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
import Icon from './icon';

const Card = ({
  className,
  style,
  title,
  header,
  meta,
  children,
}) => (
  <div className={className} style={style}>
    {
      (header || title || meta) && (
        <div className="_header">
          {header ? header : (
            <>
              <h2 className="_title">{title}</h2>
              {meta && <div className="_meta">{meta}</div>}
            </>
          )}
        </div>
      )
    }
    <div className="_body">{children}</div>
  </div>
);

const StyledCard = styled(Card)`
    /* border: 1px solid rgba(215, 219, 228, 1); */
    border-radius: ${CONSTS.border.radius2}px;
    background-color: #fff;
    overflow: hidden;
    /* padding-left: 20px;
    padding-right: 20px; */
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, .06);
    > ._header{
        position: relative;
        border-bottom: 1px solid #eee;
        padding-top: 20px;
        padding-bottom: 20px;
        padding: 20px;
        display: flex;
        > ._title{
            font-size: 18px;
            margin: 0;
            font-weight: 400;
            font-style: bold;
            color: #000;
            flex: 1;
            display: flex;
            align-items: center;
        }
        > ._meta{
            flex: 1;
        }
    }
    > ._body{
        /* padding-top: 20px;
        padding-bottom: 20px; */
        padding: 20px;
        overflow: auto;
    }
`

export default StyledCard;