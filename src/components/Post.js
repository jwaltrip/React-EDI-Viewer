import React from 'react';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '500px',
  borderRadius: '7px'
};

const Post = (props) => {
  return (
    <div style={styles}>
      <h2>{ props.title }</h2>
      <p>{ props.body }</p>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => props.onDelete(props.id)}>Remove</button>
    </div>
  );
};

export default Post;
