import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import './ListOrders.css';

class ListOrders extends Component {
  state = {
    orders: [],
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    isLoading: true
  };

  componentDidMount() {
    // const { id } = this.props.match.params;
    // await axios(`/edi/${id}`)
    //   .then(orders => this.setState({ orders: orders.data.orders, currentPage: Number(orders.data.currentPage), isLoading: false }));

    // this.fetchData(1);
    this.fetchData();
  }

  fetchData = () => {
    const currPage = this.state.currentPage;
    console.log('url page id', currPage, typeof currPage);
    axios(`/edi/${currPage}`)
      .then(orders => {
        console.log('current page react', currPage);
        this.setState({orders: orders.data.result.docs, currentPage: Number(orders.data.result.page), totalPages: orders.data.result.pages, totalResults: orders.data.result.total, isLoading: false});
      });
  };

  handlePageClick = (data) => {
    // const { id } = this.props.match.params;
    console.log('data', data);

    this.setState({currentPage: data.selected + 1}, () => {
      this.fetchData();
    });
  };

  listOrders = () => {
    // if (!this.state.isLoading) {
      return this.state.orders.map((order, idx) => {
        return (
          <tr key={idx}>
            <th scope="row">{idx+1}</th>
            <td>{order["Filename"]}</td>
            <td>{order["Luma Order Number"]}</td>
            <td>{order["Partner Po Number"]}</td>
            <td>{order["Transaction Set Data"]["Purchase Order Date"]}</td>
          </tr>
        );
      });
    // }
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
        {/*<hr/>*/}
        <nav>
          <ReactPaginate previousLabel={"previous"}
                         nextLabel={"next"}
                         breakLabel={"..."}
                         breakClassName={"page-item break-disabled"}
                         pageCount={this.state.totalPages}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.handlePageClick}
                         containerClassName={"pagination text-center"}
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

export default ListOrders;