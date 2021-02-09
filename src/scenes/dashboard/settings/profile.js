import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Card, DynamicForm, Spin} from '../../../components/elements';
import { BASE_URL } from '../../../inc/constants';
import { getAPIDefaultHeaders, handleCatch } from '../../../inc/functions';

const Settings = ({className}) => {
    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState();
    const [fields, setFields] = useState([]);

    useEffect(() => {

        setFields([
            {
                label: 'Resturant Name',
                name: 'name',
                type: 'text',
                value: obj?.name
            },
            {
                label: 'Resturant Address',
                name: 'address',
                type: 'textarea',
                value: obj?.address
            },
            {
                label: 'Is Open',
                name: 'is_open',
                type: 'checkbox',
                value: obj?.is_open
            }
        ]);

    }, [obj])

    useEffect( () => {
        load();
    }, [])

    const load = () => {
        setLoading(true);

        Axios.get(`${BASE_URL}/admin/resturant/`, getAPIDefaultHeaders())
        .then(res => {
            setLoading(false);
            setObj(res.data);
        })
        .catch(err => {
            handleCatch(err);
            setLoading(false);
        })
    }

    const handleSubmit = (data) => {
        setLoading(true);
        Axios.put(`${BASE_URL}/admin/resturant/`, data, getAPIDefaultHeaders())
        .then(res => {
            setObj(res.data);
            setLoading(false);
        })
        .catch(err => {
            handleCatch(err);
            setLoading(false);
        })
    }

    return (
        <Card title="Settings">
            <Spin active={loading}>
                <DynamicForm isEdit={true} fields={fields} submitText="Save" onSubmit={handleSubmit} />
            </Spin>
        </Card>
    )
}
export default Settings;
