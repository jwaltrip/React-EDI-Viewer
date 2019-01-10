import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  handleTextChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

  };

  render() {
    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <input
          className="form-control mr-sm-2"
          type="search"
          name="searchText"
          placeholder="Search"
          aria-label="Search"
          value={this.state.searchText}
          onChange={this.handleTextChange}
        />
        <button
          className="btn btn-primary my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;