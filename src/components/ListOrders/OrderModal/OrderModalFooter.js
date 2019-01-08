import React from 'react';
import PropTypes from 'prop-types';
import { ModalFooter, Button } from 'reactstrap';

// TODO add prop types

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