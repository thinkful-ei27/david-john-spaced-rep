import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import LoginForm from "./login-form";

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <h1>Learn Spanish</h1>
      <h2>As easy as uno, dos tres!</h2>
      <button
        className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Start Learning!
      </button>
      <LoginForm />
      <Link to="/register">Register</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
