import React, { useState, useEffect } from 'react';
// import { FormDataItem } from '../../store/forms/types';
import styled from 'styled-components';
import { PreviewApi } from "@zzwing/react-image";

// import { ComponentModesEnum, Button } from '.';
// import { SwitchTransition, CSSTransition } from 'react-transition-group';
// import { uploadMedia } from '../../inc/functions';
// import { finder } from '../../store/forms/functions';
// import FormSelect from './formSelect';
// import Select2 from 'react-select';

import { Input, Button, Label, List, FormImage, FormUploader, Modal, /*LocationPicker,*/ FormFileViewer } from '.';

const DynamicForm = (props) => {
  /**
   * `fields` prop has array of:
   * {type, name, placeholder, defaultValue, defaultChecked, disabled, required, value}
   *  - onUploadMedia()
   */
  const [fields, setFields] = useState(props.fields)
  // const [uploadingFiles, setUploadingFiles] = useState([])

  useEffect(() => {
    if (props.fields) {
      // console.log(props.fields);
      setFields(props.fields);
      setDefaultValueToValue(props.fields);
    }
    return () => { };
  }, [props.fields]);

  const setDefaultValueToValue = (formFields) => {
    if (!props.isEdit) {
      let tempFields = [...formFields];
      tempFields.map(
        (v) => v.type == 'image' ? v.value = null : v.value = v.defaultValue //TODO: Merge
      );
      setFields(tempFields);
    }
  };
  const getFieldType = (field, index) => {
    let input;

    const attrs = {
      id: `id_${field.name}`,
      name: field.name,
      onChange: (e) => handleChange(index, e),
      defaultValue: field.defaultValue,
      defaultChecked: field.defaultChecked,
      placeholder: field.placeholder,
      value: field.value ? field.value : null,
      disabled: field.disabled,
      required: field.required,
      icon: field.icon,
      autoComplete: false,
      error: field.errors && field.errors.length > 0,
      style: field.style,
      spellCheck: false,
      step: field.step,
      small: props.inline
    };
    switch (field.type) {
      case 'textarea':
        input = <Input.Textarea key={index} {...attrs} />
        break;
      // case 'editor':
      //     input = <FormEditor key={index} {...attrs} field={field}/>
      //     break;
      case 'checkbox':
        input = <Input.Checkbox key={index} {...attrs} field={field} />
        break;
      case 'relational-select':
      case 'select':
        if (attrs.defaultValue && attrs.defaultValue.id) attrs.defaultValue = attrs.defaultValue.id;
        if (attrs.value && attrs.value.id) attrs.value = attrs.value.id;
        input = <Input.Select key={index} {...attrs} options={field.options ? field.options : []} />
        break;
      // case 'select2':
      //     // if(attrs.defaultValue && attrs.defaultValue.id) attrs.defaultValue = attrs.defaultValue.id;
      //     // if(attrs.value && attrs.value.id) attrs.value = attrs.value.id;
      //     console.log(attrs);
      //     input = <Select2 key={index} {...attrs} options={field.options ? field.options : []}/>
      //     break;
      case 'radio':
        input = <Input.Radio key={index} {...attrs} options={field.options} />
        break;
      // case 'location':
      //     input = <LocationPicker {...attrs} />;
      //     break;
      case 'file':
        input = (
          <div key={index} className="_imgs">
            {field.value && field.value.file
              ? <FormFileViewer value={field.value.file} onDelete={e => _handleImageRemove(e, index)} />
              : <FormUploader {...attrs} onChange={(e) => handleImageChange(e, index, 'file')} />}
          </div>
        );
        break;
      case 'image':
        input = (
          <div key={index} className="_imgs">
            {field.value && field.value.medium
              ? <FormImage value={`${field.value.medium}`} onDelete={(e) => _handleImageRemove(e, index)} onView={() => window.open(field.value.file, '_blank')} />
              : <FormUploader progress={field.progress ? field.progress : 0} {...attrs} onChange={(e) => handleImageChange(e, index)} fileTypes={['jpg', 'png']} />}
          </div>
        );
        break;
      case 'images':
        input = (
          <div key={index} className="_imgs">
            {field.value && field.value.map((item, item_index) => <FormImage value={`${item.medium}`} onDelete={(e) => _handleImageRemove(e, index, item_index)} onView={() => window.open(item.file, '_blank')} />)}
            <FormUploader value={null} onChange={(e) => handleImageChange(e, index, true)} fileTypes={['jpg', 'png']} />
          </div>
        );
        break;
      case 'hidden':
        input = <Input.Hidden key={index} {...attrs} type="hidden" />;
        break;
      case 'datetime':
        input = <Input.DateTime {...attrs} />;
        break;
      default:
        input = <Input key={index} type={field.type} {...attrs} />;
        break;
    }
    if (field.label && field.type !== 'checkbox') {
      let label = <Label className={`${props.className}__formitem__label`} for={"id_" + field.name}>{field.label}{field.required && '*'}</Label>;
      input = (
        <>
          {label}
          {input}
        </>
      );
    }
    if (field.errors && field.errors.length > 0) {
      input = <>
        {input}
        {<List small error items={field.errors} />}
      </>
    }
    const col = field.col ? field.col : (props.cols ? props.cols : 1);
    return <div className={`${props.className}__formitem col--${col}`} style={{ width: `${100 / col}%` }}>
      {input}
    </div>;
  }

  // const deleteImage = (valueIndex,imageIndex)=> {
  //     let tempFields = [...fields];
  //     tempFields[valueIndex].value.splice(imageIndex,1);
  //     setFields(tempFields);
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    let canSubmit = true;
    // if(uploadingFiles.length != 0 ) {
    //     alert("فایل های شما در حال آپلود می‌باشند") //TODO: Handle dialogue
    //     return;
    // }
    // TODO: return if form not changed
    let data = {};
    fields.map(field => { //TODO: how is images?
      switch (field.type) {
        case 'file':
        case 'image':
          data[field.name] = field.value ? field.value.id : null;
          break;
        case 'images':
          data[field.name] = field.value?.map((item) => item.id);
          break;
        case 'relational-select':
          data[field.name] = { id: field.value };
          break;
        case 'datetime':
          data[field.name] = field.value ;
          break;
        // case 'select2':
        //     data[field.name] = field.value.value;
        //     break;
        case 'checkbox':
            data[field.name] = field.value || field.value == "true";
            break;
        // case 'number':
        //     data[field.id] = parseInt(field.value ? field.value : '');
        //     break;
        default:
          data[field.name] = field.value ? field.value : null;
          break;
      }
      if (field.required && !data[field.name]) canSubmit = false;
    });
    if (!canSubmit) {
      if (props.onError) {
        props.onError(1, 'Please fill all required fields and try again');
      }
      return;
    }
    if (props.reset) {
      setFields([]);
    }
    if (props.onSubmit) {
      props.onSubmit(data);
    }
  };

  const handleChange = (index, ev) => {
    let tempFields = [...fields];
    switch (tempFields[index].type) {
      case 'checkbox':
        tempFields[index].value = ev.target.checked;
        break;

      // case 'relational-select':
      //     tempFields[index].value = ev.target.value; //TODO: Fix
      //     break;
      // case 'select2':
      case 'datetime':
      // case 'location':
      case 'file':
      case 'images':
      case 'image':
        tempFields[index].value = ev;
        break;
        break;
      default:
        tempFields[index].value = ev.target.value;
        break;
    }
    // console.log(tempFields);
    setFields(tempFields);
    if (tempFields[index].onChange) tempFields[index].onChange(ev, index);
  };

  const handleImageChange = (e, index, is_multiple=false) => {
    e.preventDefault();

    if (!e.target.files[0]) return;
    // let type = e.target.files[0].type.toLowerCase();
    // if(!(type== "image/jpeg" || type== "image/png")) {
    //     return alert('پسوند فایل بارگزاری شده مجاز نمی باشد') //TODO: Handle alert
    // }
    let file = e.target.files[0];
    if (!props.onUploadMedia) {
      return;
    }
    e.target.value = null;
    props.onUploadMedia(file)
      .then((obj) => {
        if(is_multiple) { // for multi image field type = 'images'
          let newList;
          if (fields[index].value) {
            newList = [...fields[index].value, obj];
          } else {
            newList = [obj];
          }
          console.log(newList);
          handleChange(index, newList);
        } else { // for type = 'image'
          handleChange(index, obj);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const _handleImageRemove = (e, index, image_index=null) => {
    e.preventDefault();
    if(image_index){ // for type = 'images'
      let new_list = [...fields[index].value];
      new_list.splice(image_index, 1);
      handleChange(index, new_list);
    } else {
      handleChange(index, null);
    }
  }
  return (
    <form onSubmit={e => handleSubmit(e)} method="POST" className={props.className + (props.inline ? ' __inline' : '')} style={props.style}>
      {fields.map((field, k) =>
        getFieldType(field, k)
      )}

      <Button block={!props.inline} small={props.inline}>
        {props.submitText ? props.submitText : "ثبت"}
      </Button>
    </form>
  );
}
// export const flatMediaArray = (arr) => {
//     let tempArr = [];
//     arr.map((v)=>tempArr.push(v.file));
//     return tempArr;
// }
const StyledDynamicForm = styled(DynamicForm)`
    /* padding: 20px; */
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    &__formitem{
        padding-left: 4px;
        padding-right: 4px;
        /* width: ${props => props.cols ? (100 / props.cols) : 100}%; */
        &__label{
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 3px;
        }
        ._imgs{
          display: flex;
          flex-wrap: wrap;
        }
    }
    &.__inline{
        flex-direction: row;
        flex-wrap: nowrap;
        width: fit-content;
        padding: 0;
    }
`
export default StyledDynamicForm;