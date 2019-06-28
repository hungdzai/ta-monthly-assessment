import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import okrReducer from './okrReducer';
import assessmentReducer from './assessmentReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  user: userReducer,
  project: projectReducer,
  okr: okrReducer,
  assessment: assessmentReducer
});
