import { FETCH_POSTS, ADD_POST } from "../actions/types";

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
export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case ADD_POST:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}