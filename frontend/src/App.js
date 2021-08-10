import TopBar from "./components/topbar/TopBar";
import SideBar from "./components/sidebar/SideBar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import "./App.css";
import React from "react";
import RSCPMap from './pages/maps/RSCPMap'
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RSSIMap from "./pages/maps/RSSIMap";
import ECIOMap from "./pages/maps/ECIOMap";
import Analize from "./pages/Analize/Analize";
export default class App extends React.Component {
  render() {
    return (
    <Router>
      <TopBar></TopBar>
      <div className="page-content">
        <SideBar></SideBar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/rscpMap">
            <RSCPMap />
          </Route>
          <Route exact path="/rssiMap">
            <RSSIMap />
          </Route>
          <Route exact path="/ecioMap">
            <ECIOMap />
          </Route>
          <Route exact path="/analize">
            <Analize />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
}