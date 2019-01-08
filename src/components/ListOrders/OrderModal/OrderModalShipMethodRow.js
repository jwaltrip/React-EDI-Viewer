import React from 'react';
import PropTypes from 'prop-types';

const OrderModalShipMethodRow = ({ selectedOrder }) => (
  <Row className="pb-2">
    <Container>
      <Row>
        <Col className="bg-dark text-white pl-3 line-item-header">Shipping Details (Routing Sequence/Transit Time)</Col>
      </Row>
      <Row>
        <Col xs="4" className="font-weight-bold">Ship ID Code Qualifier:</Col>
        <Col xs="8">{selectedOrder["Transaction Set Data"]["Shipping Method ID Code Qualifier"][0]}</Col>
      </Row>
      <Row>
        <Col xs="4" className="font-weight-bold">Ship ID Code/Route:</Col>
        <Col xs="8">{selectedOrder["Transaction Set Data"]["Shipping Method ID Code"] + ' ' + selectedOrder["Transaction Set Data"]["Shipping Routing Method"]}</Col>
      </Row>
    </Container>
  </Row>
);

OrderModalShipMethodRow.displayName = 'OrderModalShipMethodRow';
OrderModalShipMethodRow.propTypes = {

};

OrderModalShipMethodRow.defaultProps = {

};

export default OrderModalShipMethodRow;