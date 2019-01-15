import axios from 'axios';

// if JWT token is present, set the Authorization header to always include the token
// else delete the Authorization token if it's present
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;