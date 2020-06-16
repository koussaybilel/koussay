import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Candidat from "./components/candidat.component";
import CandidatList from "./components/candidat-list.component";
import AddFeaturedJob from "./components/add-featuredjob";
import changeCandidature from "./components/changecandidat";


import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <Router>
        <div >
          <nav className="navbar navbar-expand navbar-dark bg-dark">
             <Link to={"/"} className="navbar-brand">
              FININFO
              </Link>

            <div className="navbar-nav mr-auto">

            <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board 
                  </Link>
                </li>
              )}

{showAdminBoard && (
  <ul >
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link> </li>
                  <li>
                  <Link to={"/AddFeaturedJob"} className="nav-link">
                  AddFeaturedJob
                  </Link>  </li>
                  </ul>
              )}
{currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
                
              )}
             
            
             
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="col-md-6">
            <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/candidat/:id" component={Candidat} />
              <Route path="/admin" component={CandidatList} />
              <Route path="/AddFeaturedJob" component={AddFeaturedJob} />
              <Route path="/mod" component={AddFeaturedJob} />
              <Route path="/user" component={changeCandidature} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;