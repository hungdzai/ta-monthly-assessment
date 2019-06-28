import axios from 'axios';

import {
  FETCH_USERS,
  DELETE_USER,
  ASSIGN_OKR,
  ASSIGN_PROJECT,
  REVOKE_OKR,
  REVOKE_PROJECT,
  FETCH_ASSIGNMENT
} from './types';

export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/');
    dispatch({
      type: FETCH_USERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchAssignment = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${user_id}`);
    dispatch({
      type: FETCH_ASSIGNMENT,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}


export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  } catch (err) {
    console.log(err);
  }
}

export const assignOKR = (user_id, okr_id) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user_id}/okr/${okr_id}`);
    dispatch({
      type: ASSIGN_OKR,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const revokeOKR = (user_id, okr_id) => async dispatch => {
  try {
    await axios.delete(`/api/users/${user_id}/okr/${okr_id}`);
    dispatch({
      type: REVOKE_OKR,
      payload: okr_id
    });
  } catch (err) {
    console.log(err);
  }
}

export const assignProject = (user_id, project_id) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user_id}/project/${project_id}`);
    dispatch({
      type: ASSIGN_PROJECT,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const revokeProject = (user_id, project_id) => async dispatch => {
  try {
    await axios.delete(`/api/users/${user_id}/project/${project_id}`);
    dispatch({
      type: REVOKE_PROJECT,
      payload: project_id
    });
  } catch (err) {
    console.log(err);
  }
}
