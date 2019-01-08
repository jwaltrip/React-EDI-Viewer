import React from 'react';
import PropTypes from 'prop-types';

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

OrderModalBody.displayName = 'OrderModalBody';
OrderModalBody.propTypes = {

};

OrderModalBody.defaultProps = {

};

export default OrderModalBody;