import React from 'react';
import PropTypes from 'prop-types';
import { ModalBody, Container } from 'reactstrap';
import OrderModalDocInfoRow from './OrderModalDocInfoRow';
import OrderModalRefIdRow from './OrderModalRefIdRow';
import OrderModalShipMethodRow from './OrderModalShipMethodRow';
import OrderModalBuyerShipRow from './OrderModalBuyerShipRow';
import OrderModalLineItemInfo from './OrderModalLineItemInfo';

const OrderModalBody = ({ selectedOrder, listLineItems }) => (
  <ModalBody>
    {
      selectedOrder && (
        <Container fluid>
          {/* Document Information */}
          <OrderModalDocInfoRow selectedOrder={selectedOrder} />
          {/* Reference Identificaiton + Datetime Reference */}
          <OrderModalRefIdRow selectedOrder={selectedOrder} />
          {/* Shipping Method */}
          <OrderModalShipMethodRow selectedOrder={selectedOrder} />
          {/* Buyer/Shipping Details */}
          <OrderModalBuyerShipRow selectedOrder={selectedOrder} />
          {/* Line item info */}
          <OrderModalLineItemInfo selectedOrder={selectedOrder} listLineItems={listLineItems} />
        </Container>
      )
    }
  </ModalBody>
);

OrderModalBody.propTypes = {
  listLineItems: PropTypes.func.isRequired,
  selectedOrder: PropTypes.object,
};

OrderModalBody.defaultProps = {
  selectedOrder: {}
};
OrderModalBody.displayName = 'OrderModalBody';

export default OrderModalBody;