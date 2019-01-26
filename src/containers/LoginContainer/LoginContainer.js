import Login from '../../components/Login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from "../../actions/authActions";

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.authErrors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));