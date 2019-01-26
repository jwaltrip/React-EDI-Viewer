import React from 'react';
import PropTypes from 'prop-types';
import { ModalFooter, Button } from 'reactstrap';

const OrderModalFooter = ({ toggleModal }) => (
  <ModalFooter>
    <Button color="primary" onClick={toggleModal}>Close</Button>
  </ModalFooter>
);

OrderModalFooter.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

OrderModalFooter.displayName = 'OrderModalFooter';

export default OrderModalFooter;