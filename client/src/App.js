import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Edit from "./components/Edit";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/edit/:id" component={Edit} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
