import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from "../../actions/postActions";
import Post from "./Post";

class PostList extends Component {
  componentWillMount() {
    // call redux action fetchPosts()
    this.props.fetchPosts();
  }

  render() {
    const postItems = this.props.posts.map(post => (
      <Post
        key={post._id}
        id={post._id}
        title={post.title}
        body={post.body}
        onDelete={ this.props.deletePost }
      />
    ));

    return (
      <div>
        <h1>Posts</h1>
        { postItems }
      </div>
    );
  }
}

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

// the name state.posts comes from the name set in the rootReducer in ./reducers/index.js
const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost })(PostList);