import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Logo from "./Logo";

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="home mt-32 container mx-auto">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center align-center">
          <h1 className="font-semibold text-grey-darkest text-4xl sm:text-5xl md:text-6xl mb-4 leading-none">
            Learn Spanish
          </h1>
          <p className="text-xl sm:text-2xl text-grey-darkest leading-normal max-w-lg mb-4">
            As easy as uno, dos tres!
          </p>
          <Link to="/login">
            <button
              className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Start Learning!
            </button>
          </Link>
        </div>
        <Logo />
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
