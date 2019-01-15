// this creates and exports the rootReducer
// all reducers should be imported here, and added as key:value pairs in the combineReducers fn
import { combineReducers } from 'redux';
import authErrorReducer from "./authentication/authErrorReducer";
import authReducer from "./authentication/authReducer";
import ordersReducer from './orders/orderReducer';
import orderSearchReducer from './orders/orderSearchReducer';

// export rootReducer
export default combineReducers({
  auth: authReducer,
  authErrors: authErrorReducer,
  orderData: ordersReducer,
  searchOrderData: orderSearchReducer
});
