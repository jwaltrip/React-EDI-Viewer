import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const registerUser = (user, history) => dispatch => {
  axios.post('http://localhost:5000/api/users/register', user)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (user) => dispatch => {
  axios.post('http://localhost:5000/api/users/login', user)
    .then(res => {
      const { token } = res.data;
      // set token in localStorage
      localStorage.setItem('jwtToken', token);
      // set token to be in all axios headers
      setAuthToken(token);
      // decode the token
      const decoded = jwt_decode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};