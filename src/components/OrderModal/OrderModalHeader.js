import React from 'react';
import PropTypes from 'prop-types';
import { ModalHeader } from 'reactstrap';

const OrderModalHeader = ({ selectedOrder, toggleModal }) => (
  <ModalHeader toggle={toggleModal}>
    { selectedOrder && (<strong><span className="text-muted">Lumaprints Purchase Order #:</span> <span className="text-dark">{selectedOrder["Luma Order Number"]}</span></strong>) }
  </ModalHeader>
);

OrderModalHeader.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  selectedOrder: PropTypes.object,
};

OrderModalHeader.defaultProps = {
  selectedOrder: {}
};

OrderModalHeader.displayName = 'OrderModalHeader';

export default OrderModalHeader;