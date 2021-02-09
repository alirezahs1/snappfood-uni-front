import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DynamicForm, Card, Button, Icon, Spin, Link } from 'components/elements';
import Axios from 'axios';
import { BASE_URL } from '../../../inc/constants';
import { getAPIDefaultHeaders, handleCatch, handleUploadMedia, handleEntityDelete } from '../../../inc/functions';
import { Redirect } from 'react-router';

const ProductNew = ({ className, edit, match }) => {
  const [obj, setObj] = useState();
  const [categories, setCategories] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState();

  const handleSubmit = (data) => {
    setLoading(true);
    if(edit){
      Axios.put(`${BASE_URL}/admin/products/${obj.id}/`, data, getAPIDefaultHeaders()).then((res) => {
        setRedirect(`/products/${res.data.id}/edit/`);
      }).catch((err) => {
        handleCatch(err);
        setLoading(false);
      });
    } else {
      Axios.post(`${BASE_URL}/admin/products/`, data, getAPIDefaultHeaders()).then((res) => {
        setRedirect(`/products/${res.data.id}/edit/`);
      }).catch((err) => {
        handleCatch(err);
        setLoading(false);
      });
    }
    
  };

  const loadObj = () => {
    const { id } = match.params;
    setLoading(true);
    Axios.get(`${BASE_URL}/admin/products/${id}/`, getAPIDefaultHeaders()).then((res) => {
      setObj(res.data);
      setLoading(false);
    }).catch((err) => {
      handleCatch(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    const flds = [
      {
        type: 'text',
        name: 'name',
        label: 'Product Name',
        required: true,
        value: obj?.name,
      },
      {
        label: 'Stock',
        name: 'stock',
        type: 'number',
        required: true,
        value: obj?.stock
      },
      {
          label: 'Price',
          type: 'number',
          name: 'price',
          required: true,
          value: obj?.price
      },
      {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        value: obj?.description,
      },
    ];
    setFields(flds);
  }, [categories, obj]);
  useEffect(() => {
    if (edit) {
      loadObj();
    }
  }, []);

  const cardMeta = (
    <div style={{ textAlign: 'left'}}>
      {edit && <Button small error onClick={() => handleEntityDelete('products', obj.id, 'Product', setLoading, () => setRedirect('/products/'))}>
        <Icon fa icon="trash" style={{marginLeft: 4}}/>
            Delete
        </Button>
      }
      <Link to="/products/">
        <Button small secondary>
          <Icon fa icon="angle-left" style={{marginLeft: 4}}/>
          Back
        </Button>
      </Link>
    </div>
  );

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <Card title={edit ? 'Edit Product' : 'New Product'} meta={cardMeta}>
      <Spin active={loading}>
        <DynamicForm isEdit={edit} cols={2} fields={fields} onSubmit={handleSubmit} submitText="Save" />
      </Spin>
    </Card>
  );
};

const StyledProductNew = styled(ProductNew)`
    
`;

export default StyledProductNew;
