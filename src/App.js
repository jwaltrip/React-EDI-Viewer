import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import bootstrap css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import provider to connect App to redux store
import { Provider } from 'react-redux';

// import example post components
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

// import the redux store to be used in the Provider component
import store from './store';

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="container">
            <Navbar />
            <Route exact path="/" component={ Home } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
