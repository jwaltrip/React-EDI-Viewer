import React, { Component } from 'react';
import axios from 'axios';

class ListOrders extends Component {
  state = {
    orders: [],
    currentPage: 1,
    totalPages: 10,
    isLoading: true
  };

  componentDidMount() {
    axios('/edi/1')
      .then(orders => this.setState({ orders: orders.data.orders, currentPage: orders.data.currentPage, isLoading: false }));
  }

  listOrders = () => {
    if (!this.state.isLoading) {
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
    }
  };

  render() {
    // calculate pagination
    let firstLink;
    if (this.state.currentPage === 1) {
      firstLink = <li className="page-item disabled">First</li>;
    } else {
      firstLink = <li className="page-item"><a href="/edi/1" className="page-link">First</a></li>
    }

    let i = (this.state.currentPage > 5) ? this.state.currentPage - 1 : 1;

    let firstEllipses;
    if (i !== 1) {
      firstEllipses = <li className="page-item disabled"><a href="#" className="page-link">...</a></li>;
    }

    let middleLinks = [];
    for (; i <= (this.state.currentPage + 4) && i <= this.state.totalPages; i++) {
      if (i === this.state.currentPage) {
        middleLinks.push(<li className="page-item active"><a href="#" className="page-link">{i}</a></li>);
      } else {
        middleLinks.push(<li className="page-item"><a href={`/edi/${i}`} className="page-link">{i}</a></li>);
      }

      if ((i === this.state.currentPage + 4) && (i < this.state.totalPages)) {
        middleLinks.push(<li className="page-item disabled"><a href="#" className="page-link">...</a></li>);
      }
    }

    let lastLink;
    if (this.state.currentPage === this.state.totalPages) {
      lastLink = <li className="page-item disabled"><a href="#" className="page-link">Last</a></li>;
    } else {
      lastLink = <li className="page-item"><a href={`/edi/${this.state.totalPages}`} className="page-link">Last</a></li>;
    }

    const pagination = (
      <div className="d-flex justify-content-center pt-1">
        <nav>
          <ul className="pagination text-center">
            {firstLink}
            {firstEllipses}
            {middleLinks}
            {lastLink}
          </ul>
        </nav>
      </div>
    );

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
        <hr/>
        {pagination}
      </div>
    );
  }
}

export default ListOrders;