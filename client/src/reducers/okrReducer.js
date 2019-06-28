import {
  FETCH_OKRS,
  ADD_OKR,
  DELETE_OKR
} from '../actions/types';

const INITIAL_STATE = {
  okrs: []
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_OKRS:
      return ({
        ...state,
        okrs: payload
      });
    case ADD_OKR:
      return ({
        ...state,
        okrs: [...state.okrs, payload]
      });
    case DELETE_OKR:
      return ({
        ...state,
        okrs: state.okrs.filter(okr => okr._id !== payload)
      });
    default:
      return state;
  }
}
