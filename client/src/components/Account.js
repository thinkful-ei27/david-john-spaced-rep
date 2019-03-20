import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import ProgressCard from "./ProgressCard";

export function Account(props) {
  let allCards;
  const { fullProgress, name } = props;
  if (fullProgress === null) {
    allCards = <div>Loading...</div>;
  } else {
    allCards = Object.keys(fullProgress).map(word => {
      const parsedNum = parseInt(fullProgress[word].percentage, 10);
      return (
        <ProgressCard
          data={[
            {
              value: parsedNum,
              color: "#E38627"
            }
          ]}
          label={word}
        />
      );
    });
  }
  return (
    <section className="container mx-auto mt-32">
      <header className="flex flex-col justify-center align-center items-center">
        <p className="text-5xl">Welcome, {name}</p>
        {/* <p className="text-xl">See your progress below:</p> */}
      </header>
      <main className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-8 bg-blue-darkest">
        <div className="category flex flex-row justify-between align-center px-2 py-4 text-white">
          <div>
            <h3>Let us keep learning!</h3>
            {/* <p className="pt-2">Progress: x of x</p> */}
          </div>
          <Link to="/dashboard">
            <button
              type="button"
              className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
            >
              Start
            </button>
          </Link>
        </div>
      </main>
      <main className="container mx-auto">
        <p className="text-2xl font-bold mt-16 text-center">Progress:</p>
        <div className="flex justify-between">{allCards}</div>
      </main>
    </section>
  );
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    fullProgress: state.dashBoard.fullProgress,
    progress: state.dashBoard.progress
  };
};

export default requiresLogin()(connect(mapStateToProps)(Account));
