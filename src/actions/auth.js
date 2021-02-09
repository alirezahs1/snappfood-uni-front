/* eslint-disable no-throw-literal */
import axios from 'axios';
import { BASE_URL } from '../inc/constants';
import { handleCatch } from '../inc/functions';

const requestLogin = () => ({
  type: 'USER_LOGIN',
  status: 'request',
});

const recieveLogin = (data, token) => ({
  type: 'USER_LOGIN',
  status: 'recieve',
  data,
  token,
});

const catchLogin = (error) => ({
  type: 'USER_LOGIN',
  status: 'error',
  error,
});

export const loginAction = (data) => {
  return (dispatch) => {
    dispatch(requestLogin());
    const url = `${BASE_URL}/auth/login/`;

    return axios.post(url, data)
      .then(
        (res) => {
          dispatch(recieveLogin(res.data.user, res.data.token));
          return res.data;
        },
      )
      .catch((err) => {
        dispatch(catchLogin(err));
        handleCatch(err);
        throw 'Error while logging in.';
      });
  };
};

export const logoutAction = () => ({
  type: 'USER_LOGOUT',
});
