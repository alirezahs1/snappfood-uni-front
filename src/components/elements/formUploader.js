import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CONSTS from './_constants';
import { _ } from './../../inc/functions'
import Icon from './icon';

// type ImageUploaderProps = {
//     className?: string,
//     onChange?: any,
//     height?: string,
//     fileTypes?: string[],
// }
const ImageUploader = ({ className, progress=0, ...others }) => (
  <div className={`${className} previewComponent`}>
    <input
      className="fileInput"
      type="file"
      {...others}
      disabled={progress > 0 ? 'disabled' : ''}
    />
    {progress === 0 ? (
      <div className="_upload-container">
        <Icon className="_upload-icon" icon="plus" />
        <div className="_upload-description">
          یک فایل انتخاب کنید
        </div>
      </div>
    ) : (
      <div className="_uploading">
        <Icon icon="spinner" spin fa />
        <div className="_uploading__hint">
          درحال بارگذاری
        </div>
      </div>
    )}
  </div>
);

const StyledImageUploader = styled(ImageUploader)((props) => `
    // background: ${CONSTS.colors.primaryLight};
    border: 1px solid rgba(100, 100, 100, .2);
    border-radius: ${CONSTS.border.radius};
    height: ${props.height ? props.height : '100px'};
    margin-top: 5px;
    border-radius: 5px;
    // margin-left: 10px;
    margin-bottom: 10px;
    width: 200px;
    position: relative;
    cursor: pointer;
    display: block;
    transition: ease all .25s;
    transform: scale(1);
    &:hover {
        transform: scale(.95);
    }
    &:active {
        transform: scale(1.02);
    }
    input {
        cursor: pointer;
        font-size: 100px;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        z-index: 100;
    }
    ._uploading{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #000;
      &__hint{
        color: #000;
        font-size: 14px;
        margin-top: 10px;
      }
      &::before{
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        bottom: 0;
        width: 80%;
        background-color: ${CONSTS.colors.primary};
        opacity: .3;
      }
    }
    ._upload-container {
        cursor: pointer;
        height: 100%;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        align-cotent: center;
        flex-direction: column;
        ._upload-icon {
            color: ${CONSTS.colors.primary};
            filter: invert(0) sepia(0) saturate(1) hue-rotate(0deg) brightness(0.6);
        }
        ._upload-description {
            margin-top: 5px;
            font-size: 14px;
            color: rgba(100, 100, 100, 1);
            text-align: center;
        }
        ._upload-types {
            font-size: 12px;
            color: ${CONSTS.colors.greyDarker};
            text-align: center;
            line-height: 15px;
            padding-top: 10px;
        }
    }
`)
export default StyledImageUploader;