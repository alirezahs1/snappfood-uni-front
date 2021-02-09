import React from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
import FA from 'react-fontawesome';

import IconPlus from 'static/img/icons/plus.svg';

const iconList = {
  'plus': IconPlus
}

const Icon = ({ className, icon, fa, size, style, ...others }) => {
  return (
    <span className={`${className} icon-${icon}`} style={style}>
      {fa ? <FA size={size ? size : '1x'} name={icon} {...others} /> :
        <img className={`${className}__img ${size ? ` ${className}__img--size-${size}` : ''}`} src={iconList[icon]} />
      }
    </span>
  )
}
const StyledIcon = styled(Icon)`
    font-family: 'snappion';
    ${props => (`
        ${props.primary ? `color:${CONSTS.colors.primary}` : ""}    
        ${props.warning ? `color:${CONSTS.colors.warning}` : ""}
        ${props.error ? `color:${CONSTS.colors.error}` : ""}
        ${props.success ? `color:${CONSTS.colors.success}` : ""}
    `)}
    &__img{
        width: 12px;
        height: 12px;
        &--size-2x{
            width: 24px;
            height: 24px;
        }
    }
`
export default StyledIcon;