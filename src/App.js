import React, { Component } from 'react';
import './App.css';
// import bootstrap css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import provider to connect App to redux store
import { Provider } from 'react-redux';

import Post from "./components/Post";
import PostForm from "./components/PostForm";

// import the redux store to be used in the Provider component
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Post />
            </div>
            <div className="col-md-6">
              <PostForm />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
