import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container, Table } from 'reactstrap';

// TODO add prop types

const OrderModalLineItemInfo = ({ selectedOrder, listLineItems }) => (
  <Row>
    <Container>
      <Row>
        <Col className="bg-dark text-white pl-3 line-item-header">Line Item Information</Col>
      </Row>
      <Table size="sm">
        <tbody>
        <tr className="title">
          <td className="line-item-head" width="9%">Line #</td>
          <td className="line-item-head" width="70%">Description</td>
          <td className="line-item-head" width="2%">Qty</td>
          <td className="line-item-head text-center" width="7%">Unit</td>
          <td className="line-item-head" width="6%">Price($)</td>
          <td className="line-item-head" width="6%">Total($)</td>
        </tr>
        { listLineItems(selectedOrder) }
        </tbody>
      </Table>
      <Row className="pb-0">
        <Container>
          <Row>
            <span className="pl-3 font-weight-bold">Line Count:</span>
            <span className="pl-3">{selectedOrder["Transaction Set Data"]["Num Line Items"]}</span>
          </Row>
        </Container>
      </Row>
    </Container>
  </Row>
);

OrderModalLineItemInfo.displayName = 'OrderModalLineItemInfo';
OrderModalLineItemInfo.propTypes = {

};

OrderModalLineItemInfo.defaultProps = {

};

export default OrderModalLineItemInfo;