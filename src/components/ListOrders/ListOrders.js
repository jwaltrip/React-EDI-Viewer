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
ButtonGroup
} from 'reactstrap';

import './ListOrders.css';

const OrderTableHeader = () => (
  <div className="container">
    <div className="row header-sticky">
      <div style={{width: '5%'}}>#</div>
      <div style={{width: '49%'}}>Filename</div>
      <div style={{width: '18%'}}>Luma Order Number</div>
      <div style={{width: '18%'}}>Partner Order Number</div>
      <div style={{width: '10%'}}>Date Placed</div>
    </div>
  </div>
);

const OrderTableBody = ({ isLoading, listOrdersSkeleton, listOrders, orders, perPage, currPage, totalOrders, setCurrentOrder }) => (
  <table className="table table-sm table-hover">
    <tbody>
    { isLoading ? listOrdersSkeleton(perPage) : listOrders(orders, perPage, currPage, totalOrders, setCurrentOrder) }
    </tbody>
  </table>
);

const OrderTableFooter = ({ perPage, totalPages, initialPage, handlePerPageSelect, handlePageClick }) => (
  <div className="col-12">
    <div className="row no-gutters">
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
    </div>
  </div>
);

const RowsPerPageButtonGroup = ({ perPage, onPerPageSelect }) => (
  <div className="col-1">
    <div className="row mr-1">
      <ButtonGroup size="sm">
        <Button color="secondary" onClick={() => onPerPageSelect(20)} active={perPage === 20}>20</Button>
        <Button color="secondary" onClick={() => onPerPageSelect(50)} active={perPage === 50}>50</Button>
        <Button color="secondary" onClick={() => onPerPageSelect(100)} active={perPage === 100}>100</Button>
      </ButtonGroup>
    </div>
    <div className="row mr-1"><span className="w-100 text-center"><small>rows per page</small></span></div>
  </div>
);

const Pagination = ({ totalPages, initialPage, handlePageClick }) => (
  <div className="col-10">
    <nav>
      <ReactPaginate previousLabel={"previous"}
                     nextLabel={"next"}
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
                     previousClassName={"page-item"}
                     nextClassName={"page-item"}
                     pageLinkClassName={"page-link"}
                     previousLinkClassName={"page-link"}
                     nextLinkClassName={"page-link"}
                     initialPage={initialPage}
      />
    </nav>
  </div>
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
        <div className="container-fluid">
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
        </div>
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
  <div className="row pb-2">
    {/* Doc Info - LEFT */}
    <div className="container col-6">
      <div className="row line-item-header">
        <div className="col-12 bg-dark text-white pl-3">Document Information</div>
      </div>
      <div className="row">
        <div className="col-6 font-weight-bold">Lumaprints Order #:</div>
        <div className="col-6">{selectedOrder["Luma Order Number"]}</div>
      </div>
      <div className="row">
        <div className="col-6 font-weight-bold">Partner Order #:</div>
        <div className="col-6">{selectedOrder["Partner Po Number"]}</div>
      </div>
      <div className="row">
        <div className="col-6 font-weight-bold">PO Date:</div>
        <div className="col-6">{moment(selectedOrder["Transaction Set Data"]["Purchase Order Date"]).format("YYYY-MM-DD")}</div>
      </div>
    </div>

    {/* Doc Info - RIGHT */}
    <div className="container col-6">
      <div className="row line-item-header">
        <div className="col-12 bg-dark text-white pl-3">&nbsp;</div>
      </div>
      <div className="row no-gutters">
        <div className="col-6 font-weight-bold">Purchase Order Type:</div>
        <div className="col-6 pl-3">{selectedOrder["Transaction Set Data"]["Purchase Order Type Code"][0]}</div>
      </div>
      <div className="row no-gutters">
        <div className="col-6 font-weight-bold">Transaction Purpose:</div>
        <div className="col-6 pl-3">{selectedOrder["Transaction Set Data"]["Transaction Set Purpose Code"][0]}</div>
      </div>
    </div>
  </div>
);

const OrderModalRefIdRow = ({ selectedOrder }) => (
  <div className="row pb-2">
    {/* Ref ID - LEFT */}
    <div className="container col-6">
      <div className="row mr-1">
        <div className="col-12 bg-dark text-white pl-3 line-item-header">Reference Identification</div>
      </div>
      <div className="row">
        <div className="col-6 font-weight-bold">Vendor ID #: </div>
        <div className="col-6">{selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Vendor ID Number"]}</div>
      </div>
      <div className="row">
        <div className="col-6 font-weight-bold">Customer Order #: </div>
        <div className="col-6">{selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Order Number"]}</div>
      </div>
      <div className="row">
        <div className="col-6 font-weight-bold">Customer Ref #: </div>
        <div className="col-6">{selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Customer Reference Number"]}</div>
      </div>
    </div>

    {/* Date/Time Ref - RIGHT */}
    <div className="container col-6">
      <div className="row">
        <div className="col-12 bg-dark text-white line-item-header">Date/Time Reference</div>
      </div>
      <div className="row no-gutters">
        <div className="col-6 font-weight-bold">Customer Order Date:</div>
        <div className="col-6 pl-3">{moment(selectedOrder["Transaction Set Data"]["DateTime References"]["Order"]).format("YYYY-MM-DD")}</div>
      </div>
      <div className="row no-gutters">
        <div className="col-6 font-weight-bold">Requested Ship:</div>
        <div className="col-6 pl-3">{moment(selectedOrder["Transaction Set Data"]["DateTime References"]["Requested Ship"]).format("YYYY-MM-DD")}</div>
      </div>
      <div className="row no-gutters">
        <div className="col-6 font-weight-bold">Delivery Requested:</div>
        <div className="col-6 pl-3">{moment(selectedOrder["Transaction Set Data"]["DateTime References"]["Delivery Requested"]).format("YYYY-MM-DD")}</div>
      </div>
    </div>
  </div>
);

const OrderModalShipMethodRow = ({ selectedOrder }) => (
  <div className="row pb-2">
    <div className="container">
      <div className="row">
        <div className="col-12 bg-dark text-white pl-3 line-item-header">Shipping Details (Routing Sequence/Transit Time)</div>
      </div>
      <div className="row">
        <div className="col-4 font-weight-bold">Ship ID Code Qualifier:</div>
        <div className="col-8">{selectedOrder["Transaction Set Data"]["Shipping Method ID Code Qualifier"][0]}</div>
      </div>
      <div className="row">
        <div className="col-4 font-weight-bold">Ship ID Code/Route:</div>
        <div className="col-8">{selectedOrder["Transaction Set Data"]["Shipping Method ID Code"] + ' ' + selectedOrder["Transaction Set Data"]["Shipping Routing Method"]}</div>
      </div>
    </div>
  </div>
);

const OrderModalBuyerShipRow = ({ selectedOrder }) => (
  <div className="row pb-2">
    {/* LEFT */}
    <div className="container col-6">
      <div className="row mr-1">
        <div className="col-12 bg-dark text-white pl-3 line-item-header">Buyer Details</div>
      </div>
      <div className="row">
        {/* Buyer Address */}
        <div className="col-12 mb-1 font-weight-bold">Bill-to-Party</div>
        <div className="col-12">{selectedOrder["Buyer Data"]["Buyer Name"]}</div>
        <div className="col-12">
          { selectedOrder["Buyer Data"]["Buyer Address Line 2"] ?
            selectedOrder["Buyer Data"]["Buyer Address Line 1"] + ', ' + selectedOrder["Buyer Data"]["Buyer Address Line 2"] :
            selectedOrder["Buyer Data"]["Buyer Address Line 1"]
          }
        </div>
        <div className="col-12 mb-1">
          {selectedOrder["Buyer Data"]["Buyer City"] + ', ' + selectedOrder["Buyer Data"]["Buyer State"] + ' ' + selectedOrder["Buyer Data"]["Buyer Zip"] + ', ' + selectedOrder["Buyer Data"]["Buyer Country"]}
        </div>
        {/* Buyer Contact Info */}
        <div className="col-12 mb-1 font-weight-bold">Contact Info</div>
        <div className="container">
          <div className="row">
            <div className="col-2">Email:</div>
            <div className="col-10">{selectedOrder["Buyer Data"]["Buyer Email"]}</div>
          </div>
          <div className="row">
            <div className="col-2">Phone:</div>
            <div className="col-10">{selectedOrder["Buyer Data"]["Buyer Telephone"]}</div>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT */}
    <div className="container col-6">
      <div className="row">
        <div className="col-12 bg-dark text-white pl-3 line-item-header">Shipping Details</div>
      </div>
      {/* Shipping Address */}
      <div className="row">
        <div className="col-12 mb-1 font-weight-bold">Ship To</div>
        <div className="col-12">{selectedOrder["Shipping Data"]["Shipping Name"]}</div>
        <div className="col-12">
          { selectedOrder["Shipping Data"]["Shipping Address Line 2"] ?
            selectedOrder["Shipping Data"]["Shipping Address Line 1"] + ', ' + selectedOrder["Shipping Data"]["Shipping Address Line 2"] :
            selectedOrder["Shipping Data"]["Shipping Address Line 1"]
          }
        </div>
        <div className="col-12 mb-1">
          {selectedOrder["Shipping Data"]["Shipping City"] + ', ' + selectedOrder["Shipping Data"]["Shipping State"] + ' ' + selectedOrder["Shipping Data"]["Shipping Zip"] + ', ' + selectedOrder["Shipping Data"]["Ship Country"]}
        </div>
        {/* Shipping Contact Info */}
        <div className="col-12 mb-1 font-weight-bold">Contact Info</div>
        <div className="container">
          <div className="row">
            <div className="col-2">Email:</div>
            <div className="col-10">{selectedOrder["Shipping Data"]["Shipping Email"]}</div>
          </div>
          <div className="row">
            <div className="col-2">Phone:</div>
            <div className="col-10">{selectedOrder["Shipping Data"]["Shipping Telephone"]}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OrderModalLineItemInfo = ({ selectedOrder, listLineItems }) => (
  <div className="row">
    <div className="container">
      <div className="row">
        <div className="col-12 bg-dark text-white pl-3 line-item-header">Line Item Information</div>
      </div>
      <table className="table table-sm">
        <tbody>
        <tr className="title">
          <td className="line-item-head" width="9%">Line #</td>
          <td className="line-item-head" width="70%">Description</td>
          <td className="line-item-head" width="5%">Quanity</td>
          <td className="line-item-head text-center" width="7%">Unit</td>
          <td className="line-item-head" width="6%">Price($)</td>
          <td className="line-item-head" width="6%">Total($)</td>
        </tr>
        { listLineItems(selectedOrder) }
        </tbody>
      </table>
      <div className="row pb-0">
        <div className="container">
          <div className="row">
            <div className="pl-3 font-weight-bold">Line Count:</div>
            <div className="pl-3">{selectedOrder["Transaction Set Data"]["Num Line Items"]}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
            <div className="row no-gutters">
              <div className="col-3 font-weight-bold text-dark">SKU:</div>
              <div className="col-9 px-0">{sku}</div>
            </div>
            <div className="row no-gutters">
              <div className="col-3 font-weight-bold text-dark">Item Desc:</div>
              <div className="col-9 px-0">{itemDesc}</div>
            </div>
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
      <div className="container">
        {errorMsg}
        <div className="row no-gutters">
          <h2>Orders</h2>
        </div>
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
      </div>
    );
  }
}

export default withRouter(ListOrders);