import Navbar from '../../components/Navbar';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));