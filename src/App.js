import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Candidat from "./components/candidat.component";
import CandidatList from "./components/candidat-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div >
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/candidat" className="navbar-brand">
              FININFO
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/candidat"} className="nav-link">
                  Candidat 
                </Link>
              </li>
              
            </div>
          </nav>

          <div className="col-md-6">
            <Switch>
              <Route exact path={["/", "/candidat"]} component={CandidatList} />
              <Route path="/candidat/:id" component={Candidat} />
              
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;