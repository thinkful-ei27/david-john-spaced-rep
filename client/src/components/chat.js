import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import openSocket from 'socket.io-client';
import {updateInput, updateTextArea} from '../actions/chatbox'
import '../styles/chatbox.css'
const socket = openSocket('http://localhost:4010');


export class ChatBox extends React.Component {
  componentDidMount() {
    socket.on('I-logged', (obj) => {
      console.log(`server and client got a connection! ${obj.word}, the correct answer is: ${obj.answer}`)
    });
  }

  socketLogger() {
    socket.emit('logMe')
  }

  updateInput(input) {
    this.props.dispatch(updateInput(input))
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.inputWord)
    this.props.dispatch(updateTextArea(this.props.username))
    socket.emit('logMe', (this.props.inputWord))
  }


  render() {
    return (
      <div id='container'>
        <div id='outer-glow-box'>
            <textarea className="text-box" rows="20" readOnly value={this.props.textArea} ></textarea>
          <form action="" method="POST" id="input-form" onSubmit={(e) => this.handleSubmit(e)}>
            <input type="text" className="message" placeholder="Your Message..." onChange={ (e) => this.updateInput(e.target.value)} value={this.props.inputWord}/>
            <input type="submit" className="submit-button"/>
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
