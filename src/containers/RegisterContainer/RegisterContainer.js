import Register from '../../components/Register';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from "../../actions/authActions";

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.authErrors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));