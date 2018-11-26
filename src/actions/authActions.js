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
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = (history) => dispatch => {
  // remove JWT token from localStorage
  localStorage.removeItem('jwtToken');
  // remove JWT token from axios Authorization headers
  setAuthToken(false);
  // set current user back to empty object
  dispatch(setCurrentUser({}));
  // redirect to login page
  if (history) {
    history.push('/login');
  }
};