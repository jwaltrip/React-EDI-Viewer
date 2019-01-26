import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';

const OrderTablePagination = ({ totalPages, initialPage, handlePageClick }) => (
  <Col xs="10">
    <nav>
      <ReactPaginate previousLabel={"«"}
                     nextLabel={"»"}
                     breakLabel={"..."}
                     breakClassName={"page-item break-disabled"}
                     pageCount={totalPages}
                     marginPagesDisplayed={2}
                     pageRangeDisplayed={5}
                     onPageChange={handlePageClick}
                     containerClassName={"pagination text-center justify-content-center"}
                     subContainerClassName={"pages pagination"}
                     activeClassName={"active"}
                     disabledClassName={"disabled"}
                     pageClassName={"page-item"}
                     previousClassName={"page-item prev-next-label"}
                     nextClassName={"page-item prev-next-label"}
                     pageLinkClassName={"page-link"}
                     previousLinkClassName={"page-link"}
                     nextLinkClassName={"page-link"}
                     initialPage={initialPage}
      />
    </nav>
  </Col>
);

OrderTablePagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  handlePageClick: PropTypes.func.isRequired,
};

OrderTablePagination.defaultProps = {
  initialPage: 0
};

OrderTablePagination.displayName = 'OrderTablePagination';

export default OrderTablePagination;