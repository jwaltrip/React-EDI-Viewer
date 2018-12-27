import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ListOrders extends Component {
  state = {
    orders: [],
    currentPage: 1,
    totalPages: 10,
    isLoading: true
  };

  componentDidMount() {
    // const { id } = this.props.match.params;
    // await axios(`/edi/${id}`)
    //   .then(orders => this.setState({ orders: orders.data.orders, currentPage: Number(orders.data.currentPage), isLoading: false }));

    // this.fetchData(1);
    this.fetchData(1);
  }

  fetchData = async (pgNum) => {
    console.log('url page id', pgNum, typeof pgNum);
    await axios(`/edi/${pgNum}`)
      .then(orders => {
        console.log('current page react', Number(orders.data.currentPage));
        this.setState({orders: orders.data.orders, currentPage: Number(orders.data.currentPage), isLoading: false})
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
    // calculate pagination
    let firstLink;
    if (this.state.currentPage === 1) {
      firstLink = <li className="page-item disabled"><Link to="/orders/1" className="page-link">First</Link></li>;
    } else {
      firstLink = <li className="page-item"><Link to="/orders/1" className="page-link" onClick={() => this.fetchData(1)}>First</Link></li>;
    }

    let i = (this.state.currentPage > 5) ? this.state.currentPage - 1 : 1;

    let firstEllipses;
    if (i !== 1) {
      firstEllipses = <li className="page-item disabled"><Link to="#" className="page-link">...</Link></li>;
    }

    let middleLinks = [];
    for (; i <= (this.state.currentPage + 4) && i <= this.state.totalPages; i++) {
      if (i === this.state.currentPage) {
        middleLinks.push(<li key={i} className="page-item active"><Link to={`/orders/${i}`} className="page-link" onClick={() => this.fetchData(i)}>{i}</Link></li>);
      } else {
        middleLinks.push(<li key={i} className="page-item"><Link to={`/orders/${i}`} className="page-link">{i}</Link></li>);
      }

      if ((i === this.state.currentPage + 4) && (i < this.state.totalPages)) {
        middleLinks.push(<li key={i} className="page-item disabled"><Link to="#" className="page-link">...</Link></li>);
      }

      // i = (this.state.currentPage > 5) ? this.state.currentPage - 1 : 1;
    }

    let lastLink;
    if (this.state.currentPage === this.state.totalPages) {
      lastLink = <li key={i} className="page-item disabled"><Link to={`/orders/${this.state.totalPages}`} className="page-link" onClick={() => this.fetchData(this.state.totalPages)}>Last</Link></li>;
    } else {
      lastLink = <li key={i} className="page-item"><Link to={`/orders/${this.state.totalPages}`} className="page-link" onClick={() => this.fetchData(this.state.totalPages)}>Last</Link></li>;
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