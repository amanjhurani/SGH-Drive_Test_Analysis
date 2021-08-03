import TopBar from "./components/topbar/TopBar";
import SideBar from "./components/sidebar/SideBar";
import "./App.css";
import React from "react";

import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class App extends React.Component {
  render() {
    return (
    <Router>
      <TopBar></TopBar>
      <div className="container">
        <SideBar></SideBar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
}