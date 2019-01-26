import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ButtonGroup, Button } from 'reactstrap';

const OrderTableRowsPerPageToggle = ({ perPage, onPerPageSelect }) => (
  <Col xs="1">
    <Row className="justify-content-center">
      <ButtonGroup size="sm">
        <Button color="secondary" onClick={() => onPerPageSelect(20)} active={perPage === 20}>20</Button>
        <Button color="secondary" onClick={() => onPerPageSelect(50)} active={perPage === 50}>50</Button>
        <Button color="secondary" onClick={() => onPerPageSelect(100)} active={perPage === 100}>100</Button>
      </ButtonGroup>
    </Row>
    <Row><small className="w-100 text-center">rows per page</small></Row>
  </Col>
);

OrderTableRowsPerPageToggle.propTypes = {
  perPage: PropTypes.number.isRequired,
  onPerPageSelect: PropTypes.func.isRequired,
};

OrderTableRowsPerPageToggle.displayName = 'OrderTableRowsPerPageToggle';

export default OrderTableRowsPerPageToggle;