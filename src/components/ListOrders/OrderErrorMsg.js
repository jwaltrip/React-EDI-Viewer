import React from 'react';
import PropTypes from 'prop-types';

const OrderErrorMsg = ({ message }) => (
  <Alert color="danger"><strong>Error: </strong>{message}</Alert>
);

OrderErrorMsg.displayName = 'OrderErrorMsg';
OrderErrorMsg.propTypes = {

};

OrderErrorMsg.defaultProps = {

};

export default OrderErrorMsg;