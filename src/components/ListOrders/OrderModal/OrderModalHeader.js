import React from 'react';
import PropTypes from 'prop-types';

const OrderModalHeader = ({ selectedOrder, toggleModal }) => (
  <ModalHeader toggle={toggleModal}>
    { selectedOrder && (<strong><span className="text-muted">Lumaprints Purchase Order #:</span> <span className="text-dark">{selectedOrder["Luma Order Number"]}</span></strong>) }
  </ModalHeader>
);

OrderModalHeader.displayName = 'OrderModalHeader';
OrderModalHeader.propTypes = {

};

OrderModalHeader.defaultProps = {

};

export default OrderModalHeader;