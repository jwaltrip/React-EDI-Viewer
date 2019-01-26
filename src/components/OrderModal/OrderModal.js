import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import OrderModalHeader from './OrderModalHeader';
import OrderModalBody from './OrderModalBody';
import OrderModalFooter from './OrderModalFooter';

const OrderModal = ({ isOpen, toggleModal, listLineItems, selectedOrder }) => (
  <Modal isOpen={isOpen} toggle={toggleModal} size="lg">
    <OrderModalHeader selectedOrder={selectedOrder} toggleModal={toggleModal} />
    <OrderModalBody selectedOrder={selectedOrder} listLineItems={listLineItems} />
    <OrderModalFooter toggleModal={toggleModal} />
  </Modal>
);

OrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  listLineItems: PropTypes.func.isRequired,
  selectedOrder: PropTypes.object,
};

OrderModal.defaultProps = {
  selectedOrder: {}
};
OrderModal.displayName = 'OrderModal';

export default OrderModal;