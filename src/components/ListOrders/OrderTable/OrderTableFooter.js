import React from 'react';
import PropTypes from 'prop-types';

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

OrderTableFooter.displayName = 'OrderTableFooter';
OrderTableFooter.propTypes = {

};

OrderTableFooter.defaultProps = {

};

export default OrderTableFooter;