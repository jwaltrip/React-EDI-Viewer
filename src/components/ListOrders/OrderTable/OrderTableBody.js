import React from 'react';
import PropTypes from 'prop-types';

const OrderTableBody = ({ isLoading, listOrdersSkeleton, listOrders, orders, perPage, currPage, totalOrders, setCurrentOrder }) => (
  <Table hover size="sm">
    <tbody>
    { isLoading ? listOrdersSkeleton(perPage) : listOrders(orders, perPage, currPage, totalOrders, setCurrentOrder) }
    </tbody>
  </Table>
);

OrderTableBody.displayName = 'OrderTableBody';
OrderTableBody.propTypes = {

};

OrderTableBody.defaultProps = {

};

export default OrderTableBody;