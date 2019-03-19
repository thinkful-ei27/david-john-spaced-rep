import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import RegistrationForm from "./registration-form";

export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="home container mx-auto mt-32">
      <h2 className="mb-4">Register</h2>
      <RegistrationForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
