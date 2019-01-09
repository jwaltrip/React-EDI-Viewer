import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { range } from '../../utils/utils';
import { Container, Row, Col } from 'reactstrap';

import './ListAllOrders.css';

import OrderTable from '../OrderTable';
import OrderModal from '../OrderModal';
import OrderErrorMsg from '../OrderErrorMsg';

class ListAllOrders extends Component {

  // TODO add prop types from redux state
  static propTypes = {

  };

  state = { modal: false };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id === this.props.currentPage) {
      this.props.fetchOrders(this.props.currentPage, this.props.perPage);
    } else {
      this.props.fetchOrders(Number(id), this.props.perPage);
    }
  }

  handlePageClick = (data) => {
    this.props.setCurrentPage(data.selected + 1).then(() => {
      // update router url
      this.props.history.push(`/orders/${this.props.currentPage}`);
      // fetch next page data
      this.props.fetchOrders(this.props.currentPage, this.props.perPage);
    });
  };

  listOrders = (orders, perPage, currPage, totalOrders, setCurrentOrder) => {
    const startIdx = totalOrders - (perPage * currPage-1);
    const idxRange = range(perPage, startIdx).reverse();

    return orders.map((order, idx) => {
      return (
        <tr className="order-row" key={`order-row-${idx}`} onClick={() => setCurrentOrder(order)}>
          <th width="5%" scope="row">{idxRange[idx]}</th>
          <td width="49%">{order["Filename"]}</td>
          <td width="18%">{order["Luma Order Number"]}</td>
          <td width="18%">{order["Partner Po Number"]}</td>
          <td width="18%">{moment(order["Transaction Set Data"]["Purchase Order Date"]).format("YYYY-MM-DD")}</td>
        </tr>
      );
    });
  };

  listOrdersSkeleton = (perPage) => {
    const idxRange = range(perPage);

    return idxRange.map((order, idx) => {
      return (
        <tr key={`order-skeleton-${idx}`}>
          <th width="5%" className="order-skeleton" scope="row">&#9608;&#9608;</th>
          <td width="49%" className="order-skeleton">
            &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
          </td>
          <td width="18%" className="order-skeleton">
            &#9608;&#9608;&#9608;&#9608;&#9608;
          </td>
          <td width="18%" className="order-skeleton">
            &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
          </td>
          <td width="18%" className="order-skeleton">
            &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
          </td>
        </tr>
      );
    });
  };

  listLineItems = (order) => {
    let lineItems = [];

    for (let i=0; i<order["Line Item Data"]["Product SKU"].length; i++) {
      const lineItemID = order["Line Item Data"]["Line Item ID"][i];
      const sku = order["Line Item Data"]["Product SKU"][i];
      const itemDesc = order["Line Item Data"]["Item Description"][i];
      const qty = order["Line Item Data"]["Quantity"][i];
      const unitM = order["Line Item Data"]["Unit Measurement Code"][i];
      const itemCostEa = order["Line Item Data"]["Unit Price"][i];
      const itemCostThruQty = order["Line Item Data"]["Unit Cost Thru Quantity"][i];

      const currLineItem = (
        <tr key={`order-line-item-${i}`} className="border-bottom">
          <td className="font-weight-bold text-dark">{lineItemID}</td>
          <td>
            <Row noGutters>
              <Col xs="3" className="font-weight-bold text-dark">SKU:</Col>
              <Col xs="9" className="px-0">{sku}</Col>
            </Row>
            <Row noGutters>
              <Col xs="3" className="font-weight-bold text-dark">Item Desc:</Col>
              <Col xs="9" className="px-0">{itemDesc}</Col>
            </Row>
          </td>
          <td className="text-center">{qty}</td>
          <td className="text-center">{unitM}</td>
          <td className="text-center">{itemCostEa}</td>
          <td className="text-center">{itemCostThruQty}</td>
        </tr>
      );

      lineItems.push(currLineItem);
    }

    return lineItems;
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  setCurrentOrder = (order) => {
    this.props.setCurrentOrder(order).then(() => {
      this.toggleModal();
    });
  };

  handlePerPageSelect = (perPage) => {
    this.props.setRowsPerPage(perPage).then(() => {
      this.props.fetchOrders(this.props.currentPage, this.props.perPage);
    });
  };

  render() {
    let errorMsg;
    if (this.props.error) {
      errorMsg = <OrderErrorMsg message={this.props.error} />;
    }

    return (
      <Container>
        {errorMsg}
        <Row noGutters><h2>Orders</h2></Row>

        <OrderTable
          isLoading={this.props.isLoading}
          orders={this.props.orders}
          perPage={this.props.perPage}
          totalPages={this.props.totalPages}
          totalOrders={this.props.totalResults}
          currPage={this.props.currentPage}
          initialPage={this.props.match.params.id - 1}
          listOrders={this.listOrders}
          listOrdersSkeleton={this.listOrdersSkeleton}
          setCurrentOrder={this.setCurrentOrder}
          onPerPageSelect={this.handlePerPageSelect}
          onPageClick={this.handlePageClick}
        />

        {/* Order Details Modal */}
        <OrderModal
          isOpen={this.state.modal}
          toggleModal={this.toggleModal}
          listLineItems={this.listLineItems}
          selectedOrder={this.props.selectedOrder}
        />
      </Container>
    );
  }
}

export default ListAllOrders;