import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { range } from '../../utils/utils';
import { Container, Row, Col } from 'reactstrap';

import './searchOrders.css';

import OrderTable from '../OrderTable';
import OrderModal from '../OrderModal';
import OrderErrorMsg from '../OrderErrorMsg';
import SearchResultMetadata from '../SearchResultMetadata';


class SearchOrders extends Component {

  // TODO add prop types from redux state
  static propTypes = {

  };

  state = { modal: false };

  componentDidMount() {
    const { searchTerm } = this.props.match.params;

    this.props.setSearchTerm(searchTerm);
    this.props.fetchSearchOrders(searchTerm, this.props.currentPage, this.props.perPage);
  }

  componentWillReceiveProps(nextProps) {
    const { searchTerm } = this.props.match.params;

    if (nextProps.match.params.searchTerm !== searchTerm) {
      this.props.setSearchTerm(nextProps.match.params.searchTerm);
      this.props.fetchSearchOrders(nextProps.match.params.searchTerm, this.props.currentPage, this.props.perPage);
    }
  }

  handlePageClick = (data) => {
    const { searchTerm } = this.props.match.params;

    this.props.setSearchCurrentPage(data.selected + 1).then(() => {
      // fetch next page data
      this.props.fetchSearchOrders(searchTerm, this.props.currentPage, this.props.perPage);
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

  listOrdersSkeleton = (perPage, totalResults) => {
    const numRows = (perPage > totalResults) ? totalResults : perPage;
    const idxRange = range(numRows);

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
    this.props.setSearchCurrentOrder(order).then(() => {
      this.toggleModal();
    });
  };

  handlePerPageSelect = (perPage) => {
    const { searchTerm } = this.props.match.params;

    this.props.setSearchRowsPerPage(perPage).then(() => {
      this.props.fetchSearchOrders(searchTerm, this.props.currentPage, this.props.perPage);
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
        <Row noGutters><h2>Search Results</h2></Row>

        <SearchResultMetadata searchTerm={this.props.searchTerm} numResults={this.props.totalResults} />

        <OrderTable
          isLoading={this.props.isLoading}
          orders={this.props.orders}
          perPage={this.props.perPage}
          totalPages={this.props.totalPages}
          totalOrders={this.props.totalResults}
          currPage={this.props.currentPage}
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

export default SearchOrders;