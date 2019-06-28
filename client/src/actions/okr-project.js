import axios from 'axios';

import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  FETCH_OKRS,
  ADD_OKR,
  DELETE_OKR
} from './types';

export const fetchProjects = () => async dispatch => {
  try {
    const res = await axios.get('/api/projects/');
    dispatch({
      type: FETCH_PROJECTS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
  }
}

export const addProject = (formData) => async dispatch => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/projects', formData, config);
    dispatch({
      type: ADD_PROJECT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
  }
}

export const deleteProject = id => async dispatch => {
  try {
    await axios.delete(`/api/projects/${id}`)
    dispatch({
      type: DELETE_PROJECT,
      payload: id
    })
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
  }
}

export const fetchOKRs = () => async dispatch => {
  try {
    const res = await axios.get('/api/okrs/');
    dispatch({
      type: FETCH_OKRS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
  }
}

export const addOKR = (formData) => async dispatch => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/okrs', formData, config);
    dispatch({
      type: ADD_OKR,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
  }
}

export const deleteOKR = id => async dispatch => {
  try {
    await axios.delete(`/api/okrs/${id}`)
    dispatch({
      type: DELETE_OKR,
      payload: id
    })
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
  }
}
