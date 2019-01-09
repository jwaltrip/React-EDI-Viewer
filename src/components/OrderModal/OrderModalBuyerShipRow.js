import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'reactstrap';

// TODO add prop types

const OrderModalBuyerShipRow = ({ selectedOrder }) => (
  <Row className="pb-2">
    {/* LEFT */}
    <Col xs="6">
      <Row className="mr-1">
        <Col className="bg-dark text-white pl-3 line-item-header">Buyer Details</Col>
      </Row>
      {/* Buyer Address */}
      <Row>
        <Col xs="12" className="mb-1 font-weight-bold">Bill-to-Party</Col>
        <Col xs="12">{selectedOrder["Buyer Data"]["Buyer Name"]}</Col>
        <Col xs="12">
          { selectedOrder["Buyer Data"]["Buyer Address Line 2"] ?
            selectedOrder["Buyer Data"]["Buyer Address Line 1"] + ', ' + selectedOrder["Buyer Data"]["Buyer Address Line 2"] :
            selectedOrder["Buyer Data"]["Buyer Address Line 1"]
          }
        </Col>
        <Col xs="12" className="mb-1">
          {selectedOrder["Buyer Data"]["Buyer City"] + ', ' + selectedOrder["Buyer Data"]["Buyer State"] + ' ' + selectedOrder["Buyer Data"]["Buyer Zip"] + ', ' + selectedOrder["Buyer Data"]["Buyer Country"]}
        </Col>
        {/* Buyer Contact Info */}
        <Col className="mb-1 font-weight-bold">Contact Info</Col>
        <Container>
          <Row>
            <Col xs="2">Email:</Col>
            <Col xs="10">{selectedOrder["Buyer Data"]["Buyer Email"]}</Col>
          </Row>
          <Row>
            <Col xs="2">Phone:</Col>
            <Col xs="10">{selectedOrder["Buyer Data"]["Buyer Telephone"]}</Col>
          </Row>
        </Container>
      </Row>
    </Col>

    {/* RIGHT */}
    <Col xs="6">
      <Row>
        <Col className="bg-dark text-white pl-3 line-item-header">Shipping Details</Col>
      </Row>
      {/* Shipping Address */}
      <Row>
        <Col xs="12" className="mb-1 font-weight-bold">Ship To</Col>
        <Col xs="12">{selectedOrder["Shipping Data"]["Shipping Name"]}</Col>
        <Col xs="12">
          { selectedOrder["Shipping Data"]["Shipping Address Line 2"] ?
            selectedOrder["Shipping Data"]["Shipping Address Line 1"] + ', ' + selectedOrder["Shipping Data"]["Shipping Address Line 2"] :
            selectedOrder["Shipping Data"]["Shipping Address Line 1"]
          }
        </Col>
        <Col xs="12" className="mb-1">
          {selectedOrder["Shipping Data"]["Shipping City"] + ', ' + selectedOrder["Shipping Data"]["Shipping State"] + ' ' + selectedOrder["Shipping Data"]["Shipping Zip"] + ', ' + selectedOrder["Shipping Data"]["Ship Country"]}
        </Col>
        {/* Shipping Contact Info */}
        <Col className="mb-1 font-weight-bold">Contact Info</Col>
        <Container>
          <Row>
            <Col xs="2">Email:</Col>
            <Col xs="10">{selectedOrder["Shipping Data"]["Shipping Email"]}</Col>
          </Row>
          <Row>
            <Col xs="2">Phone:</Col>
            <Col xs="10">{selectedOrder["Shipping Data"]["Shipping Telephone"]}</Col>
          </Row>
        </Container>
      </Row>
    </Col>
  </Row>
);

OrderModalBuyerShipRow.displayName = 'OrderModalBuyerShipRow';
OrderModalBuyerShipRow.propTypes = {

};

OrderModalBuyerShipRow.defaultProps = {

};

export default OrderModalBuyerShipRow;