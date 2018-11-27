import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '500px',
  borderRadius: '7px'
};

const Post = ({ title, body, id, onDelete }) => {
  return (
    <div style={ styles }>
      <h2>{ title }</h2>
      <p>{ body }</p>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => onDelete(id)}>Remove</button>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Post;
