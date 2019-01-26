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
  orders: state.orderData.orders,
  currentPage: state.orderData.currentPage,
  perPage: state.orderData.perPage,
  totalPages: state.orderData.totalPages,
  totalResults: state.orderData.totalResults,
  selectedOrder: state.orderData.selectedOrder,
  isLoading: state.orderData.isLoading,
  error: state.orderData.error,
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (currPage, perPage) => dispatch(fetchOrders(currPage, perPage)),
  setCurrentOrder: (order) => dispatch(setCurrentOrder(order)),
  setRowsPerPage: (perPage) => dispatch(setRowsPerPage(perPage)),
  setCurrentPage: (currPage) => dispatch(setCurrentPage(currPage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListAllOrders));