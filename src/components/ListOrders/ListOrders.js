import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import { range } from '../../utils/utils';
import { Container, Row, Col } from 'reactstrap';

import './ListOrders.css';

import OrderTable from './OrderTable';
import OrderModal from './OrderModal';
import OrderErrorMsg from './OrderErrorMsg';

class ListOrders extends Component {
  state = {
    orders: [],
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    perPage: 20,
    modal: false,
    selectedOrder: null,
    isLoading: true,
    error: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id === this.state.currentPage) {
      this.fetchData();
    } else {
      this.fetchData(Number(id));
    }
  }

  fetchData = (currPage = this.state.currentPage) => {
    axios(`/edi/${currPage}/?limit=${this.state.perPage}`)
      .then(orders => {
        if (orders.data.success) {
          this.setState({
            orders: orders.data.result.docs,
            currentPage: orders.data.result.page,
            perPage: orders.data.result.limit,
            totalPages: orders.data.result.pages,
            totalResults: orders.data.result.total,
            isLoading: false,
            error: null
          });
        } else {
          this.setState({
            isLoading: true,
            error: orders.data.error.name
          });
        }
      });
  };

  handlePageClick = (data) => {
    this.setState({currentPage: data.selected + 1, isLoading: true}, () => {
      // update router url
      this.props.history.push(`/orders/${this.state.currentPage}`);
      // fetch next page data
      this.fetchData();
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
    this.setState({ selectedOrder: order }, () => {
      this.toggleModal();
    });
  };

  handlePerPageSelect = (perPage) => {
    this.setState({ perPage: Number(perPage) }, () => {
      this.fetchData();
    });
  };

  render() {
    let errorMsg;
    if (this.state.error) {
      errorMsg = <OrderErrorMsg message={this.state.error} />;
    }

    return (
      <Container>
        {errorMsg}
        <Row noGutters><h2>Orders</h2></Row>

        <OrderTable
          isLoading={this.state.isLoading}
          orders={this.state.orders}
          perPage={this.state.perPage}
          totalPages={this.state.totalPages}
          totalOrders={this.state.totalResults}
          currPage={this.state.currentPage}
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
          selectedOrder={this.state.selectedOrder}
        />
      </Container>
    );
  }
}

export default withRouter(ListOrders);