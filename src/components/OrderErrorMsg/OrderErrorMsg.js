import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const OrderErrorMsg = ({ message }) => (
  <Alert color="danger"><strong>Error: </strong>{message}</Alert>
);

OrderErrorMsg.displayName = 'OrderErrorMsg';
OrderErrorMsg.propTypes = {
  message: PropTypes.string,
};

OrderErrorMsg.defaultProps = {
  message: '',
};

export default OrderErrorMsg;