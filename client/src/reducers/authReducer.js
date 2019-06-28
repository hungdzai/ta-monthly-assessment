import {
  SIGN_OUT,
  AUTHENTICATE,
  REGISTER
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  isRegistered: null,
  _id: null,
  id: null,
  email: null,
  name: null,
  role: null
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER:
    case AUTHENTICATE: {
      return {
        ...state,
        ...payload
      };
    }
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        isRegistered: false,
        _id: null,
        id: null,
        email: null,
        name: null,
        role: null
      };
    default:
      return state;
  }
}
