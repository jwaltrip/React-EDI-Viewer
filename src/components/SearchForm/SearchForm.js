import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import "./SearchForm.css";

class SearchForm extends Component {

  state = {
    searchText: '',
    isOpen: false,
    startDate: new Date()
  };

  handleTextChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const tmpSearchText = this.state.searchText;
    // redirect to search page
    this.setState({ searchText: '' }, () => {
      this.props.history.push(`/orders/search/${tmpSearchText}`);
    });
  };

  toggleDatePicker = (e) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleDatepickerChange = (date) => {
    const formattedDate = moment(date).format("MM-DD-YYYY");
    this.setState({ searchText: formattedDate, isOpen: false });
  };

  render() {
    return (
      <div className="mr-3">
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <button className="btn btn-success" type="button" onClick={this.toggleDatePicker}>
                <i className="far fa-calendar-alt"></i>
              </button>
            </div>
            <input
              className="form-control mr-sm-2"
              type="search"
              name="searchText"
              placeholder="Search by order #, SKU, name, or date"
              aria-label="Search"
              value={this.state.searchText}
              onChange={this.handleTextChange}
              style={{ width: '350px' }}
            />
          </div>
          <button
            className="btn btn-primary my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="datepicker-container">
          {
            this.state.isOpen && (
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDatepickerChange}
                dateFormat="MM-dd-yyyy"
                inline
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default withRouter(SearchForm);