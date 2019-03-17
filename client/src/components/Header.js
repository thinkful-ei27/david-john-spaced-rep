import React from "react";
import { connect } from "react-redux";
import { clearAuth } from "../actions/auth";
import { clearAuthToken } from "../local-storage";

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = <button onClick={() => this.logOut()}>Log out</button>;
    }
    return (
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="max-w-full w-screen shadow flex fixed pin-t pin-x h-16 items-center justify-end bg-white px-4"
      >
        <ul className="list-reset flex flex-row justify-end">
          <li>
            <button
              type="button"
              className="bg-white hover:text-orange-dark font-bold py-2 px-4 rounded"
            >
              Log in
            </button>
          </li>
          <li>
            <button
              type="button"
              className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </li>
        </ul>
        {logOutButton}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
