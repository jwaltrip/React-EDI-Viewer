import React from 'react';
import PropTypes from 'prop-types';

const OrderModalFooter = ({ toggleModal }) => (
  <ModalFooter>
    <Button color="primary" onClick={toggleModal}>Close</Button>
  </ModalFooter>
);

OrderModalFooter.displayName = 'OrderModalFooter';
OrderModalFooter.propTypes = {

};

OrderModalFooter.defaultProps = {

};

export default OrderModalFooter;