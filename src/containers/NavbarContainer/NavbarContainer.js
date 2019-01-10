import Navbar from '../../components/Navbar';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  fetchSearchOrders
} from "../../actions/orderSearchActions";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  fetchSearchOrders: (searchTerm, currPage, perPage) => dispatch(fetchSearchOrders(searchTerm, currPage, perPage)),
  logoutUser: (history) => dispatch(logoutUser(history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));