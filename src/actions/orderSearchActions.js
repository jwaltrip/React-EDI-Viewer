import {
  FETCH_SEARCH_ORDERS_BEGIN,
  FETCH_SEARCH_ORDERS_SUCCESS,
  FETCH_SEARCH_ORDERS_FAILURE
} from "./types";
import axios from 'axios';

export const fetchSearchOrdersBegin = () => ({
  type: FETCH_SEARCH_ORDERS_BEGIN
});

export const fetchSearchOrdersSuccess = (orders) => ({
  type: FETCH_SEARCH_ORDERS_SUCCESS,
  payload: {
    data: orders.data.result.docs,
    currentPage: orders.data.result.page,
    perPage: orders.data.result.limit,
    totalPages: orders.data.result.pages,
    totalResults: orders.data.result.total,
  }
});

export const fetchSearchOrdersFailure = (error) => ({
  type: FETCH_SEARCH_ORDERS_FAILURE,
  payload: { error: error.response.statusText }
});

export const fetchSearchOrders = (searchTerm, currPage = 1, perPage = 20) => dispatch => {
  dispatch(fetchSearchOrdersBegin());

  axios(`/edi/search/${searchTerm}/?limit=${perPage}`)
    .then(orders => {
      console.log('search', orders);

      if (orders.data.success) {
        return dispatch(fetchSearchOrdersSuccess(orders));
      } else {
        return dispatch(fetchSearchOrdersFailure(orders.data.error));
      }
    })
    .catch(err => dispatch(fetchSearchOrdersFailure(err)));
};