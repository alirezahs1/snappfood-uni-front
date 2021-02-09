import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Card, Avatar, Button, Link, Pagination, Spin } from 'components/elements';
import Axios from 'axios';
import { BASE_URL, PAGE_SIZE } from '../../../inc/constants';
import { getAPIDefaultHeaders, handleCatch, handleEntityDelete, intComma } from '../../../inc/functions';
import { Modal } from '../../../components/elements';

const OrderDetailModal = ({items, active, onToggle}) => {
    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            render: p => p.name
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Unit Price',
            dataIndex: 'product',
            render: p => p.price
        },
        {
            title: 'Total Price',
            dataIndex: 'total'
        }
    ];

    return (
        <Modal active={active} onToggle={onToggle}>
            <Table dataSource={items} columns={columns} />
        </Modal>
    )
}


const OrderList = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
        title: 'Status',
        dataIndex: 'status_display'
    },
    {
      title: 'Customer',
      dataIndex: 'user',
      render: (u) => `${u?.first_name} ${u?.last_name}`
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id, obj) => (
        <>
          <Button onClick={() => {
              setModalActive(true);
              setModalItems(obj.items);
          }} small secondary>Detail</Button>
          {obj?.status === 1 && (
              <>
                <Button onClick={() => changeStatus(obj, 2)} small success>Confirm</Button>
                <Button onClick={() => changeStatus(obj, -1)} small error>Reject</Button>
              </>
          )}
          {obj?.status === 2 && 
                <Button onClick={() => changeStatus(obj, 3)} small primary>Deliver</Button>
              }
        </>
      ),
    },
    
  ];
  useEffect(() => {
    load();
  }, [page]);

  const load = () => {
    setLoading(true);
    Axios.get(`${BASE_URL}/admin/orders/?page=${page}`, getAPIDefaultHeaders()).then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch((err) => {
      handleCatch(err);
      setLoading(false);
    });
  };

  const changeStatus = (obj, status) => {
      setLoading(true);
      const data = {
          ...obj,
          status: status
      }

      Axios.put(`${BASE_URL}/admin/orders/${obj.id}/`, data, getAPIDefaultHeaders())
      .then(res => {
          load();
      })
      .catch(err => {
          handleCatch(err);
          setLoading(false);
      })
  }

  return (
    <Card title="Orders">
        <OrderDetailModal active={modalActive} items={modalItems} onToggle={() => {setModalActive(!modalActive)}} />
      <Spin active={loading}>
        <Table dataSource={data?.results || []} columns={columns} />
        <Pagination count={data?.count || 0} current={page} onChange={setPage}/>
      </Spin>
    </Card>
  );
};

export default OrderList;
