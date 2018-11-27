import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostForm extends Component {
  state = {
    title: '',
    body: ''
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // validation check to make sure there is text in both title and body inputs
    if (this.state.title.trim() && this.state.body.trim()) {
      // post via axios
      const post = {
        title: this.state.title,
        body: this.state.body
      };

      // call createPost redux action
      // this function is mapped to this.props in CreatePost.js
      this.props.createPost(post);

      // reset the form inputs to blank
      this.handleReset();
    }
  };

  // reset form inputs to blank
  handleReset = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              name="title"
              onChange={ this.handleInputChange }
              value={ this.state.title }
            />
          </div>
          <div className="form-group">
            <textarea
              cols="19"
              rows="8"
              placeholder="Body"
              className="form-control"
              name="body"
              onChange={ this.handleInputChange }
              value={ this.state.body }>
            </textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Post</button>
            <button type="button" className="btn btn-warning" onClick={ this.handleReset }>Reset</button>
          </div>
        </form>
      </div>
    );
  }
}

// prop types for the connected redux action createPost()
PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default PostForm;