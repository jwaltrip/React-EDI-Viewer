import ListAllOrders from '../../components/ListAllOrders';
import { withRouter } from 'react-router-dom';
// redux imports
import { connect } from "react-redux";
import {
  fetchOrders,
  setCurrentOrder,
  setRowsPerPage,
  setCurrentPage
} from "../../actions/orderActions";

const mapStateToProps = state => ({
  orders: state.ediOrderData.orders,
  currentPage: state.ediOrderData.currentPage,
  perPage: state.ediOrderData.perPage,
  totalPages: state.ediOrderData.totalPages,
  totalResults: state.ediOrderData.totalResults,
  selectedOrder: state.ediOrderData.selectedOrder,
  isLoading: state.ediOrderData.isLoading,
  error: state.ediOrderData.error
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (currPage, perPage) => dispatch(fetchOrders(currPage, perPage)),
  setCurrentOrder: (order) => dispatch(setCurrentOrder(order)),
  setRowsPerPage: (perPage) => dispatch(setRowsPerPage(perPage)),
  setCurrentPage: (currPage) => dispatch(setCurrentPage(currPage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(ListAllOrders));