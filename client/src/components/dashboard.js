import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import { fetchProtectedData } from "../actions/protected-data";
import AnswerInput from "./AnswerInput";
import { submitAnswer, setAnswer } from "../actions/dashboard";

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  handleUpdateAnswer(val) {
    this.props.dispatch(setAnswer(val));
  }

  handleUserSubmitAnswer() {
    this.props.dispatch(submitAnswer(this.props.answer));
  }

  render() {
    return (
      <div className="dashboard container mx-auto mt-32">
        <div className="answer-box bg-white rounded flex flex-col justify-center items-center">
          <p className="text-lg">Welcome back, {this.props.name}!</p>
          <p className="mt-2">Shall we continue learning?</p>
          <p className="text-xl mt-8">Type the right answer</p>
          <p className="text-5xl mt-8">hola</p>
          <AnswerInput
            type="text"
            placeholder="Type english answer here"
            callback={val => this.handleUpdateAnswer(val)}
            className="mt-8 max-w-sm shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-row justify-around mt-4">
          <button
            type="button"
            className="text-grey-darkest font-bold py-2 px-4 rounded"
          >
            Skip
          </button>
          <button
            onClick={() => this.handleUserSubmitAnswer()}
            type="button"
            className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        <p className="text-center mt-8 text-xl">{this.props.feedback}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
    answer: state.dashBoard.answer,
    feedback: state.dashBoard.feedback
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
