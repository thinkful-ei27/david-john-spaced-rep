import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearAuth } from "../actions/auth";
import { clearAuthToken } from "../local-storage";

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logInAndOutButton;
    let accountOrRegisterButton;
    if (this.props.loggedIn) {
      logInAndOutButton = (
        <button
          type="button"
          className="bg-white hover:text-orange-dark font-bold py-2 px-4 rounded"
          onClick={() => this.logOut()}
        >
          Log out
        </button>
      );
      accountOrRegisterButton = (
        <Link to="/account">
          <button
            type="button"
            className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
          >
            Account
          </button>
        </Link>
      );
    } else {
      logInAndOutButton = (
        <Link to="/login">
          <button
            type="button"
            className="bg-white hover:text-orange-dark font-bold py-2 px-4 rounded"
          >
            Log in
          </button>
        </Link>
      );
      accountOrRegisterButton = (
        <Link to="/register">
          <button
            type="button"
            className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </Link>
      );
    }
    return (
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="max-w-full w-screen shadow flex fixed pin-t pin-x h-16 items-center justify-end bg-white px-4"
      >
        <ul className="list-reset flex flex-row justify-end">
          <li>
            <Link to="/chat">
              <button
                type="button"
                className="bg-white hover:text-orange-dark font-bold py-2 px-4 rounded"
              >
                Chat
              </button>
            </Link>
          </li>
          <li>{logInAndOutButton}</li>
          <li>{accountOrRegisterButton}</li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
