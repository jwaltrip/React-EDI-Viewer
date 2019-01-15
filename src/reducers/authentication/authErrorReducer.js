import { GET_AUTH_ERRORS } from "../../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_AUTH_ERRORS:
      return action.payload;
    default:
      return state;
  }
};