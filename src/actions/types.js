// these define the different action types to be used in redux

// authentication types
export const GET_AUTH_ERRORS = 'GET_AUTH_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// order types
export const FETCH_ORDERS_BEGIN = 'FETCH_ORDERS_BEGIN';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const SET_ORDER_ROWS_PER_PAGE = 'SET_ORDER_ROWS_PER_PAGE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const FETCH_SEARCH_ORDERS_BEGIN = 'FETCH_SEARCH_ORDERS_BEGIN';
export const FETCH_SEARCH_ORDERS_SUCCESS = 'FETCH_SEARCH_ORDERS_SUCCESS';
export const FETCH_SEARCH_ORDERS_FAILURE = 'FETCH_SEARCH_ORDERS_FAILURE';

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SEARCH_CURRENT_ORDER = 'SET_SEARCH_CURRENT_ORDER';
export const SET_SEARCH_ORDER_ROWS_PER_PAGE = 'SET_SEARCH_ORDER_ROWS_PER_PAGE';
export const SET_SEARCH_CURRENT_PAGE = 'SET_SEARCH_CURRENT_PAGE';