import {
  FETCH_USERS,
  DELETE_USER,
  ASSIGN_OKR,
  REVOKE_OKR,
  ASSIGN_PROJECT,
  REVOKE_PROJECT,
  FETCH_ASSIGNMENT
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
  currentUser: {}
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USERS:
      return {
        ...state,
        users: payload
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload)
      };
    case FETCH_ASSIGNMENT:
      return {
        ...state,
        currentUser: payload
      };
    case ASSIGN_OKR:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          assignment: {
            ...state.currentUser.assignment,
            okrs: [payload, ...state.currentUser.assignment.okrs]
          }
        }
      };
    case REVOKE_OKR:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          assignment: {
            ...state.currentUser.assignment,
            okrs: state.currentUser.assignment.okrs.filter(okr => okr._id !== payload)
          }
        }
      };
    case ASSIGN_PROJECT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          assignment: {
            ...state.currentUser.assignment,
            projects: [payload, ...state.currentUser.assignment.projects]
          }
        }
      };
      
    case REVOKE_PROJECT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          assignment: {
            ...state.currentUser.assignment,
            projects: state.currentUser.assignment.projects.filter(project => project._id !== payload)
          }
        }
      };
    default:
      return state;
  }
}
