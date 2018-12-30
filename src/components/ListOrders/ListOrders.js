import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import moment from 'moment';

import './ListOrders.css';

class ListOrders extends Component {
  state = {
    orders: [],
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    perPage: 20,
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
        <tr key={idx}>
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
          />
        </nav>
      </div>
    );
  }
}

export default withRouter(ListOrders);