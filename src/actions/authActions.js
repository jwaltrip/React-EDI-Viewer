import { GET_ERRORS } from "./types";
import axios from 'axios';

export const registerUser = (user, history) => dispatch => {
  axios.post('http://localhost:5000/api/users/register', user)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const loginUser = (user) => dispatch => {
  axios.post('http://localhost:5000/api/users/login', user)
    .then(res => console.log(res.data))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};