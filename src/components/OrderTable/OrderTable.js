import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import OrderTableHeader from './OrderTableHeader';
import OrderTableBody from './OrderTableBody';
import OrderTableFooter from './OrderTableFooter';

const OrderTable = ({ isLoading,
                      orders,
                      perPage,
                      totalPages,
                      totalOrders,
                      currPage,
                      initialPage,
                      listOrders,
                      listOrdersSkeleton,
                      setCurrentOrder,
                      onPerPageSelect,
                      onPageClick }) => (
  <div>
    {/* Order Table Sticky Header (onScroll) */}
    <Sticky><OrderTableHeader /></Sticky>

    {/* Order Table Body */}
    <OrderTableBody
      isLoading={isLoading}
      listOrdersSkeleton={listOrdersSkeleton}
      listOrders={listOrders}
      orders={orders}
      perPage={perPage}
      currPage={currPage}
      totalOrders={totalOrders}
      setCurrentOrder={setCurrentOrder}
    />

    {/* Table footer - contains pagination and ordersPerPage select */}
    <OrderTableFooter
      perPage={perPage}
      totalPages={totalPages}
      initialPage={initialPage}
      handlePerPageSelect={onPerPageSelect}
      handlePageClick={onPageClick}
    />
  </div>
);

OrderTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  orders: PropTypes.array,
  perPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalOrders: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  listOrders: PropTypes.func.isRequired,
  listOrdersSkeleton: PropTypes.func.isRequired,
  setCurrentOrder: PropTypes.func.isRequired,
  onPerPageSelect: PropTypes.func.isRequired,
  onPageClick: PropTypes.func.isRequired,
};

OrderTable.defaultProps = {
  orders: [],
  initialPage: 0
};

OrderTable.displayName = 'OrderTable';

export default OrderTable;