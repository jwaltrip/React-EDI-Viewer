import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fetchPosts, deletePost, createPost } from "../../actions/postActions";

import PostForm from './PostForm';
import PostList from './PostList';

class PostContainer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-6-md">
          <PostForm />
        </div>
        <div className="col-6-md">
          <PostList />
        </div>
      </div>
    );
  }
}

PostContainer.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost, createPost }
)(PostContainer);
