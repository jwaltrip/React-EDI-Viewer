// this creates and exports the rootReducer
// all reducers should be imported here, and added as key:value pairs in the combineReducers fn
import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authErrorReducer from "./authentication/authErrorReducer";
import authReducer from "./authentication/authReducer";

// export rootReducer
export default combineReducers({
  posts: postReducer,
  authErrors: authErrorReducer,
  auth: authReducer
});
