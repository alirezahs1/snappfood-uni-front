import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Card, Avatar, Button, Link, Pagination, Spin } from 'components/elements';
import Axios from 'axios';
import { BASE_URL, PAGE_SIZE } from '../../../inc/constants';
import { getAPIDefaultHeaders, handleCatch, handleEntityDelete, intComma } from '../../../inc/functions';

const ProductList = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (d) => d && d.length > 50 ? d.substr(0, 50) + '...' : d,
    },
    {
        title: 'Stock',
        dataIndex: 'stock'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        render: (p) => intComma(p)
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: id => (
        <>
          <Link to={`/products/${id}/edit/`}>
            <Button small secondary>Edit</Button>
          </Link>
          <Button onClick={() => handleEntityDelete('products', id, 'Product', setLoading, load)} small error>Delete</Button>
        </>
      ),
    },
    
  ];
  useEffect(() => {
    load();
  }, [page]);

  const load = () => {
    setLoading(true);
    Axios.get(`${BASE_URL}/admin/products/?page=${page}`, getAPIDefaultHeaders()).then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch((err) => {
      handleCatch(err);
      setLoading(false);
    });
  };

  const cardMeta = (
    <div style={{textAlign: 'left'}}>
      <Link to="/products/new/">
        <Button small>New Product</Button>
      </Link>
    </div>
  );

  return (
    <Card title="Products" meta={cardMeta}>
      <Spin active={loading}>
        <Table dataSource={data?.results || []} columns={columns} />
        <Pagination count={data?.count || 0} current={page} onChange={setPage}/>
      </Spin>
    </Card>
  );
};

const StyledProductList = styled(ProductList)`
`;

export default StyledProductList;
