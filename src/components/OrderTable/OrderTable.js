import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import OrderTableHeader from './OrderTableHeader';
import OrderTableBody from './OrderTableBody';
import OrderTableFooter from './OrderTableFooter';

// TODO add prop types

const OrderTable = ({ isLoading, orders, perPage, totalPages, totalOrders, currPage, initialPage, listOrders, listOrdersSkeleton, setCurrentOrder, onPerPageSelect, onPageClick }) => (
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

OrderTable.displayName = 'OrderTable';
OrderTable.propTypes = {

};

OrderTable.defaultProps = {

};

export default OrderTable;