import React from "react";
import { connect } from "react-redux";
import openSocket from "socket.io-client";
import requiresLogin from "./requires-login";
import {
  updateInput,
  updateTextArea,
  updateQuestion
} from "../actions/chatbox";
// import "../styles/chatbox.css";
import { CHAT_BASE_URL } from "../config";

const socket = openSocket(CHAT_BASE_URL);

export class ChatBox extends React.Component {
  componentDidMount() {
    socket.on("I-logged", obj => {
      this.props.dispatch(updateTextArea(obj));
    });
    socket.on("question", obj => {
      this.props.dispatch(updateQuestion(obj));
    });
  }

  socketLogger() {
    socket.emit("logMe");
  }

  updateInput(input) {
    this.props.dispatch(updateInput(input));
  }

  handleSubmit(e) {
    e.preventDefault();
    socket.emit("logMe", {
      input: this.props.inputWord,
      username: this.props.username
    });
  }

  render() {
    const { textArea } = this.props;
    const messages = textArea.map(msg => {
      const { userName, value } = msg;
      return (
        <li className="mb-4">
          <span className="ml-2 mr-4 font-bold w-1/5">{userName}</span>
          <span className="w-4/5">{value}</span>
        </li>
      );
    });
    return (
      <section id="container mx-auto">
        <div className="flex flex-col flex-wrap mt-32 justify-center align-center items-center">
          <h1 className="text-grey-darkest">Chat App</h1>
          <p className="text-xl text-grey-darker font-thin">
            Compete against other players for (no) prizes!
          </p>
          <p className="w-full max-w-sm mt-8 text-grey-darker">
            <span className="font-semibold">How to play:</span> Our bot will
            present the channel with a Spanish word. The first person to type
            the english translation will win.
          </p>
          {/* <textarea
            className="mx-auto w-full max-w-sm h-64 max-h-lg"
            readOnly
            value={this.props.textArea}
          /> */}
          <ul className="mt-8 list-reset w-full max-w-sm h-64 max-h-lg flex flex-col break-words">
            {messages}
          </ul>
          <form
            className="w-full max-w-sm"
            action=""
            method="POST"
            id="input-form"
            onSubmit={e => this.handleSubmit(e)}
          >
            <div className="flex items-center border-b border-b-2 border-orange py-2">
              <input
                type="text"
                className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Your Message..."
                onChange={e => this.updateInput(e.target.value)}
                value={this.props.inputWord}
              />
              <button
                type="submit"
                className="flex-no-shrink bg-orange hover:bg-orange-dark border-orange hover:border-orange-dark text-sm border-4 text-white py-1 px-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    inputWord: state.chatBox.inputWord,
    textArea: state.chatBox.textArea,
    question: state.chatBox.question,
    answer: state.chatBox.answer
  };
};

export default requiresLogin()(connect(mapStateToProps)(ChatBox));
