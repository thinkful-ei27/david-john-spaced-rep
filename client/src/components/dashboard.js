import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import requiresLogin from "./requires-login";
import AnswerInput from "./AnswerInput";
import openSocket from 'socket.io-client';
import { submitAnswer, setAnswer, getNewWord } from "../actions/dashboard";

const socket = openSocket('http://localhost:4010');

// function socketLogger() {
//   socket.emit('logMe')
//   socket.on('I-logged', () => {
//     console.log("server and client got a connection!")
//   });
// }

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getNewWord());
  }

  newWord() {
    this.props.dispatch(getNewWord());
    // socketLogger();
  }

  handleUpdateAnswer(val) {
    this.props.dispatch(setAnswer(val));
  }

  handleUserSubmitAnswer() {
    this.props.dispatch(submitAnswer(this.props.answer, this.props.word));
  }

  render() {
    const { progress, word } = this.props;
    let display;
    if (!progress) {
      display = <p>This is your first time seeing this word</p>;
    } else {
      const { percentage } = progress;
      if (!percentage) {
        display = <p>This is your first time seeing this word</p>;
      } else {
        display = (
          <p>
            You answer {word} {percentage} % of the time
          </p>
        );
      }
    }
    return (
      <div className="dashboard container mx-auto mt-32">
        <div className="answer-box bg-white rounded flex flex-col justify-center items-center">
          <p className="text-lg">Welcome back, {this.props.name}!</p>
          <p className="mt-2">Shall we continue learning?</p>
          <p className="text-xl mt-8">Type the right answer</p>
          <p className="text-5xl mt-8">{this.props.word}</p>
          {display}
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
            onClick={() => this.newWord()}
          >
            Skip
          </button>
          <button
            type="button"
            className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              this.handleUserSubmitAnswer();
            }}
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
    word: state.dashBoard.word,
    wordsIndex: state.dashBoard.wordsIndex,
    answer: state.dashBoard.answer,
    feedback: state.dashBoard.feedback,
    progress: state.dashBoard.progress
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
