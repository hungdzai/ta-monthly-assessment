import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT
} from '../actions/types';

const INITIAL_STATE = {
  projects: []
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROJECTS:
      return ({
        ...state,
        projects: payload
      });
    case ADD_PROJECT:
      return ({
        ...state,
        projects: [...state.projects, payload]
      });
    case DELETE_PROJECT:
      return ({
        ...state,
        projects: state.projects.filter(project => project._id !== payload)
      });
    default:
      return state;
  }
}
