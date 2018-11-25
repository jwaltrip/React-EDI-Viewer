import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from "../actions/postActions";

class Post extends Component {
  componentWillMount() {
    // call redux action fetchPosts()
    this.props.fetchPosts();
  }

  // this lifecycle method is called when new props are received from redux store
  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const postItems = this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

    return (
      <div>
        <h1>Posts</h1>
        { postItems }
      </div>
    );
  }
}

Post.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

// the name state.posts comes from the name set in the rootReducer in ./reducers/index.js
const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Post)