import { combineReducers } from 'redux';
import postReducer from './postReducer';

// export rootReducer
export default combineReducers({
  posts: postReducer
});
