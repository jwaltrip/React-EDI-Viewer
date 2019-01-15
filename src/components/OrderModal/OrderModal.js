import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import OrderModalHeader from './OrderModalHeader';
import OrderModalBody from './OrderModalBody';
import OrderModalFooter from './OrderModalFooter';

// TODO set prop types

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