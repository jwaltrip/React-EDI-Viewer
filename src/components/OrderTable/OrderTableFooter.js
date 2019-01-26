import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import OrderTableRowsPerPageToggle from './OrderTableRowsPerPageToggle';
import OrderTablePagination from './OrderTablePagination';

const OrderTableFooter = ({ perPage, totalPages, initialPage, handlePerPageSelect, handlePageClick }) => (
  <Col>
    <Row noGutters>
      {/* Rows per page button group */}
      <OrderTableRowsPerPageToggle
        perPage={perPage}
        onPerPageSelect={handlePerPageSelect}
      />
      {/* pagination centered next to button group */}
      <OrderTablePagination
        totalPages={totalPages}
        initialPage={initialPage}
        handlePageClick={handlePageClick}
      />
    </Row>
  </Col>
);

OrderTableFooter.propTypes = {
  perPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  handlePerPageSelect: PropTypes.func.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};

OrderTableFooter.defaultProps = {
  initialPage: 0
};

OrderTableFooter.displayName = 'OrderTableFooter';

export default OrderTableFooter;