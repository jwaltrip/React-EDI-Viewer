import {
  FETCH_SEARCH_ORDERS_BEGIN,
  FETCH_SEARCH_ORDERS_SUCCESS,
  FETCH_SEARCH_ORDERS_FAILURE
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
    default:
      return state;
  }
}