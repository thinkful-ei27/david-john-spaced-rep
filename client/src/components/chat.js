import React from "react";
import { connect } from "react-redux";
import openSocket from 'socket.io-client';
import requiresLogin from "./requires-login";
import { updateInput, updateTextArea } from "../actions/chatbox";
import "../styles/chatbox.css";
import { CHAT_BASE_URL } from "../config";

const socket = openSocket(CHAT_BASE_URL);

export class ChatBox extends React.Component {
  componentDidMount() {
    socket.on("I-logged", obj => {
      this.props.dispatch(updateTextArea(obj.outputString));
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
    console.log(this.props.inputWord);
    socket.emit("logMe", {
      input: this.props.inputWord,
      username: this.props.username
    });
  }

  render() {
    return (
      <div id="container">
        <div id="outer-glow-box">
          <textarea
            className="text-box"
            rows="20"
            readOnly
            value={this.props.textArea}
          />
          <form
            action=""
            method="POST"
            id="input-form"
            onSubmit={e => this.handleSubmit(e)}
          >
            <input
              type="text"
              className="message"
              placeholder="Your Message..."
              onChange={e => this.updateInput(e.target.value)}
              value={this.props.inputWord}
            />
            <input type="submit" className="submit-button" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    inputWord: state.chatBox.inputWord,
    textArea: state.chatBox.textArea
  };
};

export default requiresLogin()(connect(mapStateToProps)(ChatBox));
