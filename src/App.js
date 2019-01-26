import React, { Component } from 'react';
// import react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'reactstrap';
import TopNavbar from './containers/TopNavbarContainer';
import Register from "./containers/RegisterContainer";
import Login from "./containers/LoginContainer";
import Home from "./components/Home";
import ListAllOrders from './containers/ListAllOrdersContainer';
import SearchOrders from './containers/SearchOrdersContainer';
import ProtectedRoute from './containers/ProtectedRouteContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <TopNavbar />
          <Container>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <ProtectedRoute path="/orders/search/:searchTerm" component={ SearchOrders } />
              <ProtectedRoute path="/orders/:id" component={ ListAllOrders } />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
