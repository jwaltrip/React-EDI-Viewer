import React, { Component } from 'react';
// import react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import provider to connect App to redux store
import { Provider } from 'react-redux';
// import the redux store to be used in the Provider component
import store from './store';
// authentication imports
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from "./actions/authActions";

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// import primereact css
// import 'primereact/resources/themes/rhea/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// import example post components
import PostContainer from './components/Post/PostContainer';

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

// prime react refactor
// import RegisterPR from "./components/Register/RegisterPR";
import ListOrders from "./components/ListOrders/ListOrders";

// when app starts, check localStorage if jwtToken is set, if so, setCurrentUser
// then check jwtToken expiration date, if expired, then logout user, redirect to /login
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // check if token is expired
  // if so, redirect to login
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/posts" component={ PostContainer } />
                {/*<Route exact path="/orders" component={ ListOrders } />*/}
                <Route path="/orders/:id" component={ ListOrders } />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
