import { FETCH_POSTS, ADD_POST } from "./types";
import axios from "axios";

export const fetchPosts = () => dispatch => {
    axios('https://jsonplaceholder.typicode.com/posts')
      .then(posts => dispatch({
        type: FETCH_POSTS,
        payload: posts.data
      }));
};

export const createPost = ({title, body}) => dispatch => {
  axios.post('https://jsonplaceholder.typicode.com/posts', {title, body})
    .then(post => dispatch({
      type: ADD_POST,
      payload: post.data
    }));
};