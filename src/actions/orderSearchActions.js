import {
  FETCH_SEARCH_ORDERS_BEGIN,
  FETCH_SEARCH_ORDERS_SUCCESS,
  FETCH_SEARCH_ORDERS_FAILURE,
  SET_SEARCH_CURRENT_ORDER,
  SET_SEARCH_ORDER_ROWS_PER_PAGE,
  SET_SEARCH_CURRENT_PAGE,
  SET_SEARCH_TERM
} from "./types";
import axios from 'axios';

/*
*   BEGIN FETCH SEARCH ORDERS ACTION
* */

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

export const fetchSearchOrders = (searchTerm, currPage, perPage) => dispatch => {
  dispatch(fetchSearchOrdersBegin());

  axios(`/edi/search/${searchTerm}/?limit=${perPage}&page=${currPage}`)
    .then(orders => {
      if (orders.data.success) {
        return dispatch(fetchSearchOrdersSuccess(orders));
      } else {
        return dispatch(fetchSearchOrdersFailure(orders.data.error));
      }
    })
    .catch(err => dispatch(fetchSearchOrdersFailure(err)));
};

/*
*   END FETCH SEARCH ORDERS ACTION
* */

/*
*   BEGIN SET SEARCH CURRENT ORDER ACTION
* */

export const setSearchCurrentOrderSuccess = (order) => ({
  type: SET_SEARCH_CURRENT_ORDER,
  payload: { order }
});

export const setSearchCurrentOrder = (order) => dispatch => {
  return new Promise(resolve => {
    dispatch(setSearchCurrentOrderSuccess(order));

    resolve();
  });
};

/*
*   END SET SEARCH CURRENT ORDER ACTION
* */

/*
*   BEGIN SET SEARCH NUMBER OF ROWS PER PAGE ACTION
* */

export const setSearchRowsPerPageSuccess = (perPage) => ({
  type: SET_SEARCH_ORDER_ROWS_PER_PAGE,
  payload: { perPage }
});

export const setSearchRowsPerPage = (perPage) => dispatch => {
  return new Promise(resolve => {
    dispatch(setSearchRowsPerPageSuccess(perPage));

    resolve();
  })
};

/*
*   END SET SEARCH NUMBER OF ROWS PER PAGE ACTION
* */

/*
*   BEGIN SET SEARCH CURRENT PAGE ACTION
* */

export const setSearchCurrentPageSuccess = (currPage) => ({
  type: SET_SEARCH_CURRENT_PAGE,
  payload: { currPage }
});

export const setSearchCurrentPage = (currPage) => dispatch => {
  return new Promise(resolve => {
    dispatch(setSearchCurrentPageSuccess(currPage));

    resolve();
  })
};

/*
*   END SET SEARCH CURRENT PAGE ACTION
* */

export const setSearchTermSuccess = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: { searchTerm }
});

export const setSearchTerm = (searchTerm) => dispatch => {
  dispatch(setSearchTermSuccess(searchTerm));
};