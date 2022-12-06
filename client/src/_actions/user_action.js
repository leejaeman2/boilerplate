import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types.js';

const loginUser = (data) => {
  const request = axios.post('/api/users/login', data)
    .then(res => res.data);

    return {
      type: LOGIN_USER,
      payload: request
    };
};

export const registerUser = (data) => {
  const request = axios.post('/api/users/register', data)
    .then(res => res.data);

    return {
      type: REGISTER_USER,
      payload: request
    };
};

export const auth = () => {
  const request = axios.get('/api/users/auth')
    .then(res => res.data);

  return {
    type: AUTH_USER,
    payload: request
  }

};

export default loginUser;
