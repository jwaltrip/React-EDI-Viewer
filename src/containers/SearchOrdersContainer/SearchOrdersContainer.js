import SearchOrders from '../../components/SearchOrders';
import { withRouter } from 'react-router-dom';
// redux imports
import { connect } from "react-redux";
import {
  fetchSearchOrders,
  setSearchCurrentOrder,
  setSearchRowsPerPage,
  setSearchCurrentPage,
  setSearchTerm
} from "../../actions/orderSearchActions";

const mapStateToProps = state => ({
  orders: state.searchOrderData.orders,
  currentPage: state.searchOrderData.currentPage,
  perPage: state.searchOrderData.perPage,
  totalPages: state.searchOrderData.totalPages,
  totalResults: state.searchOrderData.totalResults,
  selectedOrder: state.searchOrderData.selectedOrder,
  isLoading: state.searchOrderData.isLoading,
  error: state.searchOrderData.error,
  searchTerm: state.searchOrderData.searchTerm,
});

const mapDispatchToProps = dispatch => ({
  fetchSearchOrders: (searchTerm, currPage, perPage) => dispatch(fetchSearchOrders(searchTerm, currPage, perPage)),
  setSearchCurrentOrder: (order) => dispatch(setSearchCurrentOrder(order)),
  setSearchRowsPerPage: (perPage) => dispatch(setSearchRowsPerPage(perPage)),
  setSearchCurrentPage: (currPage) => dispatch(setSearchCurrentPage(currPage)),
  setSearchTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchOrders));