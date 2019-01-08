import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

const OrderModalDocInfoRow = ({ selectedOrder }) => (
  <Row className="pb-2">
    {/* Doc Info - LEFT */}
    <Col xs="6">
      <Row className="line-item-header">
        <Col className="bg-dark text-white pl-3">Document Information</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Lumaprints Order #:</Col>
        <Col xs="6">{selectedOrder["Luma Order Number"]}</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Partner Order #:</Col>
        <Col xs="6">{selectedOrder["Partner Po Number"]}</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">PO Date:</Col>
        <Col xs="6">{moment(selectedOrder["Transaction Set Data"]["Purchase Order Date"]).format("YYYY-MM-DD")}</Col>
      </Row>
    </Col>

    {/* Doc Info - RIGHT */}
    <Col xs="6">
      <Row className="line-item-header">
        <Col className="bg-dark text-white pl-3">&nbsp;</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Purchase Order Type:</Col>
        <Col xs="6" className="pl-3">{selectedOrder["Transaction Set Data"]["Purchase Order Type Code"][0]}</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Transaction Purpose:</Col>
        <Col xs="6" className="pl-3">{selectedOrder["Transaction Set Data"]["Transaction Set Purpose Code"][0]}</Col>
      </Row>
    </Col>
  </Row>
);

OrderModalDocInfoRow.displayName = 'OrderModalDocInfoRow';
OrderModalDocInfoRow.propTypes = {

};

OrderModalDocInfoRow.defaultProps = {

};

export default OrderModalDocInfoRow;