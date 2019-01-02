import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './ListOrders.css';

class ListOrders extends Component {
  state = {
    orders: [],
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    perPage: 20,
    modal: false,
    selectedOrder: null,
    isLoading: true
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
    axios(`/edi/${currPage}`)
      .then(orders => {
        this.setState({
          orders: orders.data.result.docs,
          currentPage: Number(orders.data.result.page),
          totalPages: orders.data.result.pages,
          totalResults: orders.data.result.total,
          isLoading: false
        });
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

  range = (size, startAt = 0) => {
    return [...Array(size).keys()].map(i => i + startAt);
  };

  listOrders = () => {
    const startIdx = this.state.totalResults - (this.state.perPage * this.state.currentPage-1);

    const idxRange = this.range(this.state.perPage, startIdx).reverse();

    return this.state.orders.map((order, idx) => {
      return (
        <tr className="order-row" key={idx} onClick={() => this.setCurrentOrder(order)}>
          <th scope="row">{idxRange[idx]}</th>
          <td>{order["Filename"]}</td>
          <td>{order["Luma Order Number"]}</td>
          <td>{order["Partner Po Number"]}</td>
          <td>{moment(order["Transaction Set Data"]["Purchase Order Date"]).format("YYYY-MM-DD")}</td>
        </tr>
      );
    });
  };

  listOrdersSkeleton = () => {
    const idxRange = this.range(this.state.perPage);

    return idxRange.map((order, idx) => {
      return (
        <tr key={idx}>
          <th className="order-skeleton" scope="row">&#9608;&#9608;</th>
          <td className="order-skeleton">
            &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
          </td>
          <td className="order-skeleton">
            &#9608;&#9608;&#9608;&#9608;&#9608;
          </td>
          <td className="order-skeleton">
            &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
          </td>
          <td className="order-skeleton">
            &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
          </td>
        </tr>
      );
    });
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  setCurrentOrder = (order) => {
    this.setState({ selectedOrder: order }, () => {
      this.toggleModal();
    });
  };

  render() {
    return (
      <div className="container">
        <h2>Orders</h2>
        <br/>
        <table className="table table-sm table-hover">
          <thead className="thead-dark">
          <tr>
            <th width="5%" scope="col">#</th>
            <th width="45%" scope="col">Filename</th>
            <th width="18%" scope="col">Luma Order Number</th>
            <th width="18%" scope="col">Partner Order Number</th>
            <th width="14%" scope="col">Date Placed</th>
          </tr>
          </thead>
          <tbody>
          { this.state.isLoading ?
            this.listOrdersSkeleton() :
            this.listOrders()
          }
          </tbody>
        </table>
        <nav>
          <ReactPaginate previousLabel={"previous"}
                         nextLabel={"next"}
                         breakLabel={"..."}
                         breakClassName={"page-item break-disabled"}
                         pageCount={this.state.totalPages}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.handlePageClick}
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
                         initialPage={this.props.match.params.id-1}
          />
        </nav>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleModal}>{this.state.selectedOrder && ('Lumaprints Purchase Order #: ' + this.state.selectedOrder["Luma Order Number"])}</ModalHeader>
          <ModalBody>
            {
              this.state.selectedOrder && (
                <div className="container-fluid">
                  <div className="row pb-2">
                    <div className="container col-6">
                      {/* Document Information - Header LEFT */}
                      <div className="row line-item-header">
                        <div className="col-12 bg-dark text-white pl-3">Document Information</div>
                      </div>
                      <div className="row">
                        <div className="col-6 font-weight-bold">Lumaprints Order #:</div>
                        <div className="col-6">{this.state.selectedOrder["Luma Order Number"]}</div>
                      </div>
                      <div className="row">
                        <div className="col-6 font-weight-bold">Partner Order #:</div>
                        <div className="col-6">{this.state.selectedOrder["Partner Po Number"]}</div>
                      </div>
                      <div className="row">
                        <div className="col-6 font-weight-bold">PO Date:</div>
                        <div className="col-6">{moment(this.state.selectedOrder["Transaction Set Data"]["Purchase Order Date"]).format("YYYY-MM-DD")}</div>
                      </div>
                    </div>

                    <div className="container col-6">
                      {/* Document Information - Header RIGHT */}
                      <div className="row line-item-header">
                        <div className="col-12 bg-dark text-white pl-3">&nbsp;</div>
                      </div>
                      <div className="row no-gutters">
                        <div className="col-6 font-weight-bold">Purchase Order Type:</div>
                        <div className="col-6 pl-3">{this.state.selectedOrder["Transaction Set Data"]["Purchase Order Type Code"][0]}</div>
                      </div>
                      <div className="row no-gutters">
                        <div className="col-6 font-weight-bold">Transaction Purpose:</div>
                        <div className="col-6 pl-3">{this.state.selectedOrder["Transaction Set Data"]["Transaction Set Purpose Code"][0]}</div>
                      </div>
                    </div>
                  </div>

                  {/* Reference Identification section (left) */}
                  <div className="row pb-2">
                    <div className="container col-6">
                      <div className="row mr-1">
                        <div className="col-12 bg-dark text-white pl-3 line-item-header">Reference Identification</div>
                      </div>
                      <div className="row">
                        <div className="col-6 font-weight-bold">Vendor ID #: </div>
                        <div className="col-6">{this.state.selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Vendor ID Number"]}</div>
                      </div>
                      <div className="row">
                        <div className="col-6 font-weight-bold">Customer Order #: </div>
                        <div className="col-6">{this.state.selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Order Number"]}</div>
                      </div>
                      <div className="row">
                        <div className="col-6 font-weight-bold">Customer Ref #: </div>
                        <div className="col-6">{this.state.selectedOrder["Transaction Set Data"]["Beginning Segment for Purchase Order"]["Customer Reference Number"]}</div>
                      </div>
                    </div>

                    {/* Date/Time Reference section (right) */}
                    <div className="container col-6">
                      <div className="row">
                        <div className="col-12 bg-dark text-white line-item-header">Date/Time Reference</div>
                      </div>

                      <div className="row no-gutters">
                        <div className="col-6 font-weight-bold">Customer Order Date:</div>
                        <div className="col-6 pl-3">{moment(this.state.selectedOrder["Transaction Set Data"]["DateTime References"]["Order"]).format("YYYY-MM-DD")}</div>
                      </div>

                    </div>
                  </div>

                </div>
              )
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ListOrders);