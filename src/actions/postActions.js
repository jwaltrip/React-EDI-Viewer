import { FETCH_POSTS, ADD_POST } from "./types";
import axios from "axios";

// redux action to fetch all posts from the DB
export const fetchPosts = () => dispatch => {
  axios('https://jsonplaceholder.typicode.com/posts')
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts.data
    }));
};

// redux action to add a post to the DB
export const createPost = ({title, body}) => dispatch => {
  axios.post('https://jsonplaceholder.typicode.com/posts', {title, body})
    .then(post => dispatch({
      type: ADD_POST,
      payload: post.data
    }));
};