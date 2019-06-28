import axios from 'axios';
import history from '../history';

import {
  SIGN_OUT,
  AUTHENTICATE,
  REGISTER
} from './types';

export const authenticate = user => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const { id } = user
  const body = JSON.stringify({ id });
  try {
    let res = await axios.post('/api/auth', body, config);
    res = {
      ...res.data,
      ...user
    }
    dispatch({
      type: AUTHENTICATE,
      payload: res
    });
  } catch (err) {
    console.log(err);
  }
}

export const signOut = () => {
  history.push('/');
  return {
    type: SIGN_OUT
  };
}

export const register = (user) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(user);
  try {
    let res = await axios.post('/api/auth/register', body, config);
    res = {
      ...res.data,
      isRegistered: true,
      isSignedIn: true
    };
    dispatch({
      type: REGISTER,
      payload: res
    });
  } catch (err) {
    console.log(err);
  }
}
