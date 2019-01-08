import React from 'react';
import PropTypes from 'prop-types';

const OrderModal = ({ isOpen, toggleModal, listLineItems, selectedOrder }) => (
  <Modal isOpen={isOpen} toggle={toggleModal} size="lg">
    <OrderModalHeader selectedOrder={selectedOrder} toggleModal={toggleModal} />
    <OrderModalBody selectedOrder={selectedOrder} listLineItems={listLineItems} />
    <OrderModalFooter toggleModal={toggleModal} />
  </Modal>
);

OrderModal.displayName = 'OrderModal';
OrderModal.propTypes = {

};

OrderModal.defaultProps = {

};

export default OrderModal;