import { MEDIA_UPLOAD_URL } from './constants';
import Axios from "axios";
import { BASE_URL } from './constants';

export const intComma = (value) => {
  const origValue = String(value);
  const newValue = origValue.replace(/^(-?\d+)(\d{3})/, '$1,$2');
  if (origValue === newValue) {
    return newValue;
  }
  return intComma(newValue);
};

export const loginRedirect = () => {
  let url;
  const role = localStorage.getItem('role');
  if (role === 'admin') {
    url = '/auth/login/admin/';
  } else {
    url = '/auth/login/';
  }
  window.location = url;
};

export const handleCatch = (err) => {
  try {
    const res = err.response;
    if (!res) return;
    if (res.data) {
      if (!res.data.messages) return;
      const msg = res.data.messages;
      if (msg.error) {
        msg.error.forEach((er) => {
          alert(er.body);
        });
      }
    }
    if (res.status === 403) {
      // IF logged_in THEN wrong creds ELSE force logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      loginRedirect();
    }
    else if (res.status && res.statusText) {
      // IF logged_in THEN show statusText ELSE wrong creds
    }
    else {
      alert('undefined error');
    }
  } catch (error) {
    alert(error);
  }
};

export const handleEntityDelete = (entity_plural, id, name='item', setLoading=null, success=null) => {
  if(!name)
    name = 'item';
  if (!window.confirm(`Are you sure to delete ${name}?`)) {
    return Promise.resolve();
  }
  if (setLoading) setLoading(true);
  return Axios.delete(`${BASE_URL}/admin/${entity_plural}/${id}/`, getAPIDefaultHeaders()).then((res) => {
    if (setLoading) {
      setLoading(false);
    }
    if (success) {
      success(res);
    }
  }).catch((err) => {
    if (setLoading) {
      setLoading(false);
    }
    handleCatch(err);
  });
};

export const getEntityURLParams = url => {
  const params = Array;
  const parts = url.split(':');
  delete parts[0];
  parts.forEach((part) => {
    const i = part.indexOf('/');
    if (i !== -1) {
      part = part.slice(0, i);
    }
    params.push(part);
  });
  return params;
};

export const getHeadersAuth = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Token ${token}`,
  };
};

export const getAPIDefaultHeaders = () => {
  return {
    headers: getHeadersAuth(),
  };
};

export const getToken = () => {
  return localStorage.getItem('role');
};

export const handleUploadMedia = (file, onUploadProgress = null) => {
  const url = `${MEDIA_UPLOAD_URL}`;
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: {
      ...getHeadersAuth(),
      'content-type': 'multipart/form-data',
    },
    onUploadProgress,
  };
  return Axios.post(url, formData, config)
    .then(
      (res) => res.data,
    )
    .catch((err) => {
      handleCatch(err);
    });
};

export const handleFormError = (errCode, errMsg) => {
  alert(errMsg);
};

export const getUser = () => {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
    return user;
  }
}