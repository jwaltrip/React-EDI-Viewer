import TopNavbar from '../../components/TopNavbar';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logoutUser: (history) => dispatch(logoutUser(history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopNavbar));