import {
  FETCH_ORDERS_BEGIN,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  SET_CURRENT_ORDER,
  SET_ORDER_ROWS_PER_PAGE
} from "./types";
import axios from 'axios';

/*
*   BEGIN FETCH ORDERS ACTION
* */

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
  payload: { error: error.response.statusText }
});

export const fetchOrders = (currPage = 1, perPage = 20) => dispatch => {
  dispatch(fetchOrdersBegin());

  axios(`/edi/${currPage}/?limit=${perPage}`)
    .then(orders => {
      console.log(orders);

      if (orders.data.success) return dispatch(fetchOrdersSuccess(orders));
      else return dispatch(fetchOrdersFailure(orders.data.error));
    })
    .catch(error => dispatch(fetchOrdersFailure(error)));

};

/*
*   END FETCH ORDERS ACTION
* */

/*
*   BEGIN SET CURRENT ORDER ACTION
* */

export const setCurrentOrderSuccess = (order) => ({
  type: SET_CURRENT_ORDER,
  payload: { order }
});

export const setCurrentOrder = (order) => dispatch => {
  return new Promise(resolve => {
    dispatch(setCurrentOrderSuccess(order));

    resolve();
  })
};

/*
*   END SET CURRENT ORDER ACTION
* */

/*
*   BEGIN SET NUMBER OF ROWS PER PAGE ACTION
* */

export const setRowsPerPageSuccess = (perPage) => ({
  type: SET_ORDER_ROWS_PER_PAGE,
  payload: { perPage }
});

export const setRowsPerPage = (perPage) => dispatch => {
  return new Promise(resolve => {
    dispatch(setRowsPerPageSuccess(perPage));

    resolve();
  });
};