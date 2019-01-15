import {
  FETCH_ORDERS_BEGIN,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  SET_CURRENT_ORDER,
  SET_ORDER_ROWS_PER_PAGE,
  SET_CURRENT_PAGE
} from "../../actions/types";

const initialState = {
  orders: [],
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
  perPage: 20,
  selectedOrder: null,
  isLoading: true,
  error: null
};

export default function orderReducer(state = initialState, action) {
  const { payload } = action;

  switch(action.type) {
    case FETCH_ORDERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload.data,
        currentPage: payload.currentPage,
        perPage: payload.perPage,
        totalPages: payload.totalPages,
        totalResults: payload.totalResults
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };
    case SET_CURRENT_ORDER:
      return {
        ...state,
        selectedOrder: payload.order
      };
    case SET_ORDER_ROWS_PER_PAGE:
      return {
        ...state,
        perPage: payload.perPage
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        isLoading: true,
        currentPage: payload.currPage
      };
    default:
      return state;
  }
}