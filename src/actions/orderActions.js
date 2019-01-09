import { FETCH_ORDERS_BEGIN, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from "./types";
import axios from 'axios';

export const fetchOrdersBegin = () => ({
  type: FETCH_ORDERS_BEGIN
});

export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: { data: orders.data.result }
});

export const fetchOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: { error }
});

export const fetchOrders = (currPage = 1, perPage = 20) => dispatch => {
  dispatch(fetchOrdersBegin());

  axios(`/edi/${currPage}/?limit=${perPage}`)
    .then(orders => dispatch(fetchOrdersSuccess(orders)))
    .catch(error => dispatch(fetchOrdersFailure(error)));

};