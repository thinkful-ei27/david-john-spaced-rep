import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

import LandingPage from "./landing-page";
import Dashboard from "./dashboard";
import RegistrationPage from "./registration-page";
import LoginPage from "./LoginPage";
import ChatBox from './chat'
import { refreshAuthToken } from "../actions/auth";
import Header from "./Header";
import Account from "./Account";
import { getNewWord, fullProgress } from "../actions/dashboard";

export class App extends React.Component {
  componentDidMount() {
    if (this.props.hasAuthToken) {
      this.props.dispatch(getNewWord());
      this.props.dispatch(fullProgress());
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Route exact path="/chat" component={ChatBox} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/login" component={LoginPage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
