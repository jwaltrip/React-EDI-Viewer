// this creates the initial redux store that is passed to the Provider component in React
// this is setup to connect to the Redux Chrome Dev tools extension
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// initial state object that reducer states are added to
const initialState = {};

// add any additional middleware to this array
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;