import {
  FETCH_SEARCH_ORDERS_BEGIN,
  FETCH_SEARCH_ORDERS_SUCCESS,
  FETCH_SEARCH_ORDERS_FAILURE,
  SET_SEARCH_CURRENT_ORDER,
  SET_SEARCH_ORDER_ROWS_PER_PAGE,
  SET_SEARCH_CURRENT_PAGE, SET_SEARCH_TERM
} from "../../actions/types";

const initialState = {
  orders: [],
  searchTerm: '',
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
  perPage: 20,
  selectedOrder: null,
  isLoading: true,
  error: null
};

export default function orderSearchReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case FETCH_SEARCH_ORDERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_SEARCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload.data,
        currentPage: payload.currentPage,
        perPage: payload.perPage,
        totalPages: payload.totalPages,
        totalResults: payload.totalResults,
        isLoading: false,
      };
    case FETCH_SEARCH_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };
    case SET_SEARCH_CURRENT_ORDER:
      return {
        ...state,
        selectedOrder: payload.order
      };
    case SET_SEARCH_ORDER_ROWS_PER_PAGE:
      return {
        ...state,
        perPage: payload.perPage
      };
    case SET_SEARCH_CURRENT_PAGE:
      return {
        ...state,
        isLoading: true,
        currentPage: payload.currPage
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: payload.searchTerm
      };
    default:
      return state;
  }
}