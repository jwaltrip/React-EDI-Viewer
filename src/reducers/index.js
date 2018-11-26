// this creates and exports the rootReducer
// all reducers should be imported here, and added as key:value pairs in the combineReducers fn
import { combineReducers } from 'redux';
import postReducer from './postReducer';
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

// export rootReducer
export default combineReducers({
  posts: postReducer,
  errors: errorReducer,
  auth: authReducer
});
