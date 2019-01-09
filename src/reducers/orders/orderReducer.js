import { FETCH_ORDERS_BEGIN, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from "../../actions/types";

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
        orders: action.payload,
        // currentPage: action.payload.page,
        // perPage: action.payload.limit,
        // totalPages: action.payload.total,
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}