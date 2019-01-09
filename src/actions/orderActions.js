import { FETCH_ORDERS_BEGIN, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from "./types";
import axios from 'axios';

export const fetchOrdersBegin = () => ({
  type: FETCH_ORDERS_BEGIN
});

export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: {
    data: orders.data.result.docs,
    currentPage: orders.data.result.page,
    perPage: orders.data.result.limit,
    totalPages: orders.data.result.pages,
    totalResults: orders.data.result.total,
  }
});

export const fetchOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: { error }
});

export const fetchOrders = (currPage = 1, perPage = 20) => dispatch => {
  dispatch(fetchOrdersBegin());

  axios(`/edi/${currPage}/?limit=${perPage}`)
    .then(orders => {
      console.log(orders);

      if (orders.data.success) return dispatch(fetchOrdersSuccess(orders))
      else return dispatch(fetchOrdersFailure(orders.data.error.name));
    })
    .catch(error => dispatch(fetchOrdersFailure(error)));

};