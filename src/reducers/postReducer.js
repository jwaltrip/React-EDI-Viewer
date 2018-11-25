import { FETCH_POSTS, ADD_POST, DELETE_POST } from "../actions/types";

// this is the initialState that will be nested under the rootReducer key
/* ex. - posts = rootReducer key (found in ./reducers/index.js)
 *
 * posts: {
 *   items: [],
 *   item: {}
 * }
 *
 */
const initialState = {
  items: [],
  item: {}
};

// the reducers take the resulting payload data from the action functions, and return the next state
export default function(state = [], action) {
  switch(action.type) {
    case FETCH_POSTS:
      return action.payload;
    case ADD_POST:
      return [...state, action.payload];
    case DELETE_POST:
      return state.filter(post => post._id !== action.payload.id);
    default:
      return state;
  }
}