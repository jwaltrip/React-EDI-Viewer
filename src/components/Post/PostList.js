import React from 'react';
import PropTypes from 'prop-types';
import Post from "./Post";

const PostList = ({ posts, deletePost }) => {

  const postItems = posts.map(post => (
    <Post
      key={post._id}
      id={post._id}
      title={post.title}
      body={post.body}
      onDelete={ deletePost }
    />
  ));

  return(
    <div>
      <h1>Posts</h1>
      { postItems }
    </div>
  );
};

PostList.propTypes = {
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

export default PostList;