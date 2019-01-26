import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { Row, Col } from 'reactstrap';

const OrderModalRefIdRow = ({ selectedOrder }) => (
  <Row className="pb-2">
    {/* Ref ID - LEFT */}
    <Col xs="6">
      <Row className="mr-1">
        <Col className="bg-dark text-white pl-3 line-item-header">Reference Identification</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Vendor ID #: </Col>
        <Col xs="6">{selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Vendor ID Number"]}</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Customer Order #: </Col>
        <Col xs="6">{selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Order Number"]}</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Customer Ref #: </Col>
        <Col xs="6">{selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Customer Reference Number"]}</Col>
      </Row>
    </Col>

    {/* Date/Time Ref - RIGHT */}
    <Col xs="6">
      <Row>
        <Col className="bg-dark text-white line-item-header">Date/Time Reference</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Customer Order Date:</Col>
        <Col xs="6" className="pl-3">{moment(selectedOrder["Transaction Set Data"]["DateTime References"]["Order"]).format("YYYY-MM-DD")}</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Requested Ship:</Col>
        <Col xs="6" className="pl-3">{moment(selectedOrder["Transaction Set Data"]["DateTime References"]["Requested Ship"]).format("YYYY-MM-DD")}</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Delivery Requested:</Col>
        <Col xs="6" className="pl-3">{moment(selectedOrder["Transaction Set Data"]["DateTime References"]["Delivery Requested"]).format("YYYY-MM-DD")}</Col>
      </Row>
    </Col>
  </Row>
);

OrderModalRefIdRow.propTypes = {
  selectedOrder: PropTypes.object.isRequired,
};

OrderModalRefIdRow.displayName = 'OrderModalRefIdRow';

export default OrderModalRefIdRow;