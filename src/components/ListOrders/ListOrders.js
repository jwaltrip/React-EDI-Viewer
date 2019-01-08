import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import Sticky from 'react-stickynode';
import { range } from '../../utils/utils';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';

import './ListOrders.css';

const OrderTableHeader = () => (
  <Container>
    <Row className="header-sticky">
      <div style={{width: '5%'}}>#</div>
      <div style={{width: '49%'}}>Filename</div>
      <div style={{width: '18%'}}>Luma Order Number</div>
      <div style={{width: '18%'}}>Partner Order Number</div>
      <div style={{width: '10%'}}>Date Placed</div>
    </Row>
  </Container>
);

const OrderTableBody = ({ isLoading, listOrdersSkeleton, listOrders, orders, perPage, currPage, totalOrders, setCurrentOrder }) => (
  <Table hover size="sm">
    <tbody>
    { isLoading ? listOrdersSkeleton(perPage) : listOrders(orders, perPage, currPage, totalOrders, setCurrentOrder) }
    </tbody>
  </Table>
);

const OrderTableFooter = ({ perPage, totalPages, initialPage, handlePerPageSelect, handlePageClick }) => (
  <Col>
    <Row noGutters>
      {/* Rows per page button group */}
      <RowsPerPageButtonGroup
        perPage={perPage}
        onPerPageSelect={handlePerPageSelect}
      />
      {/* pagination centered next to button group */}
      <Pagination
        totalPages={totalPages}
        initialPage={initialPage}
        handlePageClick={handlePageClick}
      />
    </Row>
  </Col>
);

const RowsPerPageButtonGroup = ({ perPage, onPerPageSelect }) => (
  <Col xs="1">
    <Row className="justify-content-center">
      <ButtonGroup size="sm">
        <Button color="secondary" onClick={() => onPerPageSelect(20)} active={perPage === 20}>20</Button>
        <Button color="secondary" onClick={() => onPerPageSelect(50)} active={perPage === 50}>50</Button>
        <Button color="secondary" onClick={() => onPerPageSelect(100)} active={perPage === 100}>100</Button>
      </ButtonGroup>
    </Row>
    <Row><small className="w-100 text-center">rows per page</small></Row>
  </Col>
);

const Pagination = ({ totalPages, initialPage, handlePageClick }) => (
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

const OrderModal = ({ isOpen, toggleModal, listLineItems, selectedOrder }) => (
  <Modal isOpen={isOpen} toggle={toggleModal} size="lg">
    <OrderModalHeader selectedOrder={selectedOrder} toggleModal={toggleModal} />
    <OrderModalBody selectedOrder={selectedOrder} listLineItems={listLineItems} />
    <OrderModalFooter toggleModal={toggleModal} />
  </Modal>
);

const OrderModalHeader = ({ selectedOrder, toggleModal }) => (
  <ModalHeader toggle={toggleModal}>
    { selectedOrder && (<strong><span className="text-muted">Lumaprints Purchase Order #:</span> <span className="text-dark">{selectedOrder["Luma Order Number"]}</span></strong>) }
  </ModalHeader>
);

const OrderModalBody = ({ selectedOrder, listLineItems }) => (
  <ModalBody>
    {
      selectedOrder && (
        <Container fluid>
          {/* Document Information */}
          <OrderModalDocInfoRow selectedOrder={selectedOrder} />
          {/* Reference Identificaiton + Datetime Reference */}
          <OrderModalRefIdRow selectedOrder={selectedOrder} />
          {/* Shipping Method */}
          <OrderModalShipMethodRow selectedOrder={selectedOrder} />
          {/* Buyer/Shipping Details */}
          <OrderModalBuyerShipRow selectedOrder={selectedOrder} />
          {/* Line item info */}
          <OrderModalLineItemInfo selectedOrder={selectedOrder} listLineItems={listLineItems} />
        </Container>
      )
    }
  </ModalBody>
);

const OrderModalFooter = ({ toggleModal }) => (
  <ModalFooter>
    <Button color="primary" onClick={toggleModal}>Close</Button>
  </ModalFooter>
);

const OrderModalDocInfoRow = ({ selectedOrder }) => (
  <Row className="pb-2">
    {/* Doc Info - LEFT */}
    <Col xs="6">
      <Row className="line-item-header">
        <Col className="bg-dark text-white pl-3">Document Information</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Lumaprints Order #:</Col>
        <Col xs="6">{selectedOrder["Luma Order Number"]}</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Partner Order #:</Col>
        <Col xs="6">{selectedOrder["Partner Po Number"]}</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">PO Date:</Col>
        <Col xs="6">{moment(selectedOrder["Transaction Set Data"]["Purchase Order Date"]).format("YYYY-MM-DD")}</Col>
      </Row>
    </Col>

    {/* Doc Info - RIGHT */}
    <Col xs="6">
      <Row className="line-item-header">
        <Col className="bg-dark text-white pl-3">&nbsp;</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Purchase Order Type:</Col>
        <Col xs="6" className="pl-3">{selectedOrder["Transaction Set Data"]["Purchase Order Type Code"][0]}</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Transaction Purpose:</Col>
        <Col xs="6" className="pl-3">{selectedOrder["Transaction Set Data"]["Transaction Set Purpose Code"][0]}</Col>
      </Row>
    </Col>
  </Row>
);

const OrderModalRefIdRow = ({ selectedOrder }) => (
  <Row className="pb-2">
    {/* Ref ID - LEFT */}
    <Col xs="6">
      <Row className="mr-1">
        <Col className="bg-dark text-white pl-3 line-item-header">Reference Identification</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Vendor ID #: </Col>
        <Col xs="6">{selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Vendor ID Number"]}</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Customer Order #: </Col>
        <Col xs="6">{selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Order Number"]}</Col>
      </Row>
      <Row>
        <Col xs="6" className="font-weight-bold">Customer Ref #: </Col>
        <Col xs="6">{selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Customer Reference Number"]}</Col>
      </Row>
    </Col>

    {/* Date/Time Ref - RIGHT */}
    <Col xs="6">
      <Row>
        <Col className="bg-dark text-white line-item-header">Date/Time Reference</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Customer Order Date:</Col>
        <Col xs="6" className="pl-3">{moment(selectedOrder["Transaction Set Data"]["DateTime References"]["Order"]).format("YYYY-MM-DD")}</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Requested Ship:</Col>
        <Col xs="6" className="pl-3">{moment(selectedOrder["Transaction Set Data"]["DateTime References"]["Requested Ship"]).format("YYYY-MM-DD")}</Col>
      </Row>
      <Row noGutters>
        <Col xs="6" className="font-weight-bold">Delivery Requested:</Col>
        <Col xs="6" className="pl-3">{moment(selectedOrder["Transaction Set Data"]["DateTime References"]["Delivery Requested"]).format("YYYY-MM-DD")}</Col>
      </Row>
    </Col>
  </Row>
);

const OrderModalShipMethodRow = ({ selectedOrder }) => (
  <Row className="pb-2">
    <Container>
      <Row>
        <Col className="bg-dark text-white pl-3 line-item-header">Shipping Details (Routing Sequence/Transit Time)</Col>
      </Row>
      <Row>
        <Col xs="4" className="font-weight-bold">Ship ID Code Qualifier:</Col>
        <Col xs="8">{selectedOrder["Transaction Set Data"]["Shipping Method ID Code Qualifier"][0]}</Col>
      </Row>
      <Row>
        <Col xs="4" className="font-weight-bold">Ship ID Code/Route:</Col>
        <Col xs="8">{selectedOrder["Transaction Set Data"]["Shipping Method ID Code"] + ' ' + selectedOrder["Transaction Set Data"]["Shipping Routing Method"]}</Col>
      </Row>
    </Container>
  </Row>
);

const OrderModalBuyerShipRow = ({ selectedOrder }) => (
  <Row className="pb-2">
    {/* LEFT */}
    <Col xs="6">
      <Row className="mr-1">
        <Col className="bg-dark text-white pl-3 line-item-header">Buyer Details</Col>
      </Row>
      {/* Buyer Address */}
      <Row>
        <Col xs="12" className="mb-1 font-weight-bold">Bill-to-Party</Col>
        <Col xs="12">{selectedOrder["Buyer Data"]["Buyer Name"]}</Col>
        <Col xs="12">
          { selectedOrder["Buyer Data"]["Buyer Address Line 2"] ?
            selectedOrder["Buyer Data"]["Buyer Address Line 1"] + ', ' + selectedOrder["Buyer Data"]["Buyer Address Line 2"] :
            selectedOrder["Buyer Data"]["Buyer Address Line 1"]
          }
        </Col>
        <Col xs="12" className="mb-1">
          {selectedOrder["Buyer Data"]["Buyer City"] + ', ' + selectedOrder["Buyer Data"]["Buyer State"] + ' ' + selectedOrder["Buyer Data"]["Buyer Zip"] + ', ' + selectedOrder["Buyer Data"]["Buyer Country"]}
        </Col>
        {/* Buyer Contact Info */}
        <Col className="mb-1 font-weight-bold">Contact Info</Col>
        <Container>
          <Row>
            <Col xs="2">Email:</Col>
            <Col xs="10">{selectedOrder["Buyer Data"]["Buyer Email"]}</Col>
          </Row>
          <Row>
            <Col xs="2">Phone:</Col>
            <Col xs="10">{selectedOrder["Buyer Data"]["Buyer Telephone"]}</Col>
          </Row>
        </Container>
      </Row>
    </Col>

    {/* RIGHT */}
    <Col xs="6">
      <Row>
        <Col className="bg-dark text-white pl-3 line-item-header">Shipping Details</Col>
      </Row>
      {/* Shipping Address */}
      <Row>
        <Col xs="12" className="mb-1 font-weight-bold">Ship To</Col>
        <Col xs="12">{selectedOrder["Shipping Data"]["Shipping Name"]}</Col>
        <Col xs="12">
          { selectedOrder["Shipping Data"]["Shipping Address Line 2"] ?
            selectedOrder["Shipping Data"]["Shipping Address Line 1"] + ', ' + selectedOrder["Shipping Data"]["Shipping Address Line 2"] :
            selectedOrder["Shipping Data"]["Shipping Address Line 1"]
          }
        </Col>
        <Col xs="12" className="mb-1">
          {selectedOrder["Shipping Data"]["Shipping City"] + ', ' + selectedOrder["Shipping Data"]["Shipping State"] + ' ' + selectedOrder["Shipping Data"]["Shipping Zip"] + ', ' + selectedOrder["Shipping Data"]["Ship Country"]}
        </Col>
        {/* Shipping Contact Info */}
        <Col className="mb-1 font-weight-bold">Contact Info</Col>
        <Container>
          <Row>
            <Col xs="2">Email:</Col>
            <Col xs="10">{selectedOrder["Shipping Data"]["Shipping Email"]}</Col>
          </Row>
          <Row>
            <Col xs="2">Phone:</Col>
            <Col xs="10">{selectedOrder["Shipping Data"]["Shipping Telephone"]}</Col>
          </Row>
        </Container>
      </Row>
    </Col>
  </Row>
);

const OrderModalLineItemInfo = ({ selectedOrder, listLineItems }) => (
  <Row>
    <Container>
      <Row>
        <Col className="bg-dark text-white pl-3 line-item-header">Line Item Information</Col>
      </Row>
      <Table size="sm">
        <tbody>
        <tr className="title">
          <td className="line-item-head" width="9%">Line #</td>
          <td className="line-item-head" width="70%">Description</td>
          <td className="line-item-head" width="2%">Qty</td>
          <td className="line-item-head text-center" width="7%">Unit</td>
          <td className="line-item-head" width="6%">Price($)</td>
          <td className="line-item-head" width="6%">Total($)</td>
        </tr>
        { listLineItems(selectedOrder) }
        </tbody>
      </Table>
      <Row className="pb-0">
        <Container>
          <Row>
            <span className="pl-3 font-weight-bold">Line Count:</span>
            <span className="pl-3">{selectedOrder["Transaction Set Data"]["Num Line Items"]}</span>
          </Row>
        </Container>
      </Row>
    </Container>
  </Row>
);

const OrderErrorMsg = ({ message }) => (
  <Alert color="danger"><strong>Error: </strong>{message}</Alert>
);

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

        {/* Order Table Sticky Header (onScroll) */}
        <Sticky><OrderTableHeader /></Sticky>

        {/* Order Table Body */}
        <OrderTableBody
          isLoading={this.state.isLoading}
          listOrdersSkeleton={this.listOrdersSkeleton}
          listOrders={this.listOrders}
          orders={this.state.orders}
          perPage={this.state.perPage}
          currPage={this.state.currentPage}
          totalOrders={this.state.totalResults}
          setCurrentOrder={this.setCurrentOrder}
        />

        {/* Table footer - contains pagination and ordersPerPage select */}
        <OrderTableFooter
          perPage={this.state.perPage}
          totalPages={this.state.totalPages}
          initialPage={this.props.match.params.id - 1}
          handlePerPageSelect={this.handlePerPageSelect}
          handlePageClick={this.handlePageClick}
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