import { FETCH_POSTS, ADD_POST, DELETE_POST } from "./types";
import axios from "axios";

// set backend server url for /posts route
const apiUrl = 'http://localhost:5000/posts';

// redux action to fetch all posts from the DB
export const fetchPosts = () => dispatch => {
  axios(apiUrl)
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts.data
    }))
    .catch(err => {
      throw(err);
    });
};

// redux action to add a post to the DB
// the return payload is the most recently added post object
export const createPost = ({title, body}) => dispatch => {
  axios.post(`${apiUrl}/add`, {title, body})
    .then(post => dispatch({
      type: ADD_POST,
      payload: post.data
    }))
    .catch(err => {
      throw(err);
    });
};

// redux action to delete a post by _id
// the return payload is the deleted post
export const deletePost = id => dispatch => {
  axios(`${apiUrl}/delete/${id}`)
    .then(deletedId => dispatch({
      type: DELETE_POST,
      payload: deletedId.data
    }))
    .catch(err => {
      throw(err);
    });
};