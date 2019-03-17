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
    <div className="home mt-32 container mx-auto">
      <div className="flex flex-col justify-center align-center items-center">
        <p className="text-5xl mb-2">Learn Spanish</p>
        <p className="text-3xl mb-6">As easy as uno, dos tres!</p>
        <button
          className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Start Learning!
        </button>
      </div>
      <LoginForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
