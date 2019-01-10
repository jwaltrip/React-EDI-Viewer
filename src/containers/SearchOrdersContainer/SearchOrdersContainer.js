import SearchOrders from '../../components/SearchOrders';
import { withRouter } from 'react-router-dom';
// redux imports
import { connect } from "react-redux";

const mapStateToProps = state => ({
  orders: state.searchOrderData.orders,
  currentPage: state.searchOrderData.currentPage,
  perPage: state.searchOrderData.perPage,
  totalPages: state.searchOrderData.totalPages,
  totalResults: state.searchOrderData.totalResults,
  selectedOrder: state.searchOrderData.selectedOrder,
  isLoading: state.searchOrderData.isLoading,
  error: state.searchOrderData.error
});

const mapDispatchToProps = dispatch => ({
  // fetchSearchOrders: (searchTerm, currPage, perPage) => dispatch(fetchSearchOrders(searchTerm, currPage, perPage)),
  // setCurrentOrder: (order) => dispatch(setCurrentOrder(order)),
  // setRowsPerPage: (perPage) => dispatch(setRowsPerPage(perPage)),
  // setCurrentPage: (currPage) => dispatch(setCurrentPage(currPage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(SearchOrders));