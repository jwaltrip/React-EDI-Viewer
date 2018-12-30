import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

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
    // const currPage = this.state.currentPage;

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
    this.setState({currentPage: data.selected + 1}, () => {
      // update router url
      this.props.history.push(`/orders/${this.state.currentPage}`);
      // fetch next page data
      this.fetchData();
    });
  };

  range = (size, startAt = 0) => {
    return [...Array(size).keys()].map(i => i + startAt).reverse();
  };

  listOrders = () => {
    const startIdx = this.state.totalResults - (this.state.perPage * this.state.currentPage-1);

    const idxRange = this.range(20, startIdx);

    return this.state.orders.map((order, idx, origArr) => {
      return (
        <tr key={idx}>
          <th scope="row">{idxRange[idx]}</th>
          <td>{order["Filename"]}</td>
          <td>{order["Luma Order Number"]}</td>
          <td>{order["Partner Po Number"]}</td>
          <td>{order["Transaction Set Data"]["Purchase Order Date"]}</td>
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
            <th scope="col">#</th>
            <th scope="col">Filename</th>
            <th scope="col">Luma Order Number</th>
            <th scope="col">Partner Order Number</th>
            <th scope="col">Date Placed</th>
          </tr>
          </thead>
          <tbody>
          {this.listOrders()}
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