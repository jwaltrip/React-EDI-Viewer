import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

// TODO add prop types

const OrderTableBody = ({ isLoading, listOrdersSkeleton, listOrders, orders, perPage, currPage, totalOrders, setCurrentOrder }) => (
  <Table hover size="sm">
    <tbody>
    { isLoading ? listOrdersSkeleton(perPage, totalOrders) : listOrders(orders, perPage, currPage, totalOrders, setCurrentOrder) }
    </tbody>
  </Table>
);

OrderTableBody.displayName = 'OrderTableBody';
OrderTableBody.propTypes = {

};

OrderTableBody.defaultProps = {

};

export default OrderTableBody;