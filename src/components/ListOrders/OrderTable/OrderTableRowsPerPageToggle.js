import React from 'react';
import PropTypes from 'prop-types';

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

OrderTableRowsPerPageToggle.displayName = 'OrderTableRowsPerPageToggle';
OrderTableRowsPerPageToggle.propTypes = {

};

OrderTableRowsPerPageToggle.defaultProps = {

};

export default OrderTableRowsPerPageToggle;