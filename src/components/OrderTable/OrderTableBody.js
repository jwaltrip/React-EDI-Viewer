import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

const OrderTableBody = ({ isLoading, listOrdersSkeleton, listOrders, orders, perPage, currPage, totalOrders, setCurrentOrder }) => (
  <Table hover size="sm">
    <tbody>
    { isLoading ? listOrdersSkeleton(perPage, totalOrders) : listOrders(orders, perPage, currPage, totalOrders, setCurrentOrder) }
    </tbody>
  </Table>
);

OrderTableBody.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  orders: PropTypes.array,
  perPage: PropTypes.number.isRequired,
  totalOrders: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  listOrders: PropTypes.func.isRequired,
  listOrdersSkeleton: PropTypes.func.isRequired,
  setCurrentOrder: PropTypes.func.isRequired,
};

OrderTableBody.defaultProps = {
  orders: []
};

OrderTableBody.displayName = 'OrderTableBody';

export default OrderTableBody;